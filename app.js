const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const server = require("./server/server");
const mongo = process.env.mongo;

const port = process.env.PORT || 5000;

// serve from build directory for front-end
server.use(express.static(path.join(__dirname, 'client/build')));
server
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });

let dbUrl;
if (process.env.NODE_ENV === "production") {
  dbUrl = `mongodb+srv://lambda-notes:${mongo}@cluster0-h73bz.mongodb.net/test`;
} else {
  dbUrl = "mongodb://127.0.0.1:27017/nerdgasm";
}

mongoose.connect(
  dbUrl,
  {},
  err => {
    if (err) return console.log(dbUrl, err);
    console.log("DB Connection Achieved");
  }
);
server.listen(port, err => {
  console.log("Express is working on port " + port);
});
