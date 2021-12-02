class Api_Setup {
    name: string;
    client: any;
    type: string;
    constructor(client) {
        this.name = "api_setup";
        this.client = client;
        this.type = "sekai";
    }
    public async run() {
        const client = this.client;
        client.loadModules();
        console.info("pjsekai API ready");
        setInterval(async function () {
            await client.sekaiApi.loadAssets();
            console.debug("API Assets loaded Succesfully");
        }, 3600000);
    }
}

module.exports = Api_Setup;
