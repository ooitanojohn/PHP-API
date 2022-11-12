const config = require('./config.js')
const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!')
})
app.post('/', (req, res) => {
  res.send('Hello Express-post!')
})
app.listen(config.port)
console.log('port' + config.port)