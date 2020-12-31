const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  messageTime: {
    type: Date,
    default: Date.now,
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
  },
});

module.exports = mongoose.model("Message", messageSchema);
