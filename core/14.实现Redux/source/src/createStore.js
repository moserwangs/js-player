/**
 * 创建仓库方法
 * @param {*纯函数处理器} reducer 
 */
export default function createStore(reducer) {
    let state  // 初始状态，可以是任意数据
    let listeners = [] // 订阅事件队列
    // 获取仓库数据
    const getState = () => state
    // 订阅方法，返回取消订阅方法
    const subscribe = listener => {
        // 排除listener不是函数
        if (typeof listener !== 'function') return
        listeners.push(listener)
        // 取消订阅的方法
        return () => {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    // 派发动作
    const dispatch = action => {
        // 修改数据
        state = reducer(state, action)
        // 调用订阅事件
        listeners.forEach(fn => fn())
        return action
    }
    // 调用派发动作为state赋初值
    dispatch({ type: '@@REDUX/INIT' })
    // 返回仓库方法，供外部调用
    return {
        getState,
        subscribe,
        dispatch
    }
}