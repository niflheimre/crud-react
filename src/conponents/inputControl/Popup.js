import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
     padding: theme.spacing(2),
  },
  dialogTitle: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(1),
    padding:theme.spacing(2)
  },
}));

export default function Popup(props) {
  const { children,openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Grid container justify="space-between" spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="div">
              Edit Information
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
                  aria-label="delete"
                  color="secondary"
                onClick={() => setOpenPopup(false)}
            >
                <CloseIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
