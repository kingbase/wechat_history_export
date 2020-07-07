var content_div = document.getElementById('content_div');
console.log(content_div.innerText);

chrome.tabs.query(
    {
        'active': true, 
        'windowId': chrome.windows.WINDOW_ID_CURRENT
    },
    function(tabs) {
        var url = tabs[0].url;
        console.log(url);
        if (is_opened_by_desktop(url)) {
            content_div.innerHTML = "点击后将进行页面切换，然后请耐心等待......";
            var redirect_url = get_profile_url(url)
            // Todo: 更好的打开新窗口的方法
            content_div.innerHTML += `<br>\n<a href=${redirect_url} onclick="window.open('${redirect_url}')">Click Here</a>`
            // chrome.runtime.sendMessage({redirect: redirect_url})
        } else {
            content_div.innerText = "请先设置微信桌面程序为“使用系统默认浏览器打开网页”，然后使用微信桌面程序打开链接，方可生效。";
        }
    }
);
