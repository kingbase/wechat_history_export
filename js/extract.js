function load_external_script_(url) {
    // not work in chrome console at mp.weixin.qq.com
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function load_external_script(url) {
    fetch(url)
        .then(response => response.text())
        .then(text => eval(text))
}

function getSingleElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementsByXpath(xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
}

function dump(v) {
    for (const e in v) {
        console.log(v[e].innerText)
    }
}

function extract_item(card) {
    var pub_date = card.querySelector(".weui_msg_card_hd").innerText;
    if (card.querySelector(".weui_msg_card_bd") !== null) {
        var card_type = "图文";
        var dom_title = card.querySelector(".weui_media_title");
        var href = dom_title.getAttribute("hrefs");
        var title = dom_title.innerText;
        console.log(`${pub_date}: [${title}] - ${href}`);
    } else {
        console.log(`${pub_date}: Error - ${card}`);
    }
}

// es = getElementsByXpath("//div[@class='weui_msg_card js_card']")
// for (var index in es) {
//     card = es[index]
//     var extracted_info = extract_item(card)
// }

