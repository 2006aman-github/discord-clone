import React, { Component } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { IconButton } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import Picker from "emoji-picker-react";
import axios from "../axiosConfig";

export default class MessageInput extends Component {
  state = {
    message: "",
  };

  handleMessaging = (e) => {
    e.preventDefault();
    console.log(this.props.channel?._id);
    this.setState({
      message: "",
    });
    axios
      .post(
        "/api/messages/new",
        {
          message: this.state.message,
          channel: this.props.channel._id,
        },
        {
          headers: {
            jwt: localStorage.getItem("discordJWT"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };

  render() {
    return (
      <div
        style={{
          flex: "0.1",
          backgroundColor: "rgb(48, 50, 56)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",

            backgroundColor: "#40444B",
            height: "20px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <AddCircleIcon
            style={{ cursor: "pointer", margin: "0px 5px", color: "lightgrey" }}
          />

          <form
            onSubmit={(e) => {
              this.handleMessaging(e);
            }}
            style={{ flex: "1", height: "100%", padding: "0" }}
          >
            <input
              value={this.state.message}
              onChange={(e) => {
                this.setState({ message: e.target.value });
              }}
              placeholder="Message"
              type="text"
              style={{
                backgroundColor: "#40444B",

                border: "none",

                height: "100%",
                margin: "0",
                fontSize: "1rem",
                width: "100%",
                color: "white",
                outline: "none",
              }}
            />
          </form>

          <EmojiEmotionsIcon
            style={{ cursor: "pointer", margin: "0px 5px", color: "lightgrey" }}
          />
          <GifIcon
            style={{ cursor: "pointer", margin: "0px 5px", color: "lightgrey" }}
            fontSize="large"
          />
        </div>
      </div>
    );
  }
}
