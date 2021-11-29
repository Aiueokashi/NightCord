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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
class eventNotifier {
    constructor(client) {
        this.client = client;
        this.eventModel = require("../Models/event");
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            node_cron_1.default.schedule("50 * * * * *", () => {
                this.eventCheck();
                this.checkEventStore();
            });
        });
    }
    checkEventStore() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    eventCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            let event = this.client.sekaiApi.getInEvent();
            if (!event) {
                return null;
            }
            else {
                let eventmodel = yield this.eventModel.findOne({ id: event.id });
                if (!eventmodel) {
                    eventmodel = new this.eventModel({
                        id: event.id,
                        data: event,
                    });
                    yield eventmodel.save();
                }
                return 1;
            }
        });
    }
}
module.exports = eventNotifier;
