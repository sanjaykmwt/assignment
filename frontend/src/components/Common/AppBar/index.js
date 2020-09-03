import React, {Fragment }from 'react';
import {connect} from "react-redux";

import { AppBar, Toolbar, IconButton, Typography,CssBaseline} from '@material-ui/core';
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "./style";
import {withRouter} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import './style'
import UserAction from "../../../store/actions/user"
// import LogOutModel from "../Logout"
import DialogAction from "../../../store/actions/dialog";
import ProfileDropDown from "./profileDropDown"
class Appbar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            menuAnchorElem:null,
            'user':'',
            'count':null,
            "logOut":false

        }
        this.handleMenu         =   this.handleMenu.bind(this);  
        this.setAnchorEl        =   this.setAnchorEl.bind(this);  
        this.handleClose        =   this.handleClose.bind(this);  
        this.goNext             =   this.goNext.bind(this);  
        this.logOut             =   this.logOut.bind(this);  
    } 
    
    setAnchorEl(elem){
        this.setState({menuAnchorElem:elem})
        }    
    handleMenu(event) {
        this.setAnchorEl(event.currentTarget);
    }
    
    handleClose() {
        this.setAnchorEl(null);
    }
    goNext(){
        this.setAnchorEl(null);
        var url =   "/app/settings";
        this.props.history.push(url);
    }
    logOut(){
        var me  = this;
        me.props.showConfirm(
            "Confirmation",
            "Are you sure you want to log out?",
            {
                label:"cancel",
                onClick:()=>me.props.hideConfirm()
            },
            {
                label:"OK",
                onClick:()=>me.props.logoutUser()
            }
        )
    }     

    
    render(){
        const classes   =   this.props.classes; 
        var appHeader = this.props.authReducer.authuser!==null?this.props.authReducer.authuser.userRole:null
        return(             
            <Fragment>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            onClick={this.props.handleDrawer}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <div className={classes.menuButton}>
                            {this.props.menu}
                        </div> */}
                        <Typography variant="h6" noWrap onClick={()=>{this.props.history.push("/app/home")}} className={classes.typo}>
                            BUILDING BLOCKS {appHeader}
                        </Typography>
                        <div className={classes.spacer} />
                            <ProfileDropDown/>
                            {/* {this.props.authReducer.authuser !== null &&<Typography>{this.props.authReducer.authuser.name}</Typography>} */}
                            {/* <div className = {classes.login}>
                            <Hidden only={['sm', 'xs']}>                        
                                    <IconButton
                                        aria-label="Account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                        
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.menuAnchorElem}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                       <MenuItem onClick={this.goNext}>Profile</MenuItem>
                                        <MenuItem onClick={()=>{this.logOut()}}>Logout</MenuItem>
                                    </Menu>
                                </Hidden>
                            </div> */}
                    </Toolbar>
                </AppBar>
            </Fragment> 
        );
    }
}

export default connect((store)=>{
    return {
        authReducer:store.authReducer

    }
   
},{
    logoutUser:UserAction.logout,
    showConfirm:DialogAction.showConfirm,
    hideConfirm:DialogAction.hideConfirm,
})(compose(withRouter,withStyles(useStyles))(Appbar))