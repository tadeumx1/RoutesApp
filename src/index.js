import React, { Component } from 'react';

import RootStackContainer from './routes';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { globalStyles } from './styles'

import "./config/ReactotronConfig"
import store from './store';

export default class App extends Component {

  render() {

    return (

      <Provider store={store}>

        <ThemeProvider theme={globalStyles}>

          <RootStackContainer />

        </ThemeProvider>  

      </Provider>

    );
  }
}
