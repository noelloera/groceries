import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//components
//import SplashScreen from "./SplashScreen/SplashScreen.js";
import Login from "./Login";
//import Lists from "./Lists";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login}></Route>

        </Switch>
      </BrowserRouter>
    );
  }
}
