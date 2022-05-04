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
