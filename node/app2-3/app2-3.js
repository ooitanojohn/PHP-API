"use strict"
const http = require('http');
const fs = require('fs');
const app = http.createServer();
const config = require('./config')
const contenttype = require('./contenttype')

// imgとかあれば追加して読み込み
const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) { // ファイルが存在するか
    fs.readFile(file_path, (error, data) => {
      if (error) {
        sendErrorRes(res);
        return;
      } else {
        res.write(data)
        res.end();
      }
    });
  } else {
    sendErrorRes(res);
  }
}
// 読み込むファイルがなければ
const sendErrorRes = (res) => {
  res.writeHead(404, { "Content-type": "text/html" });
  res.write("<h1>Not Found</h1>")
  return res.end();
}

const reqRes = (req, res) => {
  const url = req.url;
  console.log(url)
  if ('/' == url || '/page1' == url) {
    res.writeHead(200, { "Content-type": "text/html" });
    fs.readFile(config.routeResMap[url], 'utf-8',
      (error, data) => {
        res.end(data);
      })
  } else {
    let filetype = ''
    for (const key in contenttype.fileContentTypePathMap) {
      if (url.indexOf(key) != -1) {
        filetype = key
      }
    }
    if (filetype == '') {
      sendErrorRes(res)
    } else {
      res.writeHead(200, { 'Content-type': contenttype.fileContentTypePathMap[filetype]['Content-type'] })
      customReadFile(contenttype.fileContentTypePathMap[filetype]['path'] + url, res)
    }
  }
}

// サーバーに接続
app.on("request", reqRes);
app.listen(config.port);
console.log("サーバ起動" + config.port + "ポート監視中");
