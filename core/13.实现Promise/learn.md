# 实现Promise
**Promise**对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

## 基本的promise实现思路
`1.`Promise是一个类

`2.`初始化promise时，会传入一个执行器executor，此执行器立即执行

`3.`执行器有两个参数resolve方法与reject方法，用来描述状态

`4.`promise中有三个状态：等待态（pending）、成功态（fulfilled）、失败态（rejected）

`5.`状态改变只能是 pending -> fulfilled 或者 pending -> rejected

`6.`状态一旦发生变化，不能再改变

`7.`执行器抛错调用reject方法

`8.`每个promise实例都有一个then方法，两个参数分别为成功的执行的方法（onFulfilled）与失败执行的方法（onRejected）

## 基本的promise实现

    /**
    * 实现Promise
    */
    const PENDING = 'PENDING'
    const FULFILLED = 'FULFILLED'
    const REJECTED = 'REJECTED'

    class Promise {
        constructor(executor) {
            this.status = PENDING // 默认状态
            this.value = undefined // 成功的值
            this.reason = undefined // 失败的原因

            // 改变状态为成功态并设置成功值的方法
            const resolve = (value) => {
                // 只有当状态为PENDING时才能改变
                if (this.status === PENDING) {
                    this.value = value
                    this.status = FULFILLED
                }
            }

            // 改变状态为失败态并设置失败原因的方法
            const reject = (reason) => {
                // 只有当状态为PENDING时才能改变
                if (this.status === PENDING) {
                    this.reason = reason
                    this.status = REJECTED
                }
            }
            // 立即执行执行器，执行器执行报错直接调用reject
            try {
                executor(resolve, reject)
            } catch(e) {
                reject(e)
            }
        }
        // 两个参数分别为成功的回调与失败的回调
        then(onFulfilled, onRejected) {
            // 如果状态为FULFILLED，执行成功的回调方法
            if (this.status === FULFILLED) {
                onFulfilled(this.value)
            }
            // 如果状态为REJECTED，执行失败的回调方法
            if (this.status === REJECTED) {
                onRejected(this.reason)
            }
        }
    }

## 当执行器中为异步执行resolve或reject的问题

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        })
    })

    // 此时promise的状态还是PENDING，我们实现的promise没有处理这种情况
    // 既然是异步执行resolve或reject，我们可以将成功的回调和失败的回调存到对应队列中
    // 然后调用resolve或reject方法执行队列中的方法
    // 这里用到的模式就是发布-订阅模式
    p.then(res => {
        console.log(res)
    })

## 解决异步调用resolve与reject的问题

    /**
    * 实现Promise
    */
    const PENDING = 'PENDING'
    const FULFILLED = 'FULFILLED'
    const REJECTED = 'REJECTED'

    class Promise {
        constructor(executor) {
            this.status = PENDING // 默认状态
            this.value = undefined // 成功的值
            this.reason = undefined // 失败的原因
            this.onFulfilledCallbacks = [] // 存放成功的回调方法
            this.onRejectedCallbacks = [] // 存放失败的回调方法

            // 改变状态为成功态并设置成功值的方法
            const resolve = (value) => {
                // 只有当状态为PENDING时才能改变
                if (this.status === PENDING) {
                    this.value = value
                    this.status = FULFILLED
                    // 遍历执行成功队列的回调方法
                    this.onFulfilledCallbacks.forEach(fn => fn())
                }
            }

            // 改变状态为失败态并设置失败原因的方法
            const reject = (reason) => {
                // 只有当状态为PENDING时才能改变
                if (this.status === PENDING) {
                    this.reason = reason
                    this.status = REJECTED
                    // 遍历执行失败队列的回调方法
                    this.onRejectedCallbacks.forEach(fn => fn())
                }
            }
            // 立即执行执行器，执行器执行报错直接调用reject
            try {
                executor(resolve, reject)
            } catch(e) {
                reject(e)
            }
        }
        // 两个参数分别为成功的回调与失败的回调
        then(onFulfilled, onRejected) {
            // 如果状态为PENDING，说明是异步调用成功或失败
            if (this.status === PENDING) {
                // 将成功回调存入队列
                this.onFulfilledCallbacks.push(() => { onFulfilled(this.value) })
                // 将失败回调存入队列
                this.onRejectedCallbacks.push(() => { onRejected(this.reason) })
            }
            // 如果状态为FULFILLED，执行成功的回调方法
            if (this.status === FULFILLED) {
                onFulfilled(this.value)
            }
            // 如果状态为REJECTED，执行失败的回调方法
            if (this.status === REJECTED) {
                onRejected(this.reason)
            }
        }
    }