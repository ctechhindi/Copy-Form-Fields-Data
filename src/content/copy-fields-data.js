import { getValInExtension } from '../components/_root'

// Current Click Element
let clickedElement;

const highlightClass = "__copy-element-selector-highlighted";

window.ex001_multiFieldName = "";
window.ex001_multiFieldID = "";
window.ex001_multiFieldAddress = "";
let settings = "";

/**
 * Copy Text to Clipboard
 * @param {*} text 
 */
function copyToClipboard(text) {
  console.log("copyToClipboard -> text", text)
  const input = document.createElement("textarea");
  input.style.position = "fixed";
  input.style.opacity = 0;
  input.style.textTransform = "inherit";
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
}

/**
 * Add CSS Class Name
 * @param {*} element 
 * @param {*} cls 
 */
function addClass(element, cls) {
  let classes = (element.className || "").split(" ");
  if (!classes.includes(cls)) {
    element.className = classes.concat([cls]).join(" ");
  }
}

/**
 * Remove CSS Class Name
 * @param {*} element 
 * @param {*} cls 
 */
function removeClass(element, cls) {
  let classes = (element.className || "").split(" ");
  if (classes.includes(cls)) {
    element.className = classes.filter(_ => _ !== cls).join(" ");
  }
}

/**
 * Highlight HTML Element
 * @param {*} element 
 */
function highlight(element, isRemoveCSS = true) {
  if (!element) {
    return;
  }
  addClass(element, highlightClass);
  if (isRemoveCSS === true) {
    setTimeout(() => {
      removeClass(element, highlightClass);
    }, 2000);
  }
}

// Click Mouse on the HTML Element
document.addEventListener("mousedown", (event) => {
  clickedElement = event.target;
}, true);

(async () => {
  settings = await getValInExtension("ex_001_settings_data")
  if (settings === "No Data Found!") { settings = undefined }
})();

/**
 * Catch Chrome Extension Message form `background.js`
 */
chrome.runtime.onMessage.addListener((request) => {

  /**
   * Copy and Highlight Element
   * @param {*} elm 
   * @param {string} data 
   * @param {string} oldData 
   */
  function copyHighlightData(elm, data, oldData) {
    // Copy Field Value with Multi
    if (!settings === false && settings.multiCopy !== undefined && settings.multiCopy === true) {

      // Multiple Data in the Transpose Format
      if (settings.multiCopyTranspose !== undefined && settings.multiCopyTranspose === true) {
        window[oldData] += data + "\n"
      } else {
        var splitVal = ", "
        if (settings.multiCopySplitVal !== undefined) { splitVal = settings.multiCopySplitVal }
        window[oldData] += data + "" + splitVal
      }

      highlight(elm, false);
    } else {
      window[oldData] = data;
      highlight(elm);
    }

    copyToClipboard(window[oldData]);
  }

  // Fetch Field: Address
  if (request && request.target === "cthEx1_copyFieldAddress") {
    let selectorGenerator = new SelectorGenerator({ querySelectorAll: window.document.querySelectorAll.bind(window.document) });
    let selector = selectorGenerator.getSelector(clickedElement);
    copyHighlightData(clickedElement, selector, "ex001_multiFieldAddress")
  }

  // Fetch Field: Name
  else if (request && request.target === "cthEx1_copyFieldName") {
    if (!clickedElement) { return false }
    if (clickedElement.name !== undefined) {
      copyHighlightData(clickedElement, clickedElement.name, "ex001_multiFieldName")
    }
  }

  // Fetch Field: ID
  else if (request && request.target === "cthEx1_copyFieldID") {
    if (!clickedElement) { return false }
    if (clickedElement.id !== undefined) {
      copyHighlightData(clickedElement, clickedElement.id, "ex001_multiFieldID")
    }
  }
});