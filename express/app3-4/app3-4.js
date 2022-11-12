const config = require('./config.js')
const express = require('express')
const app = express();
// 静的ファイルの階層指定
app.use(express.static(__dirname + '/public', { index: false }))
app.use(express.static(__dirname + '/views', { index: false }))
// postデータの受け取り
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('getデータ' + req.query.text_get)
  res.sendFile(__dirname + '/views/index.html')
})
app.post('/', (req, res) => {
  console.log('postデータ' + req.body.text_post)
  res.sendFile(__dirname + '/views/index.html')
})
app.listen(config.port)

// get post 取得も req,res前に書く