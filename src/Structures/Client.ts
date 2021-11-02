import { Client, Collection } from "discord.js";
import { Command } from "./Command";
import _colors from "colors";
import mongoose from "mongoose";
import fs from "fs";
import readlineSync from "readline-sync";
import axios from "axios";

export class NightCordClient extends Client {
  commands: Collection<string, Command>;
  clientEvents: Collection<string, any>;
  mongoEvents: Collection<string, any>;
  modules: Collection<string, any>;
  deleteCmd: boolean;
  colors: any;
  readline: any;
  dbGuild: string;
  notifyChannel: string;
  logChannel: string;
  modChannel: string;
  constructor(options:any){
    super(options);
    this.commands = new Collection();
    this.colors = _colors;
    this.clientEvents = new Collection();
    this.mongoEvents = new Collection();
    this.modules = new Collection();
    this.readline = readlineSync;
    this.dbGuild = "731050051396173825";
    this.notifyChannel = "760785558296330261";
    this.logChannel = "787308319417171969";
    this.modChannel = "796027728868016169";
    this.deleteCmd = false;
  }

  public getInEvent(){
    const eventAsset = require("../Assets/events.json");
    let event = eventAsset.find(e => Date.now() < e.aggregateAt && Date.now() > e.startAt);
    if(!event){
      return null
    }else{
      return event;
    }
  }

  public async loadAssets(){
    const assetURL = "https://api.github.com/repos/Sekai-World/sekai-master-db-diff/contents";
    const res = await axios.get(assetURL);
    const data = res.data.filter(r => r.name.endsWith("json"));
    for await(const d of data){
      const raw = await axios.get(d.download_url)
      fs.writeFileSync(`${__dirname}/../Assets/${d.name}`,JSON.stringify(raw.data));
    }
    return true;
  }

  public async loadModules(){
    const moduleFiles = fs.readdirSync(`${__dirname}/../Modules`);
    for await (const file of moduleFiles){
      delete require.cache[`${file}`];
        const module = new (require(`../Modules/${file}`))(this),
          modulename: string = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
        this.modules.set(modulename,module);
        module.run();
    }
  }

  public async loadCommands(){
    const commandFiles = fs.readdirSync(`${__dirname}/../Commands`);
    for await (const file of commandFiles) {
      delete require.cache[`${file}`];
      const command: Command = new (require(`../Commands/${file}`))(this),
      filename: string = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
      if(!command.disable){
      this.commands.set(filename, command);
      this.application.commands.create({
          name: command.name,
          description: command.description,
          options: command.options
      },process.env.GUILD_ID);  
      }
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
      this.loadModules();
      this.loadAssets();
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