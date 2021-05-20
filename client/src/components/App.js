import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
//import SplashScreen from "./SplashScreen/SplashScreen.js";
import Login from "./Login";
import Authenticator from "./Authenticator.js";
import Lists from "./Lists.js";
//Material UI theming
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, Paper } from "@material-ui/core";
import theme from "../helpers/theme.js";
import MSwitch from "@material-ui/core/Switch";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createMuiTheme({
    palette: { type: "dark" },
  });
  const lightTheme = createMuiTheme({});
  return (
    <ThemeProvider theme={theme}>
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
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        ></MSwitch>
      </Paper>
    </ThemeProvider>
  );
}
export default App;
