import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import "./loginpage.css";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link, withRouter } from "react-router-dom";
import axios from "../axiosConfig";
import { Snackbar } from "@material-ui/core";

class SignupPage extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    showSnackBar: {},
    loginBtnDisabled: false,
  };

  signup = async () => {
    this.setState({
      showSnackBar: {
        status: false,
        message: "",
      },
      loginBtnDisabled: true,
    });
    const { username, email, password } = this.state;
    let signupBody = {
      username: username,
      email: email,
      password: password,
    };
    await axios
      .post("/api/users/signup", signupBody)
      .then((res) => {
        this.setState({
          showSnackBar: {
            status: true,
            message: "Successfully Signed Up!",
          },
          loginBtnDisabled: false,
        });
        setTimeout(this.props.history.push("/login"), 5000);
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          showSnackBar: {
            status: true,
            message: err.response?.data?.message,
          },
          loginBtnDisabled: false,
        });
      });
  };

  render() {
    return (
      <div className="signup__page">
        <img
          src={"https://img.icons8.com/fluent/48/4a90e2/discord-logo.png"}
          alt="discord logo"
        />
        <br />
        <div className="signup__modal">
          <div className="signup__form">
            <h2>Create an account!</h2>
            {/* form of login  */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.signup();
              }}
            >
              <small>EMAIL OR PHONE NUMBER</small>
              <input
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
                type="email"
              />
              <br />
              <small>USERNAME</small>
              <input
                value={this.state.username}
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                  });
                }}
                type="text"
              />
              <br />
              <small>PASSWORD</small>
              <input
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                type="password"
              />
              <br />
              <input
                id={"signup-btn"}
                className={this.state.loginBtnDisabled ? "btn__disabled" : ""}
                type={"submit"}
                disabled={this.state.loginBtnDisabled}
                value={this.state.loginBtnDisabled ? "Registering" : "Register"}
              />
              <small>
                Have an account? <Link to="/login">Login</Link>
              </small>
            </form>
            {/* <small>or</small>
            <br /> */}
            {/* social login 
            <div className="social__login">
              <GoogleLogin
                clientId="482482362714-pulmu886r1cg37g9m3hc6bb99crkqpbu.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={(res) => {
                  console.log(res);
                }}
                onFaliure={(err) => {
                  console.log(err);
                }}
                cookiePolicy="single_host_origin"
              />
              <FacebookLogin
                appId="887791515324023"
                textButton="Login With Facebook"
                size="medium"
                autoLoad={false}
                fields="name, email, picture"
                icon={<FacebookIcon />}
                cssClass="facebook-login-btn"
                onClick={(res) => {
                  console.log(res);
                }}
                callback={(res) => {
                  console.log(res);
                }}
              />

            </div> */}
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={this.state?.showSnackBar?.status}
              autoHideDuration={2000}
              message={this.state?.showSnackBar?.message}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SignupPage);
