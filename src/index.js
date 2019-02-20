import React, { Component } from 'react';

import RootStackContainer from './routes';
import { Provider } from 'react-redux';

import "./config/ReactotronConfig"
import store from './store';

export default class App extends Component {

  render() {

    return (

      <Provider store={store}>

        <RootStackContainer />

      </Provider>

    );
  }
}
