import { MessageEmbed } from "discord.js";
import { NightCordClient } from "./Client";
import moment from "moment";
import "moment-timezone";
import { THEME } from "./Constants";

type DataContent = {
    title: string;
    description?: string;
};

export class Logger {
    client: NightCordClient;
    logChannel: any;
    constructor() {}

    public setup(client: NightCordClient) {
        this.logChannel = client.channels.cache.get(client.logChannel);
        this.client = client;
        this.extendConsole();
        let oldConsole = console.log;
        console.log = function () {
            let timestamp =
                "[" +
                moment().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss") +
                "] ";
            Array.prototype.unshift.call(arguments, timestamp.green);
            oldConsole.apply(this, arguments);
        };
    }

    public async post(content: DataContent, type: string) {
        let embed = new MessageEmbed()
            .setTitle(content.title)
            .setColor(
                typeof THEME[type] === "object"
                    ? THEME[type][THEME[type].length - 1].toUpperCase()
                    : THEME[type].toUpperCase(),
            )
            .setTimestamp()
            .setFooter(type);
        content.description === undefined
            ? null
            : embed.setDescription(content.description);
        let msg = await this.logChannel.send({ embeds: [embed] });
        return msg;
    }

    private extendConsole() {
        for (const t in THEME) {
            if (t === "debug" && !this.client.debug) {
                //@ts-ignore
                console.debug = function () {};
            } else {
                let oldConsole = console[t];
                console[t] = function (...args: string[]) {
                    let timestamp =
                        "[" +
                        moment()
                            .tz("Asia/Tokyo")
                            .format("YYYY/MM/DD HH:mm:ss") +
                        "] ";
                    let arg = args.shift();
                    if (typeof THEME[t] === "object") {
                        let color: string = THEME[t].join("']['");
                        color = "['" + color + "']";
                        eval(
                            "oldConsole(`${timestamp.green} ${arg" +
                                color +
                                "}`, ...args);",
                        );
                    } else {
                        oldConsole(
                            `${timestamp.green} ${arg[THEME[t]]}`,
                            ...args,
                        );
                    }
                };
            }
        }
    }
}
