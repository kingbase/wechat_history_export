chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // [chrome.events - Google Chrome](https://developer.chrome.com/extensions/events)
          new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                hostEquals: 'mp.weixin.qq.com',
              },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
