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
