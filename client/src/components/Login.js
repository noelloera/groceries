import {
  getRefresh,

} from "../helpers/jwt";
import React from "react";
import axios from "axios";
import InputField from "./InputField";
import { withRouter } from "react-router-dom";
//validators
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
const password = new passwordValidator();
password.is().min(6).is().max(18).has().digits(1).has().not().spaces();

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
//Obtains refresh and access
  componentDidMount() {
    const access = getRefresh();
    const refresh = getRefresh();
    if (access && refresh) {
      this.props.history.push("/Authenticator/");
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
    //checks if the option is login and the email and password is valid
    if (
      this.state.option === "login" &&
      emailValidator.validate(this.state.email) &&
      password.validate(this.state.password)
    ) {
      axios
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
          this.props.history.go(0);
        });
    }
    if (
      this.state.option === "signup" &&
      this.state.username &&
      emailValidator.validate(this.state.email) &&
      password.validate(this.state.password)
    ) {
      axios
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
