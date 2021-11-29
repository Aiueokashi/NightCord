//@ts-ignore
import deleteCommand from "../Modules/DeleteAll";

class Ready {
    client: any;
    type: string;
    name: string;
    constructor(client) {
        this.name = "ready";
        this.client = client;
        this.type = "discord";
    }

    public async run() {
        console.log(`Logged in as : ${this.client.user.tag}`);
        //deleteCommand(this.client);
    }
}

module.exports = Ready;
