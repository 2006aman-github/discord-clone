
import React, { Component } from "react";
import stateContext from "../StateProvider";
import ServerMember from "./ServerMember";
import CloseIcon from "@material-ui/icons/Close";

export default class ServerMembers extends Component {
  render() {
    return (
      <div className="serverMembers">
        <small
          style={{
            zIndex: window.innerWidth <= 750 ? "5" : "0",
            right: window.innerWidth <= 750 ? "0" : "-100px",
            color: "#ddd",
            fontSize: "12px",
            fontWeight: "bold",
            borderBottom: "1px solid grey",
            margin: "4px 0px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <CloseIcon
            id="closeIcon"
            onClick={() => {
              this.context.toggleShowMembers();
            }}
          />
          MEMEBERS
        </small>

        {console.log(this.props?.activeServer?.admin)}
        <ServerMember member={this.props?.activeServer?.admin} admin />

        {this.props.activeServer?.members?.map((member) => (
          <ServerMember member={member} />
        ))}
      </div>
    );
  }
}

ServerMembers.contextType = stateContext;
