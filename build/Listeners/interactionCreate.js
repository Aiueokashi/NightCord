"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class InteractionCreate {
    constructor(client) {
        this.name = "interactionCreate";
        this.client = client;
        this.type = "discord";
    }
    run(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
module.exports = InteractionCreate;
