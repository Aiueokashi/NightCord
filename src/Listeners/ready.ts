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
    console.log(`Logged in as : ${this.client.user.tag}`);
    //deleteCommand(this.client);
  }
}

module.exports = Ready;