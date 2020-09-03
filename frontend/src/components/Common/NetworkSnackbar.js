/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles,createStyles } from '@material-ui/core/styles';
import {Snackbar,SnackbarContent, Typography} from '@material-ui/core';
import {Error as ErrorIcon} from "@material-ui/icons";
import networkAction from "../../store/actions/network"
const styles    =   (theme)=>createStyles({
    'content':{
        background:"#e02b2b"
    },
    message:{
        display:"flex"
    }

});

class NetworkSnackbar extends React.Component {
    render(){
        const {classes}     =   this.props;
        return <Snackbar open={this.props.networkReducer.networkError} autoHideDuration={10000}
        onClose={()=>{
            this.props.networkError(false)
        }}>
                    <SnackbarContent message={
                        <div className={classes.message}>
                            <ErrorIcon /> &nbsp; &nbsp;
                            <Typography>  Network Error!</Typography>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        </div>
                    } classes={{
                        root:classes.content
                    }}/>
                </Snackbar>
    }
}

NetworkSnackbar.defaultProps   =   {
};


export default compose(withRouter,withStyles(styles))(connect((state, props) => {
    //State to Prop
    return {
        networkReducer:state.networkReducer
    };
  }, {
      networkError:networkAction.networkError
  })(NetworkSnackbar))