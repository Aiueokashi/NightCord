class Connected {
    client: any;
    name: string;
    type: string;
    constructor(client) {
        this.name = "connected";
        this.client = client;
        this.type = "mongoose";
    }
    public async run() {
        console.info("Connected MONGO_DB Atlas");
    }
}

module.exports = Connected;
