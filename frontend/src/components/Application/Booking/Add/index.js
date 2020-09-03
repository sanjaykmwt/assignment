/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles,createStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {Typography, Divider,Button,Paper} from "@material-ui/core";
import {Email as EmailIcon,Lock as LockIcon,
    LocalPhone as LocalPhoneIcon} from "@material-ui/icons";
// import * as Environment from "../../../../utils/enviorment";
import OutlinedInput from '../../../Common/Input/Outlined'; 
import OutlinedPhoneInput from '../../../Common/Input/OutlinedPhone';
import * as Validate from "../../../../utils/validation.js"
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

class UserAdd extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            'name':"",
            'name_error':'',
            'email':"",
            'email_error':'',
            'phone':"",
            'phone_error':'',
            'password':"",
            'password_error':'',
            'confirm_password':"",
            'confirm_password_error':'',
            'cell_phone':"",
            'cell_phone_error':'',
            
        }
        this.add         =    this.add.bind(this);
    }
    componentWillReceiveProps(nextProps){
        var me      =   this;
        if(this.props.user.registerProg === true && nextProps.user.registerProg === false ){
            if(nextProps.user.registerError === null){
                me.props.progress(false);
                this.props.history.push("/app/user/list");
            } else {
                me.props.progress(false);
                var error   =   nextProps.user.registerError;
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

    add(){
        var me  =   this;
        this.setState({'name_error':'','email_error':'','phone_error':'','password_error':'','confirm_password_error':'','cell_phone_error':'',})
        const name  =   me.state.name;
        if(name == null || name.trim().length === 0){
            me.setState({name_error:'Must not be empty.'});
            return;
        }

        const email  =   me.state.email;
        if(email == null || email.trim().length === 0){
            me.setState({email_error:'Must not be empty.'});
            return;
        }
        if(!Validate.email(email)){
            this.setState({email_error:"Provide valid email"});
            return;
        }
        const phone  =   me.state.cell_phone.replace(/[^0-9]/g,'');
        if(phone === null || phone === "+"|| phone.trim().length === 0){
            me.setState({cell_phone_error:'Must not be empty.'});
            return;
        }

        // if(phone.length > 12 || phone.length<12){
        //     me.setState({cell_phone_error:'Must be valid phone.'});
        //     return;
        // }

        const password  =   me.state.password;
        if(password == null || password.trim().length === 0){
            me.setState({password_error:'Must not be empty.'});
            return;
        }
        
        if(password.trim().length<8){
            me.setState({password_error:'Must be 8 characters'});
            return;
        }
        const confirm_password  =   me.state.confirm_password;
        if(confirm_password == null || confirm_password.trim().length === 0 || confirm_password !== password ){
            me.setState({confirm_password_error:"Confirm password does not match."});
            return;
        }

        
        // var createdBy       =    window.localStorage.getItem(Environment.app_name()+".user_email",null);
        var user  =   me.props.auth.authuser;
        var post    =   {
            "name"      :   name,
            "email"     :   email,
            "password"  :   password,
            "createdBy":user.id,
            "phone"     :   me.state.cell_phone.replace(/[^0-9]/g,''),
        }
        me.props.progress(true);
        me.props.add(post)        
    }
    
    render(){
       const {classes}      =  this.props;
        return  <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component={"h2"} variant={"h5"}>User Add</Typography>
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
                            <OutlinedInput
                                id="email_input"
                                label="Email"
                                icon={<EmailIcon />}
                                labelWidth={50}
                                required={true}
                                value={this.state.email}
                                error={this.state.email_error.trim().length !== 0}
                                helperText={this.state.email_error}
                                onChange={(event)=>(this.setState({'email':event.target.value,'email_error':''}))}
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
                        <div className={classes.form_input}>
                            <OutlinedInput
                                id="password_input"
                                label="Password"
                                type="password"
                                icon={<LockIcon />}
                                required={true}
                                labelWidth={90}
                                value={this.state.password}
                                error={this.state.password_error.trim().length !== 0}
                                helperText={this.state.password_error}
                                onChange={(event)=>(this.setState({'password':event.target.value,'password_error':''}))}
                            />
                        </div>
                        <div className={classes.form_input}>
                            <OutlinedInput
                                id="cpassword_input"
                                label="Confirm Password"
                                type="password"
                                icon={<LockIcon />}
                                required={true}
                                labelWidth={140}
                                value={this.state.confirm_password}
                                error={this.state.confirm_password_error.trim().length !== 0}
                                helperText={this.state.confirm_password_error}
                                onChange={(event)=>(this.setState({'confirm_password':event.target.value,'confirm_password_error':''}))}
                            />
                        </div>
                        <div className={classes.btn_form_input}>
                            <Button variant="outlined" color="default" size="small" onClick={(()=>{
                                this.props.history.goBack();
                            })}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" size="small"className={classes.btn} onClick={(()=>{
                                this.add();
                            })} >
                                Add
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
    // add:UserAction.add
})(UserAdd))

 