"use strict";

const express = require("express");
const app = express();
const http_socket = require("http").Server(app);
const io_socket = require("socket.io")(http_socket);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index6-6-2.ejs");
});

http_socket.listen(9000);

io_socket.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io_socket.on("connection", (socket) => {
  console.log("connected");
  socket.on("c2s", (msg) => {
    console.log("c2s:" + msg);
    io_socket.emit("s2c", msg);
  });
});
