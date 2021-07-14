import React from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
} from "@material-ui/core";
//MaterialUI icons
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
const ListedElement = (props) => {
  return (
    <div>
      <ListItem
        role={undefined}
        button
        id={props.id}
        key={props.id}
        name={props.name}
        onClick={(e) => {
          if (props.isList) {
            props.onClick(e, props.index);
          }
          return;
        }}
      >
        {props.isList ? null : (
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              checked={props.index === -1}
              onChange={(e) => {
                props.onClick(e, props.index, props.id);
              }}
            />
          </ListItemIcon>
        )}

        <ListItemText edge="start">{props.name}</ListItemText>
        <InfoOutlinedIcon
          onClick={(e) => {
            //Calls edit function provides event, index, list id, and id string
            this.edit(e, props.index, props.id, "item");
          }}
        />
      </ListItem>
      <Divider />
    </div>
  );
};

export default ListedElement;
