import { Intents } from "discord.js";
import { NightCordClient } from "./Structures/Client";

const options = {
    intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES | Intents.FLAGS.GUILD_VOICE_STATES
}

const client = new NightCordClient(options);

//@ts-ignore
client.init();