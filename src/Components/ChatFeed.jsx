import React, { Component } from "react";
import "./chatfeed.css";
import Message from "./Message";

export default class ChatFeed extends Component {
  render() {
    return (
      <div className="chatfeed">
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#00A676"} />
        <Message userColor={"#F865B0"} />
        <Message userColor={"#0E103D"} />
        <Message userColor={"#BD1E1E"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
        <Message userColor={"#FF4E00"} />
      </div>
    );
  }
}
