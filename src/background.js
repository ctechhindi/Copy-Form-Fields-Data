
// Chrome Context Menu Options
chrome.contextMenus.create({ id: "cthEx1_copyFieldName", title: "Copy Field Name", contexts: ["all"] });
chrome.contextMenus.create({ id: "cthEx1_copyFieldID", title: "Copy Field ID", contexts: ["all"] });
chrome.contextMenus.create({ id: "cthEx1_copyFieldAddress", title: "Copy Field Address", contexts: ["all"] });
chrome.contextMenus.create({ id: "cthEx1_separator2", type: "separator", contexts: ["all"] });
chrome.contextMenus.create({ id: "cthEx1_openOptionsPage", title: "Options Page", contexts: ["all"] });
chrome.contextMenus.onClicked.addListener((option, tab) => {

  if (option.menuItemId === "cthEx1_copyFieldName") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldName" });

  } else if (option.menuItemId === "cthEx1_copyFieldID") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldID" });

  } else if (option.menuItemId === "cthEx1_copyFieldAddress") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldAddress" });
    
  } else if (option.menuItemId === "cthEx1_openOptionsPage") {
    // chrome.runtime.id
    // window.open(chrome.runtime.getURL('options.html'));
    chrome.runtime.openOptionsPage();
  }
})


/**
 * Keyboard shortcuts that trigger actions in your extension
 */
chrome.commands.onCommand.addListener(function (command, tab) {
  if (command === "cthE001_copy-focused-field-name") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldName" });
  } else if (command === "cthE001_copy-focused-field-id") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldID" });

  } else if (command === "cthE001_copy-focused-field-address") {
    chrome.tabs.sendMessage(tab.id, { target: "cthEx1_copyFieldAddress" });
  }
});