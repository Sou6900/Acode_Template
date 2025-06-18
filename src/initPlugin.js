
import { getSettings, settingsList, onSettingsChange } from './settings.js';

let __SETTINGS = null;

export function initPlugin() {
  const editor = editorManager.editor;

 //  // setting usage 
 // __SETTINGS = getSettings();
 //  if(__SETTINGS.myplugin_settings01 == true){
 //    return ;
 //  }

  // // event example : cursor & selection change
  // editor.on("changeSelection", safeClickHandler);
  // editor.selection.on("changeCursor", safeClickHandler);
}
