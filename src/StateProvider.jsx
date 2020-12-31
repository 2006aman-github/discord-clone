import React, { Component } from "react";

const stateContext = React.createContext();

export class StateProvider extends Component {
  state = {
    user: {},
    deafen: false,
    mute: false,
  };

  toggleDeafen = () => {
    this.setState({
      deafen: !this.state.deafen,
    });
  };
  toggleMute = () => {
    this.setState({
      mute: !this.state.mute,
    });
  };

  loginUser = (user) => {
    console.log("im here");
    this.setState({
      user: user,
    });
  };

  logoutUser = () => {
    this.setState({
      user: {},
    });
    localStorage.setItem("discordJWT", null);
  };

  render() {
    const { user, deafen, mute } = this.state;
    const { loginUser, logoutUser, toggleDeafen, toggleMute } = this;
    return (
      <stateContext.Provider
        value={{
          user,
          loginUser,
          logoutUser,
          toggleDeafen,
          toggleMute,
          deafen,
          mute,
        }}
      >
        {this.props.children}
      </stateContext.Provider>
    );
  }
}

export default stateContext;
