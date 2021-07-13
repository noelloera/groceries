//The component being rendered in list should move over
import React from "react";
import InputField from "./InputField";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { Grid, Typography, Paper, Button } from "@material-ui/core";
//Holds styling
import styles from "../helpers/styles.jsx";

class Items extends React.Component {
  render() {
    const { classes } = this.props;
    return (
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
              <form
                name="itemForm"
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  this.props.submit(e);
                }}
              >
              <Button onClick={(e)=>{
                this.props.goBack(e)
              }

              }>BACK</Button>
                <Typography variant="h2">Items: </Typography>
                <InputField
                  label="Add an item..."
                  name="itemField"
                  type="text"
                  variant="standard"
                  required
                  onChange={(e) => {
                    this.props.change(e);
                  }}
                />
                <button>+</button>
                {this.props.renderItems()}
              </form>
            </div>
          </Grid>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(Items));
