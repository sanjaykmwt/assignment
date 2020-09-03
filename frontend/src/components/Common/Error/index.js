import React from 'react';
import {createStyles,withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,Typography} from '@material-ui/core';
import {connect} from "react-redux";
import {showError,closeError} from "../../../store/actions/error"

const styles    =   (theme)=>createStyles({
    dialog:{
      width:'23%'
    }
})
class Error extends React.Component {

    constructor(props){
        super(props);
        this.state  =   {
        }
    }
  render(){ 
    var {classes} = this.props;
    var message = this.props.message;
    return ( 
        <Dialog  maxWidth='lg' classes={{paperWidthLg:classes.dialog}} open={this.props.open} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          <DialogTitle id="form-dialog-title">Error</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>{message}</Typography>
          </DialogContent>
          <DialogActions>
            {/* <Button color="primary" onClick={this.props.onClose}>
              Cancel
            </Button> */}
            <Button color="primary" onClick={()=>{
              this.props.closeError()
            }}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
  
} 

export default compose(
    withRouter,
    withStyles(styles)
  )(connect((state, props) => {
        return {
            errorReducer:state.errorReducer
        };
    }, {
        showError:showError,
        closeError:closeError
})(Error))


