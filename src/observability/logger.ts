import {appendFileSync,existsSync,readFileSync,writeFileSync} from 'node:fs';
export type LogLevel='info'|'warn'|'error';
export type LogEntry={timestamp:string;level:LogLevel;message:string};
export class Logger{
  private entries:LogEntry[]=[];
  constructor(private readonly path?:string){if(path&&existsSync(path)){try{this.entries=readFileSync(path,'utf8').trim().split('\n').filter(Boolean).slice(-200).map(line=>JSON.parse(line) as LogEntry)}catch{this.entries=[]}}}
  write(level:LogLevel,message:string){const entry={timestamp:new Date().toISOString(),level,message:message.replace(/[\r\n]/g,' ').slice(0,500)};this.entries=[...this.entries,entry].slice(-200);if(this.path){appendFileSync(this.path,JSON.stringify(entry)+'\n');if(this.entries.length===200)writeFileSync(this.path,this.entries.map(item=>JSON.stringify(item)).join('\n')+'\n')}return entry}
  info(message:string){return this.write('info',message)} warn(message:string){return this.write('warn',message)} error(message:string){return this.write('error',message)} list(){return this.entries.map(entry=>({...entry}))}
}
