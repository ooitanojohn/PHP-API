"use strict";

const express = require("express");
const app = express();
const http_socket = require("http").Server(app);
const io_socket = require("socket.io")(http_socket);
const mysql = require("mysql2");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mysql connect
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "auctiondb",
});
connection.connect((err) => {
  if (err) {
    console.log("MySQL: err connect" + err.stack);
    return;
  }
  console.log("MYSQL connected");
});

// room1呼び出し
app.get("/", (req, res) => {
  res.render("index6-2-3.ejs");
});

// parameterでauctionroom振り分け
app.get("/auction/:auctionId", (req, res) => {
  // 過去のチャットを取得
  connection.query(
    "SELECT input1,input2 from t01_auctionmessage where auctionId = ?",
    req.params.auctionId,
    (err, results) => {
      if (err) {
        console.log("err connecting:" + err.stack);
        res.status(400).send({ message: "Error" });
        return;
      }
      //console.log('root/app6-2-3.js' + results);
      res.render("auction.ejs", {
        values: results,
        auctionId: req.params.auctionId,
      });
    }
  );
});

http_socket.listen(9000);

// サーバー側の処理
io_socket.on("connection", (socket) => {
  console.log("websocket connected");
  // parameta振り分け
  // クライアントからサーバ
  socket.on("c2s", (msg) => {
    console.log(
      "c2s:クライアントからサーバへ" + msg.input1 + msg.input2 + msg.auctionId
    );
    for (const p in msg) {
      console.log(`${p}:${msg[p]}`);
    }
    // SQLにmsgを保存
    let values = [msg.auctionId, msg.input1, msg.input2];
    connection.query(
      "INSERT INTO t01_auctionmessage VALUES (?, ?, ?);",
      values,
      (err, results, fields) => {
        if (err) {
          console.log("err connect:" + err.stack);
          return;
        }
        console.log("SQL:INSERT成功");
      }
    );
    // サーバからクライアントへ送信
    io_socket.to(msg.auctionId).emit("s2c", msg);
  });
  // auctionroomに参加する
  socket.on("c2s-join", (msg) => {
    console.log("cs2-join:" + msg.auctionId);
    socket.join(msg.auctionId);
  });
  // 接続切れた
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
