import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
//import SplashScreen from "./SplashScreen/SplashScreen.js";
import Login from "./Login";
import Authenticator from "./Authenticator.js";
import Lists from "./Lists.js";
//Material UI theming
import { ThemeProvider } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import lightTheme from "../helpers/lightTheme.js";
import darkTheme from "../helpers/darkTheme.js";
import MSwitch from "@material-ui/core/Switch";

function App() {
  const [darkMode, currentMode] = useState("light");
  useEffect(() => {
    const existingPreference = localStorage.getItem("theme");
    if (existingPreference) {
      existingPreference === "light"
        ? currentMode("light")
        : currentMode("dark");
    } else {
      currentMode("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  function handleThemeChange() {
    if (currentMode === "light") {
      localStorage.setItem("theme", "dark");
      currentMode("dark");
    }
    if (currentMode === "dark") {
      localStorage.setItem("theme", "dark");
      currentMode("dark");
    }
  }

  return (
    /*Added conditional dark theme setting */
    <ThemeProvider theme={currentMode === "light" ? lightTheme : darkTheme}>
      <Paper>
        <BrowserRouter>
          <Switch>
            {/*Login and Default path both route to the same component*/}
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Authenticator>
              {/*Protected component, that only the Authenticator can route to*/}
              <Route path="/lists" component={Lists}></Route>
            </Authenticator>
          </Switch>
        </BrowserRouter>
        <MSwitch
          checked={currentMode === "light"}
          onChange={() => {
            handleThemeChange();
          }}
        ></MSwitch>
      </Paper>
    </ThemeProvider>
  );
}
export default App;
