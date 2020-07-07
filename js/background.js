chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...
      chrome.declarativeContent.onPageChanged.addRules([
        {
          // That fires when a page's URL contains a 'g' ...
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'mp.weixin.qq.com'},
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
  
chrome.runtime.onMessage.addListener(
    function(message, callback) {
        if (message == "runContentScript"){
            chrome.tabs.executeScript({
                file: 'contentScript.js',
                code: 'document.body.style.backgroundColor="orange"'
            });
        }
    }
);
