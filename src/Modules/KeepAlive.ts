import http from "http";
//@ts-ignore
http.createServer(function (req, res) {
    res.write("keep aliving!");
    res.end();
  })
  .listen(8080);