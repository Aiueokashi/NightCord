import { CommandInteraction, Message, VoiceState, Interaction, Client } from "discord.js";

export abstract class Command {
  client:Client;
  options:any;
  name:string;
  disable:boolean;
  description:string;

  constructor(client: Client, opt: { name: string, description: string, disable: boolean, options:any }){
    this.name = opt.name;
    this.description = opt.description;
    this.client = client;
    this.disable = opt.disable;
    this.options = opt.options;
  }

  public abstract onMessage(message: Message): Promise<void>;
  public abstract onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): void;
  public abstract onInteraction(interaction: Interaction): Promise<void>;
  //@ts-ignore
  public abstract run(interaction: CommandInteraction,args: any);
}