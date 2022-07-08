const config = require('./config.js')
const express = require('express')
const app = express();
// 静的ファイルの階層指定
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(req.query.text_get)
  console.log('getデータ' + req.query.text_get)
})
app.post('/', (req, res) => {
  res.send(req.body.text_post)
  console.log('postデータ' + req.body.text_post)
})
app.listen(config.port)

// get post 取得も req,res前に書く