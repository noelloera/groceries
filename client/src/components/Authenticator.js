import React from "react";
import { withRouter } from "react-router-dom";
import {
  getAccess,
  getRefresh,
  clearAccess,
  clearRefresh,
} from "../helpers/jwt.js";
import axios from "axios";

export default class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
      this.newAccess = this.newAccess.bind(this)
  }

  newAccess(refresh) {
    if (refresh) {
      axios
        .post("/token", { token: refresh })
        .then((res) => {
          console.log(res.data.access);
          localStorage.setItem("access", res.data.access);
          this.props.history.push("/lists");
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
      await this.newAccess()
    }
      if (access) {
        axios.get("/me", {headers: {Authorization: `Bearer ${access}`}})
    }
     if() 
  }
}
