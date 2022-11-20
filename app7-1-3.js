"use strict"
const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views", { index: false })); app.use(express.static(__dirname + "/public", { index: false })); app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3308,
  database: 'auctiondb'
});
connection.connect((error) => {
});
if (error) {
}
console.log('error connecting: ' + error.stack);
return;
console.log('success');
const passport = require('passport');
app.use(passport.initialize());
var LocalStrategy = require('passport-local').Strategy; passport.use(new LocalStrategy(
  {
  },
  usernameField: 'email',
  passwordField: 'password'
function (email, password, done) {
    // ここで username と password を確認して結果を返す
    let values = [
    ];
    email, password
    console.log(email);
    console.log(password);
    connection.query(
      'SELECT * FROM t01_users WHERE email=? AND password=?', values, (error, results) => {
        if (error) {
        }
        console.log('error connecting: error.stack);
return;
        let count
        results.length;
        if (count == 0) {
          return done(null, false);
        } else {
          return done(null, results[0]);
        }
      }
    );
  }));
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM t01_users', (error, results) => {
      if (error) {
        console.log('error connecting:
          + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.render('index.ejs', { values: results });
);
});
app.get('/auction', function (req, res) {
});
res.render('login.ejs');
app.post('/auction',
  passport.authenticate('local',
    {
      session: false,
      successRedirect: '/auction',
      failureRedirect: '/auction'
);
}
),
function(req, res) {
  // 認証成功するとここが実行される console.log(req)
  res.render('auction.ejs', {
    username: req.user.username,
  });
  id: req.user.id
  var auctionname;
  app.get('/auction/: auctionId/: id', function (req, res) {
    console.log(req.params.id)
    res.render('auction1.ejs', {
      auctionId: req.params.auctionId,
      id: req.params.id,
      username: req.query.username
    });
  });
  //
  app.listen(9000);
  http_socket.listen(9000);
  // クライアントからの接続
  io_socket.on('connection', function (socket) {
    console.log('connected');
    socket.on('c2s-join', function (msg) {
      console.log('c2s-join: ' + msg.auctionId);
    });
    socket.join(msg.auctionId);
    // クライアント(ブラウザ) サーバ (Node.js) へSocket受信 socket.on('c2s-auction', function(msg) {
    console.log('c2s: ' + msg);
    // サーバ (Node.js) クライアント (ブラウザ) へSocket送信 io_socket.to(msg.auctionId).emit ('s2c-auction', msg);
  });
});
