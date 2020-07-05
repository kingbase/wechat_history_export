// https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/device4830e1.js,/mmbizwap/zh_CN/htmledition/js/pages/video_plugin/base42f400.js,/mmbizwap/zh_CN/htmledition/js/pages/video_ctrl42f400.js,/mmbizwap/zh_CN/htmledition/js/a/a_config4e7d32.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/openUrl4402ec.js,/mmbizwap/zh_CN/htmledition/js/biz_common/dom/class42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report42f400.js,/mmbizwap/zh_CN/htmledition/js/pages/audition_tpl.html47a8e6.js,/mmbizwap/zh_CN/htmledition/js/common/comm_report4ec350.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/wapsdk4c4c98.js,/mmbizwap/zh_CN/htmledition/js/pages/create_txv4c7460.js,/mmbizwap/zh_CN/htmledition/js/pages/video_error.html49b95f.js,/mmbizwap/zh_CN/htmledition/js/biz_common/tmpl4eefa0.js,/mmbizwap/zh_CN/htmledition/js/new_video/ctl4a46b1.js,/mmbizwap/zh_CN/htmledition/js/new_video/player4eefa0.js,/mmbizwap/zh_CN/htmledition/js/new_video/plugin/ad4c4c98.js?v=1003
define("biz_wap/utils/device.js", [], function () {
    "use strict";
    function s(s) {
        {
            var e = s.match(/MQQBrowser\/(\d+\.\d+)/i), r = s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i) || s.match(/V1_AND_SQ_([\d\.]+)/), i = s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || s.match(/MicroMessenger\/((\d+)\.(\d+))/), t = s.match(/Mac\sOS\sX\s(\d+[\.|_]\d+)/), n = s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/), a = s.match(/Linux\s/), d = s.match(/MiuiBrowser\/(\d+\.\d+)/i), h = s.match(/MI-ONE/), c = s.match(/MI PAD/), w = s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || s.match(/\sUC\s/), u = s.match(/IEMobile(\/|\s+)(\d+\.\d+)/) || s.match(/WPDesktop/), b = s.match(/(ipod).*\s([\d_]+)/i), p = s.match(/(ipad).*\s([\d_]+)/i), v = s.match(/(iphone)\sos\s([\d_]+)/i), m = s.match(/Chrome\/(\d+\.\d+)/), f = s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/), l = s.match(/(android)\s([\d\.]+)/i);
            s.indexOf("HTC") > -1;
        }
        if (o.browser = o.browser || {}, o.os = o.os || {}, window.ActiveXObject) {
            var M = 6;
            (window.XMLHttpRequest || s.indexOf("MSIE 7.0") > -1) && (M = 7), (window.XDomainRequest || s.indexOf("Trident/4.0") > -1) && (M = 8),
                s.indexOf("Trident/5.0") > -1 && (M = 9), s.indexOf("Trident/6.0") > -1 && (M = 10), o.browser.ie = !0,
                o.browser.version = M;
        } else s.indexOf("Trident/7.0") > -1 && (o.browser.ie = !0, o.browser.version = 11);
        l && (this.os.android = !0, this.os.version = l[2]), b && (this.os.ios = this.os.ipod = !0, this.os.version = b[2].replace(/_/g, ".")),
            p && (this.os.ios = this.os.ipad = !0, this.os.version = p[2].replace(/_/g, ".")), v && (this.os.iphone = this.os.ios = !0,
                this.os.version = v[2].replace(/_/g, ".")), n && (this.os.windows = !0, this.os.version = n[2]),
            t && (this.os.Mac = !0, this.os.version = t[1]), a && (this.os.Linux = !0), s.indexOf("lepad_hls") > 0 && (this.os.LePad = !0),
            c && (this.os.MIPAD = !0), e && (this.browser.MQQ = !0, this.browser.version = e[1]), r && (this.browser.MQQClient = !0,
                this.browser.version = r[1]), i && (this.browser.WeChat = !0, this.browser.mmversion = this.browser.version = i[1]),
            d && (this.browser.MIUI = !0, this.browser.version = d[1]), w && (this.browser.UC = !0, this.browser.version = w[1] || 0 / 0),
            u && (this.browser.IEMobile = !0, this.browser.version = u[2]), f && (this.browser.AndriodBrowser = !0),
            h && (this.browser.M1 = !0), m && (this.browser.Chrome = !0, this.browser.version = m[1]), this.os.windows && (this.os.win64 = "undefined" != typeof navigator.platform && "win64" == navigator.platform.toLowerCase() ? !0 : !1),
            (this.os.Mac || this.os.windows || this.os.Linux) && (this.os.pc = !0);
        var g = {
            iPad7: "iPad; CPU OS 7",
            LePad: "lepad_hls",
            XiaoMi: "MI-ONE",
            SonyDTV: "SonyDTV",
            SamSung: "SAMSUNG",
            HTC: "HTC",
            VIVO: "vivo"
        };
        for (var O in g) this.os[O] = -1 !== s.indexOf(g[O]);
        o.os.phone = o.os.phone || /windows phone/i.test(s), this.os.getNumVersion = function () {
            return parseFloat(o.os.version, "10");
        }, this.os.hasTouch = "ontouchstart" in window, this.os.hasTouch && this.os.ios && this.os.getNumVersion() < 6 && (this.os.hasTouch = !1),
            o.browser.WeChat && o.browser.version < 5 && (this.os.hasTouch = !1), o.browser.getNumVersion = function () {
                return parseFloat(o.browser.version, "10");
            }, o.browser.isFFCanOcx = function () {
                return o.browser.firefox && o.browser.getNumVersion() >= 3 ? !0 : !1;
            }, o.browser.isCanOcx = function () {
                return !(!o.os.windows || !o.browser.ie && !o.browser.isFFCanOcx() && !o.browser.webkit);
            }, o.browser.isNotIESupport = function () {
                return !!o.os.windows && (!!o.browser.webkit || o.browser.isFFCanOcx());
            }, o.userAgent = {}, o.userAgent.browserVersion = o.browser.version, o.userAgent.osVersion = o.os.version,
            delete o.userAgent.version;
    }
    var o = {};
    s.call(o, window.navigator.userAgent);
    var e = function () {
        var s = window.navigator.userAgent, e = null;
        if (o.os.android) {
            if (o.browser.MQQ && o.browser.getNumVersion() >= 4.2) return !0;
            if (-1 != s.indexOf("MI2")) return !0;
            if (o.os.version >= "4" && (e = s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)) && e[1] >= 4.2) return !0;
            if (o.os.version >= "4.1") return !0;
        }
        return !1;
    }(), r = function () {
        var s = document.createElement("video");
        if ("function" == typeof s.canPlayType) {
            if ("probably" == s.canPlayType('video/mp4; codecs="mp4v.20.8"')) return !0;
            if ("probably" == s.canPlayType('video/mp4; codecs="avc1.42E01E"') || "probably" == s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) return !0;
        }
        return !1;
    }(), i = function () {
        return console.info("[canSupportAutoPlay]", o.os.ios, o.os.getNumVersion()), o.os.ios && o.os.getNumVersion() < 10 ? !1 : !0;
    }();
    return o.canSupportVideo = r || e, o.canSupportVideoMp4 = r, o.canSupportH5Video = e, o.canSupportAutoPlay = i,
        o;
}); define("pages/video_plugin/base.js", [], function () {
    "use strict";
    var t = 0, e = function (t, e) {
        var n = function () { };
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.uber = e.prototype;
    }, n = function () {
        this.player = null;
    };
    return n.prototype.setPlayer = function (t) {
        this.player = t;
    }, n.prototype.setBlockEvt = function (t) {
        this.player._setBlockPlugin(t, this);
    }, n.prototype.setUnblockEvt = function (t) {
        this.player._setBlockPlugin(t, null);
    }, n.prototype.recv = function (e) {
        var n = this[e + "Handler"];
        if ("function" == typeof n) {
            var o = n.apply(this, arguments);
            return "undefined" == typeof o || null === o ? t : o;
        }
        return t;
    }, {
        Class: n,
        inherit: e,
        BASE_BITSET: t
    };
}); define("pages/video_ctrl.js", [], function () {
    "use strict";
    function n(n) {
        n = n || window;
        var i = n.cgiData;
        return i && 2 == i.ori_status && 1 == i.is_mp_video && (i.nick_name || i.hit_username) ? !0 : !1;
    }
    function i(n) {
        return n = n || window, !1;
    }
    function e() {
        return -1 != r.indexOf("&vl=1") ? !1 : "54" == parent.window.appmsg_type ? !1 : !0;
    }
    function t() {
        return -1 != r.indexOf("&dd=1") ? !1 : "54" == parent.window.appmsg_type ? !1 : !0;
    }
    function o() {
        var n;
        if (parent == window) n = window; else try {
            {
                parent.window.__videoDefaultRatio;
            }
            n = parent.window;
        } catch (i) {
            n = window;
        }
        var e = n.__videoDefaultRatio || 16 / 9;
        return "54" == n.appmsg_type ? e : e;
    }
    var r = window.location.href;
    return {
        showPauseTips: t,
        showVideoLike: e,
        showVideoDetail: i,
        showReprint: n,
        getRatio: o
    };
}); define("a/a_config.js", [], function () {
    "use strict";
    var _ = {
        ANDROID_APP_PRODUCT_TYPE: 12,
        IOS_APP_PRODUCT_TYPE: 19,
        ADD_CONTACT_PRODUCT_TYPE: 23,
        MINI_GAME_PRODUCT_TYPE: 46,
        CARD_PRODUCT_TYPE: 36,
        SHOP_PRODUCT_TYPE: 30,
        WECHATCARD_PRODUCT_TYPE: 47,
        BRAND_WECHAT_PRODUCT_TYPE: 29,
        BRAND_GDT_PRODUCT_TYPE: 31
    }, e = {
        POS_BOTTOM: 0,
        POS_MID: 4,
        POS_SPONSOR: 3,
        POS_AD_BEFORE_VIDEO: 7,
        POS_AD_AFTER_VIDEO: 9
    }, a = {
        AD_DEST_TYPE: 0,
        OUTER_DEST_TYPE: 1,
        APPDETAIL_DEST_TYPE: 2,
        BIZ_DEST_TYPE: 3,
        APPINFO_PAGE_DEST_TYPE: 4,
        WECHAT_SHOP_DEST_TYPE: 5,
        WECHAT_APPLET_DEST_TYPE: 6,
        LEAF_DEST_TYPE: 7,
        CANVAS_AD_DEST_TYPE: 9
    }, t = function () {
        var _ = 18e4;
        return window.user_uin && !isNaN(parseInt(window.user_uin, 10)) && (parseInt(window.user_uin, 10) % 10 === 2 || parseInt(window.user_uin, 10) % 10 === 3) && (_ = 3e4),
            console.info("[广告时间缓存实验]", _), _;
    }(), o = ["openUrlWithExtraWebview", "openADCanvas", "addContact", "profile", "getInstallState", "installDownloadTask", "addDownloadTask", "pauseDownloadTask", "resumeDownloadTask", "queryDownloadTask", "launchApplication", "writeCommData", "adDataReport", "downloadAppInternal", "wxdownload:progress_change", "menu:share:appmessage", "menu:share:timeline", "menu:share:weibo", "menu:share:facebook", "menu:general:share", "launch3rdApp", "addDownloadTaskStraight", "sendAppMessage", "shareTimeline", "getNetworkType", "jumpToBizProfile", "shareWeibo", "shareFB", "imagePreview", "getBackgroundAudioState", "openWeApp", "preloadMiniProgramContacts", "preloadMiniProgramEnv", "calRqt", "openCardDetail", "batchAddCard", "handleMPPageAction", "makePhoneCall", "getOAID", "saveWaid", "batchPreloadMiniProgram", "onScreenShot", "handleAdAction", "activity:state_change"], p = ["/mp/advertisement_report", "/mp/ad_report", "/mp/ad_video_report", "/mp/jsmonitor", "/mp/ad_complaint", "/mp/jsreport", "/tp/datacenter/report", "/mp/getappmsgad", "/mp/ad_biz_info"], A = [/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/advertisement_report/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_report/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_video_report/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsmonitor/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_complaint/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsreport/, /(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datacenter\/report/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad/, /(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_biz_info/, /(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/goods_info/, /(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/app_mobile/, /(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datareport\/report/, /(https?:)?\/\/mp\.weixin\.qq\.com\/promotion\/wxalandpage\/getcanvasinfo/];
    return {
        AD_TYPE: _,
        AD_POS: e,
        AD_CACHE_TIME: t,
        AD_DEST_TYPE: a,
        AD_FRAME_DOMAIN: "https://wxa.wxs.qq.com",
        INVALID_METHOD_NAME_MSG_PREFIX: "Invalid methodName",
        INVALID_METHOD_TYPE_MSG_PREFIX: "Invalid methodType",
        INVALID_ARGS_MSG_PREFIX: "Invalid args",
        INVALID_REQ_PATH_MSG_PREFIX: "Invalid request path",
        AD_IFRAME_HIDE_CLASS: "iframe_ad_dn",
        AD_JSAPI_WHITE_LIST: o,
        AD_REQ_PATH_WHITE_LIST: p,
        AD_WEB_COMPT_REQ_PATH_WHITE_LIST: A,
        ORIGIN_VIDEO_VID_PREFIX: "wxv",
        AD_VIDEO_END_ACTION: "adVideoEnd",
        AD_VIDEO_PLAY_ACTION: "onVideoPlayV2",
        AD_PLAY_VIDEO_ACTION: "playVideoV2",
        GET_APPMSGAD_READY_STATUS_ACTION: "getAppmsgadReadyStatus",
        APPMSGAD_READY_ACTION: "appmsgadReady",
        HAS_AD_DATA_QUERY_KEY: "has_ad_data",
        GET_AD_DATA_AFTER_VIDEO_ACTION_NAME: "getAdDataAfterVideo",
        SET_PAGE_DATA_ACTION_NAME: "setPageDataV2",
        SEND_AD_VID_ACTION: "sendAdVid",
        GET_AD_VID_ACTION: "getAdVid"
    };
}); define("biz_wap/utils/openUrl.js", ["biz_wap/jsapi/core.js"], function (e) {
    "use strict";
    function r(e) {
        var r = document.createElement("a");
        return r.href = e, {
            source: e,
            protocol: r.protocol.replace(":", ""),
            host: r.hostname,
            port: r.port,
            query: r.search,
            params: function () {
                for (var e, t = {}, a = r.search.replace(/^\?/, "").split("&"), o = a.length, n = 0; o > n; n++)a[n] && (e = a[n].split("="),
                    t[e[0]] = e[1]);
                return t;
            }(),
            file: (r.pathname.match(/([^\/?#]+)$/i) || [, ""])[1],
            hash: r.hash.replace("#", ""),
            path: r.pathname.replace(/^([^\/])/, "/$1"),
            relative: (r.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
            segments: r.pathname.replace(/^\//, "").split("/")
        };
    }
    function t(e, t) {
        var o;
        t = t || 1, 0 == e.indexOf("/") && (o = r(location.href), e = o.protocol + "://" + o.host + e, console.log("openUrlWithExtraWebview with relative path:", e)),
            e = e.replace(/(#[^#]*)+/, function (e, r) {
                return r;
            }), a.invoke("openUrlWithExtraWebview", {
                url: e,
                openType: t
            }, function (r) {
                -1 == r.err_msg.indexOf("ok") && (location.href = e);
            });
    }
    var a = e("biz_wap/jsapi/core.js");
    return {
        openUrlWithExtraWebview: t
    };
}); define("biz_common/dom/class.js", [], function () {
    "use strict";
    function s(s, a) {
        return s.classList ? s.classList.contains(a) : s.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"));
    }
    function a(s, a) {
        s.classList ? s.classList.add(a) : this.hasClass(s, a) || (s.className += " " + a);
    }
    function e(a, e) {
        if (a.classList) a.classList.remove(e); else if (s(a, e)) {
            var c = new RegExp("(\\s|^)" + e + "(\\s|$)");
            a.className = a.className.replace(c, " ");
        }
    }
    function c(c, l) {
        s(c, l) ? e(c, l) : a(c, l);
    }
    return {
        hasClass: s,
        addClass: a,
        removeClass: e,
        toggleClass: c
    };
}); define("biz_common/utils/report.js", [], function () {
    "use strict";
    return function (n) {
        var e = new Image;
        e.src = n;
    };
}); define("pages/audition_tpl.html.js", [], function () {
    return '<div id="js_music_dialog">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog">\n        <div class="weui-dialog__bd"><#=msg#></div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:void(0);" class="weui-dialog__btn weui-dialog__btn_primary js_submit">我知道了</a>\n        </div>\n    </div>\n</div>';
}); define("common/comm_report.js", ["biz_wap/utils/ajax.js", "biz_wap/utils/ajax_wx.js", "biz_common/utils/comm_report.js", "biz_wap/jsapi/leaveReport.js"], function (t) {
    "use strict";
    var r = t("biz_wap/utils/ajax.js"), o = t("biz_wap/utils/ajax_wx.js").joinUrl, a = t("biz_common/utils/comm_report.js"), e = t("biz_wap/jsapi/leaveReport.js");
    return {
        report: function (t, o, e) {
            a.report("wap", r, t, o, e);
        },
        leaveReport: function (t, r) {
            e.addReport(function () {
                return {
                    reportUrl: o("https://mp.weixin.qq.com" + a.getUrl("wap", "report")),
                    reportData: a.getData(t, r),
                    method: "POST"
                };
            });
        }
    };
}); define("biz_wap/utils/wapsdk.js", ["biz_common/utils/wxgspeedsdk.js", "biz_wap/utils/jsmonitor_report.js"], function (s) {
    "use strict";
    function e(s) {
        var e = .001;
        "number" == typeof s.sample && (e = s.sample);
        var i = Math.random();
        e > i && n.saveSpeeds(s);
    }
    function i(s) {
        var e = s.sample || .001, i = Math.random();
        e > i && n.setBasicTime(s);
    }
    function t() {
        n.send();
    }
    function a(s) {
        var s = s || [];
        if (!s.length) {
            var e = s;
            s = [], s.push(e);
        }
        for (var i = 0; i < s.length; i++) {
            var e = s[i], t = e.id, a = e.key, n = e.value || 1;
            void 0 !== t && void 0 !== a && o.setSum(t, a, n);
        }
    }
    var n = s("biz_common/utils/wxgspeedsdk.js"), o = s("biz_wap/utils/jsmonitor_report.js");
    return {
        saveSpeeds: e,
        setBasicTime: i,
        send: t,
        jsmonitor: a
    };
}); define("pages/create_txv.js", ["biz_wap/utils/jsmonitor_report.js", "biz_wap/utils/ajax_load_js.js", "pages/loadscript.js"], function (e) {
    "use strict";
    function o() {
        "function" != typeof window.__createTxVideo && (window.__createTxVideo = function (e) {
            n(e);
        });
    }
    function n(e) {
        var o = function () { }, n = function () { };
        "function" == typeof e.onSuccess && (n = e.onSuccess), "function" == typeof e.onError && (o = e.onError),
            r.Load({
                url: a.jsUrl,
                version: a.jsVersion,
                useCache: !0,
                win: e.win,
                onSuccess: function (s) {
                    2 != s.code && 3 != s.code || 0 != s.queueIndex || (i.setSum("64728", "111", 1), i.setSum("64728", "112", 1));
                    var u = e.win || window, c = !0;
                    if (u.Txp && "function" == typeof u.Txp.Player ? (c = !0, 0 == s.queueIndex && (2 == s.code ? i.setSum("64728", "116", 1) : 3 == s.code && i.setSum("64728", "117", 1))) : (c = !1,
                        0 == s.queueIndex && (2 == s.code ? i.setSum("64728", "114", 1) : 3 == s.code && i.setSum("64728", "115", 1))),
                        c) {
                        var d = t({
                            win: u,
                            options: e
                        });
                        n({
                            player: d
                        });
                    } else r.ClearCache({
                        win: u,
                        version: a.jsVersion,
                        url: a.jsUrl
                    }), o();
                },
                onError: function (o) {
                    0 == o.queueIndex && (i.setSum("64728", "111", 1), i.setSum("64728", "118", 1), 51 == o.code ? i.setSum("64728", "119", 1) : 52 == o.code ? i.setSum("64728", "120", 1) : 53 == o.code && i.setSum("64728", "121", 1)),
                        s(e);
                }
            });
    }
    function t(e) {
        var o = e.win || window, n = e.options, t = new o.Txp.Player({
            containerId: n.containerId,
            vid: n.vid,
            width: n.width,
            height: n.height,
            autoplay: n.autoplay === !0 ? !0 : !1,
            allowFullScreen: n.allowFullScreen === !0 ? !0 : !1,
            chid: 17
        });
        return t;
    }
    function s(e) {
        var o = function () { }, n = function () { };
        "function" == typeof e.onSuccess && (n = e.onSuccess), "function" == typeof e.onError && (o = e.onError);
        var s = a.jsUrl;
        s += -1 == s.indexOf("?") ? "?" + a.customerParam + "=" + a.jsVersion : "&" + a.customerParam + "=" + a.jsVersion,
            u({
                win: e.win,
                url: s,
                timeout: 1e4,
                type: "JS",
                callback: function () {
                    i.setSum("64728", "122", 1);
                    var s = e.win || window;
                    if (s.Txp && "function" == typeof s.Txp.Player) {
                        i.setSum("64728", "124", 1);
                        var r = t({
                            win: e.win,
                            options: e
                        });
                        n({
                            player: r
                        });
                    } else i.setSum("64728", "123", 1), o();
                },
                onerror: function (e) {
                    switch (i.setSum("64728", "122", 1), 1 * e) {
                        case 400:
                            a.jsLoadState = 4, i.setSum("64728", "125", 1);
                            break;

                        case 500:
                            a.jsLoadState = 5, i.setSum("64728", "126", 1);
                            break;

                        default:
                            a.jsLoadState = 6, i.setSum("64728", "127", 1);
                    }
                    o();
                }
            });
    }
    var i = e("biz_wap/utils/jsmonitor_report.js"), r = e("biz_wap/utils/ajax_load_js.js"), u = e("pages/loadscript.js"), a = {
        customerParam: "wxv",
        jsUrl: "//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
        jsVersion: "v1"
    };
    return {
        createTxVideo: n,
        createGlobalFunc: o
    };
}); define("pages/video_error.html.js", [], function () {
    return '<#if(errType==1){#>\n<div style="<#if(typeof width!=\'undefined\'){#>width:<#=width#>px;<#}#><#if(typeof height!=\'undefined\'){#>height:<#=height#>px;<#}#>" class="wrp_pop_tips wx_video_error_box js_error_box">\n   <div class="wx_video_error_msg js_error_area">\n       <p role="heading"><#=msg#></p>\n       <#if(!is_mp_video){#>\n       <i class="wx_video_error_code">错误码：<#=errcode#></i>\n       <#}#>\n       <# if(showBtn){ #>\n       <a class="wx_video_error_msg_btn js_video_errormsg_btn" role="button" href="javascript:void(0);">\n           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAqCAMAAADhynmdAAAAQlBMVEUAAACcnJycnJycnJyoqKicnJycnJycnJycnJycnJyfn5+cnJydnZ2enp6kpKSdnZ2cnJyenp6cnJycnJycnJybm5t8KrXMAAAAFXRSTlMAyeb3CNp3tJRvHIEtJhBgqztWRJ+p5TqGAAABCklEQVQ4y5WTi27DIAxFAUMhgTzX8/+/urB2pdKI0x0pSoRuruyLbf7gF3PBaDE6X44LyY0D1SJQsfd9PpMM/CJx60v8SmV1HMSi1lKyA1n0jnwWSO08l04uJbxpBmTrpDtbGB6fmxC6Tc4BHv9aZDJdJsHW9w43Jez9x8T5M4l31WZsJn2bsYY+nUum2lQkGIVANPZ4FCLWOJImSTgjZE2SkU9crmu57mj9JBc93Qzj9R1d3HSG5bN5MRsnUzcGKK8Ns02z+Da7rYQE4bUE2PG1C6kVnkCyf0pwX8/jwbyxCLhcHpKTFkvkwK3pRmXtRrVFoTGYLvN+t0EUl0qrRaF1pFBz0anp/ptvNB4SY1XDAVMAAAAASUVORK5CYII=" alt="" class="wx_video_error_refresh">\n           刷新       </a>\n       <# } #>\n   </div>\n   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==" class="wx_video_error_loading js_video_errormsg_loading" style="display:none;">\n</div>\n<#}else{#>\n<div style="<#if(typeof width!=\'undefined\'){#>width:<#=width#>px;<#}#><#if(typeof height!=\'undefined\'){#>height:<#=height#>px;<#}#>" class="wx_video_msg_primary js_error_box">\n  <div class="wx_video_msg_primary_inner">\n    <i class="weui-icon-info weui-icon_msg"></i>\n    <p class="wx_video_msg_primary_text"><#=msg#></p>\n  </div>\n</div>\n<#}#>\n';
}); define("biz_common/tmpl.js", [], function () {
    "use strict";
    function n(n, e) {
        ("undefined" == typeof e || null === e) && (e = !0);
        var t = "";
        return t = n.replace(/[\r\t\n]/g, " ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g, "$1\r"),
            t = e ? t.replace(/\t==(.*?)#>/g, "',$1,'").replace(/\t=(.*?)#>/g, "', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'") : t.replace(/\t=(.*?)#>/g, "',$1,'"),
            t = t.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
    }
    var e = function (e, t, r) {
        var p = n(e, r), i = function () { };
        try {
            i = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + p + "');}return p.join('');");
        } catch (u) {
            e = e.replace(/\'/g, "&#39;").replace(/'/g, "&#39;"), p = n(e, r), i = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + p + "');}return p.join('');");
        }
        return i(t);
    }, t = function (n, t, r) {
        var p = document.getElementById(n);
        return p ? e(p.innerHTML, t, r) : "";
    };
    return {
        render: t,
        tmpl: e
    };
}); define("new_video/ctl.js", ["common/comm_report.js", "biz_wap/utils/ajax.js"], function (e) {
    "use strict";
    var i, n = e("common/comm_report.js");
    if (parent == window) i = window; else try {
        {
            parent.window.location.href;
        }
        i = parent.window;
    } catch (r) {
        i = window;
    }
    var t = i.user_uin, a = Math.floor(i.user_uin / 100) % 20;
    t || (a = -1);
    var o = function () {
        return a >= 0;
    };
    i.__webviewid || (i.__webviewid = +new Date + "_" + Math.ceil(1e3 * Math.random()));
    var d = function () {
        var e = i.mid, n = i.idx, r = "";
        r = e && n ? e + "_" + n : "";
        var a = i.__webviewid, o = [t, r, a].join("_");
        return o;
    }, s = function (i) {
        if (20 > a) try {
            var n = i.vid || "", r = {};
            r.__biz = parent.window.biz || "", r.vid = n, r.clienttime = +new Date;
            var t = parent.window.mid, s = parent.window.idx, p = "";
            p = t && s ? t + "_" + s : n, r.type = "undefined" != typeof i.type ? i.type : t && s ? 1 : 2, r.id = p, r.hit_bizuin = i.hit_bizuin || "",
                r.hit_vid = i.hit_vid || "", r.webviewid = d(), r.step = i.step || 0, r.orderid = i.orderid || 0,
                r.ad_source = i.ad_source || 0, r.traceid = i.traceid || 0, r.ext1 = i.ext1 || "", r.ext2 = i.ext2 || "",
                r.r = Math.random(), r.devicetype = parent.window.devicetype, r.version = parent.window.clientversion,
                r.is_gray = o() ? 1 : 0, r.mid = t || "", r.idx = s || "", r.url = parent.window.location.href, r.screen_num = i.screen_num || 0,
                r.screen_height = i.screen_height || 0, r.ori_status = i.ori_status || 3, r.fromid = i.fromid || 0,
                r.sessionid = window.sessionid || "", r.appmsg_scene = window.source || (window.cgiData ? window.cgiData.scene : 0) || 0,
                !r.appmsg_scene && r.fromid ? r.appmsg_scene = r.fromid : !r.fromid && r.appmsg_scene && (r.fromid = r.appmsg_scene),
                r.total_range = i.total_range || 0, r.current_range = i.current_range || 0, r.duration = i.duration || 0;
            var c = e("biz_wap/utils/ajax.js");
            c({
                url: "/mp/ad_video_report?action=user_action",
                type: "post",
                data: r
            });
        } catch (w) { }
    }, p = function (e) {
        try {
            var i = e.vid || "", r = {};
            r.BizUin = parent.window.biz || "", r.Vid = i, r.ClientTime = +new Date;
            var t = parent.window.mid, a = parent.window.idx, s = "";
            s = t && a ? t + "_" + a : i, r.Type = "undefined" != typeof e.type ? e.type : t && a ? 1 : 2, r.Id = s, r.HitBizUin = parseInt(e.hit_bizuin) || 0,
                r.HitVid = e.hit_vid || "", r.WebViewId = d(), r.Step = parseInt(e.step, 10) || 0, r.OrderId = (e.orderid || "").toString(),
                r.AdSource = parseInt(e.ad_source, 10) || 0, r.TraceId = (e.traceid || "").toString(), r.Ext1 = (e.ext1 || "").toString(),
                r.Ext2 = (e.ext2 || "").toString(), r.r = Math.random(), r.DeviceType = parent.window.devicetype,
                r.ClientVersion = parseInt(parent.window.clientversion), r.IsGray = o() ? 1 : 0, r.msgid = parseInt(t, 10) || 0,
                r.itemidx = parseInt(a, 10) || 0, r.Url = parent.window.location.href, r.ScreenNum = parseInt(e.screen_num, 10) || 0,
                r.ScreenHeight = parseInt(e.screen_height, 10) || 0, r.OrStatus = parseInt(e.ori_status, 10) || 3,
                r.Fromid = parseInt(e.fromid, 10) || 0, r.SessionId = (window.sessionid || "").toString(),
                r.AppmsgScene = parseInt(window.source || (window.cgiData ? window.cgiData.scene : 0), 10) || 0,
                !r.AppmsgScene && r.Fromid ? r.AppmsgScene = r.Fromid : !r.Fromid && r.AppmsgScene && (r.Fromid = r.AppmsgScene),
                r.AppmsgScene = parseInt(r.AppmsgScene, 10) || 0, r.Fromid = parseInt(r.Fromid, 10) || 0, r.TotalRange = parseInt(e.total_range, 10) || 0,
                r.CurrentRange = parseInt(e.current_range, 10) || 0, r.Duration = parseInt(e.duration, 10) || 0,
                r.RemindTrafficSize = parseInt(e.remind_traffic_size, 10) || 0, r.TrafficReminderType = parseInt(e.traffic_reminder_type, 10) || 0,
                n.report(12710, r);
        } catch (p) { }
    };
    return {
        report: s,
        getWebviewid: d,
        showAd: o,
        commReport: p
    };
}); function _typeof(e) {
    return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
}
define("new_video/player.js", ["page/pages/video.css", "biz_common/utils/string/html.js", "biz_wap/zepto/zepto.js", "biz_wap/zepto/event.js", "biz_wap/zepto/touch.js", "biz_wap/jsapi/log.js", "biz_common/dom/event.js", "new_video/player.html.js", "biz_wap/utils/device.js", "new_video/ctl.js", "biz_common/tmpl.js", "pages/iframe_communicate.js", "a/a_utils.js", "biz_common/utils/url/parse.js", "pages/version4video.js", "biz_wap/utils/wapsdk.js", "biz_common/base64.js", "biz_wap/jsapi/core.js", "new_video/plugin/util.js", "biz_wap/utils/jsmonitor_report.js", "common/utils.js", "biz_wap/utils/ajax.js"], function (e) {
    "use strict";
    function t() {
        o(), i();
    }
    function i() {
        y.on("onNetWorkChange", function (e) {
            if (console.log("networkchanged", e), e.networkType || (e.networkType = e.netType), e.networkType && e.simType) try {
                if (!parent.window.lastNetworkType && window.networkType && window.simType) parent.window.lastNetworkType = {
                    networkType: window.networkType,
                    simType: window.simType
                }; else if (T.isObjectValueEqual(parent.window.lastNetworkType, e)) return;
                if (window.simType = e.simType, window.networkType = e.networkType, T.isMobileNetwork(e.networkType) && 1 !== e.simType && parent.window.lastNetworkType && ("wifi" === parent.window.lastNetworkType.networkType || T.isNoneNetwork(parent.window.lastNetworkType.networkType))) for (var t in parent.window.__MpPlayers) {
                    var i = parent.window.__MpPlayers[t];
                    i._g.isUserPause = !1, i._g.pauseNetType = null, !i.isPlay() && !i.isEnd() && i.isPause() && i.hasBeginPlay() ? (i._g.isUserPause = !0,
                        i._g.pauseNetType = parent.window.lastNetworkType.networkType) : i.isPlay() && ("wifi" === parent.window.lastNetworkType.networkType && T.isVideoNeedFlowNotice(i.opt.flow, 2) || T.isNoneNetwork(parent.window.lastNetworkType.networkType) && T.isVideoNeedFlowNotice(i.opt.flow, 4)) && i.__showFlowNotice_1();
                }
                parent.window.lastNetworkType = e;
            } catch (o) { }
        });
    }
    function o() {
        document.webkitVisibilityState ? document.addEventListener("webkitvisibilitychange", s, !1) : document.msVisibilityState ? document.addEventListener("msvisibilitychange", s, !1) : document.visibilityState && document.addEventListener("visibilitychange", s, !1);
        try {
            parent.window.__MpBindExitFullPage || (parent.window.__MpBindExitFullPage = !0, b.listenMpPageAction(function (e) {
                if (e && "onExitMpVideoFullPage" === e.action) for (var t in parent.window.__MpPlayers) if (Object.prototype.hasOwnProperty.call(parent.window.__MpPlayers, t)) {
                    var i = parent.window.__MpPlayers[t];
                    if (i && i.__isInFullScreen) {
                        var o = i.opt && i.opt.extinfo && i.opt.extinfo.vid ? i.opt.extinfo.vid : "";
                        if (o && o === e.videoVid) {
                            if (i.__isInFullScreen = !1, !_.os.android) {
                                var n = 1 * e.videoCurrTime;
                                n = -1 === n ? 0 / 0 : n;
                                var a = i.__getDuration();
                                parseInt(a, 10) === parseInt(n, 10) || n > a ? i.videoEnd() : i.play4outer(n, {
                                    triggerEvent: !1
                                }), i.onFullScreenChange({
                                    state: !1,
                                    type: "jsapi"
                                });
                            }
                            break;
                        }
                    }
                }
            }));
        } catch (e) {
            l.info("videoplayer jsapi ExitFullPage error:" + e);
        }
    }
    function n() {
        if ("hidden" in document) return "hidden";
        for (var e = ["webkit", "moz", "ms", "o"], t = 0; t < e.length; t++)return e[t] + "Hidden" in document,
            e[t] + "Hidden";
        return null;
    }
    function a() {
        var e = n();
        return e ? document[e] : !1;
    }
    function r(e, t) {
        t ? (e.setAttribute("muted", !0), e.muted = !0) : (e.removeAttribute("muted"), e.muted = !1);
    }
    function s() {
        if (a()) try {
            for (var e in parent.window.__MpPlayers) {
                var t = parent.window.__MpPlayers[e];
                if (t.hasBeginPlay() && t.isPlay()) {
                    t.pause4outer(), C.visibilityPausePlayer = t;
                    break;
                }
            }
        } catch (i) { } else {
            var o = C.visibilityPausePlayer;
            o && o.hasBeginPlay() && !o.isEnd() && (o.play4outer(), C.visibilityPausePlayer = null);
        }
    }
    e("page/pages/video.css"), e("biz_common/utils/string/html.js"), e("biz_wap/zepto/zepto.js"),
        e("biz_wap/zepto/event.js"), e("biz_wap/zepto/touch.js");
    var l = e("biz_wap/jsapi/log.js"), d = e("biz_common/dom/event.js"), u = e("new_video/player.html.js"), _ = e("biz_wap/utils/device.js"), h = e("new_video/ctl.js"), c = e("biz_common/tmpl.js"), p = e("pages/iframe_communicate.js"), g = e("a/a_utils.js"), f = e("biz_common/utils/url/parse.js"), m = e("pages/version4video.js"), v = e("biz_wap/utils/wapsdk.js"), w = e("biz_common/base64.js"), y = e("biz_wap/jsapi/core.js"), T = e("new_video/plugin/util.js"), S = e("biz_wap/utils/jsmonitor_report.js"), b = e("common/utils.js"), P = (e("biz_common/utils/url/parse.js"),
        e("biz_wap/utils/ajax.js")), j = 18e4, C = {
            visibilityPausePlayer: null
        };
    try {
        C._debug = window.parent.window.location.href.indexOf("&_debug=1") > 0;
    } catch (B) {
        C._debug = !1;
    }
    var F = 3e3;
    t();
    var k = function (e) {
        C._debug && console.log(e);
    }, M = navigator.userAgent, x = function () {
        return !0;
    }(), D = (-1 !== M.indexOf("Safari") && -1 !== M.indexOf("Version") && -1 == M.indexOf("Android"),
        function () {
            return !!_.browser.M1;
        }()), E = function (e, t) {
            var i = document.createElement("div");
            return e in i.style ? (i.style[e] = t, i.style[e] === t) : !1;
        }, I = function (e) {
            var t = 0, i = 0, o = 0;
            .5 > e && (e = 0), e = Math.ceil(e);
            var t = Math.floor(e / 3600), i = Math.floor((e - 3600 * t) / 60), o = e - 3600 * t - 60 * i;
            return 0 != t ? (10 > t && (t = "0" + t), t += ":") : t = "", 10 > i && (i = "0" + i), 10 > o && (o = "0" + o), t + i + ":" + o;
        }, N = !_.canSupportVideo, V = function (e) {
            var t = this, i = $(e.container);
            "undefined" == typeof e.videoReportType && (e.videoReportType = -1), e.width = e.width || 300,
                e.height = e.height || 300, e.videoWidth = e.videoWidth || 0, e.videoHeight = e.videoHeight || 0,
                e.duration = e.duration || 0, e.videoFit = !1, e.isVideoSharePage = e.isVideoSharePage || !1;
            var o = {
                needToFit: !1,
                supportObjectFit: !1,
                os: _.os
            };
            if (e.width && e.height && e.videoWidth && e.videoHeight) {
                var n = Math.abs(e.width / e.height - e.videoWidth / e.videoHeight);
                .1 >= n && (o.needToFit = !0, E("objectFit", "fill") && (o.supportObjectFit = !0, e.videoFit = !0));
            }
            e.ratio = e.ratio || e.width / e.height, e.autoplay = !!e.autoplay || !1, e.flow = e.flow && parseFloat(e.flow) || 0,
                this.opt = e, this.id = e.id = +new Date + "_" + Math.floor(Math.random() * Math.floor(+new Date)),
                this.opt.jsapiFullScreen !== !0 && (this.opt.jsapiFullScreen = !1), this.opt.canShareVideo !== !0 && (this.opt.canShareVideo = !1),
                this.opt.pauseShowControll !== !0 && (this.opt.pauseShowControll = !1), this.__iosPreloadPause = !1,
                this.__iosPreloadPlayFlag = !1, this.__iosIsRealPreload = !1, this.__forcePause = !1, this.__hasFuncControllBar = !0,
                this.__dragTimes = [], this.__play_total_time = 0, this.__last_playtime = 0, this.__always_hide_loading = e.always_hide_loading || !1,
                this.__last_loadingtime = 0, this.__loadingCountFlag = null, this.__userplaytime = !1, this._playingBufferingStartTime = null,
                this._g = {
                    oriSrc: this.opt.src,
                    timeupdateCacheCount: 3,
                    serialTimeupdateCache: [],
                    resetShowingLoadingTimeoutId: null,
                    showingLoadingTimeoutId: null,
                    statusDefine: {
                        init: 1,
                        play: 1,
                        pause: 1,
                        loading: 1,
                        end: 1,
                        error: 1
                    },
                    subStatusDefine: {
                        init: 1,
                        play: 1,
                        playing: 1,
                        waiting: 1,
                        stalled: 1,
                        seeking: 1,
                        seeked: 1,
                        preload: 1
                    },
                    status: "init",
                    subStatus: "init",
                    triggerTimeupdateLog: !0,
                    isUserPause: !1,
                    pauseNetType: null,
                    hasReportBeginPlay: !1,
                    coverBase64: "",
                    loadingCoverBase64: !1,
                    touchForwarding: !1,
                    jsapiFullScreenId: null,
                    jsapiFullScreenErrCnt: 0,
                    jsapiFullScreenErrLimit: 2,
                    iosPreloadTmpPlay: !1
                }, e._mustHideFullScreen = D, e.display = e.autoHide ? "none" : "block", e.ad_muted_btn = e.ad_muted_btn || !1,
                e.videoCrossOrigin = e.jsapiFullScreen && _.os.ios ? !0 : !1;
            var a = c.tmpl(u, e, !1);
            i.append(a);
            var r = this.container = $("#js_mpvedio_" + this.id);
            this.$video = r.find("video");
            var s = this.video = this.$video[0];
            this.__initData(), this.__initVideo();
            var l = e.src;
            if (!l) return this.changeStatus({
                status: "error",
                subStatus: "5"
            }), void this.__triggerOutside("error", {
                errorcode: 5
            });
            if (s.setAttribute("origin_src", l), N) return r.find(".js_btn_play").attr("href", l).show(),
                this.__loadedHandler(), void this.__bindBtnEvent();
            parent.window && !parent.window.lastNetworkType && window.networkType && window.simType && (parent.window.lastNetworkType = {
                networkType: window.networkType,
                simType: window.simType
            });
            var d = e.plugins || [];
            this._blockPlugin = {};
            for (var h = 0, p = d.length; p > h; ++h) {
                var g = d[h];
                g.setPlayer(this), !!g.init && g.init();
            }
            this.plugins = d, this._trigger("afterCheckVideoFit", o), this._trigger("loading", e),
                this._defineEvent(), this.__bindBtnEvent(), this.__bindVideoEvent(), this._addPostmessageListener();
            try {
                parent.window.__MpPlayers || (parent.window.__MpPlayers = {}), parent.window.__MpPlayers[this.id] = this;
            } catch (f) { }
            this.opt.canShareVideo && setTimeout(function () {
                t.getCoverBase64({
                    callback: function () { }
                });
            }, 1e3);
        };
    return $.extend(V.prototype, {
        _jsapiLog: function (e) {
            var t = ["vid:", "videosrc:"];
            this.opt && this.opt.extinfo && this.opt.extinfo.vid && (t[0] += this.opt.extinfo.vid), this.$video && this.$video[0] && this.$video[0].src && (t[1] += this.$video[0].src),
                l.info("videoplayer " + e + ";" + t.join(";"));
        },
        __triggerOutside: function () {
            var e = this.opt, t = arguments, i = t[0], o = this, n = this.video;
            if (i) {
                i = i.substr(0, 1).toUpperCase() + i.substr(1);
                var a = e["on" + i];
                "function" == typeof a && a.apply(this, t), "BeginPlay" != i || null != o.__replaySec && 0 != o.__replaySec || !_.os.ios || (n.currentTime = .1);
            }
        },
        __errorHandler: function () {
            this.video.removeAttribute("src");
        },
        __loadingHandler: function (e) {
            this.showLoading(), this._trigger("ready", e);
        },
        __readyHandler: function (e) {
            var t = this.opt.src;
            m.proxyPreloadExper() && m.proxyPreloadExper().isUsePreload && this.setSrc(t), this._trigger("loaded", e);
        },
        __loadedHandler: function (e) {
            return (e && e.autoplay || this.opt.autoplay || window.__auto_play__) && m.device.inWechat ? (window.__auto_play__ = !1,
                this.videoCtlReport({
                    step: 15
                }), this._g.hasReportBeginPlay = !0, void this._trigger("readyBeginPlay", e)) : void this._setBeginPlayStatus();
        },
        __readyBeginPlayHandler: function (e) {
            m.proxyPreloadExper() && m.proxyPreloadExper().isUsePreload || this.dontReset || this.setSrc(this.opt.src),
                this.dontReset && (this.dontReset = !1), this._trigger("beginPlay", e);
        },
        __beginPlayHandler: function () {
            function e(e, t) {
                e.__firstPlayStart = +new Date, e.__userplaytime = !0, t.find(".js_video_poster").show(),
                    e.showCover(), t.find(".js_video_play_controll").hide(), e.__hasBeginPlay = !0, e.showLoading("firstTime"),
                    e.showControllBar(), e.opt.flowNotice && e.__firstLoadedFlowNoticeJudge();
            }
            N && (location.href = this.opt.src);
            var t = this.container, i = this, o = this.video, n = void 0;
            setTimeout(function () {
                try {
                    i.__continueSec && (i.__replaySec = i.__continueSec, i.__continueSec = null), i._jsapiLog("set continue:" + i.__replaySec),
                        n = o.play(), "object" === ("undefined" == typeof n ? "undefined" : _typeof(n)) ? n.then(function () {
                            e(i, t);
                        }).catch(function (e) {
                            ("AbortError" === e.name || "NotAllowedError" === e.name) && (i._setBeginPlayStatus(), i.dontReset = !0,
                                S.setSum(114217, 16, 1));
                        }) : e(i, t);
                } catch (a) {
                    i._jsapiLog("play error");
                }
            }, 1);
        },
        __replayHandler: function () {
            this.videoCtlReport({
                step: 9
            });
            var e = this.video.muted;
            this.setSrc(this.src, this.video.preload, !0), this.triggerMuted(e), this._afterReplay();
        },
        __endHandler: function () {
            this.container.find(".js_btn_play_aria").data("status", "3").removeClass("video_playing"),
                this.hideControllBar(), this.hideTouchForward(), this._hidePlayControllBar(), this.__hasBeginPlay = !1,
                this.__canplay = !1;
        },
        __hideControllTimeoutCallback: function () {
            return this.__onTouch ? void this.__hideControllTimeout() : void (this.isPlay() && this.hideControllBar());
        },
        __touchVideoHandler: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = this, e = this.opt;
            if (e.blockTouchVideo || this.__onTouch || this.opt.pauseShowControll && this.isPause() || this.__userplaytime) return !1;
            if (!t.__canplay || t.isEnd() && e.hideControllBarAtEnd) return void t.hideControllBar();
            var i = t.container.find(".js_controll");
            e.isShow === !0 || "none" == i.css("display") ? t.showControllBar() : t.hideControllBar();
            var o = t.container.find(".js_video_flow");
            "none" !== o.css("display") && t._g.isUserPause === !1 && t.__hideFlowNotice(), t.__hideControllTimeout();
        },
        __hideControllTimeout: function () {
            var e = this;
            this.__touchVideoTimeoutHandler && clearTimeout(this.__touchVideoTimeoutHandler), this.__touchVideoTimeoutHandler = setTimeout(function () {
                e.__hideControllTimeoutCallback();
            }, F);
        },
        __initData: function () {
            this.log = {
                hasended: 0,
                lastsec: 0,
                duration: 0,
                video_error: 0
            }, this.__hasBeginPlay = !1, this.__canplay = !1, this._playingBufferingStartTime = null,
                this.__userplaytime = !1, this.__hasscroll = !1, this.__replaySec = null, this.__playQueue = [];
        },
        __initVideo: function () {
            var e = this.opt, t = this.video;
            t.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, !1), t.hasAttribute("controls") && t.removeAttribute("controls"), t.setAttribute("webkit-playsinline", "isiPhoneShowPlaysinline"),
                t.setAttribute("playsinline", "isiPhoneShowPlaysinline"), e.loop && t.setAttribute("loop", e.loop),
                e.muted && r(t, !0), this.$video.off("loadedmetadata durationchange"), this.__hasVideoDurationchange = !1;
        },
        __getDuration: function () {
            var e = this.opt, t = this.video, i = t ? t.duration : null;
            return i && 1 != i ? i : e.duration;
        },
        __videoDurationchange: function () {
            var e = this;
            if (!e.__hasVideoDurationchange) {
                var t = this.video, i = this.opt, o = this.container;
                if (1 / 0 != t.duration && t.duration > 0 && 1 != t.duration) e.duration = t.duration, e.__hasVideoDurationchange = !0; else {
                    if (!i.duration) return !1;
                    e.duration = i.duration, e.__hasVideoDurationchange = !0;
                }
                e.log.duration = e.duration, e.duration >>= 0, o.find(".js_total_time").text(I(e.duration)),
                    this.__hasFuncControllBar && o.find(".js_progress_bar,.js_total_time").show();
                var n = +new Date, a = n - e.log.loadwait_start;
                e.log.loadwait = a, e._trigger("durationchange", {
                    loadwait: a
                });
            }
        },
        __startCountTime: function () {
            var e = this, t = this.video;
            t && null === e.__last_playtime && (e.__last_playtime = t.currentTime);
        },
        __endCountTime: function () {
            var e = this, t = this.video;
            t && t.currentTime > e.__last_playtime && null !== e.__last_playtime && (e.__play_total_time += t.currentTime - e.__last_playtime,
                e.__last_playtime = null);
        },
        __bindVideoEvent: function () {
            var e = this.$video, t = this, i = this.container, o = i.find(".js_switch"), n = this.video;
            e.off("timeupdate").on("timeupdate", function () {
                if (t.__forcePause === !0) return void k(t.id + ":timeupdate __forcePause return");
                if (t.__hasBeginPlay && !t.__canplay) return t.showLoading(), !1;
                n = t.video, null != t.__replaySec && (k(t.id + ":timeupdate __replaySec"), n.pause(), n.currentTime = t.__replaySec,
                    t.__last_playtime = t.__replaySec, n.play(), t.__replaySec = null), t.__videoDurationchange();
                var e = n.currentTime;
                if (e > 0) {
                    t.__startCountTime(), t._addSerialTimeupdate(), "loading" === t._g.status && "seeking" === t._g.subStatus || !t._checkPlayBySerialTimeupdate() || (t.hideLoading(),
                        t._g.touchForwarding || t.hideTouchForward());
                    var i = t.__getDuration();
                    t.__onTouch || (t.__setControllBar(e / i), t.__setPlayTime(e)), t.hideCover(), t._trigger("timeupdate", {
                        currentTime: e
                    }), t.afterFirstLoaded();
                }
            }), e.off("canplay").on("canplay", function () {
                null != t.__replaySec && (n.currentTime = 1 * (1 * t.__replaySec).toFixed(4), t.__last_playtime = t.__replaySec,
                    t.__replaySec = null), t.__canplay = !0, t._trigger("canplay");
            }), e.off("ended").on("ended", function () {
                k("player inner isend:" + t.isEnd()), t.isEnd() && t.videoEnd();
            }), e.off("emptied").on("emptied", function () { }), t.waitingHandlerTimer = null;
            var a = 0;
            e.off("stalled").on("stalled", function () {
                if (this.__hasBeginPlay && !t.waitingHandlerTimer) {
                    t.changeStatus({
                        status: "loading",
                        subStatus: "stalled"
                    }), t.showLoading();
                    var e = n.src, i = n.readyState, o = n.error;
                    0 != i || o && 0 != o.code || (clearTimeout(t.waitingHandlerTimer), t.waitingHandlerTimer = null,
                        t.showLoading(), t.showCover(), n.pause(), n.src = e, n.load(), n.play(), k(t.id + ":stalled"));
                }
            }), e.on("seeked", function () {
                t.__onTouch || t.opt.jsapiFullScreen && t.__isInFullScreen || (t.changeStatus({
                    status: "loading",
                    subStatus: "seeked"
                }), n.play()), k("video seeked event");
            }), e.off("seeking").on("seeking", function () {
                k("seeking,__hasBeginPlay:" + t.__hasBeginPlay), t.__hasBeginPlay && (t.changeStatus({
                    status: "loading",
                    subStatus: "seeking"
                }), t.showLoading());
            }), e.off("waiting").on("waiting", function () {
                if (k("waiting,__hasBeginPlay:" + t.__hasBeginPlay), t.__hasBeginPlay) {
                    t.changeStatus({
                        status: "loading",
                        subStatus: "waiting"
                    }), t.showLoading(), t._jsapiLog("waiting counting begin"), t.loadingCountFlag || clearTimeout(t.loadingCountFlag),
                        t.__last_loadingtime = n.currentTime, t.loadingCountFlag = setTimeout(function () {
                            n.currentTime === t.__last_loadingtime && (t.changeStatus({
                                status: "error",
                                subStatus: "6"
                            }), t.__triggerOutside("error", {
                                errorcode: 6
                            }));
                        }, j), clearTimeout(t.waitingHandlerTimer), t.waitingHandlerTimer = null;
                    var e = 0;
                    try {
                        for (var i in parent.window.__MpPlayers) if (parent.window.__MpPlayers.hasOwnProperty(i) && e++,
                            e > 1) break;
                    } catch (o) { }
                    e > 1 && t.__forcePause === !1 && (t.waitingHandlerTimer = setTimeout(function () {
                        if (t.__forcePause !== !0) {
                            var e = n.error;
                            if (0 == n.readyState && (!e || 0 == e.code)) {
                                clearTimeout(t.waitingHandlerTimer), t.waitingHandlerTimer = null;
                                var i = n.src;
                                t.showLoading(), t.showCover(), n.pause(), n.src = i, a++, n.load(), n.play(), k(t.id + ":waitingHandlerTimer");
                            }
                        }
                    }, 1e4)), t._trigger("waiting");
                }
            }), e.off("play playing").on("play playing", function (e) {
                return t.__forcePause === !0 || t._g.iosPreloadTmpPlay ? void k(t.id + ":play playing __forcePause return") : (t.changeStatus({
                    status: "play",
                    subStatus: e.type
                }), setTimeout(function () {
                    t.adVideoStatus = "play";
                }, 10), k(t.id + ":play playing"), o.removeClass("switch_on"), o.addClass("switch_off"),
                    t._hidePlayControllBar(), t.__startCountTime(), void t._trigger("play"));
            }), e.off("pause").on("pause", function () {
                t._g.iosPreloadTmpPlay || (k(t.id + ":video pause event"), t.changeStatus({
                    status: "pause",
                    subStatus: ""
                }), setTimeout(function () {
                    t.adVideoStatus = "pause";
                }, 10), o.addClass("switch_on"), o.removeClass("switch_off"), !t.__canplay || t.isEnd() || t.__onTouch ? t._hidePlayControllBar() : (t.hideControllBar(),
                    t._showPlayControllBar()), t.__endCountTime(), t._trigger("pause"));
            }), e.off("error").on("error", function () {
                var e = void 0;
                t.video.error && (e = t.video.error.code), t.changeStatus({
                    status: "error",
                    subStatus: e || ""
                });
                var i = "/mp/ad_video_report?action=report_video_play_error", o = encodeURIComponent(t.video.baseURI);
                P({
                    type: "GET",
                    dataType: "json",
                    timeout: 3e4,
                    url: i + "&errorCode=" + e + "&videoUrl=" + o,
                    success: function () { },
                    error: function () { }
                }), t._trigger("error", {
                    errorcode: e
                });
            }), e.off("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange").on("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange", function (e) {
                var i = void 0;
                i = "webkitbeginfullscreen" == e.type ? !0 : "webkitendfullscreen" == e.type ? !1 : document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen,
                    t.onFullScreenChange({
                        state: i,
                        type: "h5"
                    });
            });
        },
        _defineEvent: function () {
            var e = this;
            this._event = {
                progressBarMousemove: function (t) {
                    e.__hasFuncControllBar && e.__onTouch && e._pointerMoveHandler({
                        x: t.pageX || t.clientX,
                        y: t.pageY || t.clientY,
                        e: t
                    });
                },
                progressBarMouseup: function (t) {
                    return e.__hasFuncControllBar && e.__onTouch ? (e._pointerUpHandler({
                        x: t.pageX || t.clientX,
                        y: t.pageY || t.clientY,
                        e: t
                    }), !1) : void 0;
                },
                progressBarTouchmove: function (t) {
                    if (e.__hasFuncControllBar && e.__onTouch) {
                        var i = t.changedTouches[0];
                        e._pointerMoveHandler({
                            x: i.pageX,
                            y: i.pageY,
                            e: t
                        });
                    }
                },
                progressBarTouchend: function (t) {
                    if (e.__hasFuncControllBar && e.__onTouch) {
                        var i = t.changedTouches[0];
                        return e._pointerUpHandler({
                            x: i.pageX,
                            y: i.pageY,
                            e: t
                        }), !1;
                    }
                },
                broadcastPlay: function (t) {
                    t.id !== e.id && e.__hasBeginPlay && !e.isEnd() && e.pause4outer();
                }
            };
        },
        _addPostmessageListener: function () {
            p.addListener({
                type: "broadcastPlay",
                func: this._event.broadcastPlay
            });
        },
        __bindBtnEvent: function () {
            function e() {
                if (N) return location.href = o.opt.src, !1;
                o.changeStatus({
                    status: "loading",
                    subStatus: "preload"
                });
                var e = 2;
                o._g.hasReportBeginPlay ? e = 9 : window.cgiData && "0" == window.cgiData.media_source && (e = 11),
                    o.videoCtlReport({
                        step: e
                    }), o._g.hasReportBeginPlay = !0, o._trigger("readyBeginPlay");
            }
            function t() {
                var t = o.opt.canMePlay;
                "function" == typeof t ? t(e) : e();
            }
            function i() {
                o.isPlay() ? (o.videoCtlReport({
                    step: 12
                }), o.pause4outer()) : o.play4outer();
            }
            var o = this, n = this.opt, a = (n.extinfo, this.container), r = (this.video, a.find(".js_video_play_controll"),
                a.find(".js_btn_play")), s = a.find(".js_btn_play_aria"), l = a.find(".js_video_poster"), u = a.find(".js_switch"), _ = a.find(".js_progress_bar"), h = a.find(".js_controll"), c = (a.find(".js_played_bar"),
                    a.find(".js_page_video")), p = a.find(".js_full_mask"), g = a.find(".js_video_pause_controll"), f = a.find(".js_full_screen_control"), m = a.find(".js_loading"), v = a.find(".js_share_btn");
            this.opt.canShareVideo && (v[0] && d.tap(v[0], function () {
                o.callJsapiShareVideo({
                    action: "shareEmbedMpVideo"
                });
            }), d.longtap(this.container[0], function (e) {
                h[0].contains(e.target) || e.target === h[0] || o.callJsapiShareVideo({
                    action: "longPressEmbedMpVideo"
                });
            })), d.on(g[0], "tap", ".js_btn_pause", function () {
                o.play4outer();
            });
            var w = void 0, y = void 0, T = 0, b = 0, P = 0, j = o.__getDuration(), C = 0, B = 0, F = 1, k = window.user_uin || 0, M = 0 !== k && Math.floor(k / 100) % 1e3 < F, D = !1, E = void 0, I = void 0, V = 0, L = !0, H = !1, z = null;
            c.on("touchstart", function (e) {
                1 == e.targetTouches.length && o.isPlay() && (n.blockTouchVideo || (z && (clearTimeout(z),
                    z = null), E = w = new Date, I = y = {
                        x: e.targetTouches[0].clientX,
                        y: e.targetTouches[0].clientY
                    }, o._g.touchForwarding = !1, H = !0, L = !0, B = C = o.getCurTime()));
            }), c.on("touchmove", function (e) {
                if (L && 1 == e.targetTouches.length && o.isPlay() && !n.blockTouchVideo) {
                    var t = new Date, i = e.changedTouches[0].clientX, a = e.changedTouches[0].clientY, r = Math.abs(i - I.x), s = Math.abs(a - I.y);
                    if (H && (s >= 10 || s > r)) return L = !1, void (H = !1);
                    z && (clearTimeout(z), z = null), H = !1, o._g.touchForwarding = !0;
                    var l = t - w, d = i - y.x, u = a - y.y, _ = Math.sqrt(Math.pow(d, 2) + Math.pow(u, 2)) + P, h = Math.min(Math.ceil(_ / l), 6);
                    b = Math.floor(.1 * _ + .2 * h * h * h) * Math.ceil(j / 500), P = 0 == b ? _ : 0, 0 > d && (b = -b);
                    var c = 180 * Math.atan2(u, d) / Math.PI;
                    o._g.touchForwarding || (c >= -30 && 30 >= c && ++T, (c >= 150 && 180 >= c || c >= -180 && -150 >= c) && --T,
                        (T >= 4 || -4 >= T) && (5 >= _ ? T = 0 : (V = Math.max(V, h), o._g.touchForwarding = !0))), o._g.touchForwarding && (C += b,
                            0 > C && (C = 0), C > j && (C = 1 * j), o.__setForwardBar(C), e.preventDefault()), y = {
                                x: i,
                                y: a
                            }, w = t;
                }
            }), c.on("touchend", function (e) {
                if (o._g.touchForwarding) {
                    if (z = setTimeout(function () {
                        o.play(C);
                    }, 0), M && (S.setSum(28307, 29, 1), !D)) {
                        var t = (new Date, {
                            x: e.changedTouches[0].clientX,
                            y: e.changedTouches[0].clientY
                        }), i = t.x - I.x, n = t.y - I.y, a = parseInt(Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2))), r = parseInt(180 * Math.atan2(n, i) / Math.PI);
                        r >= -30 && 30 >= r || r >= 150 && 180 >= r || r >= -180 && -150 >= r || S.setSum(28307, 35, 1), S.setSum(28307, 31, 1),
                            S.setSum(28307, 33, a), S.setSum(28307, 34, V), D = !0;
                    }
                    o._seekReport(), o._trigger("handDragComplete", {
                        playTime: C,
                        startDragVideoTime: B
                    }), e.preventDefault();
                }
                o.hideTouchForward(), b = 0, H = !1, o._g.touchForwarding = !1, L = !0, T = 0;
            }), c.on("touchmove MSPointerMove pointermove mousemove", function (e) {
                o.isInFullScreen() && !x && e.preventDefault();
            }), d.tap(c[0], function (e) {
                e.target === h[0] || h[0].contains(e.target) || e.target === v[0] || o.isEnd() || o.isPause() || o._g.touchForwarding || o._trigger("touchVideo");
            }), d.tap(p[0], function () {
                o.isEnd() || o._trigger("touchVideo");
            }), p.on("touchmove MSPointerMove pointermove mousemove", function (e) {
                o.isInFullScreen() && !x && e.preventDefault();
            }), d.tap(s[0], function () {
                var e = $(this), n = 1 * e.data("status");
                0 == n ? (e.addClass("video_playing").data("status", "1"), t()) : 1 == n ? (e.removeClass("video_playing").data("status", "2"),
                    i()) : 2 == n ? (e.addClass("video_playing").data("status", "1"), i()) : 3 == n && (e.addClass("video_playing").data("status", "1"),
                        o._trigger("ariaReplay"));
            }), d.tap(r[0], function () {
                t();
            }), d.tap(m[0], function () {
                o._trigger("touchVideo");
            }), d.tap(u[0], function () {
                i();
            }), o.__onTouch = !1, _.on("mousedown", function (e) {
                o.__hasFuncControllBar && (h.off("mousemove", o._event.progressBarMousemove).on("mousemove", o._event.progressBarMousemove),
                    l.off("mousemove", o._event.progressBarMousemove).on("mousemove", o._event.progressBarMousemove),
                    $(document.body).off("mouseup").on("mouseup", o._event.progressBarMouseup), o._pointerDownHandler({
                        x: e.pageX || e.clientX,
                        y: e.pageY || e.clientY,
                        e: e
                    }));
            }), _.on("touchstart", function (e) {
                if (o.__hasFuncControllBar) {
                    _.off("touchmove", o._event.progressBarTouchmove).on("touchmove", o._event.progressBarTouchmove),
                        _.off("touchend", o._event.progressBarTouchend).on("touchend", o._event.progressBarTouchend);
                    var t = e.changedTouches[0];
                    o._pointerDownHandler({
                        e: e,
                        x: t.pageX,
                        y: t.pageY
                    });
                }
            }), d.tap(f[0], function (e) {
                return o.isInFullScreen() ? x && o.exitFullScreen() : x && (S.setSum(28307, 56, 1), o.enterFullScreen()),
                    e.preventDefault(), !1;
            });
        },
        hideTouchForward: function () {
            this.container.find(".js_forward").addClass("none");
        },
        __firstLoadedFlowNoticeJudge: function () {
            if (m.device.inWechat && parent.window.lastNetworkType && parent.window.lastNetworkType.networkType && parent.window.lastNetworkType.simType && T.isMobileNetwork(parent.window.lastNetworkType.networkType) && 1 !== parent.window.lastNetworkType.simType) {
                var e = void 0;
                e = this.opt.flow < 100 && this.opt.flow > 0 ? T.isVideoNeedFlowNotice(this.opt.flow, 1) : T.isVideoNeedFlowNotice(this.opt.flow, 5),
                    e && (this.opt.flow < 100 && this.opt.flow > 0 ? this.__showFlowNotice_1() : this.__showFlowNotice_2(this.opt.flow));
            }
        },
        __showFlowNotice_1: function () {
            this.videoCtlReport({
                step: 16,
                noticeType: 1
            }), this._trigger("flowNotice", {
                flow: parseInt(1024 * this.opt.flow),
                noticeType: 1
            }), this.__flowNoticeTimer && (clearTimeout(this.__flowNoticeTimer), this.__flowNoticeTimer = null);
            var e = this.container.find(".js_video_flow").removeClass("flow_fade_out");
            this.container.find(".js_flow_notice_1").show(), this.container.find(".js_flow_notice_2").hide(),
                e.show(), e.addClass("flow_fade_out");
        },
        __showFlowNotice_2: function (e) {
            this.videoCtlReport({
                step: 16,
                noticeType: 2
            }), this._trigger("flowNotice", {
                flow: parseInt(1024 * this.opt.flow),
                noticeType: 2
            }), this.__flowNoticeTimer && (clearTimeout(this.__flowNoticeTimer), this.__flowNoticeTimer = null),
                this.container.find(".js_flow_notice_2").show(), this.container.find(".js_flow_notice_1").hide(),
                this.container.find(".js_video_flow_num").html(e + "M"), this.container.find(".js_video_flow").removeClass("flow_fade_out").show(),
                this.container.find(".js_video_flow").addClass("flow_fade_out");
        },
        __hideFlowNotice: function () {
            this.__flowNoticeTimer && (clearTimeout(this.__flowNoticeTimer), this.__flowNoticeTimer = null),
                this.container.find(".js_video_flow").hide();
        },
        _pointerDownHandler: function (e) {
            this.__onTouch = !0, this.showControllBar(), this.progressBarSeekData = {
                x1: e.x,
                y1: e.y,
                startTime: this.video.currentTime
            }, this.pause(), e.e.preventDefault();
        },
        _pointerMoveHandler: function (e) {
            var t = this.container.find(".js_played_bar"), i = this.container.find(".js_progress_bar");
            this.__onTouch = !0, this.__has_drag = !0, this.progressBarSeekData.x2 = e.x, this.progressBarSeekData.y2 = e.y;
            var o = t.offset(), n = i.width(), a = (e.x - o.left) / n, r = this.__getDuration(), s = 1 * (r * a).toFixed(4);
            s > r && (s = r - 1);
            var l = !1;
            "undefined" == typeof this.progressBarSeekData.dragTime && (l = !0);
            var d = Math.abs(1 * s - 1 * this.progressBarSeekData.dragTime);
            (l || d >= .5) && (this.progressBarSeekData.dragTime = s, k("_pointerMoveHandler set currentTime, dragTime:" + this.progressBarSeekData.dragTime + " currentTime:" + this.video.currentTime),
                this.video.currentTime = this.progressBarSeekData.dragTime, this.__setPlayTime(this.progressBarSeekData.dragTime)),
                this.__setControllBar(a), e.e && e.e.preventDefault();
        },
        _pointerUpHandler: function (e) {
            var t = this;
            e.e.preventDefault(), this.container.find(".js_controll").off("mousemove", t._event.progressBarMousemove),
                this.container.find(".js_video_poster").off("mousemove", t._event.progressBarMousemove),
                $(document.body).off("mouseup", t._event.progressBarMouseup), this.container.find(".js_progress_bar").off("touchmove", t._event.progressBarTouchmove).off("touchend", t._event.progressBarTouchend),
                "undefined" == typeof this.progressBarSeekData.dragTime && this._pointerMoveHandler({
                    x: e.x,
                    y: e.y
                });
            var i = this.progressBarSeekData.dragTime, o = this.progressBarSeekData.startTime;
            i == this.video.currentTime && (i -= .1), this.progressBarSeekData.startTime && t.__dragTimes.push(Math.round(1e3 * this.progressBarSeekData.startTime) + ":#:" + Math.round(1e3 * i)),
                this.progressBarSeekData = null, k("_pointerUpHandler dragTime:" + i + " currentTime:" + this.video.currentTime),
                setTimeout(function () {
                    t.__onTouch = !1, t.__forcePause = !1, t.isEnd() || (t.showLoading(), t.play(i), t._seekReport(),
                        t._trigger("barDragComplete", {
                            playTime: i,
                            startDragVideoTime: o
                        }));
                }, 0), this.__hideControllTimeout();
        },
        _seekReport: function () {
            this.videoCtlReport({
                step: 13
            });
        },
        _hidePlayControllBar: function () {
            this.container.find(".js_video_pause_controll").hide(), this._g.isUserPause && m.device.inWechat && ("wifi" === this._g.pauseNetType && T.isVideoNeedFlowNotice(this.opt.flow, 3) || T.isNoneNetwork(this._g.pauseNetType) && T.isVideoNeedFlowNotice(this.opt.flow, 4) ? this.__showFlowNotice_1() : (this._g.isUserPause = !1,
                this._g.pauseNetType = null)), this.__hideControllTimeout();
        },
        _showPlayControllBar: function () {
            var e = this.container.find(".js_video_pause_controll");
            this.isEnd() || (this.opt.pauseShowControll ? (e.hide(), this.showControllBar()) : (this.hideControllBar({
                showShareBtn: !!this.opt.canShareVideo
            }), e.show(), this.container.find(".js_video_play_controll").hide()));
        },
        _addSerialTimeupdate: function () {
            var e = this.video.currentTime, t = this._g.serialTimeupdateCache.length;
            e > 0 && (0 == t || this._g.serialTimeupdateCache[t - 1].currentTime != e) && (this._g.serialTimeupdateCache.length >= this._g.timeupdateCacheCount && this._g.serialTimeupdateCache.shift(),
                this._g.serialTimeupdateCache.push({
                    currentTime: e,
                    timeStamp: +new Date
                }));
        },
        _checkPlayBySerialTimeupdate: function () {
            if (this._g.serialTimeupdateCache.length < this._g.timeupdateCacheCount) return !1;
            var e = this._g.serialTimeupdateCache.length, t = this._g.serialTimeupdateCache[e - 1], i = this._g.serialTimeupdateCache[e - this._g.timeupdateCacheCount];
            return t.timeStamp - i.timeStamp < 2500 ? !0 : !1;
        },
        _showPlayer: function () {
            var e = this.container.find(".js_page_video");
            e.show();
        },
        _hidePlayer: function () {
            var e = this.container.find(".js_page_video");
            e.hide();
        },
        __setPlayTime: function (e) {
            this.container.find(".js_now_play_time").text(I(e));
        },
        __setControllBar: function (e) {
            e = Math.ceil(100 * e), 0 > e && (e = 0), e > 100 && (e = 100);
            this.video, this.duration;
            this.__setBufferBar(e), e += "%";
            var t = this.container;
            t.find(".js_played_bar").css({
                width: e
            }), t.find(".js_played_speed_cnt").css({
                left: e
            });
        },
        __setForwardBar: function (e) {
            var t = this.container, i = (this.video, this.__getDuration()), o = e / i;
            t.find(".js_forward").removeClass("none"), t.find(".total_time").text(I(i)), t.find(".js_forward_bar").css("width", 100 * o + "%"),
                t.find(".js_forward_play_time").text(I(e));
        },
        __setBufferBar: function (e) {
            var t = this.container, i = this.video, o = this.__getDuration(), n = i.currentTime;
            e = e || n / o;
            var a = e;
            i.buffered && i.buffered.length > 0 && i.buffered.end && o && (a = i.buffered.end(0) / o, a = Math.max(e, Math.ceil(parseInt(100 * a))),
                a > 98 && (a = 100)), t.find(".js_buffer_bar").css({
                    width: a + "%"
                });
        },
        __resetVideo: function () {
            this.$video.remove();
            var e = this.container, t = e.find(".js_video_poster");
            t.append("<video></video>");
            {
                var i = this.$video = t.find("video");
                this.video = i[0];
            }
            this.__canplay = !1, this.__forcePause = !1, this.__initVideo(), this.__iosPreloadPause = !1,
                this.__iosPreloadPlayFlag = !1, this.__bindVideoEvent();
        },
        _trigger: function (e, t) {
            var i = this, o = this;
            if ("timeupdate" !== e || "timeupdate" === e && this._g.triggerTimeupdateLog) {
                "timeupdate" === e && (this._g.triggerTimeupdateLog = !1, setTimeout(function () {
                    i._g.triggerTimeupdateLog = !0;
                }, 5e3));
                try {
                    var n = "", a = Object.prototype.toString.call(t);
                    n = "[object String]" === a ? t : "[object Object]" === a || "[object Array]" === a ? JSON.stringify(t) : "no params",
                        this._jsapiLog("trigger:" + e + ";arg:" + n + ";");
                } catch (s) { }
            }
            if ("readyBeginPlay" == e && (o.__iosPreloadPlayFlag = !1), "play" == e && 0 == o.__iosPreloadPlayFlag) {
                if (o.__iosIsRealPreload && r(o.video, !1), o.__forcePause = !1, o.opt.notPauseOtherVideoWhenPlay || p.broadcastMessage({
                    type: "broadcastPlay",
                    data: {
                        id: this.id
                    }
                }), window.parent.originalVideoAdFrames && 0 != window.parent.originalVideoAdFrames.length) for (var l = 0; l < window.parent.originalVideoAdFrames.length; l++)window.parent.originalVideoAdFrames[l].contentWindow.postMessage({
                    action: "pauseAd",
                    value: ""
                }, "*");
                g.postMessage(window.parent, "onVideoPlayV2", {
                    vid: f.getQuery("vid")
                });
            }
            var d = this.plugins, u = this._blockPlugin[e] || this._blockPlugin.all, _ = 0;
            if (u && "function" == typeof u.recv && (_ |= u.recv(e, t), 1 & _)) return !1;
            for (var l = 0, h = d.length; h > l && (_ |= d[l].recv(e, t), !(2 & _)); ++l);
            if (!(this._blockInnerHandler || 4 & _)) {
                var c = this["__" + e + "Handler"];
                c && c.call(this, t);
            }
            8 & _ || this.__triggerOutside(e, t);
        },
        _setBlockInnerHandler: function (e) {
            this._blockInnerHandler = e;
        },
        _setBlockPlugin: function (e, t) {
            this._blockPlugin[e] = t;
        },
        _getContainer: function () {
            return this.container;
        },
        _setCover: function (e, t) {
            this.container.find(".js_poster_cover").css(t), this.opt.cover = e, this._g.coverBase64 = "";
        },
        _removeCover: function (e) {
            var e = e || {
                "background-image": "none"
            };
            this.container.find(".js_poster_cover").css(e);
        },
        _afterReplay: function () {
            this.__hasBeginPlay = !0, this.__userplaytime = !0, this.__firstPlayStart = +new Date, this.showLoading(),
                this.play(), this._trigger("afterReplay");
        },
        setSrc: function (e, t, i) {
            var o = this, n = this.$video, a = (this.opt, this.video);
            this.src = e, (!o.__iosPreloadPause || i) && o.__initData(), o.__initVideo(), this.showCover(),
                o.log.loadwait_start = +new Date, (!n.attr("src") || i) && (n.attr("src", e), m.proxyPreloadExper() && m.proxyPreloadExper().isUsePreload && _.os.ios && !o.opt.ad_muted_btn && !function () {
                    var e = function t() {
                        o.__iosPreloadPause = !0;
                        var e = function i() {
                            o._g.iosPreloadTmpPlay = !1, a.removeEventListener("pause", i, !1);
                        };
                        a.addEventListener("pause", e, !1), a.pause(), o._trigger("ready", o.opt), a.removeEventListener("canplay", t, !1);
                    };
                    a.addEventListener("canplay", e, !1), 4 !== a.readyState && (o._g.iosPreloadTmpPlay = !0,
                        o.__iosPreloadPlayFlag = !0, o.__iosIsRealPreload = !0, r(a, !0), a.play());
                }()), a.preload = t || "metadata", n.on("loadedmetadata", function () {
                    if (o.__videoDurationchange(), o.__playQueue && o.__playQueue.length > 0) {
                        var e = o.__playQueue[0].sec;
                        o.__playQueue = [], o.play(e);
                    }
                }), a.duration > 0 && 1 != a.duration && o.__videoDurationchange();
        },
        videoCtlReport: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = this.opt.extinfo;
            if (t) {
                var i = {
                    step: e.step,
                    vid: t.vid,
                    hit_bizuin: t.hit_bizuin,
                    hit_vid: t.hit_vid,
                    traceid: t.pageplayer._getTraceId(),
                    orderid: t.pageplayer._getOrderid(),
                    ori_status: t.pageplayer._getOriStatus(),
                    type: this.opt.videoReportType,
                    fromid: t.pageplayer._getFromid()
                };
                e.step >= 16 ? (i.remind_traffic_size = parseInt(1024 * this.opt.flow), i.traffic_reminder_type = e.noticeType,
                    h.commReport(i)) : h.report(i);
            }
        },
        videoEnd: function () {
            this.changeStatus({
                status: "end",
                subStatus: ""
            }), this.__endCountTime(), this._trigger("end");
        },
        replay: function () {
            this.container.find(".js_video_play_controll").hide(), this._trigger("readyBeginPlay"),
                this._trigger("replay");
        },
        resetVideo: function () {
            this.opt.autoReplay || (this.opt.autoplay = !1), this.container.find(".js_video_poster").hide(),
                this.showCover(), this.__resetVideo(), this._trigger("loading");
        },
        setSrcWithTime: function (e) {
            var t = this.video.currentTime;
            this.resetVideo(), this.setSrc(e, !1, !0), this._jsapiLog("lastPlayTime:" + t), this.__continueSec = t;
        },
        changeStatus: function (e) {
            var t = this._g;
            if (t.statusDefine[e.status] && (!e.subStatus || t.subStatusDefine[e.subStatus] || "error" === e.status) && (t.status !== e.status || t.subStatus !== e.subStatus)) {
                var i = 0;
                "end" === e.status || "error" === e.status ? (this._playingBufferingStartTime = null, this.__userplaytime = !1) : "pause" === e.status ? this._playingBufferingStartTime = null : "play" === e.status && "playing" === e.subStatus && null !== this._playingBufferingStartTime ? (i = +new Date - this._playingBufferingStartTime,
                    this._playingBufferingStartTime = null) : !this.__hasBeginPlay || !this.__canplay || this.__userplaytime || "loading" !== e.status || "waiting" !== e.subStatus && "seeking" !== e.subStatus || null !== this._playingBufferingStartTime || (this._playingBufferingStartTime = +new Date);
                var o = t.status, n = t.subStatus;
                t.status = e.status, t.subStatus = e.subStatus;
                var a = ["player statusChange, preStatus:", o, "; status:", t.status, "; preSubStatus:", n, "; subStatus:", t.subStatus, "; video_duration:", this.video ? this.video.duration : "0", "; getvinfo_duration:", this.opt.duration, "; current_time:", this.video ? this.video.currentTime : "0", "; play_total_time:", this.getPlayTotalTime()].join("");
                this._jsapiLog(a), k(a), p.broadcastMessage({
                    type: "statusChange",
                    data: {
                        id: this.id,
                        preStatus: o,
                        preSubStatus: n,
                        status: t.status,
                        subStatus: t.subStatus
                    }
                }), this._trigger("statusChange", {
                    currentTime: this.video.currentTime,
                    preStatus: o,
                    preSubStatus: n,
                    status: t.status,
                    subStatus: t.subStatus
                }), i && this._trigger("playingBufferingTime", {
                    bufferingTime: i
                });
            }
        },
        play: function (e) {
            var t = this.video, i = this;
            if (!i.isEnd()) {
                if (!t || 0 == t.readyState) return void (this.__playQueue[0] = {
                    sec: e
                });
                e *= 1;
                try {
                    if (isNaN(e) || "number" != typeof e) i.__canplay && i.isPause() || 0 == t.currentTime ? t.play() : t.currentTime = 0; else {
                        var o = this.__getDuration();
                        e >= o && (e = o - 1), 0 > e && (e = 0), e = 1 * (1 * e).toFixed(4), i.__last_playtime = e, i.__setPlayTime(e),
                            t.currentTime == e ? t.play() : t.currentTime = e;
                    }
                } catch (n) {
                    0 == t.currentTime ? t.play() : t.currentTime = 0;
                }
            }
        },
        pause: function () {
            var e = this.video;
            e && 0 == e.readyState || (this.__replaySec = null, this.waitingHandlerTimer && (clearTimeout(this.waitingHandlerTimer),
                this.waitingHandlerTimer = null), e.pause(), k(this.id + ":pause function"));
        },
        getCoverBase64: function () {
            var e = this, t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            this._g.coverBase64 ? "function" == typeof t.callback && t.callback({
                cover64: this._g.coverBase64 || ""
            }) : !function () {
                var i = e, o = new Image;
                o.crossOrigin = "anonymous", o.onload = function () {
                    this.onload = null, this.onerror = null;
                    try {
                        var e = this.naturalWidth || this.width, o = this.naturalHeight || this.height, n = document.createElement("canvas"), a = n.getContext("2d");
                        n.style.width = e + "px", n.width = e, n.style.height = o + "px", n.height = o, a.drawImage(this, 0, 0, e, o),
                            i._g.coverBase64 = n.toDataURL("image/jpeg", 1);
                    } catch (r) {
                        this._jsapiLog("jsapi shareEmbedMpVideo error:" + r), i._g.coverBase64 = "";
                    }
                    "function" == typeof t.callback && t.callback({
                        cover64: i._g.coverBase64
                    });
                }, o.onerror = function () {
                    this.onload = null, this.onerror = null, "function" == typeof t.callback && t.callback({
                        cover64: ""
                    });
                }, o.src = e.opt.cover;
            }();
        },
        callJsapiShareVideo: function () {
            var e = this, t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            if (this.opt.extinfo && this.opt.extinfo.preview) return void p.postMessage({
                type: "showTips",
                data: {
                    msg: "预览图文中的视频不可分享"
                }
            });
            if (!this._g.loadingCoverBase64) {
                var i = function () {
                    var i = "", o = "", n = "";
                    try {
                        i = parent.window.msg_link.html(!1), o = parent.window.user_name || (window.cgiData ? window.cgiData.username || window.cgiData.user_name : "") || "",
                            n = parent.window.nickname || (window.cgiData ? window.cgiData.nick_name : "") || "";
                    } catch (a) {
                        e._jsapiLog(t.action + " jsapi error:" + a);
                    }
                    var r = e.opt.extinfo, s = "";
                    r && (s = r.vid);
                    var l = {
                        action: t.action,
                        mpUrl: i,
                        bizUsrName: o,
                        bizNickName: n,
                        videoVid: s,
                        videoUrl: f.addParam(e._g.oriSrc || e.src || e.opt.src, "video_md5", e.opt.videoMd5 || ""),
                        videoThumbUrl: e.opt.cover,
                        videoThumbData: e._g.coverBase64,
                        videoTitle: e.opt.videoTitle,
                        videoDuration: 1 * e.opt.duration
                    };
                    y.invoke("handleMPPageAction", l, function () { });
                };
                this._g.loadingCoverBase64 = !0, this.getCoverBase64({
                    callback: function () {
                        e._g.loadingCoverBase64 = !1, i();
                    }
                });
            }
        },
        onFullScreenChange: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = e.type, i = e.state, o = this.$video;
            i ? (o.parents(".js_inner").removeClass("not_fullscreen"), this.__isInFullScreen = !0) : (o.parents(".js_inner").addClass("not_fullscreen"),
                this.hideLoading(), this.__isInFullScreen = !1), this._trigger("fullscreenchange", {
                    state: i,
                    type: t
                }), p.broadcastMessage({
                    type: "fullscreenchange",
                    data: {
                        fullScreen: this.__isInFullScreen,
                        type: t,
                        id: this.id
                    }
                });
        },
        enterFullScreen: function () {
            var e = this, t = function () {
                e._g.jsapiFullScreenId && (clearTimeout(e._g.jsapiFullScreenId), e._g.jsapiFullScreenId = null);
                var t = e.video;
                t.requestFullscreen ? (t.requestFullscreen(), e.__isInFullScreen = !0) : t.mozRequestFullScreen ? (t.mozRequestFullScreen(),
                    e.__isInFullScreen = !0) : t.webkitRequestFullscreen ? (t.webkitRequestFullscreen(), e.__isInFullScreen = !0) : t.webkitEnterFullscreen && (t.webkitEnterFullscreen(),
                        e.__isInFullScreen = !0);
            };
            if (this._g.jsapiFullScreenId && (clearTimeout(this._g.jsapiFullScreenId), this._g.jsapiFullScreenId = null),
                !this.opt.jsapiFullScreen || this._g.jsapiFullScreenErrCnt >= this._g.jsapiFullScreenErrLimit) return void t();
            _.os.android || this.pause4outer({
                triggerEvent: !1
            });
            var i = "", o = "", n = "", a = "", r = "", s = this;
            try {
                if (r = parent.window.source || "", i = parent.window.msg_link.html(!1), o = parent.window.user_name || (window.cgiData ? window.cgiData.username || window.cgiData.user_name : "") || "",
                    n = parent.window.nickname || (window.cgiData ? window.cgiData.nick_name : "") || "", this.opt.videoCrossOrigin) {
                    var l = document.createElement("canvas"), d = l.getContext("2d");
                    l.style.width = this.opt.videoWidth + "px", l.width = this.opt.videoWidth, l.style.height = this.opt.videoHeight + "px",
                        l.height = this.opt.videoHeight, d.drawImage(this.$video[0], 0, 0, this.opt.videoWidth, this.opt.videoHeight),
                        a = l.toDataURL("image/jpeg", 1);
                }
            } catch (u) {
                this._jsapiLog("jsapi enterfullsrceen error:" + u);
            }
            var h = this.$video[0], c = null, p = null;
            try {
                for (p = h.getBoundingClientRect(), c = {
                    left: p.left,
                    top: p.top,
                    height: p.bottom - p.top,
                    width: p.right - p.left
                }; h.ownerDocument.defaultView.parent !== window && (h = h.ownerDocument.defaultView.frameElement);)p = h.getBoundingClientRect(),
                    c.left += p.left, c.top += p.top;
                c.left = Math.round(c.left), c.top = Math.round(c.top), c.height = Math.round(c.height),
                    c.width = Math.round(c.width);
            } catch (u) {
                this._jsapiLog("jsapi enterfullsrceen error:" + u), c = {
                    left: 0,
                    top: 0,
                    height: 0,
                    width: 0
                };
            }
            var g = this.opt.extinfo, m = "";
            g && (m = g.vid);
            var v = {
                action: "enterEmbedMpVideo",
                mpBizUin: this.opt.__biz || "",
                mpAppMsgId: this.opt.mid || "",
                mpIndex: this.opt.idx || "",
                mpUrl: i,
                bizUsrName: o,
                bizNickName: n,
                videoUrl: f.addParam(this._g.oriSrc || this.src || this.opt.src, "video_md5", this.opt.videoMd5 || ""),
                videoTitle: this.opt.videoTitle,
                videoCurrTime: this.getCurTime(),
                videoWidth: this.opt.videoWidth,
                videoHeight: this.opt.videoHeight,
                videoThumbUrl: this.opt.cover,
                videoDuration: 1 * this.opt.duration,
                videoVid: m,
                playerX: c.left,
                playerY: c.top,
                playerWidth: c.width,
                playerHeight: c.height,
                subscene: 1 * r,
                headImgUrl: this.opt.headImgUrl,
                currFrameData: a,
                forbidForward: this.opt.canShareVideo ? 0 : 1
            };
            this.__isInFullScreen = !0, a && (this._g.jsapiFullScreenId = setTimeout(function () {
                e.__isInFullScreen = !1;
            }, 2e3)), y.invoke("handleMPPageAction", v, function (e) {
                s._g.jsapiFullScreenId && (clearTimeout(s._g.jsapiFullScreenId), s._g.jsapiFullScreenId = null),
                    /:ok$/.test(e.err_msg) ? (s.__isInFullScreen = !0, s.onFullScreenChange({
                        state: !0,
                        type: "jsapi"
                    })) : (s.__isInFullScreen = !1, _.os.android || s.play4outer(0 / 0, {
                        triggerEvent: !1
                    }), s._g.jsapiFullScreenErrCnt++);
            }), _.os.android && (parent.window.CustomFullscreenApi && "function" == typeof parent.window.CustomFullscreenApi._customEnterFullscreen && parent.window.CustomFullscreenApi._customEnterFullscreen(!0),
                t());
        },
        exitFullScreen: function () {
            this.video;
            this.hideLoading(), document.webkitExitFullscreen && document.webkitExitFullscreen(),
                this.__isInFullScreen = !1;
        },
        isInFullScreen: function () {
            return !!this.__isInFullScreen;
        },
        play4outer: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
            this.__forcePause = !1, this.play(e), t.triggerEvent !== !1 && this._trigger("userplay"),
                this._hidePlayControllBar();
        },
        pause4outer: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            this.hideLoading(), this.pause(), e.triggerEvent !== !1 && this._trigger("userpause"),
                this.hideControllBar(), this._showPlayControllBar();
        },
        setWidth: function (e) {
            this.container.find(".js_page_video").css({
                width: e
            });
        },
        setHeight: function (e) {
            this.container.find(".js_page_video").css({
                height: e
            });
        },
        showCover: function () {
            this.container.find(".js_poster_cover").show();
        },
        hideCover: function () {
            this.container.find(".js_poster_cover").hide();
        },
        showFuncControllBar: function () {
            var e = this.container.find(".js_progress_bar,.js_full_screen_control");
            e.show(), this.__hasFuncControllBar = !0;
        },
        hideFuncControllBar: function () {
            var e = this.container.find(".js_progress_bar,.js_full_screen_control");
            e.hide(), this.__hasFuncControllBar = !1;
        },
        showControllBar: function () {
            this.__touchVideoTimeoutHandler && clearTimeout(this.__touchVideoTimeoutHandler), this.__timerHideControll && (clearTimeout(this.__timerHideControll),
                this.__timerHideControll = null), this.__userplaytime || this.container.find(".js_controll").removeClass("opr_fade_out").show(),
                this.opt.canShareVideo && (this.__userplaytime ? this.container.find(".js_page_video").addClass("wx_video_status_initial") : this.container.find(".js_page_video").removeClass("wx_video_status_initial"),
                    this.container.find(".js_share_btn_contain").removeClass("opr_fade_out").show());
        },
        hideControllBar: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = this.container.find(".js_controll"), i = this.container.find(".js_share_btn_contain");
            t.removeClass("opr_fade_in");
            var o = this;
            o.__timerHideControll && clearTimeout(o.__timerHideControll), t.addClass("opr_fade_out"),
                e.showShareBtn !== !0 ? i.removeClass("opr_fade_in").addClass("opr_fade_out") : i.removeClass("opr_fade_out").show(),
                o.__timerHideControll = setTimeout(function () {
                    t.hide(), e.showShareBtn !== !0 && i.hide();
                }, 500);
        },
        showLoading: function (e) {
            var t = this;
            this.__always_hide_loading || this.__isshowLoading && this.video && this.video.currentTime > 1 || (this.__isshowLoading = !0,
                this._g.resetShowingLoadingTimeoutId && (clearTimeout(this._g.resetShowingLoadingTimeoutId),
                    this._g.resetShowingLoadingTimeoutId = null), this._g.resetShowingLoadingTimeoutId = window.setTimeout(function () {
                        t.__isshowLoading = !1;
                    }, 1e3), this._g.showingLoadingTimeoutId && (clearTimeout(this._g.showingLoadingTimeoutId),
                        this._g.showingLoadingTimeoutId = null), "firstTime" == e ? this.container.find(".js_loading").addClass("start_loading").show() : this._g.showingLoadingTimeoutId = setTimeout(function () {
                            t.container.find(".js_loading").show();
                        }, 800));
        },
        hideLoading: function () {
            this.container.find(".js_loading").removeClass("start_loading").hide(), this._g.showingLoadingTimeoutId && (clearTimeout(this._g.showingLoadingTimeoutId),
                this._g.showingLoadingTimeoutId = null);
        },
        triggerMuted: function (e) {
            e ? (r(this.video, !0), this.container.find(".js_muted_btn").addClass("muting")) : (r(this.video, !1),
                this.container.find(".js_muted_btn").removeClass("muting"));
        },
        setVideoCSS: function (e) {
            var t = this, i = t.container, o = i.find(".js_page_video");
            o.css(e);
        },
        afterFirstLoaded: function () {
            this.__userplaytime && (this.__userplaytime = !1, this.reportRealLoadingTime(), this._trigger("touchVideo", {
                isShow: !0
            }));
        },
        reportRealLoadingTime: function () {
            var e = this;
            e.__firstPlayEnd = +new Date;
            var t = parseInt(e.__firstPlayEnd - e.__firstPlayStart);
            if (console.info("[视频点击播放耗时]", t), e._trigger("firstBufferingTime", {
                bufferingTime: t
            }), m.proxyPreloadExper()) {
                var i = w.toBase64(JSON.stringify({
                    scene: window.source,
                    sessionid: window.sessionid
                }));
                1 == m.proxyPreloadExper().experSet ? v.saveSpeeds({
                    sample: 1,
                    uin: window.encodeURIComponent(w.toBase64(window.user_uin)) || uin,
                    pid: 1045,
                    speeds: {
                        sid: 21,
                        time: t
                    },
                    user_define: i
                }) : 2 == m.proxyPreloadExper().experSet ? v.saveSpeeds({
                    sample: 1,
                    uin: window.encodeURIComponent(w.toBase64(window.user_uin)) || uin,
                    pid: 1045,
                    speeds: {
                        sid: 22,
                        time: t
                    },
                    user_define: i
                }) : 3 == m.proxyPreloadExper().experSet ? v.saveSpeeds({
                    sample: 1,
                    uin: window.encodeURIComponent(w.toBase64(window.user_uin)) || uin,
                    pid: 1045,
                    speeds: {
                        sid: 23,
                        time: t
                    },
                    user_define: i
                }) : 4 == m.proxyPreloadExper().experSet && v.saveSpeeds({
                    sample: 1,
                    uin: window.encodeURIComponent(w.toBase64(window.user_uin)) || uin,
                    pid: 1045,
                    speeds: {
                        sid: 24,
                        time: t
                    },
                    user_define: i
                }), v.send();
            }
        },
        hasFullScreen: function () {
            return this.isInFullScreen();
        },
        hasDrag: function () {
            return !!this.__has_drag;
        },
        getCurTime: function () {
            return this.video.currentTime;
        },
        getEndDom: function () {
            return this.container.find(".js_end_dom");
        },
        getDrag: function () {
            return this.__dragTimes;
        },
        getPlayTotalTime: function () {
            return this.__endCountTime(), this.__play_total_time;
        },
        getLog: function () {
            var e = this.log || {};
            return {
                hasended: e.hasended,
                last_ms: Math.floor(1e3 * (e.lastsec || 0)),
                duration_ms: Math.floor(1e3 * (e.duration || 0)),
                video_error: e.video_error || 0,
                video_error_code: e.video_error_code || 0,
                loadwait: e.loadwait || 0
            };
        },
        isPlay: function () {
            return !this.video.paused && !this.isEnd();
        },
        isPause: function () {
            return !!this.video.paused;
        },
        isEnd: function () {
            return !!this.video.ended;
        },
        hasBeginPlay: function () {
            return this.__hasBeginPlay;
        },
        destroy: function () {
            p.removeListener({
                type: "broadcastPlay",
                func: this._event.broadcastPlay
            });
            try {
                delete parent.window.__MpPlayers[this.id];
            } catch (e) { }
            C.visibilityPausePlayer === this && (C.visibilityPausePlayer = null);
        },
        _setBeginPlayStatus: function () {
            var e = this;
            this.hideLoading(), this.container.find(".js_video_play_controll").css({
                display: "block"
            });
            var t = this.opt.duration;
            t && t > 0 && this.container.find(".js_video_length").html(I(t)).show(), 1 == this.__iosPreloadPause && !function () {
                var t = e;
                setTimeout(function () {
                    var e = t.container.find(".js_video_pause_controll");
                    e.hide();
                    var i = t.container.find(".js_video_play_controll");
                    i.show();
                });
            }();
        },
        hidePlayBtn: function () {
            this.container.find(".js_video_play_controll").hide();
        }
    }), V._getFormatTime = I, V;
}); function _typeof(e) {
    return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
}
define("new_video/plugin/ad.js", ["biz_wap/zepto/zepto.js", "biz_wap/zepto/event.js", "biz_wap/zepto/touch.js", "biz_wap/utils/device.js", "biz_wap/utils/ajax.js", "biz_wap/utils/storage.js", "biz_wap/utils/hashrouter.js", "biz_wap/jsapi/core.js", "biz_wap/utils/jsmonitor_report.js", "new_video/plugin_base.js", "new_video/plugin/imgAd.js", "new_video/plugin/frameAd.js", "new_video/ctl.js", "new_video/player.js", "a/wxopen_card.js", "biz_common/utils/report.js", "biz_wap/utils/openUrl.js", "a/a_utils.js", "a/a_config.js", "biz_common/utils/url/parse.js", "biz_wap/utils/mmversion.js", "common/utils.js"], function (require, exports, module, alert) {
    "use strict";
    function log(e) {
        "undefined" != typeof JSAPI && JSAPI.log && JSAPI.log(e);
    }
    function report(e, t) {
        Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type=" + e + t);
    }
    function adOptReport(e, t, a, i) {
        t = 6, Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type=" + e + "&pos_type=" + t + "&trace_id=" + a + "&aid=" + i + "&__biz=" + parent.window.biz + "&r=" + Math.random());
    }
    function setPageTitle(e) {
        JSAPI.invoke("setPageTitle", {
            title: e || ""
        }), parent.window.document.title = e;
    }
    function videoAdReport(e) {
        ajax({
            url: "/mp/ad_video_report?action=" + (e.action || "exposure"),
            type: "post",
            data: {
                step: e.step || "",
                view_id: e.view_id || "",
                traceid: e.traceid || "",
                orderid: e.orderid || 0,
                ad_source: e.ad_source || 0,
                report_time: e.report_time,
                devicetype: parent.window.devicetype,
                version: parent.window.clientversion,
                __biz: parent.window.biz || "",
                lcount: 1,
                type: e.type
            }
        });
    }
    function report3rd(e, t) {
        e = 1e3 * e | 0, t.forEach(function (t) {
            1 != t.reported && e >= t.report_time && (t.reported = 1, iframe && iframe.contentWindow && iframe.contentWindow.postMessage(JSON.stringify({
                type: "report",
                url: t.url
            }), location.protocol + "//" + location.host));
        });
    }
    function parseCookie(e) {
        var t, a;
        try {
            t = e.split("Expires="), a = t[1] && t[1].replace(";", ""), a = Date.parse(a);
        } catch (i) {
            a = null;
        }
        return a;
    }
    require("biz_wap/zepto/zepto.js"), require("biz_wap/zepto/event.js"), require("biz_wap/zepto/touch.js");
    var Device = require("biz_wap/utils/device.js"), ajax = require("biz_wap/utils/ajax.js"), LS = require("biz_wap/utils/storage.js"), HashRouter = require("biz_wap/utils/hashrouter.js"), JSAPI = require("biz_wap/jsapi/core.js"), jsmonitorReport = require("biz_wap/utils/jsmonitor_report.js"), Plugin = require("new_video/plugin_base.js"), ImgAd = require("new_video/plugin/imgAd.js"), FrameAd = require("new_video/plugin/frameAd.js"), VideoCtl = require("new_video/ctl.js"), Player = require("new_video/player.js"), Wxopen_card = require("a/wxopen_card.js"), Report = require("biz_common/utils/report.js"), openUrl = require("biz_wap/utils/openUrl.js"), utils = require("a/a_utils.js"), AD_CONFIG = require("a/a_config.js"), urlParser = require("biz_common/utils/url/parse.js"), mmversion = require("biz_wap/utils/mmversion.js"), commonUtils = require("common/utils.js"), OpenUrlWithExtraWebview = openUrl.openUrlWithExtraWebview, openWebAppStore = utils.openWebAppStore, CAN_CLOSE_TIME = 5, AD_TYPE_VIDEO15S = 1515, AD_TYPE_VIDEO6S = 888, AD_TYPE_IMG5S = 555, is_yyb_installed = !1, yyb_pkgname = "com.tencent.android.qqdownloader", yyb_min_version = 1060125;
    JSAPI.invoke("getInstallState", {
        packageName: yyb_pkgname
    }, function (e) {
        var t = e.err_msg;
        log("getInstallState @yingyongbao : " + t);
        var a = t.lastIndexOf("_") + 1, i = t.substring(a);
        1 * i >= yyb_min_version && t.indexOf("get_install_state:yes") > -1 && (is_yyb_installed = !0);
    });
    var fnOpenApp = function (e) {
        JSAPI.invoke("launchApplication", {
            schemeUrl: e
        });
    }, appmsgTitle = parent.window.document.title, testJson = {
        base_resp: {
            ret: 0
        },
        ticket: "asd",
        video_ad_item_list: [{
            url: "http://www.qq.com/",
            report_time: 0,
            no_click: 0,
            jump_url: "http://wximg.qq.com/tmt/_events/20150831-gongyi/dist/html/",
            local_storage: "",
            report_3rd: [],
            duration: 15e3,
            aid: "testviewid",
            view_id: "testviewid",
            orderid: "testorderid",
            traceid: "testtraceid",
            pt: 100,
            app_info: {
                auto_download: 1,
                app_id: 1206479,
                app_name: "天朝小将",
                version_code: 390,
                apk_name: "com.joygame.loong",
                app_md5: "5E82FC113CECB2773598646D7301587D",
                appinfo_url: "http://imc.l.qq.com/ss",
                signature_md5: "5F1C5D905813BD1F382A4E72B978F2F7",
                channel_id: "xxx"
            },
            ad_source: 1,
            creative_type: AD_TYPE_VIDEO15S,
            img_url: "http://shp.qpic.cn/qqvideo/0/q1320k59fh8/400",
            close_time: 0
        }]
    }, r = Math.random();
    testJson.video_ad_item_list[0].creative_type = AD_TYPE_VIDEO15S, testJson.video_ad_item_list[0].duration = 15e3,
        testJson.video_ad_item_list[0].close_time = 5e3;
    var doc = parent.window.document, iframe = doc.getElementById("js_video_ad_iframe");
    iframe || (iframe = doc.createElement("iframe"), iframe.src = "/mp/readtemplate?t=pages/video_ad_iframe",
        iframe.id = "js_video_ad_iframe", iframe.className = "video_ad_iframe");
    var iframeWrap = doc.getElementById("js_video_ad_iframe_wrap");
    iframeWrap || (iframeWrap = doc.createElement("div"), iframeWrap.id = "js_video_ad_iframe_wrap",
        iframeWrap.className = "video_ad_iframe", iframeWrap.style.overflow = "scroll", iframeWrap.style.webkitOverflowScrolling = "touch",
        iframeWrap.style.display = "none", iframeWrap.appendChild(iframe), doc.body.appendChild(iframeWrap));
    var AdPlugin = function (e) {
        "undefined" == typeof e.videoReportType && (e.videoReportType = -1), this.hasPlayAd = !1,
            this.hasError = !1, this.vid = e.vid, this.oriVid = e.oriVid, this.opt = e, this.isMpVideo = e.isMpVideo,
            console.log("init ad vid test: " + e.vid), this.initAd = !1;
        var t = this;
        this._ad_play_time = -1, this.__beforeplayHandler = [], t.__initAd();
    };
    return Plugin.inherit(AdPlugin, Plugin.Class), AdPlugin.prototype.__getAd = function (suc, err, complete) {
        var __commonVideoReport = parent.window.__commonVideoReport, that = this, opt = this.opt, tmpsn = "," + ["bbbe1aa6f92bad5000f34bb3cd8b5640", "7d8e21a2fb0233d4cfc18d2e0ee0470b", "5a2492d450d45369cd66e9af8ee97dbd", "b5d3e9820a9e5c3fb442944c597efecf"].join(",") + ",";
        if (-1 != parent.location.href.indexOf("&_video_testad=1") && opt.tmpGetAd && tmpsn.indexOf("," + parent.sn + ",") >= 0) {
            var tmpSuc = function (e) {
                var t = e && e.data && e.data.totalUrl, a = e && e.data && e.data.time;
                if (t && a) {
                    var i = testJson;
                    a = i.video_ad_item_list[0].duration / 1e3, i.video_ad_item_list[0].url = t;
                    var o = that.adData = i.video_ad_item_list && i.video_ad_item_list[0];
                    o.creative_type = o.creative_type || AD_TYPE_VIDEO15S, o.close_time = "undefined" == typeof o.close_time ? 5e3 : o.close_time,
                        that.__beforeplayHandler.push({
                            func: videoAdReport,
                            arg: [{
                                step: 0 == i.base_resp.ret ? 1 : 3,
                                view_id: o.view_id,
                                traceid: o.traceid,
                                orderid: o.orderid,
                                ad_source: o.ad_source,
                                report_time: 0,
                                type: that.opt.videoReportType
                            }]
                        }), that.reportData = that.reportData2 = [], suc({
                            video_ad_list: [{
                                image: [{
                                    url: t
                                }],
                                duration: 1e3 * a
                            }]
                        });
                } else err();
                complete();
            };
            return opt.tmpGetAd(tmpSuc, function () {
                err(), complete();
            }), !1;
        }
        if (parent && parent.window && 1 == parent.window.no_vedio_ad) return err(), complete(), !1;
        var cgiData = window.cgiData || {};
        ajax({
            url: "/mp/ad_video",
            type: "post",
            data: {
                vid: that.vid,
                clienttime: +new Date,
                is_gray: VideoCtl.showAd() ? 1 : 0,
                webviewid: VideoCtl.getWebviewid(),
                __biz: parent.window.biz || "",
                appmsgid: cgiData.mid,
                idx: cgiData.idx,
                type: that.opt.videoReportType
            },
            success: function success(resp) {
                __commonVideoReport && __commonVideoReport(60);
                try {
                    resp = eval("(" + resp + ")");
                } catch (e) {
                    resp = {};
                }
                if (that.adVideoRet = resp.base_resp && resp.base_resp.ret, that.ticket = resp.ticket || "",
                    !resp.base_resp || 0 != resp.base_resp.ret && 1 != resp.base_resp.ret) return void err();
                var adData = that.adData = resp.video_ad_item_list && resp.video_ad_item_list[0];
                return adData ? (that.__beforeplayHandler.push({
                    func: videoAdReport,
                    arg: [{
                        step: 0 == resp.base_resp.ret ? 1 : 3,
                        view_id: adData.view_id,
                        traceid: adData.traceid,
                        orderid: adData.orderid,
                        ad_source: adData.ad_source,
                        report_time: 0,
                        type: that.opt.videoReportType
                    }]
                }), adData.creative_type = adData.creative_type || AD_TYPE_VIDEO15S, adData.close_time = "undefined" == typeof adData.close_time ? 5e3 : adData.close_time,
                    adData.creative_type != AD_TYPE_VIDEO15S && adData.creative_type != AD_TYPE_VIDEO6S || adData.url ? (that.reportData = [{
                        step: 3,
                        time: adData.report_time || 0,
                        traceid: adData.traceid,
                        orderid: adData.orderid,
                        ad_source: adData.ad_source,
                        view_id: adData.view_id
                    }], that.reportData2 = [{
                        step: 3,
                        time: 0
                    }, {
                        step: 4,
                        time: 5
                    }], void suc({
                        video_ad_list: [{
                            image: [{
                                url: adData.url
                            }],
                            duration: adData.duration
                        }]
                    })) : void err()) : void err();
            },
            error: function (e) {
                err();
                var t = ["uin:" + parent.window.user_uin, "status:" + e && e.status].join("|");
                (new Image).src = "/mp/jsreport?key=69&content=" + t + "&r=" + Math.random();
            },
            complete: complete
        });
    }, AdPlugin.prototype.__openWebview = function (e, t) {
        var a = this.adPlayer, i = this;
        i.adData.jump_url = e, JSAPI.invoke("openUrlWithExtraWebview", {
            url: e,
            openType: 1
        }, function (e) {
            e.err_msg.match(/\:ok$/) ? (a.pause(), JSAPI.on("activity:state_change", function (e) {
                "onresume" == e.state.toLowerCase() && a.play();
            })) : parent.window.location.hash = "complain" == t ? "adcomplain" + i.vid : "addetail" + i.vid;
        });
    }, AdPlugin.prototype.__init6sVideoBtn = function () { }, AdPlugin.prototype.__initIosAppBtn = function () {
        var e = this, t = (this.player, this.adData), a = this.adPlayer, i = a._getContainer(), o = i.find(".js_ad_app"), r = i.find(".js_btn_ad_app"), d = t.jump_url;
        (-1 != d.indexOf("https://itunes.apple.com/") || -1 != d.indexOf("http://itunes.apple.com/")) && (o.show(),
            r.on("touchend", function () {
                e.__clickreport(), a.pause(), setTimeout(function () {
                    JSAPI.invoke("downloadAppInternal", {
                        appUrl: d
                    }, function (t) {
                        t.err_msg && -1 != t.err_msg.indexOf("ok") || e.__openWebview(d);
                    });
                }, 500);
            }));
    }, AdPlugin.prototype.__initAndroidAppBtn = function () {
        var e = this, t = (this.player, this.adData), a = t.app_info, i = this.adPlayer, o = i._getContainer(), r = o.find(".js_ad_app"), d = o.find(".js_btn_ad_app"), n = !1, p = "", s = a.auto_download || 0;
        1 == s && d.addClass("primary").text("立即下载"), JSAPI.invoke("getInstallState", {
            packageName: a.apk_name
        }, function (e) {
            var t = e.err_msg;
            log("getInstallState @" + a.apk_name + " : " + t);
            var i = t.lastIndexOf("_") + 1, o = t.substring(i);
            1 * o >= a.version_code && t.indexOf("get_install_state:yes") > -1 ? (n = !0, d.text("已安装app"),
                d.removeClass("btn_download"), d.addClass("btn_installed")) : r.show();
        }), d.on("touchend", function () {
            if (is_yyb_installed && !n) {
                e.__clickreport();
                var i = "";
                a.channel_id && (i = "&channelid=" + a.channel_id);
                var o = ["&via=ANDROIDWX.YYB.WX.ADVERTISE", t.traceid, t.aid, a.apk_name, 0, 15, 1].join(".");
                setTimeout(function () {
                    fnOpenApp("tmast://download?oplist=1;2&pname=" + a.apk_name + i + o);
                }, 500);
            } else {
                if (n) return !1;
                e.__clickreport(), setTimeout(function () {
                    var i = "http://mp.weixin.qq.com/mp/ad_app_info?t=ad/videoad_app_detail&action=new&app_id=" + a.app_id + p + "&md5sum=" + a.app_md5 + "&auto=" + s + ["&__biz=", parent.window.biz, "&uin=", uin, "&key=", key, "&pass_ticket=", pass_ticket, "&ticket=", e.ticket].join("");
                    1 != t.ad_source || !t.jump_url || 0 != t.jump_url.indexOf("http://mp.weixin.qq.com/tp/ad_detail_info") && 0 != t.jump_url.indexOf("https://mp.weixin.qq.com/tp/ad_detail_info") || (i = t.jump_url,
                        -1 != i.indexOf("#wechat_redirect") ? i = i.replace("#wechat_redirect", "&ticket=" + e.ticket + "#wechat_redirect") : i += "&ticket=" + e.ticket),
                        e.__openWebview(i);
                }, 500);
            }
        });
    }, AdPlugin.prototype.__initDetailBtn = function () {
        var e = this, t = this.player, a = this.adPlayer, i = a._getContainer(), o = i.find(".js_ad_detail"), r = i.find(".js_btn_ad_detail"), d = i.find(".js_ad_opt_list_btn"), n = i.find(".js_complain_btn"), p = i.find(".js_ad_opt_list");
        100 == e.adData.pt ? (r.text("了解公众号"), e.adData.jump_url = e.adData.jump_url.replace("#", "&jsapi_scene=107&AdType=64#")) : 6 == e.adData.dest_type ? (r.html(46 == e.adData.product_type ? '<span class="icon26_weapp_white js_video_post_weapp_icon"></span> 进入小游戏' : '<span class="icon26_weapp_white js_video_post_weapp_icon"></span> 了解详情'),
            $(".js_btn_ad_detail").removeClass("with_arrow").addClass("with_weapp"), Wxopen_card.startConnect(e.adData)) : (12 == e.adData.product_type || 19 == e.adData.product_type) && r.text("下载应用"),
            o.show(), r.on("touchend", function () {
                var a = e.adData.jump_url;
                return 9 == e.adData.dest_type ? (JSAPI.invoke("openADCanvas", {
                    canvasId: e.adData.canvas_info.canvas_id,
                    preLoad: 0,
                    noStore: 0,
                    extraData: JSON.stringify({
                        pos_type: e.adData.pos_type
                    }),
                    adInfoXml: e.adData.canvas_info.ad_info_xml
                }, function (e) {
                    0 != e.ret ? (OpenUrlWithExtraWebview(t.opt.url), report(135, t.opt)) : report(134, t.opt);
                }), e.__clickreport(), !1) : void (a && 6 != e.adData.dest_type ? ((0 == a.indexOf("http://mp.weixin.qq.com") || 0 == a.indexOf("https://mp.weixin.qq.com")) && (-1 == a.indexOf("?") ? a += "?ticket=" + e.ticket : -1 == a.indexOf("#") ? a += "&ticket=" + e.ticket : a = a.replace("#", "&ticket=" + e.ticket + "#")),
                    e.__openWebview(a), e.__clickreport()) : 6 == e.adData.dest_type && (e.adData.url = e.adData.jump_url,
                        Wxopen_card.openWxopen(e.adData), e.__clickreport()));
            }), d.on("touchend", function () {
                return window.can_see_complaint || (p.toggle(), adOptReport(0, e.adData.pos_type, e.adData.traceid, e.adData.aid)),
                    !1;
            }), n.on("touchend", function () {
                var t = "https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid=" + e.adData.aid + "&traceid=" + e.adData.traceid + "&source=6&biz=" + parent.window.biz;
                return adOptReport(1, e.adData.pos_type, e.adData.traceid, e.adData.aid), e.__openWebview(t),
                    !1;
            });
    }, AdPlugin.prototype.__clickreport = function () {
        {
            var e = this;
            this.player;
        }
        videoAdReport({
            action: "click",
            view_id: e.adData.view_id,
            traceid: e.adData.traceid,
            orderid: e.adData.orderid,
            ad_source: e.adData.ad_source,
            report_time: e.getAdPlaytime(),
            type: e.opt.videoReportType
        }), VideoCtl.report({
            vid: e.vid,
            step: 8,
            ext1: e.getAdPlaytime(),
            ext2: e.adData.jump_url,
            ad_source: e.adData.ad_source,
            orderid: e.getOrderid(),
            traceid: e.getTraceId(),
            type: e.opt.videoReportType,
            fromid: e.opt.fromid
        }), e.adData.report_3rd_click_url && e.adData.report_3rd_click_url.forEach(function (e) {
            iframe && iframe.contentWindow && iframe.contentWindow.postMessage(JSON.stringify({
                type: "report",
                url: e
            }), location.protocol + "//" + location.host);
        });
    }, AdPlugin.prototype.__initAdEx = function () {
        var e = this, t = this.adData, a = t.pt, i = (this.player, this.adPlayer, t.creative_type);
        if (1 != t.no_click && (i == AD_TYPE_VIDEO15S || i == AD_TYPE_VIDEO6S || i == AD_TYPE_IMG5S)) {
            if (9 == e.adData.dest_type || 6 == e.adData.dest_type) return void e.__initDetailBtn();
            if (103 == a) return void e.__initIosAppBtn();
            if (104 == a) return void e.__initAndroidAppBtn();
            if (t.jump_url) return void e.__initDetailBtn();
        }
    }, AdPlugin.prototype.hasAd = function (e) {
        if (!e || !e.advertisement_info || !e.advertisement_info.length) return !1;
        for (var t = 0; t < e.advertisement_info.length; t++) {
            var a = e.advertisement_info[t];
            a.pos_type === AD_CONFIG.AD_POS.POS_AD_BEFORE_VIDEO && 1 === a.is_mp_video && a.vid === this.oriVid && commonUtils.report120081(8);
        }
        for (var i = 0; i < e.advertisement_info.length; i++) {
            var a = e.advertisement_info[i];
            if (a.pos_type === AD_CONFIG.AD_POS.POS_AD_BEFORE_VIDEO && 0 === a.is_mp_video && a.vid === this.oriVid) return !0;
        }
        return !1;
    }, AdPlugin.prototype.newHasAd = function () {
        try {
            for (var e = window.parent.document.getElementsByTagName("iframe"), t = 0; t < e.length; t++)(window === e[t].contentWindow && e[t].adVidFromAppmsg || e[t].adVidFromAppmsg === window.realVid) && utils.report115849(67);
        } catch (a) { }
    }, AdPlugin.prototype.newInitAd = function () {
        var e = this, t = void 0;
        utils.listenMessage(window, function (a, i) {
            if (i.action === AD_CONFIG.AD_VIDEO_END_ACTION) return e.hasPlayAd = !0, void e.player._trigger("beginPlay");
            if (i.action === AD_CONFIG.APPMSGAD_READY_ACTION) {
                if (utils.report115849(37), e.initAd = !0, window.adVidFromAppmsg && utils.report115849(66),
                    e.newHasAd(), !e.hasAd(i.value)) return;
                utils.report115849(36), e.hasError = !1;
            } else !e.initAd && utils.postMessage(window.parent, AD_CONFIG.GET_APPMSGAD_READY_STATUS_ACTION, "");
            i.action !== AD_CONFIG.SEND_AD_VID_ACTION || t ? !t && utils.postMessage(window.parent, AD_CONFIG.GET_AD_VID_ACTION, "") : (i.value.adVidFromAppmsg && !window.adVidFromAppmsg && (window.adVidFromAppmsg = i.value.adVidFromAppmsg),
                i.value.adVidFromAppmsg && utils.report115849(57), t = !0);
        }), utils.postMessage(window.parent, AD_CONFIG.GET_APPMSGAD_READY_STATUS_ACTION, ""),
            utils.postMessage(window.parent, AD_CONFIG.GET_AD_VID_ACTION, ""), e.readyBeginPlayHandler = function () {
                return utils.report115849(23), this.hasPlayAd || this.hasError || !window.adVidFromAppmsg ? Plugin.BASE_BITSET : (utils.postMessage(window.parent, "onVideoPlayV2", {
                    vid: window.adVidFromAppmsg,
                    playAd: !0
                }), this.player._trigger("preload"), 8);
            }, e.beginPlayHandler = function () {
                return this.hasPlayAd || this.hasError || !window.adVidFromAppmsg ? Plugin.BASE_BITSET : 14;
            }, e.loadingHandler = function () {
                if (this.hasSetAdSrc || this.hadPlayAd || this.hasError) return Plugin.BASE_BITSET;
                var e = this, t = e.player;
                return e._whenGetAdSrc(function () {
                    utils.report115849(65), !this.initAd || this.hasError || this.hasSetAdSrc || (this.hasSetAdSrc = !0,
                        this.setUnblockEvt("loading")), window.adVidFromAppmsg || (this.hasPlayAd = !0), t.hideLoading(),
                        t._trigger("loading"), window.adVidFromAppmsg && utils.report115849(50);
                }), 1;
            };
    }, AdPlugin.prototype.__initAd = function () {
        var e = this;
        return utils.listenMessage(window, function (t, a) {
            a.action === AD_CONFIG.AD_VIDEO_PLAY_ACTION && e.player.pause();
        }), this.isMpVideo ? (e.newInitAd(), void utils.report115849(74)) : (utils.report115849(24),
            void e.newInitAd());
    }, AdPlugin.prototype.__initOriginalVideoAd = function () {
        var e = this;
        window.parent.postMessage({
            action: "originalVideoAdNeedData",
            vid: e.vid
        }, "*"), window.addEventListener("message", function (t) {
            t.data && "receiveOriginalVideoData" == t.data.action && t.data.vid == e.vid && (e.initAd = !0,
                e.hasError = !1, e.adData = t.data.adData, e.adData && e.adData.vid ? commonUtils.report120081(1) : e.hasError = !0,
                e.player && e.player.hideLoading());
        });
    }, AdPlugin.prototype.getAdPlaytime = function () {
        return this._ad_play_time;
    }, AdPlugin.prototype.getTraceId = function () {
        return this.adData && this.adData.traceid ? this.adData.traceid : 0;
    }, AdPlugin.prototype.getOrderid = function () {
        return this.adData && this.adData.orderid ? this.adData.orderid : 0;
    }, AdPlugin.prototype.init = function () {
        this.container = $(this.player.opt.container), 0 == this.hasError && (this.player.showLoading(),
            this.setBlockEvt("loading"));
    }, AdPlugin.prototype.noop = function () {
        return this.hasPlayAd || this.hasError ? Plugin.BASE_BITSET : 10;
    }, AdPlugin.prototype.loadingHandler = function () {
        if (this.hasSetAdSrc || this.hadPlayAd || this.hasError) return Plugin.BASE_BITSET;
        var e = this, t = e.player;
        return e._whenGetAdSrc(function () {
            if (this.initAd && !this.hasError && !this.hasSetAdSrc) {
                var a = e.video_url, i = t.opt, o = e.adData, r = o.creative_type, d = e.container, n = window.cgiData || {};
                if (o.vid && 7 == o.pos_type) var p = e.adPlayer = new FrameAd({
                    duration: o.duration,
                    videoDuration: e.duration,
                    container: d,
                    imgUrl: o.img_url,
                    adData: o,
                    ratio: i.ratio,
                    width: i.width,
                    height: i.height,
                    JSAPI: JSAPI,
                    appmsgData: {
                        biz: parent.window.biz || "",
                        appmsgid: n.mid,
                        idx: n.idx,
                        vid: o.vid
                    },
                    onTimeupdate: function (t, a) {
                        e.timeupdate(t, a);
                    },
                    onEnd: function () {
                        e.end();
                    },
                    onHandler: function (a) {
                        function i(e) {
                            var t = document.createElement("div");
                            t.innerHTML = e;
                            var a = t.innerText || t.textContent;
                            return t = null, a;
                        }
                        var o = e.adData.jump_url, r = e.adData;
                        if (console.log(e.adData.button_action), console.log(_typeof(e.adData.button_action)),
                            "string" == typeof e.adData.button_action && (console.log(i(e.adData.button_action)),
                                e.adData.button_action = JSON.parse(i(e.adData.button_action))), e.adData.button_action && e.adData.button_action.jump_url && (o = e.adData.button_action.jump_url),
                            console.log(o), "openFeedback" == a.proxyData.methodName) {
                            var d = "https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid=" + e.adData.aid + "&traceid=" + e.adData.traceid + "&source=6&biz=" + parent.window.biz;
                            return adOptReport(1, e.adData.pos_type, e.adData.traceid, e.adData.aid), e.__openWebview(d),
                                !1;
                        }
                        if (r.app_info && r.app_info.url_scheme && mmversion.gtVersion("6.5.6", !0)) {
                            var n = 1, p = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
                            p && p[1] && parseInt(p[1].split("_")[0], 10) >= 12 && (n = 0);
                            var s = {
                                schemeUrl: r.app_info.url_scheme,
                                messageExt: r.app_info.url_scheme,
                                appID: r.app_info.open_platform_appid
                            };
                            return r.product_type === AD_TYPE.IOS_APP_PRODUCT_TYPE && utils.extend(s, {
                                installSchemeUrl: r.app_info.appinfo_url,
                                installAction: n
                            }), void JSAPI.invoke("launchApplication", s, function (e) {
                                (-1 === e.err_msg.indexOf("ok") || "fail" === e.launchInstallResult) && (utils.isItunesLink(r.app_info.appinfo_url) ? openWebAppStore(r.app_info.appinfo_url, r.ticket) : location.href = r.app_info.url_scheme);
                            });
                        }
                        if (9 == e.adData.dest_type) return JSAPI.invoke("openADCanvas", {
                            canvasId: e.adData.canvas_info.canvas_id,
                            preLoad: 0,
                            noStore: 0,
                            extraData: JSON.stringify({
                                pos_type: e.adData.pos_type
                            }),
                            adInfoXml: e.adData.canvas_info.ad_info_xml
                        }, function (e) {
                            0 != e.ret ? (OpenUrlWithExtraWebview(o), report(135, t.opt)) : report(134, t.opt);
                        }), e.__clickreport(), !1;
                        if (19 == e.adData.product_type) return openWebAppStore(e.adData.app_info.appinfo_url, e.adData.ticket),
                            !1;
                        if (12 == e.adData.product_type) {
                            var _ = e.adData.app_info;
                            return JSAPI.invoke("getInstallState", {
                                packageName: _.apk_name
                            }, function (t) {
                                var a = t.err_msg, i = a.lastIndexOf("_") + 1, r = a.substring(i), d = !1, n = "";
                                if (1 * r >= _.version_code && a.indexOf("get_install_state:yes") > -1 && (d = !0), is_yyb_installed && !d) {
                                    var p = "";
                                    _.channel_id && (p = "&channelid=" + _.channel_id);
                                    var s = ["&via=ANDROIDWX.YYB.WX.ADVERTISE", e.adData.traceid, e.adData.aid, _.apk_name, 0, 15, 1].join(".");
                                    fnOpenApp("tmast://download?oplist=1;2&pname=" + _.apk_name + p + s);
                                } else if (d) console.log("has install app and do nothing"); else {
                                    var l = "http://mp.weixin.qq.com/mp/ad_app_info?t=ad/videoad_app_detail&action=new&app_id=" + _.app_id + n + "&md5sum=" + _.app_md5 + "&auto=" + _.auto_download + ["&__biz=", parent.window.biz, "&uin=", uin, "&key=", key, "&pass_ticket=", pass_ticket, "&ticket=", e.adData.ticket].join("");
                                    !o || 0 != o.indexOf("http://mp.weixin.qq.com/tp/ad_detail_info") && 0 != o.indexOf("https://mp.weixin.qq.com/tp/ad_detail_info") || (l = o,
                                        -1 != l.indexOf("#wechat_redirect") ? l = l.replace("#wechat_redirect", "&ticket=" + e.adData.ticket + "#wechat_redirect") : l += "&ticket=" + e.adData.ticket),
                                        e.__openWebview(l);
                                }
                            }), !1;
                        }
                        if (console.log(o, e.adData.dest_type), o && 6 != e.adData.dest_type) {
                            if (0 == o.indexOf("http://mp.weixin.qq.com") || 0 == o.indexOf("https://mp.weixin.qq.com")) {
                                var l = "ticket=" + e.adData.ticket + "&aid=" + e.adData.aid;
                                -1 == o.indexOf("?") ? o += "?" + l : -1 == o.indexOf("#") ? o += "&" + l : o = o.replace("#", "&" + l + "#");
                            }
                            e.__openWebview(o), e.__clickreport();
                        } else 6 == e.adData.dest_type && (console.log("post open weapp"), e.adData.url = o || e.adData.jump_url,
                            Wxopen_card.openWxopen(e.adData), e.__clickreport());
                    },
                    onError: function () {
                        e.hasError = !0;
                    }
                }); else if (r == AD_TYPE_IMG5S) {
                    var s = d.find(".js_adImgCover");
                    s.html('<img src="' + o.img_url + '">').show();
                    var p = e.adPlayer = new ImgAd({
                        duration: o.duration,
                        container: d,
                        imgUrl: o.img_url,
                        ratio: i.ratio,
                        width: i.width,
                        height: i.height,
                        onTimeupdate: function (t, a) {
                            e.timeupdate(t, a);
                        },
                        onEnd: function () {
                            e.end();
                        }
                    });
                } else if (r == AD_TYPE_VIDEO15S || r == AD_TYPE_VIDEO6S) {
                    var p = e.adPlayer = new Player({
                        defineCSS: !0,
                        container: d,
                        cover: "",
                        ratio: i.ratio,
                        width: i.width,
                        height: i.height,
                        duration: e.duration,
                        autoplay: !1,
                        autoHide: !0,
                        loop: !1,
                        blockTouchVideo: !0,
                        plugins: [],
                        src: a,
                        onTimeupdate: function (t, a) {
                            e.timeupdate(t, a);
                        },
                        onCanplay: function () {
                            0 == e.hasPlayAd && 0 == e.hasError && videoAdReport({
                                step: 2,
                                view_id: e.adData.view_id,
                                traceid: e.adData.traceid,
                                orderid: e.adData.orderid,
                                ad_source: e.adData.ad_source,
                                report_time: 0,
                                type: e.opt.videoReportType
                            });
                        },
                        onEnd: function () {
                            e.end();
                        },
                        onError: function () {
                            var t = e.adPlayer;
                            t.isPlay() ? e.end() : (e.hasError = !0, e._whenEnded());
                        }
                    });
                    p.setSrc(a, -1 == parent.window.location.search.indexOf("&preload=0") ? "auto" : "metadata");
                }
                this.hasSetAdSrc = !0, this.setUnblockEvt("loading");
            }
            t._trigger("loading");
        }), 1;
    }, AdPlugin.prototype.readyBeginPlayHandler = function () {
        var e = this.__beforeplayHandler;
        if (e && e.length > 0) for (var t = null; t = e.shift();) {
            var a = t.func;
            "function" == typeof a && a.apply(this, t.arg || []);
        }
        if (this.hasPlayAd || this.hasError) return Plugin.BASE_BITSET;
        {
            var i = this, o = this.player, r = this.adPlayer, d = r._getContainer(), n = d.find(".js_btn_close_ad"), p = d.find(".js_ad_controll"), s = (d.find(".js_btn_ad_detail"),
                d.find(".js_video_poster")), _ = i.adData;
            _.creative_type;
        }
        r.hideControllBar && r.hideControllBar(), r._trigger("beginPlay"), r._showPlayer && r._showPlayer(),
            o._hidePlayer(), p.show(), n.on("touchend", function () {
                videoAdReport({
                    step: 4,
                    view_id: i.adData.view_id,
                    traceid: i.adData.traceid,
                    orderid: i.adData.orderid,
                    ad_source: i.adData.ad_source,
                    report_time: i.getAdPlaytime(),
                    type: i.opt.videoReportType
                }), VideoCtl.report({
                    vid: i.vid,
                    step: 5,
                    ext1: i.getAdPlaytime(),
                    ext2: i.adVideoRet,
                    orderid: i.getOrderid(),
                    traceid: i.getTraceId(),
                    ad_source: i.adData.ad_source,
                    type: i.opt.videoReportType,
                    fromid: i.opt.fromid
                }), i.__hasShowCanCloseAd && i._whenEnded(!0);
            }), s.on("touchend", function () {
                videoAdReport({
                    step: 6,
                    view_id: i.adData.view_id,
                    traceid: i.adData.traceid,
                    orderid: i.adData.orderid,
                    ad_source: i.adData.ad_source,
                    report_time: i.getAdPlaytime(),
                    type: i.opt.videoReportType
                });
            });
        var l;
        return HashRouter.get("addetail" + i.vid, function () {
            i.adData.jump_url && (iframe && iframe.contentWindow && iframe.contentWindow.postMessage(JSON.stringify({
                type: "page",
                src: i.adData.jump_url
            }), location.protocol + "//" + location.host), iframeWrap.style.display = "block", doc.getElementById("js_article").style.display = "none",
                doc.body.style.overflow = document.documentElement.style.overflow = "hidden", setPageTitle("广告详情"),
                r.pause(), JSAPI.call("hideOptionMenu"), l = parent.window.pageYOffset || doc.documentElement.scrollTop);
        }), HashRouter.get("adcomplain" + i.vid, function () {
            var e = "https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html";
            i.adData.jump_url && (iframe && iframe.contentWindow && iframe.contentWindow.postMessage(JSON.stringify({
                type: "page",
                src: e
            }), location.protocol + "//" + location.host), iframeWrap.style.display = "block", doc.getElementById("js_article").style.display = "none",
                doc.body.style.overflow = document.documentElement.style.overflow = "hidden", setPageTitle("广告投诉"),
                r.pause(), JSAPI.call("hideOptionMenu"), l = parent.window.pageYOffset || doc.documentElement.scrollTop);
        }), HashRouter.get("default", function (e) {
            e == "addetail" + i.vid && (iframeWrap.style.display = "none", doc.getElementById("js_article").style.display = "block",
                doc.body.style.overflow = document.documentElement.style.overflow = "auto", l && parent.window.scrollTo(0, l),
                setPageTitle(appmsgTitle), r.play(), JSAPI.call("showOptionMenu"));
        }), o._trigger("preload"), 8;
    }, AdPlugin.prototype.beginPlayHandler = function () {
        if (this.hasPlayAd || this.hasError) {
            {
                var e = this;
                e.player;
            }
            return Plugin.BASE_BITSET;
        }
        return 14;
    }, AdPlugin.prototype.canplayHandler = function () {
        return this._adEndedTime && !this._canplayTime && (this._canplayTime = +new Date, this._canplayTime - this._adEndedTime > 0 && jsmonitorReport.setAvg(27822, 35, this._canplayTime - this._adEndedTime)),
            Plugin.BASE_BITSET;
    }, AdPlugin.prototype.timeupdateHandler = function () {
        return (this.hasPlayAd || this.hasError) && this.hasError && 1 == this.adVideoRet && this.adData.report_3rd && report3rd(0, this.adData.report_3rd),
            this._adEndedTime && this.hasPlayAd && !this._timeupdateTime && (this._timeupdateTime = +new Date,
                this._timeupdateTime - this._adEndedTime > 0 && jsmonitorReport.setAvg(27822, 37, this._timeupdateTime - this._adEndedTime)),
            Plugin.BASE_BITSET;
    }, AdPlugin.prototype.timeupdate = function (e, t) {
        {
            var a = t.currentTime, i = this, o = i.adData, r = o.creative_type, d = this.adPlayer, n = d._getContainer(), p = n.find(".js_btn_can_close_ad"), s = n.find(".js_can_close_time"), _ = n.find(".js_btn_close_ad"), l = n.find(".js_play_time");
            n.find(".js_can_close_ad"), n.find(".js_ad_detail"), n.find(".js_ad_app");
        }
        i.__isInitAdEx || (console.log("__initAdEx"), i.__initAdEx(), i.__isInitAdEx = !0), o.close_time >= 0 ? a >= CAN_CLOSE_TIME ? (i.__hasShowCanCloseAd || (i.__hasShowCanCloseAd = !0),
            p.hide(), _.show()) : (p.show(), _.hide(), s.text("(" + Math.round(CAN_CLOSE_TIME - a) + "s)")) : p.hide();
        var c = this.duration;
        i._ad_play_time = 1e3 * a | 0, l.text("(" + Math.max(1, Math.floor(c - a)) + "s)"), (r == AD_TYPE_VIDEO15S || r == AD_TYPE_VIDEO6S) && this.processWhenInAdTime(),
            this.reportData.forEach(function (e) {
                1 != e.reported && 1e3 * a >= e.time && (e.reported = 1, e.report_time = i.getAdPlaytime(), e.type = i.opt.videoReportType,
                    videoAdReport(e));
            }), this.reportData2.forEach(function (e) {
                1 != e.reported && 1e3 * a >= e.time && (e.reported = 1, VideoCtl.report({
                    vid: i.vid,
                    step: e.step,
                    ext2: i.adVideoRet,
                    ad_source: i.adData.ad_source,
                    orderid: i.getOrderid(),
                    traceid: i.getTraceId(),
                    type: i.opt.videoReportType,
                    fromid: i.opt.fromid
                }));
            }), report3rd(a, this.adData.report_3rd);
    }, AdPlugin.prototype.processWhenInAdTime = function () {
        var e = this.adPlayer.video, t = e.currentTime;
        e && this.lastCurrentTime && t != this.lastCurrentTime && Math.abs(t - this.lastCurrentTime) > 3 ? e.currentTime = this.lastCurrentTime : this.lastCurrentTime = t;
    }, AdPlugin.prototype.touchVideoHandler = function () {
        return this.hasPlayAd || this.hasError ? Plugin.BASE_BITSET : 14;
    }, AdPlugin.prototype.end = function () {
        videoAdReport({
            step: 5,
            view_id: this.adData.view_id,
            traceid: this.adData.traceid,
            orderid: this.adData.orderid,
            ad_source: this.adData.ad_source,
            report_time: this.getAdPlaytime(),
            type: this.opt.videoReportType
        }), this._whenEnded(!0);
    }, AdPlugin.prototype._whenEnded = function (e) {
        var t = this, a = t.player, i = t.adPlayer;
        this.hasPlayAd = !0, e && (t._adEndedTime = +new Date), i && i._hidePlayer && i._hidePlayer(),
            a._showPlayer(), e && a._trigger("beginPlay");
    }, AdPlugin.prototype._whenGetAdSrc = function (e) {
        var t = this;
        setTimeout(function () {
            t.initAd ? !!e && e.call(t) : t._whenGetAdSrc(e);
        }, 500);
    }, AdPlugin.prototype.setSize = function (e) {
        var t = this, a = t.adPlayer;
        a && a.setVideoCSS(e);
    }, AdPlugin;
});