try {
    console_bp = chrome.extension.getBackgroundPage().console;
} catch (error) {
    console_bp = null;
}


LEVEL_DEBUG = 0;
LEVEL_INFO = 1;
LEVEL_WARN = 2;
LEVEL_ERROR = 3;
function log(msg) {
    if (console_bp !== null) {
        console_bp.log(msg);
    }    
}
