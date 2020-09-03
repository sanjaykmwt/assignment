/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles,createStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {Typography, Divider,Button,Paper, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import {LocalPhone as LocalPhoneIcon} from "@material-ui/icons";
// import * as Environment from "../../../../utils/enviorment";
import OutlinedInput from '../../../Common/Input/Outlined'; 
import OutlinedPhoneInput from '../../../Common/Input/OutlinedPhone';
// import UserAction from "../../../../store/actions/user.js"
import DialogAction from "../../../../store/actions/dialog"
import CircularProgressAction from "../../../../store/actions/circularProgress"
// import UserAction from '../../../../store/actions/user';
const styles    =   (theme)=>createStyles({
    root:{
        padding:"15px",
    },
    paper:{
        padding:"15px",
        width:"50%",
        margin:"auto"
    },
    register_form_elem:{
        marginTop:theme.spacing(3),
        width:'100%',
        maxWidth:'700px'
    },
    form_input:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        width:"100%"
    },
    btn_form_input:{
        marginBottom:theme.spacing(2),
        textAlign:'right'
    },
    btn:{
        marginLeft:"10px",
        color:"#ffff",
        backgroundColor:theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main
      }
    },
    formControl:{
        marginBottom:theme.spacing(2),
        width:"100%"
    },
    
});

class UserView extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            'name':"",
            'name_error':"",
            'phone':"",
            'phone_error':'',
            'cell_phone':"",
            'cell_phone_error':'',
            'status':''
            
        }
        this.update         =    this.update.bind(this);
        this.get         =    this.get.bind(this);
        this.handleStatus   =   this.handleStatus.bind(this);

    }
    
    componentWillMount(){
        this.get()
    }

    get(){
        var me = this;
        var id  = me.props.match.params.id
        me.props.fetch(id)
        
    }

    componentWillReceiveProps(nextProps){
        var me      =   this;
        if(this.props.user.updateProg === true && nextProps.user.updateProg === false ){
            if(nextProps.user.updateError === null){
                me.props.progress(false);
                this.props.history.push("/app/user/list");
            } else {
                me.props.progress(false);
                var error   =   nextProps.user.updateError;
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
                } else if(error.status !== 401 && error.status !== 401){
                    var _message     =   error.message;
                    me.props.showAlert(
                        "ERROR",
                        _message,
                        {
                            label:"OK",
                            onClick:()=>me.props.hideAlert()
                        }
                    )
                }
            }
        }

        if(this.props.user.getUserProg === true && nextProps.user.getUserProg === false ){
            if(nextProps.user.getUserError === null){
                me.props.progress(false);
                var result   =   nextProps.user.getUser;
                this.setState({'name':result.name,'cell_phone':String(result.phone),"status":result.status})
            } else {
                me.props.progress(false);
                var _error   =   nextProps.user.getUserError;
                var g_message     =   error.message;
                if(error.error !== undefined){
                    me.props.showAlert(
                        _error.error,
                        g_message,
                        {
                            label:"OK",
                            onClick:()=>me.props.hideAlert()
                        }
                    )
                } else if(error.status !== 401 && error.status !== 401){
                    var e_message     =   error.message;
                    me.props.showAlert(
                        "ERROR",
                        e_message,
                        {
                            label:"OK",
                            onClick:()=>me.props.hideAlert()
                        }
                    )
                }
            }
        }
    }

    
    handleStatus(e){
        this.setState({status:e.target.value})
    }

    update(){
        var me  =   this;
        this.setState({'name_error':'','phone_error':'','cell_phone_error':'',})
        const name  =   me.state.name;
        if(name == null || name.trim().length === 0){
            me.setState({name_error:'Must not be empty.'});
            return;
        }

        const phone  =   me.state.cell_phone.replace(/[^0-9]/g,'');
        if(phone === null || phone === "+"|| phone.trim().length === 0){
            me.setState({cell_phone_error:'Must not be empty.'});
            return;
        }
        const status  =   me.state.status;
        if(status == null || status.trim().length === 0){
            me.setState({status_error:'Must not be empty.'});
            return;
        }


        
        // var createdBy       =    window.localStorage.getItem(Environment.app_name()+".user_email",null);
        var post    =   {
            "id":me.props.match.params.id,
            "name"  :   name,
            "phone" :   me.state.cell_phone.replace(/[^0-9]/g,''),
            "status":status
        }
        me.props.progress(true);
        me.props.update(post);
        
    }
    
    render(){
       const {classes}      =  this.props;
        return  <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component={"h2"} variant={"h5"}>User Update</Typography>
                    <Divider />
                    <div className={classes.register_form_elem}>
                        <div className={classes.form_input}>
                            <OutlinedInput
                                id="name_input"
                                label="Name"
                                labelWidth={60}
                                required={true}
                                value={this.state.name}
                                error={this.state.name_error.trim().length !== 0}
                                helperText={this.state.name_error}
                                onChange={(event)=>(this.setState({'name':event.target.value,'name_error':''}))}
                            />
                        </div>
                        <div className={classes.form_input}>
                            <OutlinedPhoneInput
                                id="cell_input"
                                label="Mobile Number"
                                required={true}
                                icon={<LocalPhoneIcon />}
                                placeholder="Cell Phone"
                                labelWidth={130}
                                value={this.state.cell_phone}
                                error={this.state.cell_phone_error.trim().length !== 0}
                                helperText={this.state.cell_phone_error}
                                onChange={(value)=>(this.setState({'cell_phone':value,'cell_phone_error':''}))}
                            />
                        </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label"  margin="dense">Status</InputLabel>
                            <Select
                                margin="dense"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.status}
                                onChange={this.handleStatus}
                                label="Status"
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="InActive">InActive</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <div className={classes.btn_form_input}>
                            <Button variant="outlined" color="default" size="small" onClick={(()=>{
                                this.props.history.goBack();
                            })}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" size="small"className={classes.btn} onClick={(()=>{
                                this.update();
                            })} >
                                Update
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
                  
    }
}

export default compose(
  withRouter,
  withStyles(styles)
)(connect((state, props) => {
  //State to Prop
  return {
    auth:state.authReducer,
    user:state.userReducer,

  };
}, {
    showAlert:DialogAction.showAlert,
    hideAlert:DialogAction.hideAlert,
    progress:CircularProgressAction.progress,
    // update:UserAction.update,
    // fetch:UserAction.getById
})(UserView))

 