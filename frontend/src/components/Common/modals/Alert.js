/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {withStyles,createStyles } from '@material-ui/core/styles';
// import * as Environment from "../../utils/enviorment"
import { Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button } from '@material-ui/core';


const styles    =   (theme)=>createStyles({
    
});


class AlertModal extends React.Component {
    constructor(props){
        super(props);
        this.state  =   {
            
        }
    }
    componentWillMount(){
    }

    
    render(){
        const props     =   this.props.dialog.alert;

        return <Dialog open={props.open}> 
                <DialogTitle >{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                    {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        if(props.actionBtn.onClick !== undefined && props.actionBtn.onClick !== null){
                            props.actionBtn.onClick();
                        }
                    }} color="primary" autoFocus>
                        {props.actionBtn.label}
                    </Button>
                </DialogActions>
            </Dialog>
    }
}




export default compose(withRouter,withStyles(styles))(connect((state, props) => {
    //State to Prop
    return {
        dialog:state.dialogReducer,
    };
  }, {
  })(AlertModal))
