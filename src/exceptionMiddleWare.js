
const exceptionMiddleWare = function(store) {
  return function(middleWare) {
    return function(action) {
      try {
        middleWare(action)
      } catch (error) {
        console.log('err');
      }
    }
  }
}

export default exceptionMiddleWare;