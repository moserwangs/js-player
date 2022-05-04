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
        // 创建一个新的promise对象并返回
        // 由于Promise的执行器会立即执行，可将之前实现代码移入执行器中
        let promise2 = new Promise((resolve, reject) => {
            // 如果状态为PENDING，说明是异步调用成功或失败
            if (this.status === PENDING) {
                // 将成功回调存入队列
                this.onFulfilledCallbacks.push(() => { 
                    // 尝试拿到上次onFulfilled的返回值并执行下个promise对象的成功回调
                    // 如果尝试代码块抛错，则执行下个promise对象的失败回调
                    try {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    } catch(e) {
                        reject(e)
                    }
                })
                // 将失败回调存入队列
                this.onRejectedCallbacks.push(() => {
                    // 尝试拿到上次onRejected的返回值并执行下个promise对象的成功回调
                    // 如果尝试代码块抛错，则执行下个promise对象的失败回调
                    try {
                        let x = onRejected(this.reason)
                        resolve(x)
                    } catch(e) {
                        reject(e)
                    }
                })
            }
            // 如果状态为FULFILLED，执行成功的回调方法
            if (this.status === FULFILLED) {
                // 尝试拿到上次onFulfilled的返回值并执行下个promise对象的成功回调
                // 如果尝试代码块抛错，则执行下个promise对象的失败回调
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch(e) {
                    reject(e)
                }
            }
            // 如果状态为REJECTED，执行失败的回调方法
            if (this.status === REJECTED) {
                // 尝试拿到上次onRejected的返回值并执行下个promise对象的成功回调
                // 如果尝试代码块抛错，则执行下个promise对象的失败回调
                try {
                    let x = onRejected(this.reason)
                    resolve(x)
                } catch(e) {
                    reject(e)
                }
            }
        })
        return promise2
    }
}
