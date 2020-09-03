import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles,createStyles } from '@material-ui/core/styles';
import {Popover,Typography,Button,Tooltip} from "@material-ui/core";
import {AccountCircle as AccountCircleIcon} from "@material-ui/icons";
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import DefaultProfileImg from "../../../images/default_profile.png";
import UserActions from "../../../store/actions/user";
import DialogAction from "../../../store/actions/dialog";

const styles    =   (theme)=>createStyles({
    'popover':{
        // width:'200px'
    },
    'popoverpaper':{
        width:'300px',
        border:"solid 1px #f0f0f0"
    },
    profileImage:{
        background:theme.palette.primary.main,
        padding:theme.spacing(4,0)
    },
    profileImageAvatar:{
        width:'100px',
        height:'100px',
        overflow:'hidden',
        margin:'0 auto',
        borderRadius:'50%',
        border:"solid 1px #fff"
    },
    profileImagesrc:{
        width:'100%'
    },
    username:{
        color:theme.palette.common.white,
        textAlign:"center"
    },
    email:{
        color:theme.palette.common.white,
        textAlign:"center",
        fontSize:'12px'
    },
    actions:{
        display:"flex",
        padding:theme.spacing(2,1)
    },
    grow:{
        flexGrow:1
    }
});

class ProfileDropDown extends React.Component {

    constructor(props){
        super(props);
        this.state  =   {
            showDropDown : false,
            dropDownAnchor:null
        }
        this.logOut     =    this.logOut.bind(this);
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
                onClick:()=>me.props.logout()
            }
        )
    }     
    render(){

        const {classes}         =   this.props;
        const user  =   this.props.authReducer.authuser;
        var name    =   ''
        // const user  =   {"email":"gourav@gmail.com","name":"gourav"};
        // {this.props.authReducer.authuser !== null &&<Typography>{this.props.authReducer.authuser.name}</Typography>}
        if(user == null){
            return null;
        }else{
           var res  =    user.name.split(/\s+/);
           name     =   res[0];

        }
        return <React.Fragment>
                <Tooltip title="Profile" arrow={true}>
                    <Button edge="start" className={classes.menuButton} color="inherit" 
                        aria-label="open menu" onClick={(event)=>{
                            this.setState({showDropDown:true,dropDownAnchor:event.currentTarget});
                        }}
                        startIcon={<AccountCircleIcon style={{marginLeft:"10px"}}/>}
                        endIcon={<ExpandMoreOutlinedIcon/>}
                        >{name}
                        {/* <AccountCircleIcon style={{marginLeft:"10px"}}/> */}
                    </Button>
                </Tooltip>
                <Popover 
                    open={this.state.showDropDown}
                    anchorEl={this.state.dropDownAnchor}
                    anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
                    transformOrigin={{vertical: 'top',horizontal: 'right'}}
                    classes={{
                        root:classes.popover,
                        paper:classes.popoverpaper
                    }}
                    onClose={()=>{ this.setState({showDropDown:false,dropDownAnchor:null})}}
                >
                    <div className={classes.profileImage}>
                        <div className={classes.profileImageAvatar}>
                            <img src={DefaultProfileImg} alt="proImg" className={classes.profileImagesrc}/>
                        </div>
                        <Typography className={classes.username}>{user.name}</Typography>
                        <Typography className={classes.email}>{user.email}</Typography>
                    </div>
                    <div className={classes.actions}>
                        <Button variant="contained" color="primary" size={"small"} onClick={()=>{
                            this.setState({showDropDown:false,dropDownAnchor:null})
                            // this.props.history.push("/app/settings");
                        }}>
                            Profile
                        </Button>
                        <div className={classes.grow}></div>
                        <Button variant="outlined" color="primary" size={"small"} onClick={()=>{
                            this.logOut();
                            this.setState({showDropDown:false,dropDownAnchor:null})
                        }}>
                            Logout
                        </Button>
                    </div>
                </Popover>
            </React.Fragment>;
    }
}

export default compose(withRouter,withStyles(styles))(connect((state, props) => {
    //State to Prop
    return {
        authReducer:state.authReducer
    };
  }, {
    logout:UserActions.logout,
    showConfirm:DialogAction.showConfirm,
    hideConfirm:DialogAction.hideConfirm,
  })(ProfileDropDown))
