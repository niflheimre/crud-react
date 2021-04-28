import {makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const TextStyle = makeStyles(theme => ({
  minHeightBox: { 
    minHeight: "5rem",
  }
}))
export default function TextInput(props) {
    
  const classes = TextStyle();
   const { name, label, value, onChange ,error=null,...other} = props;
    
    return (
      <TextField
        className={ classes.minHeightBox}
        fullWidth
        {...other}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
      />
    );
}
