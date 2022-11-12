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

app.get('/', (reg, res) => {
  connection.query(
    'SELECT * FROM t01_users;',
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        return;
      }
      console.log(results);
      res.render('index5-2.ejs', { values: results });
    }
  );
});

app.get('/users', (req, res) => {
  connection.query(
    'SELECT * FROM t01_users', (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        return;
      }
      console.log(results);
      res.render('test.ejs');
    }
  );
});

app.post('/users', (req, res) => {
  connection.query("INSERT INTO t01_users VALUES ('999', 'haru@hal.ac.jp', '春太郎','test');", (error, results) => {
    if (error) {
      console.log('error connecting: ' + error.stack);
      res.send(error.stack);
      return;
    }
    console.log(results);
    res.render('test.ejs');
  }
  );
});

app.delete('/users', (reg, res) => {
  connection.query("DELETE FROM t01_users WHERE id='999';",
    (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack); res.send(error.stack); return;
      }
      console.log(results);
      res.render('test.ejs');
    }
  );
});

app.put('/users', (reg, res) => {
  connection.query(
    "UPDATE t01_users SET password='12345', email='haru@hal.ac.jp' WHERE id='999';", (error, results) => {
      if (error) {
        console.log('error connecting: ' + error.stack);
        res.send(error.stack);
        return;
      }
      console.log(results);
      res.render('test.ejs');
    }
  );
});

app.listen(9000);
