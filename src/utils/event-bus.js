//声明类
class EventBus {
  constructor() {
    this.eventList = {}
    if (!EventBus.instance) {
      EventBus.instance = this
    }
    return EventBus.instance
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus()
    }
    return this.instance
  }
  // 监听/发布
  $on(event, fn) {
    let eventList = this.eventList[event]
    eventList ? eventList.push(fn) : (this.eventList[event] = [fn])
  }
  // 触发/订阅
  $emit(event, ...args) {
    this.eventList[event] &&
      this.eventList[event].forEach((fn) => {
        fn(...args)
      })
  }
}
export { EventBus }
