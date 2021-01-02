import React, { Component } from "react";
import "./chatfeed.css";
import Message from "./Message";
let messagesEndRef;
export default class ChatFeed extends Component {
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <div className="chatfeed">
        <div>
          <h1 style={{ fontWeight: "9000" }}>
            Welcome To <span>#</span>
            {this.props.activeChannel?.name === "general"
              ? this.props.activeServer?.name
              : this.props.activeChannel?.name}
          </h1>
          <p style={{ color: "grey" }}>
            This is the start of the #{this.props.activeChannel?.name} channel!
          </p>
        </div>
        <hr />
        {this.props.activeChannel?.messages?.map((message) => (
          <Message message={message} userColor={"#FF4E00"} />
        ))}
        <div ref={this.messagesEndRef} />
      </div>
    );
  }
}
