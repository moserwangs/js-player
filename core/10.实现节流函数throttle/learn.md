# 实现节流函数throttle
**实现节流函数throttle**指的是某个函数在某段时间内，只执行一次。

## 实现思路
`1.`使用时间戳，如果执行时的时间减去上次执行的时间大于设定的时间间隔，那么执行函数

`2.`执行一次函数，将当前函数执行事件记录下来，供下一次调用比对时间差

## 实现

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







 
