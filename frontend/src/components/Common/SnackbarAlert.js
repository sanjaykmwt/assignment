/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles,createStyles } from '@material-ui/core/styles';
import {Snackbar,SnackbarContent, Typography,Slide} from '@material-ui/core';
import {Error as ErrorIcon} from "@material-ui/icons";
import SnackBarAlertAction,{SnackBarAlertType} from "../../store/actions/snackBarAction";

const styles    =   (theme)=>createStyles({
    'content':{
        
    },
    'alert':{
        background:"#e02b2b"
    },
    'success':{
        background:"#0f880f"
    },
    message:{
        display:"flex"
    }

});

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

class NetworkSnackbar extends React.Component {
    render(){
        const {classes}     =   this.props;
        const alerts    =   this.props.snackBarAlertReducer.alerts;
        return (
            alerts.map((alert,key)=>{
                return <Snackbar open={true} key={key}
                            autoHideDuration={6000}
                            onClose={()=>{
                                this.props.removeAlert(key);
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            TransitionComponent={SlideTransition}
                        >
                            <SnackbarContent message={
                                <div className={classes.message}>
                                    <ErrorIcon /> &nbsp; &nbsp;
                                    <Typography>  {alert.message}</Typography>
                                </div>
                            } classes={{
                                root:alert.type === SnackBarAlertType.ERROR ?classes.alert:classes.success
                            }}/>
                        </Snackbar>
            })
        );
    }
}

NetworkSnackbar.defaultProps   =   {
};


export default compose(withRouter,withStyles(styles))(connect((state, props) => {
    //State to Prop
    return {
        snackBarAlertReducer:state.snackBarAlertReducer
    };
  }, {
      removeAlert:SnackBarAlertAction.removeAlert
  })(NetworkSnackbar))