import {describe,expect,it} from 'vitest';
import {startServer} from './server.js';
import {QueueEngine} from '../domain/queue.js';
import {MockAdapter} from '../integrations/adapters.js';

describe('overlay browser session',()=>{
  it('sets a cookie path that reaches the websocket endpoint',async()=>{
    const queue=new QueueEngine({kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50});
    const started=await startServer(queue,new MockAdapter(),'secret',0);
    try{
      const response=await fetch(`http://127.0.0.1:${started.port}/overlay.html`);
      expect(response.headers.get('set-cookie')).toContain('Path=/;');
    }finally{started.server.close();}
  });
});
