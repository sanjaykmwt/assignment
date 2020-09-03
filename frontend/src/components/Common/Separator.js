/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { withStyles,createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const line_color    =   '#e4e4e4';
const label_color    =   '#CCC';

const styles    =   (theme)=>createStyles({
    'without_label_separator':{
        width:'100%',
        margin:theme.spacing(8)+' auto',
        borderBottom:'solid 1px #e4e4e4'
    },
    'with_label_separator':{
        textAlign:'center',
        position:'relative',
        '&::before':{
            content:'""',
            display:'block',
            position:'absolute',
            left:0,
            right:0,
            top:'10px',
            width:'100%',
            borderBottom:'solid 1px '+line_color
        }
    },
    'label':{
        color:label_color,
        fontSize:'16px',
        display:'inline-block',
        position:'relative',
        zIndex:10,
        background:theme.palette.background.default,
        padding:theme.spacing(0,1)
    }

});

class Separator extends React.Component {
    render(){
        const {classes}     =   this.props;

        if(this.props.label == null){
            return <div className={classes.without_label_separator}></div>
        } else {
            return <div className={classes.with_label_separator}>
                    <span className={classes.label}>{this.props.label}</span>
                </div>
        }
        
    }
}

Separator.defaultProps = {
    label:null
}

Separator.propTypes = {
    label:PropTypes.string
}

export default withStyles(styles)(Separator)