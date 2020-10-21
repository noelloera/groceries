import React from "react";

const InputField = (props) => {
  return (
    <input
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      onChange={(e) => {
        props.onChange(e);
      }}
    ></input>
  );
};
export default InputField;