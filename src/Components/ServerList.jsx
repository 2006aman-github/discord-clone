import React, { Component } from "react";
import "./ServerList.css";
import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";

export default class ServerList extends Component {
  render() {
    return (
      <div className="serverlist">
        <div className="server" id="home_icon">
          <div className="server__icon">
            <img
              src={"https://img.icons8.com/color/30/000000/discord-logo.png"}
              alt={"discord"}
            />
          </div>
        </div>
        <div className="server">
          <div className="server__icon">
            <img
              src={"https://img.icons8.com/color/30/000000/discord-logo.png"}
              alt={"discord"}
            />
          </div>
        </div>

        {/* add server button  */}
        <div className="server">
          <div
            className="server__icon"
            id="add_icon"
            style={{ display: "grid", placeContent: "center" }}
          >
            <AddIcon style={{ color: "white" }} />
            <span></span>
          </div>
        </div>

        {/* explore button  */}
        <div className="server">
          <div
            className="server__icon"
            id="add_icon"
            style={{ display: "grid", placeContent: "center" }}
          >
            <ExploreIcon style={{ color: "white" }} />
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
