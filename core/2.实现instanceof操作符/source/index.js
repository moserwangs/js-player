/**
 * 实现instanceof操作符
 * @param {*对象} L 
 * @param {*构造函数} R 
 */
function instance_of(L, R) {
    // 将L赋值为L的原型对象
    L = L.__proto__
    // 循环查找L的原型链是否等于R的prototype属性
    while(L) {
        if (L === R.prototype) return true
        L = L.__proto__
    }
    // 循环结束没查找到返回false
    return false
}