import React, { Component } from "react";
import "./ServerChannels.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import stateContext from "../StateProvider";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import ServerMenu from "./ServerMenu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "../axiosConfig";

export default class ServerChannels extends Component {
  state = {
    openDialogue: false,
    anchorEl: null,
  };

  handleClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
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

  copyToClipboard = (e) => {
    this.input.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };

  render() {
    return (
      <div className="server__channels">
        <div className="server__channels__header">
          <h4>{this.props.activeServer?.name}</h4>
          <ExpandMoreIcon
            onClick={(e) => {
              this.handleClick(e);
            }}
          />
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={() => this.handleClose()}
          >
            <MenuItem
              onClick={() => {
                this.setState({ openDialogue: true, anchorEl: false });
              }}
            >
              Invite a Member <PersonAddIcon style={{ marginLeft: "10px" }} />
            </MenuItem>
          </Menu>

          {/* dialouge  */}
          <Dialog
            style={{ padding: "20px", textAlign: "center" }}
            open={this.state.openDialogue}
          >
            <DialogTitle
              style={{ textAlign: "right" }}
              id="simple-dialog-title"
            >
              <IconButton>
                <CloseIcon
                  onClick={() => {
                    this.setState({
                      openDialogue: false,
                    });
                  }}
                />
              </IconButton>
            </DialogTitle>
            <DialogTitle id="simple-dialog-title">
              Invite People To {this.props.activeServer?.name}
            </DialogTitle>
            <Typography variant="p" id="simple-dialog-title">
              SEND AN INVITATION LINK TO YOUR FRIEND
            </Typography>
            <TextField
              onClick={(e) => {
                navigator.clipboard.writeText(this.context.invite);
                e.target.select();
              }}
              value={this.context.invite}
              style={{ margin: "20px" }}
              label="LINK"
            ></TextField>
          </Dialog>
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
          <h4>
            <b>{this.context?.user?.username?.slice(0, 10)}</b>
          </h4>
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
