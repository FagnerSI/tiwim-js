import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '~/store';

import Routers from '~/screens/routes';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}
export default App;