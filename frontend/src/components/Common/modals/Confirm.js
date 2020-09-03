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


class ConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.state  =   {
            
        }
    }
    componentWillMount(){
    }

    
    render(){
        // const {classes}     =   this.props;
        const props     =   this.props.dialog.confirm;

        return <Dialog open={props.open}> 
                <DialogTitle >{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                    {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        if(props.actionBtn1.onClick !== undefined && props.actionBtn1.onClick !== null){
                            props.actionBtn1.onClick();
                        }
                    }} >
                        {props.actionBtn1.label}
                    </Button>
                    <Button onClick={()=>{
                        if(props.actionBtn2.onClick !== undefined && props.actionBtn2.onClick !== null){
                            props.actionBtn2.onClick();
                        }
                    }} color="primary" autoFocus>
                        {props.actionBtn2.label}
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
  })(ConfirmModal))
