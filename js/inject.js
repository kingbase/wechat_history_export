function test_inject() {
    alert("from test inject")
}

function scroll_to_buttom() {
    console.log("Scrolling to buttom")
    window.scrollTo(0, document.body.scrollHeight);
}

function is_element_hiden(ele) {
    var style = window.getComputedStyle(ele);
    return (style.display === 'none')
}

function is_page_end() {
    e = document.getElementsByClassName("tips js_no_more_msg");
    if ((e.length == 1) && (!is_element_hiden(e[0]))) {
        console.log("IsPageEnd? Yes.")
        return true;
    }        
    else {
        console.log("IsPageEnd? No.");
        return false
    }
}

function scroll(min_delay, max_delay) {
    console.log("Interval...")
    if (!is_running) {
        console.log("Stop as user asked (pause).")
        return;
    }
    if (is_page_end()) {
        console.log("Done, will Do Last Scroll and Return.");
        scroll_to_buttom();
        if (is_page_end()) {
            disable_and_change("exportStartPauseButton", "Scroll End")
        }    
        return;
    } else {
        scroll_to_buttom()
    }
    var rand = Math.random() * (max_delay - min_delay + 1) + min_delay;
    console.log("Next time: " + rand + " Seconds.")
    setTimeout(function(){scroll(min_delay, max_delay)}, rand * 1000);
}

function init() {
    var body_ele = document.getElementsByTagName('body')[0];
    body_ele.insertAdjacentHTML('afterbegin', `
        <style>
        .exportFixedPos {
            z-index: 10;
            width: 200px;
            position: fixed;
            top:0px;
            right:0px;
        }
        .exportButton {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 12px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .exportButton:disabled, .exportButton[disabled]{
            border: 1px solid #999999;
            background-color: #cccccc;
            color: #666666;
        }
        </style>
        <div class="exportFixedPos" id="exportMainId">
            <div class="exportHeadClass" id="exportHeadId">
                <button class="exportButton" id="exportStartPauseButton" onclick=start_or_pause()>Scroll Start / Pause</button>
                <button class="exportButton" id="exportCsvButton" onclick=export_as_csv()>Export as CSV</button>
                <button class="exportButton" id="enableClickButton" onclick=enable_click()>Enable OnPage Click</button>
            </div>
        </div>
    `);
}

function disable_and_change(button_id, new_text=null) {
    var button_ele = document.getElementById(button_id)
    button_ele.disabled = true;
    if (new_text !== null) {
        button_ele.innerText = new_text
    }
}

var is_running = false;
function start_or_pause() {
    if (is_running === true) {
        is_running = false;
    }        
    else {
        is_running = true;   
        scroll(0.2, 0.5);
    }
}

function enable_click() {
    enable_click_internal()
    disable_and_change("enableClickButton")
}

function export_page(export_type) {
    console.log("export as " + export_type);
    if (!is_page_end()) {
        var continue_export = confirm("还没有拉到最底部，导出的数据可能不全，是否现在导出？")
        if (!continue_export)  return;
    }
}

function export_as_csv() {
    export_page("csv")
    make_csv()
}

function is_profile_url(url) {
    // https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxNjM3MDc4Mg==&scene=124&#wechat_redirect
    profile_url_pattern = "https://mp.weixin.qq.com/mp/profile_ext?"
    if (url.startsWith(profile_url_pattern)) {
        return true;
    }
    return false;
}

if (is_profile_url(window.location.href)) {
    init();
}
