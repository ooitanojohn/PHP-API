"use strict"
// 接続先URL
const routeResMap = {
  "/": "./views/index.html",
  "/page1": "./views/page1.html"
}
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
// 404エラー
const sendErrorRes = (res) => {
  res.writeHead(404, { "Content-type": "text/html" });
  res.write("<h1>Not Found</h1>")
  return res.end();
}

// サーバーに接続
const port = 9000;
const http = require('http');
const fs = require('fs');
const app = http.createServer();

const reqRes = (req, res) => {
  const url = req.url;
  console.log(url);
  if ('/' == url || '/page1' == url) {
    res.writeHead(200, { "Content-type": "text/html" });
    fs.readFile(routeResMap[url], 'utf-8',
      (error, data) => {
        res.end(data);
      })
  } else if (url.indexOf(".html") != -1) {
    res.writeHead(200, { "Content-type": "text/html" });
    customReadFile("views" + url, res);
  } else if (url.indexOf(".css") != -1) {
    res.writeHead(200, { "Content-type": "text/css" });
    customReadFile("public" + url, res);
  } else if (url.indexOf(".js") != -1) {
    res.writeHead(200, { "Content-type": "text/javascript" });
    customReadFile("public" + url, res);
  } else if (url.indexOf(".jpg") != -1) {
    res.writeHead(200, { "Content-type": "image/jpeg" });
    customReadFile("public" + url, res);
  } else if (url.indexOf(".png") != -1) {
    res.writeHead(200, { "Content-type": "image/png" });
    customReadFile("public" + url, res);
  } else {
    sendErrorRes(res);
  }
}

app.on("request", reqRes);
app.listen(port);
console.log("サーバ起動" + port + "ポート監視中");
