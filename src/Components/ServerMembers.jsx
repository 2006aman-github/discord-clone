import { makeStyles, Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import stateContext from "../StateProvider";
import ServerMember from "./ServerMember";

export default class ServerMembers extends Component {
  render() {
    return (
      <div className="serverMembers">
        <small
          style={{
            color: "#ddd",
            fontSize: "12px",
            fontWeight: "bold",
            borderBottom: "1px solid grey",
            margin: "4px 0px",
          }}
        >
          MEMEBERS
        </small>

        <ServerMember member={this.context.user} admin />

        {this.props.activeServer?.members?.map((member) => (
          <ServerMember member={member} />
        ))}
      </div>
    );
  }
}

ServerMembers.contextType = stateContext;
