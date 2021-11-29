"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
});
module.exports = mongoose_1.default.model("Event", eventSchema);
