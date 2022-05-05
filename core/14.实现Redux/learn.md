# 实现Redux
**Redux**是 JavaScript 状态容器，提供可预测化的状态管理。

## 三大原则
`1.`单一数据源
    整个应用只有一个数据仓库store，仓库保存的值可以使任意类型，一般是树结构

`2.`state是只读的
    唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象并必须有type属性

`3.`使用纯函数来执行修改
    为了描述action如何改变state，需要编写处理器函数reducers

## Redux的目录解析
`1.`index.js 整合文件，主要暴露模块功能

`2.`createStore.js 创建一个 Redux store 来以存放应用中所有的state

`3.`bindActionCreators.js 将单个或多个ActionCreator转化为dispatch(action)的函数集合形式

`4.`combineReducers.js 主要用于合并reducers

`5.`applyMiddleware.js Middleware 可以让你包装 store 的 dispatch 方法来达到你想要的目的

`6.`compose.js 从右到左来组合多个函数

## 实现

### ①实现redux中index.js文件

    import createStore from './createStore'
    import bindActionCreators from './bindActionCreators'
    import combineReducers from './combineReducers'
    import applyMiddleware from './applyMiddleware'
    import compose from './compose'

    export {
        createStore,
        bindActionCreators,
        combineReducers,
        applyMiddleware,
        compose
    }

