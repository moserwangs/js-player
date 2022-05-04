# 实现JSONP
**JSONP**是解决跨域的一种方式

## 缺点
`1.`只能发送GET请求，不支持POST、PUT、DELETE等

`2.`容易XSS攻击（请使用信任的站点提供的api）

## 原理
`1.`创建script标签，将api的url（一般设置cb属性指定回调）设置为script标签的scr属性

`2.`将创建的script标签插入页面

`3.`设置全局函数（就是第一步设置的cb属性），拿到数据

## 百度接口简单实现

    // 百度API接口
    const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=前端&cb=callback'
    // 创建script标签
    const script = document.createElement('script')
    // 设置script标签的scr属性
    script.src = url
    // 将script标签插入页面
    document.body.appendChild(script)
    // 全局函数
    function callback(data) {
        // 拿到服务器响应数据
        console.log(data)
    }

## 封装JSONP方法

    /**
    * 封装JSONP函数
    * @param {*} param0 
    * @returns 
    */
    function jsonp({ url, params, cb }) {
        // 返回Promise对象
        return new Promise((resolve, reject) => {
            // 创建script标签
            let script = document.createElement('script')
            // 处理参数，拼接成字符串
            params = { ...params, cb }
            let paramsStr = Object.keys(params).reduce((prev, cur) => prev + `&${cur}=${params[cur]}`, '')
            // 设置script标签属性
            script.src = url + paramsStr
            // 插入script标签到文档中
            document.body.appendChild(script)
            window[cb] = function(data) {
                document.body.removeChild(script)
                resolve(data)
            }
        })
    }

## 测试

    jsonp({
        url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
        params: {
            wd: '前端'
        },
        cb: 'cb'
    }).then(res => {
        console.log(res)
    })








 
