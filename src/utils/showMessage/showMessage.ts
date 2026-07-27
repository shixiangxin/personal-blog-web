import { createVNode, render } from 'vue'
import Message from './ShowMessage.vue'
import type { MessageHandler, MessageOptions } from './index.ts'
interface MessageExposed {
  close: () => void
  open: () => void
}

export default function showMessage(options: MessageOptions = {}): MessageHandler {
  const target = options.container ?? document.body
  const mountNode = document.createElement('div')

  let destroyed = false

  // 自定义容器中的消息使用绝对定位
  if (target !== document.body && window.getComputedStyle(target).position === 'static') {
    target.style.position = 'relative'
  }

  /** 卸载 Vue 组件并删除挂载节点 */
  function destroy(): void {
    if (destroyed) return

    destroyed = true

    // 先通过 Vue 卸载，确保组件生命周期正常执行
    render(null, mountNode)
    mountNode.remove()

    options.onClose?.()
  }
  // 使用 VNode 渲染消息
  const vnode = createVNode(Message, {
    content: options.content,
    type: options.type,
    duration: options.duration,
    fixed: target === document.body,
  })

  target.appendChild(mountNode)
  render(vnode, mountNode)

  return {
    /** 调用组件暴露的 close 方法 */
    close(): void {
      const exposed = vnode.component?.exposed as MessageExposed | null | undefined
      destroy()
      exposed?.close()
    },
    open(): void {},
  }
}
