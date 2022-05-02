/**
 * 实现Function.prototype.bind方法
 * @param {*对象} context 
 * @returns 
 */
Function.prototype.bind = function(context) {
    // bind的对象必须是函数
    if (typeof this !== 'function') throw new Error('binding an uncallable')
    // 取出调用bind的方法
    const fn = this
    // 绑定的参数集合
    const outerAgrs = [...arguments].slice(1)
    // 返回一个新函数
    return function (...args) {
        // 将绑定参数与调用时的参数合并传入原函数执行
        return fn.apply(context, [...outerAgrs, ...args])
    }
}
