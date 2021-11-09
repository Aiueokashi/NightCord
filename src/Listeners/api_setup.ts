class Api_Setup {
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "sekai";
  }
  public async run(){
    console.log("API ready");
  }
}

module.exports = Api_Setup;