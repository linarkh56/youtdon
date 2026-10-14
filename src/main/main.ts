import {app,BrowserWindow,ipcMain} from 'electron';
import {randomBytes} from 'node:crypto';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {Store} from '../persistence/database.js';
import {QueueEngine} from '../domain/queue.js';
import {MockAdapter} from '../integrations/adapters.js';
import {startServer} from '../server/server.js';
import {PlaybackController} from '../player/controller.js';
import {QueuePlayer} from '../player/queue-player.js';
import {Logger} from '../observability/logger.js';

let server:import('node:http').Server|undefined;
let queuePlayer:QueuePlayer|undefined;
let store:Store|undefined;
function lockNavigation(window:BrowserWindow){window.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('http://127.0.0.1:'))event.preventDefault()});window.webContents.on('will-redirect',(event,url)=>{if(!url.startsWith('http://127.0.0.1:'))event.preventDefault()});window.webContents.setWindowOpenHandler(()=>({action:'deny'}));}

async function boot(){
  const dir=app.getPath('userData');
  mkdirSync(dir,{recursive:true});
  store=await Store.open(join(dir,'youtdon.sqlite'),join(app.getAppPath(),'node_modules','sql.js','dist','sql-wasm.wasm'));
  const defaults={kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50};
  const logger=new Logger(join(dir,'youtdon.log')); logger.info('Application boot');
  const queue=new QueueEngine(store.loadPricing(defaults),o=>store?.save(o),store.list(),p=>store?.savePricing(p));
  const playback=new PlaybackController();
  queuePlayer=new QueuePlayer(queue,playback); queuePlayer.start();
  const mock=new MockAdapter(); await mock.connect();
  const token=randomBytes(32).toString('hex'); ipcMain.handle('youtdon-token',()=>token);
  const started=await startServer(queue,mock,token,0,join(app.getAppPath(),'src','renderer'),playback,store,queuePlayer,logger); server=started.server;
  const prefs={preload:join(app.getAppPath(),'dist','preload','preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:true};
  const main=new BrowserWindow({width:1200,height:800,webPreferences:prefs}); lockNavigation(main); await main.loadURL(`http://127.0.0.1:${started.port}/index.html`);
  const player=new BrowserWindow({width:960,height:540,show:true,webPreferences:prefs}); lockNavigation(player); await player.loadURL(`http://127.0.0.1:${started.port}/player.html`);
}
app.whenReady().then(boot).catch(e=>{console.error(e);app.quit();});
app.on('window-all-closed',()=>{queuePlayer?.stop();server?.close();store?.close();if(process.platform!=='darwin')app.quit();});
