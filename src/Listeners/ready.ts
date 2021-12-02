import { NightCordClient } from "../Structures/Client";
//@ts-ignore
import deleteCommand from "../Modules/DeleteAll";

class Ready {
    client: NightCordClient;
    type: string;
    name: string;
    constructor(client: NightCordClient) {
        this.name = "ready";
        this.client = client;
        this.type = "discord";
    }

    public async run() {
        console.info(`Logged in as : ${this.client.user.tag}`);
        //deleteCommand(this.client);
    }
}

module.exports = Ready;
