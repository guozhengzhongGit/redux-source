
const exceptionMiddleWare = function(store) {
  return function(middleWare) {
    return function(action) {
      try {
        middleWare(action);
        console.log('exceptionMiddleWare 执行了');
      } catch (error) {
        console.log('err');
      }
    }
  }
}

export default exceptionMiddleWare;