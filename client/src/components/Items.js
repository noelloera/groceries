//The component being rendered in list should move over
import React from "react";
import InputField from "./InputField";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { Grid, Typography, CssBaseline, Paper } from "@material-ui/core";
//Holds styling
import styles from "../helpers/styles.jsx";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemField: "",
    };
  }
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
              <form
                name="itemForm"
                className={classes.form}
                onSubmit={(e) => {
                  this.submit(e);
                }}
              >
                <Typography variant="h2">Items: </Typography>
                <InputField
                  label="Add an item..."
                  name="itemField"
                  type="text"
                  variant="standard"
                  required
                  value={this.state.itemField}
                  onChange={(e) => {
                    this.change(e);
                  }}
                />
                <button>+</button>
                {this.props.renderItems()}
              </form>
            </div>
          </Grid>
        </CssBaseline>
      </Grid>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(Items));
