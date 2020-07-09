var content_div = document.getElementById('content_div');
console.log(content_div.innerText);

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
    content_div.innerHTML += `<br>\n<a href=${url} onclick="window.open('${url}')">Click Here</a>`
}

const CONT_PAGE_FORBID = "1"
const CONT_PERMIT_WITH_EMPTY_PAGE = "2"
const CONT_SUCCESS = "10"
function cont_is_forbid() {
    const CONT_PAGE_FORBID = "1"
    const CONT_PERMIT_WITH_EMPTY_PAGE = "2"
    const CONT_SUCCESS = "10"

    function is_element_hiden_dup(ele) {
        var style = window.getComputedStyle(ele);
        return (style.display === 'none')
    }
    console.log("Hello From Content JS");
    var is_forbid = document.body.textContent.includes("请在微信客户端打开链接。")
    
    // 如果不显示元素，大概率是由于 window.appmsg_token 解析出了问题
    // 在 chromium 上会出现这个问题，但 360 极速上没事。这仅代表 20200708出现的现象，不一定普遍
    var el = document.querySelector(".weui_msg_card_list")
    var is_hiden = el === null || is_element_hiden_dup(el)
    if (is_forbid) {
        return CONT_PAGE_FORBID;
    } else if (is_hiden) {
        return CONT_PERMIT_WITH_EMPTY_PAGE;
    } else {
        return CONT_SUCCESS;
    }
}

function proceed() {
    console.log("Start to proceed.");
    chrome.tabs.executeScript(null, {file: "js/action.js"});
}

function detect_env(url) {
    console.log(url);
    if (is_article_url(url)) {
        if (is_opened_by_desktop(url)) {
            content_div.innerHTML = "点击后将进行页面切换，然后请耐心等待......";
            var to_redirect_url = get_profile_url(url)
            // Todo: 更好的打开新窗口的方法
            redirect_url(to_redirect_url)
            // chrome.runtime.sendMessage({redirect: redirect_url})
        } else {
            content_div.innerText = "请先设置微信桌面程序为“使用系统默认浏览器打开网页”，然后使用微信桌面程序打开链接，方可生效。";
        }    
    } else if (is_profile_url(url)) {
        content_div.innerHTML = "即将开始采集，请稍候......";
        chrome.tabs.executeScript({
            code: '(' + cont_is_forbid + ')' + '();'
        }, (result) => {
            if (result == CONT_PAGE_FORBID) {
                content_div.innerText += "失败了，重新来一遍，可能是过期了。";
            } else if (result == CONT_PERMIT_WITH_EMPTY_PAGE) {
                content_div.innerText += "失败了，重试一次，不好使就换浏览器。";
            } else if (result == CONT_SUCCESS) {
                content_div.innerText += "成功了，看看咋样了。";
                proceed()
            } else {
                content_div.innerText += "对 JS 不熟: " + result;
            }
            
        })
    }
}

get_cur_url(detect_env);
