import React from "react";
import { withRouter } from "react-router-dom";
import {
  getAccess,
  getRefresh,
  clearAccess,
  clearRefresh,
} from "../helpers/jwt.js";
import axios from "axios";

class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
    this.newAccess = this.newAccess.bind(this);
  }

  async newAccess(refresh) {
    if (refresh) {
      await axios
        .post("/token", { token: refresh })
        .then((res) => {
          localStorage.setItem("access", res.data.access);
          this.props.history.push("/login");
        })
        .catch((err) => {
          console.log(err);
          clearRefresh();
          this.props.history.push("/login");
        });
    }
  }
  //Work on the authenticated user mounting and routing accordingly
  async componentDidMount() {
    const access = getAccess();
    const refresh = getRefresh();
    if (!access && refresh) {
      await this.newAccess(refresh);
    }
    if (access && refresh) {
      await axios
        .get("/me", { headers: { Authorization: `Bearer ${access}` } })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ authenticated: true });
            this.props.history.push("/lists");
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
  render() {
    if (this.state.authenticated) {
      return <div>{this.props.children}</div>;
    }
    return <div> loading </div>;
  }
}

export default withRouter(Authenticator);
