import "./App.css";
import { Component } from "react";
// material ui imports

import LoginPage from "./Components/LoginPage";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import { withRouter } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import stateContext from "./StateProvider";
import axios from "./axiosConfig";
import Server from "./Components/Server";
import InvitePage from "./Components/InvitePage";

class App extends Component {
  componentDidMount() {
    const axiosCall = async () => {
      console.log("hello");
      if (this.props.location?.pathname.includes("/invite/")) {
        this.props.history.push(this.props.location?.pathname);
      } else {
        await axios
          .get("/api/users/authenticate", {
            headers: {
              jwt: localStorage.getItem("discordJWT"),
            },
          })
          .then(async (res) => {
            this.context.loginUser(res.data);
            console.log(res.data);
            this.props.history.push(`/channels/${res.data?.servers[0]._id}/`);
          })
          .catch((err) => {
            this.props.history.push("/login");
          });
      }
    };
    axiosCall();
  }

  render() {
    return (
      <Switch>
        <div className="App">
          {/* <h1>Lets build a Discord clone Using Class components</h1> */}
          <Route exact path="/channels/:serverId">
            <Server />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/invite/:inviteId">
            <InvitePage />
          </Route>
        </div>
      </Switch>
    );
  }
}

App.contextType = stateContext;

export default withRouter(App);
