console.log("Xhelios Daemon Content Script Intitialized");

window.addEventListener("message", function (event) {
  if (event.data.type === "AUDIT_REGISTRATION") {
    chrome.runtime.sendMessage({
      action: "auditRegistration",
      url: event.data.url.trim(),
    });
  }
});

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.action === "auditResult") {
    window.postMessage(
      {
        type: "AUDIT_RESULT",
        data: request.data,
      },
      "*",
    );
  }
});
