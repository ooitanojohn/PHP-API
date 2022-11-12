const config = require('./config.js')
const express = require('express')
const app = express();
// 静的ファイルの階層指定
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html')
})
app.post('/', (req, res) => {
  res.send('<h1>/public</h1>')
})
app.listen(config.port)

// get post 取得も req,res前に書く