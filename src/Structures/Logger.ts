import { Client, MessageOptions } from 'discord.js';

export class Logger {
  client:Client;
  logChannel:any;
  constructor(){
    
  }

  public async setup(client){
    this.logChannel = client.channels.cache.get(client.logChannel);
    this.client = client;
  }
  
  public async post(data:MessageOptions){
    const msg = await this.logChannel.send(data);
    return msg;
  }
}