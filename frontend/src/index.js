/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/createStore';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import * as Environment from "./utils/enviorment";

// const history= createHashHistory({ queryKey: false});
ReactDOM.render(
  <Provider store={store}>
    <Router basename={Environment.host()} >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
