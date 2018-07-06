const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv");

const userRouter = require("./data/users/UserRouter");
const postRouter = require("./data/posts/PostRouter");
dotenv.config();
const secret = process.env.SECRET;

const server = express();
const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(morgan());
server.use(bodyParser.json());
server.use(
  session({
    name: "Auth",
    secret,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
server.use("/users", userRouter);
server.use("/posts", postRouter);

module.exports = server;
