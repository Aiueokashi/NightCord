import cron from "node-cron";
import axios from 'axios';
import { MessageEmbed } from  'discord.js';

class RankPoster {
  client: any;
  ranks: number[];
  constructor(client){
    this.client = client;
    this.ranks = [1,2,10,50,100,500,1000,5000,10000];
  }

  public async run(){
    cron.schedule('0 * * * *', () => {
      this.post();
    });
  }

  private async post(){
    const event = this.client.getInEvent();
    if(!event){
      return null;
    }
    let rank_embed = new MessageEmbed()
    .setTitle(`${event.name} | イベントランキング`)
		.setImage(
			`https://sekai-res.dnaroma.eu/file/sekai-assets/home/banner/${event.assetbundleName}_rip/${event.assetbundleName}.webp`
		);
    let desc:string = "";
    let isNew: boolean = false;
    for await(const t of this.ranks){
      const res = await axios({
    		method: "GET",
    		baseURL: process.env.SEKAI_PUBLIC_API_BASE_URL,
    		url: "event/live",
    		params: {
    			rank: `${t}`,
        }
      });
      //new Date(res.data.timestamp)
      if(isNew){};
      //@ts-ignore
      const rank = res.data.data.eventRankings[0];
      desc = desc + `${t}位 : ${rank.userName} | ポイント : ${rank.score}\n`;
      
    }

    rank_embed.setDescription(desc);
    this.client.channels.fetch("786953511182401566").then(c => c.send(rank_embed));
  }

}

module.exports = RankPoster;