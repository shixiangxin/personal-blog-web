import style from '@/styles/directives.module.scss'
import type { ObjectDirective } from 'vue'

export interface ToTopOptions {
  /** 元素滚动超过该距离后显示按钮，单位为 px。 */
  threshold?: number
  /** 点击按钮后的滚动方式，默认为平滑滚动。 */
  behavior?: ScrollBehavior
  /** 按钮距离视口右侧的距离，数字会自动转换为 px。 */
  right?: number | string
  /** 按钮距离视口底部的距离，数字会自动转换为 px。 */
  bottom?: number | string
  /** 按钮的无障碍说明，同时也会作为鼠标悬停提示。 */
  label?: string
}

/** 支持直接传入数字作为阈值，也支持通过对象传入完整配置。 */
export type ToTopBinding = number | ToTopOptions | undefined

/** 经过默认值处理后，指令内部实际使用的配置。 */
interface ResolvedOptions {
  threshold: number
  behavior: ScrollBehavior
  right?: string
  bottom?: string
  label: string
}

interface ToTopState {
  button: HTMLButtonElement
  options: ResolvedOptions
  visible: boolean
  handleScroll: () => void
  handleClick: () => void
}

const DEFAULT_THRESHOLD = 300
const DEFAULT_LABEL = '回到顶部'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// 每个绑定元素都有独立的按钮和事件处理函数。使用 WeakMap 可以避免在元素上
// 挂载额外的自定义属性，并允许元素被回收后相应状态也被垃圾回收。
const stateMap = new WeakMap<HTMLElement, ToTopState>()

/** 将数字偏移量转换为 CSS 长度，同时保留合法的字符串单位。 */
function normalizeOffset(value: number | string | undefined) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? `${value}px` : undefined
  }

  const normalizedValue = value?.trim()
  return normalizedValue || undefined
}

/** 统一处理数字简写、对象配置、非法阈值以及各项默认值。 */
function resolveOptions(value: ToTopBinding): ResolvedOptions {
  const options = typeof value === 'object' && value !== null ? value : undefined
  const thresholdValue = typeof value === 'number' ? value : options?.threshold
  const threshold = Number.isFinite(thresholdValue)
    ? Math.max(0, thresholdValue ?? DEFAULT_THRESHOLD)
    : DEFAULT_THRESHOLD

  return {
    threshold,
    behavior: options?.behavior ?? 'smooth',
    right: normalizeOffset(options?.right),
    bottom: normalizeOffset(options?.bottom),
    label: options?.label?.trim() || DEFAULT_LABEL,
  }
}

/** 将可能动态变化的位置和辅助文案同步到按钮。 */
function updateButtonOptions(state: ToTopState) {
  const { button, options } = state
  button.style.right = options.right ?? ''
  button.style.bottom = options.bottom ?? ''
  button.ariaLabel = options.label
  button.title = options.label
}

/** 根据绑定元素当前的 scrollTop 切换按钮的显示状态。 */
function updateVisibility(element: HTMLElement, state: ToTopState) {
  const shouldShow = element.scrollTop >= state.options.threshold
  if (shouldShow === state.visible) return

  // 按钮隐藏前主动释放焦点，避免产生“焦点仍停留在隐藏元素上”的无障碍问题。
  if (!shouldShow && document.activeElement === state.button) {
    state.button.blur()
  }

  state.visible = shouldShow
  // 隐藏时同时退出 Tab 顺序，确保键盘用户不会聚焦到不可见按钮。
  state.button.tabIndex = shouldShow ? 0 : -1
  state.button.classList.toggle(style.toTopVisible!, shouldShow)
  state.button.setAttribute('aria-hidden', String(!shouldShow))
}

/** 用户开启“减少动态效果”时，用即时滚动代替平滑滚动。 */
function getScrollBehavior(behavior: ScrollBehavior) {
  if (behavior === 'smooth' && window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    return 'auto'
  }

  return behavior
}

export const vToTop: ObjectDirective<HTMLElement, ToTopBinding> = {
  mounted(element, binding) {
    // 按钮挂载到 body 后可以使用 fixed 定位，不会跟随内部滚动内容一起移动。
    const button = document.createElement('button')
    const state: ToTopState = {
      button,
      options: resolveOptions(binding.value),
      visible: false,
      handleScroll: () => undefined,
      handleClick: () => undefined,
    }

    button.type = 'button'
    button.className = style.toTop!
    button.textContent = '↑'
    button.tabIndex = -1
    button.setAttribute('aria-hidden', 'true')

    // 事件处理函数保存在 state 中，卸载指令时才能使用同一引用准确移除监听。
    state.handleScroll = () => updateVisibility(element, state)
    state.handleClick = () => {
      button.blur()
      element.scrollTo({ top: 0, behavior: getScrollBehavior(state.options.behavior) })
    }

    updateButtonOptions(state)
    document.body.appendChild(button)
    // passive 表示处理函数不会阻止默认滚动行为，有利于浏览器优化滚动性能。
    element.addEventListener('scroll', state.handleScroll, { passive: true })
    button.addEventListener('click', state.handleClick)
    stateMap.set(element, state)
    updateVisibility(element, state)
  },

  updated(element, binding) {
    const state = stateMap.get(element)
    if (!state) return

    // 支持运行期间更新阈值、定位和滚动方式等配置。
    state.options = resolveOptions(binding.value)
    updateButtonOptions(state)
    updateVisibility(element, state)
  },

  beforeUnmount(element) {
    const state = stateMap.get(element)
    if (!state) return

    // 按钮位于 body 下，必须主动移除，避免路由切换后残留 DOM 或事件监听。
    element.removeEventListener('scroll', state.handleScroll)
    state.button.removeEventListener('click', state.handleClick)
    state.button.remove()
    stateMap.delete(element)
  },
}
