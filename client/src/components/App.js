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
  //useState needs an array of declarations, the second is a function that sets the first
  const [currentMode, setTheme] = useState("light");
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
          checked={currentMode === "light" ? false : true}
          onChange={(e) => {
            handleThemeChange();
          }}
        ></MSwitch>
      </Paper>
    </ThemeProvider>
  );
}
export default App;
