"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Client_1 = require("./Structures/Client");
const options = {
    intents: discord_js_1.Intents.FLAGS.GUILDS | discord_js_1.Intents.FLAGS.GUILD_MESSAGES | discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES
};
const client = new Client_1.NightCordClient(options);
client.init();
