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

function scroll_fixed_interval() {
    var interval = setInterval(function() {
        console.log("Interval...")
        if (is_page_end()) {
            console.log("Done, will Do Last Scroll and Return.");
            scroll_to_buttom();
            clearInterval(interval)
        } else {
            scroll_to_buttom()
        }
    }, 1000)
}

function scroll(min_delay, max_delay) {
    console.log("Interval...")
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

// scroll(1, 3)
console.log("Hello");
