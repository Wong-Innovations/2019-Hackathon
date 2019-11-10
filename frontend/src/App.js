import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Router } from 'react-router-dom';

import Routes from './Routes';


const browserHistory = createBrowserHistory();


export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
