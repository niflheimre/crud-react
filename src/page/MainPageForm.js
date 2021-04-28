import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid, makeStyles} from "@material-ui/core";
import RadioInput from "./../conponents/inputControl/RadioInput";
import TextInput from "./../conponents/inputControl/TextInput";
import CustomPhoneInput from "./../conponents/inputControl/CustomPhoneInput";
import { useForm, Form } from "./../conponents/FormTemplate";
import Datepicker from "./../conponents/inputControl/Datepicker";
import MuiButton from "./../conponents/inputControl/Button";
import SelectMenu from "./../conponents/inputControl/SelectMenu";
import * as TitleService from "./../services/TitleService";
import * as NationalityService from "./../services/NationalityService";
import ThaiIdValidator from "../services/ThaiIdValidaotr";

const formStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  gridContainer: {},
  gridItem: {
    marginLeft: "1rem",
    marginRight: "1rem",
    minWidth: "0",
  },
  formControl: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
    minHeight: "5rem",
  },
  nationSelect: {
    minWidth: "10rem",
  },
  titleGrid: {
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  titleSelect: {
    minWidth: "3.5rem",
  },
  submitBtn: {
    width: "10rem",
    height: "6rem",
    fontSize: "1.2rem",
    borderRadius: "10px",
  },
}));

const InitialData = {
  id: uuidv4(),
  title: "Mx.",
  Fname: "",
    Lname: "",
  phoneCode:"TH",
  phone: "",
  gender: "unisex",
  citizenId: "",
  nation: "",
  passport: "",
  expSalary: "",
  birthDate: new Date(),
};

export default function MainPageForm(props) {
  
    const { dataForEdit, addOrEdit } = props;

    const classes = formStyle();

    const validate = (fieldData = data) => {
      let temp = { ...errors };

      if ("title" in fieldData) temp.title = fieldData.title ? "" : "required.";
      if ("Fname" in fieldData) temp.Fname = fieldData.Fname ? (/^[a-zA-Z]+$/.test(fieldData.Fname) ? ""  :"must not contain number.") : "required.";
      if ("Lname" in fieldData) temp.Lname = fieldData.Lname ? (/^[a-zA-Z]+$/.test(fieldData.Lname) ? "" : "must not contain number.") : "required.";
      if ("phone" in fieldData) temp.phone = /^\d{8,}/.test(fieldData.phone) ? "" : "required.";
      if ("birthDate" in fieldData) temp.birthDate = (
          fieldData.birthDate.getDate() === new Date().getDate() &&
          fieldData.birthDate.getMonth() === new Date().getMonth() &&
          fieldData.birthDate.getFullYear() === new Date().getFullYear()
      ) ? "Invalid Date.":"";
          
      if ("expSalary" in fieldData) temp.expSalary = fieldData.expSalary ?
          (/^\$?-?0*(?:\d+(?!,)(?:\.\d{1,2})?|(?:\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?))$/.test(fieldData.expSalary) ? "" : "must not contain character.")
        : "required.";
          
            
      if ("citizenId" in fieldData)
        temp.citizenId = (ThaiIdValidator(fieldData.citizenId) || fieldData.citizenId === "")
          ? "" : "invalid citizen ID.";
        
      if ("passport" in fieldData)
            TextInput.passport = (/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(fieldData.passport) || fieldData.passport === "")
            ? "" : "invalid Passport NO..";

      
      setErrors({ ...temp });
      if (fieldData === data) return Object.values(temp).every((x) => x === "");

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
          addOrEdit(data, resetForm);
        }
    };

  // Form template
  const {
    data,
    setData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(InitialData, validate);

  useEffect(() => {
    if (dataForEdit != null) {
      setData({
        ...dataForEdit,
      }
      );
    }
  },);


return (
  <Form className={classes.root}>
    <Grid container className={classes.gridContainer}>
      <Grid container item sm={12}>
        <Grid item className={classes.titleGrid}>
          <SelectMenu
            className={classes.titleSelect}
            name="title"
            label="Title"
            defaultValue="Mx."
            autoWidth={true}
            value={data.title}
            onChange={handleInputChange}
            options={TitleService.getTitleCollection()}
            error={errors.title}
          />
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextInput
            required={true}
            name="Fname"
            label="First name"
            value={data.Fname}
            onChange={handleInputChange}
            error={errors.Fname}
          />
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextInput
            required={true}
            name="Lname"
            label="Last name"
            value={data.Lname}
            onChange={handleInputChange}
            error={errors.Lname}
          />
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid item xs={4} className={classes.gridItem}>
          <Datepicker
            name="birthDate"
            label="Birth Date"
            value={data.birthDate}
            onChange={handleInputChange}
            error={errors.birthDate}
          />
        </Grid>

        <Grid item className={classes.gridItem}>
          <SelectMenu
            className={classes.nationSelect}
            name="nation"
            label="Nationality"
            value={data.nation}
            onChange={handleInputChange}
            options={NationalityService.getNationCollection()}
          />
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid item xs={5} className={classes.gridItem}>
          <TextInput
            name="citizenId"
            label="Citizen ID"
            value={data.citizenId}
            onChange={handleInputChange}
            error={errors.citizenId}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} className={classes.gridItem}>
          <RadioInput
            name="gender"
            label="Gender"
            value={data.gender}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} className={classes.gridItem}>
          <CustomPhoneInput
            name="phone"
            label="Phone"
            value={data.phone}
            onChange={handleInputChange}
            error={errors.phone}
            code={data.phoneCode}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={5} className={classes.gridItem}>
          <TextInput
            name="passport"
            label="Passport no."
            value={data.passport}
            onChange={handleInputChange}
            error={errors.passport}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} justify="space-between" alignItems="center">
        <Grid item className={classes.gridItem}>
          <TextInput
            required={true}
            name="expSalary"
            label="Expected Salary"
            value={data.expSalary}
            onChange={handleInputChange}
            error={errors.expSalary}
          />
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <MuiButton
            className={classes.submitBtn}
            type="submit"
            color="primary"
            name="submitBtn"
            text="Submit"
            onClick={handleSubmit}
          >
            Submit
          </MuiButton>
        </Grid>
      </Grid>
    </Grid>
  </Form>
);
}
