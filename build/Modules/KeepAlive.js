"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class keepAlive {
    constructor(client) {
        this.client = client;
    }
    run() {
        http_1.default.createServer(function (req, res) {
            res.write("keep aliving!");
            res.end();
        })
            .listen(8080);
    }
}
module.exports = keepAlive;
