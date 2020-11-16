import './options.css';
const { version } = require('../../package.json');
import { getValInExtension, setValInExtension, renderStoreData } from '../components/_root'

// Page Store Data
export const store = {
  keys: {
    settings: "ex_001_settings_data"
  },
  // Application Settings
  settings: {
    multiCopy: false,
    multiCopyTranspose: false,
    multiCopySplitVal: ",",
  },
};

// Page HTML Elements
export const el = {
  appVersion: document.getElementById("app_version"), // Application Version
  currentYear: document.getElementById("current_year"), // Current Year
  // Application Settings
  settings: {
    multiCopy: document.getElementById("multiCopy"),
    multiCopyTranspose: document.getElementById("multiCopyTranspose"),
    multiCopySplitVal: document.getElementById("multiCopySplitVal"),
  },
  saveSettings: document.getElementById("save_settings"),
}

/**
 * Get Application Data in the Chrome Local Storage
 */
export async function getApplicationData() {
  var out = await getValInExtension(store.keys.settings)
  console.log("getApplicationData -> out", out)
  if (out !== "No Data Found!") {
    let merged = { ...store.settings, ...out };
    store.settings = merged;
  }
}

/**
 * Render Store Data
 */
export default function getApplicationData_Render() {
  renderStoreData(el.settings.multiCopy, store.settings.multiCopy)
  renderStoreData(el.settings.multiCopyTranspose, store.settings.multiCopyTranspose)
  renderStoreData(el.settings.multiCopySplitVal, store.settings.multiCopySplitVal)
}

/**
 * Save Application Settings Data
 */
export async function saveSettingsData() {

  // Checkbox: Multi Copy
  if (el.settings.multiCopy.checked !== undefined && el.settings.multiCopy.checked !== null) {
    store.settings.multiCopy = el.settings.multiCopy.checked
  }

  // Checkbox: Multiple Data in the Transpose Format
  if (el.settings.multiCopyTranspose.checked !== undefined && el.settings.multiCopyTranspose.checked !== null) {
    store.settings.multiCopyTranspose = el.settings.multiCopyTranspose.checked
  }

  // Multi Split Value
  store.settings.multiCopySplitVal = el.settings.multiCopySplitVal.value

  /**
   * Store Action Data in Local Storage
   */
  await setValInExtension(store.keys.settings, store.settings)
  alert("Data Successfully Saved.");
}

(async () => {

  // Get Script
  await getApplicationData()
  // Render Script Data
  getApplicationData_Render()

  // Get Full Year
  el.currentYear.innerText = new Date().getFullYear()
  // Get Application Version Name
  el.appVersion.innerText = "V." + version

  // Add Click Event 
  el.saveSettings.addEventListener("click", saveSettingsData);

})();