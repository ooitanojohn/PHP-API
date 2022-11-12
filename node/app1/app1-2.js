'use strict';
const http = require('http'); // http プロトコルを使用 https でも起動した
const app = http.createServer(); // https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
app.on('request', (req, res) => {
  res.writeHead(200, { 'content-Type': 'text/plain' });
  res.write('Hello Node1-2!!!');
  res.end();
});
app.listen(9000, () => {
  console.log("サーバ起動" + 9000 + " ポート監視中");
});