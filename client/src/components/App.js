import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
//import SplashScreen from "./SplashScreen/SplashScreen.js";
import Login from "./Login";
import Authenticator from "./Authenticator.js";
//Material UI theming
import { ThemeProvider } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "../helpers/themes.js";

import styles from "../helpers/styles";
import PropTypes from "prop-types";
import SplashScreen from "./SplashScreen";

function App(props) {
  //useState needs an array of declarations, the second is a function that sets the first
  const [currentMode, setTheme] = useState("light");
  //Calls external useStyles function
  //const classes = useStyles();
  const { classes } = props;
  //Will run before render and set the localStorage
  useEffect(() => {
    //Will retrieve saved localStorage variable if exists
    const savedTheme = localStorage.getItem("theme");
    //Conditional will set state if client varaible exists
    if (savedTheme) {
      savedTheme === "light" ? setTheme("light") : setTheme("dark");
      //If not then the default will be set to light
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);
  //Switch component calls this onChange function
  function handleThemeChange() {
    //Conditional that changes the localStorage variable and state to its opposite
    if (currentMode === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      return;
    }
    if (currentMode === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
      return;
    }
    //If for some reason there is no currentMode then it is set to light as default
    localStorage.setItem("theme", "light");
    setTheme("light");
  }
  function checked() {
    return currentMode === "light" ? false : true;
  }

  function getTheme() {
    return currentMode === "light" ? lightTheme : darkTheme;
  }

  return (
    <ThemeProvider theme={getTheme()}>
      <Paper className={classes.app}>
        <BrowserRouter>
          <Switch>
            {/*Login and Default path both route to the same component*/}{" "}
            <Route
              path={["/", "/login"]}
              exact
              render={(props) => (
                <div>
                  <SplashScreen />
                  <Login
                    {...props}
                    checked={checked()}
                    change={() => {
                      handleThemeChange();
                    }}
                  />
                </div>
              )}
            />
            <Route
              render={(props) => (
                <Authenticator
                  path={["/authenticator"]}
                  {...props}
                  checked={checked()}
                  change={() => {
                    handleThemeChange();
                  }}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);
