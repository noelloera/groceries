import { getRefresh } from "../helpers/jwt";
import React from "react";
import axios from "axios";
import InputField from "./InputField";
//validators
import passwordValidator from "password-validator";
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
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//withStyles takes in styles, and higher order component as arguments
import { withStyles } from "@material-ui/core/styles";
import styles from "../helpers/styles.jsx";
import PropTypes from "prop-types";
//Email and password validator
const password = new passwordValidator();
password.is().min(6).is().max(18).has().digits(1).has().not().spaces();
//Application footer copyright function
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Groceries
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
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
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
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {this.state.option === "login" ? "Login" : "Sign Up"}
              </Typography>
              <form
                className={classes.form}
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
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    this.change(e);
                  }}
                ></InputField>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
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
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
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
