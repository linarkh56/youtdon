import {describe,expect,it} from 'vitest';
import {defaultPlayerWindowSettings,normalizePlayerWindowSettings} from './player-window-settings.js';

describe('player window settings',()=>{
  it('accepts bounded dimensions and always-on-top',()=>expect(normalizePlayerWindowSettings({width:1280,height:720,alwaysOnTop:true})).toEqual({width:1280,height:720,alwaysOnTop:true}));
  it('falls back for unsafe dimensions',()=>expect(normalizePlayerWindowSettings({width:1,height:99999,alwaysOnTop:'yes'})).toEqual(defaultPlayerWindowSettings));
});
