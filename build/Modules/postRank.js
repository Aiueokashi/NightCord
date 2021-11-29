"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
class RankPoster {
    constructor(client) {
        this.client = client;
        this.ranks = [1, 2, 10, 50, 100, 500, 1000, 5000, 10000];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            node_cron_1.default.schedule('0 * * * *', () => {
                this.post();
            });
        });
    }
    post() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const event = this.client.sekaiApi.getInEvent();
            if (!event) {
                return null;
            }
            let rank_embed = new discord_js_1.MessageEmbed()
                .setTitle(`${event.name} | イベントランキング`)
                .setImage(`https://sekai-res.dnaroma.eu/file/sekai-assets/home/banner/${event.assetbundleName}_rip/${event.assetbundleName}.webp`);
            let desc = "";
            let passed = false;
            let isNew = true;
            try {
                for (var _b = __asyncValues(this.ranks), _c; _c = yield _b.next(), !_c.done;) {
                    const t = _c.value;
                    const res = yield (0, axios_1.default)({
                        method: "GET",
                        baseURL: process.env.SEKAI_PUBLIC_API_BASE_URL,
                        url: "event/live",
                        params: {
                            rank: `${t}`,
                        }
                    });
                    const rank = res.data.data.eventRankings[0];
                    let dataTime = new Date(res.data.data.timestamp);
                    let now = new Date();
                    if (!passed) {
                        if ((now.getTime() - dataTime.getTime()) > 600000) {
                            isNew = false;
                            passed = true;
                        }
                        else {
                            passed = true;
                        }
                    }
                    desc = desc + `${t}位 : ${rank.userName} | ポイント : ${rank.score}\n`;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            isNew ? null : rank_embed.setColor("RED").setFooter("10分以上前のデータです。");
            rank_embed.setDescription(desc).setTimestamp();
            this.client.channels.fetch("786953511182401566").then(c => c.send({ embeds: [rank_embed] }));
        });
    }
}
module.exports = RankPoster;
