console.log("Xhelios Daemon Content Script Intitialized");

interface EventData {
  url: string;
  type: string;
}

window.addEventListener("message", function (event: MessageEvent<EventData>) {
  if (event.data.type === "AUDIT_REQUEST") {
    chrome.runtime.sendMessage({
      action: "auditRequest",
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
