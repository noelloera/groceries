import React from "react";
import { withRouter } from "react-router-dom";
import {
  getAccess,
  getRefresh,
  clearAccess,
  clearRefresh,
} from "../helpers/jwt.js";
export default class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }
  //Work on the authenticated user mounting and routing accordingly
  componentDidMount() {
    if (!getAccess()) {
      this.props.history.push("/login");
    }
  }
}
