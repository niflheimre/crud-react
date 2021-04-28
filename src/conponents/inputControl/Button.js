import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const btnStyles = makeStyles((theme) => ({
    

}))

export default function MuiButton(props) {

    const classes = btnStyles();
    const { text, size, color, varient, onClick,...other } = props;

    return (
        <Button
            className={classes.btn}
            varient={varient}
            size={size || "large"}
            color={color || null}
            onClick={onClick}
            {...other}
        >
            {text}
        </Button>
    )
}
