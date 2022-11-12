"use strict"
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'testdb'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM t01_users', (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.render('index5-2.ejs', { values: results });
    }
  );
});
app.get('/app5-3', function (req, res) {
  res.render('app5-3.ejs');
});

app.get('/users', (req, res) => {
  connection.query(
    'SELECT * FROM t01_users;',
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.send(JSON.stringify(results));
    }
  );
});

app.get('/users/:id', (req, res) => {
  let values = [
    't01_users',
    req.params.id
  ];

  connection.query(
    'SELECT * FROM ?? WHERE id =? ', values,
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.write(JSON.stringify(results));
      res.end();
    }
  );
});

app.post('/users', (req, res) => {
  let values = [
    req.body.id,
    req.body.email,
    req.body.username,
    req.body.password
  ];

  connection.query(
    "INSERT INTO t01_users VALUES (?, ?, ?,?);", values,
    (error, results, fields) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      res.write(JSON.stringify({ message: 'Success!!' }));
      res.end();
    }
  );
});

app.delete('/users/:id', (req, res) => {
  connection.query("DELETE FROM t01_users WHERE id=?", req.params.id,
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(req.params.id);
      console.log(results);
      res.write(JSON.stringify({ message: 'Success!!' }));
      res.end();
    }
  );
});

app.put('/users/:id', (req, res) => {
  let values = [
    req.body.email,
    req.body.username,
    req.body.password,
    req.params.id
  ];
  connection.query(
    "UPDATE t01_users SET email=?, username=?, password=? WHERE id=?;", values,
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.status(400).send({ message: 'Error!!' });
        return;
      }
      console.log(results);
      res.write(JSON.stringify({ message: 'Success!!' }));
      res.end();
    }
  );
});
app.listen(9000);
