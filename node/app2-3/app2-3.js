// 外部データの参照
var config = require('./config');
config.routeResponseMap[url]

// URLを取得してそれ以外かを判別
var url = request.url;
console.log(url)
if (url == "/") {
  response.writeHead(200, { "Content-type": "text/html" });
  fs.readFile(config.routeResponseMap[url],
    function (error, data) {
      response.end(data);
    })
} else {
  var filetype = "";
  for (var key in contenttype.fileContentTypePathMap) {
    if (url.indexOf(key) != -1) {
      filetype = key
    }
  }
  if (filetype == "") {
    sendErrorResponse(response);
  } else {
    response.writeHead(200, { "Content-type": contenttype.fileContentTypePathMap[filetype]["Content-type"] });
    customReadFile(contenttype.fileContentTypePathMap[filetype]["path"] + url, response);
  }