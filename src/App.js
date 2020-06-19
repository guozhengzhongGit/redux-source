import React from 'react';
import './App.css';
import './store';
class App extends React.PureComponent {
  state = {
    count: 0
  }
  componentDidMount() {
    // const store = createStore();
    // console.log(store.getState());
    this.setState({
      // count: store.getState().count
    })
  }
  render() {
    // const { count } = this.state;
    return (
      <div className="App">
        <h1>redux</h1>
        {/* {count} */}
      </div>
    );
  }
}

export default App;
