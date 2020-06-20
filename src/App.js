import React from 'react';
import './App.css';
import { createStore, applyMiddleWare } from './store';
import reducer from './reducer';

import loggerMiddleWare  from './loggerMiddleWare';
import exceptionMiddleWare  from './exceptionMiddleWare';
import timerMiddleWare  from './timerMiddleWare';
import thunk from './thunk';

const initialState = {
  count: 0,
}
const store = createStore(reducer, initialState, applyMiddleWare(exceptionMiddleWare, timerMiddleWare, loggerMiddleWare, thunk));
// const next = store.dispatch;
// const loggerMiddleWare = function(middleWare) {
//   return function(action) {
//     console.log('this state', store.getState());
//     middleWare(action);
//     console.log('this state', store.getState());
//   }

// }

// const exceptionMiddleWare = function(middleWare) {
//   return function(action) {
//     try {
//       middleWare(action)
//     } catch (error) {
//       console.log('err');
//     }
//   }
// }

// const timerMiddleWare = function(middleWare) {
//   return function(action) {
//     console.log(Date.now())
//     middleWare(action)
//   }
// }

// const exception = exceptionMiddleWare(store);
// const time = timerMiddleWare(store);
// const log = loggerMiddleWare(store);

// store.dispatch = exception(time(log(next)));

class App extends React.PureComponent {
  state = {
    count: 0
  }
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  plusCount = () => {
    store.dispatch({ type: 'plus' })
  }
  subtractCount = () => {
    store.dispatch({ type: 'subtract' })
  }
  asyncAdd = () => {
    setTimeout(() => {
      store.dispatch({ type: 'asyncPlus' })
    }, 2000)
  }
  render() {
    return (
      <div className="App">
        <h1>redux</h1>
        <button onClick={this.plusCount}>plus</button>
        <button onClick={this.subtractCount}>subtract</button>
        <button onClick={this.asyncAdd}>async add</button>
        <p>{store.getState().count}</p>
      </div>
    );
  }
}

// function f1(arg) {
//   console.log('f1', arg);
//   return arg + 'f1';
// }
// function f2(arg) {
//   console.log('f2', arg);
//   return arg + 'f2';
// }
// function f3(arg) {
//   console.log('f3', arg);
//   return arg + 'f3';
// }

// function compose(...funcs) {
//   if (funcs.length === 0) return () => {};
//   if (funcs.length === 1) return funcs[0];
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }

// const res = compose(f1, f2, f3)('omg');
// console.log(res);


export default App;
