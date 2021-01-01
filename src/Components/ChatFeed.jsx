import React, { Component } from "react";
import "./chatfeed.css";
import Message from "./Message";

export default class ChatFeed extends Component {
  render() {
    return (
      <div className="chatfeed">
        {this.props.activeChannel?.messages?.map((message) => (
          <Message message={message} userColor={"#FF4E00"} />
        ))}
      </div>
    );
  }
}
