/**
 * 实现发布-订阅模式
 */
class EventEmitter {
    constructor() {
        // 缓存对象，记录订阅类型及其订阅列表
        this.listeners = {}
    }

    // 订阅事件
    on = (event, listener) => {
        // 如果event或listener不存在或者listener不是方法
        if (!event || !listener || typeof listener !== 'function') return
        // 如果类型未注册，则创建类型列表，否则将listener添加到类型列表
        this.listeners[event] ? this.listeners[event].push(listener) : this.listeners[event] = [listener]
    }

    // 发布事件
    emit = (event, ...args) => {
        // 判断是否订阅了该事件
        if (!this.listeners[event]) {
            console.error('未订阅该事件')
            return
        }
        // 遍历执行事件类型列表中的方法
        this.listeners[event].forEach(listener => listener.call(this, ...args))
    }

    // 取消订阅
    off = (event, listener) => {
        // 判断是否订阅了该事件
        if (!this.listeners[event]) {
            console.error('未订阅该事件')
            return
        }
        // 如果没传特定的事件，则删除该事件类型列表
        if (!listener) {
            delete this.listeners[event]
            return
        }
        // 排除传入的事件
        this.listeners[event] = this.listeners[event].filter(item => item !== listener)
    }

    // 只订阅一次
    once = (event, listener) => {
        // 如果event或listener不存在或者listener不是方法
        if (!event || !listener || typeof listener !== 'function') return
        function one() {
            // 调用后指定该方法并取消订阅改事件类型
            listener.apply(this, arguments)
            this.off(event)
        }
        // 订阅one方法
        this.on(event, one)
    }
}
