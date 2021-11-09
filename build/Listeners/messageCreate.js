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
class MessageCreate {
    constructor(client) {
        this.client = client;
        this.type = "discord";
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.client;
            if (message.author.id !== process.env.OWNER) {
                return;
            }
            const [prefix, ...args] = message.content.split(/[\s]+/gm);
            if (prefix !== "e>") {
                return;
            }
            try {
                let evaled = yield eval(args.join(" "));
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled, { depth: 0 });
                if (evaled.includes(this.client.token))
                    evaled = evaled.replace(this.client.token, "gm", "*Token*");
                message.channel.send({ content: `\`\`\`js\n${evaled}\`\`\`` });
            }
            catch (error) {
                let errorDetails = error.toString();
                if (errorDetails.includes(this.client.token))
                    errorDetails = errorDetails.replace(this.client.token, "gm", "*Token*");
                message.channel.send({ content: `\`\`\`js\n${errorDetails}\`\`\`` });
            }
            finally {
                const log = ` USE OF EVAL by ${message.author.username} ( ${message.author.id} )`;
                console.log(`EVAL [${log}]`);
            }
        });
    }
}
module.exports = MessageCreate;
