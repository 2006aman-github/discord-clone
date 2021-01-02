import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import stateContext from "../StateProvider";
import axios from "../axiosConfig";
import { withRouter } from "react-router-dom";

class CreateServerModal extends Component {
  state = {
    serverName: "",
  };
  handleClose = () => {
    this.context.toggleShowServerCreateModal();
  };
  handleClickOpen = () => {
    this.context.toggleShowServerCreateModal();
  };

  handleCreateServer = async () => {
    if (this.state.serverName && this.state.serverName.length >= 3) {
      await axios
        .post(
          "/api/servers/new",
          {
            name: this.state.serverName,
          },
          {
            headers: {
              jwt: localStorage.getItem("discordJWT"),
            },
          }
        )
        .then((res) => {
          this.context.toggleShowServerCreateModal();
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Server name must be atleat 4 characters long");
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.context?.showServerCreateModal}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create your own Server
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give your server a name and an icon. Have a good time with your
              friends
            </DialogContentText>
            <TextField
              value={this.state.serverName}
              onChange={(e) =>
                this.setState({
                  serverName: e.target.value,
                })
              }
              autoFocus
              margin="dense"
              id="name"
              label="SERVER'S NAME"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.context.toggleShowServerCreateModal()}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.handleCreateServer()} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CreateServerModal.contextType = stateContext;

export default withRouter(CreateServerModal);
