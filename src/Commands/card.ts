import { Command } from '../Structures/Command';
import { CommandInteraction } from 'discord.js';
import { ATTR, RARITY_POWER } from '../Structures/Constants';

//@ts-ignore
module.exports = class Card extends Command{
  constructor(client:any){
    super(client,{
      name:"card",
      description:"プロセカのカードを検索します。",
      options:[{
        name:"カード名",
        description:"カードの名前に含まれる文字列かキャラクター名",
        type:3,
        required:true
      },{
        name:"表示",
        description:"他の人に表示するか(デフォルトは非表示)",
        type:4,
        required:false,
        choices:[{
          name:"はい",
          value:1
        },{
          name:"いいえ",
          value:0
        }]
      }],
      disable:false
    })
  }
  //@ts-ignore
  public async run(interaction:CommandInteraction, args:any){
    console.log(ATTR)
    console.log(RARITY_POWER)
  }
}