import React from 'react';
import {compose} from "recompose";
import { connect } from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "./style";
import {withRouter} from "react-router-dom";
import {Button,Divider,AppBar,Toolbar,Typography,Dialog,DialogActions,DialogContent,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    Menu,} from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import partnerTypeAction from "../../../../store/actions/partnerType";
import stateAction from "../../../../store/actions/states";
import DialogAction from "../../../../store/actions/dialog";

class AdvanceFilterModal extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            filter: {
                status: "",
                state: "",
                partnerTypeId: "",
            },
            stateList: [],
            state: "",
            partnerTypeList: [],
            partnerType: "",
            status: "",
        }
        this.handleClose    =   this.handleClose.bind(this);
        
    }
    
    componentDidUpdate(preState,nextState){
        var me  = this;
        if(preState.show !== this.props.show){
            me.props.partnerType();
            me.props.fetchAllState(null)
        }
    }

    componentWillReceiveProps(nextProps){
        var me = this;
        if (
            this.props.partnerTypeReducer.fetchAllpartnerTypeProg === true &&
            nextProps.partnerTypeReducer.fetchAllpartnerTypeProg === false
          ) {
            if (nextProps.partnerTypeReducer.error === null) {
              var result = nextProps.partnerTypeReducer.fetchAllpartnerType;
              console.log("indis", result);
              if (result !== null && result !== undefined && result.length !== 0) {
                var partnerTypeArray = [];
                result.forEach((i) => {
                  console.log("iiiiiiiii", i);
                  partnerTypeArray.push({
                    label: i.name,
                    value: i.id,
                  });
                });
                console.log("partnerTypeArray", partnerTypeArray);
                this.setState({ partnerTypeList: partnerTypeArray }, () => {
                  console.log("this.state", this.state);
                });
              }
              console.log("this.stte0", this.state);
            } else {
              var error = nextProps.partnerTypeReducer.error;
              if (error != null) {
                var message = error.message;
                if (error.error !== undefined) {
                  me.props.showAlert(error.error, message, {
                    label: "OK",
                    onClick: () => me.props.hideAlert(),
                  });
                } else {
                  me.props.showAlert("Error", message, {
                    label: "OK",
                    onClick: () => me.props.hideAlert(),
                  });
                }
              }
            }
          }
          if(this.props.stateListReducer.fetchAllStateProg == true && nextProps.stateListReducer.fetchAllStateProg == false){
            if(nextProps.stateListReducer.error == null){
                // me.props.progress(false);
                var result    =   nextProps.stateListReducer.fetchAllState;
                if(result !== null && result !== undefined && result.length !== 0){
                    var stateArray  = [];
                    result.forEach((i)=>{
                        stateArray.push({
                            "label":i.name,
                            "value":i.id
                        })
                    });
                    this.setState({"stateList":stateArray})
                }
            }else{
                me.props.progress(false);
                var error   =   nextProps.stateListReducer.error;
                if(error != null){
                  var message     =   error.message;
                  if(error.error !== undefined){
                    me.props.showAlert(
                      error.error,
                      message,
                      {
                          label:"OK",
                          onClick:()=>me.props.hideAlert()
                      }
                    )
                  }else{
                    me.props.showAlert(
                      "Error",
                      message,
                      {
                          label:"OK",
                          onClick:()=>me.props.hideAlert()
                      }
                    )
                  }
                }
            }
          }
    }
    

    handleClose(){
        this.props.onClose()
    }

    handleFilter(){
        var me = this;
        me.props.onSave(me.state.filter)
    }


    render(){
        var open    = this.props.show;
        const classes=this.props.classes;
        var state =  this.state; 
        return (
            <div>
                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" classes={{paper:classes.paper}}>
                    <AppBar className={classes.appBar} classes={{paper:classes.paper}}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" className={classes.title}>
                                Advance Filter  
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Divider/>
                    <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                        id="demo-simple-select-outlined-label"
                        margin="dense"
                        >
                        Select State
                        </InputLabel>
                        <Select
                            margin="dense"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.filter.state}
                            onChange={(event) => {
                                this.state.filter.state = event.target.value;
                                this.setState({
                                filter: this.state.filter,
                                state_error: "",
                                });
                            }}
                            label="Select State"
                        >
                          <MenuItem  value="">---Select---</MenuItem>
                            {this.state.stateList.map((item, key) => {
                                return (
                                <MenuItem key={key} value={item.value}>
                                    {item.label}
                                </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      margin="dense"
                    >
                      Select Partner Type
                    </InputLabel>
                    <Select
                      margin="dense"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.filter.partnerTypeId}
                      onChange={(event) => {
                        this.state.filter.partnerTypeId = event.target.value;
                        this.setState({
                          filter: this.state.filter,
                          partnerType_error: "",
                        });
                      }}
                      label="Select Partner Type"
                    >
                      <MenuItem  value="">---Select---</MenuItem>
                      {this.state.partnerTypeList.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      margin="dense"
                    >
                      Status
                    </InputLabel>
                    <Select
                      margin="dense"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.filter.status}
                      onChange={(e) => {
                        this.state.filter.status = e.target.value;
                        this.setState({ filter: this.state.filter });
                      }}
                      label="Status"
                    >
                      <MenuItem  value="">---Select---</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Blocked">Blocked</MenuItem>
                    </Select>
                  </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button size="small" color="primary" onClick={()=>{
                            this.handleFilter()
                        }} >
                            Search
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// export default compose(withRouter,withStyles(useStyles))(AdvanceFilterModal)
export default compose(
    withRouter,
    withStyles(useStyles)
  )(
    connect(
      (state, props) => {
        //State to Prop
        return {
          partnerTypeReducer: state.partnerTypeReducer,
          stateListReducer:state.stateListReducer,
        };
      },
      {
        showAlert: DialogAction.showAlert,
        hideAlert: DialogAction.hideAlert,
        partnerType: partnerTypeAction.fetchAllPartnerType,
        fetchAllState:stateAction.fetchAll
      }
    )(AdvanceFilterModal)
  );
  