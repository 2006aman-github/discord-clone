import React, { Component } from "react";
import "./chatfeed.css";
import Message from "./Message";
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
        <div style={{ padding: "10px" }}>
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
        <h2></h2>
        {this.props.activeChannel?.messages?.map((message) => {
          if (
            new Date(message.messageTime).getHours() ===
              new Date(
                this.props.activeChannel?.messages[
                  this.props.activeChannel?.messages.indexOf(message) - 1
                ]?.messageTime
              ).getHours() &&
            message.user?._id ===
              this.props.activeChannel?.messages[
                this.props.activeChannel?.messages.indexOf(message) - 1
              ].user?._id
          ) {
            return (
              <Message
                noAvatar={true}
                activeServer={this.props.activeServer}
                message={message}
                userColor={"#FF4E00"}
              />
            );
          } else {
            return (
              <Message
                activeServer={this.props.activeServer}
                message={message}
                userColor={"#FF4E00"}
              />
            );
          }
        })}
        <div ref={this.messagesEndRef} />
      </div>
    );
  }
}
