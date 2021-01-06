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
    showUserSettings: false,
    invite: "",
    showSnackBar: {},
    showMembers: false,
    showRightSidebar: false,
    showServerMembers: false,
  };
  toggleShowRightSidebar = () => {
    this.setState({
      showRightSidebar: !this.state.showRightSidebar,
    });
  };
  toggleShowServerMembers = () => {
    this.setState({
      showServerMembers: !this.state.showServerMembers,
    });
  };

  toggleShowUserSettings = () => {
    this.setState({
      showUserSettings: !this.state.showUserSettings,
    });
  };

  toggleShowMembers = () => {
    this.setState({
      showMembers: !this.state.showMembers,
    });
  };

  setShowSnackBar = (snackbar) => {
    this.setState({
      showSnackBar: snackbar,
    });
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
  addInvite = (link) => {
    this.setState({
      invite: link,
    });
  };

  render() {
    const {
      toggleDeafen,
      toggleMute,
      toggleShowChannelCreateModal,
      toggleShowServerCreateModal,
      toggleShowUserSettings,
      loginUser,
      logoutUser,
      addInvite,
      setShowSnackBar,
      toggleShowMembers,
      toggleShowRightSidebar,
      toggleShowServerMembers,
    } = this;
    const {
      user,
      deafen,
      showMembers,
      mute,
      invite,
      activeServer,
      showChannelCreateModal,
      showServerCreateModal,
      showUserSettings,
      showSnackBar,
      showRightSidebar,
      showServerMembers,
    } = this.state;
    return (
      <stateContext.Provider
        value={{
          user,
          deafen,
          showMembers,
          mute,
          invite,
          activeServer,
          showChannelCreateModal,
          showServerCreateModal,
          showUserSettings,
          showSnackBar,
          showRightSidebar,
          showServerMembers,
          toggleDeafen,
          toggleMute,
          toggleShowChannelCreateModal,
          toggleShowServerCreateModal,
          toggleShowUserSettings,
          loginUser,
          logoutUser,
          addInvite,
          setShowSnackBar,
          toggleShowMembers,
          toggleShowRightSidebar,
          toggleShowServerMembers,
        }}
      >
        {this.props.children}
      </stateContext.Provider>
    );
  }
}

export default stateContext;
