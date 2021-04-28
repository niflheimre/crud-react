import {Grid, makeStyles,TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux'
import phoneCode from './../../collections/phoneCode.json';
import ReactFlagsSelect from 'react-flags-select';

const useStyles = makeStyles((theme) => ({
  
    minBoxHeight: {
      minHeight: "4rem",
      display: "block",
    },
  
    select: {
    },
  
}));

export default function CustomPhoneInput(props) {
  
  const classes = useStyles();
  const state = useSelector(state => state.candidates);

  const { name, label, value, onChange, error = null} = props;
  
  const [select, setSelect] = useState("");

  useEffect(() => {
    setSelect("TH")
  }, [state]);

  const handleOnChangeCode = (val) => {
    
    setSelect(val);

    return { target: { name: "phoneCode", value: val } }
  }
  
  return (
    <Grid container item direction="row" spacing={3} justify="flex-start" alignItems="baseline">
      <Grid item>
        <ReactFlagsSelect
          className={classes.select}
          selected={select}
          placeholder="Dial Code"
          onSelect={(value) => onChange(handleOnChangeCode(value))}
          customLabels={phoneCode}
          searchable
          alignOptionsToRight
        />
      </Grid>

      <Grid item>
        <TextField
          required
          className={classes.minBoxHeight}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          {...(error && { error: true })}
        />
      </Grid>
    </Grid>
  );
}


