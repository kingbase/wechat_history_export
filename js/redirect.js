function getParsedQuery(url) {
    console.log("URL: " + url)
    var query = {};
    var queryStrings = url.split("?", 2)
    if (queryStrings.length !== 2) {
        return query
    }
    var queryString = queryStrings[1];
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function is_article_url(url) {
    // https://mp.weixin.qq.com/s/k0VzLgZbHAqfLbxQj7Ma6Q
    article_url_pattern1 = "https://mp.weixin.qq.com/s/"
    // https://mp.weixin.qq.com/s?__biz=MzIxNjM3MDc4Mg==&mid=2247490150&idx=1&sn=b48743cbbd9941b66ae39843a0e765bd&chksm=978b4157a0fcc8416493d44b161ce677e730b713d23ee86af8602ad561ce5ddfd7110f661375&mpshare=1&scene=24&srcid=0701IBiXMBCz0gmb9KohFWWg&sharer_sharetime=1593780737948&sharer_shareid=581c111496045ada57e9602a8e1111af&key=835f76b9f6281b4864d7cda49b9550f52ed87c97a81a0e0e7c21fd3038da653e5d05cdb5513240d56a9ee5ab02751b6f87935b2ee4b30d155b7bc2592052a2ca963805ff4ffa54683687b0e9d434d9c3&ascene=14&uin=MjEwNzc1MTM4MA%3D%3D&devicetype=Windows+10&version=62060833&lang=zh_CN&exportkey=AahS3q6%2BRYUct8oiYwpz7tM%3D&pass_ticket=dzO7jcymWai1yIkubFW5dxZu7s1Gfa%2Fyz%2FAQQDJ6B%2F8JFgWtx2wMTz0j6M%2BdTQWk
    article_url_pattern2 = "https://mp.weixin.qq.com/s?"
    if (url.startsWith(article_url_pattern1) || url.startsWith(article_url_pattern2)) {
        return true;
    }
    return false;
}

function is_profile_url(url) {
    // https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxNjM3MDc4Mg==&scene=124&#wechat_redirect
    profile_url_pattern = "https://mp.weixin.qq.com/mp/profile_ext?"
    if (url.startsWith(profile_url_pattern)) {
        return true;
    }
    return false;
}

function is_opened_by_desktop(url) {
    // https://mp.weixin.qq.com/s?__biz=MzI3NDY3NDUxNg==&mid=2247486618&idx=1&sn=3f50e9cb7e8733b51a578cccb3792f02&chksm=eb112aa1dc66a3b7b8fe5a6f8a009cc82fc1c9ccd2c42c25c8302b027eb1fd89096426482554&mpshare=1&scene=24&srcid=07031t4r12ajKUejpUy4Ng6q&sharer_sharetime=1593770983970&sharer_shareid=581c111496045ada57e9602a8e1111af&key=46828b3a71d4b50412e89a4946288b700685f34a5d73e5142e9376338a8de033be6bd6eca666bcab6a8a2cc8858a7856cd50f937191e5aefc694f3f05b44b192c0aad67acdf2737a38e77ab7181b5597&ascene=14&uin=MjEwNzc1MTM4MA%3D%3D&devicetype=Windows+10&version=62060833&lang=zh_CN&exportkey=AYBoSNScuwsQ%2Bdb8Z2t2RqE%3D&pass_ticket=dYq0VXmVoYOnW6y9DcUIoX89rJSCJAxh4QCd7qksLKwHUDv2rdUCIiZ5mhbeZT0q
    var query = getParsedQuery(url)
    if ("__biz" in query && "chksm" in query && "exportkey" in query && "pass_ticket" in query) {
        return true;
    }
    return false;
}

function get_profile_url(url) {
    var query = getParsedQuery(url)
    var biz = query["__biz"]
    url = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${biz}&scene=124&#wechat_redirect`
    return url
}

// local console (not work for extensions)
function redirect_to_profile() {
    var url = window.location.href
    if (url.includes("/profile_ext")) {
        console.log("Is in profile so no redirect is needed.")
    } else if (typeof biz !== "undefined" && is_opened_by_desktop() ) {
        console.log("Good, opened by desktop app, will redirect to profile for biz " + biz + " now.");
        url = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${biz}&scene=124&#wechat_redirect`
        window.open(url)
    } else {
        console.log("You should open from wechat desktop app.")
    }
}
// redirect_to_profile()
