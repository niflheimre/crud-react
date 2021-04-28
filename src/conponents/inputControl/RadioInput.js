import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import React from 'react'


const useStyles = makeStyles((theme) => ({
  minBoxHeight: {
    height: "5rem",
  },
}));

export default function RadioInput(props) {

  const classes = useStyles();
    const { name, label, value, onChange } = props;
    
    return (
      <FormControl className={classes.minBoxHeight}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          row
          aria-label={label}
          name={name}
          value={value}
          onChange={onChange}
        >
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
          />
          <FormControlLabel
            value="unisex"
            control={<Radio color="primary" />}
            label="Unisex"
            defaultValue
          />
        </RadioGroup>
      </FormControl>
    );
}