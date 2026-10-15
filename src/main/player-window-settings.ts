export type PlayerWindowSettings={width:number;height:number;alwaysOnTop:boolean};
export const defaultPlayerWindowSettings:PlayerWindowSettings={width:960,height:540,alwaysOnTop:false};
export function normalizePlayerWindowSettings(value:unknown):PlayerWindowSettings{
  const input=(value&&typeof value==='object'?value:{}) as Record<string,unknown>;
  const width=Number(input.width),height=Number(input.height);
  return {
    width:Number.isInteger(width)&&width>=640&&width<=3840?width:defaultPlayerWindowSettings.width,
    height:Number.isInteger(height)&&height>=360&&height<=2160?height:defaultPlayerWindowSettings.height,
    alwaysOnTop:input.alwaysOnTop===true
  };
}
