import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const selectStyles = makeStyles((theme) => ({
  minHeightBox: {
    minHeight: "5rem",
    minWidth:"2rem",
  },
}));


export default function SelectMenu(props) {

  const classes = selectStyles();
  const { name, label, value, error = null, onChange, options = [],...other} = props;

  return (
    <FormControl
      {...(error && { error: true })}
      className={classes.minHeightBox}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.value}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
