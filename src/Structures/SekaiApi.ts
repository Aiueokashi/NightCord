import { EventEmitter } from 'events';


export class SekaiApi extends EventEmitter{
  client: any;
  constructor() {
    super();
  }
  
  public getLastEvent(){
    const eventAsset = require("../Assets/events.json");
    let event = eventAsset.find(e => Date.now() < e.aggregateAt && Date.now() > e.startAt);
    if(!event){
      event = Object.entries(eventAsset);
    }else{
      return event;
    }
  }

  public async setup(client){
    this.client = client;
    this.emit("api_setup");
    
  }
}