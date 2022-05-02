/**
 * 实现Function.prototype.call方法
 * @param {*对象} context 
 */
Function.prototype.call = function(context) {
    // 第一个参数为undefined或null，使用window对象
    context = context ? Object(context) : window
    // 设置调用call方法的函数为对象的属性
    context.fn = this
    // 取出剩余参数
    const args = [...arguments].slice(1)
    // 执行方法并拿到返回值
    const result = context.fn(...args)
    // 删除context的fn属性
    delete context.fn
    // 返回方法执行的返回值
    return result
}

/**
 * 实现Function.prototype.apply方法
 * @param {*对象} context 
 * @param {*数组} arr 
 */
 Function.prototype.apply = function(context, arr) {
    // 第一个参数为undefined或null，使用window对象
    context = context ? Object(context) : window
    // 设置调用apply方法的函数为对象的属性
    context.fn = this
    // 执行方法并拿到返回值
    const result = arr ? context.fn(...arr) : context.fn()
    // 删除context的fn属性
    delete context.fn
    // 返回方法执行的返回值
    return result
}

