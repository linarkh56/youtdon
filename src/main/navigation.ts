export function isAllowedNavigation(url:string,origin:string):boolean{
  try{return new URL(url).origin===new URL(origin).origin;}catch{return false;}
}
