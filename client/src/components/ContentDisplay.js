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
  Box,
} from "@material-ui/core";
//Holds styling
import styles from "../helpers/styles.jsx";
//MaterialUI icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
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
              <Box borderBottom={1.1} className={classes.topBar}>
                <div className={classes.item}>
                  {this.props.isList ? (
                    <Button>
                      <SentimentSatisfiedOutlinedIcon />
                      {"\u00A0"}
                      {"\u00A0"}
                      {this.props.username}
                    </Button>
                  ) : null}
                  {this.props.isList ? null : (
                    <Button
                      onClick={(e) => {
                        this.props.goBack(e);
                      }}
                    >
                      <ArrowBackIcon />
                      BACK
                    </Button>
                  )}
                </div>
                <div className={classes.centerItem}>
                  <Typography variant="h1">
                    {this.props.isList ? "My Lists" : this.props.listName}
                  </Typography>
                </div>
                <div className={classes.rightItem}>
                  <MoreVertIcon className={classes.item} />
                </div>
              </Box>
              <Box display="flex">
                <form
                  name={this.props.isList ? "listForm" : "itemForm"}
                  className={classes.form}
                  onSubmit={(e) => {
                    this.props.submit(e);
                  }}
                >
                  <InputField
                    label={this.props.isList ? "Add a new list" : "Add an item"}
                    name={this.props.isList ? "listField" : "itemField"}
                    type="text"
                    variant="standard"
                    value={this.props.value}
                    required
                    onChange={(e) => {
                      this.props.change(e);
                    }}
                  />
                </form>
              </Box>

              <List>{this.props.renderAll()}</List>
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
