import { Client, Collection } from "discord.js";
import { Command } from "./Command";
//@ts-ignore
import Progress from "cli-progress";
import _colors from 'colors';
//import path from "path";
import fs from "fs";

export class NightCordClient extends Client {
  commands: Collection<string, Command>;
  multi: any;
  colors: any;
  
  constructor(options:any){
    super(options);
    this.commands = new Collection();
    this.multi = new Progress.MultiBar({
      format: _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || ',
      clearOnComplete: false,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    })
    this.colors = _colors;
  }

  public async loadCommands(){
    const commandFiles = fs
    .readdirSync("./src/Commands");
    for (const file of commandFiles) {
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

  public async init(){
    const login_bar = this.multi.create(1,0);
    try{
      await this.login(process.env.TOKEN);
      login_bar.increment();
      this.loadCommands();
    }catch(e){
      
    }
  }
  
}