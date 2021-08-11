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
  Switch,
} from "@material-ui/core";
//Holds styling
import styles from "../helpers/styles.jsx";
//MaterialUI icons
import SyncIcon from "@material-ui/icons/Sync";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
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
            className={classes.contentDisplay}
          >
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
                <SyncIcon
                  onClick={(e) => {
                    this.props.refresh(e);
                  }}
                  className={classes.syncIcon}
                />
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
            <List className={classes.allListed}>{this.props.renderAll()}</List>
            <Box
              pt={2}
              borderTop={1.1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <WbSunnyIcon />
              <Switch
                color="primary"
                checked={this.props.switchChecked}
                onChange={this.props.switchChange}
              />
              <Brightness3Icon />
            </Box>
          </Grid>
        </CssBaseline>
      </Grid>
    );
  }
}
export default withRouter(
  withStyles(styles, { withTheme: true })(ContentDisplay)
);
