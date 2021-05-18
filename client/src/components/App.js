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
          {/*Login and Default path both route to the same component*/}
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Authenticator>
            {/*Protected component, that only the Authenticator can route to*/}
            <Route path="/lists" component={Lists}></Route>
          </Authenticator>
        </Switch>
      </BrowserRouter>
    );
  }
}
