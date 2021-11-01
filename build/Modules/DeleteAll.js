var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const deleteAll = function (client) {
    return __awaiter(this, void 0, void 0, function* () {
        let Globalcmds = yield client.api.applications(client.user.id).commands.get();
        let Guildcmds = yield client.api
            .applications(client.user.id)
            .guilds(process.env.GUILD_ID)
            .commands.get();
        Globalcmds.forEach(cmd => {
            client.api
                .applications(client.user.id)
                .commands(cmd.id)
                .delete();
            console.log("Deleted Global command { name: " + cmd.name + ", ID: " + cmd.id + " }");
        });
        Guildcmds.forEach(cmds => {
            client.api
                .applications(client.user.id)
                .guilds(process.env.GUILD_ID)
                .commands(cmds.id)
                .delete();
            console.log("Deleted Guild command { name: " + cmds.name + ", ID: " + cmds.id + " }");
        });
    });
};
module.exports = deleteAll;
