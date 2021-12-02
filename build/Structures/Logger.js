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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
require("moment-timezone");
const Constants_1 = require("./Constants");
class Logger {
    constructor() { }
    setup(client) {
        this.logChannel = client.channels.cache.get(client.logChannel);
        this.client = client;
        this.extendConsole();
        let oldConsole = console.log;
        console.log = function () {
            let timestamp = "[" +
                (0, moment_1.default)().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss") +
                "] ";
            Array.prototype.unshift.call(arguments, timestamp.green);
            oldConsole.apply(this, arguments);
        };
    }
    post(content, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(content.title)
                .setColor(typeof Constants_1.THEME[type] === "object"
                ? Constants_1.THEME[type][Constants_1.THEME[type].length - 1].toUpperCase()
                : Constants_1.THEME[type].toUpperCase())
                .setTimestamp()
                .setFooter(type);
            content.description === undefined
                ? null
                : embed.setDescription(content.description);
            let msg = yield this.logChannel.send({ embeds: [embed] });
            return msg;
        });
    }
    extendConsole() {
        for (const t in Constants_1.THEME) {
            if (t === "debug" && !this.client.debug) {
                console.debug = function () { };
            }
            else {
                let oldConsole = console[t];
                console[t] = function (...args) {
                    let timestamp = "[" +
                        (0, moment_1.default)()
                            .tz("Asia/Tokyo")
                            .format("YYYY/MM/DD HH:mm:ss") +
                        "] ";
                    let arg = args.shift();
                    if (typeof Constants_1.THEME[t] === "object") {
                        let color = Constants_1.THEME[t].join("']['");
                        color = "['" + color + "']";
                        eval("oldConsole(`${timestamp.green} ${arg" +
                            color +
                            "}`, ...args);");
                    }
                    else {
                        oldConsole(`${timestamp.green} ${arg[Constants_1.THEME[t]]}`, ...args);
                    }
                };
            }
        }
    }
}
exports.Logger = Logger;
