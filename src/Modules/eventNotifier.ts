import cron from "node-cron";

class eventNotifier {
    client: any;
    eventModel: any;
    constructor(client) {
        this.client = client;
        this.eventModel = require("../Models/event");
    }

    public async run() {
        cron.schedule("5,55 * * * * *", () => {
            this.eventCheck();
            this.checkEventStore();
        });
    }

    private async checkEventStore() {}

    private async eventCheck() {
        let event = this.client.sekaiApi.getInEvent();
        if (!event) {
            return null;
        } else {
            let eventmodel = await this.eventModel.findOne({ id: event.id });
            if (!eventmodel) {
                eventmodel = new this.eventModel({
                    id: event.id,
                    data: event,
                });
                await eventmodel.save();
            }
            return 1;
        }
    }
}

module.exports = eventNotifier;
