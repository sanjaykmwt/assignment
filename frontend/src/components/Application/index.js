import React from 'react';
import { connect } from 'react-redux';
import { withStyles,createStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Switch,Route,Redirect} from "react-router-dom";
import Appmenu from '../Common/Appmenu/index';
import withWidth from "@material-ui/core/withWidth";

// import AppBar from "../Common/AppBar/index";
import drawerAction from "../../store/actions/drawer"

import * as Environment from "./../../utils/enviorment";
import Booking from "./Booking/index";
import {Container,Typography} from "@material-ui/core"
const styles    =   (theme)=>createStyles({
  "@global":{
    "html,body,#root":{
      margin:0, 
      height:'100%' 
    }
  },
  root: {
    display: 'flex',
    // backgroundColor:"#c2c2c2"
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  toolbar:{
    minHeight:"48px"
  },
  mouse:{
    cursor:"pointer",
    color:"#4943c6",
  },
  footer:{
    textAlign:'center',
    padding:'10px 0',
    height:'40px',
    background:"#e6e6e6",
    borderTop:"solid 1px #ccc",
    position:"fixed",
    left:0,
    bottom:0,
    right:0
  },
  div_profile:{
    textAlign:"right",
    padding:"15px 15px 0 15px"
  },
  profile:{
    fontSize:"20px",
    color:theme.palette.primary.main
  }
});
class Application extends React.Component {

  constructor(props){
    super(props);
    this.state={
      showDrawer:false,
    }
    this.handleDrawer= this.handleDrawer.bind(this);
  }
    handleDrawer(){
      this.setState({showDrawer:!this.state.showDrawer})
      // me.props.drawerhandle()
    }
    findComponent(){
      var width   =    this.props.width;
      if(width === 'xs' || width === 'sm' || width === 'md'){
          // var location    =   this.props.location.pathname;
          
      }
      return "Admin";
    }
    componentWillMount(){
  

    }
  
     

    render(){
       const {classes}      =  this.props;
        // var showDrawer  =  this.props.drawerReducer.status
        var showDrawer ;
        var path =window.location.href;
        if(path.indexOf("settings") !== -1){
          showDrawer  =  false;
        }else{
          showDrawer  =  true;
        }
        return <div  className={classes.root}>
                  {/* <AppBar></AppBar> */}
                  
                  {showDrawer &&<Appmenu showDrawer={this.state.showDrawer} handleDrawer={this.handleDrawer} setOpen={""}></Appmenu>}
                  <Container className={classes.content}>
                    <Switch>
                      <Route path={`${this.props.match.path}/booking`} component={Booking} />
                      <Redirect exact path={`${this.props.match.path}`} to={`${this.props.match.path}/booking`}/>
                    </Switch>
                  </Container>
                </div>
    }
}

export default compose(
  withRouter,
  withStyles(styles),withWidth()
)(connect((state, props) => {
  //State to Prop
  return {
    drawerReducer:state.drawerReducer,
  };
}, {
  drawerhandle:drawerAction.showDrawer,
})(Application))

 