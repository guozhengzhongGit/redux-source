export function createStore() {
  let currentStore;           // 全局状态
  function getStore() {       // 获取状态即 getter
    return currentStore
  }
  function dispatch() {       // 改变状态即 setter

  }
  function subscribe() {      // 发布订阅

  }

  return {
    getStore,
    dispatch,
    subscribe,
  }
}