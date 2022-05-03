# 实现通用科里化函数
**科里化**就是将一个多参数的函数转化为单参数的函数

## 科里化的好处
`1.`参数复用

  + 判断正则是否匹配（用户使用每次都需输入正则与值）
  
        function check(reg, text) {
            return reg.test(text)
        }
        console.log(check(/\d+/, '123')) // true
        console.log(check(/\d+/, 'abc')) // false
    
  + 使用函数科里化后

        function curryCheck(reg) {
            return function(text) {
                return reg.test(text)
            }
        }
        let isNumbers = curryCheck(/\d+/)
        let isStrings = curryCheck(/[a-z]+/)
        console.log(isNumbers(123)) // true
        console.log(isStrings('abc')) // true

`2.`提前确认

  + 判断变量类型的方法（用户使用方法都必须输入类型，容易出错）
  
        function isType(type, val) {
            return Object.prototype.toString.call(val) === `[object ${type}]`
        }
        console.log(isType('Array', [])) // true
        console.log(isType('Array', 1)) // false
    
  + 使用函数科里化后

        function isArray(val) {
            return isType('Array', val)
        }
        console.log(isArray([])) // true
        console.log(isArray(1)) // false

`3.`延迟执行

    Function.prototype.bind = function (context) {
        const fn = this
        const args = Array.prototype.slice.call(arguments, 1)
        return function() {
            return fn.apply(context, args)
        }
    }

## 实现

    // 普通函数实现科里化
    function curry(fn, ...args) {
        // 获取原函数参数的长度
        const len = fn.length
        // 如果参数大于等于原函数的参数列表长度，则返回新函数，新函数体内为返回执行原函数的结果
        if (args.length >= len) return function() { return fn.apply(this, args) }
        // 如果参数小于原函数参数列表的长度，递归科里化
        return function(...newArgs) {
            return curry(fn, ...[...args, ...newArgs])
        }
    }

    // 箭头函数实现方式
    const curry = (fn, ...args) => args.length >= fn.length ? () => fn.apply(this, args) : (...newArgs) => curry(fn, ...args.concat(newArgs))

     
