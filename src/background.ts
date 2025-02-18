chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log("Daemon installed for the first time.");
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    console.log("Daemon updated to a new version.");
  }
});
