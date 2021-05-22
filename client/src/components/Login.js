import { getRefresh } from "../helpers/jwt";
import React from "react";
import axios from "axios";
import InputField from "./InputField";
import { withRouter } from "react-router-dom";
//validators
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import { Button, Typography } from "@material-ui/core";
//Separate by material core imports
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
//Learn why this react-redux works
//import { connect } from "react-redux";
//This and the propType requirement needed to work on HigherOrderComponents
//import { makeStyles, withStyles } from "@material-ui/core/styles";
//import PropTypes from "prop-types";

/*const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));*/
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
  //Uses jwt.js helper functions to get locally stored access & refresh if exists
  componentDidMount() {
    const access = getRefresh();
    const refresh = getRefresh();
    //If both exists, Authenticator handles 
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
            id="username"
            label="Username"
            name="username"
            type="text"
            autoComplete="name"
            value={this.state.username}
            onChange={(e) => {
              this.change(e);
            }}
          ></InputField>
        ) : null}

        <InputField
          id="email"
          label="Email Address"
          name="email"
          type="text"
          value={this.state.email}
          autoComplete="email"
          onChange={(e) => {
            this.change(e);
          }}
        ></InputField>
        <InputField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={this.state.password}
          autoComplete="current-password"
          onChange={(e) => {
            this.change(e);
          }}
        ></InputField>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {this.state.option}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid
            style={{
              cursor: "pointer",
              hover: { textDecoration: "underline" },
            }}
            item
            onClick={(e) => {
              e.preventDefault();
              this.option(e);
            }}
          >
            {this.state.option === "login" ? (
              <Typography color="primary">
                Don't have an account? Signup
              </Typography>
            ) : (
              <Typography color="primary">
                Already have an account? Log in!
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withRouter(Login);
