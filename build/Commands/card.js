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
const Command_1 = require("../Structures/Command");
const Constants_1 = require("../Structures/Constants");
module.exports = class Card extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "card",
            description: "プロセカのカードを検索します。",
            options: [{
                    name: "カード名",
                    description: "カードの名前に含まれる文字列かキャラクター名",
                    type: 3,
                    required: true
                }, {
                    name: "表示",
                    description: "他の人に表示するか(デフォルトは非表示)",
                    type: 4,
                    required: false,
                    choices: [{
                            name: "はい",
                            value: 1
                        }, {
                            name: "いいえ",
                            value: 0
                        }]
                }],
            disable: false
        });
    }
    run(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Constants_1.ATTR);
            console.log(Constants_1.RARITY_POWER);
        });
    }
};
