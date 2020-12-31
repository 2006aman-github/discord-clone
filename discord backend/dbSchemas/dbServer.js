const mongoose = require("mongoose");
const { Schema } = mongoose;

const serverSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Server", serverSchema);
