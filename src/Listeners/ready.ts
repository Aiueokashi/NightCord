class Ready {
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "discord";
  }
  
  public async run(){
    console.log(`Logged in as : ${this.client.user.tag}`)
  }
}

module.exports = Ready;