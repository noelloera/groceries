import React from "react";
import "./Items.css";

export default function Items(props) {
  //Should map the items within the lists
  return (
    <div className="Items">
      <h1>Items:</h1>
      <ul className="Items-List">{props.renderItems()}</ul>
    </div>
  );
}
