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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NightCordClient = void 0;
const discord_js_1 = require("discord.js");
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
class NightCordClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.colors = colors_1.default;
        this.clientEvents = new discord_js_1.Collection();
        this.mongoEvents = new discord_js_1.Collection();
        this.readline = readline_sync_1.default;
    }
    loadCommands() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const commandFiles = fs_1.default.readdirSync(`${__dirname}/../Commands`);
            try {
                for (var commandFiles_1 = __asyncValues(commandFiles), commandFiles_1_1; commandFiles_1_1 = yield commandFiles_1.next(), !commandFiles_1_1.done;) {
                    const file = commandFiles_1_1.value;
                    delete require.cache[`${file}`];
                    const command = new (require(`../Commands/${file}`))(this), filename = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
                    this.commands.set(filename, command);
                    this.application.commands.create({
                        name: command.name,
                        description: command.description,
                        options: command.options
                    }, process.env.GUILD_ID);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (commandFiles_1_1 && !commandFiles_1_1.done && (_a = commandFiles_1.return)) yield _a.call(commandFiles_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    loadEvents() {
        const _super = Object.create(null, {
            on: { get: () => super.on }
        });
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const listenerFiles = fs_1.default.readdirSync(`${__dirname}/../Listeners`);
            try {
                for (var listenerFiles_1 = __asyncValues(listenerFiles), listenerFiles_1_1; listenerFiles_1_1 = yield listenerFiles_1.next(), !listenerFiles_1_1.done;) {
                    const file = listenerFiles_1_1.value;
                    delete require.cache[`${file}`];
                    const listener = new (require(`../Listeners/${file}`))(this), eventname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
                    if (listener.type === "discord") {
                        this.clientEvents.set(eventname, listener);
                        _super.on.call(this, eventname, (...args) => listener.run(...args));
                    }
                    else if (listener.type === "mongoose") {
                        this.mongoEvents.set(eventname, listener);
                        mongoose_1.default.connection.on(eventname, (...args) => listener.run(...args));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (listenerFiles_1_1 && !listenerFiles_1_1.done && (_a = listenerFiles_1.return)) yield _a.call(listenerFiles_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            require("../Modules/KeepAlive");
            this.loadEvents();
            yield this.login(process.env.TOKEN);
            this.loadCommands();
            yield mongoose_1.default.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
        });
    }
}
exports.NightCordClient = NightCordClient;
