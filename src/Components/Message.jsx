import React, { Component } from "react";
import "./message.css";

export default class Message extends Component {
  render() {
    return (
      <div className="message">
        <div className="message__user__image">
          {/* discord logo  */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 44 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              backgroundColor: this.props.userColor,
              padding: "6px",
              borderRadius: "50%",
            }}
          >
            <path
              d="M38 4C38 4 33.415 0.412 28 0L27.512 0.976C32.408 2.174 34.654 3.891 37 6C32.955 3.935 28.961 2 22 2C15.039 2 11.045 3.935 7 6C9.346 3.891 12.018 1.985 16.488 0.976L16 0C10.319 0.537 6 4 6 4C6 4 0.879 11.425 0 26C5.162 31.953 13 32 13 32L14.639 29.815C11.857 28.848 8.715 27.121 6 24C9.238 26.45 14.125 29 22 29C29.875 29 34.762 26.45 38 24C35.285 27.121 32.143 28.848 29.361 29.815L31 32C31 32 38.838 31.953 44 26C43.121 11.425 38 4 38 4ZM15.5 22C13.567 22 12 20.209 12 18C12 15.791 13.567 14 15.5 14C17.433 14 19 15.791 19 18C19 20.209 17.433 22 15.5 22ZM28.5 22C26.567 22 25 20.209 25 18C25 15.791 26.567 14 28.5 14C30.433 14 32 15.791 32 18C32 20.209 30.433 22 28.5 22Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="message__body">
          <div className="message__body__details">
            <span>aman</span>
            <span>Yesterday at 7:05AM</span>
          </div>
          <div className="message__body__text">
            Loremus quaerat, maxime adipisci ex tempore, repellat sit veniam
          </div>
        </div>
      </div>
    );
  }
}