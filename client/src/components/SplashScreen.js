import { Typography, Grid, CssBaseline } from "@material-ui/core";
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
    }, 500);
  }, [props]);
  return (
    <div>
      {loading ? (
        <Grid container className={classes.content}>
          <CssBaseline>
            <Grid
              item
              xs={12}
              sm={8}
              md={11}
              lg={11}
              xl={11}
              className={classes.paper}
              style={{ backgroundColor: "#fd6f20" }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%", maxHeight: "83vh" }}
              >
                <Grid item>
                  <Typography variant="h1" style={{ color: "#ffffff" }}>
                    grocery-lists
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
            </Grid>
          </CssBaseline>
        </Grid>
      ) : (
        props.children
      )}
    </div>
  );
};
SplashScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};
//Wraps Component with Material UI stylying
export default withStyles(styles)(SplashScreen);
