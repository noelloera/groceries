import React from "react";
import { TextField } from "@material-ui/core";
const InputField = (props) => {
  return (
    <TextField
      margin="normal"
      variant={props.variant}
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      type={props.type}
      value={props.value}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      required={props.required}
      onChange={(e) => {
        props.onChange(e);
      }}
    ></TextField>
  );
};
export default InputField;
