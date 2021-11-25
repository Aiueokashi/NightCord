class UncaughtException{
  name:string;
  type:string;
  client:any;
  constructor(client){
    this.type = 'process';
    this.name = 'uncaughtException';
    this.client = client;
  }

  public async run(err){
    console.error(`Uncaught error`,err);
  }
}

module.exports = UncaughtException;