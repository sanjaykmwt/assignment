/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect,Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import theme from "./theme";
import LoginRegister from "./components/LoginRegister/index";
import Application from "./components/Application/index";
import './App.css';
import Alert from "./components/Common/modals/Alert"
// import {closeError} from "./store/actions/error"
import Confirm from './components/Common/modals/Confirm';
import NetworkSnackbar from './components/Common/NetworkSnackbar';
import SnackbarAlert from './components/Common/SnackbarAlert';
import CicularProgressModal from "./components/Common/CircularProgress"

class App extends React.Component {
    render(){

        var user_theme   =   theme();
        return <ThemeProvider theme={user_theme}>
                   <Switch>
                      <Route  path={"/search"} component={LoginRegister} />
                      <Route  path={"/app"} component={Application} />
                      <Redirect exact path={'/'} to={`/search`}/>
                  </Switch>
                  <Alert />
                  <Confirm />
                  <CicularProgressModal/>
                  <NetworkSnackbar/>
                  <SnackbarAlert />
                </ThemeProvider>
                
    }
}
export default connect((state, props) => {
  //State to Prop
  return {
    errorReducer:state.errorReducer
  };
}, (dispatch) => {
  //Action to prop
  return {
  };
})(App)