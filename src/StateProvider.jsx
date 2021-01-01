import React, { Component } from "react";

const stateContext = React.createContext();

export class StateProvider extends Component {
  state = {
    user: {},
    deafen: false,
    mute: false,
    activeServer: {},
    showChannelCreateModal: false,
    showServerCreateModal: false,
  };

  toggleDeafen = () => {
    this.setState({
      deafen: !this.state.deafen,
    });
  };
  toggleShowServerCreateModal = () => {
    this.setState({
      showServerCreateModal: !this.state.showServerCreateModal,
    });
  };

  toggleShowChannelCreateModal = () => {
    this.setState({
      showChannelCreateModal: !this.state.showChannelCreateModal,
    });
  };

  addActiveServer = (server) => {
    this.setState({
      activeServer: server,
    });
    console.log("im at active server function");
  };

  toggleMute = () => {
    this.setState({
      mute: !this.state.mute,
    });
  };

  loginUser = (user) => {
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
    return (
      <stateContext.Provider value={this}>
        {this.props.children}
      </stateContext.Provider>
    );
  }
}

export default stateContext;
