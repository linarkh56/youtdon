import {describe,expect,it} from 'vitest';
import {startServer} from './server.js';
import {QueueEngine} from '../domain/queue.js';
import {MockAdapter} from '../integrations/adapters.js';
import {defaultPlayerWindowSettings,normalizePlayerWindowSettings,type PlayerWindowSettings} from '../main/player-window-settings.js';

describe('player window settings API',()=>{
  it('protects and persists bounded window settings',async()=>{
    let settings:PlayerWindowSettings=defaultPlayerWindowSettings;
    const queue=new QueueEngine({kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50});
    const started=await startServer(queue,new MockAdapter(),'secret',0,undefined,undefined,undefined,undefined,undefined,{get:()=>settings,set:value=>settings=normalizePlayerWindowSettings(value)});
    try{
      let response=await fetch(`http://127.0.0.1:${started.port}/api/player-window`);
      expect(response.status).toBe(401);
      response=await fetch(`http://127.0.0.1:${started.port}/api/player-window`,{method:'POST',headers:{'content-type':'application/json','x-youtdon-token':'secret'},body:JSON.stringify({width:1280,height:720,alwaysOnTop:true})});
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({width:1280,height:720,alwaysOnTop:true});
      response=await fetch(`http://127.0.0.1:${started.port}/api/player-window`,{method:'POST',headers:{'content-type':'application/json','x-youtdon-token':'secret'},body:JSON.stringify({width:1,height:1,alwaysOnTop:false})});
      expect(await response.json()).toEqual(defaultPlayerWindowSettings);
    }finally{started.server.close();}
  });
});
