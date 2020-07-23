console.log("Hello From contentScript.js")

function inject_js(filename) {
    // [javascript - Insert code into the page context using a content script](https://stackoverflow.com/questions/9515704/)
    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = chrome.runtime.getURL(filename);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

inject_js('js/extract.js')
inject_js('js/inject.js')