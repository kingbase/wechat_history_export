// https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/profile4e964f.js
define("appmsg/profile.js", ["biz_wap/zepto/fx_methods.js", "biz_wap/zepto/event.js", "common/color/light.js", "common/color/dark.js", "history/profile_history_v2.js", "history/template_helper.js", "biz_common/dom/event.js", "biz_wap/utils/mmversion.js", "history/performance.js", "biz_wap/utils/ajax.js", "biz_wap/jsapi/core.js", "appmsg/log.js", "biz_wap/jsapi/pay.js", "common/color/background_color.js", "biz_wap/utils/jsmonitor_report.js", "biz_wap/utils/fakehash.js"], function (e) {
    "use strict";
    e("biz_wap/zepto/fx_methods.js"), e("biz_wap/zepto/event.js");
    var n = e("common/color/light.js"), i = e("common/color/dark.js"), o = e("history/profile_history_v2.js"), t = (e("history/template_helper.js"),
        e("biz_common/dom/event.js")), s = e("biz_wap/utils/mmversion.js"), r = e("history/performance.js"), a = (e("biz_wap/utils/ajax.js"),
            e("biz_wap/jsapi/core.js")), c = (e("appmsg/log.js"), e("biz_wap/jsapi/pay.js"), e("common/color/background_color.js")), l = e("biz_wap/utils/jsmonitor_report.js"), u = e("biz_wap/utils/fakehash.js");
    window.wx && wx.config({
        debug: !1,
        beta: !0,
        appId: window.cgiData.appid,
        timestamp: window.cgiData.timestamp,
        nonceStr: window.cgiData.noncestr,
        signature: window.cgiData.signature,
        jsApiList: ["quicklyAddBrandContact"]
    });
    var d = !1, m = document.querySelector("#js_search");
    a.call("hideToolbar"), c.set({
        nav: [n["BG-0"], i["BG-0"]],
        top: [n["BG-0"], i["BG-0"]],
        bottom: [n["BG-0"], i["BG-0"]]
    }), a.invoke("checkJsApi", {
        jsApiList: ["showSearchOfBizHistory"]
    }, function (e) {
        e.err_msg.indexOf("ok") > -1 && (/(Android)/i.test(navigator.userAgent) && 1 == JSON.parse(e.checkResult).showSearchOfBizHistory || 1 == e.checkResult.showSearchOfBizHistory) && (d = !0,
            is_subscribed && d && (m.style.display = ""));
    }), a.invoke("createWebViewForFastLoad", {
        scene: 0
    }, function () { }), t.on(window, "load", function () {
        t.on(document.querySelector("#showAll"), "click", function () {
            u.push("tplAll");
        }), u.on("tplAll", function () {
            document.body.classList.add("showTopic");
        }), u.on(function (e) {
            "tplAll" == e && document.body.classList.remove("showTopic");
        });
    });
    var _ = document.querySelector("#js_btn_add_contact"), f = document.querySelector("#js_btn_view_profile"), p = document.querySelector("#icon"), g = document.querySelector("#nickname");
    g.innerHTML = nickname;
    {
        var k = document.querySelector("#js_verify_info");
        $("#js_operator"), $("#js_reward_author"), $("#js_reward_area"), $("#js_hide_reward"),
            $("#js_money_list"), $("#js_custom_money"), $("#js_other_money"), $("#js_fixed_money"),
            $("#js_reward_btn"), $("#js_reward_input"), $("#js_loading"), $("#reward_slider");
    }
    a.invoke("currentMpInfo", {
        brandName: window.title,
        brandIcon: headimg
    }, function (e) {
        console.log("currentMpInfo res: " + e);
    });
    var h = function w(e) {
        null !== window.is_ok ? "function" == typeof e && e() : setTimeout(w, 100, e);
    };
    h(function () {
        function e(e, n) {
            function i() {
                l.fadeOut(200), c.removeClass("weui-actionsheet_toggle");
            }
            function o() {
                l.fadeIn(200), c.addClass("weui-actionsheet_toggle");
            }
            function t() {
                r.on("click", ".confirmType", function () {
                    switch ($(this).data("type")) {
                        case "cancel":
                            break;

                        case "all":
                            "all" != m && (d = !0, u.text("全部"), e("all", s("all")));
                            break;

                        case "video":
                            "video" != m && (d = !0, u.text("视频"), e("video", s("video")));
                    }
                    return i(), !1;
                }), l.on("click", function () {
                    return i(), !1;
                }), u.on("click", function () {
                    return 0 == d && o(), !1;
                });
            }
            function s(e) {
                return function () {
                    m = e, d = !1;
                };
            }
            var r = ($(document.getElementById("js_container")), $("#select_tpl")), a = $("#selectType"), c = r.find(".weui-actionsheet"), l = r.find(".weui-mask"), u = $("#showSelectedType"), d = !1, m = n || "all";
            a.show(), t();
        }
        function n(e) {
            for (var n = $("#select_tpl .confirmType"), i = 0, o = n.length; o > i; i++)if ($(n[i]).data("type") === e) {
                n[i].click();
                break;
            }
        }
        function i(e, n) {
            var i = "/mp/profile_ext?action=report&uin=" + window.uin + "&key=" + window.key + "&pass_ticket=" + window.pass_ticket + "&username=" + name + "&useraction=" + e + "&t=" + Math.random() + "&scene=" + scene + "&__biz=" + __biz + "&is_ok=" + is_ok + "&fromplatform=" + fromplatform;
            if (n) for (var o in n) i += "&" + o + "=" + n[o];
            var t = new Image;
            t.src = i.substr(0, 1024);
        }
        function c() {
            is_banned ? window.alert("关注失败，帐号因违规无法关注") : (wx.ready(function () {
                wx.invoke("quicklyAddBrandContact", {
                    username: username,
                    scene: scene
                }, function (e) {
                    -1 != e.err_msg.indexOf("ok") || -1 != e.err_msg.indexOf("added") ? (l.setSum(24729, 109, 1),
                        123 == scene ? i(3, {
                            vid: vid,
                            url: url
                        }) : i(3), f.style.display = "inline-block", _.style.display = "none", h.setCanMsgContinue(1),
                        d && (m.style.display = "")) : -1 == e.err_msg.indexOf("ok") && (l.setSum(24729, 108, 1), a.invoke("addContact", {
                            scene: scene,
                            webtype: "1",
                            username: username
                        }, function (e) {
                            -1 != e.err_msg.indexOf("ok") && (123 == scene ? i(3, {
                                vid: vid,
                                url: url
                            }) : i(3), f.style.display = "inline-block", _.style.display = "none", h.setCanMsgContinue(1),
                                d && (m.style.display = ""));
                        }));
                });
            }), wx.error(function (e) {
                console.log(e);
            }));
        }
        function u(e) {
            a.invoke("openBizChat", {
                username: e
            }, function (n) {
                console.log(n), -1 != n.err_msg.indexOf("unfollow") ? (window.alert("请先关注该公众号"), _.style.display = "inline-block",
                    f.style.display = "none", h.setCanMsgContinue(0)) : -1 == n.err_msg.indexOf("ok") && a.invoke("jumpToBizProfile", {
                        tousername: e
                    }, function (n) {
                        -1 == n.err_msg.indexOf("ok") && a.invoke("profile", {
                            username: e
                        });
                    });
            });
        }
        i(9);
        var h = new o({
            biz: __biz,
            uin: uin,
            key: key,
            defaultHistoryType: defaultHistoryType,
            msgList: msgList,
            canLoadMore: !0,
            nextOffset: next_offset,
            container: document.getElementById("js_container"),
            countPerLoad: 10,
            canMsgContinue: can_msg_continue,
            isSubscribed: is_subscribed,
            addToGetMsgUrl: "is_ok=" + is_ok + "&scene=" + scene,
            addToAppmsgUrl: 126 == scene ? "subscene=126" : "",
            getAppmsgScene: function () {
                var e = "";
                return 114 == scene ? e = 34 : 123 == scene ? e = 123 : 124 == scene ? e = 38 : 126 == scene ? e = 4 : scene > 1e4 && (e = scene - 1e4),
                    e;
            }
        });
        video_count > 0 && "1" == use_video_tab && e(function (e, n) {
            h.changeTypeAndReload(e, n), "all" == e ? i(7) : "video" == e && i(8);
        }, defaultHistoryType);
        var w = location.href, y = w.split("?");
        w = y[0] + "?action=" + action + "&__biz=" + __biz + "#wechat_redirect", a.on("menu:share:appmessage", function () {
            a.invoke("sendAppMessage", {
                appid: "",
                img_url: headimg,
                img_width: "640",
                img_height: "640",
                link: w.replace("#", "&scene=123#"),
                desc: nickname + "的主页",
                title: nickname
            }, function (e) {
                (-1 != e.err_msg.indexOf("ok") || -1 != e.err_msg.indexOf("confirm")) && i(5);
            });
        }), a.on("menu:share:timeline", function () {
            a.invoke("shareTimeline", {
                img_url: headimg,
                img_width: "640",
                img_height: "640",
                link: w.replace("#", "&scene=122#"),
                desc: nickname + "的主页",
                title: nickname
            }, function (e) {
                -1 != e.err_msg.indexOf("ok") && i(4);
            });
        }), a.on("menu:share:QZone", function () {
            a.invoke("shareQZone", {
                img_url: headimg,
                img_width: "640",
                img_height: "640",
                link: w,
                desc: nickname + "的主页",
                title: nickname
            }, function (e) {
                -1 != e.err_msg.indexOf("ok") && i(6);
            });
        }), a.on("menu:share:qq", function () {
            a.invoke("shareQQ", {
                img_url: headimg,
                img_width: "640",
                img_height: "640",
                link: w,
                desc: nickname + "的主页",
                title: nickname
            }, function (e) {
                -1 != e.err_msg.indexOf("ok") && i(6);
            });
        }), a.on("menu:share:email", function () {
            a.invoke("sendEmail", {
                content: w,
                title: nickname
            }, function (e) {
                -1 != e.err_msg.indexOf("ok") && i(6);
            });
        }), a.on("sys:record", function () {
            a.invoke("recordHistory", {
                link: w,
                title: "查看历史消息",
                source: nickname,
                img_url: headimg
            }, function () { });
        }), t.on(_, "click", c), t.on(js_btn_view_profile, "click", function () {
            return u(username), !1;
        }, !1), t.on(p, "click", function () {
            return a.invoke("profile", {
                username: username
            }), !1;
        }, !1), t.on(g, "click", function () {
            return a.invoke("profile", {
                username: username
            }), !1;
        }, !1), t.on(k, "click", function (e) {
            var n = e.target.getAttribute("data-url");
            n && (-1 != navigator.userAgent.indexOf("MicroMessenger") && (s.isIOS || s.isAndroid || s.isWp) ? a.invoke("openUrlWithExtraWebview", {
                url: n,
                openType: 1
            }, function (e) {
                -1 == e.err_msg.indexOf("ok") && (location.href = n);
            }) : location.href = n);
        }), t.on(m, "click", function () {
            d && (i(6), a.invoke("showSearchOfBizHistory", {
                brandUsername: username
            }));
        }), r.run(), 123 == scene && 43 == real_type && n("video");
    });
});