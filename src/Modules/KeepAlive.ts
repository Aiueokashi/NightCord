import http from "http";

class keepAlive{
  client:any;
  constructor(client){
    this.client = client;
  }
  public _run():void{
  //@ts-ignore
  http.createServer(function (req, res) {
    res.write("keep aliving!");
    res.end();
  })
  .listen(8080);
  }
  public run(){};
}

module.exports = keepAlive;