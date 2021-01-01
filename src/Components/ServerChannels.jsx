import React, { Component } from "react";
import "./ServerChannels.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import stateContext from "../StateProvider";
import { Avatar, IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";

export default class ServerChannels extends Component {
  render() {
    return (
      <div className="server__channels">
        <div className="server__channels__header">
          <h4>{this.props.activeServer?.name}</h4>
          <ExpandMoreIcon />
        </div>
        <div className="server__channels__body">
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
              width: "100%",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            Channels
            <IconButton>
              <AddIcon />
            </IconButton>
          </h4>
          {this.props.activeServer?.channels?.map((channel) => (
            <span
              onClick={() => this.props.handleActiveChannel(channel?._id)}
              style={{
                backgroundColor:
                  this.props.activeChannel?._id === channel?._id
                    ? "#202225"
                    : null,
                width: "100%",
                borderRadius: "5px",
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
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
              {this.context.deafen ? (
                <VolumeOffIcon style={{ fontSize: "20px" }} />
              ) : (
                <VolumeUpIcon style={{ fontSize: "20px" }} />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                this.context.toggleMute();
              }}
            >
              {this.context.mute ? (
                <MicOffIcon style={{ fontSize: "20px" }} />
              ) : (
                <MicIcon style={{ fontSize: "20px" }} />
              )}
            </IconButton>
            <IconButton size="small">
              <SettingsIcon style={{ fontSize: "20px" }} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

ServerChannels.contextType = stateContext;
