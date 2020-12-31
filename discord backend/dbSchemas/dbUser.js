const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      max: 100,
      min: 6,
    },
    username: {
      type: String,
      max: 50,
      min: 6,
    },
    userImage: {
      type: String,
      default: "https://i.redd.it/3v0wf3mmnva21.jpg",
    },
    password: {
      type: String,
      min: 4,
      max: 50,
    },
    servers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Server",
      },
    ],
    // joinedServers: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Server",
    //   },
    // ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    signupDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("User", userSchema);
