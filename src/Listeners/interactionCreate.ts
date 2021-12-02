//@ts-ignore
import { CommandInteraction } from "discord.js";

class InteractionCreate {
    client: any;
    type: string;
    name: string;
    constructor(client) {
        this.name = "interactionCreate";
        this.client = client;
        this.type = "discord";
    }

    public async run(interaction /*: CommandInteraction*/) {
        const client = this.client;
        try {
            const command = client.commands.get(
                interaction.commandName.toLowerCase()
            );
            if (command) command.run(interaction, interaction.options);
        } catch (error) {
            console.error("cought error on " + `${__filename}`.grey, error);
            interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}

module.exports = InteractionCreate;
