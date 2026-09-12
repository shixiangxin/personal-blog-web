type EventHandler<Args extends unknown[]> = (...args: Args) => void

export class EventBus<Events extends { [K in keyof Events]: unknown[] }> {
  private listeners: {
    [K in keyof Events]?: Set<EventHandler<Events[K]>>
  } = {}

  /**
   * 监听事件，并返回取消监听函数
   */
  $on<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>): () => void {
    const handlers = this.listeners[eventName] ?? new Set<EventHandler<Events[K]>>()

    handlers.add(handler)
    this.listeners[eventName] = handlers

    return () => {
      this.$off(eventName, handler)
    }
  }

  /**
   * 取消监听
   */
  $off<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>): void {
    const handlers = this.listeners[eventName]

    if (!handlers) {
      return
    }

    handlers.delete(handler)

    if (handlers.size === 0) {
      delete this.listeners[eventName]
    }
  }

  /**
   * 触发事件
   */
  $emit<K extends keyof Events>(eventName: K, ...args: Events[K]): void {
    const handlers = this.listeners[eventName]

    if (!handlers) {
      return
    }
    const newHandlers = [...handlers]
    // 创建副本，避免回调执行期间增删监听器影响本次遍历
    for (const handler of newHandlers) {
      handler(...args)
    }
  }

  /**
   * 清除某个事件或所有事件
   */
  $clear<K extends keyof Events>(eventName?: K): void {
    if (eventName !== undefined) {
      delete this.listeners[eventName]
      return
    }

    this.listeners = {}
  }
}
