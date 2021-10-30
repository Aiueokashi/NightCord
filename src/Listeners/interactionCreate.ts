import { CommandInteraction } from "discord.js";

class InteractionCreate{
  client: any;
  type: string;
  constructor(client){
    this.client = client;
    this.type = "discord";
  }

  public async run(interaction:CommandInteraction){
    const client = this.client;
    try {
    const command = client.commands.get(
      interaction.commandName.toLowerCase()
    );
    if (command) command.run(interaction, interaction.options);
    } catch (error) {
      interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}

module.exports = InteractionCreate;