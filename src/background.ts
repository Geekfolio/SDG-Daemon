import audit from "./audit";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log("Daemon installed for the first time.");
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    console.log("Daemon updated to a new version.");
  }
});

chrome.runtime.onMessage.addListener((request, sender, _sendResponse) => {
  if (request.action === "auditRegistration") {
    const sourceTabId = sender.tab?.id;

    chrome.tabs.create({ url: request.url }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          chrome.scripting
            .executeScript({
              target: { tabId: tabId },
              func: audit,
            })
            .then((results) => {
              const auditResult = results[0];
              if (!tabId) return;
              chrome.tabs.remove(tabId).then(() => {
                if (sourceTabId) {
                  chrome.tabs.update(sourceTabId, { active: true }).then(() => {
                    chrome.tabs.sendMessage(sourceTabId, {
                      action: "auditResult",
                      data: auditResult,
                    });
                  });
                }
              });
            });
        }
      });
    });
  }
  return true;
});
