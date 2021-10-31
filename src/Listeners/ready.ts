//@ts-ignore
import deleteCommand from "../Modules/DeleteAll";

class Ready {
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "discord";
  }
  
  public async run(){
    console.log(`Logged in as : ${this.client.user.tag}`)
    setInterval(function(){
      this.client.loadAssets()
      },3600000)
    //deleteCommand(this.client);
  }
}

module.exports = Ready;