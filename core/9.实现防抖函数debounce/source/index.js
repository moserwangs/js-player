/**
 * 防抖函数debounce
 * @param {*需要防抖处理的函数} fn 
 * @param {*间隔时间} wait 
 * @param {*是否立即执行} immedate 
 */
function debounce(fn, wait, immedate) {
    // 使用闭包保存定时器ID
    let timer = null
    // 返回新函数
    return function(...args) {
        const context = this
        // 清除上次定时器
        if (timer) clearTimeout(timer)
        // 如果是首次执行且immedate参数为true，直接执行原函数
        if (immedate && !timer) fn.apply(context, args)
        // 设置新的定时器
        timer = setTimeout(() => {
            // 执行原函数
            fn.apply(context, args)
        }, wait)
    }
}

