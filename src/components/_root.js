/**
 * Root Variables
 * 
 * @author Jeevan Lal
*/

/**
 * [Promise]: Get Extension Data
 * @param {string} key
 */
export function getValInExtension(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (budget) {
      if (budget[key] != undefined && budget[key] !== "") {
        resolve(budget[key]);
      } else {
        resolve("No Data Found!");
      }
    });
  });
}

/**
 * [Promise]: Set Data in the Extension Local Storage
 * @param {string} key
 * @param {*} key
 */
export function setValInExtension(key, value) {
  return new Promise((resolve, reject) => {
    try {
      var obj = {};
      obj[key] = value;
      chrome.storage.local.set(obj, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve("Data Saved Successfully.");
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Run Events
 * @param {*} elm 
 * @param {array} events 
 */
export function runEvents(elm, events = ["change"]) {
  for (const event of events) {
    var eventObj = document.createEvent("HTMLEvents");
    eventObj.initEvent(event, true, true);
    eventObj.eventName = event;
    elm.dispatchEvent(eventObj)
  }
}

/**
 * Render HTML Fields Data all Fields Types
 * @param {*} fieldElm 
 * @param {*} fieldValue 
 */
export function renderStoreData(fieldElm, fieldValue) {
  if (!fieldElm) { return false }

  // Field Tag Name
  var fieldTagName = fieldElm.tagName.toLocaleLowerCase()

  // Input-Checkbox
  if (fieldTagName === "input" && fieldElm.type === "checkbox") {
    fieldElm.checked = fieldValue
    runEvents(fieldElm, ["change"])
  }

  // Input-["text", "email", "date"]
  else if (fieldTagName === "input" && ["text", "email", "date"].indexOf(fieldElm.type) !== -1) {
    fieldElm.value = fieldValue
    runEvents(fieldElm, ["change"])
  }
}