export type MessageType = 'info' | 'success' | 'warn' | 'error'
export interface MessageOptions {
  // 消息内容
  content?: string

  // 消息类型
  type?: MessageType

  // 显示时间，设置为 0 时不会自动关闭
  duration?: number

  // 消息挂载容器
  container?: HTMLElement

  // 消息完全关闭后的回调
  onClose?: () => void
}

export interface MessageHandler {
  close: () => void
  open: () => void
}

export { default } from './showMessage'
