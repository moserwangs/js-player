# 实现AJAX
**AJAX**是一种Web应用程序开发的手段，它采用客户端脚本与Web服务器交换数据。

## 实现思路
`1.`实例化XMLHttpRequest对象

`2.`此对象open方法可创建一个请求

`3.`此对象send方法发送请求

`4.`此对象onreadystatechange方法监听发送状态

## 实现

    /**
    * 实现AJAX
    * @param {*配置项} options 
    */
    function ajax(options) {
        let method = options.method || 'GET' // 请求方式，默认GET请求
            params = options.params, // GET请求携带的参数
            data = options.data, // POST请求携带的参数
            // 请求路径
            url = options.url + (params ? '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : ''),
            async = !!options.async, // 是否异步
            success = options.success, // 成功的回调方法
            headers = options.headers; // 请求头
        let xhr
        // 创建xhr对象
        xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        // 监听请求状态
        // 0 => 未初始化，还没有调用send方法
        // 1 => 载入，已调用send方法，正在发送请求
        // 2 => 载入完成，send方法执行完成，正在接收到全部响应内容
        // 3 => 交互，正在解析响应内容
        // 4 => 载入，响应内容解析完毕
        xhr.onreadystatechange = function() {
            // 解析成功后调用回调方法
            if (xhr.readyState === 4 && xhr.status === 200) {
                success && success(xhr.responseText)
            }
        }
        // 创建请求
        xhr.open(method, url, async)
        // 处理传入请求头情况
        if (headers) {
            Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
        }
        // 发送请求
        method === 'GET' ? xhr.send() : xhr.send(data)
    }






 
