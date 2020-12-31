const mongoose = require("mongoose");
const { Schema } = mongoose;

const channelSchema = new Schema({
  allowedParticipants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  name: String,
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  server: {
    type: Schema.Types.ObjectId,
    ref: "Server",
  },
});

module.exports = mongoose.model("Channel", channelSchema);
