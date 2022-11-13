"use strict";
const express = require("express");
const app = express();
const http_socket = require("http").Server(app);
const io_socket = require("socket.io")(http_socket);
const cookieParser = require("cookie-parser");
const logger = require("morgan");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));


const indexRouter = require("./routes/top");
const cookieRouter = require("./routes/cookie");
const loginRouter = require("./routes/login");

app.use("/", indexRouter);
app.use("/chat1", cookieRouter);
app.use("/login", loginRouter);


app.get("/chat2", (req, res) => {
  res.render("chat2.ejs");
});
app.get("/chat3", (req, res) => {
  res.render("chat3.ejs");
});

http_socket.listen(9000);
// クライアントからの接続
io_socket.on("connection", function (socket) {
  console.log("connected"); // (Node.js)
  socket.on("c2s", function (msg) {
    console.log("c2s: " + msg); // サーバ(Node.js) →クライアント(ブラウザ)へSocket送信
    io_socket.emit("s2c", msg);
  });
  //L-4
  socket.on("c2s-join", function (msg) {
    console.log("c2s-join:" + msg.chatid);
    socket.join(msg.chatid);
  });
  socket.on("c2s-chat", function (msg) {
    console.log("c2s-chat: " + msg); // サーバ(Node.js) →クライアント(ブラウザ)へSocket送信
    io_socket.to(msg.chatid).emit("s2c-chat", msg);
  });
});
