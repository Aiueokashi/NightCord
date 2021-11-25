class Connected {
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "mongoose";
  }
  public async run(){
    console.log("Connected MONGO_DB Atlas");
  }
}

module.exports = Connected;