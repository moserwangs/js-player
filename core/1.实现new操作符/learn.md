# 实现new操作符
**new运算符**创建一个类实例
## new操作符做了哪些操作？
1.创建一个空的对象
2.将此对象链接到构造函数的原型
3.以此对象为this上下文执行构造函数
4.如果构造函数没有返回一个对象,返回创建的对象
## 示例
1.原生
const arr = new Array(1, 2, 3)
2.自主实现效果
const arr = new_object(Array, 1, 2, 3)
## 实现
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
