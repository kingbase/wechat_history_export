function getParsedQuery() {
    var queryString = window.location.search.substring(1)
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function is_opened_by_desktop() {
    // https://mp.weixin.qq.com/s?__biz=MzI3NDY3NDUxNg==&mid=2247486618&idx=1&sn=3f50e9cb7e8733b51a578cccb3792f02&chksm=eb112aa1dc66a3b7b8fe5a6f8a009cc82fc1c9ccd2c42c25c8302b027eb1fd89096426482554&mpshare=1&scene=24&srcid=07031t4r12ajKUejpUy4Ng6q&sharer_sharetime=1593770983970&sharer_shareid=581c111496045ada57e9602a8e1111af&key=46828b3a71d4b50412e89a4946288b700685f34a5d73e5142e9376338a8de033be6bd6eca666bcab6a8a2cc8858a7856cd50f937191e5aefc694f3f05b44b192c0aad67acdf2737a38e77ab7181b5597&ascene=14&uin=MjEwNzc1MTM4MA%3D%3D&devicetype=Windows+10&version=62060833&lang=zh_CN&exportkey=AYBoSNScuwsQ%2Bdb8Z2t2RqE%3D&pass_ticket=dYq0VXmVoYOnW6y9DcUIoX89rJSCJAxh4QCd7qksLKwHUDv2rdUCIiZ5mhbeZT0q
    var query = getParsedQuery()
    if ("__biz" in query && "chksm" in query && "exportkey" in query && "pass_ticket" in query) {
        return true;
    }    
    return false;
}

function redirect_to_profile() {
    if (window.location.href.includes("/profile_ext")) {
        console.log("Is in profile so no redirect is needed.")
    } else if (typeof biz !== "undefined" && is_opened_by_desktop() ) {
        console.log("Good, opened by desktop app, will redirect to profile for biz " + biz + " now.");
        url = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${biz}&scene=124&#wechat_redirect`
        window.open(url)
    } else {
        console.log("You should open from wechat desktop app.")
    }
}
redirect_to_profile()