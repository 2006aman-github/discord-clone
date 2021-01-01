import React, { Component } from "react";
import "./ServerList.css";
import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";
import axios from "../axiosConfig";
import stateContext from "../StateProvider";
import { Link } from "react-router-dom";

export default class ServerList extends Component {
  render() {
    console.log(this.context.user);
    return (
      <div className="serverlist">
        <Link to="/">
          <div className="server" id="home_icon">
            <div className="server__icon">
              <img
                src={"https://img.icons8.com/color/30/000000/discord-logo.png"}
                alt={"discord"}
              />
            </div>
          </div>
        </Link>
        {this.context.state?.user?.servers?.map((server) => (
          <Link to={`/${server._id}`}>
            <div className="server">
              <div className="server__icon">
                <img
                  src={
                    "https://img.icons8.com/color/30/000000/discord-logo.png"
                  }
                  alt={"discord"}
                />
              </div>
            </div>
          </Link>
        ))}

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

ServerList.contextType = stateContext;
