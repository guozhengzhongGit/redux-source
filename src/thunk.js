export default function thunk(store) {
  return function (middleWare) {
    return function(action) {
      if (typeof action === 'function') return action(middleWare, store);
      return middleWare(action)
    }
  }
}