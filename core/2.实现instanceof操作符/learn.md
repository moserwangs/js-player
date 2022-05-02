# 实现instanceof操作符
**instanceof运算符**用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

## 示例
`1.`原生

    const arr = new Array()
    console.log(arr instanceof Array) // true
    console.log(arr instanceof Number) // false
    console.log(arr instanceof Object) // true

`2.`自主实现效果

    const arr = new Array()
    console.log(instance_of(arr, Array)) // true
    console.log(instance_of(arr, Number)) // false
    console.log(instance_of(arr, Object)) // true

## 实现
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
