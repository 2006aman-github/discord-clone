import React, { Component } from "react";
import "./ServerList.css";
import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";

import stateContext from "../StateProvider";
import { Link } from "react-router-dom";
import { Avatar, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default class ServerList extends Component {
  useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      fontSize: "0.8rem",
      fontWeight: "bold",
      backgroundColor: theme.palette.common.black,
    },
  }));

  BootstrapTooltip = (props) => {
    const classes = this.useStylesBootstrap();

    return (
      <Tooltip
        arrow
        classes={classes}
        {...props}
        style={{ fontSize: "1rem !important" }}
        placement="right"
      />
    );
  };

  render() {
    return (
      <div className="serverlist">
        <this.BootstrapTooltip title="Home">
          <div className="server" id="home_icon">
            <Link style={{ margin: "0", padding: "0", textDecoration: "none" }}>
              <Avatar className="server__icon">H</Avatar>
            </Link>
          </div>
        </this.BootstrapTooltip>
        {this.context?.user?.servers?.map((server) => (
          <this.BootstrapTooltip title={server.name}>
            <div className="server">
              <Link
                style={{ margin: "0", padding: "0", textDecoration: "none" }}
                to={`/channels/${server._id}`}
              >
                <Avatar className="server__icon">
                  {server.name.slice(0, 1)}
                </Avatar>
              </Link>
            </div>
          </this.BootstrapTooltip>
        ))}

        {/* add server button  */}
        <div
          onClick={() => {
            this.context.toggleShowServerCreateModal();
          }}
          className="server"
        >
          <this.BootstrapTooltip title={"Add a server"}>
            <div
              className="server__icon"
              id="add_icon"
              style={{ display: "grid", placeContent: "center" }}
            >
              <AddIcon style={{ color: "white" }} />
            </div>
          </this.BootstrapTooltip>
        </div>

        {/* explore button  */}
        <div className="server">
          <div
            className="server__icon"
            id="add_icon"
            style={{ display: "grid", placeContent: "center" }}
          >
            <ExploreIcon style={{ color: "white" }} />
          </div>
        </div>
      </div>
    );
  }
}

ServerList.contextType = stateContext;
