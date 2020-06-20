const timerMiddleWare = function(store) {
  return function(middleWare) {
    return function(action) {
      console.log(Date.now())
      middleWare(action)
    }
  }
}

export default timerMiddleWare;