import { Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react'

export default function CheckBox(props) {
    const {onChange,selected,name,label} = props;

    return (
        <FormControlLabel
          control={
            <Checkbox
              checked={selected}
              onChange={onChange}
              name={name}
            />
          }
          label={label}
        />
    );
}
