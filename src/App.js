import React from 'react';
import './App.css';
import { createStore, applyMiddleWare } from './store';
import reducer from './reducer';

import loggerMiddleWare  from './loggerMiddleWare';
import exceptionMiddleWare  from './exceptionMiddleWare';
import timerMiddleWare  from './timerMiddleWare';

const initialState = {
  count: 0,
}
const store = createStore(reducer, initialState, applyMiddleWare(exceptionMiddleWare, timerMiddleWare, loggerMiddleWare));
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
  render() {
    return (
      <div className="App">
        <h1>redux</h1>
        <button onClick={this.plusCount}>plus</button>
        <button onClick={this.subtractCount}>subtract</button>
        <p>{store.getState().count}</p>
      </div>
    );
  }
}

export default App;
