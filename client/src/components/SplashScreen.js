import { Typography, Grid } from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";
import GroceriesLogo from "../assets/splashlogo.png";
//withStyles takes in styles, and higher order component as arguments
import { withStyles } from "@material-ui/core/styles";
import styles from "../helpers/styles.jsx";
import PropTypes from "prop-types";
//React
import React, { useState, useEffect } from "react";

const SplashScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const { classes } = props;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (props.displaySplash) {
        setLoading(true);
        props.authenticate();
      }
      if (!props.displaySplash) {
        setLoading(false);
      }
    }, 1000);
  }, [props]);
  return (
    <Grid container className={classes.content}>
      {loading ? (
        <Grid
          item
          xs={12}
          sm={8}
          md={11}
          lg={11}
          xl={11}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.paper}
          style={{ backgroundColor: "#fd6f20" }}
        >
          <Grid item>
            <Typography variant="h1" style={{ color: "#ffffff" }}>
              groceries
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={GroceriesLogo}
              className={classes.avatar}
              alt="groceries application splashscreen logo"
            />
          </Grid>
          <Grid item>
            <BeatLoader color="white" loading={loading} size={9} />
          </Grid>
        </Grid>
      ) : (
        props.children
      )}
    </Grid>
  );
};
SplashScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};
//Wraps Component with Material UI stylying
export default withStyles(styles)(SplashScreen);
