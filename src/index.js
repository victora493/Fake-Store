import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from './util/theme';
import {BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import './globalClasses.css';
import App from './App';

import store from './store'


ReactDOM.render(
  <>
    <ColorModeScript nonce initialColorMode={theme.config.initialColorMode} />
    <Router>
      <React.StrictMode>
        <Provider store={store}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Provider>
      </React.StrictMode>
    </Router>
  </>,
  document.getElementById('root')
);
