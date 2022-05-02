/**
 * 实现new操作符
 */
function new_object() {
    // 取出第一个参数，该参数为创建对象的构造函数
    let Con = Array.prototype.shift.call(arguments)
    // 创建一个继承构造函数的对象
    let obj = Object.create(Con.prototype)
    // 以创建的对象作为this上下文执行构造函数
    let result = Con.apply(obj, arguments)
    // 优先返回构造函数的返回值，返回值不是对象则返回创建的对象
    return result instanceof Object ? result : obj
}