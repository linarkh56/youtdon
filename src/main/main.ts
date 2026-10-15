import {app,BrowserWindow,ipcMain} from 'electron';
import {randomBytes} from 'node:crypto';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {Store} from '../persistence/database.js';
import {QueueEngine} from '../domain/queue.js';
import {MockAdapter} from '../integrations/adapters.js';
import {startServer} from '../server/server.js';
import {PlaybackController} from '../player/controller.js';
import {QueuePlayer} from '../player/queue-player.js';
import {Logger} from '../observability/logger.js';
import {isAllowedNavigation} from './navigation.js';
import {defaultPlayerWindowSettings,normalizePlayerWindowSettings,type PlayerWindowSettings} from './player-window-settings.js';

let server:import('node:http').Server|undefined;
let queuePlayer:QueuePlayer|undefined;
let store:Store|undefined;
let playerWindow:BrowserWindow|undefined;
let playerWindowSettings:PlayerWindowSettings=defaultPlayerWindowSettings;
let playerWindowSettingsPath='';
function lockNavigation(window:BrowserWindow,origin:string){window.webContents.on('will-navigate',(event,url)=>{if(!isAllowedNavigation(url,origin))event.preventDefault()});window.webContents.on('will-redirect',(event,url)=>{if(!isAllowedNavigation(url,origin))event.preventDefault()});window.webContents.setWindowOpenHandler(()=>({action:'deny'}));}

async function boot(){
  const dir=app.getPath('userData');
  mkdirSync(dir,{recursive:true});
  playerWindowSettingsPath=join(dir,'player-window.json');
  if(existsSync(playerWindowSettingsPath)){
    try{playerWindowSettings=normalizePlayerWindowSettings(JSON.parse(readFileSync(playerWindowSettingsPath,'utf8')))}catch{playerWindowSettings=defaultPlayerWindowSettings;}
  }
  store=await Store.open(join(dir,'youtdon.sqlite'),join(app.getAppPath(),'node_modules','sql.js','dist','sql-wasm.wasm'));
  const defaults={kopecksPerMinute:10000,minKopecks:1000,maxSeconds:600,maxKopecks:100000,maxQueueSeconds:3600,maxQueueItems:50};
  const logger=new Logger(join(dir,'youtdon.log')); logger.info('Application boot');
  const queue=new QueueEngine(store.loadPricing(defaults),o=>store?.save(o),store.list(),p=>store?.savePricing(p));
  const playback=new PlaybackController();
  queuePlayer=new QueuePlayer(queue,playback); queuePlayer.start();
  const mock=new MockAdapter(); await mock.connect();
  const token=randomBytes(32).toString('hex'); ipcMain.handle('youtdon-token',()=>token);
  const started=await startServer(queue,mock,token,0,join(app.getAppPath(),'src','renderer'),playback,store,queuePlayer,logger,{
    get:()=>playerWindowSettings,
    set:(value:PlayerWindowSettings)=>{playerWindowSettings=normalizePlayerWindowSettings(value);writeFileSync(playerWindowSettingsPath,JSON.stringify(playerWindowSettings,null,2));if(playerWindow){playerWindow.setBounds({width:playerWindowSettings.width,height:playerWindowSettings.height});playerWindow.setAlwaysOnTop(playerWindowSettings.alwaysOnTop);}return playerWindowSettings;}
  }); server=started.server;
  const prefs={preload:join(app.getAppPath(),'dist','preload','preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:true};
  const origin=`http://127.0.0.1:${started.port}`;
  const main=new BrowserWindow({width:1200,height:800,webPreferences:prefs}); lockNavigation(main,origin); await main.loadURL(`${origin}/index.html`);
  playerWindow=new BrowserWindow({width:playerWindowSettings.width,height:playerWindowSettings.height,show:true,resizable:true,minWidth:640,minHeight:360,webPreferences:prefs}); playerWindow.setAlwaysOnTop(playerWindowSettings.alwaysOnTop); lockNavigation(playerWindow,origin); await playerWindow.loadURL(`${origin}/player.html`);
}
app.whenReady().then(boot).catch(e=>{console.error(e);app.quit();});
app.on('window-all-closed',()=>{queuePlayer?.stop();server?.close();store?.close();if(process.platform!=='darwin')app.quit();});
