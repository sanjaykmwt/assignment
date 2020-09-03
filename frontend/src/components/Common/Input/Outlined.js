/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { withStyles,createStyles } from '@material-ui/core/styles';
import {FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton,FormHelperText} from "@material-ui/core"
import PropTypes from 'prop-types';

const styles    =   (theme)=>createStyles({
});

class Outlined extends React.Component {
    render(){

        return <FormControl  variant="outlined" fullWidth>
                    <InputLabel 
                    error={this.props.error}
                    htmlFor={this.props.id}>{this.props.label}{this.props.required && <span style={{'color':'red'}}>&nbsp;*</span>}</InputLabel>
                    <OutlinedInput
                        margin="dense"
                        id={this.props.id}
                        type={this.props.type}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                        disabled={this.props.disabled}
                        startAdornment={<InputAdornment position={'start'}>&nbsp;</InputAdornment>}
                        endAdornment={
                            this.props.icon != null && <InputAdornment position={this.props.icon_position}>
                            <IconButton
                                tabIndex={-1}
                                onClick={this.props.onIconClick}
                                edge="end"
                            >
                                {this.props.icon}
                            </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={this.props.labelWidth}
                        placeholder={this.props.placeholder}
                        multiline={this.props.multiline}
                        rows={this.props.rows}
                    />
                    {this.props.helperText.trim().length > 0 && <FormHelperText
                        error={this.props.error}
                    >{this.props.helperText}</FormHelperText>}
                </FormControl>
    }
}

Outlined.defaultProps = {
    labelWidth:70,
    type:'text',
    value:null,
    onChange:null,
    icon:null,
    rows:null,
    icon_position:'end',
    onIconClick:null,
    placeholder:"",
    required:false,
    error:false,
    disabled:false,
    helperText:'',
    multiline:false

}

Outlined.propTypes   =   {
    id:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    value:PropTypes.string,
    onChange:PropTypes.func,
    icon:PropTypes.element,
    icon_position:PropTypes.oneOf(['end', 'start']),
    onIconClick:PropTypes.func,
    placeholder:PropTypes.string,
    required:PropTypes.bool,
    error:PropTypes.bool,
    multiline:PropTypes.bool,
    helperText:PropTypes.string,
    disabled:PropTypes.bool,
    rows:PropTypes.number
};

export default withStyles(styles)(Outlined)