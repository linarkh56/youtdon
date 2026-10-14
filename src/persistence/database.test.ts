import {afterEach,describe,expect,it} from 'vitest';
import {mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {Store} from './database.js'; import {QueueEngine} from '../domain/queue.js';
import type {Order} from '../domain/types.js';

const folders:string[]=[];
const wasm=join(process.cwd(),'node_modules','sql.js','dist','sql-wasm.wasm');
const order:Order={id:'o1',provider:'mock',providerDonationId:'donation-1',amountKopecks:10000,currency:'RUB',message:'https://youtu.be/dQw4w9WgXcQ',receivedAt:'2026-01-01T00:00:00.000Z',test:true,videoId:'dQw4w9WgXcQ',seconds:60,status:'queued',createdAt:'2026-01-01T00:00:00.000Z',playbackAttempts:0};
afterEach(()=>{for(const folder of folders)rmSync(folder,{recursive:true,force:true});folders.length=0;});
describe('SQLite store',()=>{it('migrates, persists, enforces unique provider event and restores',async()=>{const folder=mkdtempSync(join(tmpdir(),'youtdon-'));folders.push(folder);const path=join(folder,'db.sqlite');const store=await Store.open(path,wasm);store.save(order);expect(store.list()).toHaveLength(1);expect(()=>store.save({...order,id:'o2'})).toThrow();store.savePricing({kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50});expect(store.loadPricing({kopecksPerMinute:1,minKopecks:1,maxSeconds:1,maxKopecks:1,maxQueueSeconds:1,maxQueueItems:1}).kopecksPerMinute).toBe(10000);const backup=store.exportBytes();store.close();const reopened=await Store.open(path,wasm);expect(reopened.list()[0].id).toBe('o1');await reopened.restore(backup);expect(reopened.list()[0].providerDonationId).toBe('donation-1');reopened.close();});it('recovers a persisted playing order after restart without replaying it',async()=>{const folder=mkdtempSync(join(tmpdir(),'youtdon-'));folders.push(folder);const path=join(folder,'db.sqlite');const store=await Store.open(path,wasm);store.save({...order,id:'playing-1',providerDonationId:'restart-1',status:'playing'});store.close();const reopened=await Store.open(path,wasm);const queue=new QueueEngine({kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50},o=>reopened.save(o),reopened.list());expect(queue.list()[0].status).toBe('interrupted');expect(reopened.list()[0].status).toBe('interrupted');reopened.close();});});
