import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import stateContext from "../StateProvider";
import { Avatar } from "@material-ui/core";
import { Router } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));
  const classes = useStyles();
  const context = useContext(stateContext);

  const handleClickOpen = () => {
    context.toggleShowUserSettings();
  };

  const handleClose = () => {
    context.toggleShowUserSettings();
  };

  return (
    <div>
      <Dialog
        style={{ backgroundColor: "#2f3136" }}
        fullScreen
        open={context.showUserSettings}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: "#2f3136" }}
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              MY ACCOUNT
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="user__profile">
          <div className="user__avatar__section">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar className={classes.large}>
                {context.user?.username?.slice(0, 1)}
              </Avatar>
              <h3 style={{ marginLeft: "15px" }}>{context.user?.username}</h3>
            </div>
            <Button disableElevation color={"primary"} variant={"contained"}>
              Upload Avatar
            </Button>
          </div>
          <div className="user__credentials__section">
            <li>
              <div>
                <small>USERNAME</small>
                <span>{context.user?.username}</span>
              </div>
              <Button disableElevation variant={"contained"} color={"primary"}>
                Edit
              </Button>
            </li>
            <li>
              <div>
                <small>EMAIL</small>
                <span>{context.user?.email}</span>
              </div>
              <Button disableElevation variant={"contained"} color={"primary"}>
                Edit
              </Button>
            </li>
            <li>
              <div>
                <small>PHONE NUMBER</small>
                <span>
                  {context.user.phone
                    ? context.user.phone
                    : "You haven't added a phone number."}
                </span>
              </div>
              <Button disableElevation variant={"contained"} color={"primary"}>
                Edit
              </Button>
            </li>
          </div>
        </div>
        <br />
        <Button
          onClick={() => {
            localStorage.removeItem("discordJWT");
            window.location.reload();
          }}
          variant={"contained"}
          style={{ width: "10vw", margin: "auto" }}
          color={"secondary"}
        >
          Log Out
        </Button>
      </Dialog>
    </div>
  );
}
