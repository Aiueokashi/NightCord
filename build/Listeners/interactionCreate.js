"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InteractionCreate {
    constructor(client) {
        this.name = "interactionCreate";
        this.client = client;
        this.type = "discord";
    }
    run(interaction) {
        const client = this.client;
        try {
            const command = client.commands.get(interaction.commandName.toLowerCase());
            if (command)
                command.run(interaction, interaction.options);
        }
        catch (error) {
            console.error("cought error on " + `${__filename}`.grey, error);
            interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}
module.exports = InteractionCreate;
