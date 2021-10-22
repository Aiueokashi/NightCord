class Ready {
  client: any;
  constructor(client){
    this.client = client
  }
  
  public async run(){
    console.log(`[${this.client.commands.map(c=> this.client.colors.cyan(c.name))}]`)
  }
}

module.exports = Ready;