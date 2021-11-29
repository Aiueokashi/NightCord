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
    const client = this.client;
    client.loadModules();
    console.log("API ready");
    setInterval(function(){
        client.sekaiApi.loadAssets();
      },3600000)
  }
}

module.exports = Api_Setup;