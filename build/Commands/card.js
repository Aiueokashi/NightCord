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
const discord_js_1 = require("discord.js");
const Constants_1 = require("../Structures/Constants");
module.exports = class Card extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "card",
            description: "プロセカのカードを検索します。",
            options: [{
                    name: "カード名",
                    description: "カードのID",
                    type: 4,
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
            disable: true
        });
    }
    run(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const CARD_DATA = require("../Assets/cards.json");
            const Target = CARD_DATA.find(c => c.id === args.get("カード名").value);
            if (!Target) {
                return interaction.reply({ content: "そのIDにはカードが存在しません.", ephemeral: true });
            }
            if (Target.releaseAt > Date.now()) {
                return interaction.reply({ content: "まだゲーム内で公開されていないため表示できません", ephemeral: true });
            }
            const rarities = require("../Assets/cardRarities.json");
            const episodes = require("../Assets/cardEpisodes.json");
            const maxparam = this.getMaxParam(Target, rarities, episodes);
            if (Target.cardRarityType === "rarity_birthday") {
                Target.rarity = 5;
            }
            const Card_embed = new discord_js_1.MessageEmbed()
                .setThumbnail(`https://sekai-res.dnaroma.eu/file/sekai-assets/thumbnail/chara_rip/${Target.assetbundleName}_normal.webp`)
                .setTitle(`[${Constants_1.ATTR[Target.attr]}] ${Target.prefix}`)
                .addField("最大総合力", `${maxparam}`, true)
                .addField("レアリティ", Constants_1.RARELITY[Target.rarity], true);
            interaction.reply({ embeds: [Card_embed], ephemeral: true });
        });
    }
    getMaxParam(card, rarities, episodes) {
        const rarity = rarities.find((rarity) => rarity.rarity === card.rarity);
        const maxLevel = rarity.trainingMaxLevel || rarity.maxLevel;
        let maxParam = card.cardParameters
            .filter((cp) => cp.cardLevel === maxLevel)
            .reduce((sum, cp) => {
            sum += cp.power;
            return sum;
        }, 0) +
            episodes
                .filter((episode) => episode.cardId === card.id)
                .reduce((sum, episode) => {
                sum += episode.power1BonusFixed;
                sum += episode.power2BonusFixed;
                sum += episode.power3BonusFixed;
                return sum;
            }, 0);
        if (card.rarity >= 3)
            maxParam +=
                card.specialTrainingPower1BonusFixed +
                    card.specialTrainingPower2BonusFixed +
                    card.specialTrainingPower3BonusFixed;
        return maxParam;
    }
};
