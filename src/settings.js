
import plugin from '../plugin.json';
const appSettings = acode.require('settings');

// Default setting values
const defaultSettings = {
  mysetting_01 : false,
  mysetting_02 : 'Texts',
  mysetting_03 : 'val1'
};

// Get or initialize plugin settings
function getSettings() {
  let pluginSettings = appSettings.value[plugin.id];

  // Initialize if missing
  if (!pluginSettings) {
    pluginSettings = { ...defaultSettings };
    appSettings.value[plugin.id] = pluginSettings;
    appSettings.update();
    return pluginSettings;
  }

  // Sync keys if defaultSettings changed
  let changed = false;

  // Add missing keys
  for (const key in defaultSettings) {
    if (!(key in pluginSettings)) {
      pluginSettings[key] = defaultSettings[key];
      changed = true;
    }
  }

  // Remove unknown/obsolete keys
  for (const key in pluginSettings) {
    if (!(key in defaultSettings)) {
      delete pluginSettings[key];
      changed = true;
    }
  }

  if (changed) appSettings.update();

  return pluginSettings;
}


// Settings list for the Acode plugin UI
const settingsList = [
  // checkbox ==========>
  {
    key: 'mysetting_01',
    text: 'Disable Plugin',  
    checkbox: getSettings().mysetting_01,
    value: getSettings().mysetting_01,
    info: 'If enabled, the plugin will be completely disabled.'
  },
  // text placeholder ==========>
{
    key: 'mysetting_02',
    text: 'Text placeholder',
    value: getSettings().mysetting_02 ,
    prompt: 'Enter Prompt',
    promptType: 'text',
    info: 'Enter Info'
  },
    // input option ==========>
    {
    key: 'mysetting_03',
    text: 'Input Option',
    value: getSettings().mysetting_03 ,
    select: [[ "val1", "option 1 [Recommended]"], ["val2" , "option 2"] , ["val3", "option 3"] ],
    info: "Choose Option"
  },
];

// Called when a setting changes
function onSettingsChange(key, value) {
  const parsed = value; // checkbox or select
  const settings = getSettings();
  settings[key] = parsed;
  appSettings.update();
}

export {
  getSettings,
  settingsList,
  onSettingsChange
};
