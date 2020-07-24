function getElementsByXpath(xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
}

function extract_item(card) {
    // 重点参考 official\profile_history_v2.html.js 模板
    // 初期只考虑最简单的：文字、图片、普通图文，但CSV导出和PDF一定要加
    var pub_date = card.querySelector(".weui_msg_card_hd").innerText;
    if (card.querySelector(".weui_msg_card_bd") !== null) {
        var elements = card.getElementsByClassName("weui_media_box text js_appmsg");
        if (elements.length != 0) {
            // text
            var card_type = "文字";
            var text = elements[0].querySelector(".weui_media_bd").textContent;
            return [{"date": pub_date, "card_type":card_type, "text":text, "count":1, "id":1}];
        }
        var elements = card.getElementsByClassName("weui_media_box appmsg img js_appmsg");
        if (elements.length != 0) {
            var card_type = "图片分享页";
            var img_article_url = elements[0].getAttribute("hrefs");
            return [{"date": pub_date, "card_type":card_type, "text":img_article_url, "count":1, "id":1}];
        }
        var elements = card.getElementsByClassName("weui_media_box appmsg js_video video_msg");
        if (elements.length != 0) {
            var card_type = "视频分享页";
            var video_article_url = elements[0].getAttribute("hrefs");
            return [{"date": pub_date, "card_type":card_type, "text":video_article_url, "count":1, "id":1}];
        }
        var elements = card.getElementsByClassName("weui_media_box img js_appmsg");
        if (elements.length != 0) {
            // image
            var card_type = "图片";
            var the_div = elements[0].querySelector(".weui_media_bd");
            var the_img = the_div.getElementsByTagName("img")[0];
            var img_url = the_img.getAttribute("src");
            return [{"date": pub_date, "card_type":card_type, "text":img_url, "count":1, "id":1}];
        }
        var elements = card.getElementsByClassName("weui_media_box appmsg js_appmsg");
        if (elements.length != 0) {
            var card_type = "图文";
            var infos = [];
            var id = 0;
            for (let ele of elements) {
                var article_info = {};
                var dom_title = ele.querySelector(".weui_media_title");
                var href = dom_title.getAttribute("hrefs");
                var title = dom_title.innerText;
                var desc_text = ele.querySelector(".weui_media_desc").innerText;
                article_info = {
                    "date": pub_date, 
                    "card_type": card_type,
                    "title": title,
                    "href": href,
                    "count": elements.length,
                    "text": desc_text,
                    "id": ++id
                };
                infos.push(article_info);
            }
            // console.log(`${pub_date}: [${title}] - ${href}`);
            if (infos.length === 0) {
                return null;
            }
            return infos;
        }
        console.log(`${pub_date}: Error Not Found - ${card}`);
        return null;
    } else {
        console.log(`${pub_date}: Error Unknown - ${card}`);
        return null;
    }
}

function get_history_info() {
    es = getElementsByXpath("//div[@class='weui_msg_card js_card']");
    all_info = [];
    for (var index in es) {
        cards = es[index];
        msgid = cards.getAttribute("msgid");
        msg_date = cards.querySelector(".weui_msg_card_hd").innerText;
        // console.log("Extracting " + index.toString() + ": " + msgid + " - " + msg_date);
        try {
            var extracted_info = extract_item(cards);
            if (extracted_info !== null) {
                // console.log(extracted_info[0]["count"]);
                all_info.push(extracted_info);
            }
        } catch (error) {
            console.error(error)
        }
    }
    flat_info = all_info.flat();
    return flat_info;
}

function make_csv() {
    function row2str(row_dict) {
        var d = row_dict;
        return `${d['date']},${d["card_type"]},${d["id"]}/${d["count"]},"${d["title"]||""}","${d["text"]||""}","${d["href"]||""}"`;
    }
    var header = "date,card_type,id_count,title,text,href";

    var data = get_history_info();
    // [A way to generate and download CSV files client-side · Issue #175 · mholt/PapaParse](https://github.com/mholt/PapaParse/issues/175#issuecomment-201308792)
    // [How to export JavaScript array info to csv (on client side)? - Stack Overflow](https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side)
    var csv = header + "\n" + data.map(row => row2str(row)).join("\n");
    var exportFilename = "HistoryExport.csv";
    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    //IE11 & Edge
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
    } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute('download', exportFilename);
        document.body.appendChild(link);    
        link.click();
        document.body.removeChild(link);    
    }    
}

function enable_click_internal() {
    console.log("enable click from wechat export");
    h4s = document.getElementsByTagName("h4");
    for (i=0, len=h4s.length; i<len; i++) {
        h4s[i].addEventListener("click", function(event) {
            event.stopPropagation();
            window.open(this.getAttribute("hrefs"));
        })    
    }
    
    es = getElementsByXpath("//div[@class='weui_msg_card js_card']");
    for (var index in es) {
        cards = es[index];
        cards.addEventListener("click", function(event) {
            event.stopPropagation();
        })
    }

    xx = getElementsByXpath("//div[@class='weui_media_box appmsg js_appmsg']");
    for (var index in xx) {
        ele = xx[index];
        ele.addEventListener("click", function(event) {
            event.stopPropagation();
            var div = this.querySelector(".weui_media_title");
            var link = div.getAttribute("hrefs");
            window.open(link);
        })
    }
}
