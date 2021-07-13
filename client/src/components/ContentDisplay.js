//The component being rendered in list should move over
import React from "react";
import InputField from "./InputField";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import {
  Grid,
  Typography,
  Paper,
  Button,
  List,
  CssBaseline,
} from "@material-ui/core";
//Holds styling
import styles from "../helpers/styles.jsx";

class ContentDisplay extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.content}>
        <CssBaseline>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            className={classes.listsPaper}
          >
            <div className={classes.listsPaper}>
              {this.props.isList ? (
                <Typography variant="caption">
                  Hello {this.props.username}
                </Typography>
              ) : null}
              <form
                name={this.props.isList ? "listForm" : "itemForm"}
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  this.props.submit(e);
                }}
              >
                {this.props.isList ? null : (
                  <Button
                    onClick={(e) => {
                      this.props.goBack(e);
                    }}
                  >
                    BACK
                  </Button>
                )}
                <Typography variant="h2">
                  {this.props.isList ? "My Lists" : "Items"}
                </Typography>
                <InputField
                  label={
                    this.props.isList ? "Add a new list..." : "Add an item..."
                  }
                  name={this.props.isList ? "listField" : "itemField"}
                  type="text"
                  variant="standard"
                  value={this.props.value}
                  required
                  onChange={(e) => {
                    this.props.change(e);
                  }}
                />
                <button>+</button>
                <List>{this.props.renderAll()}</List>
              </form>
            </div>
          </Grid>
        </CssBaseline>
      </Grid>
    );
  }
}
export default withRouter(
  withStyles(styles, { withTheme: true })(ContentDisplay)
);
