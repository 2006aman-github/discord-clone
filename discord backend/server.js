const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const User = require("./dbSchemas/dbUser");
const Server = require("./dbSchemas/dbServer");
const Channel = require("./dbSchemas/dbChannel");
const Message = require("./dbSchemas/dbMessage");
const Pusher = require("pusher");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const cors = require("cors");
const { loginValidation, registerValidation } = require("./authValidate");
const jwt = require("jsonwebtoken");
const { verify } = require("./verifyJWT");
require("dotenv").config();

const pusher = new Pusher({
  appId: "1131310",
  key: "d6de7d7d9c3d0d22b615",
  secret: "de239a43e0a2db325e4f",
  cluster: "ap2",
  useTLS: true,
});

const connection_url =
  "mongodb+srv://aman2006:aman@123@cluster0.dboat.mongodb.net/discord-clone?retryWrites=true&w=majority";
// mongo db connection
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Mongo DB connected!, congrats!!..");

  const messageChangeStream = mongoose.connection
    .collection("messages")
    .watch();
  const serverChangeStream = mongoose.connection.collection("servers").watch();

  messageChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("messages", "newMessage", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("messagesUpdate", "updatedMessage", {
        change: change,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });

  serverChangeStream.on("change", (change) => {
    console.log("hey some change");
    if (change.operationType === "insert") {
      console.log("hey some insert change");

      pusher.trigger("servers", "newServer", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("serversUpdate", "updatedServer", {
        change: change,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("hi this is your home page");
});

app.post("/api/users/signup", async (req, res) => {
  let userBody = req.body;

  // joi validation
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
    });

  let emailExists = await User.findOne({ email: userBody.email });
  if (emailExists) {
    return res.status(404).send({
      message: "email already exists",
    });
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userBody.password, salt);

  User.create(
    {
      username: userBody.username,
      email: userBody.email,
      password: hashedPassword,
    },
    (err, data) => {
      if (err) {
        return res.status(405).send(err);
      }
      res.status(200).send(data);
    }
  );
});

app.delete("/api/users", (req, res) => {
  User.deleteMany()
    .exec()
    .then((response) => {
      return res.status(200).json({
        message: "congratulations you have no users left!!!!",
      });
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

app.get("/api/users", (req, res) => {
  User.find()
    .exec()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

app.post("/api/users/login", async (req, res) => {
  let loginBody = req.body;

  const { error } = loginValidation(req.body);
  if (error)
    return res.status(404).json({
      message: error.details[0].message,
    });
  // if (error)
  //   return res.status(400).json({
  //     message: error,
  //   });

  let user = (await User.findOne({ email: loginBody.email })).populate(
    "servers"
  );
  if (!user) {
    return res.status(404).json({
      message: "Email or Password is Incorrect!",
    });
  }
  // if password is correct
  const validPassword = await bcrypt.compare(loginBody.password, user.password);
  if (!validPassword)
    return res.status(404).json({
      message: "Email or Password is Incorrect!",
    });

  // create and assign a jwt token
  // got help for accessing dot env values from stack overflow >> https://stackoverflow.com/questions/26973484/how-do-i-setup-the-dotenv-file-in-node-js

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({
    jwt: token,
    message: "congrats you successfully are logged in!!",
    user: {
      username: user.username,
      userImage: user.userImage,
      servers: user.servers,
    },
  });
});

app.get("/api/users/authenticate", verify, async (req, res) => {
  await User.findOne({ _id: req.user._id })
    .populate("servers")
    .exec((err, data) => {
      if (err) res.status(400).send(err);
      res.status(200).send(data);
    });
});

// authentication routes are completed here

//https://mongoosejs.com/docs/populate.html
app.get("/api/servers", (req, res) => {
  Server.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/api/servers", async (req, res) => {
  await Server.deleteMany()
    .exec()
    .then((data) => {
      res.status(200).send("congrats you don't have any servers left");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// create a new server
app.post("/api/servers/new", verify, async (req, res) => {
  let user_id = req.user._id;
  let name = req.body.name;
  await Server.create({
    admin: user_id,
    name: name,
  })
    .then(async (data) => {
      // 1. create a default general channel for the server
      await Channel.create({
        allowedParticipants: user_id,
        name: "general",
        server: data._id,
      })
        .then(async (cdata) => {
          // add ref to the server >> in short make the server know that a channel in its name is created
          let server = await Server.findById(data._id);
          server.channels.push(cdata._id);
          server.save((serr, sdata) => {
            if (serr) return res.status(400).send(serr);
          });
        })
        .catch((cerr) => {
          return res.status(403).send(cerr);
        });

      // 2. add ref to the user >> in short make the user know that a server in its name is created
      let user = await User.findById(user_id);
      user.servers.push(data._id);
      user.save((uerr, udata) => {
        if (uerr) return res.status(401).send(uerr);
        res.status(200).json({
          message: "server created successfully",
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

app.get("/api/servers/:serverId", verify, async (req, res) => {
  let serverId = req.params.serverId;

  await Server.findOne({ _id: serverId })
    .populate("channels")
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
});

app.post("/api/channels/new", verify, async (req, res) => {
  console.log(req.body);
  await Channel.create(
    {
      server: req.body.server,
      name: req.body.name,
    },
    async (err, data) => {
      if (err) return res.status(400).send("fuck of");

      // let the server know that a channel is created
      let server = await Server.findById(req.body.server);
      server.channels.push(data._id);
      server.save((serr, sdata) => {
        if (serr) return res.status(402).send(serr);
      });
      res.status(200).send(data);
    }
  );
});

app.get("/api/channels", verify, async (req, res) => {
  await Channel.find()
    .populate("messages")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send(data);
    });
});

app.get("/api/channels/:channelId", verify, async (req, res) => {
  let channelId = req.params.channelId;
  await Channel.findOne({ _id: channelId })
    .populate("messages")
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
});

app.post("/api/messages/new", verify, (req, res) => {
  let messageBody = req.body;
  Message.create(
    {
      user: req.user._id,
      message: messageBody.message,
      channel: messageBody.channel,
    },
    async (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }

      console.log(messageBody.channel);
      // let the channel know that a message is created
      let channel = await Channel.findOne({ _id: messageBody.channel });
      channel.messages.push(data._id);
      channel.save((merr, mdata) => {
        if (merr) return res.status(400).send(merr);
      });

      res.status(200).send(data);
    }
  );
});

app.listen(port, () => {
  console.log("listening on port", port);
});
