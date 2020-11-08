import React from "react";

const List = (props) => {
  return (
    <h2
      onClick={(e) => {
        props.onClick(e);
      }}
      >{props.name}</h2>
  );
};

export default List;
