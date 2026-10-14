import {contextBridge,ipcRenderer} from 'electron'; contextBridge.exposeInMainWorld('youtdon',{token:()=>ipcRenderer.invoke('youtdon-token')});
