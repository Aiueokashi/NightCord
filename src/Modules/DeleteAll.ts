class deleteAll {
    client: any;
    constructor(client) {
        this.client = client;
    }
    public async run() {
        let client = this.client;
        if (client.deleteCmd) {
            let Globalcmds = await client.api
                .applications(client.user.id)
                .commands.get();
            let Guildcmds = await client.api
                .applications(client.user.id)
                .guilds(process.env.GUILD_ID)
                .commands.get();
            Globalcmds.forEach((cmd) => {
                client.api
                    .applications(client.user.id)
                    .commands(cmd.id)
                    .delete();
                console.log(
                    "Deleted Global command { name: " +
                        cmd.name +
                        ", ID: " +
                        cmd.id +
                        " }",
                );
            });
            Guildcmds.forEach((cmds) => {
                client.api
                    .applications(client.user.id)
                    .guilds(process.env.GUILD_ID)
                    .commands(cmds.id)
                    .delete();
                console.log(
                    "Deleted Guild command { name: " +
                        cmds.name +
                        ", ID: " +
                        cmds.id +
                        " }",
                );
            });
            return 1;
        } else {
            return 0;
        }
    }
}

module.exports = deleteAll;
