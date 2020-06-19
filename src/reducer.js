/**
 * dispatch 一个 action，就需要 state 重新计算一次，因此在其中调用 reducer，以当前 state 和 dispatch 的入参 action 为参数
 * 
 */

export default function reducer(prevState, action) {
  switch(action.type) {
    case 'plus':
      return {
        ...prevState,
        count: prevState.count + 1,
      }
    case 'subtract':
      return {
        ...prevState,
        count: prevState.count - 1,
      }
    default:
      return prevState;
  }
}