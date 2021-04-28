import {
  Grid,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableBody
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CheckBox from "./inputControl/CheckBox";
import Button from './inputControl/Button';
import clsx from 'clsx';


const tableStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      color: "#ffffff",
      backgroundColor: theme.palette.primary.main,
    },
    "& tbody td": {
      
    }
  },
  isSelect: {
    "& .MuiTableRow-root.data": {
      backgroundColor: "RGBA(0,0,0,0.15)",
    },
  },
}));


export default function TableTemplate(candidates, headCells) {
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();

  const classes = tableStyles();

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRows = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteAllItem = () => {
    if (selectAll) {
      dispatch({ type: "CLEAR", data: {} });
      setSelectAll(false);
    }
  };

  const recordsAfterPaging = () =>
    candidates.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const emptyRows = () =>
    candidates.length > 0
      ? rowsPerPage -
        Math.min(rowsPerPage, candidates.length - page * rowsPerPage)
      : rowsPerPage;

  const TBSelectAll = (props) => (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <CheckBox
            name="Select All"
            label=""
            selected={selectAll}
            onChange={() => setSelectAll(!selectAll)}
          />
        </Grid>
        <Grid item>
          <Button
            text="Delete all"
            size="small"
            color="secondary"
            varient={""}
            onClick={() => handleDeleteAllItem()}
          />
        </Grid>
      </Grid>
    </>
  );
    
  const TBPagination = (props) => (
    <TablePagination
      component="div"
      page={page}
      count={candidates.length}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRows}
    />
  );

  const TBcontainer = (props) => (
    <Table
      className={clsx({
        [classes.table]: true,
        [classes.isSelect]: selectAll,
      })}
    >
        
      {props.children}
      
     
      <TableBody>
        {emptyRows() > 0 && (
          <TableRow style={{ height: 63 * emptyRows() }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const TBheader = (props) => (
    <TableHead >
      <TableRow>
        {headCells.map((head) => (
          <TableCell key={head.id} {...head}>{head.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  return {
    TBcontainer,
    TBheader,
    TBPagination,
    TBSelectAll,
    recordsAfterPaging,
    emptyRows,
    selectAll,
  };
}
