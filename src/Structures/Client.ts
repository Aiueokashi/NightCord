import { Client, Collection, ClientOptions } from "discord.js";
import { Command } from "./Command";
import { Logger } from "./Logger";
import colors from "colors";
import mongoose from "mongoose";
import fs from "fs";
import { SekaiApi } from "./SekaiApi";

export class NightCordClient extends Client {
    commands: Collection<string, Command>;
    clientEvents: Collection<string, any>;
    mongoEvents: Collection<string, any>;
    sekaiEvents: Collection<string, any>;
    modules: Collection<string, any>;
    logger: Logger;
    sekaiApi: SekaiApi;
    deleteCmd: boolean;
    colors: any;
    dbGuild: string;
    notifyChannel: string;
    logChannel: string;
    modChannel: string;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.colors = colors;
        this.clientEvents = new Collection();
        this.mongoEvents = new Collection();
        this.sekaiEvents = new Collection();
        this.modules = new Collection();
        this.logger = new Logger();
        this.sekaiApi = new SekaiApi();
        this.dbGuild = "731050051396173825";
        this.notifyChannel = "760785558296330261";
        this.logChannel = "787308319417171969";
        this.modChannel = "796027728868016169";
        this.deleteCmd = false;
    }

    public async loadModules() {
        const moduleFiles = fs.readdirSync(`${__dirname}/../Modules`);
        for await (const file of moduleFiles) {
            delete require.cache[`${file}`];
            const module = new (require(`../Modules/${file}`))(this),
                modulename: string = file.slice(
                    file.lastIndexOf("/") + 1,
                    file.length - 3
                );
            this.modules.set(modulename, module);
            module.run();
        }
    }

    public async loadCommands() {
        const commandFiles = fs.readdirSync(`${__dirname}/../Commands`);
        for await (const file of commandFiles) {
            delete require.cache[`${file}`];
            const command: Command = new (require(`../Commands/${file}`))(this);
            if (!command.disable) {
                this.commands.set(command.name, command);
                this.application.commands.create(
                    {
                        name: command.name,
                        description: command.description,
                        options: command.options,
                    },
                    process.env.GUILD_ID
                );
            }
        }
    }

    public async loadEvents() {
        const listenerFiles = fs.readdirSync(`${__dirname}/../Listeners`);
        for await (const file of listenerFiles) {
            delete require.cache[`${file}`];
            const listener = new (require(`../Listeners/${file}`))(this),
                eventname: string = listener.name;
            if (listener.type === "discord") {
                this.clientEvents.set(eventname, listener);
                super.on(eventname, (...args) => listener.run(...args));
            } else if (listener.type === "mongoose") {
                this.mongoEvents.set(eventname, listener);
                mongoose.connection.on(eventname, (...args) =>
                    listener.run(...args)
                );
            } else if (listener.type === "sekai") {
                this.sekaiEvents.set(eventname, listener);
                this.sekaiApi.on(eventname, (...args) => listener.run(...args));
            } else if (listener.type === "process") {
                process.on(eventname, (...args) => listener.run(...args));
            }
        }
    }

    public async init() {
        this.logger.setup(this);
        this.loadEvents();
        await this.login(process.env.TOKEN);
        this.sekaiApi.setup(this);
        this.loadCommands();
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    }
}
