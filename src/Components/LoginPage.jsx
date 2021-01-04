import React, { Component } from "react";
import "../undraw_Group_chat_re_frmo.svg";
import GoogleLogin from "react-google-login";
import "./loginpage.css";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link, withRouter } from "react-router-dom";
import axios from "../axiosConfig";
import { Snackbar } from "@material-ui/core";
import stateContext from "../StateProvider";
import CreateServerModal from "./CreateServerModal";
import queryString from "query-string";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    showSnackBar: {},
    loginBtnDisabled: false,
  };

  login = async () => {
    let parsedQueries = queryString.parse(window.location.search);
    this.setState({
      loginBtnDisabled: true,
    });
    let loginBody = {
      email: this.state.email,
      password: this.state.password,
    };
    await axios
      .post("/api/users/login", loginBody)
      .then((res) => {
        localStorage.setItem("discordJWT", res.data.jwt);
        this.setState({ loginBtnDisabled: false });
        if (parsedQueries) {
          return this.props.history.push(parsedQueries.redirect);
        }
        if (res.data.user.servers[0]) {
          this.setState({
            showSnackBar: {
              status: true,
              message: res?.data?.message,
            },
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          this.context.toggleShowServerCreateModal();
        }
      })
      .catch((err) => {
        this.setState({
          loginBtnDisabled: false,
        });
        this.setState({
          showSnackBar: {
            status: true,
            message: err?.response?.data?.message,
          },
        });
      });
  };

  render() {
    return (
      <div className="login__page">
        <img
          src="https://img.icons8.com/fluent/48/4a90e2/discord-logo.png"
          alt="discord logo"
        />
        <br />
        <div className="login__modal">
          <div className="login__form">
            <h2>Welcome Back!</h2>
            <p>we are so exited to see you here again!</p>

            {/* form of login  */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.login();
              }}
            >
              <small>EMAIL OR PHONE NUMBER</small>
              <input
                required
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
                type="email"
              />
              <br />
              <small>PASSWORD</small>
              <input
                required
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                type="password"
              />
              <small>
                <a href="/">Forgot Your Password?</a>
              </small>
              <br />
              <input
                id={"login-btn"}
                className={this.state.loginBtnDisabled ? "btn__disabled" : ""}
                type={"submit"}
                disabled={this.state.loginBtnDisabled}
                value={this.state.loginBtnDisabled ? "Logging In" : "Login"}
              />

              <small>
                Need an account? <Link to="/signup">Register</Link>
              </small>
            </form>
            {/* <small>or</small>
            <br /> */}
            {/* social login  */}
            {/* <div className="social__login">
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
            <CreateServerModal />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={this.state?.showSnackBar?.status}
              autoHideDuration={200}
              message={this.state?.showSnackBar?.message}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
LoginPage.contextType = stateContext;
