# 实现防抖函数debounce
**防抖函数debounce**指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。

## 实现思路
`1.`使用定时器完成延时执行功能

`2.`第一次执行时设定一个定时器，之后调用会清除上次的定时器，并设置新的定时器

`3.`定时器计时结束后会执行函数

## 实现

    /**
    * 防抖函数debounce
    * @param {*需要防抖处理的函数} fn 
    * @param {*间隔时间} wait 
    */
    function debounce(fn, wait) {
        // 使用闭包保存定时器ID
        let timer = null
        // 返回新函数
        return function(...args) {
            const context = this
            // 清除上次定时器
            if (timer) clearTimeout(timer)
            // 设置新的定时器
            timer = setTimeout(() => {
                // 执行原函数
                fn.apply(context, args)
            }, wait)
        }
    }

## 优化
**上面的防抖函数不能立即执行，我们设置第三个参数immedate，为true时第一次触发直接执行**

## 优化实现

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






 
