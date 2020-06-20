
/**
 * 要存取状态就要有 getter 和 setter，对应 getStore 和 dispatch
 * 当状态发生改变，需要通知组件进行更新，用到观察者模式
 * 多个观察者对象监听同一目标对象，当目标对象的状态发生了变化通知所有观察者对象自动更新
 * 
 */
export function createStore(reducer, initialState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initialState)
  }
  let currentState = initialState;           // 全局状态
  let listeners = [];         // 观察者对象
  let isDispatching = false;
  function getState() {       // 获取状态即 getter
    if (isDispatching) throw new Error('err');
    return currentState;
  }
  function dispatch(action) {       // 改变状态即 setter
    if (isDispatching) throw new Error('err');
    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }
  
    listeners.forEach(fn => fn());  // 状态改变的同时通知观察者对象(即组件)需要更新
    return action;                  // dispatch 执行后的返回值是当前的 action
  }
  function subscribe(fn) {      // 发布订阅
    listeners.push(fn);
  }
  dispatch({ type: '@@INIT_REDUX' });
  return {
    getState,
    dispatch,
    subscribe,
  }
}

/**
 * applyMiddleWare 函数接收若干个中间件作为参数
 * 执行的返回结果是一个函数，对应 createStore 中的第三个参数 enhancer
 * 用来接收旧的 createStore，返回一个新的 createStore，其内部的 dispatch 是经过增强的
 */

export function applyMiddleWare(...middleWares) {
  return function enhancer(createStore) {
    return function(reducer, initialState) {
      const oldStore = createStore(reducer, initialState);
      let dispatch = oldStore.dispatch;
      // 传入 store，进行第一次调用
      const middleWareChain = middleWares.map(middleWare => middleWare(oldStore));
      dispatch = compose(...middleWareChain)(dispatch)
      return {
        ...oldStore,
        dispatch,
      }
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) return () => {};
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}