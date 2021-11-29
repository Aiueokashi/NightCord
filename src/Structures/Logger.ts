import { Client, MessageOptions } from "discord.js";
const moment = require("moment");
require("moment-timezone");
const chalk = require("chalk");

export class Logger {
    client: Client;
    logChannel: any;
    constructor() {}

    public setup(client) {
        this.logChannel = client.channels.cache.get(client.logChannel);
        this.client = client;
        let oldConsole = console.log;
        console.log = function () {
            let timestamp =
                "[" +
                moment().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss") +
                "] ";
            Array.prototype.unshift.call(arguments, chalk.bold(timestamp));
            oldConsole.apply(this, arguments);
        };
    }

    public async post(data: MessageOptions) {
        const msg = await this.logChannel.send(data);
        return msg;
    }
}
