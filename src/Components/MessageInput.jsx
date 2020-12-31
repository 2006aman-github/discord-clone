import React, { Component } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { IconButton } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import Picker from "emoji-picker-react";

export default class MessageInput extends Component {
  state = {
    showEmojiPicker: false,
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

          <input
            placeholder="Message"
            type="text"
            style={{
              backgroundColor: "#40444B",

              border: "none",
              padding: "10px",
              height: "100%",

              fontSize: "1rem",
              flex: "1",
              color: "white",
              outline: "none",
            }}
          />
          {this.state.showEmojiPicker ? (
            <Picker onEmojiClick={(e) => console.log(e.target.value)} />
          ) : null}
          <EmojiEmotionsIcon
            style={{ cursor: "pointer", margin: "0px 5px", color: "lightgrey" }}
            onClick={(e) =>
              this.setState({
                showEmojiPicker: true,
              })
            }
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
