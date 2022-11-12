"use strict"

const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mysql connect
 */
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  port : 3306,
  database : 'chatdb'
});
connection.connect((err) => {
  if(err) {
    console.log('MySQL: err connect' + err.stack);
    return;
  }
  console.log('MYSQL connected');
});


/**
 * passport
 * 認証
 */
const passport = require('passport');
app.use(passport.initialize());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  {
    usernameField:'email',
    passwordField:'password'
  },
  (email,password,done) => {
    const values = [
      email,
      password
    ];
    connection.query(
      'SELECT * FROM t01_users WHERE email=? AND password=?' , values,
      (error ,results) => {
        if(error){
          console.log('error connecting:' + error.stack);
          return;
        }
        const count = results.length;
        if(count === 0) {
          return done(null,false); // NG
        }else{
          return done(null,results[0]); // ok
        }
      }
    );
  }
));

/**
 * chat一覧表示
 */
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM t01_users',
    (error,results) => {
      if(error){
        console.log('error connecting:' + error.stack);
        res.status(400).send({message : 'Error!!' });
        return;
      }
      res.render('index.ejs',{values:results});
    }
  );
  // 接続切れた
  socket.on('disconnect',() => {
    console.log('user disconnected');
  })

});

/**
 * ログイン画面表示
 */
app.get('/login',(req,res) => {
  res.render('login.ejs');
});

/**
 * ログイン処理
 */
app.post('/login',
  passport.authenticate('local',{
    session:false,
    // successRedairect: '/chat',
    failureRediredt: '/login',
  }),
  (req,res) => {
    console.log(req)
    res.render('chat.ejs',{
      id:req.user.id,
      username:req.user.username
    });
  }
);
/**
 * エラー
 */
app.get('/error',(req,res) => {
  res.render('error.ejs');
});

/**
 * 起動
 */
http_socket.listen(9000);


/**
 * チャット
 */
app.get('/chat', (req,res) {
  res.render('chat.ejs',{
    id:req.query.id,
    username:req.query.username
  });
});

/**
 * チャットルーム1
 */
app.get('/chat1',(req,res){
  res.render('chat1.ejs',{
    id:req.query.id,
    username:req.query.username
  });
});

/**
 * チャットルーム2
 */
app.get('/chat2',(req,res){
  res.render('chat2.ejs',{
    id:req.query.id,
    username:req.query.username
  });
});

io_socket.on('connection',(socket) => {
  console.log('connected');
  socket.on('c2s',(msg) => {
    console.log('c2s:' + msg);
    io_socket.emit('sc2',msg);
  });
  socket.on('c2s-chat1',(msg) => {
    console.log('c2s-chat1:' + msg);
    io_socket.emit('sc2-chat1',msg);
  });
  socket.on('c2s-chat2',(msg) => {
    console.log('c2s-chat2:' + msg);
    io_socket.emit('sc2-chat2',msg);
  });
});
