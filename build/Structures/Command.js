"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(client, opt) {
        this.name = opt.name;
        this.description = opt.description;
        this.client = client;
        this.disable = opt.disable;
        this.options = opt.options;
    }
}
exports.Command = Command;
