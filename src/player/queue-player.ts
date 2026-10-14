import type {QueueEngine} from '../domain/queue.js'; import {PlaybackController} from './controller.js';
export class QueuePlayer { private timer:ReturnType<typeof setInterval>|undefined; constructor(private readonly queue:QueueEngine,private readonly playback:PlaybackController,private readonly intervalMs=250){}
  start(){if(this.timer)return;this.timer=setInterval(()=>this.tick(),this.intervalMs);this.tick();}
  stop(){if(this.timer){clearInterval(this.timer);this.timer=undefined;}}
  pause(){this.playback.pause();}
  resume(){this.playback.resume();}
  skip(reason='Пропущено модератором'){const state=this.playback.snapshot();if(!state.orderId)return;const current=this.queue.list().find(o=>o.id===state.orderId);if(current&&['playing','paused'].includes(current.status))this.queue.transition(current.id,'interrupted',reason);this.playback.stop();}
  private tick(){const state=this.playback.snapshot();if(state.status==='playing'&&state.remainingSeconds<=0){const current=this.queue.list().find(o=>o.id===state.orderId);if(current)this.queue.transition(current.id,'completed');this.playback.stop();}
    if(this.playback.snapshot().status==='idle'){const next=this.queue.list().find(o=>o.status==='queued');if(next){this.queue.transition(next.id,'playing');this.playback.start(next);}}
  }
}
