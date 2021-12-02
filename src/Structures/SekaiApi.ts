import { NightCordClient } from "./Client";
import { EventEmitter } from "events";
import axios from "axios";
import fs from "fs";

export class SekaiApi extends EventEmitter {
    client: NightCordClient;
    eventModel: any;
    constructor() {
        super();
        this.eventModel = require("../Models/event");
    }

    //イベントの最中かどうかを取得
    public getInEvent() {
        const eventAsset = require("../Assets/events.json");
        let event = eventAsset.find(
            (e) => Date.now() < e.aggregateAt && Date.now() > e.startAt
        );
        if (!event) {
            return null;
        } else {
            return event;
        }
    }

    //最後に開催されたイベントを取得
    public getLastEvent() {
        const eventAsset = require("../Assets/events.json");
        let event = eventAsset.find(
            (e) => Date.now() < e.aggregateAt && Date.now() > e.startAt
        );
        if (!event) {
            //await this.eventModel.
        } else {
            return event;
        }
    }

    public async setup(client: NightCordClient) {
        this.client = client;
        this.emit("api_init");
        await this.loadAssets();
        this.emit("api_setup");
    }

    public async loadAssets() {
        let first = true;
        const assetURL =
            "https://api.github.com/repos/Sekai-World/sekai-master-db-diff/contents";
        const res = await axios.get(assetURL);
        const data = res.data.filter((r) => r.name.endsWith("json"));
        fs.mkdir(`${__dirname}/../Assets`, async (err) => {
            if (err && first) {
                first = false;
                return err;
            } else {
                for await (const d of data) {
                    const raw = await axios.get(d.download_url);
                    fs.writeFileSync(
                        `${__dirname}/../Assets/${d.name}`,
                        JSON.stringify(raw.data)
                    );
                }
                first = false;
                return true;
            }
        });
    }
}
