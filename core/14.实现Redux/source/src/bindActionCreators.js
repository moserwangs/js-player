
// 将action创建者绑定到派发动作上
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        return dispatch(actionCreator.apply(this, arguments))
    }
}

/**
 * 将单个或多个ActionCreator转化为dispatch(action)的函数集合形式
 * @param {*} actionCreators 
 * @param {*} dispatch 
 * @returns 
 */
export default function bindActionCreators(actionCreators, dispatch) {
    // 如果传入的actionCreators是函数
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    // 如果传入的actionCreators是对象
    const boundActionCreators = {}
    // 遍历绑定
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    // 返回绑定后的对象
    return boundActionCreators
}
  