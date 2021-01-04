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
import Pusher from "pusher-js";
import axios from "../axiosConfig";
import UserSettings from "./UserSettings";
import discord from "../images/discord.png";
import ServerMembers from "./ServerMembers";

const pusher = new Pusher("d6de7d7d9c3d0d22b615", {
  cluster: "ap2",
});

function Server() {
  const { serverId } = useParams();
  const context = useContext(stateContext);
  const [activeServer, setActiveServer] = useState({});
  const [activeChannel, setActiveChannel] = useState({});
  const [loading, setLoading] = useState(true);

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
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        })
        .catch((err) => {
          alert("something went wrong! Try reloading your page");
        });
    };
    axiosCall();

    const axiosUserCall = async () => {
      setLoading(true);
      await axios
        .get("/api/users/authenticate", {
          headers: {
            jwt: localStorage.getItem("discordJWT"),
          },
        })
        .then((res) => {
          context.loginUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error logging you in!");
        });
    };

    // pusher message stuff
    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function (data) {
      handleActiveChannel(data.change.fullDocument?.channel);
    });

    // pusher server stuff
    const serverChannel = pusher.subscribe("servers");
    serverChannel.bind("newServer", function (data) {
      axiosUserCall();
    });
  }, [serverId]);

  useEffect(() => {
    const axiosInviteCall = async () => {
      if (activeServer._id) {
        await axios
          .get("/api/getInviteId", {
            headers: {
              serverId: activeServer._id,
            },
          })
          .then((res) => {
            context.addInvite(
              "https://discord-clone-299804.web.app" + "/invite/" + res.data.jwt
            );
            console.log(context.invite);
          })
          .catch((err) => {
            console.log("unable to fetch server invite url");
          });
      } else {
        console.log("Something went wrong!");
      }
    };
    axiosInviteCall();
  }, [activeServer]);

  const handleActiveChannel = async (channelId) => {
    await axios
      .get(
        `/api/channels/${channelId}`,

        { headers: { jwt: localStorage.getItem("discordJWT") } }
      )
      .then((res) => {
        setActiveChannel(res.data);
      })
      .catch((err) => {
        alert("Something went wrong! Try reloading your page");
      });
  };

  const handleActiveServer = async (serverId) => {
    setLoading(true);
    await axios
      .get(`/api/servers/${serverId}`, {
        headers: {
          jwt: localStorage.getItem("discordJWT"),
        },
      })
      .then((res) => {
        setActiveServer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(
          "There was some problem updating your new channel. Try refreshing the page"
        );
      });
  };

  return (
    <>
      <div
        style={{ display: loading ? "grid" : "none" }}
        className="loading__screen"
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img width="70" height="70" src={discord} alt={"Discord"} />
          <span>LOADING</span>
        </div>
      </div>

      <ServerList activeServer={activeServer} />
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
                color: "grey",
                cursor: "pointer",
              }}
            />
            <BookmarksIcon
              style={{
                margin: "0 8px",
                color: "grey",
                cursor: "pointer",
              }}
            />
            <GroupIcon
              onClick={() => {
                context.toggleShowMembers();
              }}
              style={{
                margin: "0 8px",
                color: context.showMembers ? "#fff" : "grey",
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
          <ChatFeed activeServer={activeServer} activeChannel={activeChannel} />
          <MessageInput channel={activeChannel} />
        </div>
        <CreateChannelModal
          activeServer={activeServer}
          handleActiveServer={handleActiveServer}
          handleActiveChannel={handleActiveChannel}
        />
        <CreateServerModal />
        <UserSettings />
      </div>
      {context.showMembers ? (
        <ServerMembers activeServer={activeServer} />
      ) : null}
    </>
  );
}

export default withRouter(Server);
Server.contextType = stateContext;
