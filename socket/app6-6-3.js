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

// room1呼び出し
app.get("/", (req, res) => {
  res.render("index6-6-2.ejs");
});

// room2呼び出し
app.get("/room2", (req, res) => {
  res.render("index6-6-3.ejs");
});

http_socket.listen(9000);

io_socket.on("connection", (socket) => {
  console.log("connected");
  // auctionroom1
  socket.on("c2s", (msg) => {
    console.log("c2s:" + msg);
    io_socket.emit("s2c", msg);
  });
  // auctionroom2
  socket.on("room2", (msg) => {
    console.log("room2:" + msg);
    io_socket.emit("room2Res", msg);
  });
  // 接続切れた
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
