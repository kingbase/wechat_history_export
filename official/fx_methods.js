// https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/jsmonitor_report4cf53e.js,/mmbizwap/zh_CN/htmledition/js/common/color/background_color4e964f.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/jsapi/pay42f400.js,/mmbizwap/zh_CN/htmledition/js/appmsg/log42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/jsapi/core4dcb51.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/ajax4a2b2d.js,/mmbizwap/zh_CN/htmledition/js/history/performance42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/mmversion4e964f.js,/mmbizwap/zh_CN/htmledition/js/biz_common/dom/event4b3caf.js,/mmbizwap/zh_CN/htmledition/js/history/template_helper473351.js,/mmbizwap/zh_CN/htmledition/js/history/profile_history_v24e2fa6.js,/mmbizwap/zh_CN/htmledition/js/common/color/dark4e964f.js,/mmbizwap/zh_CN/htmledition/js/common/color/light4e964f.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/fx_methods42f400.js?v=1003
define("biz_wap/utils/jsmonitor_report.js", ["biz_common/utils/monitor.js", "biz_wap/utils/ajax.js", "biz_wap/utils/log.js"], function (o) {
    "use strict";
    function n(o, t) {
        r = window.setTimeout(function () {
            o(), n(o, t);
        }, t);
    }
    var t = o("biz_common/utils/monitor.js"), i = o("biz_wap/utils/ajax.js"), e = o("biz_wap/utils/log.js"), r = null, s = {};
    return window.__jsmonitorReport ? window.__jsmonitorReport : (window.__monitor_unload_has_done__ = !1,
        s.setSum = function (o, n, i) {
            return t.setSum(o, n, i), s;
        }, s.setAvg = function (o, n, i) {
            return t.setAvg(o, n, i), s;
        }, s.setLogs = function (o) {
            return t.setLogs(o), s;
        }, s.send = function (o) {
            return o !== !1 && (o = !0), t.send(o, i), s;
        }, n(function () {
            s.send();
        }, 1e3), window.addEventListener("unload", function () {
            e("[leaveReport in jsmonitor_report 4]"), console.log("[leaveReport in jsmonitor_report 4]"),
                window.__monitor_report_has_done__ || (e("[leaveReport in jsmonitor_report 5]"), console.log("[leaveReport in jsmonitor_report 5]"),
                    window.__ajaxtest = "2", r && (window.clearTimeout(r), r = null), s.send(!1), window.__monitor_unload_has_done__ = !0);
        }, !1), window.__jsmonitorReport = s, s);
}); define("common/color/background_color.js", ["biz_wap/jsapi/core.js", "biz_wap/utils/mmversion.js", "common/color/light.js", "common/color/dark.js"], function (o) {
    "use strict";
    var t = o("biz_wap/jsapi/core.js"), n = o("biz_wap/utils/mmversion.js"), a = o("common/color/light.js"), r = o("common/color/dark.js"), c = "BG-2", e = n.gtVersion("7.0.12", !0), l = {
        nav: [],
        top: [],
        bottom: [],
        callback: null
    }, i = function (o) {
        var n = o.matches, a = n ? 1 : 0;
        t.invoke("setNavigationBarColor", {
            color: l.nav[a]
        }, function (o) {
            "function" == typeof l.callback && l.callback(o);
        }), t.invoke("setBounceBackground", {
            backgroundColor: l.top[a],
            footerBounceColor: l.bottom[a]
        });
    }, s = null, u = function (o) {
        return "string" != typeof o ? !1 : /(^#[0-9a-fA-F]{6}$)/.test(o);
    }, m = {
        set: function () {
            var o = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = "", m = "", b = "", k = "", v = "", f = "";
            o.nav && o.nav instanceof Array && (u(o.nav[0]) && (n = o.nav[0]), u(o.nav[1]) && (m = o.nav[1])),
                o.top && o.top instanceof Array && (u(o.top[0]) && (b = o.top[0]), u(o.top[1]) && (k = o.top[1])),
                o.bottom && o.bottom instanceof Array && (u(o.bottom[0]) && (v = o.bottom[0]), u(o.bottom[1]) && (f = o.bottom[1])),
                !n && (n = a[c]), !m && (m = r[c]), !b && (b = a[c]), !k && (k = r[c]), !v && (v = a[c]), !f && (f = r[c]), e ? (t.invoke("setNavigationBarColor", {
                    color: n,
                    wxcolor: {
                        light: n,
                        dark: m
                    }
                }, function (t) {
                    "function" == typeof o.callback && o.callback(t);
                }), t.invoke("setBounceBackground", {
                    backgroundColor: b,
                    footerBounceColor: v,
                    wxbackgroundColor: {
                        light: b,
                        dark: k
                    },
                    wxfooterBounceColor: {
                        light: v,
                        dark: f
                    }
                })) : (l.nav = [n, m], l.top = [b, k], l.bottom = [v, f], l.callback = o.callback, null === s && (s = window.matchMedia("(prefers-color-scheme: dark)"),
                    s.addListener(i)), i(s));
        }
    };
    return m;
}); define("biz_wap/jsapi/pay.js", ["biz_wap/jsapi/core.js"], function (e) {
    "use strict";
    var a = e("biz_wap/jsapi/core.js"), s = {
        getLatest: function (e) {
            a.invoke("getLatestAddress", {
                appId: e.appId,
                scope: e.scope || "jsapi_address",
                signType: e.signType || "sha1",
                addrSign: e.addrSign || "mphardcodeaddrSign",
                timeStamp: e.timeStamp || "",
                nonceStr: e.nonceStr || ""
            }, function (a) {
                return a.err_msg && "system:function_not_exist" == a.err_msg ? void (e.error && e.error()) : void (e.callback && e.callback(a));
            });
        },
        edit: function (e) {
            a.invoke("editAddress", {
                appId: e.appId,
                scope: e.scope || "jsapi_address",
                signType: e.signType || "sha1",
                addrSign: e.addrSign || "mphardcodeaddrSign",
                timeStamp: e.timeStamp || "",
                nonceStr: e.nonceStr || ""
            }, function (a) {
                e.callback && e.callback(a);
            });
        }
    }, n = function (e) {
        a.invoke("getBrandWCPayRequest", {
            appId: e.app_id,
            timeStamp: e.time_stamp,
            nonceStr: e.nonce_str,
            "package": e.package,
            signType: e.sign_type || "SHA1",
            paySign: e.pay_sign
        }, function (a) {
            "get_brand_wcpay_request:ok" == a.err_msg ? e.success && e.success(a) : e.error && e.error(a.err_msg);
        });
    };
    return {
        pay: n,
        address: s
    };
}); define("appmsg/log.js", ["biz_wap/utils/log.js"], function (i) {
    "use strict";
    var s = i("biz_wap/utils/log.js");
    return function (i, t) {
        s(i, t);
    };
}); define("biz_wap/jsapi/core.js", ["biz_wap/utils/mmversion.js"], function (e, i, n, o) {
    "use strict";
    var t = (e("biz_wap/utils/mmversion.js"), window.__moon_report || function () { }), r = 8, d = {}, a = !1;
    try {
        d = top.window.document;
    } catch (w) {
        a = !0;
    }
    var c = {}, f = {
        ready: function (e) {
            var i = function () {
                try {
                    e && (window.onBridgeReadyTime = window.onBridgeReadyTime || +new Date, e());
                } catch (i) {
                    throw t([{
                        offset: r,
                        log: "ready",
                        e: i
                    }]), i;
                }
                window.jsapiReadyTime = Date.now();
            };
            a || "undefined" != typeof top.window.WeixinJSBridge && top.window.WeixinJSBridge.invoke ? i() : d.addEventListener ? d.addEventListener("WeixinJSBridgeReady", i, !1) : d.attachEvent && (d.attachEvent("WeixinJSBridgeReady", i),
                d.attachEvent("onWeixinJSBridgeReady", i));
        },
        invoke: function (e, i, n) {
            this.ready(function () {
                return a ? !1 : "object" != typeof top.window.WeixinJSBridge ? (o("请在微信中打开此链接！"), !1) : void top.window.WeixinJSBridge.invoke(e, i, function (i) {
                    try {
                        if (n) {
                            n.apply(window, arguments);
                            var o = i && i.err_msg ? ", err_msg-> " + i.err_msg : "";
                            console.info("[jsapi] invoke->" + e + o);
                        }
                    } catch (d) {
                        throw t([{
                            offset: r,
                            log: "invoke;methodName:" + e,
                            e: d
                        }]), d;
                    }
                });
            });
        },
        call: function (e) {
            this.ready(function () {
                if (a) return !1;
                if ("object" != typeof top.window.WeixinJSBridge) return !1;
                try {
                    top.window.WeixinJSBridge.call(e);
                } catch (i) {
                    throw t([{
                        offset: r,
                        log: "call;methodName:" + e,
                        e: i
                    }]), i;
                }
            });
        },
        on: function (e, i) {
            this.ready(function () {
                return a ? !1 : "object" == typeof top.window.WeixinJSBridge && top.window.WeixinJSBridge.on ? (c[e] || (c[e] = []),
                    c[e].push(i), void (c[e].length > 1 || top.window.WeixinJSBridge.on(e, function () {
                        try {
                            if (c[e] && c[e].length) {
                                for (var i, n = 0; n < c[e].length; n++)i = c[e][n].apply(window, arguments);
                                return i;
                            }
                        } catch (o) {
                            throw t([{
                                offset: r,
                                log: "on;eventName:" + e,
                                e: o
                            }]), o;
                        }
                    }))) : !1;
            });
        }
    };
    return f;
}); define("biz_wap/utils/ajax.js", ["biz_common/utils/string/html.js", "biz_common/utils/url/parse.js", "biz_common/utils/respTypes.js", "biz_wap/utils/ajax_wx.js"], function (require, exports, module, alert) {
    "use strict";
    function reqType(e, t) {
        return e.url.indexOf(t) > -1 && -1 === e.url.indexOf("action=") && (!e.data || !e.data.action);
    }
    function logClientLog(e) {
        try {
            var t;
            /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? t = "writeLog" : /(Android)/i.test(navigator.userAgent) && (t = "log"),
                t && doLog(t, e);
        } catch (r) {
            throw console.error(r), r;
        }
    }
    function doLog(e, t) {
        var r, o, a = {};
        r = top != window ? top.window : window;
        try {
            o = r.WeixinJSBridge, a = r.document;
        } catch (n) { }
        e && o && o.invoke ? o.invoke(e, {
            level: "info",
            msg: "[WechatFe][ajax]" + t
        }) : setTimeout(function () {
            a.addEventListener ? a.addEventListener("WeixinJSBridgeReady", function () {
                doLog(e, t);
            }, !1) : a.attachEvent && (a.attachEvent("WeixinJSBridgeReady", function () {
                doLog(e, t);
            }), a.attachEvent("onWeixinJSBridgeReady", function () {
                doLog(e, t);
            }));
        }, 0);
    }
    function reportRt(e, t, r) {
        var o = "";
        if (r && r.length) {
            var a = 1e3, n = r.length, s = Math.ceil(n / a);
            o = ["&lc=" + s];
            for (var i = 0; s > i; ++i)o.push("&log" + i + "=[rtCheckError][" + i + "]" + encodeURIComponent(r.substr(i * a, a)));
            o = o.join("");
        }
        var p, c = "idkey=" + e + "_" + t + "_1" + o + "&r=" + Math.random();
        if (window.ActiveXObject) try {
            p = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (d) {
            try {
                p = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (u) {
                p = !1;
            }
        } else window.XMLHttpRequest && (p = new XMLHttpRequest);
        p && (p.open("POST", location.protocol + "//mp.weixin.qq.com/mp/jsmonitor?", !0), p.setRequestHeader("cache-control", "no-cache"),
            p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            p.setRequestHeader("X-Requested-With", "XMLHttpRequest"), p.send(c));
    }
    function reportAjaxLength(e, t, r) {
        var o = "";
        if (r && r.length) {
            var a = 1e3, n = r.length, s = Math.ceil(n / a);
            o = ["&lc=" + s];
            for (var i = 0; s > i; ++i)o.push("&log" + i + "=[Ajax Length Limit][" + i + "]" + encodeURIComponent(r.substr(i * a, a)));
            o = o.join("");
        }
        var p, c = "idkey=" + e + "_" + t + "_1" + o + "&r=" + Math.random();
        if (window.ActiveXObject) try {
            p = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (d) {
            try {
                p = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (u) {
                p = !1;
            }
        } else window.XMLHttpRequest && (p = new XMLHttpRequest);
        p && (p.open("POST", location.protocol + "//mp.weixin.qq.com/mp/jsmonitor?", !0), p.setRequestHeader("cache-control", "no-cache"),
            p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            p.setRequestHeader("X-Requested-With", "XMLHttpRequest"), p.send(c), (new Image).src = "/mp/jsmonitor?idkey=" + e + "_" + t + "_1" + o + "&r=" + Math.random());
    }
    function Ajax(obj) {
        var type = (obj.type || "GET").toUpperCase(), url;
        url = obj.notJoinUrl ? obj.url : ajaxWx.joinUrl(obj.url), "html" == obj.f && (url = url.replace("&f=json", ""));
        var mayAbort = !!obj.mayAbort, async = "undefined" == typeof obj.async ? !0 : obj.async, xhr = new XMLHttpRequest, timer = null, data = null;
        if ("object" == typeof obj.data) {
            var d = obj.data;
            data = [];
            for (var k in d) d.hasOwnProperty(k) && data.push(k + "=" + encodeURIComponent(d[k]));
            data = data.join("&");
        } else data = "string" == typeof obj.data ? obj.data : null;
        xhr.open(type, url, async);
        var _onreadystatechange = xhr.onreadystatechange;
        try {
            url && url.length > LENGTH_LIMIT && reportAjaxLength(27613, 17, "ajax get limit[length: " + url.length + "]" + url.substring(0, 1024));
        } catch (e) { }
        xhr.onreadystatechange = function () {
            if ("function" == typeof _onreadystatechange && _onreadystatechange.apply(xhr), 3 == xhr.readyState && obj.received && obj.received(xhr),
                4 == xhr.readyState) {
                reqType(obj, "/mp/getappmsgext") && (window.receiveGetAppmsgExt = xhr.status + "|" + Date.now(),
                    logClientLog("receive appmsgext response, status: " + xhr.status)), reqType(obj, "/mp/getappmsgad") && (window.receiveGetAppmsgAd = xhr.status + "|" + Date.now(),
                        logClientLog("receive appmsgad response, status: " + xhr.status)), xhr.onreadystatechange = null;
                var status = xhr.status;
                if (status >= 200 && 400 > status) try {
                    var responseText = xhr.responseText, resp = responseText;
                    if ("json" == obj.dataType) try {
                        resp = eval("(" + resp + ")");
                        var rtId = obj.rtId, rtKey = obj.rtKey || 0, rtDesc = obj.rtDesc, checkRet = !0;
                        if (rtId && rtDesc && RespTypes && !RespTypes.check(resp, rtDesc) && reportRt(rtId, rtKey, RespTypes.getMsg() + "[detail]" + responseText + ";" + obj.url),
                            resp && resp.base_resp && 1 * resp.base_resp.ret !== 0 && "undefined" != typeof window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs && Math.random() < .001) {
                            var reportUrl = url;
                            -1 !== url.indexOf("?") && (reportUrl = url.substr(0, url.indexOf("?")), Url.getQuery("action", url) && (reportUrl = reportUrl + "?action=" + Url.getQuery("action", url))),
                                ("/mp/getappmsgext" !== reportUrl && "/mp/getappmsgad" !== reportUrl || "undefined" != typeof resp.base_resp.ret) && window.WX_BJ_REPORT.BadJs.report(reportUrl, "ret=" + resp.base_resp.ret, {
                                    mid: window.PAGE_MID,
                                    view: "wap_retcode"
                                });
                        }
                    } catch (e) {
                        return void (obj.error && obj.error(xhr, {
                            type: 1,
                            error: e
                        }));
                    }
                    obj.success && obj.success(resp);
                } catch (e) {
                    throw __moon_report({
                        offset: MOON_AJAX_SUCCESS_OFFSET,
                        e: e
                    }), e;
                } else {
                    try {
                        obj.error && obj.error(xhr, {
                            type: 2,
                            error: "status error",
                            status: status
                        });
                    } catch (e) {
                        throw __moon_report({
                            offset: MOON_AJAX_ERROR_OFFSET,
                            e: e
                        }), e;
                    }
                    if (status || !mayAbort) {
                        var __ajaxtest = window.__ajaxtest || "0";
                        __moon_report({
                            offset: MOON_AJAX_NETWORK_OFFSET,
                            log: "ajax_network_error[" + status + "][" + __ajaxtest + "]: " + url + ";host:" + location.host,
                            e: ""
                        });
                    }
                }
                clearTimeout(timer);
                try {
                    obj.complete && obj.complete();
                } catch (e) {
                    throw __moon_report({
                        offset: MOON_AJAX_COMPLETE_OFFSET,
                        e: e
                    }), e;
                }
                obj.complete = null;
            }
        }, "POST" == type && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            obj.noXRequestedWidthHeader || xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            "undefined" != typeof obj.timeout && (timer = setTimeout(function () {
                xhr.abort("timeout");
                try {
                    obj.complete && obj.complete();
                } catch (e) {
                    throw __moon_report({
                        offset: MOON_AJAX_COMPLETE_OFFSET,
                        e: e
                    }), e;
                }
                obj.complete = null, __moon_report({
                    offset: MOON_AJAX_TIMEOUT_OFFSET,
                    log: "ajax_timeout_error: " + url,
                    e: ""
                });
            }, obj.timeout));
        try {
            xhr.send(data);
            try {
                data && data.length > LENGTH_LIMIT && reportAjaxLength(27613, 18, "ajax post limit[length: " + data.length + "]" + data.substring(0, 1024));
            } catch (e) { }
        } catch (e) {
            obj.error && obj.error(xhr, {
                type: 3,
                error: e
            });
        }
        return reqType(obj, "/mp/getappmsgext") && (window.startGetAppmsgExtTime = Date.now(),
            logClientLog("start get appmsgext, url: ", obj.url)), reqType(obj, "/mp/getappmsgad") && (window.startGetAppmsgAdTime = Date.now(),
                logClientLog("start get appmsgad, url: ", obj.url)), xhr;
    }
    require("biz_common/utils/string/html.js");
    var Url = require("biz_common/utils/url/parse.js"), RespTypes = require("biz_common/utils/respTypes.js"), ajaxWx = require("biz_wap/utils/ajax_wx.js"), isx5 = -1 != navigator.userAgent.indexOf("TBS/"), __moon_report = window.__moon_report || function () { }, MOON_AJAX_SUCCESS_OFFSET = 3, MOON_AJAX_NETWORK_OFFSET = 4, MOON_AJAX_ERROR_OFFSET = 5, MOON_AJAX_TIMEOUT_OFFSET = 6, MOON_AJAX_COMPLETE_OFFSET = 7, MOON_AJAX_GET_LIMIT_4K = 17, MOON_AJAX_POST_LIMIT_4K = 18, LENGTH_LIMIT = 4096, doc = {}, isAcrossOrigin = !1;
    try {
        doc = top.window.document;
    } catch (e) {
        isAcrossOrigin = !0;
    }
    return window.__second_open__ || !isAcrossOrigin && top.window.__second_open__ ? ajaxWx.ajax : Ajax;
}); define("history/performance.js", ["biz_common/utils/wxgspeedsdk.js"], function (i) {
    "use strict";
    function n() {
        if (e.setBasicTime({
            pid: 110,
            uin: uin
        }), window.moon && window.moon.cacheData) {
            var i = window.moon.cacheData.js_mod_num, n = window.moon.cacheData.css_mod_num;
            o.push({
                sid: 21,
                time: window.moon.cacheData.js_hit_num / i * 1e3
            }), o.push({
                sid: 22,
                time: window.moon.cacheData.js_not_hit_num / i * 1e3
            }), o.push({
                sid: 23,
                time: window.moon.cacheData.js_expired_num / i * 1e3
            }), o.push({
                sid: 24,
                time: window.moon.cacheData.css_hit_num / n * 1e3
            }), o.push({
                sid: 25,
                time: window.moon.cacheData.css_not_hit_num / n * 1e3
            }), o.push({
                sid: 26,
                time: window.moon.cacheData.css_expired_num / n * 1e3
            });
        }
        e.saveSpeeds({
            uin: window.uin,
            pid: 110,
            speeds: o
        }), setTimeout(function () {
            e.send();
        }, 10);
    }
    var e = i("biz_common/utils/wxgspeedsdk.js"), o = [];
    return {
        run: n
    };
}); define("biz_wap/utils/mmversion.js", [], function () {
    "use strict";
    function n() {
        var n = /MicroMessenger\/([\d\.]+)/i, t = c.match(n);
        return t && t[1] ? t[1] : !1;
    }
    function t() {
        var n = /MicroMessenger\/[\d\.]+\(0x(.+?)\)/i, t = c.match(n);
        return t && t[1] ? t[1] : !1;
    }
    function i(t, i, r) {
        var e = n();
        if (e) {
            e = e.split("."), t = t.split("."), /\d+/g.test(e[e.length - 1]) || e.pop();
            for (var s, o, c = h["cp" + i], u = 0, a = Math.max(e.length, t.length); a > u; ++u) {
                s = e[u] || 0, o = t[u] || 0, s = parseInt(s) || 0, o = parseInt(o) || 0;
                var d = h.cp0(s, o);
                if (!d) return c(s, o);
            }
            return r || 0 == i ? !0 : !1;
        }
    }
    function r(n) {
        return i(n, 0);
    }
    function e(n, t) {
        return i(n, 1, t);
    }
    function s(n, t) {
        return i(n, -1, t);
    }
    function o() {
        return u ? "ios" : d ? "android" : g ? "mac_os" : p ? "windows" : "unknown";
    }
    var c = navigator.userAgent, u = /(iPhone|iPad|iPod|iOS)/i.test(c), a = /Windows\sPhone/i.test(c), d = /(Android)/i.test(c), f = /MicroMessenger\/([\d\.]+)/i.test(c), g = /mac\sos/i.test(c), p = /windows\snt/i.test(c) && !a, w = d && /miniprogram/.test(c.toLowerCase()) || "miniprogram" == window.__wxjs_environment, m = f && /wxwork/i.test(c), h = {
        "cp-1": function (n, t) {
            return t > n;
        },
        cp0: function (n, t) {
            return n == t;
        },
        cp1: function (n, t) {
            return n > t;
        }
    };
    return {
        get: n,
        getInner: t,
        cpVersion: i,
        eqVersion: r,
        gtVersion: e,
        ltVersion: s,
        getPlatform: o,
        isWp: a,
        isIOS: u,
        isAndroid: d,
        isInMiniProgram: w,
        isWechat: f,
        isMac: g,
        isWindows: p,
        is_wxwork: m
    };
}); define("biz_common/dom/event.js", [], function () {
    "use strict";
    function t() {
        return f && (new Date).getTime() - f < 200 ? !0 : !1;
    }
    function e() {
        return h.isPc || h.isWp ? !1 : !0;
    }
    function n(n, i, a, o) {
        e() ? (i.tap_handler = function (e) {
            if (-1 == h.tsTime || +new Date - h.tsTime > 200 || t()) return void (h.tsTime = -1);
            var n = e.changedTouches[0];
            return Math.abs(h.y - n.clientY) <= 5 && Math.abs(h.x - n.clientX) <= 5 ? i.call(this, e) : void 0;
        }, r(n, "touchend", o, i.tap_handler, a)) : r(n, "click", o, i, a);
    }
    function i(t, e, n, i) {
        var a = this, o = 0;
        if (h.isPc || h.isWp) {
            var c, u, d, l = !1;
            r(t, "mousedown", i, function (t) {
                d = !1, l = !0, c = t.clientX, u = t.clientY, o = setTimeout(function () {
                    d = !0, o = 0, e.call(a, t);
                }, 500), t.preventDefault();
            }), r(t, "mousemove", i, function (t) {
                l && (Math.abs(u - t.clientY) > 5 || Math.abs(c - t.clientX) > 5) && (clearTimeout(o), o = 0);
            }), r(t, "mouseup", i, function () {
                l = !1, clearTimeout(o);
            }), r(t, "click", i, function () {
                return d ? !1 : void 0;
            });
        } else r(t, "touchstart", i, function (t) {
            o = setTimeout(function () {
                o = 0, e.call(a, t);
            }, 500);
        }), r(t, "touchmove", i, function (t) {
            var e = t.changedTouches[0];
            (Math.abs(h.y - e.clientY) > 5 || Math.abs(h.x - e.clientX) > 5) && (clearTimeout(o), o = 0);
        }), r(t, "touchend", i, function (t) {
            o ? (clearTimeout(o), o = 0) : t.preventDefault();
        });
    }
    function a(t, e) {
        if (!t || !e || t.nodeType != t.ELEMENT_NODE) return !1;
        var n = t.webkitMatchesSelector || t.msMatchesSelector || t.matchesSelector;
        return n ? n.call(t, e) : (e = e.substr(1), t.className.indexOf(e) > -1);
    }
    function o(t, e, n) {
        for (; t && !a(t, e);)t = t !== n && t.nodeType !== t.DOCUMENT_NODE && t.parentNode;
        return t;
    }
    function r(t, e, a, r, c) {
        var u, d, l;
        return "input" == e && h.isPc, t ? ("function" == typeof a && (c = r, r = a, a = ""), "string" != typeof a && (a = ""),
            t == window && "load" == e && /complete|loaded/.test(document.readyState) ? r({
                type: "load"
            }) : "tap" == e ? n(t, r, c, a) : "longtap" === e ? i(t, r, c, a) : ("unload" == e && "onpagehide" in window && (e = "pagehide"),
                u = function (t) {
                    var e = r(t);
                    return e === !1 && (t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault()),
                        e;
                }, a && "." == a.charAt(0) && (l = function (e) {
                    var n = e.target || e.srcElement, i = o(n, a, t);
                    return i ? (e.delegatedTarget = i, u(e)) : void 0;
                }), d = l || u, r[e + "_handler"] = d, t.addEventListener ? void t.addEventListener(e, d, !!c) : t.attachEvent ? void t.attachEvent("on" + e, d, !!c) : void 0)) : void 0;
    }
    function c(t, n, i, a) {
        if (t) {
            var o, r = n;
            return "tap" == r && (e() ? (r = "touchend", o = i.tap_handler && i.tap_handler.touchend_handler ? i.tap_handler.touchend_handler : i) : r = "click"),
                o = i[r + "_handler"] || i, t.removeEventListener ? void t.removeEventListener(r, o, !!a) : t.detachEvent ? void t.detachEvent("on" + r, o, !!a) : void ("tap" == r && e() ? (i.tap_handler && (i.tap_handler.touchend_handler = null),
                    i.tap_handler = null) : i[r + "_handler"] = null);
        }
    }
    function u() {
        if ("hidden" in document) return "hidden";
        for (var t = 0; t < v.length; t++)if (v[t] + "Hidden" in document) return v[t] + "Hidden";
        return null;
    }
    function d() {
        if ("visibilityState" in document) return "visibilityState";
        for (var t = 0; t < v.length; t++)if (v[t] + "VisibilityState" in document) return v[t] + "VisibilityState";
        return null;
    }
    function l(t) {
        var e = u();
        if (e) {
            var n = e.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(n, function () {
                var e = "hidden" !== document[d()];
                "function" == typeof t && t(e);
            }, !1);
        }
    }
    var s = navigator.userAgent, h = {
        isPc: /(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
        isWp: /Windows\sPhone/i.test(s),
        tsTime: -1
    }, v = ["webkit", "moz", "ms", "o"];
    e() && r(document, "touchstart", function (t) {
        var e = t.changedTouches[0];
        h.x = e.clientX, h.y = e.clientY, h.tsTime = +new Date;
    });
    var f;
    return window.addEventListener("scroll", function () {
        f = (new Date).getTime();
    }, !0), {
        on: r,
        off: c,
        tap: n,
        longtap: i,
        bindVisibilityChangeEvt: l
    };
}); define("history/template_helper.js", ["biz_common/template-2.0.1-cmd.js"], function (e) {
    "use strict";
    var t = e("biz_common/template-2.0.1-cmd.js");
    return "undefined" != typeof t && (t.openTag = "{{", t.closeTag = "}}", t.helper("dateFormat", function (e, t) {
        e = new Date(e);
        var n = {
            M: e.getMonth() + 1,
            d: e.getDate(),
            h: e.getHours(),
            m: e.getMinutes(),
            s: e.getSeconds(),
            q: Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        return t = t.replace(/([yMdhmsqSa])+/g, function (t, r) {
            var o = n[r];
            return void 0 !== o ? (t.length > 1 && (o = "0" + o, o = o.substr(o.length - 2)), o) : "y" === r ? (e.getFullYear() + "").substr(4 - t.length) : t;
        }), "undefined" != typeof LANG && "en" === LANG ? t.replace(/[\u4e00-\u9fa5]/g, function (e) {
            switch (e) {
                case "年":
                    return "/";

                case "月":
                    return "/";

                case "日":
                    return "";
            }
        }) : t;
    })), t;
}); define("history/profile_history_v2.js", ["pages/video_communicate_adaptor.js", "appmsg/cdn_img_lib.js", "biz_wap/zepto/zepto.js", "biz_wap/zepto/event.js", "history/template_helper.js", "biz_common/utils/string/html.js", "history/profile_history_v2.html.js", "biz_wap/utils/ajax.js", "biz_wap/utils/mmversion.js", "biz_wap/jsapi/core.js", "biz_common/utils/emoji_data.js", "biz_common/dom/event.js", "pages/qq_video_info.js", "appmsg/malicious_wording.js", "biz_wap/utils/jsmonitor_report.js", "biz_common/utils/url/parse.js", "common/utils.js"], function (require, exports, module, alert) {
    "use strict";
    function monitorReport(e) {
        if (!hasReport) {
            var t = 58883;
            jsmonitorReport.setSum(t, e, 1), hasReport = !0;
        }
    }
    function encodeEmoji(e) {
        if (!/\[[^\[\]]+\]/.test(e)) return e;
        for (var t = 0, i = EmojiData.length; i > t; t++) {
            var o = EmojiData[t], s = emoji_wx_icon.replace("#name#", o.style);
            if (o.cn) {
                var n = new RegExp("\\[" + o.cn.replace(/\[|\]/g, "") + "\\]", "g");
                e = e.replace(n, s);
            }
            if (o.hk) {
                var r = new RegExp("\\[" + o.hk.replace(/\[|\]/g, "") + "\\]", "g");
                e = e.replace(r, s);
            }
            if (o.us) {
                var a = new RegExp("\\[" + o.us.replace(/\[|\]/g, "") + "\\]", "g");
                e = e.replace(a, s);
            }
        }
        return e;
    }
    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function getDocumentHeight() {
        return document.body.scrollHeight;
    }
    function isScrollEnd() {
        return Math.ceil(getScrollTop() + commonUtils.getInnerHeight()) >= getDocumentHeight();
    }
    function parseDom(e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.childNodes;
    }
    function getQuery(e) {
        e = e || "http://qq.com/s?a=b#rd";
        for (var t = e.split("?"), i = (t[1] || "").split("#")[0].split("&"), o = {}, s = 0; s < i.length; s++) {
            var n = i[s].indexOf("=");
            if (n > -1) {
                var r = i[s].substring(0, n);
                o[r] = i[s].substring(n + 1);
            }
        }
        return o;
    }
    require("pages/video_communicate_adaptor.js"), require("appmsg/cdn_img_lib.js"), require("biz_wap/zepto/zepto.js"),
        require("biz_wap/zepto/event.js");
    var template = require("history/template_helper.js"), string = require("biz_common/utils/string/html.js"), tpl = require("history/profile_history_v2.html.js"), Ajax = require("biz_wap/utils/ajax.js"), mmversion = require("biz_wap/utils/mmversion.js"), JSAPI = require("biz_wap/jsapi/core.js"), EmojiData = require("biz_common/utils/emoji_data.js"), DomEvent = require("biz_common/dom/event.js"), V_INFO = require("pages/qq_video_info.js"), maliciousWording = require("appmsg/malicious_wording.js"), jsmonitorReport = require("biz_wap/utils/jsmonitor_report.js"), ParseJs = require("biz_common/utils/url/parse.js"), commonUtils = require("common/utils.js"), inWechat = -1 != navigator.userAgent.indexOf("MicroMessenger") && (mmversion.isIOS || mmversion.isAndroid || mmversion.isWp), height = (window.screen.width - 30) / 1.9, playableVideoHeight = (window.screen.width - 30) / (16 / 9), emoji_wx_icon = '<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #name#" alt="" />', hasReport = !1;
    template.helper("handleVideoTime", function (e) {
        var t = "";
        if (60 > e) 10 > e && (e = "0" + e), t = "00:" + e; else if (e >= 60) {
            var i = Math.floor(e / 60), o = (e - 60 * i) % 60;
            10 > i && (i = "0" + i), 10 > o && (o = "0" + o), t = i + ":" + o;
        } else if (e >= 3600) {
            var s = Math.floor(e / 3600), i = Math.floor((e - 3600 * s) / 60), o = (e - 3600 * s - 60 * i) % 60;
            10 > s && (s = "0" + s), 10 > i && (i = "0" + i), 10 > o && (o = "0" + o), t = s + ":" + i + ":" + o;
        }
        return t;
    }), template.helper("handleTextEmoji", function (e, t) {
        return 10 == t ? (console.log(e), encodeEmoji(e).replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g, "")) : encodeEmoji(e);
    }), template.helper("handleAudioTime", function (e) {
        return Math.ceil(parseInt(e) / 1e3) + "秒";
    }), template.helper("handleCdnImg", function (e, t, i) {
        if ("undefined" != typeof t && "undefined" != typeof i && maliciousWording.maliciousTitleMap[t][i]) return "https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png";
        var o = e.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g, "");
        return o.isCDN() && !o.isGif() && (o = o.replace(/\/0$/, "/640"), o = o.replace(/\/0\?/, "/640?"),
            o = o.replace(/\/0\./, "/640.")), o;
    }), template.helper("handleTitle", function (e, t, i) {
        return "undefined" != typeof t && "undefined" != typeof i ? maliciousWording.maliciousTitleMap[t][i] || e : e;
    });
    var openUrl = function (e, t, i, o) {
        var s = $("body").find(".playing");
        s.length && (s.removeClass("playing"), s.find("audio")[0].pause());
        var o = o || void 0;
        if ("1" == i.data("clicked")) return !1;
        if (i.data("clicked", 1), inWechat) if (0 != t && mmversion.eqVersion("7.0.4")) JSAPI.invoke("openUrlWithExtraWebview", {
            url: e,
            openType: 1
        }, function (t) {
            i.data("clicked", 0), t && t.err_msg && -1 == t.err_msg.indexOf("ok") && (window.location.href = e);
        }); else {
            var n = getQuery(e).scene, r = {
                url: e,
                item_show_type: t,
                openType: 0,
                scene: n
            };
            5 === t && o && (r.vid = o.app_msg_ext_info.vid, r.srcUserName = "undefined" != typeof window.username ? window.username : "",
                r.srcDisplayName = "undefined" != typeof window.nickname ? window.nickname : "", r.title = o.app_msg_ext_info.title,
                r.cover = o.app_msg_ext_info.cover, r.pubTime = o.comm_msg_info.datetime), JSAPI.invoke("openWebViewUseFastLoad", r, function (t) {
                    console.log("openWebViewUseFastLoad res: ", t), t && t.err_msg && -1 == t.err_msg.indexOf("ok") ? JSAPI.invoke("openUrlWithExtraWebview", {
                        url: e,
                        openType: 1
                    }, function (t) {
                        i.data("clicked", 0), t && t.err_msg && -1 == t.err_msg.indexOf("ok") && (window.location.href = e);
                    }) : (i.data("clicked", 0), jsmonitorReport.setSum(28839, 37, 1));
                });
        } else i.data("clicked", 0), window.location.href = e;
    }, addToUrl = function (e, t) {
        return t = -1 == e.indexOf("?") ? "?" + t : "&" + t, -1 == e.indexOf("#") ? e += t : e = e.replace("#", t + "#"),
            e;
    }, ProfileHistory = function ProfileHistory(opt) {
        this.biz = opt.biz || "", this.uin = opt.uin || "", this.key = opt.key || "", this.openkey = opt.openkey || "",
            this.msgList = opt.msgList || '{"list":[]}', this.rawData = {}, opt.hasDoHtmlEncode || (this.msgList = eval("(" + string.htmlDecode(this.msgList) + ")")),
            this.$container = $(opt.container), this.canLoadMore = opt.canLoadMore, this.countPerLoad = opt.countPerLoad,
            this.canMsgContinue = opt.canMsgContinue, this.nextOffset = opt.nextOffset, this.isSubscribed = opt.isSubscribed,
            this.scene = opt.scene, this.cgiUrl = opt.cgiUrl, this.isLoading = !1, this.addToAppmsgUrl = opt.addToAppmsgUrl || "",
            this.addToGetMsgUrl = opt.addToGetMsgUrl || "", this.onGoingUrl = "", this.historyType = opt.defaultHistoryType || "all",
            this.playingVideo = null, this.videoPage = 0, this.currentVideoList = [], this.actionNameMap = {
                all: "getmsg",
                video: "getvideo"
            }, this.getAppmsgScene = opt.getAppmsgScene || function () {
                return 27;
            }, this.videoLen = 0, this._init();
    };
    return ProfileHistory.prototype._init = function () {
        this.$container.html(tpl), this.$jsHistoryList = this.$container.find("#js_history_list"),
            this.$jsLoading = this.$container.find("#js_loading"), this.$jsNoMore = this.$container.find("#js_nomore"),
            this.$jsNoData = this.$container.find("#js_no_data"), this.$jsNoMoreMsg = this.$container.find(".js_no_more_msg"),
            this.$jsNeedAddContact = this.$container.find(".js_need_add_contact"), this._renderList(this.msgList.list),
            this.setTailMsg(), this._bindEvent();
    }, ProfileHistory.prototype._bindEvent = function () {
        var e = this;
        this.$container.on("click", ".js_media", function (t) {
            var i = $(this);
            "TEXT" == i.data("type") ? e._textJump(i) : "IMG" == i.data("type") ? e._imgOpen(i) : "AUDIO" == i.data("type") ? !$(t.target).hasClass("js_icon") && i.parent(".js_appmsg").attr("hrefs") ? e._voiceJump(i) : e._voicePlay(i) : "VIDEO" == i.data("type") ? ("video" == e.historyType && e.playingVideo && e.playingVideo.ins && e.playingVideo.ins.pause(),
                e._videoJump(i)) : "APPMSG" == i.data("type") && e._appmsgJump(i);
        }), this.$container.on("click", ".js_go_appmsg", function (t) {
            var i = $(t.target).data("href");
            i && (e.playingVideo && e.playingVideo.ins && e.playingVideo.ins.pause(), i = i.replace("#rd", "").replace("#wechat_redirect", ""),
                i = ParseJs.addParam(i, "scene", "4", !0), i += "#rd", openUrl(i, 0, $(t.target)));
        }), this.canLoadMore && $(window).on("scroll", function () {
            var t = e.actionNameMap[e.historyType];
            if (e.isLoading) return !1;
            if (!t) return !1;
            if (e.canMsgContinue && isScrollEnd()) {
                var i = ["action=" + t, "__biz=" + e.biz, "f=json", "offset=" + e.nextOffset, "count=" + e.countPerLoad].join("&"), o = "/mp/profile_ext?" + i;
                o = addToUrl(o, e.addToGetMsgUrl), e._fetchData(o);
            }
        }), $(window).on("scroll", function () {
            var e = document.documentElement.scrollTop;
            $(".weui_media_box.appmsg").each(function (t, i) {
                if (1 != $(i).data("hasload")) {
                    var o = $(i)[0].getBoundingClientRect();
                    (o.top < commonUtils.getInnerHeight() + e && o.top > e || o.top + o.height > e && o.top + o.height < commonUtils.getInnerHeight() + e) && $(i).attr("hrefs").length > 0 && ($(i).data("hasload", 1),
                        JSAPI.invoke("downloadPageDataForFastLoad", {
                            itemList: [{
                                item_show_type: $(i).data("t"),
                                url: $(i).attr("hrefs")
                            }]
                        }, function () { }));
                }
            });
        });
    }, ProfileHistory.prototype.setTailMsg = function () {
        this.canMsgContinue ? (this.$jsLoading.show(), this.$jsNoMore.hide()) : (this.$jsLoading.hide(),
            this.$jsNoMore.show(), this.isSubscribed ? this.$jsNoMoreMsg.show() : this.$jsNeedAddContact.show());
    }, ProfileHistory.prototype._fetchData = function (url, _success, fail) {
        var that = this;
        that.$jsLoading.show(), that.isLoading = !0, that.onGoingUrl = url, Ajax({
            url: url,
            type: "get",
            success: function success(data) {
                if (that.onGoingUrl == url) {
                    var data = eval("(" + data + ")");
                    if (that.$jsLoading.hide(), !data || 0 != data.ret) return fail && fail(), alert("系统繁忙(" + data.ret + ")，请稍后再试"),
                        that.isLoading = !1, void that.$jsLoading.show();
                    that.canMsgContinue = data.can_msg_continue, that.nextOffset = data.next_offset;
                    var tmpList = JSON.parse(data.general_msg_list);
                    that.isLoading = !1, that._renderList(tmpList.list), that.setTailMsg(), _success && _success(data, tmpList);
                }
            },
            error: function () {
                alert("系统繁忙，请稍后再试"), that.isLoading = !1, that.$jsLoading.show(), fail && fail();
            }
        });
    }, ProfileHistory.prototype.changeTypeAndReload = function (e, t) {
        var i = this;
        if ("all" == e && i._reportCurrentList(), this._clearList(), this.$jsNoData.hide(), this.$jsLoading.show(),
            this.historyType = e, this.actionNameMap[e]) {
            var o = ["action=" + this.actionNameMap[e], "__biz=" + i.biz, "f=json", "count=" + i.countPerLoad].join("&"), s = "/mp/profile_ext?" + o;
            i.$jsNoMore.hide(), this._fetchData(s, function (e, o) {
                o.list.length < 1 && (i.$jsNoData.show(), i.$jsNoMore.hide(), i.$jsNoMoreMsg.hide()), t();
            }, function () {
                t();
            });
        }
    }, ProfileHistory.prototype._getMinMsgId = function () {
        var e = this.$container.find(".js_card");
        return e.eq(e.length - 1).attr("msgid");
    }, ProfileHistory.prototype.setCanMsgContinue = function (e) {
        this.canMsgContinue = e, this.$jsLoading.show(), this.$jsNoMore.hide(), this.$jsNeedAddContact.hide(),
            e > 0 && (this.isSubscribed = !0);
    }, ProfileHistory.prototype._clearList = function () {
        this._clearVideos(), this.$jsHistoryList.html("");
    }, ProfileHistory.prototype._renderList = function (e) {
        for (var t = template.render("js_profile_history_tpl", {
            list: this._processList(e),
            biz: this.biz,
            uin: this.uin,
            key: this.key,
            openkey: this.openkey,
            height: height,
            playableVideoHeight: playableVideoHeight,
            useDemo: this.useDemo,
            historyType: this.historyType,
            videoLen: this.videoLen
        }), i = parseDom(t), o = 0; o < i.length; o++)this.$jsHistoryList.append($(i[o].cloneNode(!0)));
        "video" == this.historyType && this._renderVideoList(e);
        for (var o = 0; o < e.length; o++)this.rawData["WXAPPMSG" + e[o].comm_msg_info.id] = e[o];
    }, ProfileHistory.prototype._clearVideos = function () {
        this._destroyCurrentVideoList(), this.videoPage = 0, this.currentVideoList = [], this.playingVideo = null;
    }, ProfileHistory.prototype._renderVideoList = function (e) {
        var t = this, i = $(".video_card").children().width(), o = [];
        t._reportCurrentList(), t.videoPage += 1, $.each(e, function (e, s) {
            var n, r, e, a = s.app_msg_ext_info, p = (a.content_url || "").html(!1);
            if (p && (n = ParseJs.getQuery("__biz", p), r = ParseJs.getQuery("mid", p), e = ParseJs.getQuery("idx", p)),
                a.vid) {
                var l = "#WXPLAYABLEVIDEO" + t.videoLen++, c = ($(l), 0);
                c = 1 * a.is_top_stories ? 7 : 5 == a.item_show_type ? 4 : 0;
                var d = {
                    page: t.videoPage,
                    ins: new V_INFO.mpVideoPlayer({
                        fromid: "123" == t.getAppmsgScene() ? 118 : 119,
                        ori_status: a.ori_status,
                        is_mp_video: a.txvideo_vid ? 0 : a.is_mp_video,
                        oriVid: a.vid,
                        vid: a.txvideo_vid ? a.txvideo_vid : a.vid,
                        ckey: a.ckey,
                        width: i,
                        height: playableVideoHeight,
                        scene_type: c,
                        container: l,
                        hit_bizuin: a.hit_bizuin,
                        hit_vid: a.hit_vid,
                        __biz: n || "",
                        mid: r || "",
                        idx: e || "",
                        jsapiFullScreen: !1,
                        canShareVideo: !1,
                        pauseShowControll: !1,
                        checkNoPaid: !0,
                        openArticle: function () {
                            openUrl(p, 0, $(".video_card").children());
                        },
                        onBeginPlay: function () {
                            t.playingVideo = d, d.page < t.videoPage && monitorReport(0);
                        },
                        onUserplay: function () {
                            t.playingVideo = d;
                        }
                    })
                };
                o.push(d);
            }
        }), t.currentVideoList = o;
    }, ProfileHistory.prototype._reportCurrentList = function () {
        this.playingVideo && this.playingVideo.ins && this.playingVideo.ins.pause(), $.each(this.currentVideoList, function (e, t) {
            var i = t.ins;
            i.mpVideoReport({
                async: !0
            });
        });
    }, ProfileHistory.prototype._destroyCurrentVideoList = function () {
        this.currentVideoList && $.each(this.currentVideoList, function (e, t) {
            t.ins.destroy();
        });
    }, ProfileHistory.prototype._processList = function (e) {
        var t = this, i = "";
        t.getAppmsgScene && "function" == typeof t.getAppmsgScene && (i = t.getAppmsgScene());
        for (var o = 0; o < e.length; o++) {
            if (e[o].comm_msg_info && e[o].comm_msg_info.content) {
                for (var s = e[o].comm_msg_info.content.replace(/\\n/g, "<br>"), n = s.split("&lt;/a&gt;"), r = [], a = 0, p = n.length; p > a; a++)r.push(n[a].replace(/&lt;a(.*?)href=&quot;([^"]*)&quot;(.*?)&gt;/g, '<a href="$2">'));
                e[o].comm_msg_info.content = r.join("</a>");
            }
            if (e[o].app_msg_ext_info && e[o].app_msg_ext_info.digest && (e[o].app_msg_ext_info.digest = e[o].app_msg_ext_info.digest.replace(/\\n/g, "<br>")),
                e[o].app_msg_ext_info && e[o].app_msg_ext_info.title && 10 == e[o].app_msg_ext_info.item_show_type && (e[o].app_msg_ext_info.title = e[o].app_msg_ext_info.title.replace(/<(\/?)(?!((a(\s|>))|(\/a))).*?>/g, function (e) {
                    return e.html(!0);
                }).replace(/\\n/g, "<br>")), e[o].comm_msg_info && 49 == e[o].comm_msg_info.type && 9 == e[o].app_msg_ext_info.subtype) {
                e[o].app_msg_ext_info.cover = e[o].app_msg_ext_info.cover.nogif(), e[o].app_msg_ext_info.cover = e[o].app_msg_ext_info.cover.replace(/tp=webp/g, ""),
                    i && (e[o].app_msg_ext_info.content_url = e[o].app_msg_ext_info.content_url.replace("scene=27", "scene=" + i)),
                    t.addToAppmsgUrl && (e[o].app_msg_ext_info.content_url = addToUrl(e[o].app_msg_ext_info.content_url, t.addToAppmsgUrl));
                for (var l = e[o].app_msg_ext_info.multi_app_msg_item_list.length, a = 0; l > a; a++) {
                    var c = e[o].app_msg_ext_info.multi_app_msg_item_list[a];
                    c.cover = c.cover.nogif(), c.cover = c.cover.replace(/tp=webp/g, ""), i && (c.content_url = c.content_url.replace("scene=27", "scene=" + i)),
                        t.addToAppmsgUrl && (c.content_url = addToUrl(c.content_url, t.addToAppmsgUrl));
                }
            }
        }
        return e;
    }, ProfileHistory.prototype._textJump = function (e) {
        var t = $(e).parent(".js_appmsg"), i = t.attr("hrefs");
        i && openUrl(i, 10, t);
    }, ProfileHistory.prototype._imgOpen = function (e) {
        var t = $(e).parent(".js_appmsg"), i = t.attr("hrefs");
        if (!i) {
            var o = $(e).children("img"), s = o.data("msgid");
            if (s && this.uin && this.key && this.biz) {
                var i = o.attr("data-cdnsrc");
                if (!i) return !1;
                JSAPI.invoke("imagePreview", {
                    current: i,
                    urls: [i]
                });
            }
            return !1;
        }
        openUrl(i, 8, t);
    }, ProfileHistory.prototype._voicePlay = function (e) {
        var t = $(e).parent(".js_appmsg").find("audio"), i = t.data("time"), o = $(e).parent(".js_appmsg");
        if (o.hasClass("playing")) o.removeClass("playing"), t && t[0].pause(); else {
            var s = $("body").find(".playing");
            s.length && (s.removeClass("playing"), s.find("audio")[0].pause()), o.addClass("playing"),
                t && t[0].play();
        }
        t && t[0].addEventListener("timeupdate", function () {
            t[0].currentTime >= i && $("body").find(".playing").removeClass("playing");
        }, !1);
    }, ProfileHistory.prototype._voiceJump = function (e) {
        var t = $(e).parent(".js_appmsg"), i = t.attr("hrefs");
        i && openUrl(i, 7, t);
    }, ProfileHistory.prototype._videoJump = function (e) {
        var t = $(e).parents(".js_video"), i = $(e).parent().attr("id");
        if (!t.hasClass("js_not_jump")) {
            var o = t.attr("hrefs");
            o && openUrl(o, 5, t, this.rawData[i]);
        }
    }, ProfileHistory.prototype._appmsgJump = function (e) {
        var t = $(e).parent(".js_appmsg"), i = t.attr("hrefs");
        i && openUrl(i, 0, t);
    }, ProfileHistory;
}); define("common/color/dark.js", [], function () {
    "use strict";
    return {
        "BG-0": "#111111",
        "BG-1": "#1e1e1e",
        "BG-2": "#191919",
        "BG-3": "#202020",
        "BG-4": "#404040",
        "BG-5": "#2c2c2c",
        "FG-0": "rgba(255, 255, 255, 0.8)",
        "FG-HALF": "rgba(255, 255, 255, 0.6)",
        "FG-1": "rgba(255, 255, 255, 0.5)",
        "FG-2": "rgba(255, 255, 255, 0.3)",
        "FG-3": "rgba(255, 255, 255, 0.05)",
        RED: "#fa5151",
        ORANGE: "#c87d2f",
        YELLOW: "#cc9c00",
        GREEN: "#74a800",
        LIGHTGREEN: "#3eb575",
        BRAND: "#07c160",
        BLUE: "#10aeff",
        INDIGO: "#1196ff",
        PURPLE: "#8183ff",
        WHITE: "rgba(255, 255, 255, 0.8)",
        LINK: "#7d90a9",
        TEXTGREEN: "#259c5c",
        FG: "white",
        BG: "black",
        "TAG-TEXT-ORANGE": "rgba(250, 157, 59, 0.6)",
        "TAG-BACKGROUND-ORANGE": "rgba(250, 157, 59, 0.1)",
        "TAG-TEXT-GREEN": "rgba(6, 174, 86, 0.6)",
        "TAG-BACKGROUND-GREEN": "rgba(6, 174, 86, 0.1)",
        "TAG-TEXT-BLUE": "rgba(16, 174, 255, 0.6)",
        "TAG-BACKGROUND-BLUE": "rgba(16, 174, 255, 0.1)",
        "TAG-TEXT-BLACK": "rgba(255, 255, 255, 0.5)",
        "TAG-BACKGROUND-BLACK": "rgba(255, 255, 255, 0.05)"
    };
}); define("common/color/light.js", [], function () {
    "use strict";
    return {
        "BG-0": "#ededed",
        "BG-1": "#f7f7f7",
        "BG-2": "#fff",
        "BG-3": "#f7f7f7",
        "BG-4": "#4c4c4c",
        "BG-5": "#fff",
        "FG-0": "rgba(0, 0, 0, 0.9)",
        "FG-HALF": "rgba(0, 0, 0, 0.9)",
        "FG-1": "rgba(0, 0, 0, 0.5)",
        "FG-2": "rgba(0, 0, 0, 0.3)",
        "FG-3": "rgba(0, 0, 0, 0.1)",
        RED: "#fa5151",
        ORANGE: "#fa9d3b",
        YELLOW: "#ffc300",
        GREEN: "#91d300",
        LIGHTGREEN: "#95ec69",
        BRAND: "#07c160",
        BLUE: "#10aeff",
        INDIGO: "#1485ee",
        PURPLE: "#6467f0",
        WHITE: "#fff",
        LINK: "#576b95",
        TEXTGREEN: "#06ae56",
        FG: "black",
        BG: "white",
        "TAG-TEXT-ORANGE": "#fa9d3b",
        "TAG-BACKGROUND-ORANGE": "rgba(250, 157, 59, 0.1)",
        "TAG-TEXT-GREEN": "#06ae56",
        "TAG-BACKGROUND-GREEN": "rgba(6, 174, 86, 0.1)",
        "TAG-TEXT-BLUE": "#10aeff",
        "TAG-BACKGROUND-BLUE": "rgba(16, 174, 255, 0.1)",
        "TAG-TEXT-BLACK": "rgba(0, 0, 0, 0.5)",
        "TAG-BACKGROUND-BLACK": "rgba(0, 0, 0, 0.05)"
    };
}); define("biz_wap/zepto/event.js", ["biz_wap/zepto/zepto.js"], function (e) {
    "use strict";
    e("biz_wap/zepto/zepto.js"), function (e) {
        function n(e) {
            return e._zid || (e._zid = d++);
        }
        function t(e, t, o, u) {
            if (t = r(t), t.ns) var a = i(t.ns);
            return (g[n(e)] || []).filter(function (e) {
                return !(!e || t.e && e.e != t.e || t.ns && !a.test(e.ns) || o && n(e.fn) !== n(o) || u && e.sel != u);
            });
        }
        function r(e) {
            var n = ("" + e).split(".");
            return {
                e: n[0],
                ns: n.slice(1).sort().join(" ")
            };
        }
        function i(e) {
            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)");
        }
        function o(e, n) {
            return e.del && !y && e.e in E || !!n;
        }
        function u(e) {
            return b[e] || y && E[e] || e;
        }
        function a(t, i, a, s, f, d, l) {
            var v = n(t), h = g[v] || (g[v] = []);
            i.split(/\s/).forEach(function (n) {
                if ("ready" == n) return e(document).ready(a);
                var i = r(n);
                i.fn = a, i.sel = f, i.e in b && (a = function (n) {
                    var t = n.relatedTarget;
                    return !t || t !== this && !e.contains(this, t) ? i.fn.apply(this, arguments) : void 0;
                }), i.del = d;
                var v = d || a;
                i.proxy = function (e) {
                    if (e = c(e), !e.isImmediatePropagationStopped()) {
                        e.customData = s;
                        var n = v.apply(t, e._args == p ? [e] : [e].concat(e._args));
                        return n === !1 && (e.preventDefault(), e.stopPropagation()), n;
                    }
                }, i.i = h.length, h.push(i), "addEventListener" in t && t.addEventListener(u(i.e), i.proxy, o(i, l));
            });
        }
        function s(e, r, i, a, s) {
            var c = n(e);
            (r || "").split(/\s/).forEach(function (n) {
                t(e, n, i, a).forEach(function (n) {
                    delete g[c][n.i], "removeEventListener" in e && e.removeEventListener(u(n.e), n.proxy, o(n, s));
                });
            });
        }
        function c(n, t) {
            return (t || !n.isDefaultPrevented) && (t || (t = n), e.each(_, function (e, r) {
                var i = t[e];
                n[e] = function () {
                    return this[r] = P, i && i.apply(t, arguments);
                }, n[r] = z;
            }), (t.defaultPrevented !== p ? t.defaultPrevented : "returnValue" in t ? t.returnValue === !1 : t.getPreventDefault && t.getPreventDefault()) && (n.isDefaultPrevented = P)),
                n;
        }
        function f(e) {
            var n, t = {
                originalEvent: e
            };
            for (n in e) w.test(n) || e[n] === p || (t[n] = e[n]);
            return c(t, e);
        }
        var p, d = (e.zepto.qsa, 1), l = Array.prototype.slice, v = e.isFunction, h = function (e) {
            return "string" == typeof e;
        }, g = {}, m = {}, y = "onfocusin" in window, E = {
            focus: "focusin",
            blur: "focusout"
        }, b = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        m.click = m.mousedown = m.mouseup = m.mousemove = "MouseEvents", e.event = {
            add: a,
            remove: s
        }, e.proxy = function (t, r) {
            if (v(t)) {
                var i = function () {
                    return t.apply(r, arguments);
                };
                return i._zid = n(t), i;
            }
            if (h(r)) return e.proxy(t[r], t);
            throw new TypeError("expected function");
        }, e.fn.bind = function (e, n, t) {
            return this.on(e, n, t);
        }, e.fn.unbind = function (e, n) {
            return this.off(e, n);
        }, e.fn.one = function (e, n, t, r) {
            return this.on(e, n, t, r, 1);
        };
        var P = function () {
            return !0;
        }, z = function () {
            return !1;
        }, w = /^([A-Z]|returnValue$|layer[XY]$)/, _ = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        e.fn.delegate = function (e, n, t) {
            return this.on(n, e, t);
        }, e.fn.undelegate = function (e, n, t) {
            return this.off(n, e, t);
        }, e.fn.live = function (n, t) {
            return e(document.body).delegate(this.selector, n, t), this;
        }, e.fn.die = function (n, t) {
            return e(document.body).undelegate(this.selector, n, t), this;
        }, e.fn.on = function (n, t, r, i, o) {
            var u, c, d = this;
            return n && !h(n) ? (e.each(n, function (e, n) {
                d.on(e, t, r, n, o);
            }), d) : (h(t) || v(i) || i === !1 || (i = r, r = t, t = p), (v(r) || r === !1) && (i = r, r = p), i === !1 && (i = z),
                d.each(function (p, d) {
                    o && (u = function (e) {
                        return s(d, e.type, i), i.apply(this, arguments);
                    }), t && (c = function (n) {
                        var r, o = e(n.target).closest(t, d).get(0);
                        return o && o !== d ? (r = e.extend(f(n), {
                            currentTarget: o,
                            liveFired: d
                        }), (u || i).apply(o, [r].concat(l.call(arguments, 1)))) : void 0;
                    }), a(d, n, i, r, t, c || u);
                }));
        }, e.fn.off = function (n, t, r) {
            var i = this;
            return n && !h(n) ? (e.each(n, function (e, n) {
                i.off(e, t, n);
            }), i) : (h(t) || v(r) || r === !1 || (r = t, t = p), r === !1 && (r = z), i.each(function () {
                s(this, n, r, t);
            }));
        }, e.fn.trigger = function (n, t) {
            return n = h(n) || e.isPlainObject(n) ? e.Event(n) : c(n), n._args = t, this.each(function () {
                "dispatchEvent" in this ? this.dispatchEvent(n) : e(this).triggerHandler(n, t);
            });
        }, e.fn.triggerHandler = function (n, r) {
            var i, o;
            return this.each(function (u, a) {
                i = f(h(n) ? e.Event(n) : n), i._args = r, i.target = a, e.each(t(a, n.type || n), function (e, n) {
                    return o = n.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0;
                });
            }), o;
        }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (n) {
            e.fn[n] = function (e) {
                return e ? this.bind(n, e) : this.trigger(n);
            };
        }), ["focus", "blur"].forEach(function (n) {
            e.fn[n] = function (e) {
                return e ? this.bind(n, e) : this.each(function () {
                    try {
                        this[n]();
                    } catch (e) { }
                }), this;
            };
        }), e.Event = function (e, n) {
            h(e) || (n = e, e = n.type);
            var t = document.createEvent(m[e] || "Events"), r = !0;
            if (n) for (var i in n) "bubbles" == i ? r = !!n[i] : t[i] = n[i];
            return t.initEvent(e, r, !0), c(t);
        };
    }(Zepto);
}); define("biz_wap/zepto/fx_methods.js", ["biz_wap/zepto/fx.js"], function (n) {
    "use strict";
    n("biz_wap/zepto/fx.js"), function (n, t) {
        function i(i, s, e, o, f) {
            "function" != typeof s || f || (f = s, s = t);
            var c = {
                opacity: e
            };
            return o && (c.scale = o, i.css(n.fx.cssPrefix + "transform-origin", "0 0")), i.animate(c, s, null, f);
        }
        function s(t, s, e, o) {
            return i(t, s, 0, e, function () {
                f.call(n(this)), o && o.call(this);
            });
        }
        var e = window.document, o = (e.documentElement, n.fn.show), f = n.fn.hide, c = n.fn.toggle;
        n.fn.show = function (n, s) {
            return o.call(this), n === t ? n = 0 : this.css("opacity", 0), i(this, n, 1, "1,1", s);
        }, n.fn.hide = function (n, i) {
            return n === t ? f.call(this) : s(this, n, "0,0", i);
        }, n.fn.toggle = function (i, s) {
            return i === t || "boolean" == typeof i ? c.call(this, i) : this.each(function () {
                var t = n(this);
                t["none" == t.css("display") ? "show" : "hide"](i, s);
            });
        }, n.fn.fadeTo = function (n, t, s) {
            return i(this, n, t, null, s);
        }, n.fn.fadeIn = function (n, t) {
            var i = this.css("opacity");
            return i > 0 ? this.css("opacity", 0) : i = 1, o.call(this).fadeTo(n, i, t);
        }, n.fn.fadeOut = function (n, t) {
            return s(this, n, null, t);
        }, n.fn.fadeToggle = function (t, i) {
            return this.each(function () {
                var s = n(this);
                s[0 == s.css("opacity") || "none" == s.css("display") ? "fadeIn" : "fadeOut"](t, i);
            });
        };
    }(Zepto);
});