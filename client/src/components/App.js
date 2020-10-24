import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//components
//import SplashScreen from "./SplashScreen/SplashScreen.js";
import Login from "./Login";
import Authenticator from "./Authenticator.js";
import Lists from "./Lists.js";
//import Lists from "./Lists";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Authenticator>
            <Route path="/lists" component={Lists}></Route>
          </Authenticator>
        </Switch>
      </BrowserRouter>
    );
  }
}
