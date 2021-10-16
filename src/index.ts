import { Intents, CommandInteraction } from "discord.js";
import { NightCordClient } from "./Structures/Client";

const options = {
    intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES | Intents.FLAGS.GUILD_VOICE_STATES
}

const client = new NightCordClient(options);

client.on("ready", () => {
  console.log(`[${client.commands.map(c=>client.colors.cyan(c.name))}]`)
})

client.on("interactionCreate", async (interaction:CommandInteraction) => {
  try {
    const command = client.commands.get(
      interaction.commandName.toLowerCase()
    );
    if (command) command.run(interaction, interaction.options);
    } catch (error) {
      interaction.reply({ content: error.message, ephemeral: true });
    }
  });


//@ts-ignore
client.init();