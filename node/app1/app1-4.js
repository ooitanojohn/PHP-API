'use strict'

let port = 9000;
let http = require('http')
let app = http.createServer()

app.on("request", (req, res) => { // リクエスト来た時に書くとこ
  let body = []
  req.on('data', (body_data) => { // body_data受け取り
    console.log('data')
    console.log(body_data)
    console.log('---------')
    body.push(body_data)
  })
  req.on('end', () => {
    const body_string = Buffer.concat(body).toString();
    console.log(`Request body contents: + ${body_string}`)
    if (body_string === '') { return 0 } // bodyが空なら0
    let array = JSON.parse('{"' + decodeURI(body_string.replace(/&/g, "\", \"").replace(/=/g, "\":\"")) + '"}')
    // let array = JSON.parse(`{${decodeURI(body_string.replace("/&/g", "\"", "").replace("/=/g", "\":\""))}}`)
    console.log(array)
    let string = ''
    for (let key in array) {
      // console.log(`name: ${key} value: ${array[key]} \n`)
      string += `name: ${key} value: ${array[key]} \n`
    }
    console.log(string)
  })
  console.log('リクエストを受信しました')
  console.log(`req_method:${req.method}`)
  console.log(`req_url${req.url}`)
  console.log(`req_headers${req.headers}`)

  // let params = (new URL(req.url, 'http://localhost:9000')).searchParams // http || s関係ない urlからパラメータを取得
  // for (let param of params) {
  //   console.log(`name: ${param[0]} value: ${param[1]}`)
  // }
  // console.log('=================')

  res.writeHead(200, { 'content-Type': 'text/html' })
  let resMessage = '<h1>Hello RequestPost 1-4</h1>'
  let resBody = '<p>postリクエスト来たよ</p>'
  res.end(resMessage + resBody)
})
app.listen(port)
console.log(`サーバ起動: ${port} ポート監視中`)

/*

*/