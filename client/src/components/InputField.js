import React from "react";
import { TextField } from "@material-ui/core";
const InputField = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      type={props.type}
      value={props.value}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      onChange={(e) => {
        props.onChange(e);
      }}
    ></TextField>
  );
};
export default InputField;
