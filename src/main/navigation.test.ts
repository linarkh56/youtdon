import {describe,expect,it} from 'vitest';
import {isAllowedNavigation} from './navigation.js';

describe('navigation origin policy',()=>{
  const origin='http://127.0.0.1:4321';
  it('allows paths on the backend origin',()=>expect(isAllowedNavigation(`${origin}/player.html`,origin)).toBe(true));
  it('rejects another loopback port',()=>expect(isAllowedNavigation('http://127.0.0.1:4322/index.html',origin)).toBe(false));
  it('rejects external hosts',()=>expect(isAllowedNavigation('https://example.com',origin)).toBe(false));
  it('rejects malformed URLs',()=>expect(isAllowedNavigation('not a url',origin)).toBe(false));
});
