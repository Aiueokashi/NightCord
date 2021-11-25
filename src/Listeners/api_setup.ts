class Api_Setup {
  name: string;
  client: any;
  type: string;
  constructor(client){
    this.name = 'api_setup';
    this.client = client;
    this.type = "sekai";
  }
  public async run(){
    console.log("API ready");
  }
}

module.exports = Api_Setup;