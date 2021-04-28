import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useForm(InitialData, validate) {
  const [data, setData] = useState(InitialData);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setData({ ...InitialData, id: uuidv4() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setData({
      ...data,
      [name]: value,
    });

    validate({ [name]: value });
  };

  return {
    data,
    setData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function Form(props) {
  // const classes = formStyle();
  const { children, ...other } = props;

  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
}
