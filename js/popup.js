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
    }
}

get_cur_url(detect_env);
