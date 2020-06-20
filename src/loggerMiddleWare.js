const loggerMiddleWare = function(store) {
  return function(middleWare) {
    return function(action) {
      console.log('this state', store.getState());
      middleWare(action);
      console.log('this state', store.getState());
      console.log('logger 执行了');
    }
  }
}


export default loggerMiddleWare;
