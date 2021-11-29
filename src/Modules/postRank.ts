import cron from "node-cron";
import axios from "axios";
import { MessageEmbed } from "discord.js";

class RankPoster {
    client: any;
    ranks: number[];
    constructor(client) {
        this.client = client;
        this.ranks = [1, 2, 10, 50, 100, 500, 1000, 5000, 10000];
    }

    public async run() {
        cron.schedule("0 * * * *", () => {
            this.post();
        });
    }

    private async post() {
        const event = this.client.sekaiApi.getInEvent();
        if (!event) {
            return null;
        }
        let rank_embed = new MessageEmbed()
            .setTitle(`${event.name} | イベントランキング`)
            .setImage(
                `https://sekai-res.dnaroma.eu/file/sekai-assets/home/banner/${event.assetbundleName}_rip/${event.assetbundleName}.webp`
            );
        let desc: string = "";
        let passed: boolean = false;
        let isNew: boolean = true;
        for await (const t of this.ranks) {
            const res = await axios({
                method: "GET",
                baseURL: process.env.SEKAI_PUBLIC_API_BASE_URL,
                url: "event/live",
                params: {
                    rank: `${t}`,
                },
            });

            //@ts-ignore
            const rank = res.data.data.eventRankings[0];
            let dataTime = new Date(res.data.data.timestamp);
            let now = new Date();
            if (!passed) {
                if (now.getTime() - dataTime.getTime() > 600000) {
                    isNew = false;
                    passed = true;
                } else {
                    passed = true;
                }
            }
            desc =
                desc + `${t}位 : ${rank.userName} | ポイント : ${rank.score}\n`;
        }

        isNew
            ? null
            : rank_embed.setColor("RED").setFooter("10分以上前のデータです。");
        rank_embed.setDescription(desc).setTimestamp();
        this.client.channels
            .fetch("786953511182401566")
            .then((c) => c.send({ embeds: [rank_embed] }));
    }
}

module.exports = RankPoster;
