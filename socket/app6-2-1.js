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
  res.render("index6-2-1.ejs");
});

// parameterでchatroom振り分け
app.get("/chat/:chatid", (req, res) => {
  res.render("chat.ejs", { chatid: req.params.chatid });
});

http_socket.listen(9000);

io_socket.on("connection", (socket) => {
  console.log("connected");
  // parameta振り分け
  socket.on("c2s", (msg) => {
    console.log("c2s:" + msg);
    io_socket.to(msg.chatid).emit("s2c", msg);
  });

  socket.on("c2s-join", (msg) => {
    console.log("cs2-join:" + msg);
    socket.join(msg.chatid);
  });
  // 接続切れた
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
