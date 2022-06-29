"use strict"
const routeResMap = {
  "/": "./views/index.html",
  "/page1": "./views/page1.html"
}
// html jpg png reqするタイミングは別
const reqRes = (req, res) => {
  if (routeResMap[req.url]) {
    fs.readFile(routeResMap[req.url], 'utf-8',
      (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-type": "text/plain" });
          return res.end("Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
  } else { // この段階でelseがないとimgファイルを延々探してtime err
    res.writeHead(404, { "Content-type": "text/plain" });
    return res.end("Not Found");
  }
}

// サーバ関連
const port = 9000;
const http = require('http');
const fs = require('fs');
const app = http.createServer();
app.on("request", reqRes);
app.listen(port);
console.log("サーバ起動" + port + "ポート監視中");

