import { CommandInteraction } from "discord.js";
import { NightCordClient } from "../Structures/Client";

class InteractionCreate {
    client: any;
    type: string;
    name: string;
    constructor(client: NightCordClient) {
        this.name = "interactionCreate";
        this.client = client;
        this.type = "discord";
    }

    public run(interaction: CommandInteraction): void {
        const client = this.client;
        try {
            const command = client.commands.get(
                interaction.commandName.toLowerCase(),
            );
            if (command) command.run(interaction, interaction.options);
        } catch (error) {
            console.error("cought error on " + `${__filename}`.grey, error);
            interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}

module.exports = InteractionCreate;
