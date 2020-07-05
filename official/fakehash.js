// https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/respTypes42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_common/utils/wxgspeedsdk42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_common/template-2.0.1-cmd42f400.js,/mmbizwap/zh_CN/htmledition/js/common/utils4e7d32.js,/mmbizwap/zh_CN/htmledition/js/biz_common/utils/url/parse440451.js,/mmbizwap/zh_CN/htmledition/js/appmsg/malicious_wording42f400.js,/mmbizwap/zh_CN/htmledition/js/pages/qq_video_info4eefa0.js,/mmbizwap/zh_CN/htmledition/js/biz_common/utils/emoji_data4c46a0.js,/mmbizwap/zh_CN/htmledition/js/history/profile_history_v2.html4c95a6.js,/mmbizwap/zh_CN/htmledition/js/biz_common/utils/string/html42f400.js,/mmbizwap/zh_CN/htmledition/js/appmsg/cdn_img_lib42f400.js,/mmbizwap/zh_CN/htmledition/js/pages/video_communicate_adaptor4b3caf.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto440203.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/fx42f400.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/fakehash42f400.js?v=1003
define("biz_common/utils/respTypes.js", [], function (require, exports, module, alert) {
    "use strict";
    var logList = [], log = function (r) {
        logList.push(r);
    }, printLog = function () {
        for (var r = 0, e = logList.length; e > r; ++r)console.log("[RespType]" + logList[r]);
    }, isArray = function (r) {
        return "[object Array]" == Object.prototype.toString.call(r);
    }, getValueType = function (r) {
        return isArray(r) ? "array" : typeof r;
    }, parseRtDesc = function (r, e) {
        var t = "mix", o = !1, c = e;
        if (e) {
            var n = "_R", s = e.indexOf(n), i = e.length - n.length;
            o = -1 != s && s == i, c = o ? e.substring(0, i) : e;
        }
        return "string" == typeof r ? t = r : isArray(r) ? t = "array" : "object" == typeof r && (t = "object"),
        {
            key: c,
            type: t,
            isRequired: o
        };
    }, checkForArrayRtDesc = function (r, e) {
        if (!isArray(r)) return !1;
        for (var t = 0, o = r.length; o > t; ++t) {
            for (var c, n = r[t], s = 0, i = 0 === e.length; c = e[s++];)if (checkForRtDesc(n, c)) {
                i = !0;
                break;
            }
            if (!i) return !1;
        }
        return !0;
    }, checkForStringRtDesc = function (r, e) {
        var t = getValueType(r), o = parseRtDesc(e), c = o.type == t;
        return c || log("miss match type : " + t + " !== " + o.type), c;
    }, checkForObjectRtDesc = function (r, e) {
        if ("object" != typeof r || isArray(r)) return log("must be object"), !1;
        var t = r, o = r;
        for (var c in e) if (e.hasOwnProperty(c)) {
            var n = e[c], s = parseRtDesc(n, c), i = s.key;
            o = t[i];
            var u = getValueType(o);
            if (s.isRequired && void 0 === o) return log("is required @key=" + i), !1;
            if (void 0 !== o) {
                if (u != s.type && "mix" != s.type) return log("miss match type : " + u + " !== " + s.type + " @key=" + i),
                    !1;
                if (("array" == u || "object" == u) && "mix" != s.type && !checkForRtDesc(o, n)) return !1;
            }
        }
        return !0;
    }, checkForRtDesc = function (r, e) {
        return isArray(e) ? checkForArrayRtDesc(r, e) : "object" == typeof e ? checkForObjectRtDesc(r, e) : "string" == typeof e ? checkForStringRtDesc(r, e) : !1;
    }, check = function (json, rtDescs) {
        if ("string" == typeof json) try {
            json = eval("(" + json + ")");
        } catch (e) {
            return log("parse json error"), !1;
        }
        if ("object" != typeof json) return log("must be object"), !1;
        isArray(rtDesc) || (rtDescs = [rtDescs]);
        for (var rtDesc, i = 0; rtDesc = rtDescs[i++];)if (checkForRtDesc(json, rtDesc)) return !0;
        return !1;
    };
    return {
        check: function (r, e) {
            logList = [];
            try {
                var t = check(r, e);
                return t || printLog(), t;
            } catch (o) {
                return logList.push("[rtException]" + o.toString()), printLog(), !1;
            }
        },
        getMsg: function () {
            return logList.join(";");
        }
    };
}); define("biz_common/utils/wxgspeedsdk.js", [], function () {
    "use strict";
    function e(e) {
        if (!e.pid || !e.speeds) return -1;
        if (!e.speeds.length > 0) {
            var n = e.speeds;
            e.speeds = [], e.speeds.push(n);
        }
        e.user_define && (p = e.user_define);
        for (var t = d(e), o = 0; o < e.speeds.length; o++) {
            var r = e.speeds[o];
            r.time = parseInt(r.time), r.sid > 20 && r.time >= 0 && i(t, r.sid, r.time);
        }
    }
    function n() {
        s(function () {
            setTimeout(function () {
                for (var e in u) r({
                    pid_uin_rid: e,
                    speeds: u[e],
                    user_define: p
                }, c);
                u = {};
            }, 100);
        });
    }
    function t(e) {
        s(function () {
            if (!e.pid || !e.time) return -1;
            var n = d(e);
            i(n, 9, e.time);
        });
    }
    function o(e) {
        s(function () {
            var n = d(e);
            u[n] || (u[n] = []);
            var t = window.performance || window.msPerformance || window.webkitPerformance || {};
            if (t && t.timing) {
                var o = t.timing || {};
                i(n, 1, o.domainLookupEnd - o.domainLookupStart), i(n, 2, "https:" == location.protocol && 0 != o.secureConnectionStart ? o.connectEnd - o.secureConnectionStart : 0),
                    i(n, 3, o.connectEnd - o.connectStart), i(n, 4, o.responseStart - o.requestStart), i(n, 5, o.responseEnd - o.responseStart),
                    i(n, 6, o.domContentLoadedEventStart - o.domLoading), i(n, 7, 0 == o.domComplete ? 0 : o.domComplete - o.domLoading),
                    i(n, 8, 0 == o.loadEventEnd ? 0 : o.loadEventEnd - o.loadEventStart), function () {
                        setTimeout(function () {
                            o.loadEventEnd && (i(n, 7, 0 == o.domComplete ? 0 : o.domComplete - o.domLoading), i(n, 8, 0 == o.loadEventEnd ? 0 : o.loadEventEnd - o.loadEventStart));
                        }, 0);
                    }(u), u[n][9] || i(n, 9, o.domContentLoadedEventStart - o.navigationStart), i(n, 10, o.redirectEnd - o.redirectStart),
                    i(n, 11, o.domainLookupStart - o.fetchStart), i(n, 12, o.domLoading - o.responseStart);
            }
        });
    }
    function i(e, n, t) {
        u[e] = u[e] || [], u[e][n] = u[e][n] || [], 0 > t || (21 > n ? u[e][n][0] = t : u[e][n].push(t));
    }
    function d(e) {
        return e && e.pid ? e.pid + "_" + (e.uin || 0) + "_" + (e.rid || 0) : void (console && console.error("Must provide a pid"));
    }
    function r(e, n) {
        var t = e.pid_uin_rid.split("_");
        if (3 != t.length) return void (console && console.error("pid,uin,rid, invalid args"));
        var o = "pid=" + t[0] + "&uin=" + t[1] + "&rid=" + t[2];
        e.user_define && (o += "&user_define=" + e.user_define);
        for (var i = n + o + "&speeds=", d = "", r = [], s = 1; s < e.speeds.length; s++)if (e.speeds[s]) {
            for (var a = 0; a < e.speeds[s].length; a++) {
                var p = s + "_" + e.speeds[s][a];
                i.length + d.length + p.length < 1024 ? d = d + p + ";" : (d.length && r.push(i + d.substring(0, d.length - 1)),
                    d = p + ";");
            }
            s == e.speeds.length - 1 && r.push(i + d.substring(0, d.length - 1));
        }
        for (var s = 0; s < r.length; s++)(new Image).src = r[s];
    }
    function s(e) {
        "complete" == document.readyState ? e() : f.push(e);
    }
    function a() {
        for (var e = 0; e < f.length; e++)f[e]();
        f = [];
    }
    var p, u = {}, c = "https://badjs.weixinbridge.com/frontend/reportspeed?", f = [];
    return window.addEventListener ? window.addEventListener("load", a, !1) : window.attachEvent && window.attachEvent("onload", a),
    {
        saveSpeeds: e,
        send: n,
        setFirstViewTime: t,
        setBasicTime: o
    };
}); define("biz_common/template-2.0.1-cmd.js", [], function () {
    "use strict";
    var e = function (n, t) {
        return e["object" == typeof t ? "render" : "compile"].apply(e, arguments);
    };
    return window.template = e, function (e, n) {
        e.version = "2.0.1", e.openTag = "<#", e.closeTag = "#>", e.isEscape = !0, e.isCompress = !1, e.parser = null,
            e.render = function (e, n) {
                var t = r(e);
                return void 0 === t ? o({
                    id: e,
                    name: "Render Error",
                    message: "No Template"
                }) : t(n);
            }, e.compile = function (n, r) {
                function a(t) {
                    try {
                        return new l(t) + "";
                    } catch (i) {
                        return u ? (i.id = n || r, i.name = "Render Error", i.source = r, o(i)) : e.compile(n, r, !0)(t);
                    }
                }
                var c = arguments, u = c[2], s = "anonymous";
                "string" != typeof r && (u = c[1], r = c[0], n = s);
                try {
                    var l = i(r, u);
                } catch (p) {
                    return p.id = n || r, p.name = "Syntax Error", o(p);
                }
                return a.prototype = l.prototype, a.toString = function () {
                    return l.toString();
                }, n !== s && (t[n] = a), a;
            }, e.helper = function (n, t) {
                e.prototype[n] = t;
            }, e.onerror = function (e) {
                var t = "[template]:\n" + e.id + "\n\n[name]:\n" + e.name;
                e.message && (t += "\n\n[message]:\n" + e.message), e.line && (t += "\n\n[line]:\n" + e.line,
                    t += "\n\n[source]:\n" + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, "")), e.temp && (t += "\n\n[temp]:\n" + e.temp),
                    n.console && console.error(t);
            };
        var t = {}, r = function (r) {
            var o = t[r];
            if (void 0 === o && "document" in n) {
                var i = document.getElementById(r);
                if (i) {
                    var a = i.value || i.innerHTML;
                    return e.compile(r, a.replace(/^\s*|\s*$/g, ""));
                }
            } else if (t.hasOwnProperty(r)) return o;
        }, o = function (n) {
            function t() {
                return t + "";
            }
            return e.onerror(n), t.toString = function () {
                return "{Template Error}";
            }, t;
        }, i = function () {
            e.prototype = {
                $render: e.render,
                $escape: function (e) {
                    return "string" == typeof e ? e.replace(/&(?![\w#]+;)|[<>"']/g, function (e) {
                        return {
                            "<": "&#60;",
                            ">": "&#62;",
                            '"': "&#34;",
                            "'": "&#39;",
                            "&": "&#38;"
                        }[e];
                    }) : e;
                },
                $string: function (e) {
                    return "string" == typeof e || "number" == typeof e ? e : "function" == typeof e ? e() : "";
                }
            };
            var n = Array.prototype.forEach || function (e, n) {
                for (var t = this.length >>> 0, r = 0; t > r; r++)r in this && e.call(n, this[r], r, this);
            }, t = function (e, t) {
                n.call(e, t);
            }, r = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", o = /\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g, i = /[^\w$]+/g, a = new RegExp(["\\b" + r.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), c = /\b\d[^,]*/g, u = /^,+|,+$/g, s = function (e) {
                return e = e.replace(o, "").replace(i, ",").replace(a, "").replace(c, "").replace(u, ""),
                    e = e ? e.split(/,+/) : [];
            };
            return function (n, r) {
                function o(n) {
                    return g += n.split(/\n/).length - 1, e.isCompress && (n = n.replace(/[\n\r\t\s]+/g, " ")),
                        n = n.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"), n = w[1] + "'" + n + "'" + w[2],
                        n + "\n";
                }
                function i(n) {
                    var t = g;
                    if (p ? n = p(n) : r && (n = n.replace(/\n/g, function () {
                        return g++, "$line=" + g + ";";
                    })), 0 === n.indexOf("=")) {
                        var o = 0 !== n.indexOf("==");
                        if (n = n.replace(/^=*|[\s;]*$/g, ""), o && e.isEscape) {
                            var i = n.replace(/\s*\([^\)]+\)/, "");
                            $.hasOwnProperty(i) || /^(include|print)$/.test(i) || (n = "$escape($string(" + n + "))");
                        } else n = "$string(" + n + ")";
                        n = w[1] + n + w[2];
                    }
                    return r && (n = "$line=" + t + ";" + n), a(n), n + "\n";
                }
                function a(e) {
                    e = s(e), t(e, function (e) {
                        h.hasOwnProperty(e) || (c(e), h[e] = !0);
                    });
                }
                function c(e) {
                    var n;
                    "print" === e ? n = O : "include" === e ? (y.$render = $.$render, n = j) : (n = "$data." + e, $.hasOwnProperty(e) && (y[e] = $[e],
                        n = 0 === e.indexOf("$") ? "$helpers." + e : n + "===undefined?$helpers." + e + ":" + n)), m += e + "=" + n + ",";
                }
                var u = e.openTag, l = e.closeTag, p = e.parser, f = n, d = "", g = 1, h = {
                    $data: !0,
                    $helpers: !0,
                    $out: !0,
                    $line: !0
                }, $ = e.prototype, y = {}, m = "var $helpers=this," + (r ? "$line=0," : ""), v = "".trim, w = v ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], b = v ? "if(content!==undefined){$out+=content;return content}" : "$out.push(content);", O = "function(content){" + b + "}", j = "function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);" + b + "}";
                t(f.split(u), function (e) {
                    e = e.split(l);
                    var n = e[0], t = e[1];
                    1 === e.length ? d += o(n) : (d += i(n), t && (d += o(t)));
                }), f = d, r && (f = "try{" + f + "}catch(e){e.line=$line;throw e}"), f = "'use strict';" + m + w[0] + f + "return new String(" + w[3] + ")";
                try {
                    var E = new Function("$data", f);
                    return E.prototype = y, E;
                } catch (T) {
                    throw T.temp = "function anonymous($data) {" + f + "}", T;
                }
            };
        }();
        e.openTag = "{", e.closeTag = "}", e.parser = function (n) {
            n = n.replace(/^\s/, "");
            var t = n.split(" "), r = t.shift(), o = e.keywords, i = o[r];
            return i && o.hasOwnProperty(r) ? (t = t.join(" "), n = i.call(n, t)) : e.prototype.hasOwnProperty(r) ? (t = t.join(","),
                n = "==" + r + "(" + t + ");") : (n = n.replace(/[\s;]*$/, ""), n = "=" + n), n;
        }, e.keywords = {
            "if": function (e) {
                return "if(" + e + "){";
            },
            "else": function (e) {
                return e = e.split(" "), e = "if" === e.shift() ? " if(" + e.join(" ") + ")" : "", "}else" + e + "{";
            },
            "/if": function () {
                return "}";
            },
            each: function (e) {
                e = e.split(" ");
                var n = e[0] || "$data", t = e[1] || "as", r = e[2] || "$value", o = e[3] || "$index", i = r + "," + o;
                return "as" !== t && (n = "[]"), "$each(" + n + ",function(" + i + "){";
            },
            "/each": function () {
                return "});";
            },
            echo: function (e) {
                return "print(" + e + ");";
            },
            include: function (e) {
                e = e.split(" ");
                var n = e[0], t = e[1], r = n + (t ? "," + t : "");
                return "include(" + r + ");";
            }
        }, e.helper("$each", function (e, n) {
            var t = Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            };
            if (t(e)) for (var r = 0, o = e.length; o > r; r++)n.call(e, e[r], r, e); else for (r in e) n.call(e, e[r], r);
        });
    }(e, window), e;
}); define("common/utils.js", ["biz_common/utils/url/parse.js", "biz_wap/jsapi/core.js", "biz_wap/utils/wapsdk.js", "biz_wap/utils/ajax.js", "common/comm_report.js"], function (t) {
    "use strict";
    var e = t("biz_common/utils/url/parse.js"), n = t("biz_wap/jsapi/core.js"), a = t("biz_wap/utils/wapsdk.js"), i = t("biz_wap/utils/ajax.js"), r = t("common/comm_report.js");
    try {
        "undefined" == typeof parent.window.hasListenMpPageAction && (parent.window.hasListenMpPageAction = !1),
            "undefined" == typeof parent.window.hasListenStateChange && (parent.window.hasListenStateChange = !1);
    } catch (o) { }
    var s = [], d = [], u = {
        status: "loading"
    }, p = [], c = {
        isNativePage: function () {
            return "1" === e.getQuery("isNativePage") || "2" === e.getQuery("isNativePage");
        },
        isNewNativePage: function () {
            return "2" === e.getQuery("isNativePage");
        },
        isOldNativePage: function () {
            return "1" === e.getQuery("isNativePage");
        },
        getParam: function (t) {
            if (!t) return null;
            var e = location.href.match(new RegExp("(\\?|&)" + t + "=([^&]+)"));
            return e ? e[2] : null;
        },
        insertAfter: function (t, e) {
            var n = e.parentNode;
            n.lastChild === e ? n.appendChild(t) : n.insertBefore(t, e.nextSibling);
        },
        getInnerHeight: function () {
            var t = window.getInnerHeight && window.getInnerHeight();
            return t || window.innerHeight || document.documentElement.clientHeight;
        },
        getScrollTop: function () {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        },
        getDocumentHeight: function () {
            return document.body.scrollHeight;
        },
        getElementActualTop: function (t) {
            var e = t.getBoundingClientRect(), n = e.top - this.getScrollTop();
            return n;
        },
        getElementTop: function (t) {
            return t.getBoundingClientRect().top;
        },
        getElementHeight: function (t) {
            return t.getBoundingClientRect().height;
        },
        isScrollEnd: function (t) {
            return this.getScrollTop() + this.getInnerHeight() + t >= this.getDocumentHeight();
        },
        listenStateChange: function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            d.push(t.cb);
            try {
                if (parent.window.hasListenStateChange) return;
            } catch (e) { }
            n.on("activity:state_change", function (t) {
                d.forEach(function (e) {
                    e(t);
                });
            });
            try {
                parent.window.hasListenStateChange = !0;
            } catch (e) { }
        },
        listenMpPageAction: function (t) {
            s.push(t);
            try {
                if (parent.window.hasListenMpPageAction) return;
            } catch (e) { }
            n.on("onMPPageAction", function (t) {
                s.forEach(function (e) {
                    e(t);
                });
            });
            try {
                parent.window.hasListenMpPageAction = !0;
            } catch (e) { }
        },
        getIosMainVersion: function () {
            var t = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
            return t && t[1] && parseInt(t[1].split("_")[0], 10);
        },
        report120081: function (t, e) {
            a.jsmonitor({
                id: 120081,
                key: t,
                value: e
            });
        },
        report17149Data: function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            i({
                type: "POST",
                url: "/mp/ad_video_report?action=share_video_report",
                async: t.async !== !1,
                data: t.data
            });
        },
        commReport17149Data: function () {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = {};
            e.NetType = parseInt(t.data.net_type || 0, 10), e.BizUserName = (t.data.biz_user_name || "").toString(),
                e.MsgId = parseInt(t.data.msg_id || 0, 10), e.Idx = parseInt(t.data.idx || 0, 10), e.Idx = parseInt(t.data.session_id || 0, 10),
                e.SessionId = parseInt(t.data.session_id || 0, 10), e.EnterId = parseInt(t.data.enter_id || 0, 10),
                e.VideoId = (t.data.video_id || "").toString(), e.Duration = parseInt(t.data.duration || 0, 10),
                e.EventType = parseInt(t.data.event_type || 0, 10), e.EventTime = parseInt(t.data.event_time || 0, 10),
                e.RealPlayTime = parseInt(t.data.real_play_time || 0, 10), e.EndPlayTime = parseInt(t.data.end_play_time || 0, 10),
                e.StayTimeInPage = parseInt(t.data.stay_time_in_page || 0, 10), e.Scene = parseInt(t.data.scene || 0, 10),
                e.Subscene = parseInt(t.data.sub_scene || 0, 10), e.PlayErrType = (t.data.play_err_type || "").toString(),
                e.IsFans = parseInt(t.data.is_fans || 0, 10), e.BufferingTime = parseInt(t.data.buffering_time || 0, 10),
                e.Resolution = parseInt(t.data.resolution || 0, 10), e.Width = parseInt(t.data.width || 0, 10),
                e.OrStatus = parseInt(t.data.or_status || 0, 10), e.HitBizuin = parseInt(t.data.hit_bizuin || 0, 10),
                e.HitVid = (t.data.hit_vid || "").toString(), e.PlayerType = parseInt(t.data.player_type || 0, 10),
                e.FullScreen = parseInt(t.data.full_screen || 0, 10), e.MoreVideosInfo = (t.data.more_videos_info || "").toString(),
                e.ActionPlayTime = parseInt(t.data.action_play_time || 0, 10), e.MoreVideosSeq = parseInt(t.data.more_videos_seq || 0, 10),
                e.SessionIdStr = (t.data.session_id_str || "").toString(), e.GetPlayUrlErrType = parseInt(t.data.get_play_url_err_type || 0, 10),
                e.VideoRecommendType = parseInt(t.data.video_recommend_type || 0, 10), e.VideoExtraCount = parseInt(t.data.video_extra_count || 0, 10),
                e.RemindTrafficSize = parseInt(t.data.remind_traffic_size || 0, 10), e.TrafficReminderType = parseInt(t.data.traffic_reminder_type || 0, 10),
                e.ChannelSessionId = (t.data.channel_session_id || "").toString(), e.AlbumId = (t.data.album_id || "").toString(),
                e.Device = (window.devicetype || "").toString(), r.report(17149, e);
        },
        initWebCompt: function (t) {
            var e = function () {
                for (; p.length;) {
                    var t = p.shift();
                    t(u);
                }
            };
            document.addEventListener("WeixinOpenTagsReady", function () {
                u = {
                    status: "ready"
                }, e();
            }), document.addEventListener("WeixinOpenTagsError", function (t) {
                u = {
                    status: "error",
                    error: t && t.detail && t.detail.errMsg
                }, e();
            }), n.invoke("handleMPPageAction", {
                action: "wxConfig",
                appid: "wxmpfakeid",
                webComptList: t
            }, function (t) {
                t && t.err_msg && -1 === t.err_msg.indexOf(":ok") && (u = {
                    status: "error",
                    error: t.err_msg
                }, e());
            });
        },
        getWebComptStatus: function (t) {
            return "function" != typeof t ? u : ("loading" === u.status ? p.push(t) : t(u), !0);
        }
    };
    return c;
}); define("biz_common/utils/url/parse.js", [], function () {
    "use strict";
    function r(r) {
        var e = r.length, n = r.indexOf("?"), t = r.indexOf("#");
        t = -1 == t ? e : t, n = -1 == n ? t : n;
        var a = r.substr(0, n), i = r.substr(n + 1, t - n - 1), s = r.substr(t + 1);
        return {
            host: a,
            query_str: i,
            hash: s
        };
    }
    function e(e, n, t) {
        var a = r(e), i = a.query_str, s = [];
        for (var o in n) n.hasOwnProperty(o) && s.push(o + "=" + (t ? n[o] : encodeURIComponent(n[o])));
        return s.length > 0 && (i += ("" != i ? "&" : "") + s.join("&")), a.host + ("" != i ? "?" + i : "") + ("" != a.hash ? "#" + a.hash : "");
    }
    function n(r, e, n, t) {
        r = r || location.href;
        var a = r.indexOf("&"), i = r.length, s = r.replace(/^[\w\d]+:[\/\\]+/g, "").split("").reverse();
        Array.prototype.indexOf || (Array.prototype.indexOf = function (r, e) {
            var n;
            if (null == this) throw new TypeError('"this" is null or not defined');
            var t = Object(this), a = t.length >>> 0;
            if (0 === a) return -1;
            var i = +e || 0;
            if (1 / 0 === Math.abs(i) && (i = 0), i >= a) return -1;
            for (n = Math.max(i >= 0 ? i : a - Math.abs(i), 0); a > n;) {
                if (n in t && t[n] === r) return n;
                n++;
            }
            return -1;
        });
        var o = i - 1 - s.indexOf("/");
        -1 != a && -1 == r.indexOf("?") && a > o && (r = r.replace("&", "?"));
        var u = new RegExp("([\\?&]" + e + "=)[^&#]*");
        if (!r.match(u)) {
            var h = r.indexOf("?");
            return -1 == h ? r + "?" + e + "=" + n : h == r.length - 1 ? r + e + "=" + n : r + "&" + e + "=" + n;
        }
        return t === !0 ? r.replace(u, "$1" + n) : r;
    }
    function t(r) {
        var e = arguments[1] || window.location.search, n = new RegExp("(^|&)" + r + "=([^&]*)(&|$)"), t = e.substr(e.indexOf("?") + 1).match(n);
        return null != t ? t[2] : "";
    }
    return {
        parseUrl: r,
        join: e,
        addParam: n,
        getQuery: t
    };
}); define("appmsg/malicious_wording.js", [], function () {
    "use strict";
    var i = {
        0: {
            90041: "此标题包含夸大误导信息",
            20012: "此标题包含低俗恶俗内容"
        },
        1: {
            90041: "",
            20012: ""
        },
        2: {
            90041: "此文章包含夸大误导信息",
            20012: "此文章包含低俗恶俗内容"
        }
    }, s = {
        0: {
            90041: "标题使用夸大、煽动、低俗等词语造成误导或引人不适",
            20012: "标题使用低俗或恶俗词语造成不正当影响或引人不适"
        },
        1: {
            90041: "摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
            20012: "摘要包含低俗或恶俗内容造成不正当影响或引人不适"
        },
        2: {
            90041: "文章包含误导、煽动的信息引人不适或造成微信用户混淆",
            20012: "文章包含低俗或恶俗内容造成不正当影响或引人不适"
        }
    };
    return {
        maliciousTitleMap: i,
        maliciousDescMap: s
    };
}); function _typeof(e) {
    return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
}
define("pages/qq_video_info.js", ["biz_wap/zepto/zepto.js", "biz_wap/zepto/event.js", "biz_wap/zepto/touch.js", "biz_wap/ui/weui.js", "biz_common/utils/string/html.js", "a/a_utils.js", "pages/iframe_communicate.js", "biz_wap/jsapi/core.js", "biz_wap/utils/mmversion.js", "biz_common/utils/url/parse.js", "biz_wap/utils/ajax.js", "pages/loadscript.js", "pages/video_plugin/video_monitor.js", "biz_wap/utils/localstorage.js", "biz_wap/utils/storage.js", "pages/version4video.js", "biz_common/dom/event.js", "pages/report.js", "biz_common/dom/attr.js", "new_video/plugin/proxy.js", "new_video/plugin/ad.js", "new_video/player.js", "new_video/ctl.js", "biz_common/tmpl.js", "pages/video_error.html.js", "pages/create_txv.js", "biz_wap/utils/jsmonitor_report.js"], function (e) {
    "use strict";
    function t(e) {
        this._o = {
            headImgUrl: "",
            jsapiFullScreen: !0,
            canShareVideo: !0,
            videoMd5: "",
            pauseShowControll: !0,
            preview: !1,
            isInIframe: !1,
            fromid: 0,
            ori_status: 3,
            is_mp_video: 0,
            plugins: [],
            oriVid: "",
            vid: "",
            ckey: "",
            ckey_ad: "",
            width: 0,
            height: 0,
            container: "",
            autoplay: !1,
            loop: !1,
            resume: A.resume,
            __biz: "",
            uin: "",
            mid: "",
            idx: "",
            comment_id: "",
            scene_type: 0,
            hit_bizuin: "",
            hit_vid: "",
            totalRange: 10,
            noAd: !1,
            isVideoSharePage: !1,
            onReady: function () { },
            onUserplay: function () { }
        }, u(this._o, e), (!A.isWechat || !A.isIOS && !A.isAndroid || A.isIOS && w.ltVersion("7.0.9", !1) || A.isAndroid && w.ltVersion("7.0.10", !1) || !this._o.videoMd5) && (this._o.jsapiFullScreen = !1,
            this._o.canShareVideo = !1), this._o.is_mp_video || (this._o.pauseShowControll = !1), !this._o.headImgUrl && this._o.jsapiFullScreen && A.isAndroid && (this._o.headImgUrl = "http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
            this._o.oriVid = this._o.oriVid || this._o.vid, 1 != this._o.ori_status && 2 != this._o.ori_status && (this._o.ori_status = 3),
            this._init();
    }
    function i(e) {
        function t() {
            k({
                type: "GET",
                dataType: "json",
                timeout: 3e4,
                url: a,
                success: function (e) {
                    if (e && e.base_resp && 0 == e.base_resp.ret) {
                        var t = "", i = void 0;
                        if (e.is_mp_video_delete ? (t = "该视频已被发布者删除", i = 72) : e.is_mp_video_forbid ? (t = "该视频因违规已下架",
                            i = 73) : 1 * e.is_mp_video_transing === 1 ? (t = "正在转码，转码完成后可播放", i = 78) : e.is_mp_video_checking ? (t = "审核中",
                                i = 75) : e.is_mp_video_check_fail ? (t = "审核失败", i = 76) : 1 * e.is_appmsg_unauthorized === 1 && (t = "该视频因未经授权使用而无法查看",
                                    i = 77), t && "undefined" != typeof i) return void n({
                                        err_msg: t,
                                        code: i
                                    });
                        if (e.url_info && e.url_info.length > 0) {
                            var o = function () {
                                for (var t = function c(t) {
                                    var o = Math.floor(Math.max(t.width, t.height));
                                    if (o > 3841) switch (1 * t.format_id) {
                                        case 10002:
                                            t = e.url_info[i["480p"].index], O.setSum(27302, 6, 1), c(t);
                                            break;

                                        case 10003:
                                            t = e.url_info[i["270p"].index], O.setSum(27302, 7, 1);
                                    }
                                    return t;
                                }, i = {}, o = 0; o < e.url_info.length; o++) {
                                    var n = e.url_info[o];
                                    switch (1 * n.format_id) {
                                        case 10002:
                                            i["720p"] = {
                                                index: o
                                            };
                                            break;

                                        case 10003:
                                            i["480p"] = {
                                                index: o
                                            };
                                            break;

                                        case 10004:
                                            i["270p"] = {
                                                index: o
                                            };
                                    }
                                }
                                var a = void 0;
                                1 * e.is_mp_video_urgent_state === 1 ? i["270p"] ? a = e.url_info[i["270p"].index] : i["480p"] && (a = e.url_info[i["480p"].index]) : A.isPc || "wifi" == A.networkType ? i["720p"] ? a = e.url_info[i["720p"].index] : i["480p"] && (a = e.url_info[i["480p"].index]) : i["480p"] ? a = e.url_info[i["480p"].index] : i["720p"] && (a = e.url_info[i["720p"].index]),
                                    a || (a = e.url_info[0]), a = t(a);
                                var s = Math.floor(a.duration_ms / 1e3), d = (parseFloat(a.filesize) / 1024 / 1024).toFixed(2), _ = {
                                    formatid: a.format_id,
                                    time: s,
                                    title: a.title || "",
                                    width: a.width,
                                    height: a.height,
                                    file_size: a.filesize,
                                    totalUrl: a.url,
                                    rate: Math.round(a.filesize / 1024 * 8 / s),
                                    flow: d
                                };
                                return r({
                                    data: _
                                }), {
                                    v: void 0
                                };
                            }();
                            if ("object" === ("undefined" == typeof o ? "undefined" : _typeof(o))) return o.v;
                        }
                        n({
                            err_msg: U,
                            code: 71
                        });
                    } else n({
                        err_msg: "当前视频不存在，暂无法观看",
                        code: 74
                    });
                },
                error: function (e) {
                    var t = void 0;
                    t = e ? e.status >= 200 && e.status < 400 ? 81 : e.status >= 400 && e.status < 500 ? 82 : e.status >= 500 && e.status < 600 ? 83 : 0 == e.status && 4 == e.readyState ? 84 : 85 : 80,
                        n({
                            err_msg: U,
                            code: t
                        });
                }
            });
        }
        var i = e.retry || 1, r = "function" == typeof e.onSuccess ? e.onSuccess : function () { }, n = function (o) {
            return o && o.code >= 80 && o.code <= 85 && i > 0 ? (i--, void t()) : void ("function" == typeof e.onError && e.onError(o));
        }, a = ["/mp/videoplayer?action=get_mp_video_play_url", "&preview=", e.preview ? "1" : "0", "&__biz=", e.__biz, "&mid=", e.mid, "&idx=", e.idx, "&vid=", e.vid].join("");
        o(t);
    }
    function o(e) {
        window.networkType || A.networkType || A.isPc ? e() : F ? y.invoke("getNetworkType", {}, function (t) {
            A.networkType = q[t.err_msg] || "fail", ("network_type:edge" == t.err_msg || "network_type:wwan" == t.err_msg) && (t.detailtype || t.subtype) && (A.networkType = t.detailtype || t.subtype),
                e();
        }) : e();
    }
    function r(e) {
        function t() {
            M({
                url: i,
                timeout: 3e4,
                callbackName: "video_dynamic_callback",
                callback: function (t) {
                    var i = +new Date, o = i - r;
                    t = t || {}, "undefined" == typeof t.em && (t.em = 0);
                    var a = t.em, s = void 0;
                    if (!b.getQuery("channel_session_id") || 61 !== t.em && 62 !== t.em || k({
                        type: "POST",
                        dataType: "json",
                        timeout: 3e4,
                        url: "/mp/videochannel_profile_page",
                        data: {
                            action: "report_tx_video",
                            vid: e.vid,
                            status: t.em
                        },
                        success: function (e) {
                            console.log(e);
                        }
                    }), 0 == t.em) {
                        if (t.exem > 0 ? a = -4 : 0 == t.exem && t.vl && t.vl.vi && t.vl.vi[0] && 8 == t.vl.vi[0].st && (a = t.preview > 0 ? -5 : -3),
                            0 != a || t.vl && t.vl.vi && t.vl.vi[0] || (a = -2), 0 == a) {
                            var d = t.vl.vi[0];
                            if (s = {
                                newVid: d.lnk,
                                time: Math.floor(d.td),
                                title: d.ti,
                                width: d.vw,
                                height: d.vh,
                                file_size: d.fs,
                                rate: Math.round(d.fs / 1024 * 8 / d.td),
                                flow: (parseFloat(d.fs) / 1024 / 1024).toFixed(2)
                            }, d.ul && d.ul.ui && d.ul.ui[0]) {
                                var _ = d.ul.ui[0], c = _.url + d.fn, p = t.fl, g = "";
                                if (p && p.cnt > 0) {
                                    for (var u = p.fi, l = {}, h = 0; h < u.length; h++) {
                                        var v = u[h];
                                        switch (v.name) {
                                            case "msd":
                                                l["270P"] = {
                                                    index: h
                                                };
                                                break;

                                            case "mp4":
                                                l["480p"] = {
                                                    index: h
                                                };
                                        }
                                        var m;
                                        A.isPc || "wifi" == A.networkType ? l["480p"] ? m = u[l["480p"].index] : l["270P"] && (m = u[l["270P"].index]) : l["270P"] ? m = u[l["270P"].index] : l["480p"] && (m = u[l["480p"].index]),
                                            m || (m = u[0]), s.formatid = m.id, g = m.name, s.resolution = (m.cname || "").replace(/^.*;\((:?.*)P\)$/, "$1") || 0;
                                    }
                                    s.format = g, s.vt = _.vt, s.totalUrl = [c, -1 != c.indexOf("?") ? "&" : "?", "vkey=", d.fvkey, "&sdtfrom=", x.getsdtfrom(), "&type=", 1 == _.dt ? "tflv" : 2 == _.dt || 0 == _.dt ? "mp4" : "", "&platform=", x.getPlatformType(), "&fmt=", g, "&level=", d.level, "&br=", d.br, "&sp=", d.sp].join("");
                                } else a = -2;
                            }
                        } else a = t.em;
                        0 == a ? (x.getinfoReport({
                            vid: e.vid,
                            val: o,
                            val1: a,
                            vurl: s.totalUrl
                        }), e.onSuc({
                            data: s,
                            oriData: t,
                            c_time: o,
                            ret_code: a
                        })) : (x.getinfoReport({
                            vid: e.vid,
                            val: o,
                            val1: a,
                            vurl: ""
                        }), e.onError(-2, {
                            ret_code: a,
                            c_time: o,
                            err_msg: n(1 * a, 1 * t.exem, t)
                        }));
                    } else e.onError(a, {
                        ret_code: a,
                        c_time: o,
                        err_msg: n(a)
                    });
                },
                onerror: function (t) {
                    var i = void 0, o = +new Date, a = o - r;
                    switch (1 * t) {
                        case 400:
                            i = -22;
                            break;

                        case 500:
                            i = -21;
                            break;

                        default:
                            i = -23;
                    }
                    "function" == typeof e.onError && e.onError(i, {
                        ret_code: i,
                        c_time: a,
                        err_msg: n(-1)
                    }), x.getinfoReport({
                        vid: e.vid,
                        val: a,
                        val1: i,
                        vurl: ""
                    });
                }
            });
        }
        var i = "https://h5vv6.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=#sdtfrom#";
        i = i.replace("#vid#", e.vid).replace("#ckey#", e.ckey).replace("#sdtfrom#", x.getsdtfrom()),
            i = i + "&device=" + x.getPlatformType() + "&use_proxy_sdk=" + (j.isUseProxy() ? 1 : 0);
        var r = +new Date;
        o(t);
    }
    function n(e, t) {
        var i = "";
        switch (1 * e) {
            case -4:
                i = "因版权限制，该视频不支持播放";
                break;

            case -5:
                i = "因版权限制，该视频不支持播放";
                break;

            case -3:
                i = "因版权限制，该视频不支持播放";
                break;

            case 61:
                i = "当前视频不存在，暂无法观看";
                break;

            case 62:
                i = "当前视频已下架，暂无法观看";
                break;

            case 63:
                i = "视频加载失败，暂无法观看";
                break;

            case 65:
                i = "视频加载失败，暂无法观看";
                break;

            case 67:
                i = "视频加载失败，暂无法观看";
                break;

            case 69:
                i = "视频格式不支持移动端观看，请在电脑上观看";
                break;

            case 71:
                i = "视频加载失败，暂无法观看";
                break;

            case 73:
                i = "视频加载失败，暂无法观看";
                break;

            case 74:
                i = "视频加载失败，暂无法观看";
                break;

            case 80:
                switch (1 * t) {
                    case 1:
                        i = "很抱歉，当前IP地址所在地区暂不支持播放";
                        break;

                    case 2:
                        i = "因版权限制，暂不支持播放";
                        break;

                    default:
                        i = "因版权限制，该视频不支持播放";
                }
                break;

            case 81:
                i = "视频加载失败，暂无法观看";
                break;

            case 82:
                i = "视频加载失败，暂无法观看";
                break;

            case 83:
                switch (1 * t) {
                    case -1:
                        i = U;
                        break;

                    case -2:
                        i = "因版权限制，该视频不支持播放";
                        break;

                    default:
                        i = "该片为付费视频，请前往腾讯视频观看";
                }
                break;

            case 84:
                i = "很抱歉，根据您的IP地址，暂无法播放";
                break;

            default:
                i = U;
        }
        return i;
    }
    function a(e) {
        var t = "https://h5vv.video.qq.com/getextinfo?otype=json&callback=video_static_callback&vid=" + e.vid;
        M({
            url: t,
            timeout: 3e4,
            callbackName: "video_static_callback",
            callback: function (t) {
                if (!t || "o" != t.s || t.vl.cnt <= 0) return void ("function" == typeof e.onError && e.onError(-1));
                var i = t.vl.vi[0], o = {
                    title: i.title || "视频",
                    desc: 1 * i.desc === 0 ? "" : i.desc || "",
                    director: i.director || "",
                    leading_actor: i.leading_actor || "",
                    costar: i.costar || "",
                    time: Math.floor(i.td) || 0
                };
                if (i.pl && i.pl.cnt > 0) {
                    var r = i.pl.pi;
                    o.p400_300 = r[0] ? r[0].url : "", o.p140_100 = r[1] ? r[1].url : "", o.p120_90 = r[2] ? r[2].url : "",
                        o.p400_300 = o.p400_300 && -1 == o.p400_300.indexOf("http") ? "http://" + o.p400_300 : o.p400_300,
                        o.p140_100 = o.p140_100 && -1 == o.p140_100.indexOf("http") ? "http://" + o.p140_100 : o.p140_100,
                        o.p120_90 = o.p120_90 && -1 == o.p120_90.indexOf("http") ? "http://" + o.p120_90 : o.p120_90;
                }
                e.onSuc(o);
            },
            onerror: function (t) {
                "function" == typeof e.onError && e.onError(t);
            }
        });
    }
    function s(e) {
        for (var t = 1e8, i = 0, o = 0, r = e.length; r > o; o++)i = (i << 5) + i + e.charCodeAt(o);
        return i % t;
    }
    function d(e, t, i) {
        return i ? "/mp/videoplayer?action=get_mp_video_cover&vid=" + e : location.protocol + "//puui.qpic.cn/qqvideo/0/" + e + "/0";
    }
    function _(e) {
        var t = P.get(A.cachekey + e);
        if (!t) return null;
        try {
            if (t = JSON.parse(t) || {}, !t.time || (new Date).getTime() - A.cacheTime > 1 * t.time) return p(e),
                null;
        } catch (i) {
            return p(e), null;
        }
        return t.videoInfo || null;
    }
    function c(e, t) {
        var i = {
            dynamicData: null,
            status: t.status || null
        };
        P.set(A.cachekey + e, JSON.stringify({
            time: (new Date).getTime(),
            videoInfo: i
        }));
    }
    function p(e) {
        P.remove(A.cachekey + e);
    }
    function g(e) {
        return document.getElementById(e);
    }
    function u(e, t) {
        for (var i in t) e[i] = t[i];
    }
    function l() {
        h(), v();
    }
    function h() {
        y.invoke("getNetworkType", {}, function (e) {
            A.networkType = q[e.err_msg] || "fail", ("network_type:edge" == e.err_msg || "network_type:wwan" == e.err_msg) && (e.detailtype || e.subtype) && (A.networkType = e.detailtype || e.subtype);
        });
    }
    function v() {
        D.on(window, "load", function () {
            if (window.__wxjs_is_wkwebview) {
                A.videoDataLs = new R("video_report_11949");
                var e = A.videoDataLs.getData();
                for (var t in e) {
                    var i = +new Date;
                    i - (e[t].exp - A.videoDataLsExpTime) > 6e4 && (x.videoreport({
                        data: e[t].val,
                        async: !0
                    }), A.videoDataLs.remove(t));
                }
                A.neeedTimoutSaveReportData = !0;
            } else A.neeedTimoutSaveReportData = !1;
        }), D.on(window, "unload", function () {
            for (var e = 0; e < A.videoInstance.length; e++) {
                var t = A.videoInstance[e];
                t.mpVideoReport(), t.destroy();
            }
        });
    }
    -1 != location.href.indexOf("__td=qq.com") && (document.domain = "qq.com"), e("biz_wap/zepto/zepto.js"),
        e("biz_wap/zepto/event.js"), e("biz_wap/zepto/touch.js"), e("biz_wap/ui/weui.js"),
        e("biz_common/utils/string/html.js");
    var m = e("a/a_utils.js"), f = e("pages/iframe_communicate.js"), y = e("biz_wap/jsapi/core.js"), w = e("biz_wap/utils/mmversion.js"), b = e("biz_common/utils/url/parse.js"), k = e("biz_wap/utils/ajax.js"), M = e("pages/loadscript.js"), T = e("pages/video_plugin/video_monitor.js"), P = e("biz_wap/utils/localstorage.js"), R = e("biz_wap/utils/storage.js"), j = e("pages/version4video.js"), D = e("biz_common/dom/event.js"), x = e("pages/report.js"), I = (e("biz_common/dom/attr.js"),
        e("new_video/plugin/proxy.js")), S = e("new_video/plugin/ad.js"), z = e("new_video/player.js"), C = e("new_video/ctl.js"), E = e("biz_common/tmpl.js"), V = e("pages/video_error.html.js"), U = "视频加载失败，请刷新页面重试", L = e("pages/create_txv.js"), O = e("biz_wap/utils/jsmonitor_report.js"), A = {
            isUseProxy: j.isUseProxy(),
            isWechat: w.isWechat,
            isAndroid: w.isAndroid,
            isIOS: w.isIOS,
            isGoTx: window.parent.window.location.href.indexOf("&_gotx=1") > 0,
            _debug: window.parent.window.location.href.indexOf("&vconsole=1") > 0,
            cachekey: "qqmovieStatus_",
            videoDataLs: null,
            videoDataLsExpTime: 864e7,
            cacheTime: 3e5,
            videoInfo: {},
            videoInstance: [],
            neeedTimoutSaveReportData: !0,
            networkType: "",
            isPc: /(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent)
        }, q = {
            "network_type:fail": "fail",
            "network_type:edge": "2g/3g",
            "network_type:wwan": "2g/3g",
            "network_type:wifi": "wifi"
        };
    l(), t.prototype._init = function (e) {
        function t() {
            try {
                for (var e = window.parent.document.getElementsByTagName("iframe"), t = 0; t < e.length; t++)if (window === e[t].contentWindow && e[t].adVidFromAppmsg || e[t].adVidFromAppmsg === window.realVid && window.realVid) return !0;
            } catch (i) { }
        }
        e = e || {}, this.destroy(), A.videoInstance.push(this), this._report = x.getVideoReportData(),
            this._g = {
                gWidth: e.gWidth || this._o.width,
                gHeight: e.gHeight || this._o.height,
                playRangeInfo: [],
                dynamicErrMsg: "",
                hasReportProxyError: e.hasReportProxyError === !0,
                noProxy: e.noProxy === !0,
                hasDestroy: !1,
                reportDataTimeoutId: null,
                reportDataLsKey: this._o.vid + "_" + Math.random(),
                hasReport: !1,
                isShowTx: !1,
                dataCount: 0,
                targetDataCount: 2,
                coverUrl: "",
                vInfo: {
                    status: null,
                    dynamicData: null,
                    staticData: null,
                    is_report_pv: !1
                },
                dom: {
                    page_content: g("page-content"),
                    js_mpvedio: g("js_mpvedio")
                }
            }, this._getRatio(), this._initPlugins(e), this._initReportData(), this._defineEvent(),
            m.report115849(71);
        var i = setInterval(function () {
            window.adVidFromAppmsg && (m.report115849(75), clearInterval(i));
        }, 500), o = setInterval(function () {
            t() && (m.report115849(76), clearInterval(o));
        }, 500);
        if (this._isGotoTx() === !0) return void m.report115849(70);
        var n = setInterval(function () {
            window.adVidFromAppmsg && (m.report115849(83), clearInterval(n));
        }, 500), a = setInterval(function () {
            t() && (m.report115849(84), clearInterval(a));
        }, 500);
        this._getCache(), this.setCoverUrl(), this._getDynamic(), this._reportH265VideoSupport();
        var s = this;
        j.isUseAd() && this._o.noAd !== !0 && (this._g.myAdPlugin = new S({
            fromid: this._o.fromid,
            videoReportType: this.getReportTypeBySceneType(),
            isMpVideo: s._o.is_mp_video,
            vid: this._o.vid,
            ratio: this._o.ratio,
            oriVid: this._o.oriVid,
            tmpGetAd: function (e, t) {
                r({
                    vid: "b0163rzlnn7",
                    ckey: s._o.ckey_ad,
                    onSuc: function (t) {
                        e && e(t);
                    },
                    onError: function () {
                        t && t();
                    }
                });
            }
        })), this._cacheReportData();
    }, t.prototype._getRatio = function () {
        for (var e = this._o.width / this._o.height, t = [4 / 3, 16 / 9], i = t[0], o = Math.abs(i - e), r = 1, n = t.length; n > r; r++) {
            var a = Math.abs(t[r] - e);
            o > a && (o = a, i = t[r]);
        }
        this._o.ratio = i;
    }, t.prototype._isGotoTx = function () {
        var e = this, t = this._o;
        if ((!t.ckey || A.isGoTx) && !t.is_mp_video) {
            e._g.isShowTx = !0;
            var i = $(this._o.container), o = i.attr("id");
            o || (o = "js_tx_video_container_" + Math.random(), i.attr("id", o)), L.createTxVideo({
                win: window,
                containerId: o,
                vid: t.vid,
                width: e._g.gWidth,
                height: e._g.gHeight,
                autoplay: !1,
                allowFullScreen: !0,
                onSuccess: function (t) {
                    e._g.txPlayer = t.player, e._g.dataCount = e._g.targetDataCount, e.videoDataReady();
                },
                onError: function () { }
            });
            var r = this._g.monitorUid;
            if (1 == window.is_login) this._trigger("setMonitor", r, {
                38: 1
            }); else if (this._trigger("setMonitor", r, {
                39: 1
            }), 1 === window.parent.is_login) {
                var n = JSON.stringify({
                    tag: "video_player_login_status",
                    uin: window.user_uin,
                    bizUin: encodeURIComponent(t.__biz),
                    appmsgBizUin: encodeURIComponent(window.parent.biz),
                    appmsgUserUin: window.parent.user_uin,
                    isSecOpen: !!window.parent.__second_open__
                });
                O.setLogs({
                    id: 115849,
                    key: 73,
                    value: 1,
                    lc: 1,
                    log0: n
                });
            }
            return this._trigger("sendMonitor", r), !0;
        }
        return !1;
    }, t.prototype._reportH265VideoSupport = function () {
        var e = this._g.monitorUid2;
        this._trigger("setMonitor", e, {
            36: 1
        });
        var t = document.createElement("video");
        if ("function" == typeof t.canPlayType) {
            var i = t.canPlayType('video/mp4; codecs="hevc"');
            ("maybe" == i.toLowerCase() || "probably" == i.toLowerCase()) && this._trigger("setMonitor", e, {
                37: 1
            });
        }
        this._trigger("sendMonitor", e);
    }, t.prototype._initPlugins = function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        if (!e.hasInitPlugins) {
            var t = this._o.plugins || [];
            t.push(new T), this._blockPlugin = {};
            for (var i = 0, o = t.length; o > i; ++i) {
                var r = t[i];
                r.setPlayer(this), !!r.init && r.init();
            }
            this.plugins = t;
        }
    }, t.prototype.isInFullScreen = function () {
        return this._g.myPlayer ? this._g.myPlayer.isInFullScreen() : !1;
    }, t.prototype._initReportData = function () {
        var e = this._report, t = this._o;
        e.mid = t.mid, e.__biz = t.__biz, e.idx = t.idx, e.vid = t.vid, e.commentid = t.comment_id, e.scene_type = t.scene_type,
            e.auto_play = t.autoplay ? 1 : 0, e.fromid = t.fromid, e.hit_bizuin = t.hit_bizuin, e.hit_vid = t.hit_vid,
            this._g.monitorUid = this._trigger("initMonitor", 64728), this._g.monitorUid2 = this._trigger("initMonitor", 110644);
    }, t.prototype._initPlayRangeInfo = function (e) {
        function t(e, t) {
            for (var i = [{
                start: 0,
                end: e,
                hasReport: !1
            }]; ;) {
                var o = i[i.length - 1];
                if (o.end >= t) break;
                i.push({
                    start: o.end,
                    end: o.end + e,
                    hasReport: !1
                });
            }
            return i;
        }
        if (!(e.durationMs <= 0)) {
            var i = this._o.totalRange;
            this._g.playRangeInfo = 1e3 * i >= e.durationMs ? t(1e3, e.durationMs) : t(Math.ceil(e.durationMs / i), e.durationMs);
        }
    }, t.prototype._reportCurRangeInfo = function (e) {
        var t = this._g.playRangeInfo;
        if (t && 0 !== t.length) for (var i = t.length, o = this._o, r = 0; i > r; r++) {
            var n = t[r];
            if (n.start < e.curTime && n.end >= e.curTime) {
                n.hasReport || (n.hasReport = !0, C.report({
                    step: 14,
                    vid: o.vid,
                    hit_bizuin: o.hit_bizuin,
                    hit_vid: o.hit_vid,
                    traceid: this._getTraceId(),
                    orderid: this._getOrderid(),
                    ori_status: this._getOriStatus(),
                    type: this.getReportTypeBySceneType(),
                    fromid: this._getFromid(),
                    total_range: i,
                    current_range: r + 1,
                    duration: this._report.duration_ms || t[i - 1].end
                }));
                break;
            }
        }
    }, t.prototype._defineEvent = function () {
        var e = this;
        this._g.event = {
            afterRemoveLoading: function () {
                e._afterRemoveLoading();
            }
        };
    }, t.prototype.videoDataReady = function () {
        var e = this;
        this._g.dataCount === this._g.targetDataCount && (this._g.isShowTx ? this._removeLoading() : this.preLoadCover({
            callback: function () {
                e._g.vInfo.dynamicData ? e._createPlayer({
                    onLoaded: function () {
                        setTimeout(function () {
                            e._removeLoading();
                        }, 0);
                    }
                }) : e._removeLoading();
            }
        }));
    }, t.prototype._removeLoading = function () {
        this._o.isInIframe ? (f.addListener({
            type: "afterRemoveLoading",
            func: this._g.event.afterRemoveLoading
        }), f.postMessage({
            type: "removeVideoLoading",
            data: {
                vid: this._o.oriVid
            }
        })) : this._afterRemoveLoading();
    }, t.prototype._afterRemoveLoading = function () {
        if (!this._g.isShowTx && !this._g.vInfo.dynamicData) if (this._o.is_mp_video) {
            var e = 1;
            (72 == this._report.videoerror || 73 == this._report.videoerror) && (e = 2), this._showError(this._g.dynamicErrMsg, e);
        } else this._showError(this._g.dynamicErrMsg || "");
        f.removeListener({
            type: "afterRemoveLoading",
            func: this._g.event.afterRemoveLoading
        }), this._bindResize(), this._o.onReady.call(this);
    }, t.prototype.setCoverUrl = function () {
        function e() {
            k({
                type: "GET",
                dataType: "json",
                timeout: 3e4,
                url: r,
                success: function (e) {
                    e && e.base_resp && 0 == e.base_resp.ret && e.url && (t._g.coverUrl = e.url), t._g.dataCount++,
                        t.videoDataReady();
                },
                error: o
            });
        }
        if (this._g.coverUrl = this._getCover(), !this._o.is_mp_video) return this._g.dataCount++,
            void this.videoDataReady();
        var t = this, i = 1, o = function () {
            return i > 0 ? (i--, void e()) : (t._g.dataCount++, void t.videoDataReady());
        }, r = this._g.coverUrl + "&f=json";
        e();
    }, t.prototype._getDynamic = function () {
        var e = this, t = this._o, o = this._g;
        if (o.vInfo.dynamicData) {
            o.dataCount++;
            var n = o.vInfo.dynamicData;
            return this._report.getvinfo_ret = "undefined" != typeof n.ret_code ? n.ret_code : -2, this._report.getvinfo_time = n.c_time || 0,
                void this.videoDataReady();
        }
        var a = this._report, s = o.monitorUid, d = o.monitorUid2;
        return t.is_mp_video ? void i({
            preview: t.preview,
            vid: t.vid,
            __biz: t.__biz,
            mid: t.mid,
            idx: t.idx,
            onSuccess: function (t) {
                e._trigger("setMonitor", d, {
                    4: 1,
                    5: 1
                }), e._trigger("sendMonitor", d), o.dataCount++, o.vInfo.dynamicData = t, e.videoDataReady();
            },
            onError: function (t) {
                switch (e._trigger("setMonitor", d, {
                    4: 1,
                    6: 1
                }), 1 * t.code) {
                    case 80:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            24: 1
                        });
                        break;

                    case 81:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            25: 1
                        });
                        break;

                    case 82:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            26: 1
                        });
                        break;

                    case 83:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            27: 1
                        });
                        break;

                    case 84:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            28: 1
                        });
                        break;

                    case 85:
                        e._trigger("setMonitor", d, {
                            7: 1,
                            29: 1
                        });
                        break;

                    case 71:
                        e._trigger("setMonitor", d, {
                            8: 1
                        });
                        break;

                    case 72:
                        e._trigger("setMonitor", d, {
                            9: 1
                        });
                        break;

                    case 73:
                        e._trigger("setMonitor", d, {
                            10: 1
                        });
                        break;

                    case 74:
                        e._trigger("setMonitor", d, {
                            11: 1
                        });
                        break;

                    case 75:
                        e._trigger("setMonitor", d, {
                            34: 1
                        });
                        break;

                    case 76:
                        e._trigger("setMonitor", d, {
                            35: 1
                        });
                }
                e._trigger("sendMonitor", d), a.videoerror = t.code, e._g.dynamicErrMsg = t.err_msg || "",
                    a.duration_ms = 0, o.vInfo.dynamicData = null, e._g.dataCount = e._g.targetDataCount, e.videoDataReady();
            }
        }) : void r({
            vid: t.vid,
            ckey: t.ckey,
            onSuc: function (t) {
                if (e._trigger("setMonitor", s, {
                    10: 1,
                    11: 1,
                    13: Math.min(t.c_time, 6e4)
                }), t.data.width && t.data.height) {
                    var i = Math.round(10 * t.data.width / t.data.height * 1);
                    i > 20 ? i = 20 : 0 > i && (i = 0);
                    var r = 41 + 2 * i, n = {};
                    n[r] = 1, e._trigger("setMonitor", s, n);
                } else e._trigger("setMonitor", s, {
                    83: 1
                });
                e._trigger("sendMonitor", s), o.dataCount++, o.vInfo.dynamicData = t, a.getvinfo_ret = t.ret_code,
                    a.getvinfo_time = t.c_time, a.file_size = t.data.file_size, a.rate = t.data.rate, a.resolution = t.data.resolution,
                    a.format = t.data.format, a.vt = t.data.vt, a.video_ext = x.getsdtfrom(), e.videoDataReady();
            },
            onError: function (t, i) {
                if (e._trigger("setMonitor", s, {
                    10: 1,
                    12: 1,
                    13: Math.min(i.c_time, 6e4)
                }), -2 == t) switch (1 * i.ret_code) {
                    case -2:
                        e._trigger("setMonitor", s, {
                            17: 1
                        }), a.videoerror = 2;
                        break;

                    case -3:
                        e._trigger("setMonitor", s, {
                            40: 1
                        }), a.videoerror = 53;
                        break;

                    case -4:
                        e._trigger("setMonitor", s, {
                            109: 1
                        }), a.videoerror = 54;
                        break;

                    case -5:
                        e._trigger("setMonitor", s, {
                            110: 1
                        }), a.videoerror = 55;
                        break;

                    case 61:
                        e._trigger("setMonitor", s, {
                            18: 1
                        }), a.videoerror = 25;
                        break;

                    case 62:
                        e._trigger("setMonitor", s, {
                            19: 1
                        }), a.videoerror = 26;
                        break;

                    case 64:
                        e._trigger("setMonitor", s, {
                            20: 1
                        }), a.videoerror = 27;
                        break;

                    case 67:
                        e._trigger("setMonitor", s, {
                            21: 1
                        }), a.videoerror = 28;
                        break;

                    case 69:
                        e._trigger("setMonitor", s, {
                            22: 1
                        }), a.videoerror = 52;
                        break;

                    case 80:
                        e._trigger("setMonitor", s, {
                            23: 1
                        }), a.videoerror = 29;
                        break;

                    case 81:
                        e._trigger("setMonitor", s, {
                            24: 1
                        }), a.videoerror = 50;
                        break;

                    case 85:
                        e._trigger("setMonitor", s, {
                            25: 1
                        }), a.videoerror = 51;
                        break;

                    default:
                        e._trigger("setMonitor", s, {
                            26: 1
                        }), a.videoerror = 24;
                } else {
                    switch (1 * t) {
                        case -22:
                            e._trigger("setMonitor", s, {
                                15: 1
                            });
                            break;

                        case -21:
                            e._trigger("setMonitor", s, {
                                14: 1
                            });
                            break;

                        case -23:
                            e._trigger("setMonitor", s, {
                                16: 1
                            });
                    }
                    a.videoerror = -1 * t;
                }
                e._trigger("sendMonitor", s), e._g.dynamicErrMsg = i.err_msg || "", a.getvinfo_ret = i.ret_code,
                    a.duration_ms = 0, a.getvinfo_time = i.c_time || 0, o.vInfo.dynamicData = null, e._g.dataCount = e._g.targetDataCount,
                    e.videoDataReady();
            }
        });
    }, t.prototype._createPlayer = function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = this, i = this._g, o = this._o, r = i.vInfo, n = this._report, a = r.dynamicData.data, s = [];
        i.myAdPlugin && s.push(i.myAdPlugin), i.noProxy !== !0 && A.isUseProxy && s.push(new I({
            vid: o.vid,
            data: a,
            cdn_url: a.totalUrl
        })), n.duration_ms = parseInt(1e3 * a.time), this._initPlayRangeInfo({
            durationMs: n.duration_ms
        }), n.vtitle = window.cgiData && window.cgiData.video_title && window.cgiData.video_title.htmlDecode() || a.title || "";
        var d = !1, _ = i.monitorUid, c = i.monitorUid2, p = t.getReportTypeBySceneType();
        i.myPlayer = new z({
            __biz: o.__biz,
            mid: o.mid,
            idx: o.idx,
            videoTitle: n.vtitle,
            videoReportType: p,
            defineCSS: !0,
            container: o.container,
            cover: i.coverUrl,
            ratio: o.ratio,
            width: i.gWidth,
            height: i.gHeight,
            videoWidth: a.width,
            videoHeight: a.height,
            duration: a.time,
            autoplay: o.autoplay,
            autoReplay: o.autoReplay,
            isVideoSharePage: o.isVideoSharePage,
            flow: a.flow,
            loop: o.loop,
            plugins: s,
            src: a.totalUrl,
            headImgUrl: o.headImgUrl,
            jsapiFullScreen: o.jsapiFullScreen,
            canShareVideo: o.canShareVideo,
            pauseShowControll: o.pauseShowControll,
            videoMd5: o.videoMd5,
            extinfo: {
                hit_bizuin: o.hit_bizuin,
                hit_vid: o.hit_vid,
                vid: o.vid,
                preview: o.preview,
                pageplayer: t
            },
            onLoaded: function () {
                "function" == typeof e.onLoaded && e.onLoaded();
            },
            onTimeupdate: function (e, r) {
                if (!d) {
                    d = !0, C.report({
                        step: 6,
                        vid: o.vid,
                        traceid: t._getTraceId(),
                        orderid: t._getOrderid(),
                        type: p,
                        fromid: t._o.fromid
                    });
                    var a = this.getLog(), s = a.loadwait || 0;
                    t._qqVideoReport({
                        step: 6,
                        loadwait: s
                    });
                }
                i.is_report_pv || (i.is_report_pv = !0, t._trigger("clearMonitor", _), t._trigger("clearMonitor", c),
                    t._o.is_mp_video ? (t._trigger("setMonitor", c, {
                        12: 1,
                        13: 1
                    }), t._trigger("sendMonitor", c)) : (t._trigger("setMonitor", _, {
                        0: 1,
                        1: 1
                    }), t._trigger("sendMonitor", _))), n.last_ms = parseInt(1e3 * r.currentTime), n.video_play_time = parseInt(1e3 * r.currentTime),
                    t._reportCurRangeInfo({
                        curTime: n.last_ms
                    });
            },
            onBeginPlay: function () {
                var e = r.status, i = this;
                e && !e.isEnd && 1 * e.playTime > 0 && 1 * e.playTime < .99 * a.time && (i.play(e.playTime), e.playTime = 0),
                    n.client_time_when_play = Math.round(+new Date / 1e3), n.click_play_button = 1, "string" == typeof o.container && "#" == o.container.charAt(0) && "number" == typeof o.__count__ && o.__hasReport === !1 && (0 == o.__count__ ? (new Image).src = "/mp/jsreport?key=103&content=video_test&r=" + Math.random() : 1 == o.__count__ ? (new Image).src = "/mp/jsreport?key=104&content=video_test&r=" + Math.random() : o.__count__ >= 2 && ((new Image).src = "/mp/jsreport?key=105&content=video_test&r=" + Math.random()),
                        o.__hasReport = !0), t._trigger("beginPlay");
            },
            onFullscreenchange: function (e, i) {
                t._trigger("fullscreenchange", i);
            },
            onAriaReplay: function () {
                t._trigger("ariaReplay");
            },
            onStatusChange: function (e, i) {
                "loading" !== i.status || "seeked" !== i.subStatus && "seeking" !== i.subStatus || t._initPlayRangeInfo({
                    durationMs: n.duration_ms
                }), t._trigger("statusChange", i);
            },
            onAfterReplay: function () {
                t._trigger("afterReplay");
            },
            onHandDragComplete: function (e, i) {
                t._trigger("handDragComplete", i);
            },
            onBarDragComplete: function (e, i) {
                t._trigger("barDragComplete", i);
            },
            onEnd: function () {
                this.hideControllBar(), n.hasended = 1, C.report({
                    step: 7,
                    vid: o.vid,
                    ext1: 1e3 * a.time,
                    traceid: t._getTraceId(),
                    orderid: t._getOrderid(),
                    type: p,
                    fromid: t._o.fromid
                }), t._debug("onend isend:" + this.isEnd()), t._trigger("hidePauseTips"), t._trigger("showEndContent"),
                    t._reportCurRangeInfo({
                        curTime: n.last_ms
                    }), t._initPlayRangeInfo({
                        durationMs: n.duration_ms
                    });
            },
            onError: function (e, o) {
                if (n.videoerror = !o || !o.errorcode || o.errorcode > 5 || o.errorcode <= 0 ? 46 : o.errorcode + 40,
                    A.isUseProxy && !t._g.noProxy ? A.isAndroid ? t._trigger("setMonitor", c, {
                        30: 1
                    }) : A.isIOS && t._trigger("setMonitor", c, {
                        32: 1
                    }) : A.isUseProxy && t._g.noProxy && !t._g.hasReportProxyError && (t._g.hasReportProxyError = !0,
                        A.isAndroid ? t._trigger("setMonitor", c, {
                            31: 1
                        }) : A.isIOS && t._trigger("setMonitor", c, {
                            33: 1
                        })), t._o.is_mp_video) {
                    switch (i.is_report_pv || (i.is_report_pv = !0, t._trigger("setMonitor", c, {
                        12: 1
                    })), t._trigger("setMonitor", c, {
                        14: 1
                    }), 1 * o.errorcode) {
                        case 1:
                            t._trigger("setMonitor", c, {
                                15: 1
                            });
                            break;

                        case 2:
                            t._trigger("setMonitor", c, {
                                16: 1
                            });
                            break;

                        case 3:
                            t._trigger("setMonitor", c, {
                                17: 1
                            });
                            break;

                        case 4:
                            t._trigger("setMonitor", c, {
                                18: 1
                            });
                            break;

                        case 5:
                            t._trigger("setMonitor", c, {
                                19: 1
                            });
                            break;

                        case 6:
                            t._trigger("setMonitor", c, {
                                39: 1
                            });
                            break;

                        default:
                            t._trigger("setMonitor", c, {
                                20: 1
                            });
                    }
                    t._trigger("sendMonitor", c);
                } else {
                    switch (i.is_report_pv || (i.is_report_pv = !0, t._trigger("setMonitor", _, {
                        0: 1
                    })), t._trigger("setMonitor", _, {
                        2: 1,
                        3: 1
                    }), 1 * o.errorcode) {
                        case 1:
                            t._trigger("setMonitor", _, {
                                4: 1
                            });
                            break;

                        case 2:
                            t._trigger("setMonitor", _, {
                                5: 1
                            });
                            break;

                        case 3:
                            t._trigger("setMonitor", _, {
                                6: 1
                            });
                            break;

                        case 4:
                            t._trigger("setMonitor", _, {
                                7: 1
                            });
                            break;

                        case 5:
                            t._trigger("setMonitor", _, {
                                8: 1
                            });
                            break;

                        default:
                            t._trigger("setMonitor", _, {
                                9: 1
                            });
                    }
                    t._trigger("sendMonitor", _), t._trigger("sendMonitor", c);
                }
                n.v_err_code = o.errorcode, t._showError(), t._qqVideoReport({
                    step: 1999,
                    val: n.videoerror
                }), t._initPlayRangeInfo({
                    durationMs: n.duration_ms
                });
            },
            onFirstBufferingTime: function (e, i) {
                t._trigger("firstBufferingTime", i);
            },
            onPlayingBufferingTime: function (e, i) {
                t._trigger("playingBufferingTime", i);
            },
            onDurationchange: function () { },
            onFlowNotice: function (e, i) {
                t._trigger("flowNotice", i);
            },
            onUserplay: function () {
                t._trigger("userplay");
            },
            onUserpause: function () {
                t._trigger("userpause", {
                    curTime: this.getCurTime()
                }), n.pause_num = (n.pause_num || 0) + 1;
            },
            onAfterCheckVideoFit: function (e, i) {
                var o = {
                    97: 1
                };
                i.needToFit === !0 && (o[98] = 1, o[100] = 1, i.os.ios && (o[103] = 1), i.os.android && (o[106] = 1),
                    i.supportObjectFit === !0 && (o[101] = 1, i.os.ios && (o[104] = 1), i.os.android && (o[107] = 1))),
                    t._trigger("setMonitor", _, o), t._trigger("sendMonitor", _);
            },
            canMePlay: function (e) {
                o.checkNoPaid ? k({
                    type: "GET",
                    dataType: "json",
                    timeout: 3e4,
                    url: "/mp/videoplayer?action=check_video_paid_status&__biz=" + o.__biz + "&mid=" + o.mid + "&idx=" + o.idx,
                    success: function (t) {
                        var i = 1 == t.can_play;
                        i ? e() : window.weui.confirm("此视频来自于付费内容，在原文付费后才可播放", {
                            buttons: [{
                                type: "default",
                                label: "取消"
                            }, {
                                label: "前往原文",
                                onClick: function () {
                                    o.openArticle();
                                }
                            }]
                        });
                    },
                    error: function (e) {
                        var t = void 0;
                        t = e ? e.status >= 200 && e.status < 400 ? 81 : e.status >= 400 && e.status < 500 ? 82 : e.status >= 500 && e.status < 600 ? 83 : 0 == e.status && 4 == e.readyState ? 84 : 85 : 80,
                            onError({
                                err_msg: U,
                                code: t
                            });
                    }
                }) : e();
            }
        }), this._pvReport(), this._trigger("playerReady"), o.__count__ = 0, o.__hasReport = !1,
            "string" == typeof o.container && "#" == o.container.charAt(0) && document.getElementById(o.container.substr(1)).getElementsByClassName("js_video_play_controll")[0].addEventListener("click", function () {
                o.__count__++;
            });
    }, t.prototype.getReportTypeBySceneType = function () {
        return 0 == this._o.scene_type ? 1 : 1 == this._o.scene_type || 2 == this._o.scene_type ? 2 : 4 == this._o.scene_type ? 3 : 7 == this._o.scene_type ? 4 : 0;
    }, t.prototype._getFromid = function () {
        return this._o.fromid;
    }, t.prototype._bindResize = function () {
        var e = this;
        D.on(window, "resize", function () {
            e._o.height && e._o.width && (e._g.isShowTx && e._g.txPlayer ? setTimeout(function () {
                try {
                    var t = $(e._o.container), i = e._o.width / e._o.height, o = t.offset().width, r = Math.floor(o / i);
                    0 != o && (e._g.gWidth = o, e._g.gHeight = r, t.css({
                        height: r + "px"
                    }), e._g.txPlayer.resize({
                        width: o,
                        height: r
                    }));
                } catch (n) { }
            }, 0) : setTimeout(function () {
                var t = $(e._o.container), i = e._o.width / e._o.height, o = t.offset().width, r = Math.floor(o / i);
                0 != o && (e._g.gWidth = o, e._g.gHeight = r, e.setVideoCSS({
                    width: o + "px",
                    height: r + "px"
                }), t.css({
                    height: r + "px"
                }));
            }, 0));
        }, !1);
    }, t.prototype._setBlockPlugin = function (e, t) {
        this._blockPlugin[e] = t;
    }, t.prototype._trigger = function (e) {
        var t = void 0, i = void 0, o = this.plugins, r = this._blockPlugin[e] || this._blockPlugin.all, n = 0;
        if (r && "function" == typeof r.recv && (t = r.recv.apply(r, arguments), "[object Object]" == Object.prototype.toString.call(t) ? (n |= t.code,
            i = t.data) : n |= t, 1 & n)) return i;
        for (var a = 0, s = o.length; s > a && (t = o[a].recv.apply(o[a], arguments), "[object Object]" == Object.prototype.toString.call(t) ? (n |= t.code,
            i = t.data) : n |= t, !(2 & n)); ++a);
        if (!(this._blockInnerHandler || 4 & n)) {
            var d = this["__" + e + "Handler"];
            d && (t = d.apply(this, arguments), "[object Object]" == Object.prototype.toString.call(t) && (i = t.data));
        }
        return 8 & n || this.__triggerOutside.apply(this, arguments), i;
    }, t.prototype.__triggerOutside = function () {
        var e = this._o, t = arguments, i = t[0];
        if (i) {
            i = i.substr(0, 1).toUpperCase() + i.substr(1);
            var o = e["on" + i];
            "function" == typeof o && o.apply(this, t);
        }
    }, t.prototype.preLoadCover = function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = this, i = this._o, o = null, r = null, n = null;
        i.ratio == 16 / 9 ? (o = 85, r = 86, n = 87) : (o = 89, r = 90, n = 91);
        var a = this._g.coverUrl, s = new window.Image;
        s.onload = function () {
            s.onload = null, s.onerror = null, s = null;
            var i = {};
            i[o] = 1, i[r] = 1;
            var n = t._g.monitorUid;
            t._trigger("setMonitor", n, i), t._trigger("sendMonitor", n), e.callback();
        }, s.onerror = function () {
            s.onload = null, s.onerror = null, s = null;
            var r = {};
            r[o] = 1, r[n] = 1;
            var a = t._g.monitorUid;
            t._trigger("setMonitor", a, r), i.ratio == 16 / 9 || i.is_mp_video ? (t._trigger("sendMonitor", a),
                e.callback()) : !function () {
                    var o = new window.Image;
                    o.onload = function () {
                        t._g.myPlayer && t._g.myPlayer._setCover && (t._g.coverUrl = this.src, t._g.myPlayer._setCover(this.src, {
                            "background-image": 'url("' + this.src + '")'
                        })), o.onload = null, o.onerror = null, o = null, t._trigger("setMonitor", a, {
                            93: 1,
                            94: 1
                        }), t._trigger("sendMonitor", a), e.callback();
                    }, o.onerror = function () {
                        o.onload = null, o.onerror = null, o = null, t._trigger("setMonitor", a, {
                            93: 1,
                            95: 1
                        }), t._trigger("sendMonitor", a), e.callback();
                    }, o.src = d(i.vid, 16 / 9, i.is_mp_video);
                }();
        }, s.src = a;
    }, t.prototype._getCover = function () {
        var e = this._o;
        return d(e.vid, e.ratio, e.is_mp_video);
    }, t.prototype._cacheData = function () {
        var e = this._g.myPlayer, t = this._g.vInfo;
        e && (t.status || (t.status = {}), "function" == typeof e.isEnd && (t.status.isEnd = e.isEnd()),
            "function" == typeof e.getCurTime && (t.status.playTime = e.getCurTime()), c(this._o.vid, this._g.vInfo));
    }, t.prototype._getCache = function () {
        var e = _(this._o.vid);
        if (e) {
            var t = this._g.vInfo;
            t.status = e.status || null, t.dynamicData = e.dynamicData || null;
        }
    }, t.prototype._clearCache = function () {
        p(this._o.vid);
    }, t.prototype._qqVideoReport = function (e) {
        var t = {
            step: e.step,
            loadwait: e.loadwait || 0,
            val: e.val || 0,
            vid: this._o.vid
        };
        6 == e.step && (t.vt = this._report.vt), x.qqvideo_common_report(t);
    }, t.prototype._pvReport = function () {
        this._qqVideoReport({
            step: 3
        });
    }, t.prototype._showError = function (e, t) {
        t = t || 1;
        var i = this, o = this._report.videoerror, r = g(this._o.container.replace(/^#/, ""));
        if (r) {
            e = e || U;
            var n = !1;
            e === U && (n = !0), r.innerHTML = E.tmpl(V, {
                errType: t,
                msg: e,
                errcode: o,
                showBtn: n,
                width: r.offsetWidth,
                height: r.offsetHeight,
                is_mp_video: this._o.is_mp_video
            }, !1);
            {
                var a = $(r).find(".js_video_errormsg_btn");
                $(r).find(".js_video_errormsg_loading"), $(r).find(".js_error_area");
            }
            D.tap(a[0], function () {
                i._reInit();
            });
        }
    }, t.prototype._reInit = function () {
        var e = g(this._o.container.replace(/^#/, ""));
        e.innerHTML = "";
        var t = !1, i = !1;
        A.isUseProxy && this._report.videoerror >= 41 && this._report.videoerror <= 46 && (t = !0, this._g.noProxy && (i = !0)),
            this._init({
                noProxy: t,
                hasReportProxyError: i,
                hasInitPlugins: !0,
                gWidth: this._g.gWidth,
                gHeight: this._g.gHeight
            });
    }, t.prototype.__showEndContentHandler = function () {
        this._debug("resetVideo"), this._g.myPlayer.resetVideo(), this._g.myPlayer.hidePlayBtn(),
            this._o.showEndContent && this._o.showEndContent.call(this);
    }, t.prototype._debug = function () { }, t.prototype.__ariaReplayHandler = function () {
        this.__replayHandler();
    }, t.prototype.__replayHandler = function () {
        this._g.is_report_pv = !1, this._qqVideoReport({
            step: 3
        }), this._report.replay = 1, this._g.myPlayer.replay();
    }, t.prototype._getTraceId = function () {
        var e = this._g.myAdPlugin;
        return e ? e.getTraceId() : 0;
    }, t.prototype._getOrderid = function () {
        var e = this._g.myAdPlugin;
        return e ? e.getOrderid() : 0;
    }, t.prototype._getOriStatus = function () {
        return this._o.ori_status;
    }, t.prototype._getPlayerReportData = function () {
        var e = this._report, t = this._g.myPlayer, i = this._g.myAdPlugin;
        t && (e.quick_play = t.hasDrag() ? 1 : 0, e.full_screen = t.hasFullScreen() ? 1 : 0, e.drag_times = t.getDrag().join(":|:"),
            e.play_time = this.getRealPlayTime()), i && (e.ad_play_time = i.getAdPlaytime(), e.traceid = i.getTraceId(),
                e.orderid = i.getOrderid()), e.webviewid = C.getWebviewid();
    }, t.prototype._cacheReportData = function () {
        var e = this;
        this._g.reportDataTimeoutId && (clearTimeout(this._g.reportDataTimeoutId), this._g.reportDataTimeoutId = null),
            !A.videoDataLs || this._g.hasReport || this._g.hasDestroy || (this._getPlayerReportData(),
                A.videoDataLs.set(this._g.reportDataLsKey, this._report, +new Date + A.videoDataLsExpTime)),
            A.neeedTimoutSaveReportData && !this._g.hasDestroy && (this._g.reportDataTimeoutId = window.setTimeout(function () {
                e._cacheReportData();
            }, 1e3));
    }, t.prototype.getVid = function () {
        return this._o.vid;
    }, t.prototype.pause = function () {
        this._g.myPlayer && this._g.myPlayer.pause4outer();
    }, t.prototype.play = function (e) {
        this._g.myPlayer && this._g.myPlayer.play4outer(e);
    }, t.prototype.getRealPlayTime = function () {
        var e = 0;
        return this._g.myPlayer && (e = Math.round(1e3 * this._g.myPlayer.getPlayTotalTime())),
            e;
    }, t.prototype.getCurrentTime = function () {
        var e = 0, t = this._g.myPlayer;
        return this._g.myPlayer && (e = t.getCurTime()), e;
    }, t.prototype.getVideoData = function () {
        return this._g.vInfo && this._g.vInfo.dynamicData && this._g.vInfo.dynamicData.data ? this._g.vInfo.dynamicData.data : null;
    }, t.prototype.getReportData = function () {
        return this._report;
    }, t.prototype.mpVideoReport = function (e) {
        if (e = e || {}, !this._g.hasReport && !this._g.hasDestroy) {
            this._g.hasReport = !0;
            var t = this._report;
            0 === t.videoerror ? this.cacheData() : this.clearCache(), A.videoDataLs && A.videoDataLs.remove(this._g.reportDataLsKey),
                this._getPlayerReportData(), A._debug && console.log("report video data:" + JSON.stringify(t)),
                x.videoreport({
                    data: t,
                    async: e.async
                });
        }
    }, t.prototype.extendMpReportData = function (e) {
        u(this._report, e);
    }, t.prototype.getMpReportData = function () {
        return this._report;
    }, t.prototype.clearCache = function () {
        this._clearCache();
    }, t.prototype.cacheData = function () {
        this._cacheData();
    }, t.prototype.setWidth = function (e) {
        this._g.myPlayer.setWidth(e);
    }, t.prototype.setHeight = function (e) {
        this._g.myPlayer.setHeight(e);
    }, t.prototype.renderLike = function () {
        var e = this._g.myPlayer;
        e && e.isEnd() && this._trigger("showEndContent");
    }, t.prototype.setVideoCSS = function (e) {
        var t = this, i = this._g.myPlayer, o = this._g.myAdPlugin;
        i && (i.setVideoCSS(e), o && o.setSize(e), setTimeout(function () {
            t.renderLike();
        }, 0));
        var r = $(this._o.container).find(".js_error_box");
        r && r.length > 0 && r.css(e);
    }, t.prototype.destroy = function () {
        for (var e = 0; e < A.videoInstance.length; e++)A.videoInstance[e] === this && (A.videoInstance.splice(e, 1),
            e--);
        this._g && (this._g.event && f.removeListener({
            type: "afterRemoveLoading",
            func: this._g.event.afterRemoveLoading
        }), this._g.myPlayer && this._g.myPlayer.destroy(), this._g.hasDestroy = !0);
    };
    var F = -1 != navigator.userAgent.indexOf("MicroMessenger") && (w.isIOS || w.isAndroid || w.isWp);
    return {
        getHashByVid: s,
        mpVideoPlayer: t,
        getFormatTime: z._getFormatTime,
        getCoverByVid: d,
        getQQVideoStaticInfo: a
    };
}); !function (e) {
    var c = "object" == typeof window && window || "object" == typeof self && self;
    "function" == typeof define ? define("biz_common/utils/emoji_data.js", [], function (c, o) {
        "use strict";
        return e(o);
    }) : c && "undefined" == typeof c.__emojiData && (c.__emojiData = e({}));
}(function () {
    return [{
        id: 0,
        cn: "[微笑]",
        hk: "[微笑]",
        us: "[Smile]",
        code: "/::)",
        web_code: "/微笑",
        style: "icon_smiley_0"
    }, {
        id: 1,
        cn: "[撇嘴]",
        hk: "[撇嘴]",
        us: "[Grimace]",
        code: "/::~",
        web_code: "/撇嘴",
        style: "icon_smiley_1"
    }, {
        id: 2,
        cn: "[色]",
        hk: "[色]",
        us: "[Drool]",
        code: "/::B",
        web_code: "/色",
        style: "icon_smiley_2"
    }, {
        id: 3,
        cn: "[发呆]",
        hk: "[發呆]",
        us: "[Scowl]",
        code: "/::|",
        web_code: "/发呆",
        style: "icon_smiley_3"
    }, {
        id: 4,
        cn: "[得意]",
        hk: "[得意]",
        us: "[CoolGuy]",
        code: "/:8-)",
        web_code: "/得意",
        style: "icon_smiley_4"
    }, {
        id: 5,
        cn: "[流泪]",
        hk: "[流淚]",
        us: "[Sob]",
        code: "/::<",
        web_code: "/流泪",
        style: "icon_smiley_5"
    }, {
        id: 6,
        cn: "[害羞]",
        hk: "[害羞]",
        us: "[Shy]",
        code: "/::$",
        web_code: "/害羞",
        style: "icon_smiley_6"
    }, {
        id: 7,
        cn: "[闭嘴]",
        hk: "[閉嘴]",
        us: "[Silent]",
        code: "/::X",
        web_code: "/闭嘴",
        style: "icon_smiley_7"
    }, {
        id: 8,
        cn: "[睡]",
        hk: "[睡]",
        us: "[Sleep]",
        code: "/::Z",
        web_code: "/睡",
        style: "icon_smiley_8"
    }, {
        id: 9,
        cn: "[大哭]",
        hk: "[大哭]",
        us: "[Cry]",
        code: "/::'(",
        web_code: "/大哭",
        style: "icon_smiley_9"
    }, {
        id: 10,
        cn: "[尴尬]",
        hk: "[尷尬]",
        us: "[Awkward]",
        code: "/::-|",
        web_code: "/尴尬",
        style: "icon_smiley_10"
    }, {
        id: 11,
        cn: "[发怒]",
        hk: "[發怒]",
        us: "[Angry]",
        code: "/::@",
        web_code: "/发怒",
        style: "icon_smiley_11"
    }, {
        id: 12,
        cn: "[调皮]",
        hk: "[調皮]",
        us: "[Tongue]",
        code: "/::P",
        web_code: "/调皮",
        style: "icon_smiley_12"
    }, {
        id: 13,
        cn: "[呲牙]",
        hk: "[呲牙]",
        us: "[Grin]",
        code: "/::D",
        web_code: "/呲牙",
        style: "icon_smiley_13"
    }, {
        id: 14,
        cn: "[惊讶]",
        hk: "[驚訝]",
        us: "[Surprise]",
        code: "/::O",
        web_code: "/惊讶",
        style: "icon_smiley_14"
    }, {
        id: 15,
        cn: "[难过]",
        hk: "[難過]",
        us: "[Frown]",
        code: "/::(",
        web_code: "/难过",
        style: "icon_smiley_15"
    }, {
        id: 16,
        cn: "[酷]",
        hk: "[酷]",
        us: "[Ruthless]",
        code: "/::+",
        web_code: "/酷",
        style: "icon_smiley_16"
    }, {
        id: 17,
        cn: "[冷汗]",
        hk: "[冷汗]",
        us: "[Blush]",
        code: "/:--b",
        web_code: "/冷汗",
        style: "icon_smiley_17"
    }, {
        id: 18,
        cn: "[抓狂]",
        hk: "[抓狂]",
        us: "[Scream]",
        code: "/::Q",
        web_code: "/抓狂",
        style: "icon_smiley_18"
    }, {
        id: 19,
        cn: "[吐]",
        hk: "[吐]",
        us: "[Puke]",
        code: "/::T",
        web_code: "/吐",
        style: "icon_smiley_19"
    }, {
        id: 20,
        cn: "[偷笑]",
        hk: "[偷笑]",
        us: "[Chuckle]",
        code: "/:,@P",
        web_code: "/偷笑",
        style: "icon_smiley_20"
    }, {
        id: 21,
        cn: "[愉快]",
        hk: "[愉快]",
        us: "[Joyful]",
        code: "/:,@-D",
        web_code: "/可爱",
        style: "icon_smiley_21"
    }, {
        id: 22,
        cn: "[白眼]",
        hk: "[白眼]",
        us: "[Slight]",
        code: "/::d",
        web_code: "/白眼",
        style: "icon_smiley_22"
    }, {
        id: 23,
        cn: "[傲慢]",
        hk: "[傲慢]",
        us: "[Smug]",
        code: "/:,@o",
        web_code: "/傲慢",
        style: "icon_smiley_23"
    }, {
        id: 24,
        cn: "[饥饿]",
        hk: "[饑餓]",
        us: "[Hungry]",
        code: "/::g",
        web_code: "/饥饿",
        style: "icon_smiley_24"
    }, {
        id: 25,
        cn: "[困]",
        hk: "[累]",
        us: "[Drowsy]",
        code: "/:|-)",
        web_code: "/困",
        style: "icon_smiley_25"
    }, {
        id: 26,
        cn: "[惊恐]",
        hk: "[驚恐]",
        us: "[Panic]",
        code: "/::!",
        web_code: "/惊恐",
        style: "icon_smiley_26"
    }, {
        id: 27,
        cn: "[流汗]",
        hk: "[流汗]",
        us: "[Sweat]",
        code: "/::L",
        web_code: "/流汗",
        style: "icon_smiley_27"
    }, {
        id: 28,
        cn: "[憨笑]",
        hk: "[大笑]",
        us: "[Laugh]",
        code: "/::>",
        web_code: "/憨笑",
        style: "icon_smiley_28"
    }, {
        id: 29,
        cn: "[悠闲]",
        hk: "[悠閑]",
        us: "[Commando]",
        code: "/::,@",
        web_code: "/大兵",
        style: "icon_smiley_29"
    }, {
        id: 30,
        cn: "[奋斗]",
        hk: "[奮鬥]",
        us: "[Determined]",
        code: "/:,@f",
        web_code: "/奋斗",
        style: "icon_smiley_30"
    }, {
        id: 31,
        cn: "[咒骂]",
        hk: "[咒罵]",
        us: "[Scold]",
        code: "/::-S",
        web_code: "/咒骂",
        style: "icon_smiley_31"
    }, {
        id: 32,
        cn: "[疑问]",
        hk: "[疑問]",
        us: "[Shocked]",
        code: "/:?",
        web_code: "/疑问",
        style: "icon_smiley_32"
    }, {
        id: 33,
        cn: "[嘘]",
        hk: "[噓]",
        us: "[Shhh]",
        code: "/:,@x",
        web_code: "/嘘",
        style: "icon_smiley_33"
    }, {
        id: 34,
        cn: "[晕]",
        hk: "[暈]",
        us: "[Dizzy]",
        code: "/:,@@",
        web_code: "/晕",
        style: "icon_smiley_34"
    }, {
        id: 35,
        cn: "[疯了]",
        hk: "[瘋了]",
        us: "[Tormented]",
        code: "/::8",
        web_code: "/折磨",
        style: "icon_smiley_35"
    }, {
        id: 36,
        cn: "[衰]",
        hk: "[衰]",
        us: "[Toasted]",
        code: "/:,@!",
        web_code: "/衰",
        style: "icon_smiley_36"
    }, {
        id: 37,
        cn: "[骷髅]",
        hk: "[骷髏頭]",
        us: "[Skull]",
        code: "/:!!!",
        web_code: "/骷髅",
        style: "icon_smiley_37"
    }, {
        id: 38,
        cn: "[敲打]",
        hk: "[敲打]",
        us: "[Hammer]",
        code: "/:xx",
        web_code: "/敲打",
        style: "icon_smiley_38"
    }, {
        id: 39,
        cn: "[再见]",
        hk: "[再見]",
        us: "[Wave]",
        code: "/:bye",
        web_code: "/再见",
        style: "icon_smiley_39"
    }, {
        id: 40,
        cn: "[擦汗]",
        hk: "[擦汗]",
        us: "[Speechless]",
        code: "/:wipe",
        web_code: "/擦汗",
        style: "icon_smiley_40"
    }, {
        id: 41,
        cn: "[抠鼻]",
        hk: "[摳鼻]",
        us: "[NosePick]",
        code: "/:dig",
        web_code: "/抠鼻",
        style: "icon_smiley_41"
    }, {
        id: 42,
        cn: "[鼓掌]",
        hk: "[鼓掌]",
        us: "[Clap]",
        code: "/:handclap",
        web_code: "/鼓掌",
        style: "icon_smiley_42"
    }, {
        id: 43,
        cn: "[糗大了]",
        hk: "[羞辱]",
        us: "[Shame]",
        code: "/:&-(",
        web_code: "/糗大了",
        style: "icon_smiley_43"
    }, {
        id: 44,
        cn: "[坏笑]",
        hk: "[壞笑]",
        us: "[Trick]",
        code: "/:B-)",
        web_code: "/坏笑",
        style: "icon_smiley_44"
    }, {
        id: 45,
        cn: "[左哼哼]",
        hk: "[左哼哼]",
        us: "[Bah！L]",
        code: "/:<@",
        web_code: "/左哼哼",
        style: "icon_smiley_45"
    }, {
        id: 46,
        cn: "[右哼哼]",
        hk: "[右哼哼]",
        us: "[Bah！R]",
        code: "/:@>",
        web_code: "/右哼哼",
        style: "icon_smiley_46"
    }, {
        id: 47,
        cn: "[哈欠]",
        hk: "[哈欠]",
        us: "[Yawn]",
        code: "/::-O",
        web_code: "/哈欠",
        style: "icon_smiley_47"
    }, {
        id: 48,
        cn: "[鄙视]",
        hk: "[鄙視]",
        us: "[Pooh-pooh]",
        code: "/:>-|",
        web_code: "/鄙视",
        style: "icon_smiley_48"
    }, {
        id: 49,
        cn: "[委屈]",
        hk: "[委屈]",
        us: "[Shrunken]",
        code: "/:P-(",
        web_code: "/委屈",
        style: "icon_smiley_49"
    }, {
        id: 50,
        cn: "[快哭了]",
        hk: "[快哭了]",
        us: "[TearingUp]",
        code: "/::'|",
        web_code: "/快哭了",
        style: "icon_smiley_50"
    }, {
        id: 51,
        cn: "[阴险]",
        hk: "[陰險]",
        us: "[Sly]",
        code: "/:X-)",
        web_code: "/阴险",
        style: "icon_smiley_51"
    }, {
        id: 52,
        cn: "[亲亲]",
        hk: "[親親]",
        us: "[Kiss]",
        code: "/::*",
        web_code: "/亲亲",
        style: "icon_smiley_52"
    }, {
        id: 53,
        cn: "[吓]",
        hk: "[嚇]",
        us: "[Wrath]",
        code: "/:@x",
        web_code: "/吓",
        style: "icon_smiley_53"
    }, {
        id: 54,
        cn: "[可怜]",
        hk: "[可憐]",
        us: "[Whimper]",
        code: "/:8*",
        web_code: "/可怜",
        style: "icon_smiley_54"
    }, {
        id: 55,
        cn: "[菜刀]",
        hk: "[菜刀]",
        us: "[Cleaver]",
        code: "/:pd",
        web_code: "/菜刀",
        style: "icon_smiley_55"
    }, {
        id: 56,
        cn: "[西瓜]",
        hk: "[西瓜]",
        us: "[Watermelon]",
        code: "/:<W>",
        web_code: "/西瓜",
        style: "icon_smiley_56"
    }, {
        id: 57,
        cn: "[啤酒]",
        hk: "[啤酒]",
        us: "[Beer]",
        code: "/:beer",
        web_code: "/啤酒",
        style: "icon_smiley_57"
    }, {
        id: 58,
        cn: "[篮球]",
        hk: "[籃球]",
        us: "[Basketball]",
        code: "/:basketb",
        web_code: "/篮球",
        style: "icon_smiley_58"
    }, {
        id: 59,
        cn: "[乒乓]",
        hk: "[乒乓]",
        us: "[PingPong]",
        code: "/:oo",
        web_code: "/乒乓",
        style: "icon_smiley_59"
    }, {
        id: 60,
        cn: "[咖啡]",
        hk: "[咖啡]",
        us: "[Coffee]",
        code: "/:coffee",
        web_code: "/咖啡",
        style: "icon_smiley_60"
    }, {
        id: 61,
        cn: "[饭]",
        hk: "[飯]",
        us: "[Rice]",
        code: "/:eat",
        web_code: "/饭",
        style: "icon_smiley_61"
    }, {
        id: 62,
        cn: "[猪头]",
        hk: "[豬頭]",
        us: "[Pig]",
        code: "/:pig",
        web_code: "/猪头",
        style: "icon_smiley_62"
    }, {
        id: 63,
        cn: "[玫瑰]",
        hk: "[玫瑰]",
        us: "[Rose]",
        code: "/:rose",
        web_code: "/玫瑰",
        style: "icon_smiley_63"
    }, {
        id: 64,
        cn: "[凋谢]",
        hk: "[枯萎]",
        us: "[Wilt]",
        code: "/:fade",
        web_code: "/凋谢",
        style: "icon_smiley_64"
    }, {
        id: 65,
        cn: "[嘴唇]",
        hk: "[嘴唇]",
        us: "[Lips]",
        code: "/:showlove",
        web_code: "/示爱",
        style: "icon_smiley_65"
    }, {
        id: 66,
        cn: "[爱心]",
        hk: "[愛心]",
        us: "[Heart]",
        code: "/:heart",
        web_code: "/爱心",
        style: "icon_smiley_66"
    }, {
        id: 67,
        cn: "[心碎]",
        hk: "[心碎]",
        us: "[BrokenHeart]",
        code: "/:break",
        web_code: "/心碎",
        style: "icon_smiley_67"
    }, {
        id: 68,
        cn: "[蛋糕]",
        hk: "[蛋糕]",
        us: "[Cake]",
        code: "/:cake",
        web_code: "/蛋糕",
        style: "icon_smiley_68"
    }, {
        id: 69,
        cn: "[闪电]",
        hk: "[閃電]",
        us: "[Lightning]",
        code: "/:li",
        web_code: "/闪电",
        style: "icon_smiley_69"
    }, {
        id: 70,
        cn: "[炸弹]",
        hk: "[炸彈]",
        us: "[Bomb]",
        code: "/:bome",
        web_code: "/炸弹",
        style: "icon_smiley_70"
    }, {
        id: 71,
        cn: "[刀]",
        hk: "[刀]",
        us: "[Dagger]",
        code: "/:kn",
        web_code: "/刀",
        style: "icon_smiley_71"
    }, {
        id: 72,
        cn: "[足球]",
        hk: "[足球]",
        us: "[Soccer]",
        code: "/:footb",
        web_code: "/足球",
        style: "icon_smiley_72"
    }, {
        id: 73,
        cn: "[瓢虫]",
        hk: "[甲蟲]",
        us: "[Ladybug]",
        code: "/:ladybug",
        web_code: "/瓢虫",
        style: "icon_smiley_73"
    }, {
        id: 74,
        cn: "[便便]",
        hk: "[便便]",
        us: "[Poop]",
        code: "/:shit",
        web_code: "/便便",
        style: "icon_smiley_74"
    }, {
        id: 75,
        cn: "[月亮]",
        hk: "[月亮]",
        us: "[Moon]",
        code: "/:moon",
        web_code: "/月亮",
        style: "icon_smiley_75"
    }, {
        id: 76,
        cn: "[太阳]",
        hk: "[太陽]",
        us: "[Sun]",
        code: "/:sun",
        web_code: "/太阳",
        style: "icon_smiley_76"
    }, {
        id: 77,
        cn: "[礼物]",
        hk: "[禮物]",
        us: "[Gift]",
        code: "/:gift",
        web_code: "/礼物",
        style: "icon_smiley_77"
    }, {
        id: 78,
        cn: "[拥抱]",
        hk: "[擁抱]",
        us: "[Hug]",
        code: "/:hug",
        web_code: "/拥抱",
        style: "icon_smiley_78"
    }, {
        id: 79,
        cn: "[强]",
        hk: "[強]",
        us: "[ThumbsUp]",
        code: "/:strong",
        web_code: "/强",
        style: "icon_smiley_79"
    }, {
        id: 80,
        cn: "[弱]",
        hk: "[弱]",
        us: "[ThumbsDown]",
        code: "/:weak",
        web_code: "/弱",
        style: "icon_smiley_80"
    }, {
        id: 81,
        cn: "[握手]",
        hk: "[握手]",
        us: "[Shake]",
        code: "/:share",
        web_code: "/握手",
        style: "icon_smiley_81"
    }, {
        id: 82,
        cn: "[胜利]",
        hk: "[勝利]",
        us: "[Peace]",
        code: "/:v",
        web_code: "/胜利",
        style: "icon_smiley_82"
    }, {
        id: 83,
        cn: "[抱拳]",
        hk: "[抱拳]",
        us: "[Fight]",
        code: "/:@)",
        web_code: "/抱拳",
        style: "icon_smiley_83"
    }, {
        id: 84,
        cn: "[勾引]",
        hk: "[勾引]",
        us: "[Beckon]",
        code: "/:jj",
        web_code: "/勾引",
        style: "icon_smiley_84"
    }, {
        id: 85,
        cn: "[拳头]",
        hk: "[拳頭]",
        us: "[Fist]",
        code: "/:@@",
        web_code: "/拳头",
        style: "icon_smiley_85"
    }, {
        id: 86,
        cn: "[差劲]",
        hk: "[差勁]",
        us: "[Pinky]",
        code: "/:bad",
        web_code: "/差劲",
        style: "icon_smiley_86"
    }, {
        id: 87,
        cn: "[爱你]",
        hk: "[愛你]",
        us: "[RockOn]",
        code: "/:lvu",
        web_code: "/爱你",
        style: "icon_smiley_87"
    }, {
        id: 88,
        cn: "[NO]",
        hk: "[NO]",
        us: "[Nuh-uh]",
        code: "/:no",
        web_code: "/NO",
        style: "icon_smiley_88"
    }, {
        id: 89,
        cn: "[OK]",
        hk: "[OK]",
        us: "[OK]",
        code: "/:ok",
        web_code: "/OK",
        style: "icon_smiley_89"
    }, {
        id: 90,
        cn: "[爱情]",
        hk: "[愛情]",
        us: "[InLove]",
        code: "/:love",
        web_code: "/爱情",
        style: "icon_smiley_90"
    }, {
        id: 91,
        cn: "[飞吻]",
        hk: "[飛吻]",
        us: "[Blowkiss]",
        code: "/:<L>",
        web_code: "/飞吻",
        style: "icon_smiley_91"
    }, {
        id: 92,
        cn: "[跳跳]",
        hk: "[跳跳]",
        us: "[Waddle]",
        code: "/:jump",
        web_code: "/跳跳",
        style: "icon_smiley_92"
    }, {
        id: 93,
        cn: "[发抖]",
        hk: "[發抖]",
        us: "[Tremble]",
        code: "/:shake",
        web_code: "/发抖",
        style: "icon_smiley_93"
    }, {
        id: 94,
        cn: "[怄火]",
        hk: "[噴火]",
        us: "[Aaagh!]",
        code: "/:<O>",
        web_code: "/怄火",
        style: "icon_smiley_94"
    }, {
        id: 95,
        cn: "[转圈]",
        hk: "[轉圈]",
        us: "[Twirl]",
        code: "/:circle",
        web_code: "/转圈",
        style: "icon_smiley_95"
    }, {
        id: 96,
        cn: "[磕头]",
        hk: "[磕頭]",
        us: "[Kotow]",
        code: "/:kotow",
        web_code: "/磕头",
        style: "icon_smiley_96"
    }, {
        id: 97,
        cn: "[回头]",
        hk: "[回頭]",
        us: "[Dramatic]",
        code: "/:turn",
        web_code: "/回头",
        style: "icon_smiley_97"
    }, {
        id: 98,
        cn: "[跳绳]",
        hk: "[跳繩]",
        us: "[JumpRope]",
        code: "/:skip",
        web_code: "/跳绳",
        style: "icon_smiley_98"
    }, {
        id: 99,
        cn: "[投降]",
        hk: "[投降]",
        us: "[Surrender]",
        code: "/:oY",
        web_code: "/挥手",
        style: "icon_smiley_99"
    }, {
        id: 100,
        cn: "[激动]",
        hk: "[激動]",
        us: "[Hooray]",
        code: "/:#-0",
        web_code: "/激动",
        style: "icon_smiley_100"
    }, {
        id: 101,
        cn: "[乱舞]",
        hk: "[亂舞]",
        us: "[Meditate]",
        code: "/:hiphot",
        web_code: "/街舞",
        style: "icon_smiley_101"
    }, {
        id: 102,
        cn: "[献吻]",
        hk: "[獻吻]",
        us: "[Smooch]",
        code: "/:kiss",
        web_code: "/献吻",
        style: "icon_smiley_102"
    }, {
        id: 103,
        cn: "[左太极]",
        hk: "[左太極]",
        us: "[TaiChi L]",
        code: "/:<&",
        web_code: "/左太极",
        style: "icon_smiley_103"
    }, {
        id: 104,
        cn: "[右太极]",
        hk: "[右太極]",
        us: "[TaiChi R]",
        code: "/:&>",
        web_code: "/右太极",
        style: "icon_smiley_104"
    }, {
        id: 204,
        cn: "[嘿哈]",
        hk: "[吼嘿]",
        us: "[Hey]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_4"
    }, {
        id: 205,
        cn: "[捂脸]",
        hk: "[掩面]",
        us: "[Facepalm]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_5"
    }, {
        id: 202,
        cn: "[奸笑]",
        hk: "[奸笑]",
        us: "[Smirk]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_2"
    }, {
        id: 206,
        cn: "[机智]",
        hk: "[機智]",
        us: "[Smart]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_6"
    }, {
        id: 212,
        cn: "[皱眉]",
        hk: "[皺眉]",
        us: "[Moue]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_12"
    }, {
        id: 211,
        cn: "[耶]",
        hk: "[歐耶]",
        us: "[Yeah!]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_11"
    }, {
        id: 207,
        cn: "[茶]",
        hk: "[茶]",
        us: "[Tea]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_7"
    }, {
        id: 209,
        cn: "[红包]",
        hk: "[Packet]",
        us: "[Packet]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_9"
    }, {
        id: 210,
        cn: "[蜡烛]",
        hk: "[蠟燭]",
        us: "[Candle]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_10"
    }, {
        id: 215,
        cn: "[福]",
        hk: "[福]",
        us: "[Blessing]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_15"
    }, {
        id: 214,
        cn: "[鸡]",
        hk: "[小雞]",
        us: "[Chick]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_14"
    }, {
        id: 300,
        cn: "[笑脸]",
        emoji: "😄",
        hk: "",
        us: "",
        code: "\\ue415",
        web_code: "",
        style: "icon_emoji_ios_0"
    }, {
        id: 301,
        cn: "[生病]",
        emoji: "😷",
        hk: "",
        us: "",
        code: "\\ue40c",
        web_code: "",
        style: "icon_emoji_ios_1"
    }, {
        id: 302,
        cn: "[破涕为笑]",
        emoji: "😂",
        hk: "",
        us: "",
        code: "\\ue412",
        web_code: "",
        style: "icon_emoji_ios_2"
    }, {
        id: 303,
        cn: "[吐舌]",
        emoji: "😝",
        hk: "",
        us: "",
        code: "\\ue409",
        web_code: "",
        style: "icon_emoji_ios_3"
    }, {
        id: 304,
        cn: "[脸红]",
        emoji: "😳",
        hk: "",
        us: "",
        code: "\\ue40d",
        web_code: "",
        style: "icon_emoji_ios_4"
    }, {
        id: 305,
        cn: "[恐惧]",
        emoji: "😱",
        hk: "",
        us: "",
        code: "\\ue107",
        web_code: "",
        style: "icon_emoji_ios_5"
    }, {
        id: 306,
        cn: "[失望]",
        emoji: "😔",
        hk: "",
        us: "",
        code: "\\ue403",
        web_code: "",
        style: "icon_emoji_ios_6"
    }, {
        id: 307,
        cn: "[无语]",
        emoji: "😒",
        hk: "",
        us: "",
        code: "\\ue40e",
        web_code: "",
        style: "icon_emoji_ios_7"
    }, {
        id: 308,
        cn: "[鬼魂]",
        emoji: "👻",
        hk: "",
        us: "",
        code: "\\ue11b",
        web_code: "",
        style: "icon_emoji_ios_8"
    }, {
        id: 309,
        cn: "[合十]",
        emoji: "🙏",
        hk: "",
        us: "",
        code: "\\ue41d",
        web_code: "",
        style: "icon_emoji_ios_9"
    }, {
        id: 310,
        cn: "[强壮]",
        emoji: "💪",
        hk: "",
        us: "",
        code: "\\ue14c",
        web_code: "",
        style: "icon_emoji_ios_10"
    }, {
        id: 311,
        cn: "[庆祝]",
        emoji: "🎉",
        hk: "",
        us: "",
        code: "\\ue312",
        web_code: "",
        style: "icon_emoji_ios_11"
    }, {
        id: 312,
        cn: "[礼物]",
        emoji: "🎁",
        hk: "",
        us: "",
        code: "\\ue112",
        web_code: "",
        style: "icon_emoji_ios_12"
    }, {
        id: 313,
        cn: "[吃瓜]",
        hk: "[吃西瓜]",
        us: "[Onlooker]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Watermelon"
    }, {
        id: 314,
        cn: "[加油]",
        hk: "[加油]",
        us: "[GoForIt]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Addoil"
    }, {
        id: 315,
        cn: "[汗]",
        hk: "[汗]",
        us: "[Sweats]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Sweat"
    }, {
        id: 316,
        cn: "[天啊]",
        hk: "[天啊]",
        us: "[OMG]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Shocked"
    }, {
        id: 317,
        cn: "[Emm]",
        hk: "[一言難盡]",
        us: "[Emm]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Cold"
    }, {
        id: 318,
        cn: "[社会社会]",
        hk: "[失敬失敬]",
        us: "[Respect]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Social"
    }, {
        id: 319,
        cn: "[旺柴]",
        hk: "[旺柴]",
        us: "[Doge]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Yellowdog"
    }, {
        id: 320,
        cn: "[好的]",
        hk: "[好的]",
        us: "[NoProb]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_NoProb"
    }, {
        id: 321,
        cn: "[打脸]",
        hk: "[打臉]",
        us: "[MyBad]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Slap"
    }, {
        id: 322,
        cn: "[加油加油]",
        hk: "[加油！]",
        us: "[KeepFighting]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_KeepFighting"
    }, {
        id: 323,
        cn: "[哇]",
        hk: "[哇]",
        us: "[Wow]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_Wow"
    }, {
        id: 324,
        cn: "[發]",
        hk: "[發]",
        us: "[Rich]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_16"
    }, {
        id: "17_1",
        cn: "[囧]",
        hk: "[囧]",
        us: "[Blush]",
        code: "",
        web_code: "",
        style: "icon_smiley_17"
    }, {
        id: "39_1",
        cn: "[再见]",
        hk: "[再見]",
        us: "[Bye]",
        code: "",
        web_code: "",
        style: "icon_smiley_39"
    }, {
        id: "83_1",
        cn: "[抱拳]",
        hk: "[抱拳]",
        us: "[Salute]",
        code: "",
        web_code: "",
        style: "icon_smiley_83"
    }, {
        id: "212_1",
        cn: "[皱眉]",
        hk: "[皺眉]",
        us: "[Concerned]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_12"
    }];
}); define("history/profile_history_v2.html.js", [], function () {
    return '<div id="js_profile_history_container">\n    <div class="weui_msg_card_list" id="js_history_list"></div>\n\n    <div class="weui-empty-tips" style="display:none;" id="js_no_data">暂无数据</div>\n\n    <div class="loadmore" id="js_loading">\n        <div class="tips_wrp">\n            <i class="weui-loading"></i>\n            <span class="tips">正在加载</span>\n        </div>\n    </div>\n    <div class="loadmore with_line" style="display:none;" id="js_nomore">\n        <div class="tips_wrp">\n            <span class="tips js_no_more_msg" style="display: none;">已无更多</span>\n            <span class="tips js_need_add_contact" style="display: none;">关注公众帐号，接收更多消息</span>\n        </div>\n    </div>\n</div>\n\n<script type="text/html" id="js_profile_history_tpl">\n{{each list as value idx}}\n    {{if value && value.comm_msg_info}}\n        {{if historyType==\'video\' && value.app_msg_ext_info && value.app_msg_ext_info.vid}} <!-- 直接播放视频 -->\n        <div class="weui_msg_card js_card js_video{{if value.app_msg_ext_info.item_show_type===0}} js_not_jump{{/if}}" msgid="{{value.comm_msg_info.id}}" hrefs="{{value.app_msg_ext_info.content_url}}">\n            <div class="weui_media_box video_card">\n              <div class="weui_media_bd">\n                <h4 class="weui_media_title js_media" data-type="VIDEO">\n                  {{value.app_msg_ext_info.title}}\n                </h4>\n                <div id="WXPLAYABLEVIDEO{{videoLen + idx}}" class="js_playable wx_video_wrp" style="height:{{playableVideoHeight}}px;position: relative;"></div>\n                <p class="weui_media_extra_info">\n                    {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}\n                    {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}} \n                    {{if value.app_msg_ext_info.item_show_type===0}}<a class="weui-media__readmore js_go_appmsg" href="javascript:;" data-href="{{value.app_msg_ext_info.content_url}}">阅读来源文章</a>{{/if}}\n                </p>\n              </div>\n            </div>\n        </div>\n        {{else if historyType==\'video\' && value.app_msg_ext_info && value.comm_msg_info && value.app_msg_ext_info.content_url && value.app_msg_ext_info.title && value.app_msg_ext_info.cover && value.app_msg_ext_info.del_flag!=4}} <!-- 视屏筛选，无法直接播放的卡片视频样式 -->\n        <div class="weui_msg_card js_card js_video" msgid="{{value.comm_msg_info.id}}" hrefs="{{value.app_msg_ext_info.content_url}}">\n            <div class="weui_media_box video_card js_media" data-type="VIDEO">\n              <div class="weui_media_bd">\n                <h4 class="weui_media_title">\n                  {{value.app_msg_ext_info.title}}\n                </h4>\n                <div class="video_cover" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover}});height:{{playableVideoHeight}}px;"></div>\n                {{if value.comm_msg_info.datetime}}\n                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                {{/if}}\n              </div>\n            </div>\n        </div>\n        {{else if historyType==\'video\' && value.app_msg_ext_info && value.app_msg_ext_info.del_flag==4}}\n        <div class="weui_msg_card" style="display: none">\n            <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box video_card js_appmsg media_del" hrefs="{{value.app_msg_ext_info.content_url}}">\n                <div class="weui_media_bd js_media" data-type="APPMSG">\n                    <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">内容违规已被删除</h4>\n                    <p class="weui_media_desc"></p>\n                    <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==1}}    <!-- 文字 -->\n        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div class="weui_media_box text js_appmsg">\n                    <div class="weui_media_bd js_media" data-type="TEXT">\n                        <div>\n                            {{handleTextEmoji value.comm_msg_info.content}}\n                        </div>\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==3}}    <!-- 图片 -->\n        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box img js_appmsg">\n                    <div class="weui_media_bd js_media" data-type="IMG">\n                      {{if value.image_msg_ext_info && value.image_msg_ext_info.cdn_url}}\n                      <img src="{{handleCdnImg value.image_msg_ext_info.cdn_url}}" data-msgid="{{value.comm_msg_info.id}}" data-s="640" data-cdnsrc="{{handleCdnImg value.image_msg_ext_info.cdn_url}}">\n                      {{else}}\n                      <img src="https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect" data-msgid="{{value.comm_msg_info.id}}" data-s="640">\n                      {{/if}}\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==34}}    <!-- 语音 -->\n        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg">\n                    <div class="weui_media_hd js_icon js_media" data-type="AUDIO">\n                        <audio fileid="{{value.voice_msg_ext_info.fileid}}" preload data-time=\'{{value.voice_msg_ext_info.play_length}}\' src="/mp/getmediadata?__biz={{biz}}&type=voice&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}">\n                            not support</audio>\n                    </div>\n                    <div class="weui_media_bd js_media" data-type="AUDIO">\n                        <h4 class="weui_media_title">\n                            {{if !value.voice_msg_ext_info.title}}\n                                语音                            {{else}}\n                                {{value.voice_msg_ext_info.title}}\n                            {{/if}}\n                        </h4>\n                        <p class="weui_media_desc"></p>\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==49}}\n        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                {{if value.app_msg_ext_info.subtype == 9}} <!-- 图文 -->\n                    {{if value.app_msg_ext_info.del_flag == 4}} <!-- 2-用户删除未群发素材 3-用户删除已群发文章 4-运营删除 -->\n                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg media_del" hrefs="{{value.app_msg_ext_info.content_url}}" style="display: none">\n                        <span class="weui_media_hd js_media" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="APPMSG"></span>\n                        <div class="weui_media_bd js_media" data-type="APPMSG">\n                            <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">内容违规已被删除</h4>\n                            <p class="weui_media_desc"></p>\n                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                        </div>\n                    </div>\n                    {{else}}\n                        {{if value.app_msg_ext_info.item_show_type == 5}} <!-- 视频分享页 -->\n                        <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_video {{if (!value.app_msg_ext_info.malicious_title_reason_id || value.app_msg_ext_info.malicious_content_type == 1)}}video_msg{{/if}}" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="5">\n                            {{if value.app_msg_ext_info.cover}}\n                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="VIDEO"></span>\n                            {{/if}}\n                            <div class="weui_media_bd js_media" data-type="VIDEO">\n                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">\n                                {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}\n                                {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}\n                                </h4>\n                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                            </div>\n                        </div>\n                        {{else if value.app_msg_ext_info.item_show_type == 7}} <!-- 语音分享页 -->\n                        <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg {{if value.app_msg_ext_info.malicious_title_reason_id != 1 && value.app_msg_ext_info.malicious_title_reason_id}}media_warn{{/if}}" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="7">\n                            <div class="weui_media_hd js_icon js_media" data-type="AUDIO">\n                                {{if !value.app_msg_ext_info.malicious_title_reason_id || value.app_msg_ext_info.malicious_title_reason_id <= 0}}\n                                <audio fileid="{{value.app_msg_ext_info.audio_fileid}}" preload data-time=\'{{value.app_msg_ext_info.duration}}\' src="{{value.app_msg_ext_info.play_url}}">\n                                    not support</audio>\n                                {{/if}}\n                            </div>\n                            <div class="weui_media_bd js_media" data-type="AUDIO">\n                                <h4 class="weui_media_title">\n                                {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}</h4>\n                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                            </div>\n                        </div>\n                        {{else if value.app_msg_ext_info.item_show_type == 8}} <!-- 图片分享页 -->\n                        <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box appmsg img js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="8">\n                            {{if value.app_msg_ext_info.cover}}\n                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" data-type="IMG">\n                            {{else}}\n                            <span class="weui_media_hd js_media" style="background-image:url(https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect)" data-s="640" data-type="IMG">\n                            {{/if}}\n                            </span>\n                            <div class="weui_media_bd js_media" data-type="IMG">\n                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">\n                                    {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}\n                                </h4>\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                            </div>\n                        </div>\n                        {{else if value.app_msg_ext_info.item_show_type == 10}} <!-- 文字分享页 -->\n                        <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box text js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="10">\n                            <div class="weui_media_bd js_media" data-type="TEXT">\n                              <div class="weui_media_text">\n                                {{handleTextEmoji value.app_msg_ext_info.title value.app_msg_ext_info.item_show_type}}\n                              </div>\n                            </div>\n                            <div class="weui_media_ft js_media" data-type="TEXT">\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                            </div>\n                        </div>\n                        {{else}} <!-- 普通图文 -->\n                        <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="0">\n                            {{if value.app_msg_ext_info.cover}}\n                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="APPMSG">\n                            </span>\n                            {{/if}}\n                            <div class="weui_media_bd js_media" data-type="APPMSG">\n                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">\n                                {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}\n                                {{if value.app_msg_ext_info.title}}\n                                    {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}\n                                {{else}}\n                                    {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy/MM/dd\'}}\n                                {{/if}}\n                                </h4>\n                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                            </div>\n                        </div>\n                        {{/if}}\n                    {{/if}}\n                {{else if value.app_msg_ext_info.subtype == 16}} <!-- 视频 -->\n                <div id="WXVIDEO{{value.comm_msg_info.id}}" class="weui_media_box video js_video" hrefs="{{value.app_msg_ext_info.content_url}}">\n                    <div class="weui_media_hd js_media" data-type="VIDEO">\n                        <span class="video_cover" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover}});height:{{height}}px;"></span>\n                        <div class="video_switch">\n                            {{if value.app_msg_ext_info.duration}}\n                            <span class="video_time_info">{{handleVideoTime value.app_msg_ext_info.duration}}</span>\n                            {{/if}}\n                        </div>\n                    </div>\n                    <div class="weui_media_bd js_media" data-type="VIDEO">\n                        <p class="weui_media_title">{{value.app_msg_ext_info.title}}</p>\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n                {{/if}}\n\n                {{each value.app_msg_ext_info.multi_app_msg_item_list as subvalue subkey}}\n                {{if subvalue.del_flag == 4}}\n                <div class="weui_media_box appmsg js_appmsg media_del" hrefs="{{subvalue.content_url}}" style="display: none">\n                    <span class="weui_media_hd js_media" data-type="APPMSG"></span>\n                    <div class="weui_media_bd js_media" data-type="APPMSG">\n                        <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">内容违规已被删除</h4>\n                        <p class="weui_media_desc"></p>\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n                {{else}}\n\n                    {{if subvalue.item_show_type == 5}} <!-- 视频分享页 -->\n                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_video {{if (!subvalue.malicious_title_reason_id || subvalue.malicious_content_type == 1)}}video_msg{{/if}}" hrefs="{{subvalue.content_url}}" data-t="5">\n                        {{if subvalue.cover}}\n                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" hrefs="{{subvalue.content_url}}" data-type="VIDEO"></span>\n                        {{/if}}\n                        <div class="weui_media_bd js_media" data-type="VIDEO">\n                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">\n                            {{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}\n                            {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}\n                            </h4>\n                            <p class="weui_media_desc">{{=subvalue.digest}}</p>\n                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                        </div>\n                    </div>\n                    {{else if subvalue.item_show_type == 7}} <!-- 语音分享页 -->\n                    <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg {{if subvalue.malicious_title_reason_id != 1 && subvalue.malicious_title_reason_id}}media_warn{{/if}}" hrefs="{{subvalue.content_url}}" data-t="7">\n                            <div class="weui_media_hd js_icon js_media" data-type="AUDIO">\n                                {{if !subvalue.malicious_title_reason_id || subvalue.malicious_title_reason_id <= 0}}\n                                <audio fileid="{{subvalue.audio_fileid}}" preload data-time=\'{{subvalue.duration}}\' src="{{subvalue.play_url}}">\n                                    not support</audio>\n                                {{/if}}\n                            </div>\n                            <div class="weui_media_bd js_media" data-type="AUDIO">\n                                <h4 class="weui_media_title">{{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}</h4>\n                                <p class="weui_media_desc">{{=subvalue.digest}}</p>\n                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                            </div>\n                    </div>\n                    {{else if subvalue.item_show_type == 8}} <!-- 图片分享页 -->\n                    <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box appmsg img js_appmsg" hrefs="{{subvalue.content_url}}" data-t="8">\n                        {{if subvalue.cover}}\n                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" data-type="IMG">\n                        {{else}}\n                        <span class="weui_media_hd js_media" style="background-image:url(https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect)" data-s="640" data-type="IMG">\n                        {{/if}}\n                        </span>\n                        <div class="weui_media_bd js_media" data-type="IMG">\n                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">\n                              {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}\n                            </h4>\n                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                        </div>\n                    </div>\n                    {{else if subvalue.item_show_type == 10}} <!-- 文字分享页 -->\n                    <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box text js_appmsg" hrefs="{{subvalue.content_url}}" data-t="10">\n                        <div class="weui_media_bd js_media" data-type="TEXT">\n                          <div class="weui_media_text">\n                            {{handleTextEmoji subvalue.title subvalue.item_show_type}}\n                          </div>\n                        </div>\n                        <div class="weui_media_ft js_media" data-type="TEXT">\n                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                        </div>\n                    </div>\n                    {{else}} <!-- 普通图文 -->\n                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg" hrefs="{{subvalue.content_url}}" data-t="0">\n                        {{if subvalue.cover}}\n                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" hrefs="{{subvalue.content_url}}" data-type="APPMSG">\n                        </span>\n                        {{/if}}\n                        <div class="weui_media_bd js_media" data-type="APPMSG">\n                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">\n                            {{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}\n                            {{if subvalue.title}}\n                                {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}\n                            {{else}}\n                                {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy/MM/dd\'}}\n                            {{/if}}\n                            </h4>\n                            <p class="weui_media_desc">{{=subvalue.digest}}</p>\n                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p> \n                        </div>\n                    </div>\n                    {{/if}}\n\n                {{/if}}\n                {{/each}}\n            </div>\n        </div>\n        {{/if}}\n    {{/if}}\n{{/each}}\n</script>\n';
}); define("biz_common/utils/string/html.js", [], function () {
    "use strict";
    return String.prototype.html = function (t) {
        var e, n = ["&#96;", "`", "&#39;", "'", "&quot;", '"', "&nbsp;", " ", "&gt;", ">", "&lt;", "<", "&yen;", "¥", "&amp;", "&"], r = ["&", "&amp;", "¥", "&yen;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;", "`", "&#96;"];
        e = t ? r : n;
        for (var o = 0, i = this; o < e.length; o += 2)i = i.replace(new RegExp(e[o], "g"), e[o + 1]);
        return i;
    }, String.prototype.htmlEncode = function () {
        return this.html(!0);
    }, String.prototype.htmlDecode = function () {
        return this.html(!1);
    }, String.prototype.getPureText = function () {
        return this.replace(/<\/?[^>]*\/?>/g, "");
    }, String.prototype.htmlLite = function (t) {
        var e = ["&#96;", "`", "&#39;", "'", "&quot;", '"', "&gt;", ">", "&lt;", "<", "&amp;", "&"];
        t && e.reverse();
        for (var n = 0, r = this; n < e.length; n += 2)r = r.replace(new RegExp(e[n], "g"), e[n + 1]);
        return r;
    }, String.prototype.htmlEncodeLite = function () {
        return this.htmlLite(!0);
    }, String.prototype.htmlDecodeLite = function () {
        return this.htmlLite(!1);
    }, {
        htmlDecode: function (t) {
            return t.htmlDecode();
        },
        htmlEncode: function (t) {
            return t.htmlEncode();
        },
        getPureText: function (t) {
            return t.getPureText();
        },
        htmlEncodeLite: function (t) {
            return t.htmlEncodeLite();
        },
        htmlDecodeLite: function (t) {
            return t.htmlDecodeLite();
        }
    };
}); define("appmsg/cdn_img_lib.js", [], function () {
    "use strict";
    function t(t) {
        return !!(t.match(/\:\/\/[^\/]+\/mmbiz\//) && t.indexOf("wx_fmt=gif") > -1) || !!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//) && -1 == t.indexOf("/s640");
    }
    function i(t) {
        return !!(t.match(/\:\/\/[^\/]+\/mmbiz\//) && t.indexOf("wx_fmt=png") > -1) || !!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
    }
    function n(t) {
        return !!(t.match(/\:\/\/[^\/]+\/mmbiz\//) && t.indexOf("wx_fmt=jpg") > -1) || !!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
    }
    function r(t) {
        return t.indexOf("tp=webp") > -1;
    }
    function e(t) {
        return t.indexOf("tp=wxpic") > -1;
    }
    String.prototype.http2https = function () {
        return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g, "https://mmbiz.qpic.cn/");
    }, String.prototype.https2http = function () {
        var t = this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g, "http://mmbiz.qpic.cn/");
        return t = t.replace(/https:\/\/mmbiz\.qpic\.cn\//g, "http://mmbiz.qpic.cn/");
    }, String.prototype.isCDN = function () {
        return 0 == this.indexOf("http://mmbiz.qpic.cn/") || 0 == this.indexOf("https://mmbiz.qpic.cn/") || 0 == this.indexOf("https://mmbiz.qlogo.cn/") || 0 == this.indexOf("http://res.wx.qq.com/") || 0 == this.indexOf("https://res.wx.qq.com/");
    }, String.prototype.nogif = function () {
        var i = this.toString();
        return t(i) ? i.replace(/\/\d+\?/g, "/s640?").replace(/\/\d+\//g, "/s640/").replace(/\/\d+\./g, "/s640.").replace("wx_fmt=gif", "") : i;
    }, String.prototype.isGif = function () {
        var i = this.toString();
        return t(i);
    }, String.prototype.isWxpic = function () {
        var t = this.toString();
        return e(t);
    }, String.prototype.isWebp = function () {
        var t = this.toString();
        return r(t);
    }, String.prototype.canHevc = function () {
        var r = this.toString();
        return n(r) || i(r) || t(r);
    }, String.prototype.getImgType = function () {
        var p = this.toString();
        return t(p) ? "gif" : r(p) ? "webp" : e(p) ? "wxpic" : i(p) ? "png" : n(p) ? "jpg" : "unknow";
    }, String.prototype.getOriginImgType = function () {
        var r = this.toString();
        return t(r) ? "gif" : i(r) ? "png" : n(r) ? "jpg" : "unknow";
    }, String.prototype.imgChange640 = function () {
        var t = this.toString();
        t = t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g, "");
        var i = new Date;
        return i.setFullYear(2014, 9, 1), t.isCDN() && 1e3 * ct >= i.getTime() && !t.isGif() && (t = t.replace(/\/0$/, "/640"),
            t = t.replace(/\/0\?/, "/640?"), t = t.replace(/\/0\./, "/640.")), t;
    };
}); define("pages/video_communicate_adaptor.js", ["pages/player_tips.js"], function (t) {
    "use strict";
    function e() {
        window.addEventListener("message", i, !1), p();
    }
    function i(t) {
        var e;
        if (t.origin ? e = t.origin : t.originalEvent && (e = t.originalEvent.origin), /^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e) && t.source) {
            var i = t.data;
            if (i && i.type) {
                if (!/^mpvideo_/.test(i.type)) return;
                var o = i.type.replace(/^mpvideo_/, "");
                /^broadcast_/.test(o) ? u.postMessageEvt.broadcast({
                    data: i.data,
                    type: o
                }) : u.postMessageEvt[o] && u.postMessageEvt[o](i.data);
            }
        }
    }
    function o(t) {
        var e = t.type.replace(/^broadcast_/, ""), i = d();
        if (i.length > 0) for (var o = 0, a = i.length; a > o; o++) {
            var r = i[o];
            n({
                win: r.contentWindow,
                type: e,
                data: t.data
            });
        }
        n({
            win: window,
            type: e,
            data: t.data
        });
    }
    function n(t) {
        var e = t.type;
        /^mpvideo_/.test(e) || (e = "mpvideo_" + e);
        var i = {
            data: t.data,
            type: e
        };
        t.win.postMessage(i, document.location.protocol + "//mp.weixin.qq.com");
    }
    function a() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        t.msg && new f({
            msg: t.msg
        });
    }
    function r(t) {
        for (var e = d({
            vid: t.vid
        }), i = 0, o = e.length; o > i; i++) {
            var a = e[i];
            a.style.display = "";
            var r = a.parentNode, s = r.querySelectorAll('.js_img_loading[data-vid="' + t.vid + '"]');
            if (s && s.length > 0) for (var i = 0, o = s.length; o > i; i++)r.removeChild(s[i]);
            n({
                type: "afterRemoveLoading",
                win: a.contentWindow
            });
        }
    }
    function d(t) {
        t = t || {};
        for (var e = document.getElementsByTagName("iframe"), i = [], o = 0, n = e.length; n > o; o++) {
            var a = e[o], r = a.getAttribute("src");
            if (window.__second_open__ && (r = a.getAttribute("data-realsrc")), r && -1 != r.indexOf("/mp/videoplayer")) {
                if ("undefined" != typeof t.vid) {
                    var d = r.match(/[\?&]vid\=([^&]*)/);
                    if (!d || !d[1] || d[1] != t.vid) continue;
                }
                i.push(a);
            }
        }
        return i;
    }
    function s(t) {
        if (t.height) {
            var e = d({
                vid: t.vid
            });
            if (0 != e.length) {
                var i = e[0], o = i.offsetHeight + 1 * t.height;
                i.setAttribute("height", o), i.setAttribute("data-additionalheight", t.height), i.style.setProperty && i.style.setProperty("height", o + "px", "important");
            }
        }
    }
    function v(t) {
        u.videoInfo[t.vid] || (u.videoInfo[t.vid] = {}), u.videoInfo[t.vid].ori_status = t.ori_status,
            u.videoInfo[t.vid].hit_bizuin = t.hit_bizuin, u.videoInfo[t.vid].hit_vid = t.hit_vid;
    }
    function p() {
        "function" == typeof window.__getVideoWh && window.addEventListener("resize", function () {
            for (var t = d(), e = 0, i = t.length; i > e; e++) {
                var o = t[e];
                setTimeout(function (t) {
                    return function () {
                        var e = window.__getVideoWh(t), i = e.w, o = e.h, n = 1 * t.getAttribute("data-additionalheight");
                        n && (o += n), t.setAttribute("width", i), t.setAttribute("height", o), t.style.setProperty && (t.style.setProperty("width", i + "px", "important"),
                            t.style.setProperty("height", o + "px", "important"));
                    };
                }(o), 50);
            }
        }, !1);
    }
    function g() {
        return u.videoInfo;
    }
    var f = t("pages/player_tips.js"), u = {
        videoInfo: {},
        postMessageEvt: {
            broadcast: o,
            removeVideoLoading: r,
            addVideoIframeHeight: s,
            videoInited: v,
            showTips: a
        }
    };
    return e(), {
        getVideoInfo: g
    };
}); define("biz_wap/zepto/zepto.js", [], function () {
    "use strict";
    var t = function () {
        function t(t) {
            return null == t ? String(t) : J[W.call(t)] || "object";
        }
        function n(n) {
            return "function" == t(n);
        }
        function e(t) {
            return null != t && t == t.window;
        }
        function i(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE;
        }
        function r(n) {
            return "object" == t(n);
        }
        function o(t) {
            return r(t) && !e(t) && Object.getPrototypeOf(t) == Object.prototype;
        }
        function s(t) {
            return t instanceof Array;
        }
        function u(t) {
            return "number" == typeof t.length;
        }
        function c(t) {
            return P.call(t, function (t) {
                return null != t;
            });
        }
        function a(t) {
            return t.length > 0 ? C.fn.concat.apply([], t) : t;
        }
        function l(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        function f(t) {
            return t in M ? M[t] : M[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
        }
        function h(t, n) {
            return "number" != typeof n || z[l(t)] ? n : n + "px";
        }
        function p(t) {
            var n, e;
            return j[t] || (n = L.createElement(t), L.body.appendChild(n), e = getComputedStyle(n, "").getPropertyValue("display"),
                n.parentNode.removeChild(n), "none" == e && (e = "block"), j[t] = e), j[t];
        }
        function d(t) {
            return "children" in t ? $.call(t.children) : C.map(t.childNodes, function (t) {
                return 1 == t.nodeType ? t : void 0;
            });
        }
        function g(t, n, e) {
            for (E in n) e && (o(n[E]) || s(n[E])) ? (o(n[E]) && !o(t[E]) && (t[E] = {}), s(n[E]) && !s(t[E]) && (t[E] = []),
                g(t[E], n[E], e)) : n[E] !== x && (t[E] = n[E]);
        }
        function m(t, n) {
            return null == n ? C(t) : C(t).filter(n);
        }
        function v(t, e, i, r) {
            return n(e) ? e.call(t, i, r) : e;
        }
        function y(t, n, e) {
            null == e ? t.removeAttribute(n) : t.setAttribute(n, e);
        }
        function b(t, n) {
            var e = t.className, i = e && e.baseVal !== x;
            return n === x ? i ? e.baseVal : e : void (i ? e.baseVal = n : t.className = n);
        }
        function w(t) {
            var n;
            try {
                return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(n = Number(t)) ? /^[\[\{]/.test(t) ? C.parseJSON(t) : t : n) : t;
            } catch (e) {
                return t;
            }
        }
        function N(t, n) {
            n(t);
            for (var e in t.childNodes) N(t.childNodes[e], n);
        }
        var x, E, C, O, T, S, A = [], $ = A.slice, P = A.filter, L = window.document, j = {}, M = {}, z = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, Z = /^\s*<(\w+|!)[^>]*>/, q = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, B = /^(?:body|html)$/i, R = /([A-Z])/g, V = ["val", "css", "html", "text", "data", "width", "height", "offset"], F = ["after", "prepend", "before", "append"], H = L.createElement("table"), I = L.createElement("tr"), U = {
            tr: L.createElement("tbody"),
            tbody: H,
            thead: H,
            tfoot: H,
            td: I,
            th: I,
            "*": L.createElement("div")
        }, _ = /complete|loaded|interactive/, D = /^[\w-]*$/, J = {}, W = J.toString, X = {}, Y = L.createElement("div"), G = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        };
        X.matches = function (t, n) {
            if (!n || !t || 1 !== t.nodeType) return !1;
            var e = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (e) return e.call(t, n);
            var i, r = t.parentNode, o = !r;
            return o && (r = Y).appendChild(t), i = ~X.qsa(r, n).indexOf(t), o && Y.removeChild(t), i;
        }, T = function (t) {
            return t.replace(/-+(.)?/g, function (t, n) {
                return n ? n.toUpperCase() : "";
            });
        }, S = function (t) {
            return P.call(t, function (n, e) {
                return t.indexOf(n) == e;
            });
        }, X.fragment = function (t, n, e) {
            var i, r, s;
            return q.test(t) && (i = C(L.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(k, "<$1></$2>")),
                n === x && (n = Z.test(t) && RegExp.$1), n in U || (n = "*"), s = U[n], s.innerHTML = "" + t, i = C.each($.call(s.childNodes), function () {
                    s.removeChild(this);
                })), o(e) && (r = C(i), C.each(e, function (t, n) {
                    V.indexOf(t) > -1 ? r[t](n) : r.attr(t, n);
                })), i;
        }, X.Z = function (t, n) {
            t = t || [];
            for (var e in C.fn) t[e] = C.fn[e];
            return t.selector = n || "", t;
        }, X.isZ = function (t) {
            return t instanceof X.Z;
        }, X.init = function (t, e) {
            var i;
            if (!t) return X.Z();
            if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && Z.test(t)) i = X.fragment(t, RegExp.$1, e),
                t = null; else {
                if (e !== x) return C(e).find(t);
                i = X.qsa(L, t);
            } else {
                if (n(t)) return C(L).ready(t);
                if (X.isZ(t)) return t;
                if (s(t)) i = c(t); else if (r(t)) i = [t], t = null; else if (Z.test(t)) i = X.fragment(t.trim(), RegExp.$1, e),
                    t = null; else {
                    if (e !== x) return C(e).find(t);
                    i = X.qsa(L, t);
                }
            }
            return X.Z(i, t);
        }, C = function (t, n) {
            return X.init(t, n);
        }, C.extend = function (t) {
            var n, e = $.call(arguments, 1);
            return "boolean" == typeof t && (n = t, t = e.shift()), e.forEach(function (e) {
                g(t, e, n);
            }), t;
        }, X.qsa = function (t, n) {
            var e, r = "#" == n[0], o = !r && "." == n[0], s = r || o ? n.slice(1) : n, u = D.test(s);
            return i(t) && u && r ? (e = t.getElementById(s)) ? [e] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : $.call(u && !r ? o ? t.getElementsByClassName(s) : t.getElementsByTagName(n) : t.querySelectorAll(n));
        }, C.contains = function (t, n) {
            return t !== n && t.contains(n);
        }, C.type = t, C.isFunction = n, C.isWindow = e, C.isArray = s, C.isPlainObject = o, C.isEmptyObject = function (t) {
            var n;
            for (n in t) return !1;
            return !0;
        }, C.inArray = function (t, n, e) {
            return A.indexOf.call(n, t, e);
        }, C.camelCase = T, C.trim = function (t) {
            return null == t ? "" : String.prototype.trim.call(t);
        }, C.uuid = 0, C.support = {}, C.expr = {}, C.map = function (t, n) {
            var e, i, r, o = [];
            if (u(t)) for (i = 0; i < t.length; i++)e = n(t[i], i), null != e && o.push(e); else for (r in t) e = n(t[r], r),
                null != e && o.push(e);
            return a(o);
        }, C.each = function (t, n) {
            var e, i;
            if (u(t)) {
                for (e = 0; e < t.length; e++)if (n.call(t[e], e, t[e]) === !1) return t;
            } else for (i in t) if (n.call(t[i], i, t[i]) === !1) return t;
            return t;
        }, C.grep = function (t, n) {
            return P.call(t, n);
        }, window.JSON && (C.parseJSON = JSON.parse), C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, n) {
            J["[object " + n + "]"] = n.toLowerCase();
        }), C.fn = {
            forEach: A.forEach,
            reduce: A.reduce,
            push: A.push,
            sort: A.sort,
            indexOf: A.indexOf,
            concat: A.concat,
            map: function (t) {
                return C(C.map(this, function (n, e) {
                    return t.call(n, e, n);
                }));
            },
            slice: function () {
                return C($.apply(this, arguments));
            },
            ready: function (t) {
                return _.test(L.readyState) && L.body ? t(C) : L.addEventListener("DOMContentLoaded", function () {
                    t(C);
                }, !1), this;
            },
            get: function (t) {
                return t === x ? $.call(this) : this[t >= 0 ? t : t + this.length];
            },
            toArray: function () {
                return this.get();
            },
            size: function () {
                return this.length;
            },
            remove: function () {
                return this.each(function () {
                    null != this.parentNode && this.parentNode.removeChild(this);
                });
            },
            each: function (t) {
                return A.every.call(this, function (n, e) {
                    return t.call(n, e, n) !== !1;
                }), this;
            },
            filter: function (t) {
                return n(t) ? this.not(this.not(t)) : C(P.call(this, function (n) {
                    return X.matches(n, t);
                }));
            },
            add: function (t, n) {
                return C(S(this.concat(C(t, n))));
            },
            is: function (t) {
                return this.length > 0 && X.matches(this[0], t);
            },
            not: function (t) {
                var e = [];
                if (n(t) && t.call !== x) this.each(function (n) {
                    t.call(this, n) || e.push(this);
                }); else {
                    var i = "string" == typeof t ? this.filter(t) : u(t) && n(t.item) ? $.call(t) : C(t);
                    this.forEach(function (t) {
                        i.indexOf(t) < 0 && e.push(t);
                    });
                }
                return C(e);
            },
            has: function (t) {
                return this.filter(function () {
                    return r(t) ? C.contains(this, t) : C(this).find(t).size();
                });
            },
            eq: function (t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
            },
            first: function () {
                var t = this[0];
                return t && !r(t) ? t : C(t);
            },
            last: function () {
                var t = this[this.length - 1];
                return t && !r(t) ? t : C(t);
            },
            find: function (t) {
                var n, e = this;
                return n = "object" == typeof t ? C(t).filter(function () {
                    var t = this;
                    return A.some.call(e, function (n) {
                        return C.contains(n, t);
                    });
                }) : 1 == this.length ? C(X.qsa(this[0], t)) : this.map(function () {
                    return X.qsa(this, t);
                });
            },
            closest: function (t, n) {
                var e = this[0], r = !1;
                for ("object" == typeof t && (r = C(t)); e && !(r ? r.indexOf(e) >= 0 : X.matches(e, t));)e = e !== n && !i(e) && e.parentNode;
                return C(e);
            },
            parents: function (t) {
                for (var n = [], e = this; e.length > 0;)e = C.map(e, function (t) {
                    return (t = t.parentNode) && !i(t) && n.indexOf(t) < 0 ? (n.push(t), t) : void 0;
                });
                return m(n, t);
            },
            parent: function (t) {
                return m(S(this.pluck("parentNode")), t);
            },
            children: function (t) {
                return m(this.map(function () {
                    return d(this);
                }), t);
            },
            contents: function () {
                return this.map(function () {
                    return $.call(this.childNodes);
                });
            },
            siblings: function (t) {
                return m(this.map(function (t, n) {
                    return P.call(d(n.parentNode), function (t) {
                        return t !== n;
                    });
                }), t);
            },
            empty: function () {
                return this.each(function () {
                    this.innerHTML = "";
                });
            },
            pluck: function (t) {
                return C.map(this, function (n) {
                    return n[t];
                });
            },
            show: function () {
                return this.each(function () {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName));
                });
            },
            replaceWith: function (t) {
                return this.before(t).remove();
            },
            wrap: function (t) {
                var e = n(t);
                if (this[0] && !e) var i = C(t).get(0), r = i.parentNode || this.length > 1;
                return this.each(function (n) {
                    C(this).wrapAll(e ? t.call(this, n) : r ? i.cloneNode(!0) : i);
                });
            },
            wrapAll: function (t) {
                if (this[0]) {
                    C(this[0]).before(t = C(t));
                    for (var n; (n = t.children()).length;)t = n.first();
                    C(t).append(this);
                }
                return this;
            },
            wrapInner: function (t) {
                var e = n(t);
                return this.each(function (n) {
                    var i = C(this), r = i.contents(), o = e ? t.call(this, n) : t;
                    r.length ? r.wrapAll(o) : i.append(o);
                });
            },
            unwrap: function () {
                return this.parent().each(function () {
                    C(this).replaceWith(C(this).children());
                }), this;
            },
            clone: function () {
                return this.map(function () {
                    return this.cloneNode(!0);
                });
            },
            hide: function () {
                return this.css("display", "none");
            },
            toggle: function (t) {
                return this.each(function () {
                    var n = C(this);
                    (t === x ? "none" == n.css("display") : t) ? n.show() : n.hide();
                });
            },
            prev: function (t) {
                return C(this.pluck("previousElementSibling")).filter(t || "*");
            },
            next: function (t) {
                return C(this.pluck("nextElementSibling")).filter(t || "*");
            },
            html: function (t) {
                return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (n) {
                    var e = this.innerHTML;
                    C(this).empty().append(v(this, t, n, e));
                });
            },
            text: function (t) {
                return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
                    this.textContent = t === x ? "" : "" + t;
                });
            },
            attr: function (t, n) {
                var e;
                return "string" == typeof t && n === x ? 0 == this.length || 1 !== this[0].nodeType ? x : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(e = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : e : this.each(function (e) {
                    if (1 === this.nodeType) if (r(t)) for (E in t) y(this, E, t[E]); else y(this, t, v(this, n, e, this.getAttribute(t)));
                });
            },
            removeAttr: function (t) {
                return this.each(function () {
                    1 === this.nodeType && y(this, t);
                });
            },
            prop: function (t, n) {
                return t = G[t] || t, n === x ? this[0] && this[0][t] : this.each(function (e) {
                    this[t] = v(this, n, e, this[t]);
                });
            },
            data: function (t, n) {
                var e = this.attr("data-" + t.replace(R, "-$1").toLowerCase(), n);
                return null !== e ? w(e) : x;
            },
            val: function (t) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? C(this[0]).find("option").filter(function () {
                    return this.selected;
                }).pluck("value") : this[0].value) : this.each(function (n) {
                    this.value = v(this, t, n, this.value);
                });
            },
            offset: function (t) {
                if (t) return this.each(function (n) {
                    var e = C(this), i = v(this, t, n, e.offset()), r = e.offsetParent().offset(), o = {
                        top: i.top - r.top,
                        left: i.left - r.left
                    };
                    "static" == e.css("position") && (o.position = "relative"), e.css(o);
                });
                if (0 == this.length) return null;
                var n = this[0].getBoundingClientRect();
                return {
                    left: n.left + window.pageXOffset,
                    top: n.top + window.pageYOffset,
                    width: Math.round(n.width),
                    height: Math.round(n.height)
                };
            },
            css: function (n, e) {
                if (arguments.length < 2) {
                    var i = this[0], r = getComputedStyle(i, "");
                    if (!i) return;
                    if ("string" == typeof n) return i.style[T(n)] || r.getPropertyValue(n);
                    if (s(n)) {
                        var o = {};
                        return C.each(s(n) ? n : [n], function (t, n) {
                            o[n] = i.style[T(n)] || r.getPropertyValue(n);
                        }), o;
                    }
                }
                var u = "";
                if ("string" == t(n)) e || 0 === e ? u = l(n) + ":" + h(n, e) : this.each(function () {
                    this.style.removeProperty(l(n));
                }); else for (E in n) n[E] || 0 === n[E] ? u += l(E) + ":" + h(E, n[E]) + ";" : this.each(function () {
                    this.style.removeProperty(l(E));
                });
                return this.each(function () {
                    this.style.cssText += ";" + u;
                });
            },
            index: function (t) {
                return t ? this.indexOf(C(t)[0]) : this.parent().children().indexOf(this[0]);
            },
            hasClass: function (t) {
                return t ? A.some.call(this, function (t) {
                    return this.test(b(t));
                }, f(t)) : !1;
            },
            addClass: function (t) {
                return t ? this.each(function (n) {
                    O = [];
                    var e = b(this), i = v(this, t, n, e);
                    i.split(/\s+/g).forEach(function (t) {
                        C(this).hasClass(t) || O.push(t);
                    }, this), O.length && b(this, e + (e ? " " : "") + O.join(" "));
                }) : this;
            },
            removeClass: function (t) {
                return this.each(function (n) {
                    return t === x ? b(this, "") : (O = b(this), v(this, t, n, O).split(/\s+/g).forEach(function (t) {
                        O = O.replace(f(t), " ");
                    }), void b(this, O.trim()));
                });
            },
            toggleClass: function (t, n) {
                return t ? this.each(function (e) {
                    var i = C(this), r = v(this, t, e, b(this));
                    r.split(/\s+/g).forEach(function (t) {
                        (n === x ? !i.hasClass(t) : n) ? i.addClass(t) : i.removeClass(t);
                    });
                }) : this;
            },
            scrollTop: function (t) {
                if (this.length) {
                    var n = "scrollTop" in this[0];
                    return t === x ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
                        this.scrollTop = t;
                    } : function () {
                        this.scrollTo(this.scrollX, t);
                    });
                }
            },
            scrollLeft: function (t) {
                if (this.length) {
                    var n = "scrollLeft" in this[0];
                    return t === x ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
                        this.scrollLeft = t;
                    } : function () {
                        this.scrollTo(t, this.scrollY);
                    });
                }
            },
            position: function () {
                if (this.length) {
                    var t = this[0], n = this.offsetParent(), e = this.offset(), i = B.test(n[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : n.offset();
                    return e.top -= parseFloat(C(t).css("margin-top")) || 0, e.left -= parseFloat(C(t).css("margin-left")) || 0,
                        i.top += parseFloat(C(n[0]).css("border-top-width")) || 0, i.left += parseFloat(C(n[0]).css("border-left-width")) || 0,
                    {
                        top: e.top - i.top,
                        left: e.left - i.left
                    };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || L.body; t && !B.test(t.nodeName) && "static" == C(t).css("position");)t = t.offsetParent;
                    return t;
                });
            }
        }, C.fn.detach = C.fn.remove, ["width", "height"].forEach(function (t) {
            var n = t.replace(/./, function (t) {
                return t[0].toUpperCase();
            });
            C.fn[t] = function (r) {
                var o, s = this[0];
                return r === x ? e(s) ? s["inner" + n] : i(s) ? s.documentElement["scroll" + n] : (o = this.offset()) && o[t] : this.each(function (n) {
                    s = C(this), s.css(t, v(this, r, n, s[t]()));
                });
            };
        }), F.forEach(function (n, e) {
            var i = e % 2;
            C.fn[n] = function () {
                var n, r, o = C.map(arguments, function (e) {
                    return n = t(e), "object" == n || "array" == n || null == e ? e : X.fragment(e);
                }), s = this.length > 1;
                return o.length < 1 ? this : this.each(function (t, n) {
                    r = i ? n : n.parentNode, n = 0 == e ? n.nextSibling : 1 == e ? n.firstChild : 2 == e ? n : null, o.forEach(function (t) {
                        if (s) t = t.cloneNode(!0); else if (!r) return C(t).remove();
                        N(r.insertBefore(t, n), function (t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
                        });
                    });
                });
            }, C.fn[i ? n + "To" : "insert" + (e ? "Before" : "After")] = function (t) {
                return C(t)[n](this), this;
            };
        });
        for (var K in C.fn) X.Z[K] = C.fn[K];
        return X.uniq = S, X.deserializeValue = w, C.zepto = X, C;
    }();
    window.Zepto = t, void 0 === window.$ && (window.$ = t);
}); define("biz_wap/zepto/fx.js", ["biz_wap/zepto/zepto.js"], function (t) {
    "use strict";
    t("biz_wap/zepto/zepto.js"), function (t, n) {
        function i(t) {
            return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
        }
        function e(t) {
            return o ? o + t : t.toLowerCase();
        }
        var o, s, a, r, f, u, c, d, l, p, m = "", h = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        }, y = window.document, b = y.createElement("div"), w = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, z = {};
        t.each(h, function (t, i) {
            return b.style[t + "TransitionProperty"] !== n ? (m = "-" + t.toLowerCase() + "-", o = i, !1) : void 0;
        }), s = m + "transform", z[a = m + "transition-property"] = z[r = m + "transition-duration"] = z[u = m + "transition-delay"] = z[f = m + "transition-timing-function"] = z[c = m + "animation-name"] = z[d = m + "animation-duration"] = z[p = m + "animation-delay"] = z[l = m + "animation-timing-function"] = "",
            t.fx = {
                off: o === n && b.style.transitionProperty === n,
                speeds: {
                    _default: 400,
                    fast: 200,
                    slow: 600
                },
                cssPrefix: m,
                transitionEnd: e("TransitionEnd"),
                animationEnd: e("AnimationEnd")
            }, t.fn.animate = function (i, e, o, s, a) {
                return t.isFunction(e) && (s = e, o = n, e = n), t.isFunction(o) && (s = o, o = n), t.isPlainObject(e) && (o = e.easing,
                    s = e.complete, a = e.delay, e = e.duration), e && (e = ("number" == typeof e ? e : t.fx.speeds[e] || t.fx.speeds._default) / 1e3),
                    a && (a = parseFloat(a) / 1e3), this.anim(i, e, o, s, a);
            }, t.fn.anim = function (e, o, m, h, y) {
                var b, x, g, E = {}, j = "", _ = this, v = t.fx.transitionEnd, T = !1;
                if (o === n && (o = t.fx.speeds._default / 1e3), y === n && (y = 0), t.fx.off && (o = 0), "string" == typeof e) E[c] = e,
                    E[d] = o + "s", E[p] = y + "s", E[l] = m || "linear", v = t.fx.animationEnd; else {
                    x = [];
                    for (b in e) w.test(b) ? j += b + "(" + e[b] + ") " : (E[b] = e[b], x.push(i(b)));
                    j && (E[s] = j, x.push(s)), o > 0 && "object" == typeof e && (E[a] = x.join(", "), E[r] = o + "s", E[u] = y + "s",
                        E[f] = m || "linear");
                }
                return g = function (n) {
                    if ("undefined" != typeof n) {
                        if (n.target !== n.currentTarget) return;
                        t(n.target).unbind(v, g);
                    } else t(this).unbind(v, g);
                    T = !0, t(this).css(z), h && h.call(this);
                }, o > 0 && (this.bind(v, g), setTimeout(function () {
                    T || g.call(_);
                }, 1e3 * o + 25)), this.size() && this.get(0).clientLeft, this.css(E), 0 >= o && setTimeout(function () {
                    _.each(function () {
                        g.call(this);
                    });
                }, 0), this;
            }, b = null;
    }(Zepto);
}); define("biz_wap/utils/fakehash.js", ["biz_common/dom/event.js"], function (t) {
    "use strict";
    function s(t) {
        t = t || location.hash.substr(1);
        var s, o, e, i, r = !1, c = [];
        for (s = 0; s < h.length; s++)o = h[s], e = o[0], i = o[1], e !== a ? ("string" == typeof e && e === t || e instanceof RegExp && e.test(t)) && (i(n),
            r = !0) : c.push(i);
        if (!r) for (s = 0; s < c.length; s++)c[s](n, t);
        n = t;
    }
    var o = t("biz_common/dom/event.js"), h = [], a = "__default_hash__", n = location.hash.substr(1);
    return o.on(window, "popstate", function (t) {
        var o = a;
        t.state && t.state.hash && (o = t.state.hash), s(o);
    }), o.on(window, "hashchange", s), o.on(window, "load", function () {
        history.state && history.state.hash && s(history.state.hash);
    }), {
        val: function () {
            return history.state && history.state.hash || location.hash.substr(1);
        },
        push: function (t) {
            history.pushState ? (history.pushState({
                hash: t
            }, document.title, location.href), s(t)) : location.hash = t;
        },
        replace: function (t) {
            history.replaceState ? (history.replaceState({
                hash: t
            }, document.title, location.href), s(t)) : this.push(t);
        },
        on: function (t, s) {
            "function" == typeof t && (s = t, t = a), h.push([t, s]);
        }
    };
});
