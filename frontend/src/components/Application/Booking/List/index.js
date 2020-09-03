import React from 'react';
import { connect } from 'react-redux';
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "./style";
import {withRouter} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead, 
    TableRow,TableFooter,TablePagination,
    Typography,
    Avatar,
    MenuItem,
    Menu,
    IconButton,
    Tooltip,
    Paper,Toolbar,
    InputBase,
    Divider,CircularProgress,
    Button,Card,CardHeader,CardContent,CardMedia, Grid,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import {MoreVert as MoreVertIcon, Search as SearchIcon, EmojiFlagsOutlined,LocationCityOutlined, LocalPhoneOutlined, WcOutlined, SchoolOutlined, ClassOutlined,
    // FilterList as FilterListIcon
} from "@material-ui/icons";
import TablePaginationModel  from "../../../Common/Pagination/index";
import DialogAction from "../../../../store/actions/dialog";
import CircularProgressAction from "../../../../store/actions/circularProgress";
import NotFound from "../../../../images/NoData.png"
import TrainAction from '../../../../store/actions/train';

class TrainList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            'trainlistData':[],
            'page':0,
            'rowsPerPage':10,
            'menuAnchorElem':null,
            'current_id':'',
            'hasMore':true,
            'count':0,
            'filter':{
                'search_query':'',
                'page_size':10,
                'user_type':'Teacher'
            },
        }  
        this.setAnchorEl                =   this.setAnchorEl.bind(this);
        this.handleMenu                 =   this.handleMenu.bind(this);
        this.handleClose                =   this.handleClose.bind(this);    
        this.fetch                      =   this.fetch.bind(this);
        this.userView                   =   this.userView.bind(this);

    }
    componentWillMount(){
        this.fetch()
    }
    
    componentWillReceiveProps(nextProps){
        var me      =   this;
        if(this.props.fetchTrainData.fetchProg === true && nextProps.fetchTrainData.fetchProg === false ){
            me.props.progress(false);
            if(nextProps.fetchTrainData.error === null){
                var teacher    =   nextProps.fetchTrainData.fetchTrain;
                var local_array = teacher;
                    local_array.forEach((i)=>{
                        me.state.trainlistData.push(i)
                    })
            
            } else {
                this.setState({'hasMore':false})
                var error   =   nextProps.fetchTrainData.error;
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
                    var f_message     =   error.message;
                    me.props.showAlert(
                        "ERROR",
                        f_message,
                        {
                            label:"OK",
                            onClick:()=>me.props.hideAlert()
                        }
                    )
                }
            }
        }

       
    }
    
    
    fetch(){
        var me = this;
        var train  = me.props.fetchTrainData.fetchTrain
        console.log("tttttttttttttttt",train)
        if(train.length!==0){
            this.setState({'trainlistData':train.data})
        }
        
    }
    userView(){
        var id   =   this.state.current_id;
        // this.props.history.push("/app/user/"+id+"/view")
    }
    
    setAnchorEl(elem){
        this.setState({
            menuAnchorElem:elem
        })
    }
    handleMenu(event) {
        this.setAnchorEl(event.currentTarget);
    }
    
    handleClose() {
        this.setAnchorEl(null);
    }

    
    
   

    render(){
        const classes       =  this.props.classes;
        var state           =  this.state;
        var open            =  Boolean(this.state.menuAnchorElem);
        const loader =  <div style= {{'textAlign':'center','marginTop':'20%'}}><CircularProgress color="primary"></CircularProgress></div>
        return(
                <div className={classes.root}>
                    {this.state.trainlistData.length === 0 && this.state.trainlistData==undefined && <div className={classes.notImg}> 
                    <img src={NotFound} alt="no data img" className={classes.nimg} />

                </div>}
                        {this.state.trainlistData.map((item,i)=>{
                            return <React.Fragment> <Card  key={i}
                                className={classes.card} 
                                onClick={()=>{
                
                                }}>
                                 <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {item.name.charAt(0)}
                                    </Avatar>
                                }
                                title={item.name}
                                subheader={item.source}
                                action={
                                    <IconButton aria-label="settings" onClick={(event)=>{
                                        this.setState({current_id:item.id})
                                        this.handleMenu(event)
                                    }}>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            /> 
                            <CardContent style={{padding: 0, paddingLeft: "15px"}}>
                                <Grid container styl>
                                    <Grid item xs={3}>
                                        <div className={classes.icon_div}><LocationCityOutlined></LocationCityOutlined> {item.source}</div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {/* <div className={classes.icon_div}><WcOutlined></WcOutlined> {item.destination}</div> */}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className={classes.icon_div}><LocationCityOutlined></LocationCityOutlined> {item.destination}</div>
                                    </Grid>
                                    <Grid item xs={3}>
                                    </Grid>
                                </Grid>
                                
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
                                    <MenuItem onClick={()=>{
                                            this.handleClose();
                                        }}>
                                        <Typography >Book</Typography>
                                    </MenuItem>
                                    
                                </Menu>
                            </CardContent>  
                            </Card>
                            </React.Fragment>
                        })}
                </div>
        
        );
    }
}

export default compose(
    withRouter,
    withStyles(useStyles)
  )(connect((state, props) => {
    //State to Prop
    return {
        fetchTrainData:state.trainReducer,
    };
  }, {
    showAlert:DialogAction.showAlert,
    hideAlert:DialogAction.hideAlert,
    showConfirm: DialogAction.showConfirm,
    hideConfirm: DialogAction.hideConfirm,
    progress:CircularProgressAction.progress,
    fetchTrain:TrainAction.fetchTrain,
  })(TrainList))