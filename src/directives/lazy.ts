import lazyImage from '@/assets/image/loading/default.gif'
import type { ObjectDirective } from 'vue'

const imageSources = new WeakMap<HTMLImageElement, string>()

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return observer
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const el = entry.target as HTMLImageElement
        const src = imageSources.get(el)

        observer?.unobserve(el)

        if (!src) continue
        el.src = src
        imageSources.delete(el)
      }
    },
    {
      root: null,
      // 提前进入视窗 200px 时加载，减少用户看到占位图的概率
      rootMargin: '0px 0px',
      threshold: 0,
    },
  )

  return observer
}

function prepareImage(el: HTMLImageElement, src: string) {
  el.src = lazyImage
  el.decoding = 'async'
  imageSources.set(el, src)
}

function observeImage(el: HTMLImageElement) {
  const src = imageSources.get(el)

  if (!src) return

  const currentObserver = getObserver()

  // 兼容不支持 IntersectionObserver 的旧浏览器
  if (!currentObserver) {
    el.src = src
    imageSources.delete(el)
    return
  }

  currentObserver.observe(el)
}

export const vLazy: ObjectDirective<HTMLImageElement, string> = {
  beforeMount(el, binding) {
    if (!binding.value) return
    prepareImage(el, binding.value)
  },

  mounted(el) {
    observeImage(el)
  },

  updated(el, binding) {
    if (binding.value === binding.oldValue) return

    observer?.unobserve(el)
    imageSources.delete(el)

    if (!binding.value) return

    prepareImage(el, binding.value)
    observeImage(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
    imageSources.delete(el)
  },
}
