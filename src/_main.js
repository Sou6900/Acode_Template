// non class based main.js
import plugin from '../plugin.json';
import { initPlugin } from './initPlugin.js';
import './style.css';
import { getSettings, settingsList, onSettingsChange } from './settings.js';

// let __SETTINGS = null;

// __SETTINGS = getSettings();
//   if(__SETTINGS.myplugin_setting1 == true){
//     return ;
//   }

let baseUrl = '';

function destroyPlugin() {
  // cleanup logic
}

if (window.acode) {
  acode.setPluginInit(plugin.id, async (_baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    await initPlugin($page, cacheFile, cacheFileUrl);
  }, {
    list: settingsList,
    cb: onSettingsChange
  });

  acode.setPluginUnmount(plugin.id, () => destroy());
}
