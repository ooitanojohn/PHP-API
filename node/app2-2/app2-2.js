"use strict"
// 404エラー
const sendErrorRes = (res) => {
  res.writeHead(404, { "Content-type": "text/html" });
  return res.end("<h1>Not Found</h1>");
}
// imgとかあれば追加して読み込み
const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) { // ファイルが存在するか
    fs.readFile(file_path, 'utf-8', (error, data) => {
      if (error) {
        sendErrorRes(res);
        return;
      } else {
        res.write(data)
        // res.end(data);
      }
    });
  } else {
    sendErrorRes(res);
  }
}
// 接続先URL
const routeResMap = {
  "/": "./views/index.html",
  "/page1": "./views/page1.html"
}
const reqRes = (req, res) => {
  const url = req.url;
  if ('/' == url) {
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
    console.log(customReadFile("public" + url, res))
    customReadFile("public" + url, res);
  } else if (url.indexOf(".png") != -1) {
    res.writeHead(200, { "Content-type": "image/png" });
    console.log('.png')
    customReadFile("public" + url, res);
  } else {
    sendErrorRes(res);
  }
}

// サーバーに接続
const port = 9000;
const http = require('http');
const fs = require('fs');
const app = http.createServer();
app.on("request", reqRes);
app.listen(port);
console.log("サーバ起動" + port + "ポート監視中");
