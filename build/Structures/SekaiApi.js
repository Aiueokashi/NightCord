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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SekaiApi = void 0;
const events_1 = require("events");
class SekaiApi extends events_1.EventEmitter {
    constructor() {
        super();
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
            this.emit("api_setup");
        });
    }
}
exports.SekaiApi = SekaiApi;
