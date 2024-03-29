import React from "react";
import { withRouter } from "react-router-dom";
import {
  getAccess,
  getRefresh,
  clearAccess,
  clearRefresh,
} from "../helpers/jwt.js";
import axios from "axios";
import DataHandler from "./DataHandler.js";
import SplashScreen from "./SplashScreen.js";

class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      displaySplash: true,
      data: {},
    };
    this.newAccess = this.newAccess.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }
  //Will check if refreshe exists and is valid
  async newAccess(refresh) {
    if (refresh) {
      await axios
        .post("/token", { token: refresh })
        //If the request passes, the new access is stored locally
        .then((res) => {
          localStorage.setItem("access", res.data.access);
          //Will route to itself and in turn advance to Authenticate
          this.props.history.push("/login");
        })
        //Errors will erase the stored refresh and route back to login
        .catch((err) => {
          console.log(err);
          clearRefresh();
          this.props.history.push("/login");
        });
    } else {
      this.props.history.push("/login");
    }
  }
  //Obtians locally stored access and refresh if they exist
  async componentDidMount() {
    const access = getAccess();
    const refresh = getRefresh();
    //If there is a refresh but not an access the newAcess function is called
    if (!access && refresh) {
      await this.newAccess(refresh);
    }
    //If both access and refresh exist, they are sent to server to check
    if (access && refresh) {
      await axios
        .get("/me", { headers: { Authorization: `Bearer ${access}` } })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ displaySplash: false, data: res.data });
          }
        })
        .catch((err) => {
          clearAccess();
          clearRefresh();
          this.props.history.push("/login");
        });
    }
    if (!refresh) {
      clearAccess();
      clearRefresh();
      this.props.history.push("/login");
    }
  }
  authenticate() {
    this.setState({ authenticated: true });
  }
  render() {
    return this.state.authenticated ? (
      <DataHandler
        checked={this.props.checked}
        change={this.props.change}
        data={this.state.data}
      />
    ) : (
      <SplashScreen
        displaySplash={this.state.displaySplash}
        authenticate={this.authenticate}
      />
    );
  }
}

export default withRouter(Authenticator);
