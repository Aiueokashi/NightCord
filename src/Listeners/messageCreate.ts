import { Message } from "discord.js";

class MessageCreate{
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "discord";
  }

  public async run(message:Message){
    //@ts-ignore
    const client = this.client;
    if(message.author.id !== process.env.OWNER){
      return;
    }
    const [prefix, ...args] = message.content.split(/[\s]+/gm);
    if(prefix !== "e>"){
      return;
    }
    try {
      let evaled = await eval(args.join(" "));
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });
      if (evaled.includes(this.client.token))
        evaled = evaled.replace(this.client.token, "gm", "*Token*");
      message.channel.send({ content: `\`\`\`js\n${evaled}\`\`\`` });
    } catch (error) {
      let errorDetails = error.toString();

      if (errorDetails.includes(this.client.token))
        errorDetails = errorDetails.replace(this.client.token, "gm", "*Token*");

      message.channel.send({ content: `\`\`\`js\n${errorDetails}\`\`\`` });
    } finally {
      const log = ` USE OF EVAL by ${message.author.username} ( ${message.author.id} )`;

      console.log(`EVAL [${log}]`);
    }
  }
}

module.exports = MessageCreate;