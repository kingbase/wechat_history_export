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
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
        </style>
        <div class="exportFixedPos" id="exportMainId">
            <div class="exportHeadClass" id="exportHeadId">
                <button class="exportButton" onclick=start_or_pause()>Start / Pause</button>
                <button class="exportButton" onclick=export_as_csv()>Export as CSV</button>
                <button class="exportButton" onclick=export_as_pdf()>Export as PDF</button>
                <button class="exportButton" onclick=test_inject()>Debug</button>
            </div>
        </div>
    `);
}

var is_running = false;
function start_or_pause() {
    if (is_running === true) {
        is_running = false;
    }        
    else {
        is_running = true;   
        scroll(1, 2);
    }
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
}

function export_as_pdf() {
    export_page("pdf")
}

init();
