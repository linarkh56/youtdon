import type {Order} from '../domain/types.js';
export type PlaybackState={orderId:string|null;videoId:string|null;status:'idle'|'playing'|'paused'|'error';remainingSeconds:number;error?:string};
export class PlaybackController { private state:PlaybackState={orderId:null,videoId:null,status:'idle',remainingSeconds:0}; private startedAt=0; private pausedAt=0;
  start(order:Order){this.state={orderId:order.id,videoId:order.videoId,status:'playing',remainingSeconds:order.seconds};this.startedAt=Date.now();this.pausedAt=0;}
  pause(){if(this.state.status!=='playing')return;this.state.remainingSeconds=this.remaining();this.state.status='paused';this.pausedAt=Date.now();}
  resume(){if(this.state.status!=='paused')return;this.startedAt=Date.now();this.pausedAt=0;this.state.status='playing';}
  stop(error?:string){this.state={...this.state,status:error?'error':'idle',remainingSeconds:error?this.remaining():0,error};this.startedAt=0;}
  snapshot():PlaybackState{if(this.state.status==='playing')return {...this.state,remainingSeconds:this.remaining()};return {...this.state};}
  private remaining(){return Math.max(0,this.state.remainingSeconds-(Date.now()-this.startedAt)/1000);}
}
