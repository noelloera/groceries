import { getRefresh, rme } from "../helpers/jwt";
import React from "react";
import axios from "axios";
import InputField from "./InputField";
//validators
import passValidator from "password-validator";
import emailValidator from "email-validator";
//Later separate these into individual imports
import {
  Button,
  Box,
  CssBaseline,
  Typography,
  Paper,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
//Logo
import GroceriesLogo from "../assets/grocerieslogo.png";
//Icons
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
//withStyles takes in styles, and higher order component as arguments
import { withStyles } from "@material-ui/core/styles";
import styles from "../helpers/styles.jsx";
import PropTypes from "prop-types";
//Email and password validator
const passwordValidator = new passValidator();
passwordValidator.is().min(6).is().max(18).has().digits(1).has().not().spaces();
//Application footer copyright function
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Grocerylists
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      option: "login",
      rememberMe: true,
    };
  }
  //Uses jwt.js helper functions to get locally stored access & refresh if exists
  componentDidMount() {
    const access = getRefresh();
    const refresh = getRefresh();
    if (!rme()) localStorage.setItem("rme", true);
    //If both exists, Authenticator handles
    if (access && refresh) {
      this.props.history.push("/Authenticator/");
    }
  }

  //Sets the type of form by setting the state to either signup or login
  option(e) {
    e.preventDefault();
    this.state.option === "login"
      ? this.setState({ option: "signup" })
      : this.setState({ option: "login" });
  }

  //Sets the value of the event target to the corresponding state
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //Refactor this post request to only be one and change depending on the option being sent
  submit(e) {
    e.preventDefault();
    //Creates copies of each of the values
    let email = this.state.email.slice();
    let password = this.state.password.slice();
    let username = this.state.username.slice();
    let option = this.state.option.slice();
    //Email and Password Validator
    let validEmail = emailValidator.validate(email);
    let validPass = passwordValidator.validate(password);
    if (validEmail && validPass) {
      //Checks if login / signup as option
      if (option === "login") {
        //Makes axios request to login route
        axios
          .post("/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            this.props.history.push("/lists");
          })
          .catch((err) => {
            console.log(err);
            alert("Invalid Email / Password");
            this.props.history.go(0);
          });
      }
      if (option === "signup") {
        //Makes axios request to signup route
        axios
          .post("/signup", {
            email: email,
            password: password,
            username: username,
          })
          .then((res) => {
            if (res.status === 201) {
              localStorage.setItem("access", res.data.access);
              localStorage.setItem("refresh", res.data.refresh);
              if (this.state.rememberMe) localStorage.setItem("rme", true);
              this.props.history.push("/lists");
            } else {
              alert("An account with that email already exists");
              this.props.history.go(0);
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              alert("An account with that email already exists");
            }
          });
      }
    } else {
      if (!validEmail) {
        alert("Invalid Email / Password");
        return;
      }
      if (!validPass) {
        if (option === "login") {
          alert("Invalid Email / Password");
          return;
        } else {
          alert(
            "Password must be minimum 6 characters, maximum 18. Must contain 1 digit and no spaces."
          );
          return;
        }
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.content}>
        <CssBaseline>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            className={classes.paper}
          >
            <div className={classes.paper}>
              {/*Icon */}
              <Typography variant="h1">grocery-lists</Typography>
              <img
                src={GroceriesLogo}
                className={classes.avatar}
                alt="groceries application login logo"
              />
              <Typography component="h1" variant="h5">
                {this.state.option === "login" ? "login" : "signup"}
              </Typography>
              <form
                action="#"
                className={classes.form}
                onSubmit={(e) => {
                  this.submit(e);
                }}
              >
                {this.state.option === "signup" ? (
                  <InputField
                    id="username"
                    label="First Name"
                    name="username"
                    type="text"
                    autoComplete="name"
                    variant="outlined"
                    required
                    autoFocus={true}
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
                  variant="outlined"
                  required
                  autoFocus={true}
                  onChange={(e) => {
                    this.change(e);
                  }}
                ></InputField>
                <InputField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  required
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    this.change(e);
                  }}
                ></InputField>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="rememberMe"
                      color="primary"
                      checked={this.state.rememberMe}
                      onClick={(e) => {
                        let remember = !this.state.rememberMe;
                        this.setState({ rememberMe: remember });
                        localStorage.setItem("rme", remember);
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {this.state.option === "login" ? "Login" : "Sign Up"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#">
                      <Typography color="primary" variant="caption">
                        Forgot password?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs
                    onClick={(e) => {
                      e.preventDefault();
                      this.option(e);
                    }}
                  >
                    {this.state.option === "login" ? (
                      <Link href="#">
                        <Typography
                          color="primary"
                          variant="caption"
                          className={classes.option}
                        >
                          Don't have an account? Signup
                        </Typography>
                      </Link>
                    ) : (
                      <Link href="#">
                        <Typography
                          inline
                          color="primary"
                          variant="caption"
                          className={classes.option}
                        >
                          Already have an account? Log in!
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
                {/*Adds a Box container to set the top margin*/}
                <Box mt={1}>
                  {/*Grid container sets the items layout */}
                  <Box
                    pt={3}
                    pb={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <WbSunnyIcon />
                    <Switch
                      color="primary"
                      checked={this.props.checked}
                      onChange={this.props.change}
                    />
                    <Brightness3Icon />
                  </Box>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
          {/*Adds the picture to fill in the remainder of the md and bigger screens */}
          <Grid item xs={false} sm={false} md={6} className={classes.image} />
        </CssBaseline>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
//Got rid of withRouter
export default withStyles(styles, { withTheme: true })(Login);
