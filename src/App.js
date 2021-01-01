import "./App.css";
import ChatFeed from "./Components/ChatFeed";
import ServerChannels from "./Components/ServerChannels";
import ServerList from "./Components/ServerList";
import { Component } from "react";
// material ui imports

import LoginPage from "./Components/LoginPage";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import stateContext from "./StateProvider";
import axios from "./axiosConfig";
import Server from "./Components/Server";

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

          this.props.history.push(`/${res.data?.servers[0]._id}`);
        })
        .catch((err) => {
          this.props.history.push("/login");
        });
    };
    axiosCall();
  }

  render() {
    return (
      <>
        <Switch>
          <div className="App">
            {/* <h1>Lets build a Discord clone Using Class components</h1> */}
            <ServerList />
            <Route path="/:serverId">
              <Server />
            </Route>
          </div>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </>
    );
  }
}

App.contextType = stateContext;

export default withRouter(App);
