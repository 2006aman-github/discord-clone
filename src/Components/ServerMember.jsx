import { Avatar, makeStyles, Tooltip } from "@material-ui/core";
import React, { useContext } from "react";
import stateContext from "../StateProvider";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

function ServerMember({ member, admin }) {
  console.log(member);
  return (
    <div
      className="server-member"
      style={{
        width: "100%",
        color: admin ? "#3492bd" : "#ddd",
        padding: "5px",
        borderRadius: "5px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Avatar style={{ width: "30px", marginRight: "8px", height: "30px" }}>
        {member?.username?.slice(0, 1)}
      </Avatar>
      {member?.username.slice(0, 20)}
      {admin ? <PersonPinCircleIcon /> : null}
    </div>
  );
}

export default ServerMember;
