/**
 * 节流函数throttle
 * @param {*需要节流处理的函数} fn 
 * @param {*间隔时间} wait 
 */
function throttle(fn, wait) {
    // 用于记录函数上次执行的时间戳
    let prev = 0
    // 返回新函数
    return function(...args) {
        // 记录函数执行的时间戳
        let now = Date.now()
        // 当两次调用函数时间间隔大于设定间隔
        if (now - prev > wait) {
            // 将此次函数调用时间戳设为上次调用时间
            prev = now
            // 执行原函数
            fn.apply(this, args)
        }
    }
}

