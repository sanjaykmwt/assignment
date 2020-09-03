/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { compose } from "recompose";
import {Typography,Button, Card,CardHeader,CircularProgress,CardContent} from "@material-ui/core";
import { withStyles,createStyles } from '@material-ui/core/styles';
import { withRouter,Link} from "react-router-dom";
import {Email as EmailIcon,
  Lock as LockIcon} from "@material-ui/icons";
import OutlinedInput from '../Common/Input/Outlined';
import TrainAction from "../../store/actions/train";
import DialogAction from "../../store/actions/dialog"
import { connect } from 'react-redux';


const styles    =   (theme)=>createStyles({
  root: {
    height: '100vh',
    [theme.breakpoints.only('xs')]: {
      height: "auto",
    },
  },
  titleText :{
    color: theme.palette.primary.main,
    // fontWeight: "600",
    fontSize: "24px"
  },
  titlePrimaryText :{
    paddingTop:"10px",
    color: "#FFC95F",
    // fontWeight: "600",
    fontSize: "24px"
  },
  container:{
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: 'bottom',
    height: "100%",
    alignItems: "center",
    padding: "10%",
    marginTop: "0",
  },
  card: {
      width: "40%",
      margin: "auto",
      position: "relative",
      textAlign: "center",
      top: "25%",
      // padding: "10px",  
      border:"solid 1px"
  },
  login_form_elem:{
    marginTop:theme.spacing(3)
  },
  form_input:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2)
  },
  register_caption:{
    color:"#50C4F2",
    marginTop:10
  },
  title:{
    padding:0,
    borderBottom:"solid 1px",
    backgroundColor:"#11245A"
  }
});

class TrainRegister extends React.Component {
  constructor(props){
    super(props);

    this.state   =  {
        'is_loginprog':false,
        'source':"",
        'source_error':'',
        'destination':"",
        'destination_error':'',
    }
    this.search  =   this.search.bind(this);
  }

  componentWillMount(){
  
}    

  search(){
    var me  =   this;
    me.setState({'is_loginprog':true,'source_error':'','destination_error':''});

    const source  =   me.state.source;
    if(source == null || source.trim().length === 0){
        me.setState({source_error:'Must not be empty.'});
        return;
    }

    const destination  =   me.state.destination;
    if(destination == null || destination.trim().length === 0){
        me.setState({destination_error:'Must not be empty.'});
        return;
    }
    var postData={
      'destination':destination,
      'source':source
    }
    me.props.serchtrain(postData);
  }

  componentWillReceiveProps(nextProps){
    var me      =   this;

    if(this.props.auth.fetchProg === true && nextProps.auth.fetchProg === false && this.props.networkReducer.networkError === false && nextProps.networkReducer.networkError === false ){
        if(nextProps.auth.error === null){
          this.props.history.push("/app");
        } else {
            var error   =   nextProps.auth.error;
            if(error.errors !== undefined){
              var message     =   error.message;
              me.props.showAlert(
                  error.error,
                  message,
                  {
                      label:"OK",
                      onClick:()=>me.props.hideAlert()
                  }
              )
            } else {
                var message     =   error.message;
                if(message === "Bad credentials"){
                    message     =   "Not Found";
                }
                me.props.showAlert(
                    error.error,
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



  render(){
        const {classes}   =   this.props;
        return  (
          <div className={classes.container}>
            <Card className={classes.card}>
              <CardHeader 
                className={classes.title} 
                title={
                  
                    <div>
                      <Typography color={'primary'} variant={'h5'} className={classes.titlePrimaryText} >
                            Train Search
                        </Typography>
                        
                    </div>
                }
              >
              </CardHeader>
              <CardContent className={classes.formContainer}>
                <div className={classes.login_form_elem}>
                  <div className={classes.form_input}>
                    <OutlinedInput
                      id="email_input"
                      label="From"
                      labelWidth={50}
                      required={true}
                      value={this.state.source}
                      error={this.state.source_error.trim().length !== 0}
                      helperText={this.state.source_error}
                      onChange={(event)=>(this.setState({'source':event.target.value,'source_error':''}))}
                    />
                  </div>
                  <div className={classes.form_input}>
                    <OutlinedInput
                      id="des"
                      label="To"
                      type="text"
                      // icon={<LockIcon />}
                      required={true}
                      labelWidth={85}
                      value={this.state.destination}
                      error={this.state.destination_error.trim().length !== 0}
                      helperText={this.state.destination_error}
                      onChange={(event)=>(this.setState({'destination':event.target.value,'destination_error':''}))}
                    />
                  </div>
                    <div className={classes.form_input}>
                      {!this.props.auth.inProg && <Button variant="contained" style={{backgroundColor:"#50C4F2",color:"#ffff"}} fullWidth onClick={this.search}>
                          Search
                      </Button>}
                      {this.props.auth.inProg && <div style={{'textAlign':'center'}}><CircularProgress /></div>}
                      {/* <Typography className={classes.register_caption}><Link to={'/forgotpassword'} style={{color:'#50C4F2'}}>Forgot Password</Link></Typography> */}
                    </div>
                  </div>
              </CardContent>
            </Card>
          </div>
        )
    }
}

// export default compose(
//   withRouter,
//   withStyles(styles)
// )(TrainRegister)

export default compose(
  withRouter,
  withStyles(styles)
)(connect((state, props) => {
    //State to Prop
    return {
        auth:state.trainReducer,
        networkReducer:state.networkReducer,
    };
  }, {
    serchtrain:TrainAction.fetchTrain,
    showAlert:DialogAction.showAlert,
    hideAlert:DialogAction.hideAlert
  })(TrainRegister))