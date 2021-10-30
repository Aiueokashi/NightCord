import { Client, Collection } from "discord.js";
import { Command } from "./Command";
import _colors from "colors";
import mongoose from "mongoose";
import fs from "fs";
import readlineSync from "readline-sync";

export class NightCordClient extends Client {
  commands: Collection<string, Command>;
  clientEvents: Collection<string, any>;
  mongoEvents: Collection<string, any>;
  colors: any;
  readline: any;
  constructor(options:any){
    super(options);
    this.commands = new Collection();
    this.colors = _colors;
    this.clientEvents = new Collection();
    this.mongoEvents = new Collection();
    this.readline = readlineSync;
  }

  public async loadCommands(){
    const commandFiles = fs.readdirSync(`${__dirname}/../Commands`);
    for await (const file of commandFiles) {
      delete require.cache[`${file}`];
      const command: Command = new (require(`../Commands/${file}`))(this),
      filename: string = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
      this.commands.set(filename, command);
      this.application.commands.create({
          name: command.name,
          description: command.description,
          options: command.options
      },process.env.GUILD_ID);  
    }
  }

  public async loadEvents(){
    const listenerFiles = fs.readdirSync(`${__dirname}/../Listeners`);
    for await(const file of listenerFiles){
      delete require.cache[`${file}`];
      const listener = new (require(`../Listeners/${file}`))(this),
        eventname:string = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
      if(listener.type === "discord"){
        this.clientEvents.set(eventname, listener);
        super.on(eventname, (...args) => listener.run(...args));
      }else if(listener.type === "mongoose"){
        this.mongoEvents.set(eventname, listener);
        mongoose.connection.on(eventname, (...args) => listener.run(...args));
      }
    }
  }

  public async init(){
      require("../Modules/KeepAlive")
      this.loadEvents();
      await this.login(process.env.TOKEN); 
      this.loadCommands();
      await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
  }
  
}