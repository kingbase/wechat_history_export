console = chrome.extension.getBackgroundPage().console;

LEVEL_DEBUG = 0;
LEVEL_INFO = 1;
LEVEL_WARN = 2;
LEVEL_ERROR = 3;
function log(msg, level=LEVEL_DEBUG) {
    console.log(msg);
}
