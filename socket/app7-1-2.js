'use strict'
const { config } = require('dotenv');
const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);
const mysql = require('mysql2');
require("dotenv").config();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views', { index: false }));
app.use(express.static(__dirname + '/public', { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/auction/:auctionId', (req, res) => {
  const values = [
    't01_auctionmessage',
    req.params.auctionId
  ];
  connection.query(
    'SELECT * FROM ?? WHERE auctionId=?', values,
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.render('auction.ejs', { auctionId: req.params.auctionId, auctionmessage: results });
    }
  );
});

http_socket.listen(9000);

// クライアントからの接続
io_socket.on('connection', function (socket) {
  console.log('connected');
  socket.on('c2s-auction', function (msg) {
    console.log('c2s-auction:' + msg);
    const values = [msg.auctionId, msg.input1, msg.input2];
    connection.query('INSERT INTO 001_auctionmessage VALUES (?,?,?);', values,
      (error, results, fields) => {
        if (error) {
          console.log('error connecting: ' + error.stack); res.status(400).send({ message: 'Error!!' });
          return;
        }
        console.log(results); // サーバ(Node.js) クライアント(ブラウザ)へSocket送信
        io_socket.to(msg.auctionId).emit('s2c-auction', msg);
      }
    );
  });
  socket.on('c2s-join', function (msg) {
    console.log('c2s-join:' + msg.auctionId);
    socket.join(msg.auctionId);
  });
});
