import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import stateContext from "../StateProvider";
import axios from "../axiosConfig";
import { withRouter } from "react-router-dom";

class CreateChannelModal extends Component {
  state = {
    channelName: "",
  };
  handleClose = () => {
    this.context.toggleShowChannelCreateModal();
  };
  handleClickOpen = () => {
    this.context.toggleShowChannelCreateModal();
  };

  handleCreateChannel = async () => {
    if (this.state.channelName && this.state.channelName.length >= 3) {
      await axios
        .post(
          "/api/channels/new",
          {
            name: this.state.channelName,
            server: this.props.activeServer?._id,
          },
          {
            headers: {
              jwt: localStorage.getItem("discordJWT"),
            },
          }
        )
        .then((res) => {
          this.props.handleActiveServer(res.data.server);
          this.props.handleActiveChannel(res.data._id);
          this.context.toggleShowChannelCreateModal();
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("Server name must be atleat 4 characters long");
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.context.showChannelCreateModal}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Your Channel</DialogTitle>
          <DialogContent>
            <TextField
              value={this.channelName}
              onChange={(e) =>
                this.setState({
                  channelName: e.target.value,
                })
              }
              autoFocus
              margin="dense"
              id="name"
              label="CHANNEL'S NAME"
              type="email"
              fullWidth
            />
            <DialogContentText>
              By enabling your channel as private you deny the access of every
              server member. Only allowed participants can access private
              channels
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => this.context.toggleShowChannelCreateModal()}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.handleCreateChannel()} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CreateChannelModal.contextType = stateContext;

export default withRouter(CreateChannelModal);
