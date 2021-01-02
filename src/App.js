import "./App.css";
import ChatFeed from "./Components/ChatFeed";
import ServerChannels from "./Components/ServerChannels";
import ServerList from "./Components/ServerList";
import { Component } from "react";
// material ui imports

import LoginPage from "./Components/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { withRouter } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import stateContext from "./StateProvider";
import axios from "./axiosConfig";
import Server from "./Components/Server";
import Pusher from "pusher-js";
import NotFound from "./Components/NotFound";

const pusher = new Pusher("d6de7d7d9c3d0d22b615", {
  cluster: "ap2",
});

class App extends Component {
  componentDidMount() {
    const axiosCall = async () => {
      await axios
        .get("/api/users/authenticate", {
          headers: {
            jwt: localStorage.getItem("discordJWT"),
          },
        })
        .then(async (res) => {
          console.log(res.data);
          this.context.loginUser(res.data);

          this.props.history.push(`/channels/${res.data?.servers[0]._id}`);
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push("/login");
        });
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
        </div>
        <Route exact path="*" component={NotFound} />
      </Switch>
    );
  }
}

App.contextType = stateContext;

export default withRouter(App);
