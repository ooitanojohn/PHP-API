const config = require('./config.js')
const express = require('express')
const app = express();

const func = require('./func.js') // isset関数
// app.set('view engine', 'ejs') // 記述いらない
// 静的ファイルの階層指定
app.use(express.static(__dirname + '/public', { index: false }))
app.use(express.static(__dirname + '/views', { index: false }))
// postデータの受け取り
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 4-1
app.get('/app4-1', (req, res) => {
  res.render('index4-1.ejs', {
    val1: '<h2>HAL</h2>',
    val2: '大阪'
  })
})

// 4-2
app.get('/app4-2', (req, res) => {
  res.render('index4-2.ejs', {
    val1: '<h2>HAL</h2>',
    val2: '大阪'
  })
})

// 4-3
let cnt = 0;
app.get('/app4-3', (req, res) => {
  res.render('index4-3.ejs', {
    val1: '<h2>HAL</h2>',
    val2: '大阪',
    cnt: cnt++
  })
})

// 4-4
app.get('/app4-4-1/:name/', (req, res) => {
  res.render('page2.ejs', {
    name: `姓のみ${req.params.name}`,
  })
})
app.get('/app4-4-1/:name/:name2', (req, res) => {
  res.render('page2.ejs', {
    name: `姓名連結:${req.params.name + ' ' + req.params.name2}`,
  })
})


const users = ['浅田', '永峰', '河田', '川島']
app.get('/app4-4-2/:no/', (req, res) => {
  res.render('page2.ejs', {
    name: `<h2>姓のみ${users[req.params.no]}</h2>`,
  })
})


//********************************************************
//  まとめ
//********************************************************

// 4-5
app.get('/page1', (req, res) => { // get Page1
  res.render('page1.ejs')
})


// index.ejs
app.get('/', (req, res) => { // get
  console.log(req.query.text_get)
  if (typeof req.query.text_get === 'undefined') { // 値が未定義の場合 文字列 未定義を''に変換
    req.query.text_get = ''
  }
  res.render('index.ejs', {
    text_get: `${req.query.text_get}`,
  })
})
app.post('/', (req, res) => { // post
  console.log(req.body.text_post)
  res.render('index.ejs', {
    text_get: '', // post送信時点でクエリパラメータを取得していないのでget値は初期化する
    text_post: `${req.body.text_post}`,
  })
})
app.use((req, res) => { //
  res.status(404);
  res.render('notfound.ejs')
})
app.listen(config.port)

// get post 取得も req,res前に書く