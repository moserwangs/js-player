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
