import { Avatar } from "@material-ui/core";
import React from "react";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

function ServerMember({ member, admin }) {
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
      {member?.username?.length > 20
        ? member?.username.slice(0, 20) + "..."
        : member?.username}
      {admin && <PersonPinCircleIcon />}
    </div>
  );
}

export default ServerMember;
