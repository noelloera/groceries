import React from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  TextField,
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
        {props.isList ? (
          <ListItemText edge="start">{props.value}</ListItemText>
        ) : (
          <TextField
            value={props.value}
            onChange={(e) => {
              props.onChange(e, props.index);
            }}
          />
        )}
        {props.isList ? (
          <InfoOutlinedIcon
            onClick={(e) => {
              //Calls edit function provides event, index, list id, and id string
              props.editModal(e);
            }}
          />
        ) : null}
      </ListItem>
      <Divider />
    </div>
  );
};

export default ListedElement;
