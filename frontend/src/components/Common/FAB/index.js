import React from 'react';
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "./style";
import {withRouter} from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'



class FloatingButton extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        } 
        this.buttonAction   =   this.buttonAction.bind(this); 
    }
    buttonAction(){
        this.props.history.push(this.props.method)
    }
    render(){
        const classes   =   this.props.classes;
    //    console.log("fab icon",this.props.method);
        return(           
        <div onClick={this.buttonAction}>
            <Tooltip title="Add" aria-label="Add" placement="left">
                <Fab  color="primary" aria-label="Add" className={classes.fab} >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div> 
        )
    }
}

export default compose(withRouter,withStyles(useStyles))(FloatingButton);

