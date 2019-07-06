import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Reddit from './components/Reddit/Reddit.js';
import configureStore from './store/configureStore'

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Reddit/>
      </Provider>
    );
  }
}

export default App;
