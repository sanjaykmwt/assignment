/* Copyright (c) 2019 Dinesh Visweswaraiah.  All rights reserved.  This code shall in no way be used by any person for any reason. */
import React from 'react';
import { withStyles,createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-mui';
import {FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton,FormHelperText} from "@material-ui/core"

const styles    =   (theme)=>createStyles({
  input:{
    paddingBottom:"10.5px",
    paddingTop:"10.5px"
  }
});

// const abc   = (
//      <div><OutlinedInput margin="dense"/>
//     </div>)
class OutlinedPhone extends React.Component {
    render(){
     
        return <FormControl  variant="outlined" fullWidth>
                    <InputLabel  margin="dense" htmlFor={this.props.id}>{this.props.label}{this.props.required && <span style={{'color':'red'}}>&nbsp;*</span>}</InputLabel>
                    <ReactPhoneInput 
                      margin="dense"
                      // containerClass={classes.input}
                      // inputClass={classes.input}
                      value={this.props.value}
                      onChange={this.props.onChange} // passed function receives the phone value
                      component={OutlinedInput}
                      disabled={this.props.disabled}
                      defaultCountry={'in'}
                      inputExtraProps={{
                        labelWidth:this.props.labelWidth,
                        startAdornment:<InputAdornment position={'start'}>&nbsp;</InputAdornment>,
                        endAdornment:<InputAdornment position={this.props.icon_position}>
                                        <IconButton
                                          tabIndex={-1}
                                            onClick={this.props.onIconClick}
                                            edge="end"
                                        >
                                            {this.props.icon}
                                        </IconButton>
                                      </InputAdornment>,
                        placeholder:this.props.placeholder,
                        error:this.props.error
                      }}
                    /> {this.props.helperText.trim().length > 0 && <FormHelperText
                      error={this.props.error}
                  >{this.props.helperText}</FormHelperText>}
              </FormControl>
    }
}

OutlinedPhone.defaultProps = {
  defaultCountry:'us',
  value:"",
  onChange:null,
  required:false,
  placeholder:"",
  labelWidth:70,
  type:'text',
  icon:null,
  icon_position:'end',
  onIconClick:null,
  inputComponent:null,
  helperText:'',
  disabled:false,
}

OutlinedPhone.propTypes   =   {
  id:PropTypes.string.isRequired,
  label:PropTypes.string.isRequired,
  value:PropTypes.string,
  onChange:PropTypes.func,
  icon:PropTypes.element,
  icon_position:PropTypes.oneOf(['end', 'start']),
  onIconClick:PropTypes.func,
  inputComponent:PropTypes.element,
  placeholder:PropTypes.string,
  required:PropTypes.bool,
  helperText:PropTypes.string,
  disabled:PropTypes.bool,
};

export default withStyles(styles)(OutlinedPhone)