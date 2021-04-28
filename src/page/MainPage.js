import { Container, Grid, makeStyles, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableTemplate from "./../conponents/TableTemplate";
import MuiButton from "./../conponents/inputControl/Button";
import Popup from "./../conponents/inputControl/Popup";
import MainPageForm from "./MainPageForm";
import phoneCode from './../collections/phoneCode.json';


const useStyle = makeStyles(theme => ({

    tableContainer: {
        margin: theme.spacing(4),
    },
    formContainer: {
        margin: theme.spacing(4),
        marginTop:theme.spacing(4),
        padding: theme.spacing(6),
  },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      padding:theme.spacing(1)
    }
}))



const headCells = [
  { id: "name", label: "Name" },
  { id: "gender", label: "Gender"},
  { id: "phone", label: "Mobile Phone" },
  { id: "nation", label: "Nationality" },
  { id: "action", label: "",width:"130px"},
];

function MainPage() {

  const candidates = useSelector(state => state.candidates);
    
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);


  const {
    TBcontainer,
    TBheader,
    TBPagination,
    TBSelectAll,
    recordsAfterPaging,
  } = TableTemplate(candidates, headCells);

  const openEditPopup = (item) => {
    
    item.birthDate = new Date(item.birthDate);

    setDataForEdit(item);
    setOpenPopup(true);
  };

  const addOrEdit = (data, resetForm) => {
    openPopup
      ? dispatch({ type: "UPDATE", data: data })
      : dispatch({ type: "CREATE", data: data });

    resetForm();
    setOpenPopup(false);
  };

    const classes = useStyle();

  return (
    <Container>
      <Paper elevation={3} className={classes.formContainer}>
        <MainPageForm addOrEdit={addOrEdit} />
      </Paper>

      <Paper className={classes.tableContainer}>
        
        <Grid container className={ classes.toolbar} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <TBSelectAll />
          </Grid>
          <Grid item>
            <TBPagination />
          </Grid>
        </Grid>

        <TBcontainer>
          <TBheader />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.id} className="data">
                <TableCell>
                  {item.Fname} {item.Lname}
                </TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>
                  {phoneCode[item.phoneCode]}
                  {item.phone}
                </TableCell>
                <TableCell>{item.nation}</TableCell>
                <TableCell align="right">
                  <MuiButton
                    text="EDIT"
                    size="small"
                    color="default"
                    varient="default"
                    onClick={() => openEditPopup(item)}
                  />
                  <MuiButton
                    text="DELETE"
                    size="small"
                    color="secondary"
                    varient="default"
                    onClick={() => {
                      dispatch({ type: "DELETE", idArr: [item.id] });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TBcontainer>
      </Paper>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <MainPageForm dataForEdit={dataForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </Container>
  );
}
export default MainPage;
