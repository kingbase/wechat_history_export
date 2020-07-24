var content_div = document.getElementById('content_div');

function get_cur_url(callback) {
    chrome.tabs.query(
        {
            'active': true, 
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function(tabs) {
            var url = tabs[0].url;
            callback(url)
        }
    );    
}

function redirect_url(url) {
    // chrome.tabs.executeScript(null, {code: `location.replace('${url}')`});  // 没有历史-后退按钮
    chrome.tabs.executeScript(null, {code: `window.location.href = '${url}'`});
}

const CONT_PAGE_FORBID = "1";
const CONT_PERMIT_WITH_EMPTY_PAGE = "2";
const CONT_SUCCESS = "10";
function cont_is_forbid() {
    const CONT_PAGE_FORBID = "1";
    const CONT_PERMIT_WITH_EMPTY_PAGE = "2";
    const CONT_SUCCESS = "10";

    function is_element_hiden_dup(ele) {
        var style = window.getComputedStyle(ele);
        return (style.display === 'none');
    }
    log("Hello From Content JS");
    var is_forbid = document.body.textContent.includes("请在微信客户端打开链接。");
    
    // 如果不显示元素，大概率是由于 window.appmsg_token 解析出了问题
    // 在 chromium 上会出现这个问题，但 360 极速上没事。这仅代表 20200708出现的现象，不一定普遍
    var el = document.querySelector(".weui_msg_card_list");
    var is_hiden = el === null || is_element_hiden_dup(el);
    if (is_forbid) {
        return CONT_PAGE_FORBID;
    } else if (is_hiden) {
        return CONT_PERMIT_WITH_EMPTY_PAGE;
    } else {
        return CONT_SUCCESS;
    }
}

function proceed() {
    log("Start to proceed in Content JS.");
    chrome.tabs.executeScript(null, {file: "js/action.js"});
}

// 应为同步方式调用，即接收方函数的返回值不应为 true
function sendMessage(msg) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
            log("sendMessage@popup")
            log(response)
            resp = response;
        });
    });
}

function detect_env(url) {
    log("func detect_env start: " + url);
    if (is_article_url(url)) {
        log("detect result: is article.");
        if (is_opened_by_desktop(url)) {
            log("detect result: is opened by desktop.");
            content_div.innerHTML = "点击后将进行页面切换，然后请耐心等待......";
            var to_redirect_url = get_profile_url(url);
            // Todo: 更好的打开新窗口的方法
            redirect_url(to_redirect_url);
            // chrome.runtime.sendMessage({redirect: redirect_url});
        } else {
            log("detect result: not opened by desktop.");
            content_div.innerText = "请先设置微信桌面程序为“使用系统默认浏览器打开网页”，然后使用微信桌面程序打开链接，方可生效。";
        }    
    } else if (is_profile_url(url)) {
        log("detect result: is profile url.");
        content_div.innerHTML = "即将开始采集，请稍候......";
        var resp = sendMessage("func:cont_is_forbid");
        log("Resp: " + resp);
        // chrome.tabs.executeScript({
        //     code: '(' + cont_is_forbid + ')' + '();'
        // }, (result) => {
        //     if (result == CONT_PAGE_FORBID) {
        //         log("execute callback: forbid.");
        //         content_div.innerText += "失败了，重新来一遍，可能是过期了。";
        //     } else if (result == CONT_PERMIT_WITH_EMPTY_PAGE) {
        //         log("execute callback: permimt with empty page.");
        //         content_div.innerText += "失败了，重试一次，不好使就换浏览器。";
        //     } else if (result == CONT_SUCCESS) {
        //         log("execute callback: good!");
        //         content_div.innerText += "成功了，看看咋样了。";
        //         // proceed();
        //     } else {
        //         log("execute callback: unknown status.");
        //         content_div.innerText += "对 JS 不熟: " + result;
        //     }
        // })
    }
}

get_cur_url(detect_env);
