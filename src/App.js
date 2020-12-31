import "./App.css";
import ChatFeed from "./Components/ChatFeed";
import ServerChannels from "./Components/ServerChannels";
import ServerList from "./Components/ServerList";
import { Component } from "react";
// material ui imports
import NotificationsIcon from "@material-ui/icons/Notifications";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/Inbox";
import HelpIcon from "@material-ui/icons/Help";
import MessageInput from "./Components/MessageInput";
import LoginPage from "./Components/LoginPage";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import stateContext from "./StateProvider";
import axios from "./axiosConfig";

class App extends Component {
  componentDidMount() {
    const axiosCall = async () => {
      await axios
        .get("/api/users/authenticate", {
          headers: {
            jwt: localStorage.getItem("discordJWT"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.context.loginUser(res.data);
          this.props.history.push("/");
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
          <Route exact path="/">
            <div className="App">
              {/* <h1>Lets build a Discord clone Using Class components</h1> */}

              <ServerList />
              <ServerChannels />
              <div className="main__app">
                {/* header  */}
                <div className="main__app__header">
                  <span>
                    <h1>#</h1> general
                  </span>
                  <div className="main__app__header__right">
                    <NotificationsIcon
                      style={{
                        margin: "0 8px",
                        color: "#DCDDDE",
                        cursor: "pointer",
                      }}
                    />
                    <BookmarksIcon
                      style={{
                        margin: "0 8px",
                        color: "#DCDDDE",
                        cursor: "pointer",
                      }}
                    />
                    <GroupIcon
                      style={{
                        margin: "0 8px",
                        color: "#DCDDDE",
                        cursor: "pointer",
                      }}
                    />
                    <div className="header__serach">
                      <input type="text" placeholder={"Search"} />
                      <SearchIcon />
                    </div>
                    <InboxIcon
                      style={{
                        margin: "0 8px",
                        color: "#DCDDDE",
                        cursor: "pointer",
                      }}
                    />
                    <HelpIcon
                      style={{
                        margin: "0 8px",
                        color: "#DCDDDE",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                {/* app body  */}
                <div className="main__app__body">
                  <ChatFeed />
                  <MessageInput />
                </div>
              </div>
            </div>
          </Route>
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
