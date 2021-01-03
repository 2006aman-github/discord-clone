import React, { Component } from "react";
import "./ServerChannels.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import stateContext from "../StateProvider";
import { Avatar, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default class ServerChannels extends Component {
  useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      fontSize: "0.8rem",
      fontWeight: "normal",
      padding: "5px",
      backgroundColor: theme.palette.common.black,
    },
  }));

  BootstrapTooltip = (props) => {
    const classes = this.useStylesBootstrap();

    return (
      <Tooltip
        arrow
        classes={classes}
        {...props}
        style={{ fontSize: "1rem !important" }}
        placement="top"
      />
    );
  };
  render() {
    return (
      <div className="server__channels">
        <div className="server__channels__header">
          <h4>{this.props.activeServer?.name}</h4>
          <ExpandMoreIcon />
        </div>
        <div className="server__channels__body">
          <h5
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#ddd",
              width: "100%",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <span>
              <ArrowForwardIosIcon
                style={{ color: "#ddd", fontSize: "8px", marginRight: "3px" }}
              />
              TEXT CHANNELS
            </span>
            <IconButton>
              <AddIcon
                style={{ color: "#ddd" }}
                onClick={() => {
                  this.context.toggleShowChannelCreateModal();
                }}
              />
            </IconButton>
          </h5>
          {this.props.activeServer?.channels?.map((channel) => (
            <span
              className="channel"
              onClick={() => this.props.handleActiveChannel(channel?._id)}
              style={{
                backgroundColor:
                  this.props.activeChannel?._id === channel?._id
                    ? "#393c43"
                    : null,
                width: "100%",
                borderRadius: "5px",
                padding: "0px 3px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color:
                    this.props.activeChannel?._id === channel?._id
                      ? "white"
                      : null,
                }}
              >
                <span id="hash">#</span> {channel?.name}
              </div>
            </span>
          ))}
          {/* server channel footer  */}
        </div>
        <div className="server__channels__footer">
          <div style={{ flex: "0.5" }}>
            <Avatar />
          </div>
          <small>
            <b>{this.context?.user?.username?.slice(0, 10)}</b>
          </small>
          <div className="server__channels__footer__icons">
            <IconButton
              size="small"
              onClick={(e) => {
                this.context.toggleDeafen();
              }}
            >
              {this.context?.deafen ? (
                <this.BootstrapTooltip title="Undeafen">
                  <VolumeOffIcon style={{ fontSize: "20px", color: "#ddd" }} />
                </this.BootstrapTooltip>
              ) : (
                <this.BootstrapTooltip title="Deafen">
                  <VolumeUpIcon style={{ fontSize: "20px", color: "#ddd" }} />
                </this.BootstrapTooltip>
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                this.context.toggleMute();
              }}
            >
              {this.context?.mute ? (
                <this.BootstrapTooltip title="UnMute">
                  <MicOffIcon style={{ fontSize: "20px", color: "#ddd" }} />
                </this.BootstrapTooltip>
              ) : (
                <this.BootstrapTooltip title="Mute">
                  <MicIcon style={{ fontSize: "20px", color: "#ddd" }} />
                </this.BootstrapTooltip>
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                this.context.toggleShowUserSettings();
              }}
              size="small"
            >
              <this.BootstrapTooltip title="User Settings">
                <SettingsIcon style={{ fontSize: "20px", color: "#ddd" }} />
              </this.BootstrapTooltip>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

ServerChannels.contextType = stateContext;
