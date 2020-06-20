const loggerMiddleWare = function(store) {
  return function(middleWare) {
    return function(action) {
      console.log('this state', store.getState());
      middleWare(action);
      console.log('this state', store.getState());
    }
  }
}


export default loggerMiddleWare;
