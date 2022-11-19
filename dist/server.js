"use strict";
const express = require("express");
const app = express();
const path = require("path");
const http_socket = require("http").Server(app);
const io_socket = require("socket.io")(http_socket);
const cookieParser = require("cookie-parser");

// 静的ファイル
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// middleware
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/** ソケット */
io_socket.on("connection", (socket) => {

  /** 接続と非接続 */
  // console.log("connect");
  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });

  /** indexPageで使うソケット */
  socket.on("toServer", (msg) => {
    io_socket.emit("toJavascript", msg);
  });

  /** auctionPageで使うソケット */
  // auctionroom 接続
  socket.on("toServerJoin", (join) => {
    // console.log("auction商品" + join.auctionId + "に参加しました");
    socket.join(join.auctionId);
  });
  // auctionroomからmsg来たら全体に返す
  socket.on("toServerAuctionSend", (biddingData) => {
    io_socket.to(biddingData.auctionId).emit("toRenderAuctionSend", biddingData);
  });
});

/** router */
const auctionRouter = require("./router/auction");
// top
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// auction
app.use("/auction", auctionRouter);

http_socket.listen(9000);
