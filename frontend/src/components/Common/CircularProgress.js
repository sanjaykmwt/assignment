/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {withStyles,createStyles } from '@material-ui/core/styles';
// import * as Environment from "../../utils/enviorment"
import { Dialog,DialogContent,DialogContentText,CircularProgress } from '@material-ui/core';


const styles    =   (theme)=>createStyles({
    dialog:{
        width:'30%'
    },
    content:{
        textAlign:'center'
    }
});


class CicularProgressModal extends React.Component {
    constructor(props){
        super(props);
        this.state  =   {
            
        }
    }
    componentWillMount(){
    }

    
    render(){
        const {classes}     =   this.props;
        const props     =   this.props.circularProgressReducer.progress;

        return <Dialog  maxWidth='lg' classes={{paperWidthLg:classes.dialog}} open={props}> 
                <DialogContent className={classes.content}>
                    <DialogContentText >
                        <CircularProgress color="primary"/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    }
}

export default compose(withRouter,withStyles(styles))(connect((state, props) => {
    //State to Prop
    return {
        circularProgressReducer:state.circularProgressReducer,
    };
  }, {
  })(CicularProgressModal))
