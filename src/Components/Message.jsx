import { Avatar, makeStyles, Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import stateContext from "../StateProvider";
import "./message.css";

export default class Message extends Component {
  state = {
    time: "",
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
  render() {
    let messageTime = new Date(this.props.message?.messageTime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      <div
        onMouseOver={() => {
          this.setState({
            time: messageTime.toLocaleTimeString(),
          });
        }}
        onMouseLeave={() => {
          this.setState({
            time: "",
          });
        }}
        style={{
          margin: this.props.noAvatar ? "0 5px" : "5px",
          padding: this.props.noAvatar ? "0px" : "5px",
        }}
        className="message"
      >
        <Avatar
          style={{
            visibility: this.props.noAvatar ? "hidden" : "visible",
            backgroundColor:
              this.props.message?.user?._id === this.props.activeServer?.admin
                ? "#43b581"
                : "#7289da",
          }}
        >
          {this.props.message?.user?.username.slice(0, 1)}
        </Avatar>

        <div className="message__body">
          <div className="message__body__details">
            <span
              style={{
                color:
                  this.props.message?.user?._id ===
                  this.props.activeServer?.admin
                    ? "#3492bd"
                    : "white",
              }}
            >
              {this.props.noAvatar ? null : this.props.message?.user?.username}
              {"  "}
            </span>
            {this.props.noAvatar ? null : (
              <this.BootstrapTooltip
                title={
                  messageTime.toLocaleDateString(undefined, options) +
                  ", " +
                  messageTime.toLocaleTimeString()
                }
              >
                <span style={{ color: "grey", fontSize: "12px" }}>
                  {new Date().toLocaleString().split(",")[0] ===
                  messageTime.toLocaleDateString()
                    ? `Todat at ${messageTime.toLocaleTimeString()}`
                    : messageTime.toLocaleDateString()}
                </span>
              </this.BootstrapTooltip>
            )}
          </div>
          <div className="message__body__text">
            {/* <span style={{displa}}>{this.state?.time}</span> */}
            {this.props.message?.message}
          </div>
        </div>
      </div>
    );
  }
}

Message.contextType = stateContext;
