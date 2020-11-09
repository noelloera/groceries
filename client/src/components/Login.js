import React from "react";
import axios from "axios";

import InputField from "./InputField";
import { withRouter } from "react-router-dom";

import {
  getAccess,
  getRefresh,
  clearAccess,
  clearRefresh,
} from "../helpers/jwt";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      option: "login",
    };
  }

  componentDidMount() {
    const access = getRefresh();
    const refresh = getRefresh();
    if (access && refresh) {
      this.props.history.push("/Lists/");
    }
  }

  option(e) {
    e.preventDefault();
    this.state.option === "login"
      ? this.setState({ option: "signup" })
      : this.setState({ option: "login" });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //Refactor this post request to only be one and change depending on the option being sent
  submit(e) {
    e.preventDefault();
    this.state.option === "login"
      ? axios
          .post("/login", {
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            this.props.history.push("/lists");
          })
          .catch((err) => {
            console.log(err);
            alert("incorrect email/password");
            this.props.history.go(0);
          })
      : axios
          .post("/signup", {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
          })
          .then((res) => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            this.props.history.push("/lists");
          })
          .catch((err) => {
            console.log(err);
            this.props.history.go(0);
          });
  }
  render() {
    return (
      <form
        onSubmit={(e) => {
          this.submit(e);
        }}
      >
        {this.state.option === "signup" ? (
          <InputField
            name="username"
            placeholder="username"
            type="text"
            value={this.state.username}
            onChange={(e) => {
              this.change(e);
            }}
          ></InputField>
        ) : null}

        <InputField
          name="email"
          placeholder="email"
          type="text"
          value={this.state.email}
          onChange={(e) => {
            this.change(e);
          }}
        ></InputField>
        <InputField
          name="password"
          placeholder="password"
          type="password"
          value={this.state.password}
          onChange={(e) => {
            this.change(e);
          }}
        ></InputField>
        <button>{this.state.option}</button>
        <p
          onClick={(e) => {
            this.option(e);
          }}
        >
          {this.state.option === "login" ? "signup" : "login"}
        </p>
      </form>
    );
  }
}

export default withRouter(Login);
