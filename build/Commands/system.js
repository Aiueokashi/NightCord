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
const Command_1 = require("../Structures/Command");
const os_1 = __importDefault(require("os"));
const botv = process.env;
const discordjsVersion = botv.npm_package_dependencies_discord_js;
const botversion = botv.npm_package_version;
module.exports = class System extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "system",
            description: "bot info",
            options: null,
            disable: false,
        });
    }
    run(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.client;
            let Ping = `[ ${Math.round(client.ws.ping)}ms ]`;
            let Servers = `[ ${client.guilds.cache.size} ]`;
            let Channels = `[ ${client.channels.cache.size} ]`;
            let Users = `[ ${client.users.cache.size} ]`;
            let Name = `[ ${client.user.tag} ]`;
            let ID = `[ ${client.user.id} ]`;
            let nodeJS = `[ ${process.version} ]`;
            let djs = `[ ${discordjsVersion} ]`;
            let Arch = `[ ${process.arch} ]`;
            let Platform = `[ ${process.platform} ]`;
            let cpuModel = `[ ${os_1.default.cpus()[0].model} ]`;
            let core = `[ ${os_1.default.cpus().length} ]`;
            let BotVersion = `[ ${botversion} ]`;
            let UpTime = `[ ${timeCon(process.uptime())} ]`;
            let Process_Info = `[ PID: ${process.pid} at ${process.cwd()}]`;
            let Process_Memory_Usage = `[ ${Math.ceil(process.memoryUsage().heapTotal / 1000000)}MB ]`;
            const System_Memory_Usage = `[ ${Math.ceil((os_1.default.totalmem() - os_1.default.freemem()) / 1000000)}MB of ${Math.ceil(os_1.default.totalmem() / 1000000)}MB ]`;
            let RAM_Usage = `[ ${(process.memoryUsage().rss / 1048576).toFixed()}MB ]`;
            let Memory_Usage = `[ ${formatBytes(process.memoryUsage().heapUsed, 2)} ]`;
            let msg = "```\n" +
                `Ping:\n${Ping}\nServers:\n${Servers}\nchannels:\n${Channels}\nUsers:\n${Users}\nName:\n${Name}\nID:\n${ID}\nNodejs:\n${nodeJS}\nDiscord.js\n${djs}\nArch:\n${Arch}\nPlatform:\n${Platform}\ncpuModel:\n${cpuModel}\ncore:\n${core}\nBotversion:\n${BotVersion}\nUpTime:\n${UpTime}\nprocess Info:\n${Process_Info}\nProcess Memory Usage:\n${Process_Memory_Usage}\nSystem Memory Usage:\n${System_Memory_Usage}\nRAM Usage:\n${RAM_Usage}\nMemory Usage:\n${Memory_Usage}` +
                "```";
            yield interaction.reply({ content: msg, ephemeral: true });
        });
    }
};
function formatBytes(a, b) {
    if (0 === a)
        return "0 Bytes";
    let c = 1024, d = b || 2, e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}
function timeCon(time) {
    let days = Math.floor((time % 31536000) / 86400);
    let hours = Math.floor(((time % 31536000) % 86400) / 3600);
    let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
    let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
    days = days > 9 ? days : "0" + days;
    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;
    return `${days > 0 ? `${days}:` : ""}${(hours || days) > 0 ? `${hours}:` : ""}${minutes}:${seconds}`;
}
