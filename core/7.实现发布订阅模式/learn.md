# 实现发布订阅模式
**发布-订阅模式**其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。

## 实现思路
`1.`创建一个对象

`2.`该对象内部创建一个缓存对象，用于记录订阅的类型及其订阅的列表

`3.`on方法将订阅类型存入缓存对象中，订阅的方法加入缓存对象订阅类型属性列表中

`4.`emit方法遍历执行缓存对象订阅类型属性的订阅列表中的方法

`5.`off方法根据订阅类型取消订阅

`6.`once方法只监听一次，调用后删除缓存中对应的订阅类型列表

## 实现

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

 
