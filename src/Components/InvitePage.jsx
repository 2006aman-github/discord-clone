import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import "./invitepage.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Snackbar } from "@material-ui/core";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "../axiosConfig";
import stateContext from "../StateProvider";

export default function InvitePage() {
  const history = useHistory();
  const { setShowSnackBar, showSnackBar } = useContext(stateContext);
  const { inviteId } = useParams();
  const location = useLocation();
  const [server, setServer] = useState();
  let useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("discordJWT")) {
      history.push(`/signup?redirect=${location.pathname}`);
    } else {
      console.log(inviteId);
      const axiosCall = async () => {
        await axios
          .get("/api/getServerId", {
            headers: {
              inviteId: inviteId,
            },
          })
          .then((res) => {
            setServer(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
      axiosCall();
    }
  }, []);

  const handleServerJoin = async () => {
    await axios
      .get("/api/invitations", {
        headers: {
          jwt: localStorage.getItem("discordJWT"),
          inviteId: inviteId,
        },
      })
      .then((res) => {
        setShowSnackBar({
          status: true,
          message: res.data?.message,
        });
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response?.status === 403) {
          alert(
            "The Server You are trying to join is unavailable. Please Try again! or contact the admin"
          );
        } else {
          alert("Something Went wrong! Try Again or Refresh the page");
        }
      });
  };

  const classes = useStyles();
  return (
    <div className="invitePage">
      <Card className={"card"}>
        <Avatar style={{ width: "80px", height: "80px", margin: "auto" }}>
          {server?.name?.slice(0, 1)}
        </Avatar>
        <p>You are Invited to join {server?.name}</p>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 0px",
          }}
          variant="h5"
          component="h2"
        >
          <Avatar
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          >
            A
          </Avatar>
          {server?.name}
        </Typography>
        <span className="members">
          <svg height="20" width="20">
            <circle
              cx="10"
              cy="10"
              r="5"
              stroke="gray"
              stroke-width="3"
              fill="gray"
            />
          </svg>{" "}
          {server?.members?.length + 1} Members
        </span>

        <CardActions>
          <Button
            onClick={() => {
              handleServerJoin();
            }}
            style={{ margin: "auto" }}
            variant="contained"
            color="primary"
          >
            Accept Invite
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showSnackBar?.status}
        autoHideDuration={200}
        message={showSnackBar?.message}
      />
    </div>
  );
}
