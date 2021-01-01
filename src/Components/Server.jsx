import React, { useEffect, useContext, useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/Inbox";
import HelpIcon from "@material-ui/icons/Help";
import MessageInput from "./MessageInput";
import ChatFeed from "./ChatFeed";
import ServerChannels from "./ServerChannels";
import ServerList from "./ServerList";
import CreateServerModal from "./CreateServerModal";
import CreateChannelModal from "./CreateChannelModal";
import { useParams, withRouter } from "react-router-dom";
import stateContext from "../StateProvider";
import axios from "../axiosConfig";

function Server() {
  const { serverId } = useParams();
  const context = useContext(stateContext);
  const [activeServer, setActiveServer] = useState({});
  const [activeChannel, setActiveChannel] = useState({});
  useEffect(() => {
    const axiosCall = async () => {
      await axios
        .get(
          `api/servers/${serverId}`,

          {
            headers: { jwt: localStorage.getItem("discordJWT") },
          }
        )
        .then((res) => {
          setActiveServer(res.data);
          if (res.data.channels) {
            handleActiveChannel(res.data.channels[0]?._id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    axiosCall();
  }, [serverId]);

  const handleActiveChannel = async (channelId) => {
    await axios
      .get(
        `/api/channels/${channelId}`,

        { headers: { jwt: localStorage.getItem("discordJWT") } }
      )
      .then((res) => {
        console.log(res.data);
        setActiveChannel(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <ServerChannels
        activeServer={activeServer}
        activeChannel={activeChannel}
        handleActiveChannel={handleActiveChannel}
      />
      <div className="main__app">
        {/* header  */}
        <div className="main__app__header">
          <span>
            <h1>#</h1> {activeChannel?.name}
          </span>
          <div className="main__app__header__right">
            <NotificationsIcon
              style={{
                margin: "0 8px",
                color: "#DCDDDE",
                cursor: "pointer",
              }}
            />
            <BookmarksIcon
              style={{
                margin: "0 8px",
                color: "#DCDDDE",
                cursor: "pointer",
              }}
            />
            <GroupIcon
              style={{
                margin: "0 8px",
                color: "#DCDDDE",
                cursor: "pointer",
              }}
            />
            <div className="header__serach">
              <input type="text" placeholder={"Search"} />
              <SearchIcon />
            </div>
            <InboxIcon
              style={{
                margin: "0 8px",
                color: "#DCDDDE",
                cursor: "pointer",
              }}
            />
            <HelpIcon
              style={{
                margin: "0 8px",
                color: "#DCDDDE",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* app body  */}
        <div className="main__app__body">
          <ChatFeed activeChannel={activeChannel} />
          <MessageInput channel={activeChannel?._id} />
        </div>
        <CreateChannelModal />
        <CreateServerModal />
      </div>
    </>
  );
}

export default withRouter(Server);
Server.contextType = stateContext;
