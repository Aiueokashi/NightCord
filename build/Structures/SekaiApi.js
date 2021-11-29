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
exports.SekaiApi = void 0;
const events_1 = require("events");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class SekaiApi extends events_1.EventEmitter {
    constructor() {
        super();
    }
    getInEvent() {
        const eventAsset = require("../Assets/events.json");
        let event = eventAsset.find(e => Date.now() < e.aggregateAt && Date.now() > e.startAt);
        if (!event) {
            return null;
        }
        else {
            return event;
        }
    }
    getLastEvent() {
        const eventAsset = require("../Assets/events.json");
        let event = eventAsset.find(e => Date.now() < e.aggregateAt && Date.now() > e.startAt);
        if (!event) {
            event = Object.entries(eventAsset);
        }
        else {
            return event;
        }
    }
    setup(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = client;
            this.emit("api_init");
            yield this.loadAssets();
            this.emit("api_setup");
        });
    }
    loadAssets() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const assetURL = "https://api.github.com/repos/Sekai-World/sekai-master-db-diff/contents";
            const res = yield axios_1.default.get(assetURL);
            const data = res.data.filter(r => r.name.endsWith("json"));
            try {
                for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = yield data_1.next(), !data_1_1.done;) {
                    const d = data_1_1.value;
                    const raw = yield axios_1.default.get(d.download_url);
                    fs_1.default.writeFileSync(`${__dirname}/../Assets/${d.name}`, JSON.stringify(raw.data));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) yield _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        });
    }
}
exports.SekaiApi = SekaiApi;
