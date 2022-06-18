'use strict'

let port = 9000;
let http = require('http')
let app = http.createServer()

app.on("request", (req, res) => { // リクエスト来た時に書くとこ
  console.log('リクエストを受信しました')
  console.log(`req_method:${req.method}`)
  console.log(`req_url${req.url}`)
  console.log(`req_headers${req.headers}`)

  let params = (new URL(req.url, 'http://localhost:9000')).searchParams // http || s関係ない urlからパラメータを取得
  for (let param of params) {
    console.log(`name: ${param[0]} value: ${param[1]}`)
  }
  console.log('=================')

  res.writeHead(200, { 'content-Type': 'text/html' })
  let resMessage = '<h1>Hello Request1-3</h1>'
  res.end(resMessage)
})
app.listen(port)
console.log(`サーバ起動: ${port} ポート監視中`)

/*
get
リクエストを受信しました
req_method: GET
req_url /? get = 1
req_headers[object Object]
name: get value: 1
*/