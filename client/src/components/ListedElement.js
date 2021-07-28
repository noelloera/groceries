import React from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  TextField,
} from "@material-ui/core";

//Styling
import { withStyles } from "@material-ui/core/styles";
import styles from "../helpers/styles.jsx";
//Components
import EditListModal from "./EditListModal.js";

const ListedElement = (props) => {
  return (
    <div>
      {/*Conditional values based on isList prop*/}
      <form
        name={props.isList ? null : "itemEdit"}
        onSubmit={(e) => {
          props.submit(e, props.index);
        }}
      >
        <ListItem role={undefined} button id={props.id} key={props.id}>
          {/*If isList, no component rendered, else Checkbox for items*/}
          {props.isList ? null : (
            <ListItemIcon style={{ margin: 0, padding: 0 }}>
              <Checkbox
                style={{ margin: 0, padding: 0 }}
                edge="start"
                tabIndex={-1}
                checked={props.index === -1}
                onChange={(e) => {
                  props.click(e, props.index, props.id);
                }}
              />
            </ListItemIcon>
          )}
          {/*If isList true only text displayed, else then textfield */}
          {props.isList ? (
            <ListItemText
              onClick={(e) => {
                if (props.isList) {
                  props.click(e, props.index);
                }
                return;
              }}
              edge="start"
            >
              {props.value.slice(0)}
            </ListItemText>
          ) : (
            <TextField
              fullWidth
              name="currentItem"
              value={props.value}
              onChange={(e) => {
                props.onChange(e, props.index);
              }}
            />
          )}

          {/*If isList EditModal component displayed, else no component*/}
          {props.isList ? (
            <EditListModal
              id={props.id}
              name="currentList"
              index={props.index}
              value={props.value}
              currentList={props.currentList}
              onChange={props.onChange}
              setCurrent={props.setCurrent}
              onSubmit={props.submit}
              delete={props.delete}
            />
          ) : null}
        </ListItem>
      </form>
      {props.isList ? <Divider /> : null}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ListedElement);
