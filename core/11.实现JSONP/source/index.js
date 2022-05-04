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
