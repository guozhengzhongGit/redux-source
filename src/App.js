import React from 'react';
import './App.css';
import store from './store';
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
