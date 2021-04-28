import {
  DatePicker,
} from '@material-ui/pickers';

import React from 'react';
import { makeStyles } from '@material-ui/core';


const boxStyles = makeStyles((theme) => ({
  minHeightBox: {
    minHeight: "5rem",
  },
}));


export default function Datepicker(props) {

  const classes = boxStyles();
  const { name, label, value, onChange, error = null } = props;

  const dataConvertion = (name,value) => (
      { 
      target: {
        name,value
      }
      }
  )

    return (
      <DatePicker
        className={classes.minHeightBox}
        name={name}
        label={label}
        variant="inline"
        value={value}
        format="dd/MM/yyyy"
        disableFuture
        onChange={(date) => onChange(dataConvertion(name, date))}
        {...(error && { error: true, helperText: error })}
      />
    );
}
