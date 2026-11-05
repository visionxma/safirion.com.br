!(function(e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).flexibility = e();
})(function() {
  return (function l(n, o, f) {
    function i(r, e2) {
      if (!o[r]) {
        if (!n[r]) {
          var t = "function" == typeof require && require;
          if (!e2 && t) return t(r, true);
          if (s) return s(r, true);
          e2 = new Error("Cannot find module '" + r + "'");
          throw e2.code = "MODULE_NOT_FOUND", e2;
        }
        t = o[r] = { exports: {} };
        n[r][0].call(t.exports, function(e3) {
          var t2 = n[r][1][e3];
          return i(t2 || e3);
        }, t, t.exports, l, n, o, f);
      }
      return o[r].exports;
    }
    for (var s = "function" == typeof require && require, e = 0; e < f.length; e++) i(f[e]);
    return i;
  })({ 1: [function(e, t, r) {
    t.exports = function(e2) {
      var t2, r2, l, n = -1;
      if (1 < e2.lines.length && "flex-start" === e2.style.alignContent) for (t2 = 0; l = e2.lines[++n]; ) l.crossStart = t2, t2 += l.cross;
      else if (1 < e2.lines.length && "flex-end" === e2.style.alignContent) for (t2 = e2.flexStyle.crossSpace; l = e2.lines[++n]; ) l.crossStart = t2, t2 += l.cross;
      else if (1 < e2.lines.length && "center" === e2.style.alignContent) for (t2 = e2.flexStyle.crossSpace / 2; l = e2.lines[++n]; ) l.crossStart = t2, t2 += l.cross;
      else if (1 < e2.lines.length && "space-between" === e2.style.alignContent) for (r2 = e2.flexStyle.crossSpace / (e2.lines.length - 1), t2 = 0; l = e2.lines[++n]; ) l.crossStart = t2, t2 += l.cross + r2;
      else if (1 < e2.lines.length && "space-around" === e2.style.alignContent) for (t2 = (r2 = 2 * e2.flexStyle.crossSpace / (2 * e2.lines.length)) / 2; l = e2.lines[++n]; ) l.crossStart = t2, t2 += l.cross + r2;
      else for (r2 = e2.flexStyle.crossSpace / e2.lines.length, t2 = e2.flexStyle.crossInnerBefore; l = e2.lines[++n]; ) l.crossStart = t2, l.cross += r2, t2 += l.cross;
    };
  }, {}], 2: [function(e, t, r) {
    t.exports = function(e2) {
      for (var t2, r2 = -1; line = e2.lines[++r2]; ) for (t2 = -1; child = line.children[++t2]; ) {
        var l = child.style.alignSelf;
        "flex-start" === (l = "auto" === l ? e2.style.alignItems : l) ? child.flexStyle.crossStart = line.crossStart : "flex-end" === l ? child.flexStyle.crossStart = line.crossStart + line.cross - child.flexStyle.crossOuter : "center" === l ? child.flexStyle.crossStart = line.crossStart + (line.cross - child.flexStyle.crossOuter) / 2 : (child.flexStyle.crossStart = line.crossStart, child.flexStyle.crossOuter = line.cross, child.flexStyle.cross = child.flexStyle.crossOuter - child.flexStyle.crossBefore - child.flexStyle.crossAfter);
      }
    };
  }, {}], 3: [function(e, t, r) {
    t.exports = function(e2, t2) {
      var t2 = "row" === t2 || "row-reverse" === t2, r2 = e2.mainAxis;
      r2 ? t2 && "inline" === r2 || !t2 && "block" === r2 || (e2.flexStyle = { main: e2.flexStyle.cross, cross: e2.flexStyle.main, mainOffset: e2.flexStyle.crossOffset, crossOffset: e2.flexStyle.mainOffset, mainBefore: e2.flexStyle.crossBefore, mainAfter: e2.flexStyle.crossAfter, crossBefore: e2.flexStyle.mainBefore, crossAfter: e2.flexStyle.mainAfter, mainInnerBefore: e2.flexStyle.crossInnerBefore, mainInnerAfter: e2.flexStyle.crossInnerAfter, crossInnerBefore: e2.flexStyle.mainInnerBefore, crossInnerAfter: e2.flexStyle.mainInnerAfter, mainBorderBefore: e2.flexStyle.crossBorderBefore, mainBorderAfter: e2.flexStyle.crossBorderAfter, crossBorderBefore: e2.flexStyle.mainBorderBefore, crossBorderAfter: e2.flexStyle.mainBorderAfter }) : (e2.flexStyle = t2 ? { main: e2.style.width, cross: e2.style.height, mainOffset: e2.style.offsetWidth, crossOffset: e2.style.offsetHeight, mainBefore: e2.style.marginLeft, mainAfter: e2.style.marginRight, crossBefore: e2.style.marginTop, crossAfter: e2.style.marginBottom, mainInnerBefore: e2.style.paddingLeft, mainInnerAfter: e2.style.paddingRight, crossInnerBefore: e2.style.paddingTop, crossInnerAfter: e2.style.paddingBottom, mainBorderBefore: e2.style.borderLeftWidth, mainBorderAfter: e2.style.borderRightWidth, crossBorderBefore: e2.style.borderTopWidth, crossBorderAfter: e2.style.borderBottomWidth } : { main: e2.style.height, cross: e2.style.width, mainOffset: e2.style.offsetHeight, crossOffset: e2.style.offsetWidth, mainBefore: e2.style.marginTop, mainAfter: e2.style.marginBottom, crossBefore: e2.style.marginLeft, crossAfter: e2.style.marginRight, mainInnerBefore: e2.style.paddingTop, mainInnerAfter: e2.style.paddingBottom, crossInnerBefore: e2.style.paddingLeft, crossInnerAfter: e2.style.paddingRight, mainBorderBefore: e2.style.borderTopWidth, mainBorderAfter: e2.style.borderBottomWidth, crossBorderBefore: e2.style.borderLeftWidth, crossBorderAfter: e2.style.borderRightWidth }, "content-box" === e2.style.boxSizing && ("number" == typeof e2.flexStyle.main && (e2.flexStyle.main += e2.flexStyle.mainInnerBefore + e2.flexStyle.mainInnerAfter + e2.flexStyle.mainBorderBefore + e2.flexStyle.mainBorderAfter), "number" == typeof e2.flexStyle.cross) && (e2.flexStyle.cross += e2.flexStyle.crossInnerBefore + e2.flexStyle.crossInnerAfter + e2.flexStyle.crossBorderBefore + e2.flexStyle.crossBorderAfter)), e2.mainAxis = t2 ? "inline" : "block", e2.crossAxis = t2 ? "block" : "inline", "number" == typeof e2.style.flexBasis && (e2.flexStyle.main = e2.style.flexBasis + e2.flexStyle.mainInnerBefore + e2.flexStyle.mainInnerAfter + e2.flexStyle.mainBorderBefore + e2.flexStyle.mainBorderAfter), e2.flexStyle.mainOuter = e2.flexStyle.main, e2.flexStyle.crossOuter = e2.flexStyle.cross, "auto" === e2.flexStyle.mainOuter && (e2.flexStyle.mainOuter = e2.flexStyle.mainOffset), "auto" === e2.flexStyle.crossOuter && (e2.flexStyle.crossOuter = e2.flexStyle.crossOffset), "number" == typeof e2.flexStyle.mainBefore && (e2.flexStyle.mainOuter += e2.flexStyle.mainBefore), "number" == typeof e2.flexStyle.mainAfter && (e2.flexStyle.mainOuter += e2.flexStyle.mainAfter), "number" == typeof e2.flexStyle.crossBefore && (e2.flexStyle.crossOuter += e2.flexStyle.crossBefore), "number" == typeof e2.flexStyle.crossAfter && (e2.flexStyle.crossOuter += e2.flexStyle.crossAfter);
    };
  }, {}], 4: [function(e, t, r) {
    var n = e("../reduce");
    t.exports = function(r2) {
      var l;
      0 < r2.mainSpace && 0 < (l = n(r2.children, function(e2, t2) {
        return e2 + parseFloat(t2.style.flexGrow);
      }, 0)) && (r2.main = n(r2.children, function(e2, t2) {
        return "auto" === t2.flexStyle.main ? t2.flexStyle.main = t2.flexStyle.mainOffset + parseFloat(t2.style.flexGrow) / l * r2.mainSpace : t2.flexStyle.main += parseFloat(t2.style.flexGrow) / l * r2.mainSpace, t2.flexStyle.mainOuter = t2.flexStyle.main + t2.flexStyle.mainBefore + t2.flexStyle.mainAfter, e2 + t2.flexStyle.mainOuter;
      }, 0), r2.mainSpace = 0);
    };
  }, { "../reduce": 12 }], 5: [function(e, t, r) {
    var n = e("../reduce");
    t.exports = function(r2) {
      var l;
      r2.mainSpace < 0 && 0 < (l = n(r2.children, function(e2, t2) {
        return e2 + parseFloat(t2.style.flexShrink);
      }, 0)) && (r2.main = n(r2.children, function(e2, t2) {
        return t2.flexStyle.main += parseFloat(t2.style.flexShrink) / l * r2.mainSpace, t2.flexStyle.mainOuter = t2.flexStyle.main + t2.flexStyle.mainBefore + t2.flexStyle.mainAfter, e2 + t2.flexStyle.mainOuter;
      }, 0), r2.mainSpace = 0);
    };
  }, { "../reduce": 12 }], 6: [function(e, t, r) {
    var n = e("../reduce");
    t.exports = function(e2) {
      var t2;
      e2.lines = [t2 = { main: 0, cross: 0, children: [] }];
      for (var r2, l = -1; r2 = e2.children[++l]; ) "nowrap" === e2.style.flexWrap || 0 === t2.children.length || "auto" === e2.flexStyle.main || e2.flexStyle.main - e2.flexStyle.mainInnerBefore - e2.flexStyle.mainInnerAfter - e2.flexStyle.mainBorderBefore - e2.flexStyle.mainBorderAfter >= t2.main + r2.flexStyle.mainOuter ? (t2.main += r2.flexStyle.mainOuter, t2.cross = Math.max(t2.cross, r2.flexStyle.crossOuter)) : e2.lines.push(t2 = { main: r2.flexStyle.mainOuter, cross: r2.flexStyle.crossOuter, children: [] }), t2.children.push(r2);
      e2.flexStyle.mainLines = n(e2.lines, function(e3, t3) {
        return Math.max(e3, t3.main);
      }, 0), e2.flexStyle.crossLines = n(e2.lines, function(e3, t3) {
        return e3 + t3.cross;
      }, 0), "auto" === e2.flexStyle.main && (e2.flexStyle.main = Math.max(e2.flexStyle.mainOffset, e2.flexStyle.mainLines + e2.flexStyle.mainInnerBefore + e2.flexStyle.mainInnerAfter + e2.flexStyle.mainBorderBefore + e2.flexStyle.mainBorderAfter)), "auto" === e2.flexStyle.cross && (e2.flexStyle.cross = Math.max(e2.flexStyle.crossOffset, e2.flexStyle.crossLines + e2.flexStyle.crossInnerBefore + e2.flexStyle.crossInnerAfter + e2.flexStyle.crossBorderBefore + e2.flexStyle.crossBorderAfter)), e2.flexStyle.crossSpace = e2.flexStyle.cross - e2.flexStyle.crossInnerBefore - e2.flexStyle.crossInnerAfter - e2.flexStyle.crossBorderBefore - e2.flexStyle.crossBorderAfter - e2.flexStyle.crossLines, e2.flexStyle.mainOuter = e2.flexStyle.main + e2.flexStyle.mainBefore + e2.flexStyle.mainAfter, e2.flexStyle.crossOuter = e2.flexStyle.cross + e2.flexStyle.crossBefore + e2.flexStyle.crossAfter;
    };
  }, { "../reduce": 12 }], 7: [function(n, e, t) {
    e.exports = function(e2) {
      for (var t2, r, l = -1; t2 = e2.children[++l]; ) n("./flex-direction")(t2, e2.style.flexDirection);
      for (n("./flex-direction")(e2, e2.style.flexDirection), n("./order")(e2), n("./flexbox-lines")(e2), n("./align-content")(e2), l = -1; r = e2.lines[++l]; ) r.mainSpace = e2.flexStyle.main - e2.flexStyle.mainInnerBefore - e2.flexStyle.mainInnerAfter - e2.flexStyle.mainBorderBefore - e2.flexStyle.mainBorderAfter - r.main, n("./flex-grow")(r), n("./flex-shrink")(r), n("./margin-main")(r), n("./margin-cross")(r), n("./justify-content")(r, e2.style.justifyContent, e2);
      n("./align-items")(e2);
    };
  }, { "./align-content": 1, "./align-items": 2, "./flex-direction": 3, "./flex-grow": 4, "./flex-shrink": 5, "./flexbox-lines": 6, "./justify-content": 8, "./margin-cross": 9, "./margin-main": 10, "./order": 11 }], 8: [function(e, t, r) {
    t.exports = function(e2, t2, r2) {
      var l, n, o, r2 = r2.flexStyle.mainInnerBefore, f = -1;
      if ("flex-end" === t2) for (l = e2.mainSpace, l += r2; o = e2.children[++f]; ) o.flexStyle.mainStart = l, l += o.flexStyle.mainOuter;
      else if ("center" === t2) for (l = e2.mainSpace / 2, l += r2; o = e2.children[++f]; ) o.flexStyle.mainStart = l, l += o.flexStyle.mainOuter;
      else if ("space-between" === t2) for (n = e2.mainSpace / (e2.children.length - 1), l = 0, l += r2; o = e2.children[++f]; ) o.flexStyle.mainStart = l, l += o.flexStyle.mainOuter + n;
      else if ("space-around" === t2) for (l = (n = 2 * e2.mainSpace / (2 * e2.children.length)) / 2, l += r2; o = e2.children[++f]; ) o.flexStyle.mainStart = l, l += o.flexStyle.mainOuter + n;
      else for (l = 0, l += r2; o = e2.children[++f]; ) o.flexStyle.mainStart = l, l += o.flexStyle.mainOuter;
    };
  }, {}], 9: [function(e, t, r) {
    t.exports = function(e2) {
      for (var t2, r2 = -1; t2 = e2.children[++r2]; ) {
        var l = 0, n = ("auto" === t2.flexStyle.crossBefore && ++l, "auto" === t2.flexStyle.crossAfter && ++l, e2.cross - t2.flexStyle.crossOuter);
        "auto" === t2.flexStyle.crossBefore && (t2.flexStyle.crossBefore = n / l), "auto" === t2.flexStyle.crossAfter && (t2.flexStyle.crossAfter = n / l), "auto" === t2.flexStyle.cross ? t2.flexStyle.crossOuter = t2.flexStyle.crossOffset + t2.flexStyle.crossBefore + t2.flexStyle.crossAfter : t2.flexStyle.crossOuter = t2.flexStyle.cross + t2.flexStyle.crossBefore + t2.flexStyle.crossAfter;
      }
    };
  }, {}], 10: [function(e, t, r) {
    t.exports = function(e2) {
      for (var t2, r2 = 0, l = -1; t2 = e2.children[++l]; ) "auto" === t2.flexStyle.mainBefore && ++r2, "auto" === t2.flexStyle.mainAfter && ++r2;
      if (0 < r2) {
        for (l = -1; t2 = e2.children[++l]; ) "auto" === t2.flexStyle.mainBefore && (t2.flexStyle.mainBefore = e2.mainSpace / r2), "auto" === t2.flexStyle.mainAfter && (t2.flexStyle.mainAfter = e2.mainSpace / r2), "auto" === t2.flexStyle.main ? t2.flexStyle.mainOuter = t2.flexStyle.mainOffset + t2.flexStyle.mainBefore + t2.flexStyle.mainAfter : t2.flexStyle.mainOuter = t2.flexStyle.main + t2.flexStyle.mainBefore + t2.flexStyle.mainAfter;
        e2.mainSpace = 0;
      }
    };
  }, {}], 11: [function(e, t, r) {
    var l = /^(column|row)-reverse$/;
    t.exports = function(e2) {
      e2.children.sort(function(e3, t2) {
        return e3.style.order - t2.style.order || e3.index - t2.index;
      }), l.test(e2.style.flexDirection) && e2.children.reverse();
    };
  }, {}], 12: [function(e, t, r) {
    t.exports = function(e2, t2, r2) {
      for (var l = e2.length, n = -1; ++n < l; ) n in e2 && (r2 = t2(r2, e2[n], n));
      return r2;
    };
  }, {}], 13: [function(e, t, r) {
    var l = e("./read"), n = e("./write"), o = e("./readAll"), f = e("./writeAll");
    t.exports = function(e2) {
      f(o(e2));
    }, t.exports.read = l, t.exports.write = n, t.exports.readAll = o, t.exports.writeAll = f;
  }, { "./read": 15, "./readAll": 16, "./write": 17, "./writeAll": 18 }], 14: [function(e, t, r) {
    t.exports = function(e2, t2, r2) {
      var l = e2[t2];
      if (o = String(l).match(f)) {
        var n = o[1], o = o[2];
        if ("px" === o) return +n;
        else if ("cm" === o) return 0.3937 * n * 96;
        else if ("in" === o) return 96 * n;
        else if ("mm" === o) return 0.3937 * n * 96 / 10;
        else if ("pc" === o) return 12 * n * 96 / 72;
        else if ("pt" === o) return 96 * n / 72;
        else if ("rem" === o) return 16 * n;
        else {
          o = l;
          n = r2;
          return i.style.cssText = "border:none!important;clip:rect(0 0 0 0)!important;display:block!important;font-size:1em!important;height:0!important;margin:0!important;padding:0!important;position:relative!important;width:" + o + "!important", n.parentNode.insertBefore(i, n.nextSibling), o = i.offsetWidth, n.parentNode.removeChild(i), o;
          return;
        }
      }
      return (r2 = t2.match(a)) ? "none" !== e2["border" + r2[1] + "Style"] && s[l] || 0 : l;
    };
    var f = /^([-+]?\d*\.?\d+)(%|[a-z]+)$/, i = document.createElement("div"), s = { medium: 4, none: 0, thick: 6, thin: 2 }, a = /^border(Bottom|Left|Right|Top)Width$/;
  }, {}], 15: [function(e, t, r) {
    t.exports = function(e2) {
      var t2 = { alignContent: "stretch", alignItems: "stretch", alignSelf: "auto", borderBottomStyle: "none", borderBottomWidth: 0, borderLeftStyle: "none", borderLeftWidth: 0, borderRightStyle: "none", borderRightWidth: 0, borderTopStyle: "none", borderTopWidth: 0, boxSizing: "content-box", display: "inline", flexBasis: "auto", flexDirection: "row", flexGrow: 0, flexShrink: 1, flexWrap: "nowrap", justifyContent: "flex-start", height: "auto", marginTop: 0, marginRight: 0, marginLeft: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingLeft: 0, paddingBottom: 0, maxHeight: "none", maxWidth: "none", minHeight: 0, minWidth: 0, order: 0, position: "static", width: "auto" };
      if (e2 instanceof Element) {
        var r2, l = e2.hasAttribute("data-style"), n = l ? e2.getAttribute("data-style") : e2.getAttribute("style") || "", l = (l || e2.setAttribute("data-style", n), window.getComputedStyle && getComputedStyle(e2) || {}), o = t2, f = l;
        for (r2 in o) r2 in f && !p.test(r2) && (o[r2] = f[r2]);
        var i, s, a, y, l = e2.currentStyle || {}, c = t2, x = l;
        for (y in c) y in x ? c[y] = x[y] : (i = y.replace(/[A-Z]/g, "-$&").toLowerCase()) in x && (c[y] = x[i]);
        "-js-display" in x && (c.display = x["-js-display"]);
        for (var S = t2, m = n; s = u.exec(m); ) {
          var d = s[1].toLowerCase().replace(/-[a-z]/g, function(e3) {
            return e3.slice(1).toUpperCase();
          });
          S[d] = s[2];
        }
        for (a in t2) t2[a] = h(t2, a, e2);
        l = e2.getBoundingClientRect();
        t2.offsetHeight = l.height || e2.offsetHeight, t2.offsetWidth = l.width || e2.offsetWidth;
      }
      return { element: e2, style: t2 };
    };
    var u = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g, p = /^(alignSelf|height|width)$/, h = e("./getComputedLength");
  }, { "./getComputedLength": 14 }], 16: [function(e, t, r) {
    function y(e2) {
      var t2 = e2 instanceof Element, r2 = t2 && e2.getAttribute("data-style"), t2 = t2 && e2.currentStyle && e2.currentStyle["-js-display"];
      return l.test(r2) || n.test(t2);
    }
    t.exports = function(e2) {
      var t2 = [];
      return (function e3(t3, r2) {
        for (var l2, n2 = y(t3), o = [], f = -1; l2 = t3.childNodes[++f]; ) {
          var i, s = 3 === l2.nodeType && !/^\s*$/.test(l2.nodeValue), s = (n2 && s && (s = l2, (l2 = t3.insertBefore(document.createElement("flex-item"), s)).appendChild(s)), l2 instanceof Element);
          s && (s = e3(l2, r2), n2) && ((i = l2.style).display = "inline-block", i.position = "absolute", s.style = c(l2).style, o.push(s));
        }
        var a = { element: t3, children: o };
        return n2 && (a.style = c(t3).style, r2.push(a)), a;
      })(e2, t2), t2;
    };
    var c = e("../read"), l = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i, n = /^(inline-)?flex$/i;
  }, { "../read": 15 }], 17: [function(e, t, r) {
    function i(e2) {
      return "string" == typeof e2 ? e2 : Math.max(e2, 0) + "px";
    }
    t.exports = function(e2) {
      s(e2);
      var t2 = e2.element.style, r2 = "inline" === e2.mainAxis ? ["main", "cross"] : ["cross", "main"];
      t2.boxSizing = "content-box", t2.display = "block", t2.position = "relative", t2.width = i(e2.flexStyle[r2[0]] - e2.flexStyle[r2[0] + "InnerBefore"] - e2.flexStyle[r2[0] + "InnerAfter"] - e2.flexStyle[r2[0] + "BorderBefore"] - e2.flexStyle[r2[0] + "BorderAfter"]), t2.height = i(e2.flexStyle[r2[1]] - e2.flexStyle[r2[1] + "InnerBefore"] - e2.flexStyle[r2[1] + "InnerAfter"] - e2.flexStyle[r2[1] + "BorderBefore"] - e2.flexStyle[r2[1] + "BorderAfter"]);
      for (var l, n = -1; l = e2.children[++n]; ) {
        var o = l.element.style, f = "inline" === l.mainAxis ? ["main", "cross"] : ["cross", "main"];
        o.boxSizing = "content-box", o.display = "block", o.position = "absolute", "auto" !== l.flexStyle[f[0]] && (o.width = i(l.flexStyle[f[0]] - l.flexStyle[f[0] + "InnerBefore"] - l.flexStyle[f[0] + "InnerAfter"] - l.flexStyle[f[0] + "BorderBefore"] - l.flexStyle[f[0] + "BorderAfter"])), "auto" !== l.flexStyle[f[1]] && (o.height = i(l.flexStyle[f[1]] - l.flexStyle[f[1] + "InnerBefore"] - l.flexStyle[f[1] + "InnerAfter"] - l.flexStyle[f[1] + "BorderBefore"] - l.flexStyle[f[1] + "BorderAfter"])), o.top = i(l.flexStyle[f[1] + "Start"]), o.left = i(l.flexStyle[f[0] + "Start"]), o.marginTop = i(l.flexStyle[f[1] + "Before"]), o.marginRight = i(l.flexStyle[f[0] + "After"]), o.marginBottom = i(l.flexStyle[f[1] + "After"]), o.marginLeft = i(l.flexStyle[f[0] + "Before"]);
      }
    };
    var s = e("../flexbox");
  }, { "../flexbox": 7 }], 18: [function(e, t, r) {
    t.exports = function(e2) {
      for (var t2, r2 = -1; t2 = e2[++r2]; ) l(t2);
    };
    var l = e("../write");
  }, { "../write": 17 }] }, {}, [13])(13);
});
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = true), (function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function(e) {
    return t(e, window);
  }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window);
})(function(s, n) {
  "use strict";
  function e(e2) {
    return 0 <= (function(e3, t2) {
      for (var r2 = /^(\d+)\.(\d+)\.(\d+)/, n2 = r2.exec(e3) || [], o2 = r2.exec(t2) || [], a2 = 1; a2 <= 3; a2++) {
        if (+o2[a2] < +n2[a2]) return 1;
        if (+n2[a2] < +o2[a2]) return -1;
      }
      return 0;
    })(s.fn.jquery, e2);
  }
  s.migrateVersion = "3.4.1";
  var t = /* @__PURE__ */ Object.create(null);
  s.migrateDisablePatches = function() {
    for (var e2 = 0; e2 < arguments.length; e2++) t[arguments[e2]] = true;
  }, s.migrateEnablePatches = function() {
    for (var e2 = 0; e2 < arguments.length; e2++) delete t[arguments[e2]];
  }, s.migrateIsPatchEnabled = function(e2) {
    return !t[e2];
  }, n.console && n.console.log && (s && e("3.0.0") && !e("5.0.0") || n.console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
  var o = {};
  function u(e2, t2) {
    var r2 = n.console;
    !s.migrateIsPatchEnabled(e2) || s.migrateDeduplicateWarnings && o[t2] || (o[t2] = true, s.migrateWarnings.push(t2 + " [" + e2 + "]"), r2 && r2.warn && !s.migrateMute && (r2.warn("JQMIGRATE: " + t2), s.migrateTrace && r2.trace && r2.trace()));
  }
  function r(e2, t2, r2, n2, o2) {
    Object.defineProperty(e2, t2, { configurable: true, enumerable: true, get: function() {
      return u(n2, o2), r2;
    }, set: function(e3) {
      u(n2, o2), r2 = e3;
    } });
  }
  function a(e2, t2, r2, n2, o2) {
    var a2 = e2[t2];
    e2[t2] = function() {
      return o2 && u(n2, o2), (s.migrateIsPatchEnabled(n2) ? r2 : a2 || s.noop).apply(this, arguments);
    };
  }
  function c(e2, t2, r2, n2, o2) {
    if (!o2) throw new Error("No warning message provided");
    return a(e2, t2, r2, n2, o2), 0;
  }
  function i(e2, t2, r2, n2) {
    return a(e2, t2, r2, n2), 0;
  }
  s.migrateDeduplicateWarnings = true, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = true), s.migrateReset = function() {
    o = {}, s.migrateWarnings.length = 0;
  }, "BackCompat" === n.document.compatMode && u("quirks", "jQuery is not compatible with Quirks Mode");
  var d, l, p, f = {}, m = s.fn.init, y = s.find, h = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/, g = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g, v = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  for (d in i(s.fn, "init", function(e2) {
    var t2 = Array.prototype.slice.call(arguments);
    return s.migrateIsPatchEnabled("selector-empty-id") && "string" == typeof e2 && "#" === e2 && (u("selector-empty-id", "jQuery( '#' ) is not a valid selector"), t2[0] = []), m.apply(this, t2);
  }, "selector-empty-id"), s.fn.init.prototype = s.fn, i(s, "find", function(t2) {
    var r2 = Array.prototype.slice.call(arguments);
    if ("string" == typeof t2 && h.test(t2)) try {
      n.document.querySelector(t2);
    } catch (e2) {
      t2 = t2.replace(g, function(e3, t3, r3, n2) {
        return "[" + t3 + r3 + '"' + n2 + '"]';
      });
      try {
        n.document.querySelector(t2), u("selector-hash", "Attribute selector with '#' must be quoted: " + r2[0]), r2[0] = t2;
      } catch (e3) {
        u("selector-hash", "Attribute selector with '#' was not fixed: " + r2[0]);
      }
    }
    return y.apply(this, r2);
  }, "selector-hash"), y) Object.prototype.hasOwnProperty.call(y, d) && (s.find[d] = y[d]);
  c(s.fn, "size", function() {
    return this.length;
  }, "size", "jQuery.fn.size() is deprecated and removed; use the .length property"), c(s, "parseJSON", function() {
    return JSON.parse.apply(null, arguments);
  }, "parseJSON", "jQuery.parseJSON is deprecated; use JSON.parse"), c(s, "holdReady", s.holdReady, "holdReady", "jQuery.holdReady is deprecated"), c(s, "unique", s.uniqueSort, "unique", "jQuery.unique is deprecated; use jQuery.uniqueSort"), r(s.expr, "filters", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), r(s.expr, ":", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && c(s, "trim", function(e2) {
    return null == e2 ? "" : (e2 + "").replace(v, "$1");
  }, "trim", "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (c(s, "nodeName", function(e2, t2) {
    return e2.nodeName && e2.nodeName.toLowerCase() === t2.toLowerCase();
  }, "nodeName", "jQuery.nodeName is deprecated"), c(s, "isArray", Array.isArray, "isArray", "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (c(s, "isNumeric", function(e2) {
    var t2 = typeof e2;
    return ("number" == t2 || "string" == t2) && !isNaN(e2 - parseFloat(e2));
  }, "isNumeric", "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e2, t2) {
    f["[object " + t2 + "]"] = t2.toLowerCase();
  }), c(s, "type", function(e2) {
    return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? f[Object.prototype.toString.call(e2)] || "object" : typeof e2;
  }, "type", "jQuery.type is deprecated"), c(s, "isFunction", function(e2) {
    return "function" == typeof e2;
  }, "isFunction", "jQuery.isFunction() is deprecated"), c(s, "isWindow", function(e2) {
    return null != e2 && e2 === e2.window;
  }, "isWindow", "jQuery.isWindow() is deprecated")), s.ajax && (l = s.ajax, p = /(=)\?(?=&|$)|\?\?/, i(s, "ajax", function() {
    var e2 = l.apply(this, arguments);
    return e2.promise && (c(e2, "success", e2.done, "jqXHR-methods", "jQXHR.success is deprecated and removed"), c(e2, "error", e2.fail, "jqXHR-methods", "jQXHR.error is deprecated and removed"), c(e2, "complete", e2.always, "jqXHR-methods", "jQXHR.complete is deprecated and removed")), e2;
  }, "jqXHR-methods"), e("4.0.0") || s.ajaxPrefilter("+json", function(e2) {
    false !== e2.jsonp && (p.test(e2.url) || "string" == typeof e2.data && 0 === (e2.contentType || "").indexOf("application/x-www-form-urlencoded") && p.test(e2.data)) && u("jsonp-promotion", "JSON-to-JSONP auto-promotion is deprecated");
  }));
  var j = s.fn.removeAttr, b = s.fn.toggleClass, w = /\S+/g;
  function x(e2) {
    return e2.replace(/-([a-z])/g, function(e3, t2) {
      return t2.toUpperCase();
    });
  }
  i(s.fn, "removeAttr", function(e2) {
    var r2 = this, n2 = false;
    return s.each(e2.match(w), function(e3, t2) {
      s.expr.match.bool.test(t2) && r2.each(function() {
        if (false !== s(this).prop(t2)) return !(n2 = true);
      }), n2 && (u("removeAttr-bool", "jQuery.fn.removeAttr no longer sets boolean properties: " + t2), r2.prop(t2, false));
    }), j.apply(this, arguments);
  }, "removeAttr-bool"), i(s.fn, "toggleClass", function(t2) {
    return void 0 !== t2 && "boolean" != typeof t2 ? b.apply(this, arguments) : (u("toggleClass-bool", "jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
      var e2 = this.getAttribute && this.getAttribute("class") || "";
      e2 && s.data(this, "__className__", e2), this.setAttribute && this.setAttribute("class", !e2 && false !== t2 && s.data(this, "__className__") || "");
    }));
  }, "toggleClass-bool");
  var Q, A, R = false, C = /^[a-z]/, N = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
  s.swap && s.each(["height", "width", "reliableMarginRight"], function(e2, t2) {
    var r2 = s.cssHooks[t2] && s.cssHooks[t2].get;
    r2 && (s.cssHooks[t2].get = function() {
      var e3;
      return R = true, e3 = r2.apply(this, arguments), R = false, e3;
    });
  }), i(s, "swap", function(e2, t2, r2, n2) {
    var o2, a2, i2 = {};
    for (a2 in R || u("swap", "jQuery.swap() is undocumented and deprecated"), t2) i2[a2] = e2.style[a2], e2.style[a2] = t2[a2];
    for (a2 in o2 = r2.apply(e2, n2 || []), t2) e2.style[a2] = i2[a2];
    return o2;
  }, "swap"), e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, { set: function() {
    return u("cssProps", "jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments);
  } })), e("4.0.0") ? (A = { animationIterationCount: true, columnCount: true, fillOpacity: true, flexGrow: true, flexShrink: true, fontWeight: true, gridArea: true, gridColumn: true, gridColumnEnd: true, gridColumnStart: true, gridRow: true, gridRowEnd: true, gridRowStart: true, lineHeight: true, opacity: true, order: true, orphans: true, widows: true, zIndex: true, zoom: true }, "undefined" != typeof Proxy ? s.cssNumber = new Proxy(A, { get: function() {
    return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.get.apply(this, arguments);
  }, set: function() {
    return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.set.apply(this, arguments);
  } }) : s.cssNumber = A) : A = s.cssNumber, Q = s.fn.css, i(s.fn, "css", function(e2, t2) {
    var r2, n2, o2 = this;
    return e2 && "object" == typeof e2 && !Array.isArray(e2) ? (s.each(e2, function(e3, t3) {
      s.fn.css.call(o2, e3, t3);
    }), this) : ("number" == typeof t2 && (r2 = x(e2), n2 = r2, C.test(n2) && N.test(n2[0].toUpperCase() + n2.slice(1)) || A[r2] || u("css-number", 'Number-typed values are deprecated for jQuery.fn.css( "' + e2 + '", value )')), Q.apply(this, arguments));
  }, "css-number");
  var S, P, k, H, E = s.data;
  i(s, "data", function(e2, t2, r2) {
    var n2, o2, a2;
    if (t2 && "object" == typeof t2 && 2 === arguments.length) {
      for (a2 in n2 = s.hasData(e2) && E.call(this, e2), o2 = {}, t2) a2 !== x(a2) ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + a2), n2[a2] = t2[a2]) : o2[a2] = t2[a2];
      return E.call(this, e2, o2), t2;
    }
    return t2 && "string" == typeof t2 && t2 !== x(t2) && (n2 = s.hasData(e2) && E.call(this, e2)) && t2 in n2 ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + t2), 2 < arguments.length && (n2[t2] = r2), n2[t2]) : E.apply(this, arguments);
  }, "data-camelCase"), s.fx && (k = s.Tween.prototype.run, H = function(e2) {
    return e2;
  }, i(s.Tween.prototype, "run", function() {
    1 < s.easing[this.easing].length && (u("easing-one-arg", "'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = H), k.apply(this, arguments);
  }, "easing-one-arg"), S = s.fx.interval, P = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", { configurable: true, enumerable: true, get: function() {
    return n.document.hidden || u("fx-interval", P), s.migrateIsPatchEnabled("fx-interval") && void 0 === S ? 13 : S;
  }, set: function(e2) {
    u("fx-interval", P), S = e2;
  } }));
  var M = s.fn.load, q = s.event.add, O = s.event.fix;
  s.event.props = [], s.event.fixHooks = {}, r(s.event.props, "concat", s.event.props.concat, "event-old-patch", "jQuery.event.props.concat() is deprecated and removed"), i(s.event, "fix", function(e2) {
    var t2, r2 = e2.type, n2 = this.fixHooks[r2], o2 = s.event.props;
    if (o2.length) {
      u("event-old-patch", "jQuery.event.props are deprecated and removed: " + o2.join());
      while (o2.length) s.event.addProp(o2.pop());
    }
    if (n2 && !n2._migrated_ && (n2._migrated_ = true, u("event-old-patch", "jQuery.event.fixHooks are deprecated and removed: " + r2), (o2 = n2.props) && o2.length)) while (o2.length) s.event.addProp(o2.pop());
    return t2 = O.call(this, e2), n2 && n2.filter ? n2.filter(t2, e2) : t2;
  }, "event-old-patch"), i(s.event, "add", function(e2, t2) {
    return e2 === n && "load" === t2 && "complete" === n.document.readyState && u("load-after-event", "jQuery(window).on('load'...) called after load event occurred"), q.apply(this, arguments);
  }, "load-after-event"), s.each(["load", "unload", "error"], function(e2, t2) {
    i(s.fn, t2, function() {
      var e3 = Array.prototype.slice.call(arguments, 0);
      return "load" === t2 && "string" == typeof e3[0] ? M.apply(this, e3) : (u("shorthand-removed-v3", "jQuery.fn." + t2 + "() is deprecated"), e3.splice(0, 0, t2), arguments.length ? this.on.apply(this, e3) : (this.triggerHandler.apply(this, e3), this));
    }, "shorthand-removed-v3");
  }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e2, r2) {
    c(s.fn, r2, function(e3, t2) {
      return 0 < arguments.length ? this.on(r2, null, e3, t2) : this.trigger(r2);
    }, "shorthand-deprecated-v3", "jQuery.fn." + r2 + "() event shorthand is deprecated");
  }), s(function() {
    s(n.document).triggerHandler("ready");
  }), s.event.special.ready = { setup: function() {
    this === n.document && u("ready-event", "'ready' event is deprecated");
  } }, c(s.fn, "bind", function(e2, t2, r2) {
    return this.on(e2, null, t2, r2);
  }, "pre-on-methods", "jQuery.fn.bind() is deprecated"), c(s.fn, "unbind", function(e2, t2) {
    return this.off(e2, null, t2);
  }, "pre-on-methods", "jQuery.fn.unbind() is deprecated"), c(s.fn, "delegate", function(e2, t2, r2, n2) {
    return this.on(t2, e2, r2, n2);
  }, "pre-on-methods", "jQuery.fn.delegate() is deprecated"), c(s.fn, "undelegate", function(e2, t2, r2) {
    return 1 === arguments.length ? this.off(e2, "**") : this.off(t2, e2 || "**", r2);
  }, "pre-on-methods", "jQuery.fn.undelegate() is deprecated"), c(s.fn, "hover", function(e2, t2) {
    return this.on("mouseenter", e2).on("mouseleave", t2 || e2);
  }, "pre-on-methods", "jQuery.fn.hover() is deprecated");
  function T(e2) {
    var t2 = n.document.implementation.createHTMLDocument("");
    return t2.body.innerHTML = e2, t2.body && t2.body.innerHTML;
  }
  var F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
    s.migrateEnablePatches("self-closed-tags");
  }, i(s, "htmlPrefilter", function(e2) {
    var t2, r2;
    return (r2 = (t2 = e2).replace(F, "<$1></$2>")) !== t2 && T(t2) !== T(r2) && u("self-closed-tags", "HTML tags must be properly nested and closed: " + t2), e2.replace(F, "<$1></$2>");
  }, "self-closed-tags"), s.migrateDisablePatches("self-closed-tags");
  var D, W, _, I = s.fn.offset;
  return i(s.fn, "offset", function() {
    var e2 = this[0];
    return !e2 || e2.nodeType && e2.getBoundingClientRect ? I.apply(this, arguments) : (u("offset-valid-elem", "jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0);
  }, "offset-valid-elem"), s.ajax && (D = s.param, i(s, "param", function(e2, t2) {
    var r2 = s.ajaxSettings && s.ajaxSettings.traditional;
    return void 0 === t2 && r2 && (u("param-ajax-traditional", "jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t2 = r2), D.call(this, e2, t2);
  }, "param-ajax-traditional")), c(s.fn, "andSelf", s.fn.addBack, "andSelf", "jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), s.Deferred && (W = s.Deferred, _ = [["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"], ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"], ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]], i(s, "Deferred", function(e2) {
    var a2 = W(), i2 = a2.promise();
    function t2() {
      var o2 = arguments;
      return s.Deferred(function(n2) {
        s.each(_, function(e3, t3) {
          var r2 = "function" == typeof o2[e3] && o2[e3];
          a2[t3[1]](function() {
            var e4 = r2 && r2.apply(this, arguments);
            e4 && "function" == typeof e4.promise ? e4.promise().done(n2.resolve).fail(n2.reject).progress(n2.notify) : n2[t3[0] + "With"](this === i2 ? n2.promise() : this, r2 ? [e4] : arguments);
          });
        }), o2 = null;
      }).promise();
    }
    return c(a2, "pipe", t2, "deferred-pipe", "deferred.pipe() is deprecated"), c(i2, "pipe", t2, "deferred-pipe", "deferred.pipe() is deprecated"), e2 && e2.call(a2, a2), a2;
  }, "deferred-pipe"), s.Deferred.exceptionHook = W.exceptionHook), s;
});
window.addComment = (function(v) {
  var I, C, h, E = v.document, b = { commentReplyClass: "comment-reply-link", commentReplyTitleId: "reply-title", cancelReplyId: "cancel-comment-reply-link", commentFormId: "commentform", temporaryFormId: "wp-temp-form-div", parentIdFieldId: "comment_parent", postIdFieldId: "comment_post_ID" }, e = v.MutationObserver || v.WebKitMutationObserver || v.MozMutationObserver, r = "querySelector" in E && "addEventListener" in v, n = !!E.documentElement.dataset;
  function t() {
    d(), e && new e(o).observe(E.body, { childList: true, subtree: true });
  }
  function d(e2) {
    if (r && (I = g(b.cancelReplyId), C = g(b.commentFormId), I)) {
      let t3 = function(e3) {
        if ((e3.metaKey || e3.ctrlKey) && 13 === e3.keyCode && "a" !== E.activeElement.tagName.toLowerCase()) return C.removeEventListener("keydown", t3), e3.preventDefault(), C.submit.click(), false;
      };
      var t2 = t3;
      I.addEventListener("touchstart", l), I.addEventListener("click", l);
      C && C.addEventListener("keydown", t3);
      for (var n2, d2 = (function(e3) {
        var t4 = b.commentReplyClass;
        e3 && e3.childNodes || (e3 = E);
        e3 = E.getElementsByClassName ? e3.getElementsByClassName(t4) : e3.querySelectorAll("." + t4);
        return e3;
      })(e2), o2 = 0, i = d2.length; o2 < i; o2++) (n2 = d2[o2]).addEventListener("touchstart", a), n2.addEventListener("click", a);
    }
  }
  function l(e2) {
    var t2, n2, d2 = g(b.temporaryFormId);
    d2 && h && (g(b.parentIdFieldId).value = "0", t2 = d2.textContent, d2.parentNode.replaceChild(h, d2), this.style.display = "none", n2 = (d2 = (d2 = g(b.commentReplyTitleId)) && d2.firstChild) && d2.nextSibling, d2 && d2.nodeType === Node.TEXT_NODE && t2 && (n2 && "A" === n2.nodeName && n2.id !== b.cancelReplyId && (n2.style.display = ""), d2.textContent = t2), e2.preventDefault());
  }
  function a(e2) {
    var t2 = g(b.commentReplyTitleId), t2 = t2 && t2.firstChild.textContent, n2 = this, d2 = m(n2, "belowelement"), o2 = m(n2, "commentid"), i = m(n2, "respondelement"), r2 = m(n2, "postid"), n2 = m(n2, "replyto") || t2;
    d2 && o2 && i && r2 && false === v.addComment.moveForm(d2, o2, i, r2, n2) && e2.preventDefault();
  }
  function o(e2) {
    for (var t2 = e2.length; t2--; ) if (e2[t2].addedNodes.length) return void d();
  }
  function m(e2, t2) {
    return n ? e2.dataset[t2] : e2.getAttribute("data-" + t2);
  }
  function g(e2) {
    return E.getElementById(e2);
  }
  return r && "loading" !== E.readyState ? t() : r && v.addEventListener("DOMContentLiteSpeedLoaded", t, false), { init: d, moveForm: function(e2, t2, n2, d2, o2) {
    var i, r2, l2, a2, m2, c, s, e2 = g(e2), n2 = (h = g(n2), g(b.parentIdFieldId)), y = g(b.postIdFieldId), p = g(b.commentReplyTitleId), u = (p = p && p.firstChild) && p.nextSibling;
    if (e2 && h && n2) {
      void 0 === o2 && (o2 = p && p.textContent), a2 = h, m2 = b.temporaryFormId, c = g(m2), s = (s = g(b.commentReplyTitleId)) ? s.firstChild.textContent : "", c || ((c = E.createElement("div")).id = m2, c.style.display = "none", c.textContent = s, a2.parentNode.insertBefore(c, a2)), d2 && y && (y.value = d2), n2.value = t2, I.style.display = "", e2.parentNode.insertBefore(h, e2.nextSibling), p && p.nodeType === Node.TEXT_NODE && (u && "A" === u.nodeName && u.id !== b.cancelReplyId && (u.style.display = "none"), p.textContent = o2), I.onclick = function() {
        return false;
      };
      try {
        for (var f = 0; f < C.elements.length; f++) if (i = C.elements[f], r2 = false, "getComputedStyle" in v ? l2 = v.getComputedStyle(i) : E.documentElement.currentStyle && (l2 = i.currentStyle), (i.offsetWidth <= 0 && i.offsetHeight <= 0 || "hidden" === l2.visibility) && (r2 = true), "hidden" !== i.type && !i.disabled && !r2) {
          i.focus();
          break;
        }
      } catch (e3) {
      }
      return false;
    }
  } };
})(window);
var astraGetParents = function(e, t) {
  Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e2) {
    for (var t2 = (this.document || this.ownerDocument).querySelectorAll(e2), a2 = t2.length; 0 <= --a2 && t2.item(a2) !== this; ) ;
    return -1 < a2;
  });
  for (var a = []; e && e !== document; e = e.parentNode) (!t || e.matches(t)) && a.push(e);
  return a;
}, getParents = function(e, t) {
  console.warn("getParents() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraGetParents() instead."), astraGetParents(e, t);
}, astraToggleClass = function(e, t) {
  e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
}, toggleClass = function(e, t) {
  console.warn("toggleClass() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraToggleClass() instead."), astraToggleClass(e, t);
}, astraTriggerEvent = ((() => {
  function e(e2, t) {
    t = t || { bubbles: false, cancelable: false, detail: void 0 };
    var a = document.createEvent("CustomEvent");
    return a.initCustomEvent(e2, t.bubbles, t.cancelable, t.detail), a;
  }
  "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e);
})(), function(e, t) {
  t = new CustomEvent(t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {});
  e.dispatchEvent(t);
});
astraSmoothScroll = function(e, t) {
  e.preventDefault(), window.scrollTo({ top: t, left: 0, behavior: "smooth" });
}, astScrollToTopHandler = function(e, t) {
  var a = getComputedStyle(t).content, n = t.dataset.onDevices, a = a.replace(/[^0-9]/g, "");
  "both" == n || "desktop" == n && "769" == a || "mobile" == n && "" == a ? (n = window.pageYOffset || document.body.scrollTop, e && e.length ? n > e.offsetHeight + 100 ? t.style.display = "block" : t.style.display = "none" : 300 < window.pageYOffset ? t.style.display = "block" : t.style.display = "none") : t.style.display = "none";
}, (() => {
  var r = document.querySelectorAll("#masthead .main-header-menu-toggle"), m = document.getElementById("masthead"), i = {}, c = "", d = document.body, g = "";
  function e(e2) {
    c = e2.detail.type;
    e2 = document.querySelectorAll(".menu-toggle");
    "dropdown" === c && (document.getElementById("ast-mobile-popup").classList.remove("active", "show"), p("updateHeader")), "off-canvas" === c && e2.forEach(function(e3) {
      e3 && e3.classList.contains("toggled") && e3.click();
    }), t(c);
  }
  function p(e2) {
    g = m.querySelector("#ast-mobile-header");
    if (null == g || "dropdown" !== g.dataset.type || "updateHeader" === e2) {
      (void 0 !== e2 && "updateHeader" !== e2 ? e2.closest(".ast-mobile-popup-inner") : document.querySelector("#ast-mobile-popup")).querySelectorAll(".menu-item-has-children").forEach((e3) => {
        e3.classList.remove("ast-submenu-expanded"), Array.from(e3.querySelectorAll(".sub-menu")).forEach((e4) => {
          e4.hasAttribute("data-initial-display") || e4.setAttribute("data-initial-display", window.getComputedStyle(e4).display), "block" === e4.getAttribute("data-initial-display") ? e4.style.display = "block" : e4.style.display = "none";
        });
      });
      var t2 = document.querySelectorAll(".menu-toggle");
      document.body.classList.remove("ast-main-header-nav-open", "ast-popup-nav-open"), document.documentElement.classList.remove("ast-off-canvas-active");
      for (var a2 = 0; a2 < t2.length; a2++) t2[a2].classList.remove("toggled"), t2[a2].setAttribute("aria-expanded", "false"), t2[a2].style.display = "flex";
    }
  }
  function t(e2) {
    var a2 = document.querySelectorAll("#ast-mobile-header .menu-toggle"), n2 = document.querySelectorAll("#ast-desktop-header .menu-toggle");
    if (void 0 === e2 && null !== m) if (g = m.querySelector("#ast-mobile-header")) e2 = g.dataset.type;
    else {
      var o2 = m.querySelector("#ast-desktop-header");
      if (!o2) return;
      e2 = o2.dataset.toggleType;
    }
    if ("off-canvas" === e2) {
      var o2 = document.getElementById("menu-toggle-close"), s2 = document.querySelector(".ast-mobile-popup-inner");
      if (null != s2) {
        let l3 = function(e3) {
          var t4, a3 = document.getElementById("ast-mobile-popup");
          a3 && a3.classList.contains("active") && "Tab" === e3.key && (a3 = s2.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'), 0 !== (a3 = Array.prototype.filter.call(a3, function(e4) {
            return 0 < e4.offsetWidth && 0 < e4.offsetHeight && "hidden" !== window.getComputedStyle(e4).visibility;
          })).length) && (t4 = a3[0], a3 = a3[a3.length - 1], e3.shiftKey && document.activeElement === t4 ? (e3.preventDefault(), a3.focus()) : e3.shiftKey || document.activeElement !== a3 || (e3.preventDefault(), t4.focus()));
        }, i3 = function() {
          document.removeEventListener("keydown", l3);
        };
        var l2 = l3, i2 = i3;
        popupLinks = s2.getElementsByTagName("a"), document.removeEventListener("keydown", l3), document.addEventListener("keydown", l3), o2 && o2.addEventListener("click", i3), document.addEventListener("keyup", function(e3) {
          27 === e3.keyCode && i3();
        }), document.addEventListener("click", function(e3) {
          e3.target === document.querySelector(".ast-mobile-popup-drawer.active .ast-mobile-popup-overlay") && i3();
        });
        for (var r2 = 0; r2 < a2.length; r2++) a2[r2].removeEventListener("click", astraNavMenuToggle, false), a2[r2].removeEventListener("click", popupTriggerClick), a2[r2].addEventListener("click", function(e3) {
          e3.currentTarget.setAttribute("aria-expanded", "true"), popupTriggerClick(e3), document.querySelector(".ast-mobile-popup-drawer.active") || i3();
        }, false), a2[r2].trigger_type = "mobile";
        for (r2 = 0; r2 < n2.length; r2++) n2[r2].removeEventListener("click", astraNavMenuToggle, false), n2[r2].removeEventListener("click", popupTriggerClick), n2[r2].addEventListener("click", function(e3) {
          e3.currentTarget.setAttribute("aria-expanded", "true"), popupTriggerClick(e3);
        }, false), n2[r2].trigger_type = "desktop";
        let t3 = document.querySelector(".ast-button-wrap .menu-toggle");
        o2.addEventListener("click", function(e3) {
          document.getElementById("ast-mobile-popup").classList.remove("active", "show"), p(this), window.self === window.top && t3?.focus();
        }), document.addEventListener("keyup", function(e3) {
          27 === e3.keyCode && (e3.preventDefault(), document.getElementById("ast-mobile-popup").classList.remove("active", "show"), p(), t3?.focus());
        }), document.addEventListener("click", function(e3) {
          e3.target === document.querySelector(".ast-mobile-popup-drawer.active .ast-mobile-popup-overlay") && (document.getElementById("ast-mobile-popup").classList.remove("active", "show"), p(), t3?.focus());
        });
        for (let e3 = 0, t4 = popupLinks.length; e3 < t4; e3++) null !== popupLinks[e3].getAttribute("href") && (popupLinks[e3].getAttribute("href").startsWith("#") || -1 !== popupLinks[e3].getAttribute("href").search("#")) && (!popupLinks[e3].parentElement.classList.contains("menu-item-has-children") || popupLinks[e3].parentElement.classList.contains("menu-item-has-children") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-icon")) && (popupLinks[e3].addEventListener("click", v, true), popupLinks[e3].headerType = "off-canvas");
        AstraToggleSetup();
      }
    } else if ("dropdown" === e2) {
      var t2 = document.querySelectorAll(".ast-mobile-header-content") || false, o2 = document.querySelector(".ast-desktop-header-content") || false;
      if (0 < t2.length) for (let e3 = 0; e3 < t2.length; e3++) {
        var c2 = t2[e3].getElementsByTagName("a");
        for (link = 0, len = c2.length; link < len; link++) {
          var d2 = null === c2[link].closest(".wp-block-uagb-tabs");
          null !== c2[link].getAttribute("href") && (c2[link].getAttribute("href").startsWith("#") || -1 !== c2[link].getAttribute("href").search("#")) && (!c2[link].parentElement.classList.contains("menu-item-has-children") || c2[link].parentElement.classList.contains("menu-item-has-children") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-icon")) && d2 && (c2[link].addEventListener("click", v, true), c2[link].headerType = "dropdown");
        }
      }
      if (o2) {
        var u2 = o2.getElementsByTagName("a");
        for (link = 0, len = u2.length; link < len; link++) u2[link].addEventListener("click", v, true), u2[link].headerType = "dropdown";
      }
      for (r2 = 0; r2 < a2.length; r2++) a2[r2].removeEventListener("click", popupTriggerClick, false), a2[r2].removeEventListener("click", astraNavMenuToggle), a2[r2].addEventListener("click", astraNavMenuToggle, false), a2[r2].trigger_type = "mobile";
      for (r2 = 0; r2 < n2.length; r2++) n2[r2].removeEventListener("click", popupTriggerClick, false), n2[r2].removeEventListener("click", astraNavMenuToggle), n2[r2].addEventListener("click", astraNavMenuToggle, false), n2[r2].trigger_type = "desktop";
      AstraToggleSetup();
    }
  }
  function v(e2) {
    switch (e2.currentTarget.headerType) {
      case "dropdown":
        for (var t2 = document.querySelectorAll(".menu-toggle.toggled"), a2 = 0; a2 < t2.length; a2++) t2[a2].click();
        break;
      case "off-canvas":
        document.getElementById("menu-toggle-close").click();
    }
  }
  "" !== (g = null != m ? m.querySelector("#ast-mobile-header") : g) && null !== g && (c = g.dataset.type), document.addEventListener("astMobileHeaderTypeChange", e, false), document.addEventListener("click", function(e2) {
    e2 = e2.target.closest(".menu-toggle");
    if (e2 && "dropdown" === c) {
      e2.classList.toggle("toggled");
      var t2 = e2.classList.contains("toggled");
      e2.setAttribute("aria-expanded", t2 ? "true" : "false");
      {
        e2 = document.querySelectorAll(".menu-toggle");
        let t3 = Array.from(e2).every((e3) => e3.classList.contains("toggled"));
        e2.forEach((e3) => {
          t3 ? (e3.classList.remove("toggled"), e3.setAttribute("aria-expanded", "false")) : (e3.classList.add("toggled"), e3.setAttribute("aria-expanded", "true"));
        });
      }
    }
  }), popupTriggerClick = function(e2) {
    var t2 = e2.currentTarget.trigger_type, a2 = document.getElementById("ast-mobile-popup");
    d.classList.contains("ast-popup-nav-open") || d.classList.add("ast-popup-nav-open"), d.classList.contains("ast-main-header-nav-open") || "mobile" === t2 || d.classList.add("ast-main-header-nav-open"), document.documentElement.classList.contains("ast-off-canvas-active") || document.documentElement.classList.add("ast-off-canvas-active"), "desktop" === t2 && (a2.querySelector(".ast-mobile-popup-content").style.display = "none", a2.querySelector(".ast-desktop-popup-content").style.display = "block"), "mobile" === t2 && (a2.querySelector(".ast-desktop-popup-content").style.display = "none", a2.querySelector(".ast-mobile-popup-content").style.display = "block"), e2 && e2.currentTarget && e2.currentTarget.style && (e2.currentTarget.style.display = "none"), a2.classList.add("active", "show"), document.getElementById("menu-toggle-close")?.focus();
  }, window.addEventListener("load", function() {
    t();
  }), document.addEventListener("astLayoutWidthChanged", function() {
    t();
  }), document.addEventListener("astPartialContentRendered", function() {
    r = document.querySelectorAll(".main-header-menu-toggle"), d.classList.remove("ast-main-header-nav-open"), document.addEventListener("astMobileHeaderTypeChange", e, false), t();
  });
  var o = null !== navigator.userAgent.match(/Android/i) && "Android" === navigator.userAgent.match(/Android/i)[0] ? window.visualViewport.width : window.innerWidth;
  window.addEventListener("resize", function() {
    var e2, t2, a2, n2;
    "INPUT" !== document.activeElement.tagName && (e2 = document.getElementById("menu-toggle-close"), t2 = document.querySelector(".menu-toggle.toggled"), a2 = document.querySelector("#masthead > #ast-desktop-header .ast-desktop-header-content"), n2 = document.querySelector(".elementor-editor-active"), a2 && (a2.style.display = "none"), (null !== navigator.userAgent.match(/Android/i) && "Android" === navigator.userAgent.match(/Android/i)[0] ? window.visualViewport.width : window.innerWidth) !== o && (t2 && null === n2 && t2.click(), document.body.classList.remove("ast-main-header-nav-open", "ast-popup-nav-open"), e2) && null == n2 && e2.click(), u(), AstraToggleSetup());
  }), document.addEventListener("DOMContentLiteSpeedLoaded", function() {
    if (AstraToggleSetup(), null !== (e2 = d.classList.contains("ast-header-break-point") ? document.getElementById("ast-mobile-header") : document.getElementById("ast-desktop-header"))) {
      var e2, t2 = e2.querySelector(".navigation-accessibility");
      if (t2 && e2) {
        var a2 = e2.getElementsByTagName("button")[0] || e2.getElementsByTagName("a")[0];
        if (a2 && !a2.classList.contains("astra-search-icon")) {
          var n2 = t2.getElementsByTagName("ul")[0];
          if (n2) {
            if (n2.className.includes("nav-menu") || (n2.className += " nav-menu"), document.addEventListener("DOMContentLiteSpeedLoaded", function() {
              var e3;
              "off-canvas" === c && (e3 = document.getElementById("menu-toggle-close")) && (e3.onclick = function() {
                var e4 = t2.className.includes("toggled");
                t2.className = e4 ? t2.className.replace(" toggled", "") : t2.className + " toggled", a2.setAttribute("aria-expanded", e4 ? "false" : "true"), n2.setAttribute("aria-expanded", e4 ? "false" : "true");
              });
            }), a2.onclick = function() {
              var e3 = t2.className.includes("toggled");
              t2.className = e3 ? t2.className.replace(" toggled", "") : t2.className + " toggled", a2.setAttribute("aria-expanded", e3 ? "false" : "true"), n2.setAttribute("aria-expanded", e3 ? "false" : "true");
            }, !astra.is_header_footer_builder_active) {
              for (var o2 = n2.getElementsByTagName("a"), s2 = n2.getElementsByTagName("ul"), r2 = 0, l2 = s2.length; r2 < l2; r2++) s2[r2].parentNode.setAttribute("aria-haspopup", "true");
              for (r2 = 0, l2 = o2.length; r2 < l2; r2++) o2[r2].addEventListener("focus", E, true), o2[r2].addEventListener("blur", E, true), o2[r2].addEventListener("click", L, true);
            }
            astra.is_header_footer_builder_active && (() => {
              let t3 = document.querySelectorAll("nav.site-navigation .menu-item-has-children > a .ast-header-navigation-arrow"), a3 = document.querySelectorAll("nav.site-navigation .sub-menu"), n3 = document.querySelectorAll("nav.site-navigation .menu-item-has-children"), o3 = document.querySelectorAll(".astra-full-megamenu-wrapper");
              t3 && (t3.forEach((e4) => {
                e4.addEventListener("keydown", function(o4) {
                  if ("Enter" === o4.key) {
                    /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent) && (o4.preventDefault(), o4.stopPropagation());
                    let t4 = o4.target.closest("li"), a4 = t4.querySelector(".sub-menu"), n4 = a4 && a4.classList.contains("astra-megamenu");
                    setTimeout(() => {
                      n4 ? (e5 = t4.querySelector(".astra-full-megamenu-wrapper"), a4 && a4.classList.toggle("astra-megamenu-focus"), e5 && e5.classList.toggle("astra-megamenu-wrapper-focus")) : a4.classList.toggle("toggled-on"), t4.classList.toggle("ast-menu-hover");
                      var e5 = o4.target.getAttribute("aria-expanded");
                      o4.target.setAttribute("aria-expanded", "false" !== e5 && e5 ? "false" : "true");
                    }, 10);
                  }
                });
              }), a3 || n3) && (document.addEventListener("click", function(e4) {
                b(a3, t3, n3, o3);
              }, false), document.addEventListener("keydown", function(e4) {
                "Escape" === e4.key && b(a3, t3, n3, o3);
              }, false));
              var e3 = document.querySelectorAll("nav.site-navigation .ast-nav-menu > .menu-item-has-children > a .ast-header-navigation-arrow");
              e3 && e3.forEach((e4) => {
                e4.addEventListener("keydown", function(e5) {
                  e5.target.closest("li").classList.contains("ast-menu-hover") || "Enter" !== e5.key || b(a3, t3, n3, o3);
                }, false);
              }), (e3 = document.querySelectorAll("#ast-desktop-header .ast-builder-layout-element.ast-builder-menu")).forEach((e4) => {
                e4.querySelectorAll(".main-header-menu .menu-item > a").forEach((e5) => {
                  e5.addEventListener("focusout", function(e6) {
                    var t4 = e6.relatedTarget, a4 = t4 ? t4.closest(".menu-item") : null, t4 = e6.target.closest(".menu-item"), e6 = t4.classList.contains("ast-menu-hover"), n4 = t4.querySelector(".sub-menu"), o4 = t4.closest(".sub-menu"), s3 = t4.closest(".sub-menu")?.closest(".menu-item-has-children"), r3 = t4.querySelector(".menu-item");
                    if (!(t4 == a4 || r3 && r3 == a4)) if (null == a4) o4 && y(o4), n4 && y(n4);
                    else if (t4.nextElementSibling == a4 || t4.previousElementSibling == a4) e6 && (y(n4, false), t4.classList.remove("ast-menu-hover"));
                    else if (s3 && s3 == a4) y(childSubMenu = t4.querySelector(".sub-menu"), false);
                    else {
                      let e7 = s3, t5 = null;
                      for (; null != e7; ) {
                        if (e7.nextElementSibling == a4) {
                          t5 = e7.querySelector(".sub-menu");
                          break;
                        }
                        e7 = e7.closest(".sub-menu")?.closest(".menu-item-has-children");
                      }
                      o4 && y(o4, true, t5);
                    }
                  });
                });
              });
            })();
          } else a2.classList.contains("custom-logo-link") || (a2.style.display = "none");
        }
      }
    }
  });
  for (var a, n, s, l, u = function() {
    var e2 = d.style.overflow, t2 = (d.style.overflow = "hidden", document.documentElement.clientWidth);
    if (d.style.overflow = e2, astra.break_point < t2 || 0 === t2) {
      if (0 < r.length) for (var a2 = 0; a2 < r.length; a2++) null !== r[a2] && r[a2].classList.remove("toggled");
      d.classList.remove("ast-header-break-point"), d.classList.add("ast-desktop"), astraTriggerEvent(d, "astra-header-responsive-enabled");
    } else d.classList.add("ast-header-break-point"), d.classList.remove("ast-desktop"), astraTriggerEvent(d, "astra-header-responsive-disabled");
  }, h = (u(), AstraToggleSubMenu = function(e2) {
    e2.preventDefault(), "false" !== e2.target.getAttribute("aria-expanded") && e2.target.getAttribute("aria-expanded") ? e2.target.setAttribute("aria-expanded", "false") : e2.target.setAttribute("aria-expanded", "true");
    for (var t2 = this.parentNode, a2 = (t2.classList.contains("ast-submenu-expanded") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link") && (this.classList.contains("ast-menu-toggle") || "" !== (e2 = t2.querySelector("a").getAttribute("href")) && "#" !== e2 && (window.location = e2)), t2.querySelectorAll(".menu-item-has-children")), n2 = 0; n2 < a2.length; n2++) {
      a2[n2].classList.remove("ast-submenu-expanded");
      var o2 = a2[n2].querySelector(".sub-menu, .children");
      null !== o2 && (o2.style.display = "none");
    }
    for (var s2 = t2.parentNode.querySelectorAll(".menu-item-has-children"), n2 = 0; n2 < s2.length; n2++) if (s2[n2] != t2) {
      s2[n2].classList.remove("ast-submenu-expanded");
      for (var r2 = s2[n2].querySelectorAll(".sub-menu"), l2 = 0; l2 < r2.length; l2++) r2[l2].style.display = "none";
    }
    t2.classList.contains("menu-item-has-children") && (astraToggleClass(t2, "ast-submenu-expanded"), t2.classList.contains("ast-submenu-expanded") ? t2.querySelector(".sub-menu").style.display = "block" : t2.querySelector(".sub-menu").style.display = "none");
  }, AstraToggleSetup = function() {
    if ("undefined" != typeof astraAddon && "function" == typeof astraToggleSetupPro) astraToggleSetupPro(c, d, i);
    else {
      var e2, t2, a2, n2 = false;
      if (0 < (e2 = "off-canvas" === c || "full-width" === c ? (t2 = document.querySelectorAll("#ast-mobile-popup, #ast-mobile-header"), (a2 = document.querySelectorAll("#ast-mobile-header .main-header-menu-toggle")).length) : (t2 = document.querySelectorAll("#ast-mobile-header"), (n2 = !(0 < (e2 = (a2 = document.querySelectorAll("#ast-mobile-header .main-header-menu-toggle")).length))) ? 1 : e2)) || n2) {
        for (var o2 = 0; o2 < e2; o2++) if (n2 || (a2[o2].setAttribute("data-index", o2), i[o2]) || (i[o2] = a2[o2], a2[o2].removeEventListener("click", astraNavMenuToggle), a2[o2].addEventListener("click", astraNavMenuToggle, false)), void 0 !== t2[o2]) {
          for (var s2, r2 = 0; r2 < t2.length; r2++) if (0 < (s2 = document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link") ? t2[r2].querySelectorAll("ul.main-header-menu .menu-item-has-children > .menu-link, ul.main-header-menu .ast-menu-toggle") : t2[r2].querySelectorAll("ul.main-header-menu .ast-menu-toggle")).length) for (var l2 = 0; l2 < s2.length; l2++) s2[l2].removeEventListener("click", AstraToggleSubMenu), s2[l2].addEventListener("click", AstraToggleSubMenu, false);
        }
      }
    }
  }, astraNavMenuToggle = function(e2) {
    if ("undefined" != typeof astraAddon) astraNavMenuTogglePro(e2, d, c, this);
    else {
      e2.preventDefault();
      var e2 = document.querySelectorAll("#masthead > #ast-mobile-header .main-header-bar-navigation"), t2 = (r = document.querySelectorAll("#masthead > #ast-mobile-header .main-header-menu-toggle"), "0");
      if (null !== this.closest("#ast-fixed-header") && (e2 = document.querySelectorAll("#ast-fixed-header > #ast-mobile-header .main-header-bar-navigation"), r = document.querySelectorAll("#ast-fixed-header .main-header-menu-toggle"), t2 = "0"), void 0 === e2[t2]) return false;
      for (var a2 = e2[t2].querySelectorAll(".menu-item-has-children"), n2 = 0; n2 < a2.length; n2++) {
        a2[n2].classList.remove("ast-submenu-expanded");
        for (var o2 = a2[n2].querySelectorAll(".sub-menu"), s2 = 0; s2 < o2.length; s2++) o2[s2].style.display = "none";
      }
      -1 !== (this.getAttribute("class") || "").indexOf("main-header-menu-toggle") && (astraToggleClass(e2[t2], "toggle-on"), astraToggleClass(r[t2], "toggled"), e2[t2].classList.contains("toggle-on") ? (e2[t2].style.display = "block", d.classList.add("ast-main-header-nav-open")) : (e2[t2].style.display = "", d.classList.remove("ast-main-header-nav-open")));
    }
  }, d.addEventListener("astra-header-responsive-enabled", function() {
    var e2 = document.querySelectorAll(".main-header-bar-navigation");
    if (0 < e2.length) for (var t2 = 0; t2 < e2.length; t2++) {
      null != e2[t2] && (e2[t2].classList.remove("toggle-on"), e2[t2].style.display = "");
      for (var a2 = e2[t2].getElementsByClassName("sub-menu"), n2 = 0; n2 < a2.length; n2++) a2[n2].style.display = "";
      for (var o2 = e2[t2].getElementsByClassName("children"), s2 = 0; s2 < o2.length; s2++) o2[s2].style.display = "";
      for (var r2 = e2[t2].getElementsByClassName("ast-search-menu-icon"), l2 = 0; l2 < r2.length; l2++) r2[l2].classList.remove("ast-dropdown-active"), r2[l2].style.display = "";
    }
  }, false), k = navigator.userAgent, n = k.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(n[1]) ? a = /\brv[ :]+(\d+)/g.exec(k) || [] : "Chrome" === n[1] && null != (a = k.match(/\bOPR|Edge\/(\d+)/)) || (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (a = k.match(/version\/(\d+)/i)) && n.splice(1, 1, a[1]), "Safari" === n[0] && n[1] < 11 && document.body.classList.add("ast-safari-browser-less-than-11")), document.getElementsByClassName("astra-search-icon")), f = 0; f < h.length; f++) h[f].onclick = function(e2) {
    var t2;
    this.classList.contains("slide-search") && (e2.preventDefault(), (t2 = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon")).classList.contains("ast-dropdown-active") ? ("" !== (t2.querySelector(".search-field").value || "") && t2.querySelector(".search-form").submit(), t2.classList.remove("ast-dropdown-active")) : (t2.classList.add("ast-dropdown-active"), t2.querySelector(".search-field").setAttribute("autocomplete", "off"), setTimeout(function() {
      t2.querySelector(".search-field").focus();
    }, 200)));
  };
  function y(e2, t2 = true, a2 = null) {
    e2.classList.remove("toggled-on"), e2.classList.remove("astra-megamenu-focus");
    var n2 = e2.closest(".menu-item-has-children").querySelector(".ast-header-navigation-arrow");
    n2 && n2.setAttribute("aria-expanded", "false"), (t2 = a2 ? true : t2) && null !== (n2 = e2.parentElement.closest(".sub-menu")) && e2 !== a2 && y(n2, true, a2);
  }
  function b(e2, t2, a2, n2) {
    e2 && e2.forEach((e3) => {
      e3.classList.remove("astra-megamenu-focus"), e3.classList.remove("toggled-on");
    }), a2 && a2.forEach((e3) => {
      e3.classList.remove("ast-menu-hover");
    }), n2 && n2.forEach((e3) => {
      e3.classList.remove("astra-megamenu-wrapper-focus");
    }), t2 && t2.forEach((e3) => {
      e3.setAttribute("aria-expanded", "false");
    });
  }
  function L() {
    var e2 = this || "";
    if (e2 && !e2.classList.contains("astra-search-icon") && null === e2.closest(".ast-builder-menu") && -1 !== String(e2).indexOf("#")) {
      var t2 = e2.parentNode;
      if (d.classList.contains("ast-header-break-point")) document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link") && t2.classList.contains("menu-item-has-children") || (document.querySelector(".main-header-menu-toggle").classList.remove("toggled"), (t2 = document.querySelector(".main-header-bar-navigation")).classList.remove("toggle-on"), t2.style.display = "none", astraTriggerEvent(document.querySelector("body"), "astraMenuHashLinkClicked"));
      else for (; -1 === e2.className.indexOf("nav-menu"); ) "li" === e2.tagName.toLowerCase() && -1 !== e2.className.indexOf("focus") && (e2.className = e2.className.replace(" focus", "")), e2 = e2.parentElement;
    }
  }
  function E() {
    for (var e2 = this; -1 === e2.className.indexOf("navigation-accessibility"); ) "li" === e2.tagName.toLowerCase() && e2.classList.toggle("focus"), e2 = e2.parentElement;
  }
  if (document.querySelectorAll(".search-field").forEach((e2) => {
    e2.addEventListener("focus", function(e3) {
      var t2 = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon");
      t2 && astraToggleClass(t2, "ast-dropdown-active");
    }), e2.addEventListener("blur", function(e3) {
      var t2 = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon");
      t2 && (t2.classList.remove("ast-dropdown-active"), astraToggleClass(t2, "ast-dropdown-active"));
    });
  }), d.onclick = function(e2) {
    if (void 0 !== e2.target.classList && !e2.target.classList.contains("ast-search-menu-icon") && 0 === astraGetParents(e2.target, ".ast-search-menu-icon").length && 0 === astraGetParents(e2.target, ".ast-search-icon").length) for (var t2 = document.getElementsByClassName("ast-search-menu-icon"), a2 = 0; a2 < t2.length; a2++) t2[a2].classList.remove("ast-dropdown-active");
  }, astra.is_header_footer_builder_active || "querySelector" in document && "addEventListener" in window && (d.addEventListener("mousedown", function() {
    d.classList.add("ast-mouse-clicked");
  }), d.addEventListener("keydown", function() {
    d.classList.remove("ast-mouse-clicked");
  })), astra.is_scroll_to_id) {
    let o2 = (e2) => {
      let t3 = 0;
      for (; e2; ) t3 += e2.offsetTop, e2 = e2.offsetParent;
      return t3;
    }, t2 = (e2, t3 = null) => {
      let a2 = 0;
      var n2 = document.querySelector(".site-header");
      n2 && (0 < (n2 = n2.querySelectorAll("div[data-stick-support]")).length ? n2.forEach((e3) => a2 += e3.clientHeight) : "undefined" == typeof astraAddon || Number(astraAddon.sticky_hide_on_scroll) && !document?.querySelector(".ast-header-sticked") || (n2 = document.querySelector("#ast-fixed-header")) && (a2 = n2?.clientHeight, Number(astraAddon?.header_main_shrink)) && n2?.querySelectorAll(".ast-above-header-wrap, .ast-below-header-wrap")?.forEach(() => a2 -= 10), n2 = t3 || e2.target?.closest("a").hash) && (t3 = document.querySelector(n2)) && (t3 = (n2 = o2(t3)) - (a2 = "undefined" != typeof astraAddon && Number(astraAddon.sticky_hide_on_scroll) && window?.scrollY < n2 ? 0 : a2)) && astraSmoothScroll(e2, t3);
    }, s2 = [];
    var k = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"]):not([href*="uagb-tab"]):not(.uagb-toc-link__trigger):not(.skip-link):not(.nav-links a):not([href*="tab-"])');
    if (k) for (let e2 of k) e2.href.split("#")[0] !== location.href.split("#")[0] ? s2.push({ hash: e2.hash, url: e2.href.split("#")[0] }) : "" !== e2.hash && e2.addEventListener("click", t2);
    window.addEventListener("DOMContentLiteSpeedLoaded", (e2) => {
      for (var a2 of s2) if (window.location.href.split("#")[0] === a2.url) {
        var n2 = document.querySelector(".site-header");
        let t3 = 0;
        n2 = n2.querySelectorAll("div[data-stick-support]"), n2 = (n2 && n2.forEach((e3) => {
          t3 += e3.clientHeight;
        }), document.querySelector(a2.hash));
        n2 && (a2 = o2(n2) - t3) && astraSmoothScroll(e2, a2);
      }
      location.hash && setTimeout(() => t2(new Event("click"), location.hash), 750);
    });
  }
  astra.is_scroll_to_top && (s = document.querySelector("#page header"), l = document.getElementById("ast-scroll-top"), astScrollToTopHandler(s, l), window.addEventListener("scroll", function() {
    astScrollToTopHandler(s, l);
  }), l.onclick = function(e2) {
    astraSmoothScroll(e2, 0);
  }, l.addEventListener("keydown", function(e2) {
    "Enter" === e2.key && astraSmoothScroll(e2, 0);
  })), astra?.is_dark_palette ? document.documentElement.classList.add("astra-dark-mode-enable") : document.documentElement.classList.remove("astra-dark-mode-enable"), window.addEventListener("DOMContentLiteSpeedLoaded", (e2) => {
    var t2 = document.querySelector(".ast-woocommerce-store-notice-hanged");
    let a2 = () => {
      var e3 = document.querySelector('.woocommerce-store-notice[data-position="hang-over-top"]');
      document.body.style.paddingTop = `${e3?.clientHeight || 0}px`;
    };
    t2 && (window.addEventListener("resize", a2), setTimeout(() => a2(), 0)), document.querySelector(".woocommerce-store-notice__dismiss-link")?.addEventListener("click", () => {
      "undefined" != typeof wp && wp?.customize || (document.body.classList.remove("ast-woocommerce-store-notice-hanged"), window.removeEventListener("resize", a2), document.body.style.paddingTop = 0);
    });
  });
})(), document.addEventListener("DOMContentLiteSpeedLoaded", function() {
  let t = document.querySelectorAll(".menu-link .dropdown-menu-toggle");
  function n(e) {
    var e = e.closest(".menu-link"), t2 = e.nextElementSibling.classList.contains("toggled-on");
    e.setAttribute("aria-expanded", t2 ? "true" : "false");
  }
  document.querySelectorAll(".menu-item-has-children > a").forEach((t2) => {
    t2.addEventListener("keydown", function(e) {
      "Enter" === e.key && (e = t2.nextElementSibling) && e.classList.contains("sub-menu") && (e.classList.toggle("ast-visible"), e = "false" === t2.getAttribute("aria-expanded") ? "true" : "false", t2.setAttribute("aria-expanded", e));
    });
  }), t.forEach((a) => {
    a.addEventListener("focus", () => n(a)), a.addEventListener("blur", () => n(a)), a.addEventListener("keydown", (e) => {
      var t2;
      "Enter" === e.key && (e.preventDefault(), e = (e = a).closest(".menu-link"), t2 = e.getAttribute("aria-expanded"), e.setAttribute("aria-expanded", "true" === t2 ? "false" : "true"));
    });
  }), document.addEventListener("keydown", (e) => {
    "Escape" === e.key && t.forEach((e2) => n(e2));
  }), window.addEventListener("orientationchange", () => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
  });
}), document.addEventListener("DOMContentLiteSpeedLoaded", () => {
  document.querySelectorAll(".astra-shop-thumbnail-wrap").forEach((t) => {
    let a = t.querySelectorAll("a, span");
    a.forEach((e) => {
      e.addEventListener("focus", () => {
        t.querySelectorAll(".ast-on-card-button, .ast-quick-view-trigger").forEach((e2) => {
          e2.style.opacity = "1", e2.style.visibility = "visible", e2.style.borderStyle = "none";
        });
      }), e.addEventListener("blur", () => {
        Array.from(a).some((e2) => e2 === document.activeElement) || t.querySelectorAll(".ast-on-card-button, .ast-quick-view-trigger").forEach((e2) => {
          e2.style.opacity = "", e2.style.visibility = "";
        });
      });
    });
  });
});
"use strict";
var __awaiter = this && this.__awaiter || function(e, t, i, o) {
  return new (i || (i = Promise))((function(n, s) {
    function r(e2) {
      try {
        c(o.next(e2));
      } catch (e3) {
        s(e3);
      }
    }
    function a(e2) {
      try {
        c(o.throw(e2));
      } catch (e3) {
        s(e3);
      }
    }
    function c(e2) {
      var t2;
      e2.done ? n(e2.value) : (t2 = e2.value, t2 instanceof i ? t2 : new i((function(e3) {
        e3(t2);
      }))).then(r, a);
    }
    c((o = o.apply(e, t || [])).next());
  }));
};
class AiWebPushFront {
  constructor() {
    this.firebaseConfig = { apiKey: "AIzaSyCKel2XR-ZwR8tOxe1ytpmmbL_1AcfhsnQ", authDomain: "web-push-f5c68.firebaseapp.com", projectId: "web-push-f5c68", storageBucket: "web-push-f5c68.appspot.com", messagingSenderId: "33358057564", appId: "1:33358057564:web:ba785510e2df65c3d79699", measurementId: "G-CGMR7PPZGC" }, this.scrollTriggered = false, this.scrollListener = null, this.eventListeners = {}, this.currentSource = "native_prompt";
  }
  on(e, t) {
    this.eventListeners[e] || (this.eventListeners[e] = []), this.eventListeners[e].push(t);
  }
  off(e, t) {
    const i = this.eventListeners[e];
    i && (this.eventListeners[e] = i.filter(((e2) => e2 !== t)));
  }
  isDebug() {
    try {
      return "true" === localStorage.getItem("ai-web-push-debug");
    } catch (e) {
      return false;
    }
  }
  isNotificationSupported() {
    return "undefined" != typeof Notification;
  }
  isMetaWebView() {
    const e = navigator.userAgent || "";
    return /(FBAN|FBAV|FB_IAB|Instagram|Messenger)/i.test(e);
  }
  isAndroidDevice() {
    return /Android/i.test(navigator.userAgent || "");
  }
  isLikelyPushUnsupportedContext() {
    const e = this.isNotificationSupported(), t = "undefined" != typeof navigator && "serviceWorker" in navigator, i = "undefined" != typeof window && !!window.isSecureContext;
    return !e || !t || !i;
  }
  maybeShowWebViewExitPromptOnLoad() {
    if (!AI_WEB_PUSH_WEBVIEW_META_EXIT) return false;
    return !(!this.isMetaWebView() && !this.isLikelyPushUnsupportedContext()) && (this.renderWebViewExitModal(), true);
  }
  renderWebViewExitModal() {
    if (document.getElementById("aiWebPushWebviewExitModal")) return;
    const e = AI_WEB_PUSH_WEBVIEW_META_TITLE || "Abra no navegador para continuar", t = AI_WEB_PUSH_WEBVIEW_META_MESSAGE || "Para continuar lendo esse contéudo, abra esta página no navegador.", i = AI_WEB_PUSH_WEBVIEW_META_OPEN_BUTTON || "Abrir no navegador", o = `<div id="aiWebPushWebviewExitModal" style="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;">  <div style="position:relative;width:100%;max-width:420px;background:#fff;border-radius:14px;padding:24px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,sans-serif;text-align:center;">` + (AI_WEB_PUSH_WEBVIEW_META_SHOW_CLOSE_BUTTON ? '<button id="aiWebPushWebviewCloseButton" type="button" aria-label="Fechar" style="position:absolute;top:8px;right:8px;width:28px;height:28px;border:none;border-radius:50%;background:transparent;color:#555;font-size:22px;line-height:1;cursor:pointer;">&times;</button>' : "") + '    <h3 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#101010;">' + e + '</h3>    <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#333;">' + t + '</p>    <button id="aiWebPushWebviewOpenButton" type="button" style="width:100%;padding:12px 16px;background:#554FFF;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">' + i + '</button>    <p id="aiWebPushWebviewExitHint" style="display:none;margin:14px 0 0;font-size:13px;line-height:1.5;color:#666;">Não foi possível abrir automaticamente. Use o menu do aplicativo e escolha abrir no navegador.</p>  </div></div>';
    document.body.insertAdjacentHTML("beforeend", o), this.emit("webview_exit_prompt_shown", { source: "webview_exit" });
    const n = document.getElementById("aiWebPushWebviewOpenButton");
    n && n.addEventListener("click", (() => {
      this.tryOpenCurrentUrlExternally();
    }));
    const s = document.getElementById("aiWebPushWebviewCloseButton");
    s && s.addEventListener("click", (() => {
      this.closeWebViewExitModal();
    }));
  }
  closeWebViewExitModal() {
    const e = document.getElementById("aiWebPushWebviewExitModal");
    e && e.remove(), this.emit("webview_exit_dismissed", { source: "webview_exit" });
  }
  buildIntentUrl(e) {
    try {
      const t = new URL(e), i = t.protocol.replace(":", ""), o = (t.pathname || "/") + (t.search || "") + (t.hash || "");
      return "intent://" + t.host + o + "#Intent;scheme=" + i + ";package=com.android.chrome;end";
    } catch (e2) {
      return null;
    }
  }
  tryOpenWithWindowOpen(e) {
    try {
      return !!window.open(e, "_blank", "noopener,noreferrer");
    } catch (e2) {
      return false;
    }
  }
  tryOpenWithAnchor(e) {
    try {
      const t = document.createElement("a");
      return t.href = e, t.target = "_blank", t.rel = "noopener noreferrer", t.style.display = "none", document.body.appendChild(t), t.click(), t.remove(), true;
    } catch (e2) {
      return false;
    }
  }
  showWebviewManualFallback(e) {
    return __awaiter(this, void 0, void 0, (function* () {
      const t = document.getElementById("aiWebPushWebviewExitHint");
      if (!t) return;
      let i = "Não foi possível abrir automaticamente. Use o menu do aplicativo e escolha abrir no navegador.";
      try {
        navigator.clipboard && window.isSecureContext && (yield navigator.clipboard.writeText(e), i = "Não foi possível abrir automaticamente. O link foi copiado: cole no navegador.");
      } catch (e2) {
      }
      t.textContent = i, t.style.display = "block";
    }));
  }
  tryOpenCurrentUrlExternally() {
    const e = window.location.href;
    if (this.isAndroidDevice() && this.isMetaWebView()) {
      const t2 = this.buildIntentUrl(e);
      if (t2) return this.emit("webview_exit_intent_attempt", { source: "webview_exit" }), window.location.href = t2, void setTimeout((() => __awaiter(this, void 0, void 0, (function* () {
        if ("visible" === document.visibilityState) {
          const t3 = this.tryOpenWithWindowOpen(e), i2 = !t3 && this.tryOpenWithAnchor(e);
          if (t3 || i2) return void this.emit("webview_exit_open_external_success", { source: "webview_exit" });
          this.emit("webview_exit_open_external_failed", { source: "webview_exit" }), yield this.showWebviewManualFallback(e);
        }
      }))), 900);
    }
    const t = this.tryOpenWithWindowOpen(e), i = !t && this.tryOpenWithAnchor(e);
    t || i ? this.emit("webview_exit_open_external_success", { source: "webview_exit" }) : (this.emit("webview_exit_open_external_failed", { source: "webview_exit" }), this.showWebviewManualFallback(e));
  }
  emit(e, t = {}) {
    this.isDebug() && (console.groupCollapsed("%c[AI Web Push]%c " + e, "background:#554FFF;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold", "color:#554FFF;font-weight:bold"), console.log("Detail:", t), console.log("dataLayer push:", { event: "ai_web_push_" + e, push_provider: "ai_web_push", push_source: t.source || "" }), console.log("Timestamp:", (/* @__PURE__ */ new Date()).toISOString()), console.groupEnd());
    const i = this.eventListeners[e];
    i && i.forEach(((e2) => {
      try {
        e2(t);
      } catch (e3) {
      }
    }));
  }
  init(e = false) {
    if (this.currentSource = "native_prompt", !this.isNotificationSupported()) return void this.emit("browser_not_supported", { source: this.currentSource });
    if ("granted" == Notification.permission) return void this.setupForegroundMessaging();
    if ("denied" == Notification.permission) return;
    const t = localStorage.getItem("ai-web-push-modal");
    if (t) {
      const e2 = JSON.parse(t);
      if ("canceled" === e2.value) {
        const t2 = 864e5;
        if (Date.now() - e2.timestamp < t2) return;
      }
      if ("accepted" === e2.value) return;
    }
    const i = this.getBrowserName();
    "serviceWorker" in navigator && navigator.serviceWorker.register(AI_WEB_PUSH_SERVICE_WORKER_PATH + "firebase-messaging-sw.js", { scope: AI_WEB_PUSH_SERVICE_WORKER_PATH + "firebase-cloud-messaging-push-scope" }).then(((t2) => {
      navigator.serviceWorker.register(AI_WEB_PUSH_SERVICE_WORKER_PATH + "firebase-messaging-sw.js", { scope: AI_WEB_PUSH_SERVICE_WORKER_PATH }).then(((t3) => {
        AI_WEB_PUSH_SCROLL_TRIGGER_ENABLED && AI_WEB_PUSH_SCROLL_PERCENTAGE > 0 && !e ? this.setupScrollTrigger() : AI_WEB_PUSH_ALWAYS_SHOW_MODAL || ["firefox", "edge"].includes(i) ? this.renderPushNotificationModal() : this.askPermission();
      }), (function(e2) {
      }));
    }));
  }
  initOnButtonClick() {
    this.currentSource = "native_prompt", this.isNotificationSupported() ? (localStorage.getItem("ai-web-push-modal") && localStorage.removeItem("ai-web-push-modal"), this.scrollTriggered = false, this.cleanupScrollListener(), this.init(true)) : this.emit("browser_not_supported", { source: this.currentSource });
  }
  aiWebPushNewPush(e) {
    this.aiWebPushNewEvent("new-user", { client: e, pid: AI_WEB_PUSH_PID, location: "web-push" });
  }
  askPermission(e = false) {
    this.isNotificationSupported() ? ("custom_modal" === this.currentSource && e && this.emit("modal_accepted", { source: "custom_modal" }), "granted" != Notification.permission && (this.closeModal(false), setTimeout((() => {
      this.emit("prompt_shown", { source: this.currentSource }), Notification.requestPermission().then(((e2) => {
        if ("granted" === e2) {
          this.emit("permission_granted", { source: this.currentSource }), this.setModalDismissed("accepted");
          const e3 = firebase.initializeApp(this.firebaseConfig);
          firebase.messaging(e3).getToken({ vapidKey: "BKggPEBMHnKh1IOcR6X0rZIgfCcJzfKRpSJOUHCc3vWKpN8jiMB_nd9bUW9EkNGMSlsOnTdhY9i1WwBKVDyWNEQ" }).then(((e4) => {
            this.aiWebPushNewPush(e4), this.emit("subscription_success", { source: this.currentSource }), this.setupForegroundMessaging();
          })).catch(((e4) => {
            this.emit("subscription_error", { source: this.currentSource, error: e4 });
          }));
        } else this.emit("permission_denied", { source: this.currentSource }), this.closeModal();
      }));
    }), e ? 0 : 1e3 * AI_WEB_PUSH_MODAL_DELAY))) : this.emit("browser_not_supported", { source: this.currentSource });
  }
  aiWebPushNewEvent(e, t, i = ((e2) => {
  })) {
    if (t) {
      i || (i = function(e2) {
      });
      let o = AI_WEB_PUSH_SITE_URL + "/wp-json/ai-web-push/v1/events", n = localStorage.getItem("ai-web-push-local-id");
      if (!n) {
        let e2 = localStorage.getItem("ld");
        if (e2) localStorage.setItem("ai-web-push-local-id", e2), n = e2;
        else {
          n = "";
          const e3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t2 = e3.length;
          for (let i2 = 0; i2 < 10; i2++) n += e3.charAt(Math.floor(Math.random() * t2));
          localStorage.setItem("ai-web-push-local-id", n);
        }
      }
      fetch(o, { method: "POST", body: JSON.stringify(Object.assign(Object.assign({ event: e }, t), { localId: n, device: this.getDeviceType() })), headers: { "Content-Type": "application/json" } }).then((function(e2) {
        e2.json().then(((e3) => {
          i(e3);
        }));
      }));
    }
  }
  renderPushNotificationModal() {
    this.currentSource = "custom_modal", setTimeout((() => {
      const e = window.location.hostname;
      let t;
      t = AI_WEB_PUSH_MODAL_CUSTOM_ICON && "" !== AI_WEB_PUSH_MODAL_CUSTOM_ICON.trim() ? AI_WEB_PUSH_MODAL_CUSTOM_ICON : "https://www.google.com/s2/favicons?domain=https://" + e + "&sz=64";
      let i = `<div id="aiPushNotificationModal" style="position: fixed; top: 16px; left: 50%; transform: translateX(-50%); z-index: 2147483647; width: 360px; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif; padding: 32px 24px 24px 24px; display: flex; flex-direction: column; align-items: center; animation: aiPushSlideDown 0.3s ease;"><style>@keyframes aiPushSlideDown {from { opacity: 0; transform: translate(-50%, -100%); }to { opacity: 1; transform: translate(-50%, 0); }}</style><div style="display: flex; align-items: center; justify-content: center; margin-bottom: 32px; width: 100%;"><img src="` + t + '" style="width: 48px; height: 48px; margin-right: 16px; border-radius: 8px; background: #f5f5f5; object-fit: cover;" alt="' + e + ` icon" onerror="this.src='https://www.google.com/s2/favicons?domain=https://` + e + `&sz=64'"/><div style="font-size: 16px; color: #222; font-weight: 500; line-height: 1.4; text-align: left;">` + AI_WEB_PUSH_MODAL_MESSAGE + '</div></div><div style="display: flex; justify-content: center; gap: 16px; width: 100%;"><button onclick="aiWebPushFront.closeModal()" style="padding: 10px 0; width: 120px; font-size: 15px; color: #554FFF; background: transparent; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background 0.2s;">' + AI_WEB_PUSH_MODAL_CANCEL + '</button><button onclick="aiWebPushFront.askPermission(true)" style="padding: 10px 0; width: 120px; font-size: 15px; color: #fff; background: #554FFF; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: opacity 0.2s;">' + AI_WEB_PUSH_MODAL_ACCEPT + "</button></div></div>";
      document.body.insertAdjacentHTML("afterbegin", i), this.emit("modal_shown", { source: "custom_modal" });
      const o = document.getElementById("aiPushNotificationModal");
      if (o) {
        const e2 = o.getElementsByTagName("button");
        for (let t2 of e2) t2.addEventListener("mouseover", (function() {
          "transparent" === this.style.background ? this.style.background = "#f5f5f5" : this.style.opacity = "0.9";
        })), t2.addEventListener("mouseout", (function() {
          "#f5f5f5" === this.style.background ? this.style.background = "transparent" : this.style.opacity = "1";
        }));
      }
    }), 1e3 * AI_WEB_PUSH_MODAL_DELAY);
  }
  closeModal(e = true) {
    let t = document.getElementById("aiPushNotificationModal");
    t && t.remove(), e && (this.setModalDismissed("canceled"), this.emit("modal_dismissed", { source: "custom_modal" }));
  }
  setupForegroundMessaging() {
    return __awaiter(this, void 0, void 0, (function* () {
      if ("serviceWorker" in navigator) try {
        const e = yield navigator.serviceWorker.getRegistration(AI_WEB_PUSH_SERVICE_WORKER_PATH);
        if (!e) return;
        const t = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(this.firebaseConfig);
        firebase.messaging(t).onMessage(((t2) => {
          var i;
          console.log(t2), (null == t2 ? void 0 : t2.notification) && (e.showNotification(t2.notification.title, { body: t2.notification.body, icon: t2.notification.icon, data: t2 }), (null === (i = null == t2 ? void 0 : t2.data) || void 0 === i ? void 0 : i.view) && fetch(t2.data.view, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) }).catch((() => {
          })));
        }));
      } catch (e) {
      }
    }));
  }
  setModalDismissed(e) {
    localStorage.setItem("ai-web-push-modal", JSON.stringify({ value: e, timestamp: Date.now() }));
  }
  getDeviceType() {
    const e = navigator.userAgent, t = e.indexOf("Windows") > -1 || e.indexOf("Macintosh") > -1, i = /(Android|iPhone|iPod|iPad|Windows Phone)/i.test(e), o = /(iPad|Android)/i.test(e) && !/(Mobile)/i.test(e);
    return t ? "desktop" : i ? "mobile" : o ? "tablet" : "other";
  }
  getBrowserName() {
    var e;
    return window.opr && ["opr"].addons || window.opera || navigator.userAgent.indexOf(" OPR/") >= 0 ? "opera" : -1 != navigator.userAgent.indexOf("Firefox") ? "firefox" : /constructor/i.test(null === (e = window.HTMLElement) || void 0 === e ? void 0 : e.toString()) || "[object SafariRemoteNotification]" === (!window.safari || void 0 !== window.safari && window.safari.pushNotification).toString() ? "safari" : document.documentMode ? "ie" : -1 != navigator.userAgent.indexOf("Edg") ? "edge" : window.chrome ? "chrome" : (window.chrome || window.opr && ["opr"].addons || window.opera || navigator.userAgent.indexOf(" OPR/") >= 0) && window.CSS ? "blink" : void 0;
  }
  setupScrollTrigger() {
    this.scrollListener = () => {
      if (this.scrollTriggered) return;
      if ((window.pageYOffset || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100 >= AI_WEB_PUSH_SCROLL_PERCENTAGE) {
        this.scrollTriggered = true, this.cleanupScrollListener();
        const e = this.getBrowserName();
        AI_WEB_PUSH_ALWAYS_SHOW_MODAL || ["firefox", "edge"].includes(e) ? this.renderPushNotificationModal() : this.askPermission();
      }
    }, window.addEventListener("scroll", this.scrollListener, { passive: true });
  }
  cleanupScrollListener() {
    this.scrollListener && (window.removeEventListener("scroll", this.scrollListener), this.scrollListener = null);
  }
}
const aiWebPushFront = new AiWebPushFront(), aiWebPushGtmEvents = ["modal_shown", "modal_accepted", "modal_dismissed", "prompt_shown", "permission_granted", "permission_denied", "subscription_success", "subscription_error", "browser_not_supported", "webview_exit_prompt_shown", "webview_exit_intent_attempt", "webview_exit_open_external_success", "webview_exit_open_external_failed", "webview_exit_dismissed"];
aiWebPushGtmEvents.forEach(((e) => {
  aiWebPushFront.on(e, ((t) => {
    window.dataLayer = window.dataLayer || [], window.dataLayer.push({ event: "ai_web_push_" + e, push_provider: "ai_web_push", push_source: t.source || "" });
  }));
})), window.addEventListener("load", (() => {
  const e = aiWebPushFront.maybeShowWebViewExitPromptOnLoad();
  AI_WEB_PUSH_MANUAL_INIT || e || aiWebPushFront.init();
})), window.aiWebPushFront = aiWebPushFront;
(() => {
  var e = { 799() {
    window.WPConsent = { displayChecks: [], checksPassed: true, settingsHooks: [], settingsProcessed: false, listeners: [], lastPreferences: null, cssPromise: null, registerListener: function(e2) {
      if (this.listeners.push(e2), this.lastPreferences) try {
        e2(this.lastPreferences);
      } catch (e3) {
        console.error("Error in WPConsent listener:", e3);
      }
    }, registerDisplayCheck: function(e2) {
      this.displayChecks.push(e2), this.checksPassed = false;
    }, registerSettingsHook: function(e2) {
      this.settingsHooks.push(e2), this.settingsProcessed = false;
    }, runDisplayChecks: function() {
      return 0 === this.displayChecks.length ? (this.checksPassed = true, Promise.resolve()) : Promise.all(this.displayChecks.map((e2) => e2())).then(() => (this.checksPassed = true, Promise.resolve())).catch((e2) => (console.error("Error in WPConsent display check:", e2), this.checksPassed = true, Promise.resolve()));
    }, runSettingsHooks: function() {
      return 0 === this.settingsHooks.length ? (this.settingsProcessed = true, Promise.resolve()) : Promise.all(this.settingsHooks.map((e2) => e2(window.wpconsent))).then(() => (this.settingsProcessed = true, Promise.resolve())).catch((e2) => (console.error("Error in WPConsent settings hook:", e2), this.settingsProcessed = true, Promise.resolve()));
    }, hooks: { beforeShowPreferences: [], afterShowPreferences: [], beforeHideBanner: [], afterHideBanner: [], beforeShowBanner: [], afterShowBanner: [], accordionToggled: [] }, addHook: function(e2, t2) {
      this.hooks[e2] && this.hooks[e2].push(t2);
    }, runHooks: function(e2, ...t2) {
      this.hooks[e2] && this.hooks[e2].length > 0 && this.hooks[e2].forEach((n2) => {
        try {
          n2(...t2);
        } catch (t3) {
          console.error(`Error in WPConsent hook ${e2}:`, t3);
        }
      });
    }, showToast: function(e2, t2 = 2500) {
      this.ensureCSS().then(() => {
        const n2 = this.shadowRoot.querySelector("#wpconsent-gpc-toast");
        if (!n2) return;
        const o = n2.querySelector(".wpconsent-toast-message");
        o && e2 && (o.textContent = e2), n2.style.display = "block", setTimeout(() => {
          n2.classList.add("wpconsent-toast-visible");
        }, 10);
        const s = () => {
          n2.classList.remove("wpconsent-toast-visible"), setTimeout(() => {
            n2.style.display = "none";
          }, 300);
        }, c = setTimeout(s, t2), r = n2.querySelector(".wpconsent-toast-close");
        r && (r.onclick = () => {
          clearTimeout(c), s();
        });
      });
    }, highlightGPCOverride: function() {
      const e2 = this.shadowRoot.querySelector("#wpconsent-gpc-override-toggle-label"), t2 = this.shadowRoot.querySelector("#wpconsent-gpc-override-checkbox"), n2 = this.shadowRoot.querySelector("#wpconsent-gpc-override-container");
      e2 && (e2.classList.add("wpconsent-gpc-override-error"), e2.classList.add("wpconsent-shake"), setTimeout(() => {
        e2.classList.remove("wpconsent-shake");
      }, 300), t2 && t2.focus(), n2 && setTimeout(() => {
        n2.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100), t2 && t2.addEventListener("change", function() {
        t2.checked && e2.classList.remove("wpconsent-gpc-override-error");
      }, { once: true }));
    }, acceptAll: function() {
      const e2 = {};
      Array.isArray(wpconsent.slugs) && wpconsent.slugs.forEach((t2) => {
        e2[t2] = true;
      }), this.savePreferences(e2), this.closePreferences();
    }, checkGPC: function() {
      if (!wpconsent.respect_gpc || true !== navigator.globalPrivacyControl) return;
      const e2 = this.getCookie("wpconsent_preferences");
      let t2 = {};
      if (e2) try {
        t2 = JSON.parse(e2);
      } catch (e3) {
        console.error("WPConsent: Error parsing existing preferences:", e3);
      }
      if (t2.hasOwnProperty("respect_gpc")) return;
      const n2 = {};
      if (wpconsent.slugs.forEach((e3) => {
        const t3 = this.shadowRoot?.querySelector(`#wpconsent-preferences-modal input[type="checkbox"][id="cookie-service-${e3}"]`);
        t3 && t3.disabled ? n2[e3] = true : n2[e3] = false;
      }), n2.essential = true, n2.respect_gpc = true, this.savePreferences(n2, true), false !== wpconsent.gpc_toast_enabled) {
        const e3 = wpconsent.gpc_toast_message || "GPC Signal Honored", t3 = wpconsent.gpc_toast_duration || 1e4;
        this.showToast(e3, t3);
      }
      this.checksPassed = false;
    }, savePreferences: function(e2, t2 = false) {
      const n2 = this.getCookie("wpconsent_preferences");
      let o = false, s = null;
      if (n2) try {
        s = JSON.parse(n2);
      } catch (e3) {
        console.error("WPConsent: Error parsing existing preferences:", e3);
      }
      if (wpconsent.respect_gpc && !t2 && s) {
        const t3 = true === navigator.globalPrivacyControl, n3 = true === s.respect_gpc;
        if (t3 && n3) {
          const t4 = this.shadowRoot.querySelector("#wpconsent-gpc-override-checkbox");
          if (t4 && !t4.checked) return void this.highlightGPCOverride();
          e2.respect_gpc = false;
        }
      }
      t2 || (s && JSON.stringify(s) !== JSON.stringify(e2) || wpconsent.default_allow && Object.values(e2).some((e3) => false === e3)) && (this.clearCookies(), o = true), wpconsent.respect_gpc && !t2 && s && s.hasOwnProperty("respect_gpc") && (e2.respect_gpc = false), this.setCookie("wpconsent_preferences", JSON.stringify(e2), wpconsent.consent_duration), this.hideBanner(), this.closePreferences(), this.unlockScripts(e2), this.unlockIframes(e2), this.showFloatingButtonIfEnabled(), this.updateHostConsent(e2), window.dispatchEvent(new CustomEvent("wpconsent_consent_saved", { detail: e2 })), n2 && window.dispatchEvent(new CustomEvent("wpconsent_consent_updated", { detail: e2 })), o && (Object.defineProperty(document, "cookie", { get: function() {
        return "";
      }, set: function(e3) {
      } }), window.location.reload());
    }, showPreferences: function() {
      return this.ensureCSS().then(() => {
        const e2 = this.shadowRoot?.querySelector("#wpconsent-preferences-modal");
        if (e2) {
          e2.style.display = "flex", this.setupFocusTrap(e2), this.runHooks("afterShowPreferences");
          const t2 = this.shadowRoot?.querySelector("#wpconsent-preferences-title");
          t2 && setTimeout(() => {
            t2.focus({ preventScroll: true }), this.lastFocusedElement = t2;
          }, 100);
          const n2 = this.getCookie("wpconsent_preferences");
          if (n2) try {
            const e3 = JSON.parse(n2);
            this.shadowRoot.querySelectorAll('#wpconsent-preferences-modal input[type="checkbox"]').forEach((t4) => {
              let n3 = null;
              n3 = t4.id.startsWith("cookie-category-") ? t4.id.replace("cookie-category-", "") : t4.id.startsWith("cookie-service-") ? t4.id.replace("cookie-service-", "") : t4.value, n3 && n3 in e3 && (t4.checked = e3[n3]);
            });
            const t3 = this.shadowRoot.querySelector("#wpconsent-gpc-override-container");
            if (t3) {
              const n3 = true === navigator.globalPrivacyControl, o = e3 && true === e3.respect_gpc;
              t3.style.display = n3 && o ? "block" : "none";
            }
          } catch (e3) {
            console.error("Error parsing WPConsent preferences:", e3);
          }
        }
      });
    }, closePreferences: function() {
      const e2 = this.shadowRoot?.querySelector("#wpconsent-preferences-modal");
      e2 && (e2.style.display = "none", this.removeFocusTrap(), this.previouslyFocusedElement && (this.previouslyFocusedElement.focus({ preventScroll: true }), this.previouslyFocusedElement = null));
    }, showBanner: function() {
      if (!wpconsent.enable_consent_banner) return;
      const e2 = this.shadowRoot?.querySelector("#wpconsent-banner-holder");
      e2 && this.ensureCSS().then(() => {
        this.runHooks("beforeShowBanner"), e2.classList.add("wpconsent-banner-visible"), this.updateButtonVisibility(wpconsent), this.setupFocusTrap(e2), this.runHooks("afterShowBanner");
      });
    }, hideBanner: function() {
      const e2 = this.shadowRoot?.querySelector("#wpconsent-banner-holder");
      e2 && (this.runHooks("beforeHideBanner"), e2.classList.remove("wpconsent-banner-visible"), this.removeFocusTrap(), this.previouslyFocusedElement && (this.previouslyFocusedElement.focus({ preventScroll: true }), this.previouslyFocusedElement = null), this.runHooks("afterHideBanner"));
    }, setCookie: function(e2, t2, n2) {
      let o = "";
      if (n2 > 0) {
        const e3 = /* @__PURE__ */ new Date();
        e3.setTime(e3.getTime() + 24 * n2 * 60 * 60 * 1e3), o = "expires=" + e3.toUTCString() + ";";
      }
      const s = this.getCookieDomain();
      document.cookie = e2 + "=" + t2 + ";" + o + s + "path=/";
    }, getCookieDomain: function() {
      return wpconsent.enable_shared_consent && wpconsent.cookie_domain && "" !== wpconsent.cookie_domain ? "domain=" + (wpconsent.cookie_domain.startsWith(".") ? wpconsent.cookie_domain : "." + wpconsent.cookie_domain) + ";" : "";
    }, getCookie: function(e2) {
      const t2 = `; ${document.cookie}`.split(`; ${e2}=`);
      if (2 === t2.length) return t2.pop().split(";").shift();
    }, hasConsent: function(e2) {
      const t2 = this.getCookie("wpconsent_preferences");
      if (!t2) return false;
      try {
        const n2 = JSON.parse(t2);
        return "essential" === e2 || true === n2[e2];
      } catch (e3) {
        return console.error("Error parsing WPConsent preferences:", e3), false;
      }
    }, shouldUnlockContent: function(e2, t2, n2) {
      return "essential" === n2 || (wpconsent.manual_toggle_services ? !(!t2 || void 0 === e2[t2]) && e2[t2] : true === e2[n2]);
    }, unlockScripts: function(e2) {
      this.lastPreferences = e2, this.listeners && this.listeners.length > 0 && this.listeners.forEach((t2) => {
        try {
          t2(e2);
        } catch (e3) {
          console.error("Error in WPConsent listener:", e3);
        }
      }), document.querySelectorAll('script[type="text/plain"]').forEach((t2) => {
        const n2 = t2.getAttribute("data-wpconsent-category"), o = t2.getAttribute("data-wpconsent-name");
        if (this.shouldUnlockContent(e2, o, n2)) {
          const e3 = document.createElement("script");
          t2.getAttributeNames().forEach((n4) => {
            "type" !== n4 && e3.setAttribute(n4, t2.getAttribute(n4));
          });
          const n3 = t2.getAttribute("data-wpconsent-src");
          n3 ? e3.src = n3 : e3.text = t2.text, t2.parentNode.replaceChild(e3, t2);
        }
      }), document.dispatchEvent(new CustomEvent("wpconsent_consent_processed", { detail: e2 })), WPConsent.localGtag("set", "developer_id.dMmRkYz", true), WPConsent.localGtag("consent", "update", { ad_storage: e2.marketing ? "granted" : "denied", analytics_storage: e2.statistics ? "granted" : "denied", ad_user_data: e2.marketing ? "granted" : "denied", ad_personalization: e2.marketing ? "granted" : "denied", personalization_storage: e2.marketing ? "granted" : "denied" }), window.dataLayer = window.dataLayer || [], window.dataLayer.push({ event: "wpconsent_consent_processed", wpconsentPreferences: e2 });
    }, unlockIframes: function(e2) {
      document.querySelectorAll("iframe[data-wpconsent-src]").forEach((t2) => {
        const n2 = t2.getAttribute("data-wpconsent-category"), o = t2.getAttribute("data-wpconsent-name");
        if (this.shouldUnlockContent(e2, o, n2)) {
          const e3 = t2.getAttribute("data-wpconsent-src");
          e3 && (t2.src = e3), t2.removeAttribute("data-wpconsent-src"), t2.removeAttribute("data-wpconsent-name"), t2.removeAttribute("data-wpconsent-category");
        }
      }), document.querySelectorAll(".wpconsent-iframe-placeholder").forEach((t2) => {
        const n2 = t2.getAttribute("data-wpconsent-category"), o = t2.getAttribute("data-wpconsent-name");
        if (this.shouldUnlockContent(e2, o, n2)) {
          const e3 = t2.querySelector(".wpconsent-iframe-thumbnail"), n3 = t2.querySelector(".wpconsent-iframe-overlay-content");
          e3 && e3.remove(), n3 && n3.remove(), t2.classList.remove("wpconsent-iframe-placeholder");
        }
      });
    }, init: function() {
      this.runSettingsHooks().then(() => {
        this.initHost(), this.updateButtonVisibility(wpconsent);
        const e2 = document.getElementById("wpconsent-container"), t2 = document.getElementById("wpconsent-template");
        if (e2 && t2) if (this.shadowRoot = e2.shadowRoot, this.shadowRoot) this.runDisplayChecks().then(() => {
          this.processBannerDisplay();
        });
        else {
          this.shadowRoot = e2.attachShadow({ mode: "open" });
          const n2 = t2.content.cloneNode(true);
          this.shadowRoot.appendChild(n2), t2.remove(), this.initializeEventListeners(), this.initializeAccordions(), this.initializeKeyboardHandlers(), this.runDisplayChecks().then(() => {
            this.processBannerDisplay();
          });
        }
      });
    }, processBannerDisplay: function() {
      this.checkGPC();
      const e2 = this.getCookie("wpconsent_preferences");
      if (e2) {
        let t2 = {};
        try {
          if (t2 = JSON.parse(e2), wpconsent.slugs && Array.isArray(wpconsent.slugs) && !wpconsent.slugs.every((e3) => t2.hasOwnProperty(e3))) return this.setCookie("wpconsent_preferences", "", -1), void (this.checksPassed && this.showBanner());
          this.unlockScripts(t2), this.unlockIframes(t2);
        } catch (e3) {
          console.error("Error parsing WPConsent preferences:", e3);
        }
        this.showFloatingButtonIfEnabled();
      } else if (this.checksPassed && this.showBanner(), wpconsent.default_allow || !wpconsent.enable_script_blocking) {
        const e3 = {};
        wpconsent.slugs.forEach((t2) => {
          e3[t2] = true;
        }), this.unlockScripts(e3), this.unlockIframes(e3);
      } else if (!wpconsent.enable_content_blocking) {
        const e3 = {};
        wpconsent.slugs.forEach((t2) => {
          e3[t2] = true;
        }), this.unlockIframes(e3);
      }
      document.querySelectorAll(".wpconsent-iframe-overlay-content.wpconsent-content-hidden").forEach(function(e3) {
        e3.classList.remove("wpconsent-content-hidden");
      }), window.dispatchEvent(new CustomEvent("wpconsent_banner_initialized"));
    }, ensureCSS: function() {
      if (this.cssPromise) return this.cssPromise;
      const e2 = document.getElementById("wpconsent-container");
      return this.cssPromise = this.loadExternalCSS(e2), this.cssPromise;
    }, revealContainer: function(e2) {
      e2 && (e2.style.display = "block");
    }, loadExternalCSS: function(e2) {
      return new Promise((t2) => {
        if (this.shadowRoot && this.shadowRoot.querySelector("link[data-wpconsent-css]")) return this.revealContainer(e2), void t2();
        if (!this.shadowRoot) return void t2();
        const n2 = `${wpconsent.css_url}?ver=${wpconsent.css_version}`;
        let o = false;
        const s = () => {
          o || (o = true, t2());
        }, c = (t3) => {
          let o2 = null;
          const r = document.createElement("link");
          r.rel = "stylesheet", r.href = 1 === t3 ? n2 : `${n2}&wpcretry=${t3}`, r.setAttribute("data-wpconsent-css", "");
          const i = () => {
            o2 && (clearTimeout(o2), o2 = null), r.onload = null, r.onerror = null;
          }, a = (o3) => {
            i(), r.parentNode && r.parentNode.removeChild(r), t3 < 2 && !o3 ? c(t3 + 1) : (this.applyCSSFallback(e2, n2), s());
          };
          r.onload = () => {
            i(), this.revealContainer(e2), s();
          }, r.onerror = () => a(false), o2 = setTimeout(() => a(true), 5e3);
          try {
            this.shadowRoot.appendChild(r);
          } catch (e3) {
            console.error("WPConsent: failed to inject stylesheet link:", e3), a();
          }
        };
        c(1);
      });
    }, applyCSSFallback: function(e2, t2) {
      if (this.shadowRoot && !this.shadowRoot.querySelector("style[data-wpconsent-css-fallback]")) {
        const e3 = document.createElement("style");
        e3.setAttribute("data-wpconsent-css-fallback", ""), e3.textContent = "\n#wpconsent-banner-holder {\n	display: none;\n	position: fixed;\n	left: 0;\n	right: 0;\n	bottom: 0;\n	z-index: var(--wpconsent-z-index, 900000);\n}\n#wpconsent-banner-holder.wpconsent-banner-visible {\n	display: block;\n}\n#wpconsent-banner-holder .wpconsent-banner {\n	box-sizing: border-box;\n	margin: 10px;\n	padding: var(--wpconsent-padding, 15px 20px);\n	background: var(--wpconsent-background, #ffffff);\n	color: var(--wpconsent-text, #1a1a1a);\n	border-radius: 10px;\n	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);\n	font-size: var(--wpconsent-font-size, 14px);\n	line-height: 1.4;\n}\n#wpconsent-banner-holder .wpconsent-banner-footer {\n	display: flex;\n	flex-wrap: wrap;\n	gap: 8px;\n	margin-top: 12px;\n}\n#wpconsent-banner-holder button,\n#wpconsent-preferences-modal button {\n	cursor: pointer;\n	padding: 8px 16px;\n	border: 1px solid rgba(0, 0, 0, 0.2);\n	border-radius: 4px;\n	font-size: inherit;\n}\n#wpconsent-banner-holder .wpconsent-accept-all,\n#wpconsent-preferences-modal .wpconsent-accept-all {\n	background: var(--wpconsent-accept-bg, #2563eb);\n	color: var(--wpconsent-accept-color, #ffffff);\n	border-color: transparent;\n}\n#wpconsent-banner-holder .wpconsent-cancel-cookies,\n#wpconsent-preferences-modal .wpconsent-cancel-cookies {\n	background: var(--wpconsent-cancel-bg, #f3f4f6);\n	color: var(--wpconsent-cancel-color, #1a1a1a);\n}\n#wpconsent-preferences-modal {\n	position: fixed;\n	top: 0;\n	left: 0;\n	width: 100%;\n	height: 100%;\n	background-color: rgba(0, 0, 0, 0.5);\n	z-index: 10202020;\n	align-items: center;\n	justify-content: center;\n}\n#wpconsent-preferences-modal .wpconsent-preferences-content {\n	box-sizing: border-box;\n	width: 800px;\n	max-width: 90%;\n	max-height: 90vh;\n	margin: auto;\n	padding: 20px;\n	overflow: auto;\n	background: var(--wpconsent-background, #ffffff);\n	color: var(--wpconsent-text, #1a1a1a);\n	border-radius: 10px;\n	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);\n}\n#wpconsent-consent-floating {\n	display: none;\n	position: fixed;\n	bottom: 20px;\n	left: 20px;\n	z-index: 9999;\n	cursor: pointer;\n}\n#wpconsent-gpc-toast {\n	position: fixed;\n	bottom: 20px;\n	right: 20px;\n	max-width: 280px;\n	padding: 10px 14px;\n	z-index: calc(var(--wpconsent-z-index, 900000) + 1);\n	background: var(--wpconsent-background, #ffffff);\n	color: var(--wpconsent-text, #1a1a1a);\n	border-radius: 8px;\n	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n", this.shadowRoot.appendChild(e3);
      }
      this.revealContainer(e2), console.error(`WPConsent: failed to load styles from ${t2}; showing the consent UI with fallback styling.`), window.dispatchEvent(new CustomEvent("wpconsent_css_failed", { detail: { url: t2 } }));
    }, initializeEventListeners: function() {
      this.shadowRoot.querySelectorAll(".wpconsent-accept-all").forEach((e3) => e3.addEventListener("click", () => this.acceptAll())), this.shadowRoot.querySelectorAll(".wpconsent-cancel-cookies").forEach((e3) => e3.addEventListener("click", () => {
        const e4 = {};
        wpconsent.slugs.forEach((t2) => {
          const n2 = this.shadowRoot.querySelector(`#wpconsent-preferences-modal input[type="checkbox"][id="cookie-service-${t2}"]`);
          n2 && n2.disabled ? e4[t2] = true : e4[t2] = false;
        }), e4.essential = true, this.savePreferences(e4);
      })), this.shadowRoot.querySelector("#wpconsent-banner-close")?.addEventListener("click", () => this.hideBanner()), this.shadowRoot.querySelector("#wpconsent-preferences-all")?.addEventListener("click", () => this.showPreferences());
      const e2 = this.shadowRoot.querySelector("#wpconsent-consent-floating");
      e2 && e2.addEventListener("click", () => this.showPreferences()), this.initializeCheckboxListeners(), document.addEventListener("click", (e3) => {
        const t2 = e3.target.closest(".wpconsent-iframe-accept-button");
        if (t2) {
          const e4 = t2.getAttribute("data-category"), n2 = t2.closest(".wpconsent-iframe-placeholder"), o = n2?.getAttribute("data-wpconsent-name");
          if (e4) {
            let t3 = {};
            try {
              t3 = JSON.parse(this.getCookie("wpconsent_preferences") || "{}");
            } catch (e5) {
              console.error("Failed to parse wpconsent_preferences cookie:", e5);
            }
            const n3 = true === navigator.globalPrivacyControl, s = true === t3.respect_gpc;
            if (wpconsent.respect_gpc && n3 && s) this.showPreferences().then(() => {
              const t4 = this.shadowRoot.querySelector(`#cookie-category-${e4}`);
              if (t4 && (t4.checked = true), o) {
                const e5 = this.shadowRoot.querySelector(`#cookie-service-${o}`);
                e5 && (e5.checked = true);
              }
              const n4 = this.shadowRoot.querySelector("#wpconsent-gpc-override-container");
              n4 && (n4.style.display = "block"), this.highlightGPCOverride();
            });
            else {
              const n4 = { ...t3, essential: true, [e4]: true };
              o && (n4[o] = true), this.savePreferences(n4);
            }
          }
        }
      }), document.addEventListener("click", (e3) => {
        e3.target.closest(".wpconsent-open-preferences") && (e3.preventDefault(), this.showPreferences());
      }), this.shadowRoot.querySelector(".wpconsent-preferences-header-close")?.addEventListener("click", () => this.closePreferences()), this.shadowRoot.querySelector(".wpconsent-save-preferences")?.addEventListener("click", () => {
        const e3 = this.shadowRoot.querySelectorAll('#wpconsent-preferences-modal input[type="checkbox"]'), t2 = Array.from(e3).filter((e4) => e4.checked).map((e4) => e4.value), n2 = {};
        wpconsent.slugs.forEach((e4) => {
          n2[e4] = t2.includes(e4);
        }), n2.essential = true, this.savePreferences(n2);
      }), this.shadowRoot.querySelector(".wpconsent-close-preferences")?.addEventListener("click", () => this.closePreferences()), window.addEventListener("wpconsent_consent_saved", function(e3) {
        if ("function" != typeof window.clarity) return;
        const t2 = e3.detail;
        window.clarity("consentv2", { ad_Storage: t2.marketing ? "granted" : "denied", analytics_Storage: t2.statistics ? "granted" : "denied" });
      });
    }, localGtag: function() {
      window.dataLayer = window.dataLayer || [], function() {
        dataLayer.push(arguments);
      }.apply(window, arguments);
    }, initializeCheckboxListeners: function() {
      this.shadowRoot.querySelectorAll('#wpconsent-preferences-modal input[type="checkbox"][id^="cookie-category-"]').forEach((e2) => {
        e2.addEventListener("change", (e3) => {
          this.handleCategoryCheckboxChange(e3.target);
        });
      }), this.shadowRoot.querySelectorAll('#wpconsent-preferences-modal input[type="checkbox"][id^="cookie-service-"]').forEach((e2) => {
        e2.addEventListener("change", (e3) => {
          this.handleServiceCheckboxChange(e3.target);
        });
      });
    }, handleCategoryCheckboxChange: function(e2) {
      const t2 = e2.id.replace("cookie-category-", "");
      this.shadowRoot.querySelectorAll('#wpconsent-preferences-modal input[type="checkbox"][id^="cookie-service-"]').forEach((n2) => {
        n2.closest(`.wpconsent-cookie-category-${t2}`) && (n2.checked = e2.checked);
      });
    }, handleServiceCheckboxChange: function(e2) {
      const t2 = e2.closest(".wpconsent-cookie-category");
      if (!t2) return;
      const n2 = t2.querySelector('input[type="checkbox"][id^="cookie-category-"]');
      if (!n2) return;
      const o = t2.querySelectorAll('input[type="checkbox"][id^="cookie-service-"]');
      let s = false;
      o.forEach((e3) => {
        e3.checked && (s = true);
      }), n2.checked = s;
    }, initializeAccordions() {
      this.shadowRoot.querySelectorAll(".wpconsent-preferences-accordion-item").forEach((e2) => {
        const t2 = e2.querySelector(".wpconsent-preferences-accordion-header"), n2 = e2.querySelector(".wpconsent-preferences-accordion-content");
        t2 && n2 && t2.addEventListener("click", (t3) => {
          t3.target.closest(".wpconsent-preferences-checkbox-toggle") || this.toggleAccordion(e2, n2);
        });
      });
    }, toggleAccordion(e2, t2) {
      e2.classList.contains("active");
      const n2 = e2.parentElement, o = e2.classList.contains("wpconsent-cookie-service"), s = e2.classList.contains("wpconsent-cookie-category");
      s ? n2 && n2.querySelectorAll(":scope > .wpconsent-preferences-accordion-item.wpconsent-cookie-category").forEach((t3) => {
        if (t3 !== e2) {
          t3.classList.remove("active");
          const e3 = t3.querySelector(".wpconsent-preferences-accordion-toggle");
          e3 && e3.setAttribute("aria-expanded", "false"), t3.querySelectorAll(".wpconsent-cookie-service").forEach((e4) => {
            e4.classList.remove("active");
            const t4 = e4.querySelector(".wpconsent-preferences-accordion-toggle");
            t4 && t4.setAttribute("aria-expanded", "false"), this.runHooks("accordionToggled", { accordion: e4, content: e4.querySelector(".wpconsent-preferences-accordion-content"), isActive: false, isService: true, isCategory: false });
          });
        }
      }) : o && n2 && n2.querySelectorAll(":scope > .wpconsent-preferences-accordion-item.wpconsent-cookie-service").forEach((t3) => {
        if (t3 !== e2) {
          t3.classList.remove("active");
          const e3 = t3.querySelector(".wpconsent-preferences-accordion-toggle");
          e3 && e3.setAttribute("aria-expanded", "false"), this.runHooks("accordionToggled", { accordion: t3, content: t3.querySelector(".wpconsent-preferences-accordion-content"), isActive: false, isService: true, isCategory: false });
        }
      }), e2.classList.toggle("active");
      const c = e2.querySelector(".wpconsent-preferences-accordion-toggle");
      if (c) {
        const t3 = e2.classList.contains("active");
        c.setAttribute("aria-expanded", t3 ? "true" : "false");
      }
      const r = e2.classList.contains("active");
      this.runHooks("accordionToggled", { accordion: e2, content: t2, isActive: r, isService: o, isCategory: s });
    }, initializeKeyboardHandlers: function() {
      document.addEventListener("keydown", (e2) => {
        "Tab" === e2.key ? this.handleTabKey(e2) : "Escape" === e2.key && this.handleEscapeKey(e2);
      });
    }, handleEscapeKey: function(e2) {
      const t2 = this.shadowRoot?.querySelector("#wpconsent-preferences-modal"), n2 = this.shadowRoot?.querySelector("#wpconsent-banner-holder");
      t2 && "flex" === t2.style.display ? this.closePreferences() : n2 && n2.classList.contains("wpconsent-banner-visible") && this.hideBanner();
    }, handleTabKey: function(e2) {
      const t2 = this.shadowRoot?.querySelector("#wpconsent-banner-holder"), n2 = this.shadowRoot?.querySelector("#wpconsent-preferences-modal"), o = t2 && t2.classList.contains("wpconsent-banner-visible"), s = n2 && "flex" === n2.style.display;
      if (!o && !s) return;
      const c = s ? n2 : t2, r = this.getFocusableElements(c);
      if (0 === r.length) return;
      e2.preventDefault();
      const i = r[0], a = r[r.length - 1];
      let l;
      this.lastFocusedElement && r.includes(this.lastFocusedElement) ? l = this.lastFocusedElement : (l = i, this.lastFocusedElement = l);
      const d = r.indexOf(l);
      let p;
      p = e2.shiftKey ? d <= 0 ? a : r[d - 1] : d >= r.length - 1 ? i : r[d + 1], p.focus({ preventScroll: true }), this.lastFocusedElement = p;
    }, setupFocusTrap: function(e2) {
      this.previouslyFocusedElement = document.activeElement, this.lastFocusedElement = null;
    }, removeFocusTrap: function() {
      this.lastFocusedElement = null;
    }, setInitialFocus: function(e2) {
      const t2 = this.getFocusableElements(e2);
      t2.length > 0 && setTimeout(() => {
        t2[0].focus({ preventScroll: true }), this.lastFocusedElement = t2[0];
      }, 100);
    }, getFocusableElements: function(e2) {
      return Array.from(e2.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((t2) => {
        let n2 = t2;
        for (; n2 && n2 !== e2; ) {
          const e3 = window.getComputedStyle(n2);
          if ("none" === e3.display || "hidden" === e3.visibility || "0" === e3.opacity || n2.disabled || "true" === n2.getAttribute("aria-hidden")) return false;
          n2 = n2.parentElement;
        }
        return true;
      });
    }, isElementInContainer: function(e2, t2) {
      return !(!e2 || !t2) && (t2.shadowRoot ? t2.shadowRoot.contains(e2) : t2.contains(e2));
    }, clearCookies: function() {
      for (var e2 = document.cookie.split("; "), t2 = 0; t2 < e2.length; t2++) for (var n2 = window.location.hostname.split("."); n2.length > 0; ) {
        var o = encodeURIComponent(e2[t2].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + n2.join(".") + " ;path=", s = location.pathname.split("/");
        for (document.cookie = o + "/"; s.length > 0; ) document.cookie = o + s.join("/"), s.pop();
        n2.shift();
      }
    }, initHost: function() {
      window.wp_consent_type = wpconsent.consent_type;
      let e2 = new CustomEvent("wp_consent_type_defined");
      document.dispatchEvent(e2);
    }, showFloatingButtonIfEnabled: function() {
      wpconsent.enable_consent_floating && this.ensureCSS().then(() => {
        const e2 = this.shadowRoot?.querySelector("#wpconsent-consent-floating");
        e2 && (e2.style.display = "block");
      });
    }, updateButtonVisibility: function(e2) {
      this.shadowRoot && ["accept", "cancel", "preferences"].forEach((t2) => {
        const n2 = this.shadowRoot.querySelector(`#wpconsent-${t2}-all`);
        n2 && (e2[`${t2}_button_enabled`] ? (n2.classList.remove("wpconsent-button-disabled"), n2.removeAttribute("data-disabled")) : (n2.classList.add("wpconsent-button-disabled"), n2.setAttribute("data-disabled", "true")));
      });
    }, updateHostConsent: function(e2) {
      "function" == typeof wp_set_consent && (wp_set_consent("functional", "allow"), wp_set_consent("preferences", "allow"), wp_set_consent("statistics", e2.statistics ? "allow" : "deny"), wp_set_consent("statistics-anonymous", e2.statistics ? "allow" : "deny"), wp_set_consent("marketing", e2.marketing ? "allow" : "deny"));
    } }, document.addEventListener("DOMContentLiteSpeedLoaded", () => WPConsent.init());
  } }, t = {};
  function n(o) {
    var s = t[o];
    if (void 0 !== s) return s.exports;
    var c = t[o] = { exports: {} };
    return e[o](c, c.exports, n), c.exports;
  }
  n.n = (e2) => {
    var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
    return n.d(t2, { a: t2 }), t2;
  }, n.d = (e2, t2) => {
    for (var o in t2) n.o(t2, o) && !n.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: t2[o] });
  }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), (() => {
    "use strict";
    n(799);
  })();
})();
(() => {
  "use strict";
  var e, r, _, t, a, n = {}, i = {};
  function __webpack_require__(e2) {
    var r2 = i[e2];
    if (void 0 !== r2) return r2.exports;
    var _2 = i[e2] = { id: e2, loaded: false, exports: {} };
    return n[e2].call(_2.exports, _2, _2.exports, __webpack_require__), _2.loaded = true, _2.exports;
  }
  __webpack_require__.m = n, e = [], __webpack_require__.O = (r2, _2, t2, a2) => {
    if (!_2) {
      var n2 = 1 / 0;
      for (b = 0; b < e.length; b++) {
        for (var [_2, t2, a2] = e[b], i2 = true, c = 0; c < _2.length; c++) (false & a2 || n2 >= a2) && Object.keys(__webpack_require__.O).every((e2) => __webpack_require__.O[e2](_2[c])) ? _2.splice(c--, 1) : (i2 = false, a2 < n2 && (n2 = a2));
        if (i2) {
          e.splice(b--, 1);
          var o = t2();
          void 0 !== o && (r2 = o);
        }
      }
      return r2;
    }
    a2 = a2 || 0;
    for (var b = e.length; b > 0 && e[b - 1][2] > a2; b--) e[b] = e[b - 1];
    e[b] = [_2, t2, a2];
  }, _ = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, __webpack_require__.t = function(e2, t2) {
    if (1 & t2 && (e2 = this(e2)), 8 & t2) return e2;
    if ("object" == typeof e2 && e2) {
      if (4 & t2 && e2.__esModule) return e2;
      if (16 & t2 && "function" == typeof e2.then) return e2;
    }
    var a2 = /* @__PURE__ */ Object.create(null);
    __webpack_require__.r(a2);
    var n2 = {};
    r = r || [null, _({}), _([]), _(_)];
    for (var i2 = 2 & t2 && e2; ("object" == typeof i2 || "function" == typeof i2) && !~r.indexOf(i2); i2 = _(i2)) Object.getOwnPropertyNames(i2).forEach((r2) => n2[r2] = () => e2[r2]);
    return n2.default = () => e2, __webpack_require__.d(a2, n2), a2;
  }, __webpack_require__.d = (e2, r2) => {
    for (var _2 in r2) __webpack_require__.o(r2, _2) && !__webpack_require__.o(e2, _2) && Object.defineProperty(e2, _2, { enumerable: true, get: r2[_2] });
  }, __webpack_require__.f = {}, __webpack_require__.e = (e2) => Promise.all(Object.keys(__webpack_require__.f).reduce((r2, _2) => (__webpack_require__.f[_2](e2, r2), r2), [])), __webpack_require__.u = (e2) => 786 === e2 ? "397f2d183c19202777d6.bundle.min.js" : 216 === e2 ? "lightbox.570c05c5a283cfb6b223.bundle.min.js" : 30 === e2 ? "text-path.a67c1f3a78d208bc7e1b.bundle.min.js" : 131 === e2 ? "accordion.8b0db5058afeb74622f5.bundle.min.js" : 707 === e2 ? "alert.b4336601ffdb6086d1b5.bundle.min.js" : 457 === e2 ? "counter.12335f45aaa79d244f24.bundle.min.js" : 234 === e2 ? "progress.0ea083b809812c0e3aa1.bundle.min.js" : 575 === e2 ? "tabs.18344b05d8d1ea0702bc.bundle.min.js" : 775 === e2 ? "toggle.2a177a3ef4785d3dfbc5.bundle.min.js" : 180 === e2 ? "video.86d44e46e43d0807e708.bundle.min.js" : 177 === e2 ? "image-carousel.6167d20b95b33386757b.bundle.min.js" : 212 === e2 ? "text-editor.45609661e409413f1cef.bundle.min.js" : 211 === e2 ? "wp-audio.c9624cb6e5dc9de86abd.bundle.min.js" : 215 === e2 ? "nested-tabs.a2401356d329f179475e.bundle.min.js" : 915 === e2 ? "nested-accordion.294d40984397351fd0f5.bundle.min.js" : 1 === e2 ? "contact-buttons.e98d0220ce8c38404e7e.bundle.min.js" : 336 === e2 ? "floating-bars.740d06d17cea5cebdb61.bundle.min.js" : 557 === e2 ? "shared-frontend-handlers.03caa53373b56d3bab67.bundle.min.js" : 396 === e2 ? "shared-editor-handlers.cacdcbed391abf4b48b0.bundle.min.js" : 768 === e2 ? "container-editor-handlers.a2e8e48d28c5544fb183.bundle.min.js" : 77 === e2 ? "section-frontend-handlers.d85ab872da118940910d.bundle.min.js" : 220 === e2 ? "section-editor-handlers.53ffedef32043348b99b.bundle.min.js" : 304 === e2 ? "nested-title-keyboard-handler.2a67d3cc630e11815acc.bundle.min.js" : void 0, __webpack_require__.g = (function() {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e2) {
      if ("object" == typeof window) return window;
    }
  })(), __webpack_require__.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t = {}, a = "elementorFrontend:", __webpack_require__.l = (e2, r2, _2, n2) => {
    if (t[e2]) t[e2].push(r2);
    else {
      var i2, c;
      if (void 0 !== _2) for (var o = document.getElementsByTagName("script"), b = 0; b < o.length; b++) {
        var d = o[b];
        if (d.getAttribute("src") == e2 || d.getAttribute("data-webpack") == a + _2) {
          i2 = d;
          break;
        }
      }
      i2 || (c = true, (i2 = document.createElement("script")).charset = "utf-8", __webpack_require__.nc && i2.setAttribute("nonce", __webpack_require__.nc), i2.setAttribute("data-webpack", a + _2), i2.src = e2), t[e2] = [r2];
      var onScriptComplete = (r3, _3) => {
        i2.onerror = i2.onload = null, clearTimeout(u);
        var a2 = t[e2];
        if (delete t[e2], i2.parentNode && i2.parentNode.removeChild(i2), a2 && a2.forEach((e3) => e3(_3)), r3) return r3(_3);
      }, u = setTimeout(onScriptComplete.bind(null, void 0, { type: "timeout", target: i2 }), 12e4);
      i2.onerror = onScriptComplete.bind(null, i2.onerror), i2.onload = onScriptComplete.bind(null, i2.onload), c && document.head.appendChild(i2);
    }
  }, __webpack_require__.r = (e2) => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
  }, __webpack_require__.nmd = (e2) => (e2.paths = [], e2.children || (e2.children = []), e2), (() => {
    var e2;
    __webpack_require__.g.importScripts && (e2 = __webpack_require__.g.location + "");
    var r2 = __webpack_require__.g.document;
    if (!e2 && r2 && (r2.currentScript && "SCRIPT" === r2.currentScript.tagName.toUpperCase() && (e2 = r2.currentScript.src), !e2)) {
      var _2 = r2.getElementsByTagName("script");
      if (_2.length) for (var t2 = _2.length - 1; t2 > -1 && (!e2 || !/^http(s?):/.test(e2)); ) e2 = _2[t2--].src;
    }
    if (!e2) throw new Error("Automatic publicPath is not supported in this browser");
    e2 = e2.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), __webpack_require__.p = e2;
  })(), (() => {
    var e2 = { 76: 0 };
    __webpack_require__.f.j = (r3, _2) => {
      var t2 = __webpack_require__.o(e2, r3) ? e2[r3] : void 0;
      if (0 !== t2) if (t2) _2.push(t2[2]);
      else if (76 != r3) {
        var a2 = new Promise((_3, a3) => t2 = e2[r3] = [_3, a3]);
        _2.push(t2[2] = a2);
        var n2 = __webpack_require__.p + __webpack_require__.u(r3), i2 = new Error();
        __webpack_require__.l(n2, (_3) => {
          if (__webpack_require__.o(e2, r3) && (0 !== (t2 = e2[r3]) && (e2[r3] = void 0), t2)) {
            var a3 = _3 && ("load" === _3.type ? "missing" : _3.type), n3 = _3 && _3.target && _3.target.src;
            i2.message = "Loading chunk " + r3 + " failed.\n(" + a3 + ": " + n3 + ")", i2.name = "ChunkLoadError", i2.type = a3, i2.request = n3, t2[1](i2);
          }
        }, "chunk-" + r3, r3);
      } else e2[r3] = 0;
    }, __webpack_require__.O.j = (r3) => 0 === e2[r3];
    var webpackJsonpCallback = (r3, _2) => {
      var t2, a2, [n2, i2, c] = _2, o = 0;
      if (n2.some((r4) => 0 !== e2[r4])) {
        for (t2 in i2) __webpack_require__.o(i2, t2) && (__webpack_require__.m[t2] = i2[t2]);
        if (c) var b = c(__webpack_require__);
      }
      for (r3 && r3(_2); o < n2.length; o++) a2 = n2[o], __webpack_require__.o(e2, a2) && e2[a2] && e2[a2][0](), e2[a2] = 0;
      return __webpack_require__.O(b);
    }, r2 = self.webpackChunkelementorFrontend = self.webpackChunkelementorFrontend || [];
    r2.forEach(webpackJsonpCallback.bind(null, 0)), r2.push = webpackJsonpCallback.bind(null, r2.push.bind(r2));
  })();
})();
(self.webpackChunkelementorFrontend = self.webpackChunkelementorFrontend || []).push([[941], { 1: (e, t, r) => {
  "use strict";
  var n = r(5578), i = r(7255), s = r(5755), o = r(1866), a = r(6029), c = r(5022), l = n.Symbol, u = i("wks"), p = c ? l.for || l : l && l.withoutSetter || o;
  e.exports = function(e2) {
    return s(u, e2) || (u[e2] = a && s(l, e2) ? l[e2] : p("Symbol." + e2)), u[e2];
  };
}, 41: (e) => {
  "use strict";
  e.exports = function(e2) {
    return { iterator: e2, next: e2.next, done: false };
  };
}, 169: (e, t, r) => {
  "use strict";
  var n = r(4762), i = r(8473), s = r(1483), o = r(5755), a = r(382), c = r(2048).CONFIGURABLE, l = r(7268), u = r(4483), p = u.enforce, d = u.get, h = String, f = Object.defineProperty, g = n("".slice), m = n("".replace), v = n([].join), y = a && !i(function() {
    return 8 !== f(function() {
    }, "length", { value: 8 }).length;
  }), w = String(String).split("String"), b = e.exports = function(e2, t2, r2) {
    "Symbol(" === g(h(t2), 0, 7) && (t2 = "[" + m(h(t2), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), r2 && r2.getter && (t2 = "get " + t2), r2 && r2.setter && (t2 = "set " + t2), (!o(e2, "name") || c && e2.name !== t2) && (a ? f(e2, "name", { value: t2, configurable: true }) : e2.name = t2), y && r2 && o(r2, "arity") && e2.length !== r2.arity && f(e2, "length", { value: r2.arity });
    try {
      r2 && o(r2, "constructor") && r2.constructor ? a && f(e2, "prototype", { writable: false }) : e2.prototype && (e2.prototype = void 0);
    } catch (e3) {
    }
    var n2 = p(e2);
    return o(n2, "source") || (n2.source = v(w, "string" == typeof t2 ? t2 : "")), e2;
  };
  Function.prototype.toString = b(function toString() {
    return s(this) && d(this).source || l(this);
  }, "toString");
}, 274: (e, t, r) => {
  "use strict";
  var n = r(8473);
  e.exports = !n(function() {
    var e2 = function() {
    }.bind();
    return "function" != typeof e2 || e2.hasOwnProperty("prototype");
  });
}, 348: (e, t, r) => {
  "use strict";
  var n = r(1807), i = r(1483), s = r(1704), o = TypeError;
  e.exports = function(e2, t2) {
    var r2, a;
    if ("string" === t2 && i(r2 = e2.toString) && !s(a = n(r2, e2))) return a;
    if (i(r2 = e2.valueOf) && !s(a = n(r2, e2))) return a;
    if ("string" !== t2 && i(r2 = e2.toString) && !s(a = n(r2, e2))) return a;
    throw new o("Can't convert object to primitive value");
  };
}, 382: (e, t, r) => {
  "use strict";
  var n = r(8473);
  e.exports = !n(function() {
    return 7 !== Object.defineProperty({}, 1, { get: function() {
      return 7;
    } })[1];
  });
}, 641: (e, t, r) => {
  "use strict";
  r(5724), r(4846), r(7458), r(9655);
  const Module = function() {
    const e2 = jQuery, t2 = arguments, r2 = this, n = {};
    let i;
    this.getItems = function(e3, t3) {
      if (t3) {
        const r3 = t3.split("."), n2 = r3.splice(0, 1);
        if (!r3.length) return e3[n2];
        if (!e3[n2]) return;
        return this.getItems(e3[n2], r3.join("."));
      }
      return e3;
    }, this.getSettings = function(e3) {
      return this.getItems(i, e3);
    }, this.setSettings = function(t3, n2, s) {
      if (s || (s = i), "object" == typeof t3) return e2.extend(s, t3), r2;
      const o = t3.split("."), a = o.splice(0, 1);
      return o.length ? (s[a] || (s[a] = {}), r2.setSettings(o.join("."), n2, s[a])) : (s[a] = n2, r2);
    }, this.getErrorMessage = function(e3, t3) {
      let r3;
      if ("forceMethodImplementation" === e3) r3 = `The method '${t3}' must to be implemented in the inheritor child.`;
      else r3 = "An error occurs";
      return r3;
    }, this.forceMethodImplementation = function(e3) {
      throw new Error(this.getErrorMessage("forceMethodImplementation", e3));
    }, this.on = function(t3, i2) {
      if ("object" == typeof t3) return e2.each(t3, function(e3) {
        r2.on(e3, this);
      }), r2;
      return t3.split(" ").forEach(function(e3) {
        n[e3] || (n[e3] = []), n[e3].push(i2);
      }), r2;
    }, this.off = function(e3, t3) {
      if (!n[e3]) return r2;
      if (!t3) return delete n[e3], r2;
      const i2 = n[e3].indexOf(t3);
      return -1 !== i2 && (delete n[e3][i2], n[e3] = n[e3].filter((e4) => e4)), r2;
    }, this.trigger = function(t3) {
      const i2 = "on" + t3[0].toUpperCase() + t3.slice(1), s = Array.prototype.slice.call(arguments, 1);
      r2[i2] && r2[i2].apply(r2, s);
      const o = n[t3];
      return o ? (e2.each(o, function(e3, t4) {
        t4.apply(r2, s);
      }), r2) : r2;
    }, r2.__construct.apply(r2, t2), e2.each(r2, function(e3) {
      const t3 = r2[e3];
      "function" == typeof t3 && (r2[e3] = function() {
        return t3.apply(r2, arguments);
      });
    }), (function() {
      i = r2.getDefaultSettings();
      const n2 = t2[0];
      n2 && e2.extend(true, i, n2);
    })(), r2.trigger("init");
  };
  Module.prototype.__construct = function() {
  }, Module.prototype.getDefaultSettings = function() {
    return {};
  }, Module.prototype.getConstructorID = function() {
    return this.constructor.name;
  }, Module.extend = function(e2) {
    const t2 = jQuery, r2 = this, child2 = function() {
      return r2.apply(this, arguments);
    };
    return t2.extend(child2, r2), (child2.prototype = Object.create(t2.extend({}, r2.prototype, e2))).constructor = child2, child2.__super__ = r2.prototype, child2;
  }, e.exports = Module;
}, 670: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(5835), s = r(7738);
  e.exports = function(e2, t2, r2) {
    n ? i.f(e2, t2, s(0, r2)) : e2[t2] = r2;
  };
}, 751: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(5724), r(4846), r(9655);
  class InstanceType {
    static [Symbol.hasInstance](e2) {
      let t2 = super[Symbol.hasInstance](e2);
      if (e2 && !e2.constructor.getInstanceType) return t2;
      if (e2 && (e2.instanceTypes || (e2.instanceTypes = []), t2 || this.getInstanceType() === e2.constructor.getInstanceType() && (t2 = true), t2)) {
        const t3 = this.getInstanceType === InstanceType.getInstanceType ? "BaseInstanceType" : this.getInstanceType();
        -1 === e2.instanceTypes.indexOf(t3) && e2.instanceTypes.push(t3);
      }
      return !t2 && e2 && (t2 = e2.instanceTypes && Array.isArray(e2.instanceTypes) && -1 !== e2.instanceTypes.indexOf(this.getInstanceType())), t2;
    }
    static getInstanceType() {
      elementorModules.ForceMethodImplementation();
    }
    constructor() {
      let e2 = new.target;
      const t2 = [];
      for (; e2.__proto__ && e2.__proto__.name; ) t2.push(e2.__proto__), e2 = e2.__proto__;
      t2.reverse().forEach((e3) => this instanceof e3);
    }
  }
  t.default = InstanceType;
}, 1091: (e) => {
  "use strict";
  var t = TypeError;
  e.exports = function(e2) {
    if (e2 > 9007199254740991) throw t("Maximum allowed index exceeded");
    return e2;
  };
}, 1265: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = n(r(641)), s = n(r(2425)), o = n(r(2946)), a = n(r(3980)), c = n(r(2970)), l = n(r(8685)), u = r(9031), p = r(1462);
  const d = { Module: i.default, ViewModule: s.default, ArgsObject: o.default, ForceMethodImplementation: l.default, utils: { Masonry: a.default, Scroll: c.default }, importExport: { createGetInitialState: u.createGetInitialState, customizationDialogsRegistry: p.customizationDialogsRegistry } };
  window.elementorModules ? Object.assign(window.elementorModules, d) : window.elementorModules = d;
  t.default = window.elementorModules;
}, 1278: (e, t, r) => {
  "use strict";
  var n = r(4762), i = n({}.toString), s = n("".slice);
  e.exports = function(e2) {
    return s(i(e2), 8, -1);
  };
}, 1409: (e, t, r) => {
  "use strict";
  var n = r(5578), i = r(1483);
  e.exports = function(e2, t2) {
    return arguments.length < 2 ? (r2 = n[e2], i(r2) ? r2 : void 0) : n[e2] && n[e2][t2];
    var r2;
  };
}, 1423: (e, t, r) => {
  "use strict";
  var n = r(1409), i = r(1483), s = r(4815), o = r(5022), a = Object;
  e.exports = o ? function(e2) {
    return "symbol" == typeof e2;
  } : function(e2) {
    var t2 = n("Symbol");
    return i(t2) && s(t2.prototype, a(e2));
  };
}, 1462: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.customizationDialogsRegistry = void 0;
  var n = r(7958);
  t.customizationDialogsRegistry = new n.BaseRegistry();
}, 1483: (e) => {
  "use strict";
  var t = "object" == typeof document && document.all;
  e.exports = void 0 === t && void 0 !== t ? function(e2) {
    return "function" == typeof e2 || e2 === t;
  } : function(e2) {
    return "function" == typeof e2;
  };
}, 1506: (e, t, r) => {
  "use strict";
  var n = r(2914), i = r(1807), s = r(2293), o = r(8761), a = r(5299), c = r(6960), l = r(4815), u = r(4887), p = r(6665), d = r(6721), h = TypeError, Result = function(e2, t2) {
    this.stopped = e2, this.result = t2;
  }, f = Result.prototype;
  e.exports = function(e2, t2, r2) {
    var g, m, v, y, w, b, S, x = r2 && r2.that, E = !(!r2 || !r2.AS_ENTRIES), I = !(!r2 || !r2.IS_RECORD), _ = !(!r2 || !r2.IS_ITERATOR), C = !(!r2 || !r2.INTERRUPTED), O = n(t2, x), stop = function(e3) {
      return g && d(g, "normal"), new Result(true, e3);
    }, callFn = function(e3) {
      return E ? (s(e3), C ? O(e3[0], e3[1], stop) : O(e3[0], e3[1])) : C ? O(e3, stop) : O(e3);
    };
    if (I) g = e2.iterator;
    else if (_) g = e2;
    else {
      if (!(m = p(e2))) throw new h(o(e2) + " is not iterable");
      if (a(m)) {
        for (v = 0, y = c(e2); y > v; v++) if ((w = callFn(e2[v])) && l(f, w)) return w;
        return new Result(false);
      }
      g = u(e2, m);
    }
    for (b = I ? e2.next : g.next; !(S = i(b, g)).done; ) {
      try {
        w = callFn(S.value);
      } catch (e3) {
        d(g, "throw", e3);
      }
      if ("object" == typeof w && w && l(f, w)) return w;
    }
    return new Result(false);
  };
}, 1507: (e) => {
  "use strict";
  e.exports = {};
}, 1703: (e) => {
  "use strict";
  var t = Math.ceil, r = Math.floor;
  e.exports = Math.trunc || function trunc(e2) {
    var n = +e2;
    return (n > 0 ? r : t)(n);
  };
}, 1704: (e, t, r) => {
  "use strict";
  var n = r(1483);
  e.exports = function(e2) {
    return "object" == typeof e2 ? null !== e2 : n(e2);
  };
}, 1799: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(8473), s = r(3145);
  e.exports = !n && !i(function() {
    return 7 !== Object.defineProperty(s("div"), "a", { get: function() {
      return 7;
    } }).a;
  });
}, 1807: (e, t, r) => {
  "use strict";
  var n = r(274), i = Function.prototype.call;
  e.exports = n ? i.bind(i) : function() {
    return i.apply(i, arguments);
  };
}, 1831: (e, t, r) => {
  "use strict";
  var n = r(9557), i = r(5578), s = r(2095), o = "__core-js_shared__", a = e.exports = i[o] || s(o, {});
  (a.versions || (a.versions = [])).push({ version: "3.46.0", mode: n ? "pure" : "global", copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)", license: "https://github.com/zloirock/core-js/blob/v3.46.0/LICENSE", source: "https://github.com/zloirock/core-js" });
}, 1851: (e, t, r) => {
  "use strict";
  var n, i, s, o = r(8473), a = r(1483), c = r(1704), l = r(5290), u = r(3181), p = r(7914), d = r(1), h = r(9557), f = d("iterator"), g = false;
  [].keys && ("next" in (s = [].keys()) ? (i = u(u(s))) !== Object.prototype && (n = i) : g = true), !c(n) || o(function() {
    var e2 = {};
    return n[f].call(e2) !== e2;
  }) ? n = {} : h && (n = l(n)), a(n[f]) || p(n, f, function() {
    return this;
  }), e.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: g };
}, 1866: (e, t, r) => {
  "use strict";
  var n = r(4762), i = 0, s = Math.random(), o = n(1.1.toString);
  e.exports = function(e2) {
    return "Symbol(" + (void 0 === e2 ? "" : e2) + ")_" + o(++i + s, 36);
  };
}, 1975: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(1807), s = r(8120), o = r(2293), a = r(41), c = r(8660), l = r(8901), u = r(9557), p = r(6721), d = r(7486), h = r(5267), f = !u && !d("filter", function() {
  }), g = !u && !f && h("filter", TypeError), m = u || f || g, v = c(function() {
    for (var e2, t2, r2 = this.iterator, n2 = this.predicate, s2 = this.next; ; ) {
      if (e2 = o(i(s2, r2)), this.done = !!e2.done) return;
      if (t2 = e2.value, l(r2, n2, [t2, this.counter++], true)) return t2;
    }
  });
  n({ target: "Iterator", proto: true, real: true, forced: m }, { filter: function filter(e2) {
    o(this);
    try {
      s(e2);
    } catch (e3) {
      p(this, "throw", e3);
    }
    return g ? i(g, this, e2) : new v(a(this), { predicate: e2 });
  } });
}, 1983: (e, t, r) => {
  "use strict";
  var n = r(6721);
  e.exports = function(e2, t2, r2) {
    for (var i = e2.length - 1; i >= 0; i--) if (void 0 !== e2[i]) try {
      r2 = n(e2[i].iterator, t2, r2);
    } catch (e3) {
      t2 = "throw", r2 = e3;
    }
    if ("throw" === t2) throw r2;
    return r2;
  };
}, 2048: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(5755), s = Function.prototype, o = n && Object.getOwnPropertyDescriptor, a = i(s, "name"), c = a && "something" === function something() {
  }.name, l = a && (!n || n && o(s, "name").configurable);
  e.exports = { EXISTS: a, PROPER: c, CONFIGURABLE: l };
}, 2095: (e, t, r) => {
  "use strict";
  var n = r(5578), i = Object.defineProperty;
  e.exports = function(e2, t2) {
    try {
      i(n, e2, { value: t2, configurable: true, writable: true });
    } catch (r2) {
      n[e2] = t2;
    }
    return t2;
  };
}, 2121: (e, t, r) => {
  "use strict";
  var n = r(4762), i = r(8473), s = r(1278), o = Object, a = n("".split);
  e.exports = i(function() {
    return !o("z").propertyIsEnumerable(0);
  }) ? function(e2) {
    return "String" === s(e2) ? a(e2, "") : o(e2);
  } : o;
}, 2278: (e, t, r) => {
  "use strict";
  var n = r(6742), i = r(4741).concat("length", "prototype");
  t.f = Object.getOwnPropertyNames || function getOwnPropertyNames(e2) {
    return n(e2, i);
  };
}, 2293: (e, t, r) => {
  "use strict";
  var n = r(1704), i = String, s = TypeError;
  e.exports = function(e2) {
    if (n(e2)) return e2;
    throw new s(i(e2) + " is not an object");
  };
}, 2313: (e, t, r) => {
  "use strict";
  var n = r(7914);
  e.exports = function(e2, t2, r2) {
    for (var i in t2) n(e2, i, t2[i], r2);
    return e2;
  };
}, 2347: (e, t, r) => {
  "use strict";
  var n = r(3312), i = Object;
  e.exports = function(e2) {
    return i(n(e2));
  };
}, 2355: (e, t, r) => {
  "use strict";
  var n = r(1807), i = r(1704), s = r(1423), o = r(2564), a = r(348), c = r(1), l = TypeError, u = c("toPrimitive");
  e.exports = function(e2, t2) {
    if (!i(e2) || s(e2)) return e2;
    var r2, c2 = o(e2, u);
    if (c2) {
      if (void 0 === t2 && (t2 = "default"), r2 = n(c2, e2, t2), !i(r2) || s(r2)) return r2;
      throw new l("Can't convert object to primitive value");
    }
    return void 0 === t2 && (t2 = "number"), a(e2, t2);
  };
}, 2425: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = n(r(641));
  t.default = i.default.extend({ elements: null, getDefaultElements: () => ({}), bindEvents() {
  }, onInit() {
    this.initElements(), this.bindEvents();
  }, initElements() {
    this.elements = this.getDefaultElements();
  } });
}, 2564: (e, t, r) => {
  "use strict";
  var n = r(8120), i = r(5983);
  e.exports = function(e2, t2) {
    var r2 = e2[t2];
    return i(r2) ? void 0 : n(r2);
  };
}, 2811: (e, t, r) => {
  "use strict";
  var n = r(1409);
  e.exports = n("document", "documentElement");
}, 2890: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(4846), r(6211);
  class _default extends elementorModules.ViewModule {
    getDefaultSettings() {
      return { selectors: { elements: ".elementor-element", nestedDocumentElements: ".elementor .elementor-element" }, classes: { editMode: "elementor-edit-mode" } };
    }
    getDefaultElements() {
      const e2 = this.getSettings("selectors");
      return { $elements: this.$element.find(e2.elements).not(this.$element.find(e2.nestedDocumentElements)) };
    }
    getDocumentSettings(e2) {
      let t2;
      if (this.isEdit) {
        t2 = {};
        const e3 = elementor.settings.page.model;
        jQuery.each(e3.getActiveControls(), (r2) => {
          t2[r2] = e3.attributes[r2];
        });
      } else t2 = this.$element.data("elementor-settings") || {};
      return this.getItems(t2, e2);
    }
    runElementsHandlers() {
      this.elements.$elements.each((e2, t2) => setTimeout(() => elementorFrontend.elementsHandler.runReadyTrigger(t2)));
    }
    onInit() {
      this.$element = this.getSettings("$element"), super.onInit(), this.isEdit = this.$element.hasClass(this.getSettings("classes.editMode")), this.isEdit ? elementor.on("document:loaded", () => {
        elementor.settings.page.model.on("change", this.onSettingsChange.bind(this));
      }) : this.runElementsHandlers();
    }
    onSettingsChange() {
    }
  }
  t.default = _default;
}, 2914: (e, t, r) => {
  "use strict";
  var n = r(3786), i = r(8120), s = r(274), o = n(n.bind);
  e.exports = function(e2, t2) {
    return i(e2), void 0 === t2 ? e2 : s ? o(e2, t2) : function() {
      return e2.apply(t2, arguments);
    };
  };
}, 2946: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = n(r(751)), s = n(r(5213));
  class ArgsObject extends i.default {
    static getInstanceType() {
      return "ArgsObject";
    }
    constructor(e2) {
      super(), this.args = e2;
    }
    requireArgument(e2, t2 = this.args) {
      if (!Object.prototype.hasOwnProperty.call(t2, e2)) throw Error(`${e2} is required.`);
    }
    requireArgumentType(e2, t2, r2 = this.args) {
      if (this.requireArgument(e2, r2), typeof r2[e2] !== t2) throw Error(`${e2} invalid type: ${t2}.`);
    }
    requireArgumentInstance(e2, t2, r2 = this.args) {
      if (this.requireArgument(e2, r2), !(r2[e2] instanceof t2 || (0, s.default)(r2[e2], t2))) throw Error(`${e2} invalid instance.`);
    }
    requireArgumentConstructor(e2, t2, r2 = this.args) {
      if (this.requireArgument(e2, r2), r2[e2].constructor.toString() !== t2.prototype.constructor.toString()) throw Error(`${e2} invalid constructor type.`);
    }
  }
  t.default = ArgsObject;
}, 2970: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(5724);
  t.default = class Scroll {
    static scrollObserver(e2) {
      let t2 = 0;
      const r2 = { root: e2.root || null, rootMargin: e2.offset || "0px", threshold: ((e3 = 0) => {
        const t3 = [];
        if (e3 > 0 && e3 <= 100) {
          const r3 = 100 / e3;
          for (let e4 = 0; e4 <= 100; e4 += r3) t3.push(e4 / 100);
        } else t3.push(0);
        return t3;
      })(e2.sensitivity) };
      return new IntersectionObserver(function handleIntersect(r3) {
        const n = r3[0].boundingClientRect.y, i = r3[0].isIntersecting, s = n < t2 ? "down" : "up", o = Math.abs(parseFloat((100 * r3[0].intersectionRatio).toFixed(2)));
        e2.callback({ sensitivity: e2.sensitivity, isInViewport: i, scrollPercentage: o, intersectionScrollDirection: s }), t2 = n;
      }, r2);
    }
    static getElementViewportPercentage(e2, t2 = {}) {
      const r2 = e2[0].getBoundingClientRect(), n = t2.start || 0, i = t2.end || 0, s = window.innerHeight * n / 100, o = window.innerHeight * i / 100, a = r2.top - window.innerHeight, c = 0 - a + s, l = r2.top + s + e2.height() - a + o, u = Math.max(0, Math.min(c / l, 1));
      return parseFloat((100 * u).toFixed(2));
    }
    static getPageScrollPercentage(e2 = {}, t2) {
      const r2 = e2.start || 0, n = e2.end || 0, i = t2 || document.documentElement.scrollHeight - document.documentElement.clientHeight, s = i * r2 / 100, o = i + s + i * n / 100;
      return (document.documentElement.scrollTop + document.body.scrollTop + s) / o * 100;
    }
  };
}, 3005: (e, t, r) => {
  "use strict";
  var n = r(1703);
  e.exports = function(e2) {
    var t2 = +e2;
    return t2 != t2 || 0 === t2 ? 0 : n(t2);
  };
}, 3145: (e, t, r) => {
  "use strict";
  var n = r(5578), i = r(1704), s = n.document, o = i(s) && i(s.createElement);
  e.exports = function(e2) {
    return o ? s.createElement(e2) : {};
  };
}, 3181: (e, t, r) => {
  "use strict";
  var n = r(5755), i = r(1483), s = r(2347), o = r(5409), a = r(9441), c = o("IE_PROTO"), l = Object, u = l.prototype;
  e.exports = a ? l.getPrototypeOf : function(e2) {
    var t2 = s(e2);
    if (n(t2, c)) return t2[c];
    var r2 = t2.constructor;
    return i(r2) && t2 instanceof r2 ? r2.prototype : t2 instanceof l ? u : null;
  };
}, 3242: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(1807), s = r(1506), o = r(8120), a = r(2293), c = r(41), l = r(6721), u = r(5267)("find", TypeError);
  n({ target: "Iterator", proto: true, real: true, forced: u }, { find: function find(e2) {
    a(this);
    try {
      o(e2);
    } catch (e3) {
      l(this, "throw", e3);
    }
    if (u) return i(u, this, e2);
    var t2 = c(this), r2 = 0;
    return s(t2, function(t3, n2) {
      if (e2(t3, r2++)) return n2(t3);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  } });
}, 3312: (e, t, r) => {
  "use strict";
  var n = r(5983), i = TypeError;
  e.exports = function(e2) {
    if (n(e2)) throw new i("Can't call method on " + e2);
    return e2;
  };
}, 3392: (e, t, r) => {
  "use strict";
  var n = r(3005), i = Math.max, s = Math.min;
  e.exports = function(e2, t2) {
    var r2 = n(e2);
    return r2 < 0 ? i(r2 + t2, 0) : s(r2, t2);
  };
}, 3617: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(5578), s = r(6021), o = r(2293), a = r(1483), c = r(3181), l = r(3864), u = r(670), p = r(8473), d = r(5755), h = r(1), f = r(1851).IteratorPrototype, g = r(382), m = r(9557), v = "constructor", y = "Iterator", w = h("toStringTag"), b = TypeError, S = i[y], x = m || !a(S) || S.prototype !== f || !p(function() {
    S({});
  }), E = function Iterator2() {
    if (s(this, f), c(this) === f) throw new b("Abstract class Iterator not directly constructable");
  }, defineIteratorPrototypeAccessor = function(e2, t2) {
    g ? l(f, e2, { configurable: true, get: function() {
      return t2;
    }, set: function(t3) {
      if (o(this), this === f) throw new b("You can't redefine this property");
      d(this, e2) ? this[e2] = t3 : u(this, e2, t3);
    } }) : f[e2] = t2;
  };
  d(f, w) || defineIteratorPrototypeAccessor(w, y), !x && d(f, v) && f[v] !== Object || defineIteratorPrototypeAccessor(v, E), E.prototype = f, n({ global: true, constructor: true, forced: x }, { Iterator: E });
}, 3658: (e, t, r) => {
  "use strict";
  var n = r(6742), i = r(4741);
  e.exports = Object.keys || function keys(e2) {
    return n(e2, i);
  };
}, 3786: (e, t, r) => {
  "use strict";
  var n = r(1278), i = r(4762);
  e.exports = function(e2) {
    if ("Function" === n(e2)) return i(e2);
  };
}, 3815: (e, t, r) => {
  "use strict";
  var n = r(2355), i = r(1423);
  e.exports = function(e2) {
    var t2 = n(e2, "string");
    return i(t2) ? t2 : t2 + "";
  };
}, 3864: (e, t, r) => {
  "use strict";
  var n = r(169), i = r(5835);
  e.exports = function(e2, t2, r2) {
    return r2.get && n(r2.get, t2, { getter: true }), r2.set && n(r2.set, t2, { setter: true }), i.f(e2, t2, r2);
  };
}, 3896: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(8473);
  e.exports = n && i(function() {
    return 42 !== Object.defineProperty(function() {
    }, "prototype", { value: 42, writable: false }).prototype;
  });
}, 3980: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(5724);
  var i = n(r(2425));
  t.default = i.default.extend({ getDefaultSettings: () => ({ container: null, items: null, columnsCount: 3, verticalSpaceBetween: 30 }), getDefaultElements() {
    return { $container: jQuery(this.getSettings("container")), $items: jQuery(this.getSettings("items")) };
  }, run() {
    var e2 = [], t2 = this.elements.$container.position().top, r2 = this.getSettings(), n2 = r2.columnsCount;
    t2 += parseInt(this.elements.$container.css("margin-top"), 10), this.elements.$items.each(function(i2) {
      var s = Math.floor(i2 / n2), o = jQuery(this), a = o[0].getBoundingClientRect().height + r2.verticalSpaceBetween;
      if (s) {
        var c = o.position(), l = i2 % n2, u = c.top - t2 - e2[l];
        u -= parseInt(o.css("margin-top"), 10), u *= -1, o.css("margin-top", u + "px"), e2[l] += a;
      } else e2.push(a);
    });
  } });
}, 3991: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(1807), s = r(8120), o = r(2293), a = r(41), c = r(8660), l = r(8901), u = r(6721), p = r(7486), d = r(5267), h = r(9557), f = !h && !p("map", function() {
  }), g = !h && !f && d("map", TypeError), m = h || f || g, v = c(function() {
    var e2 = this.iterator, t2 = o(i(this.next, e2));
    if (!(this.done = !!t2.done)) return l(e2, this.mapper, [t2.value, this.counter++], true);
  });
  n({ target: "Iterator", proto: true, real: true, forced: m }, { map: function map(e2) {
    o(this);
    try {
      s(e2);
    } catch (e3) {
      u(this, "throw", e3);
    }
    return g ? i(g, this, e2) : new v(a(this), { mapper: e2 });
  } });
}, 4338: (e, t, r) => {
  "use strict";
  var n = {};
  n[r(1)("toStringTag")] = "z", e.exports = "[object z]" === String(n);
}, 4347: (e, t) => {
  "use strict";
  t.f = Object.getOwnPropertySymbols;
}, 4364: (e, t, r) => {
  "use strict";
  r(3991);
}, 4483: (e, t, r) => {
  "use strict";
  var n, i, s, o = r(4644), a = r(5578), c = r(1704), l = r(9037), u = r(5755), p = r(1831), d = r(5409), h = r(1507), f = "Object already initialized", g = a.TypeError, m = a.WeakMap;
  if (o || p.state) {
    var v = p.state || (p.state = new m());
    v.get = v.get, v.has = v.has, v.set = v.set, n = function(e2, t2) {
      if (v.has(e2)) throw new g(f);
      return t2.facade = e2, v.set(e2, t2), t2;
    }, i = function(e2) {
      return v.get(e2) || {};
    }, s = function(e2) {
      return v.has(e2);
    };
  } else {
    var y = d("state");
    h[y] = true, n = function(e2, t2) {
      if (u(e2, y)) throw new g(f);
      return t2.facade = e2, l(e2, y, t2), t2;
    }, i = function(e2) {
      return u(e2, y) ? e2[y] : {};
    }, s = function(e2) {
      return u(e2, y);
    };
  }
  e.exports = { set: n, get: i, has: s, enforce: function(e2) {
    return s(e2) ? i(e2) : n(e2, {});
  }, getterFor: function(e2) {
    return function(t2) {
      var r2;
      if (!c(t2) || (r2 = i(t2)).type !== e2) throw new g("Incompatible receiver, " + e2 + " required");
      return r2;
    };
  } };
}, 4644: (e, t, r) => {
  "use strict";
  var n = r(5578), i = r(1483), s = n.WeakMap;
  e.exports = i(s) && /native code/.test(String(s));
}, 4741: (e) => {
  "use strict";
  e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, 4762: (e, t, r) => {
  "use strict";
  var n = r(274), i = Function.prototype, s = i.call, o = n && i.bind.bind(s, s);
  e.exports = n ? o : function(e2) {
    return function() {
      return s.apply(e2, arguments);
    };
  };
}, 4815: (e, t, r) => {
  "use strict";
  var n = r(4762);
  e.exports = n({}.isPrototypeOf);
}, 4846: (e, t, r) => {
  "use strict";
  r(3617);
}, 4887: (e, t, r) => {
  "use strict";
  var n = r(1807), i = r(8120), s = r(2293), o = r(8761), a = r(6665), c = TypeError;
  e.exports = function(e2, t2) {
    var r2 = arguments.length < 2 ? a(e2) : t2;
    if (i(r2)) return s(n(r2, e2));
    throw new c(o(e2) + " is not iterable");
  };
}, 4914: (e, t, r) => {
  "use strict";
  var n = r(1278);
  e.exports = Array.isArray || function isArray(e2) {
    return "Array" === n(e2);
  };
}, 4946: (e, t, r) => {
  "use strict";
  var n = r(6784), i = n(r(1265)), s = n(r(2890)), o = n(r(7955)), a = n(r(8140)), c = n(r(7224)), l = n(r(5633)), u = n(r(9603));
  i.default.frontend = { Document: s.default, tools: { StretchElement: o.default }, handlers: { Base: c.default, StretchedElement: a.default, SwiperBase: l.default, CarouselBase: u.default } };
}, 4961: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(1807), s = r(7611), o = r(7738), a = r(5599), c = r(3815), l = r(5755), u = r(1799), p = Object.getOwnPropertyDescriptor;
  t.f = n ? p : function getOwnPropertyDescriptor(e2, t2) {
    if (e2 = a(e2), t2 = c(t2), u) try {
      return p(e2, t2);
    } catch (e3) {
    }
    if (l(e2, t2)) return o(!i(s.f, e2, t2), e2[t2]);
  };
}, 5022: (e, t, r) => {
  "use strict";
  var n = r(6029);
  e.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;
}, 5213: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = (e2, t2) => {
    t2 = Array.isArray(t2) ? t2 : [t2];
    for (const r of t2) if (e2.constructor.name === r.prototype[Symbol.toStringTag]) return true;
    return false;
  };
}, 5247: (e) => {
  "use strict";
  e.exports = function(e2, t) {
    return { value: e2, done: t };
  };
}, 5267: (e, t, r) => {
  "use strict";
  var n = r(5578);
  e.exports = function(e2, t2) {
    var r2 = n.Iterator, i = r2 && r2.prototype, s = i && i[e2], o = false;
    if (s) try {
      s.call({ next: function() {
        return { done: true };
      }, return: function() {
        o = true;
      } }, -1);
    } catch (e3) {
      e3 instanceof t2 || (o = false);
    }
    if (!o) return s;
  };
}, 5290: (e, t, r) => {
  "use strict";
  var n, i = r(2293), s = r(5799), o = r(4741), a = r(1507), c = r(2811), l = r(3145), u = r(5409), p = "prototype", d = "script", h = u("IE_PROTO"), EmptyConstructor = function() {
  }, scriptTag = function(e2) {
    return "<" + d + ">" + e2 + "</" + d + ">";
  }, NullProtoObjectViaActiveX = function(e2) {
    e2.write(scriptTag("")), e2.close();
    var t2 = e2.parentWindow.Object;
    return e2 = null, t2;
  }, NullProtoObject = function() {
    try {
      n = new ActiveXObject("htmlfile");
    } catch (e3) {
    }
    var e2, t2, r2;
    NullProtoObject = "undefined" != typeof document ? document.domain && n ? NullProtoObjectViaActiveX(n) : (t2 = l("iframe"), r2 = "java" + d + ":", t2.style.display = "none", c.appendChild(t2), t2.src = String(r2), (e2 = t2.contentWindow.document).open(), e2.write(scriptTag("document.F=Object")), e2.close(), e2.F) : NullProtoObjectViaActiveX(n);
    for (var i2 = o.length; i2--; ) delete NullProtoObject[p][o[i2]];
    return NullProtoObject();
  };
  a[h] = true, e.exports = Object.create || function create(e2, t2) {
    var r2;
    return null !== e2 ? (EmptyConstructor[p] = i(e2), r2 = new EmptyConstructor(), EmptyConstructor[p] = null, r2[h] = e2) : r2 = NullProtoObject(), void 0 === t2 ? r2 : s.f(r2, t2);
  };
}, 5299: (e, t, r) => {
  "use strict";
  var n = r(1), i = r(6775), s = n("iterator"), o = Array.prototype;
  e.exports = function(e2) {
    return void 0 !== e2 && (i.Array === e2 || o[s] === e2);
  };
}, 5409: (e, t, r) => {
  "use strict";
  var n = r(7255), i = r(1866), s = n("keys");
  e.exports = function(e2) {
    return s[e2] || (s[e2] = i(e2));
  };
}, 5578: function(e, t, r) {
  "use strict";
  var check = function(e2) {
    return e2 && e2.Math === Math && e2;
  };
  e.exports = check("object" == typeof globalThis && globalThis) || check("object" == typeof window && window) || check("object" == typeof self && self) || check("object" == typeof r.g && r.g) || check("object" == typeof this && this) || /* @__PURE__ */ (function() {
    return this;
  })() || Function("return this")();
}, 5599: (e, t, r) => {
  "use strict";
  var n = r(2121), i = r(3312);
  e.exports = function(e2) {
    return n(i(e2));
  };
}, 5633: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = n(r(7224));
  class SwiperHandlerBase extends i.default {
    getInitialSlide() {
      const e2 = this.getEditSettings();
      return e2.activeItemIndex ? e2.activeItemIndex - 1 : 0;
    }
    getSlidesCount() {
      return this.elements.$slides.length;
    }
    togglePauseOnHover(e2) {
      e2 ? this.elements.$swiperContainer.on({ mouseenter: () => {
        this.swiper.autoplay.stop();
      }, mouseleave: () => {
        this.swiper.autoplay.start();
      } }) : this.elements.$swiperContainer.off("mouseenter mouseleave");
    }
    handleKenBurns() {
      const e2 = this.getSettings();
      this.$activeImageBg && this.$activeImageBg.removeClass(e2.classes.kenBurnsActive), this.activeItemIndex = this.swiper ? this.swiper.activeIndex : this.getInitialSlide(), this.swiper ? this.$activeImageBg = jQuery(this.swiper.slides[this.activeItemIndex]).children("." + e2.classes.slideBackground) : this.$activeImageBg = jQuery(this.elements.$slides[0]).children("." + e2.classes.slideBackground), this.$activeImageBg.addClass(e2.classes.kenBurnsActive);
    }
  }
  t.default = SwiperHandlerBase;
}, 5724: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(2347), s = r(6960), o = r(9273), a = r(1091);
  n({ target: "Array", proto: true, arity: 1, forced: r(8473)(function() {
    return 4294967297 !== [].push.call({ length: 4294967296 }, 1);
  }) || !(function() {
    try {
      Object.defineProperty([], "length", { writable: false }).push();
    } catch (e2) {
      return e2 instanceof TypeError;
    }
  })() }, { push: function push(e2) {
    var t2 = i(this), r2 = s(t2), n2 = arguments.length;
    a(r2 + n2);
    for (var c = 0; c < n2; c++) t2[r2] = arguments[c], r2++;
    return o(t2, r2), r2;
  } });
}, 5755: (e, t, r) => {
  "use strict";
  var n = r(4762), i = r(2347), s = n({}.hasOwnProperty);
  e.exports = Object.hasOwn || function hasOwn(e2, t2) {
    return s(i(e2), t2);
  };
}, 5799: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(3896), s = r(5835), o = r(2293), a = r(5599), c = r(3658);
  t.f = n && !i ? Object.defineProperties : function defineProperties(e2, t2) {
    o(e2);
    for (var r2, n2 = a(t2), i2 = c(t2), l = i2.length, u = 0; l > u; ) s.f(e2, r2 = i2[u++], n2[r2]);
    return e2;
  };
}, 5835: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(1799), s = r(3896), o = r(2293), a = r(3815), c = TypeError, l = Object.defineProperty, u = Object.getOwnPropertyDescriptor, p = "enumerable", d = "configurable", h = "writable";
  t.f = n ? s ? function defineProperty(e2, t2, r2) {
    if (o(e2), t2 = a(t2), o(r2), "function" == typeof e2 && "prototype" === t2 && "value" in r2 && h in r2 && !r2[h]) {
      var n2 = u(e2, t2);
      n2 && n2[h] && (e2[t2] = r2.value, r2 = { configurable: d in r2 ? r2[d] : n2[d], enumerable: p in r2 ? r2[p] : n2[p], writable: false });
    }
    return l(e2, t2, r2);
  } : l : function defineProperty(e2, t2, r2) {
    if (o(e2), t2 = a(t2), o(r2), i) try {
      return l(e2, t2, r2);
    } catch (e3) {
    }
    if ("get" in r2 || "set" in r2) throw new c("Accessors not supported");
    return "value" in r2 && (e2[t2] = r2.value), e2;
  };
}, 5983: (e) => {
  "use strict";
  e.exports = function(e2) {
    return null == e2;
  };
}, 6021: (e, t, r) => {
  "use strict";
  var n = r(4815), i = TypeError;
  e.exports = function(e2, t2) {
    if (n(t2, e2)) return e2;
    throw new i("Incorrect invocation");
  };
}, 6029: (e, t, r) => {
  "use strict";
  var n = r(6477), i = r(8473), s = r(5578).String;
  e.exports = !!Object.getOwnPropertySymbols && !i(function() {
    var e2 = /* @__PURE__ */ Symbol("symbol detection");
    return !s(e2) || !(Object(e2) instanceof Symbol) || !Symbol.sham && n && n < 41;
  });
}, 6145: (e, t, r) => {
  "use strict";
  var n = r(4338), i = r(1483), s = r(1278), o = r(1)("toStringTag"), a = Object, c = "Arguments" === s(/* @__PURE__ */ (function() {
    return arguments;
  })());
  e.exports = n ? s : function(e2) {
    var t2, r2, n2;
    return void 0 === e2 ? "Undefined" : null === e2 ? "Null" : "string" == typeof (r2 = (function(e3, t3) {
      try {
        return e3[t3];
      } catch (e4) {
      }
    })(t2 = a(e2), o)) ? r2 : c ? s(t2) : "Object" === (n2 = s(t2)) && i(t2.callee) ? "Arguments" : n2;
  };
}, 6211: (e, t, r) => {
  "use strict";
  r(3242);
}, 6477: (e, t, r) => {
  "use strict";
  var n, i, s = r(5578), o = r(9461), a = s.process, c = s.Deno, l = a && a.versions || c && c.version, u = l && l.v8;
  u && (i = (n = u.split("."))[0] > 0 && n[0] < 4 ? 1 : +(n[0] + n[1])), !i && o && (!(n = o.match(/Edge\/(\d+)/)) || n[1] >= 74) && (n = o.match(/Chrome\/(\d+)/)) && (i = +n[1]), e.exports = i;
}, 6651: (e, t, r) => {
  "use strict";
  var n = r(5599), i = r(3392), s = r(6960), createMethod = function(e2) {
    return function(t2, r2, o) {
      var a = n(t2), c = s(a);
      if (0 === c) return !e2 && -1;
      var l, u = i(o, c);
      if (e2 && r2 != r2) {
        for (; c > u; ) if ((l = a[u++]) != l) return true;
      } else for (; c > u; u++) if ((e2 || u in a) && a[u] === r2) return e2 || u || 0;
      return !e2 && -1;
    };
  };
  e.exports = { includes: createMethod(true), indexOf: createMethod(false) };
}, 6665: (e, t, r) => {
  "use strict";
  var n = r(6145), i = r(2564), s = r(5983), o = r(6775), a = r(1)("iterator");
  e.exports = function(e2) {
    if (!s(e2)) return i(e2, a) || i(e2, "@@iterator") || o[n(e2)];
  };
}, 6721: (e, t, r) => {
  "use strict";
  var n = r(1807), i = r(2293), s = r(2564);
  e.exports = function(e2, t2, r2) {
    var o, a;
    i(e2);
    try {
      if (!(o = s(e2, "return"))) {
        if ("throw" === t2) throw r2;
        return r2;
      }
      o = n(o, e2);
    } catch (e3) {
      a = true, o = e3;
    }
    if ("throw" === t2) throw r2;
    if (a) throw o;
    return i(o), r2;
  };
}, 6726: (e, t, r) => {
  "use strict";
  var n = r(5755), i = r(9497), s = r(4961), o = r(5835);
  e.exports = function(e2, t2, r2) {
    for (var a = i(t2), c = o.f, l = s.f, u = 0; u < a.length; u++) {
      var p = a[u];
      n(e2, p) || r2 && n(r2, p) || c(e2, p, l(t2, p));
    }
  };
}, 6742: (e, t, r) => {
  "use strict";
  var n = r(4762), i = r(5755), s = r(5599), o = r(6651).indexOf, a = r(1507), c = n([].push);
  e.exports = function(e2, t2) {
    var r2, n2 = s(e2), l = 0, u = [];
    for (r2 in n2) !i(a, r2) && i(n2, r2) && c(u, r2);
    for (; t2.length > l; ) i(n2, r2 = t2[l++]) && (~o(u, r2) || c(u, r2));
    return u;
  };
}, 6775: (e) => {
  "use strict";
  e.exports = {};
}, 6784: (e) => {
  e.exports = function _interopRequireDefault(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }, e.exports.__esModule = true, e.exports.default = e.exports;
}, 6960: (e, t, r) => {
  "use strict";
  var n = r(8324);
  e.exports = function(e2) {
    return n(e2.length);
  };
}, 7224: (e, t, r) => {
  "use strict";
  r(5724), r(4846), r(7458), r(6211), r(9655), e.exports = elementorModules.ViewModule.extend({ $element: null, editorListeners: null, onElementChange: null, onEditSettingsChange: null, onPageSettingsChange: null, isEdit: null, __construct(e2) {
    this.isActive(e2) && (this.$element = e2.$element, this.isEdit = this.$element.hasClass("elementor-element-edit-mode"), this.isEdit && this.addEditorListeners());
  }, isActive: () => true, isElementInTheCurrentDocument() {
    return !!elementorFrontend.isEditMode() && elementor.documents.currentDocument.id.toString() === this.$element[0].closest(".elementor").dataset.elementorId;
  }, findElement(e2) {
    var t2 = this.$element;
    return t2.find(e2).filter(function() {
      return jQuery(this).parent().closest(".elementor-element").is(t2);
    });
  }, getUniqueHandlerID(e2, t2) {
    return e2 || (e2 = this.getModelCID()), t2 || (t2 = this.$element), e2 + t2.attr("data-element_type") + this.getConstructorID();
  }, initEditorListeners() {
    var e2 = this;
    if (e2.editorListeners = [{ event: "element:destroy", to: elementor.channels.data, callback(t2) {
      t2.cid === e2.getModelCID() && e2.onDestroy();
    } }], e2.onElementChange) {
      const t2 = e2.getWidgetType() || e2.getElementType();
      let r2 = "change";
      "global" !== t2 && (r2 += ":" + t2), e2.editorListeners.push({ event: r2, to: elementor.channels.editor, callback(t3, r3) {
        e2.getUniqueHandlerID(r3.model.cid, r3.$el) === e2.getUniqueHandlerID() && e2.onElementChange(t3.model.get("name"), t3, r3);
      } });
    }
    e2.onEditSettingsChange && e2.editorListeners.push({ event: "change:editSettings", to: elementor.channels.editor, callback(t2, r2) {
      if (r2.model.cid !== e2.getModelCID()) return;
      const n = Object.keys(t2.changed)[0];
      e2.onEditSettingsChange(n, t2.changed[n]);
    } }), ["page"].forEach(function(t2) {
      var r2 = "on" + t2[0].toUpperCase() + t2.slice(1) + "SettingsChange";
      e2[r2] && e2.editorListeners.push({ event: "change", to: elementor.settings[t2].model, callback(t3) {
        e2[r2](t3.changed);
      } });
    });
  }, getEditorListeners() {
    return this.editorListeners || this.initEditorListeners(), this.editorListeners;
  }, addEditorListeners() {
    var e2 = this.getUniqueHandlerID();
    this.getEditorListeners().forEach(function(t2) {
      elementorFrontend.addListenerOnce(e2, t2.event, t2.callback, t2.to);
    });
  }, removeEditorListeners() {
    var e2 = this.getUniqueHandlerID();
    this.getEditorListeners().forEach(function(t2) {
      elementorFrontend.removeListeners(e2, t2.event, null, t2.to);
    });
  }, getElementType() {
    return this.$element.data("element_type");
  }, getWidgetType() {
    const e2 = this.$element.data("widget_type");
    if (e2) return e2.split(".")[0];
  }, getID() {
    return this.$element.data("id");
  }, getModelCID() {
    return this.$element.data("model-cid");
  }, getElementSettings(e2) {
    let t2 = {};
    const r2 = this.getModelCID();
    if (this.isEdit && r2) {
      const e3 = elementorFrontend.config.elements.data[r2], n = e3.attributes;
      let i = n.widgetType || n.elType;
      n.isInner && (i = "inner-" + i);
      let s = elementorFrontend.config.elements.keys[i];
      s || (s = elementorFrontend.config.elements.keys[i] = [], jQuery.each(e3.controls, (e4, t3) => {
        (t3.frontend_available || t3.editor_available) && s.push(e4);
      })), jQuery.each(e3.getActiveControls(), function(e4) {
        if (-1 !== s.indexOf(e4)) {
          let r3 = n[e4];
          r3.toJSON && (r3 = r3.toJSON()), t2[e4] = r3;
        }
      });
    } else t2 = this.$element.data("settings") || {};
    return this.getItems(t2, e2);
  }, getEditSettings(e2) {
    var t2 = {};
    return this.isEdit && (t2 = elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes), this.getItems(t2, e2);
  }, getCurrentDeviceSetting(e2) {
    return elementorFrontend.getCurrentDeviceSetting(this.getElementSettings(), e2);
  }, onInit() {
    this.isActive(this.getSettings()) && elementorModules.ViewModule.prototype.onInit.apply(this, arguments);
  }, onDestroy() {
    this.isEdit && this.removeEditorListeners(), this.unbindEvents && this.unbindEvents();
  } });
}, 7255: (e, t, r) => {
  "use strict";
  var n = r(1831);
  e.exports = function(e2, t2) {
    return n[e2] || (n[e2] = t2 || {});
  };
}, 7268: (e, t, r) => {
  "use strict";
  var n = r(4762), i = r(1483), s = r(1831), o = n(Function.toString);
  i(s.inspectSource) || (s.inspectSource = function(e2) {
    return o(e2);
  }), e.exports = s.inspectSource;
}, 7458: (e, t, r) => {
  "use strict";
  r(1975);
}, 7486: (e) => {
  "use strict";
  e.exports = function(e2, t) {
    var r = "function" == typeof Iterator && Iterator.prototype[e2];
    if (r) try {
      r.call({ next: null }, t).next();
    } catch (e3) {
      return true;
    }
  };
}, 7611: (e, t) => {
  "use strict";
  var r = {}.propertyIsEnumerable, n = Object.getOwnPropertyDescriptor, i = n && !r.call({ 1: 2 }, 1);
  t.f = i ? function propertyIsEnumerable(e2) {
    var t2 = n(this, e2);
    return !!t2 && t2.enumerable;
  } : r;
}, 7738: (e) => {
  "use strict";
  e.exports = function(e2, t) {
    return { enumerable: !(1 & e2), configurable: !(2 & e2), writable: !(4 & e2), value: t };
  };
}, 7914: (e, t, r) => {
  "use strict";
  var n = r(1483), i = r(5835), s = r(169), o = r(2095);
  e.exports = function(e2, t2, r2, a) {
    a || (a = {});
    var c = a.enumerable, l = void 0 !== a.name ? a.name : t2;
    if (n(r2) && s(r2, l, a), a.global) c ? e2[t2] = r2 : o(t2, r2);
    else {
      try {
        a.unsafe ? e2[t2] && (c = true) : delete e2[t2];
      } catch (e3) {
      }
      c ? e2[t2] = r2 : i.f(e2, t2, { value: r2, enumerable: false, configurable: !a.nonConfigurable, writable: !a.nonWritable });
    }
    return e2;
  };
}, 7955: (e) => {
  "use strict";
  e.exports = elementorModules.ViewModule.extend({ getDefaultSettings: () => ({ element: null, direction: elementorFrontend.config.is_rtl ? "right" : "left", selectors: { container: window }, considerScrollbar: false, cssOutput: "inline" }), getDefaultElements() {
    return { $element: jQuery(this.getSettings("element")) };
  }, stretch() {
    const e2 = this.getSettings();
    let t;
    try {
      t = jQuery(e2.selectors.container);
    } catch (e3) {
    }
    t && t.length || (t = jQuery(this.getDefaultSettings().selectors.container)), this.reset();
    var r = this.elements.$element, n = t.innerWidth(), i = r.offset().left, s = "fixed" === r.css("position"), o = s ? 0 : i, a = window === t[0];
    if (!a) {
      var c = t.offset().left;
      s && (o = c), i > c && (o = i - c);
    }
    if (e2.considerScrollbar && a) {
      o -= window.innerWidth - n;
    }
    s || (elementorFrontend.config.is_rtl && (o = n - (r.outerWidth() + o)), o = -o), e2.margin && (o += e2.margin);
    var l = {};
    let u = n;
    e2.margin && (u -= 2 * e2.margin), l.width = u + "px", l[e2.direction] = o + "px", "variables" !== e2.cssOutput ? r.css(l) : this.applyCssVariables(r, l);
  }, reset() {
    const e2 = {}, t = this.getSettings(), r = this.elements.$element;
    "variables" !== t.cssOutput ? (e2.width = "", e2[t.direction] = "", r.css(e2)) : this.resetCssVariables(r);
  }, applyCssVariables(e2, t) {
    e2.css("--stretch-width", t.width), t.left ? e2.css("--stretch-left", t.left) : e2.css("--stretch-right", t.right);
  }, resetCssVariables(e2) {
    e2.css({ "--stretch-width": "", "--stretch-left": "", "--stretch-right": "" });
  } });
}, 7958: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.BaseRegistry = void 0, r(4846), r(7458), r(9655), r(4364);
  t.BaseRegistry = class BaseRegistry {
    constructor() {
      this.sections = /* @__PURE__ */ new Map();
    }
    register(e2) {
      if (!e2.key || !e2.title) throw new Error("Template type must have key and title");
      const t2 = this.get(e2.key) || this.formatSection(e2);
      if (e2.children) if (t2.children) {
        const r2 = new Map(t2.children.map((e3) => [e3.key, e3]));
        e2.children.forEach((e3) => {
          const t3 = this.formatSection(e3);
          r2.set(e3.key, t3);
        }), t2.children = Array.from(r2.values());
      } else t2.children = e2.children.map((e3) => this.formatSection(e3));
      this.sections.set(e2.key, t2);
    }
    formatSection({ children: e2, ...t2 }) {
      return { key: t2.key, title: t2.title, description: t2.description || "", useParentDefault: false !== t2.useParentDefault, getInitialState: t2.getInitialState || null, component: t2.component || null, order: t2.order || 10, isAvailable: t2.isAvailable || (() => true), ...t2 };
    }
    getAll() {
      return Array.from(this.sections.values()).filter((e2) => e2.isAvailable()).map((e2) => e2.children ? { ...e2, children: [...e2.children].sort((e3, t2) => e3.order - t2.order) } : e2).sort((e2, t2) => e2.order - t2.order);
    }
    get(e2) {
      return this.sections.get(e2);
    }
  };
}, 8120: (e, t, r) => {
  "use strict";
  var n = r(1483), i = r(8761), s = TypeError;
  e.exports = function(e2) {
    if (n(e2)) return e2;
    throw new s(i(e2) + " is not a function");
  };
}, 8140: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(4846), r(6211);
  var i = n(r(7224));
  class StretchedElement extends i.default {
    getStretchedClass() {
      return "e-stretched";
    }
    getStretchSettingName() {
      return "stretch_element";
    }
    getStretchActiveValue() {
      return "yes";
    }
    bindEvents() {
      const e2 = this.getUniqueHandlerID();
      elementorFrontend.addListenerOnce(e2, "resize", this.stretch), elementorFrontend.addListenerOnce(e2, "sticky:stick", this.stretch, this.$element), elementorFrontend.addListenerOnce(e2, "sticky:unstick", this.stretch, this.$element), elementorFrontend.isEditMode() && (this.onKitChangeStretchContainerChange = this.onKitChangeStretchContainerChange.bind(this), elementor.channels.editor.on("kit:change:stretchContainer", this.onKitChangeStretchContainerChange));
    }
    unbindEvents() {
      elementorFrontend.removeListeners(this.getUniqueHandlerID(), "resize", this.stretch), elementorFrontend.isEditMode() && elementor.channels.editor.off("kit:change:stretchContainer", this.onKitChangeStretchContainerChange);
    }
    isActive(e2) {
      return elementorFrontend.isEditMode() || e2.$element.hasClass(this.getStretchedClass());
    }
    getStretchElementForConfig(e2 = null) {
      return e2 ? this.$element.find(e2) : this.$element;
    }
    getStretchElementConfig() {
      return { element: this.getStretchElementForConfig(), selectors: { container: this.getStretchContainer() }, considerScrollbar: elementorFrontend.isEditMode() && elementorFrontend.config.is_rtl };
    }
    initStretch() {
      this.stretch = this.stretch.bind(this), this.stretchElement = new elementorModules.frontend.tools.StretchElement(this.getStretchElementConfig());
    }
    getStretchContainer() {
      return elementorFrontend.getKitSettings("stretched_section_container") || window;
    }
    isStretchSettingEnabled() {
      return this.getElementSettings(this.getStretchSettingName()) === this.getStretchActiveValue();
    }
    stretch() {
      this.isStretchSettingEnabled() && this.stretchElement.stretch();
    }
    onInit(...e2) {
      this.isActive(this.getSettings()) && (this.initStretch(), super.onInit(...e2), this.stretch());
    }
    onElementChange(e2) {
      this.getStretchSettingName() === e2 && (this.isStretchSettingEnabled() ? this.stretch() : this.stretchElement.reset());
    }
    onKitChangeStretchContainerChange() {
      this.stretchElement.setSettings("selectors.container", this.getStretchContainer()), this.stretch();
    }
  }
  t.default = StretchedElement;
}, 8324: (e, t, r) => {
  "use strict";
  var n = r(3005), i = Math.min;
  e.exports = function(e2) {
    var t2 = n(e2);
    return t2 > 0 ? i(t2, 9007199254740991) : 0;
  };
}, 8473: (e) => {
  "use strict";
  e.exports = function(e2) {
    try {
      return !!e2();
    } catch (e3) {
      return true;
    }
  };
}, 8612: (e, t, r) => {
  "use strict";
  var n = r(5578), i = r(4961).f, s = r(9037), o = r(7914), a = r(2095), c = r(6726), l = r(8730);
  e.exports = function(e2, t2) {
    var r2, u, p, d, h, f = e2.target, g = e2.global, m = e2.stat;
    if (r2 = g ? n : m ? n[f] || a(f, {}) : n[f] && n[f].prototype) for (u in t2) {
      if (d = t2[u], p = e2.dontCallGetSet ? (h = i(r2, u)) && h.value : r2[u], !l(g ? u : f + (m ? "." : "#") + u, e2.forced) && void 0 !== p) {
        if (typeof d == typeof p) continue;
        c(d, p);
      }
      (e2.sham || p && p.sham) && s(d, "sham", true), o(r2, u, d, e2);
    }
  };
}, 8660: (e, t, r) => {
  "use strict";
  var n = r(1807), i = r(5290), s = r(9037), o = r(2313), a = r(1), c = r(4483), l = r(2564), u = r(1851).IteratorPrototype, p = r(5247), d = r(6721), h = r(1983), f = a("toStringTag"), g = "IteratorHelper", m = "WrapForValidIterator", v = "normal", y = "throw", w = c.set, createIteratorProxyPrototype = function(e2) {
    var t2 = c.getterFor(e2 ? m : g);
    return o(i(u), { next: function next() {
      var r2 = t2(this);
      if (e2) return r2.nextHandler();
      if (r2.done) return p(void 0, true);
      try {
        var n2 = r2.nextHandler();
        return r2.returnHandlerResult ? n2 : p(n2, r2.done);
      } catch (e3) {
        throw r2.done = true, e3;
      }
    }, return: function() {
      var r2 = t2(this), i2 = r2.iterator;
      if (r2.done = true, e2) {
        var s2 = l(i2, "return");
        return s2 ? n(s2, i2) : p(void 0, true);
      }
      if (r2.inner) try {
        d(r2.inner.iterator, v);
      } catch (e3) {
        return d(i2, y, e3);
      }
      if (r2.openIters) try {
        h(r2.openIters, v);
      } catch (e3) {
        return d(i2, y, e3);
      }
      return i2 && d(i2, v), p(void 0, true);
    } });
  }, b = createIteratorProxyPrototype(true), S = createIteratorProxyPrototype(false);
  s(S, f, "Iterator Helper"), e.exports = function(e2, t2, r2) {
    var n2 = function Iterator2(n3, i2) {
      i2 ? (i2.iterator = n3.iterator, i2.next = n3.next) : i2 = n3, i2.type = t2 ? m : g, i2.returnHandlerResult = !!r2, i2.nextHandler = e2, i2.counter = 0, i2.done = false, w(this, i2);
    };
    return n2.prototype = t2 ? b : S, n2;
  };
}, 8685: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = t.ForceMethodImplementation = void 0;
  class ForceMethodImplementation extends Error {
    constructor(e2 = {}, t2 = {}) {
      super(`${e2.isStatic ? "static " : ""}${e2.fullName}() should be implemented, please provide '${e2.functionName || e2.fullName}' functionality.`, t2), Object.keys(t2).length && console.error(t2), Error.captureStackTrace(this, ForceMethodImplementation);
    }
  }
  t.ForceMethodImplementation = ForceMethodImplementation;
  t.default = (e2) => {
    const t2 = Error().stack.split("\n")[2].trim(), r = t2.startsWith("at new") ? "constructor" : t2.split(" ")[1], n = {};
    if (n.functionName = r, n.fullName = r, n.functionName.includes(".")) {
      const e3 = n.functionName.split(".");
      n.className = e3[0], n.functionName = e3[1];
    } else n.isStatic = true;
    throw new ForceMethodImplementation(n, e2);
  };
}, 8730: (e, t, r) => {
  "use strict";
  var n = r(8473), i = r(1483), s = /#|\.prototype\./, isForced = function(e2, t2) {
    var r2 = a[o(e2)];
    return r2 === l || r2 !== c && (i(t2) ? n(t2) : !!t2);
  }, o = isForced.normalize = function(e2) {
    return String(e2).replace(s, ".").toLowerCase();
  }, a = isForced.data = {}, c = isForced.NATIVE = "N", l = isForced.POLYFILL = "P";
  e.exports = isForced;
}, 8761: (e) => {
  "use strict";
  var t = String;
  e.exports = function(e2) {
    try {
      return t(e2);
    } catch (e3) {
      return "Object";
    }
  };
}, 8901: (e, t, r) => {
  "use strict";
  var n = r(2293), i = r(6721);
  e.exports = function(e2, t2, r2, s) {
    try {
      return s ? t2(n(r2)[0], r2[1]) : t2(r2);
    } catch (t3) {
      i(e2, "throw", t3);
    }
  };
}, 9031: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.createGetInitialState = function createGetInitialState(e2, t2 = {}) {
    return (r, n) => {
      let i = n;
      if (r.hasOwnProperty("uploadedData")) {
        i = false;
        const t3 = r.uploadedData.manifest.templates, n2 = elementorAppConfig?.["import-export-customization"]?.exportGroups || {};
        for (const r2 in t3) {
          if (n2[t3[r2].doc_type] === e2) {
            i = true;
            break;
          }
        }
      }
      return { enabled: i, ...t2 };
    };
  };
}, 9037: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(5835), s = r(7738);
  e.exports = n ? function(e2, t2, r2) {
    return i.f(e2, t2, s(1, r2));
  } : function(e2, t2, r2) {
    return e2[t2] = r2, e2;
  };
}, 9273: (e, t, r) => {
  "use strict";
  var n = r(382), i = r(4914), s = TypeError, o = Object.getOwnPropertyDescriptor, a = n && !(function() {
    if (void 0 !== this) return true;
    try {
      Object.defineProperty([], "length", { writable: false }).length = 1;
    } catch (e2) {
      return e2 instanceof TypeError;
    }
  })();
  e.exports = a ? function(e2, t2) {
    if (i(e2) && !o(e2, "length").writable) throw new s("Cannot set read only .length");
    return e2.length = t2;
  } : function(e2, t2) {
    return e2.length = t2;
  };
}, 9441: (e, t, r) => {
  "use strict";
  var n = r(8473);
  e.exports = !n(function() {
    function F() {
    }
    return F.prototype.constructor = null, Object.getPrototypeOf(new F()) !== F.prototype;
  });
}, 9461: (e, t, r) => {
  "use strict";
  var n = r(5578).navigator, i = n && n.userAgent;
  e.exports = i ? String(i) : "";
}, 9497: (e, t, r) => {
  "use strict";
  var n = r(1409), i = r(4762), s = r(2278), o = r(4347), a = r(2293), c = i([].concat);
  e.exports = n("Reflect", "ownKeys") || function ownKeys(e2) {
    var t2 = s.f(a(e2)), r2 = o.f;
    return r2 ? c(t2, r2(e2)) : t2;
  };
}, 9557: (e) => {
  "use strict";
  e.exports = false;
}, 9603: (e, t, r) => {
  "use strict";
  var n = r(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(4846), r(6211), r(9655);
  var i = n(r(5633));
  class CarouselHandlerBase extends i.default {
    getDefaultSettings() {
      return { selectors: { carousel: ".swiper", swiperWrapper: ".swiper-wrapper", slideContent: ".swiper-slide", swiperArrow: ".elementor-swiper-button", paginationWrapper: ".swiper-pagination", paginationBullet: ".swiper-pagination-bullet", paginationBulletWrapper: ".swiper-pagination-bullets" } };
    }
    getDefaultElements() {
      const e2 = this.getSettings("selectors"), t2 = { $swiperContainer: this.$element.find(e2.carousel), $swiperWrapper: this.$element.find(e2.swiperWrapper), $swiperArrows: this.$element.find(e2.swiperArrow), $paginationWrapper: this.$element.find(e2.paginationWrapper), $paginationBullets: this.$element.find(e2.paginationBullet), $paginationBulletWrapper: this.$element.find(e2.paginationBulletWrapper) };
      return t2.$slides = t2.$swiperContainer.find(e2.slideContent), t2;
    }
    getSwiperSettings() {
      const e2 = this.getElementSettings(), t2 = +e2.slides_to_show || 3, r2 = 1 === t2, n2 = elementorFrontend.config.responsive.activeBreakpoints, i2 = { mobile: 1, tablet: r2 ? 1 : 2 }, s = { slidesPerView: t2, loop: "yes" === e2.infinite, speed: e2.speed, handleElementorBreakpoints: true, breakpoints: {} };
      let o = t2;
      Object.keys(n2).reverse().forEach((t3) => {
        const r3 = i2[t3] ? i2[t3] : o;
        s.breakpoints[n2[t3].value] = { slidesPerView: +e2["slides_to_show_" + t3] || r3, slidesPerGroup: +e2["slides_to_scroll_" + t3] || 1 }, e2.image_spacing_custom && (s.breakpoints[n2[t3].value].spaceBetween = this.getSpaceBetween(t3)), o = +e2["slides_to_show_" + t3] || r3;
      }), "yes" === e2.autoplay && (s.autoplay = { delay: e2.autoplay_speed, disableOnInteraction: "yes" === e2.pause_on_interaction }), r2 ? (s.effect = e2.effect, "fade" === e2.effect && (s.fadeEffect = { crossFade: true })) : s.slidesPerGroup = +e2.slides_to_scroll || 1, e2.image_spacing_custom && (s.spaceBetween = this.getSpaceBetween());
      const a = "arrows" === e2.navigation || "both" === e2.navigation, c = "dots" === e2.navigation || "both" === e2.navigation || e2.pagination;
      return a && (s.navigation = { prevEl: ".elementor-swiper-button-prev", nextEl: ".elementor-swiper-button-next" }), c && (s.pagination = { el: `.elementor-element-${this.getID()} .swiper-pagination`, type: e2.pagination ? e2.pagination : "bullets", clickable: true, renderBullet: (e3, t3) => `<span class="${t3}" role="button" tabindex="0" data-bullet-index="${e3}" aria-label="${elementorFrontend.config.i18n.a11yCarouselPaginationBulletMessage} ${e3 + 1}"></span>` }), "yes" === e2.lazyload && (s.lazy = { loadPrevNext: true, loadPrevNextAmount: 1 }), s.a11y = { enabled: true, prevSlideMessage: elementorFrontend.config.i18n.a11yCarouselPrevSlideMessage, nextSlideMessage: elementorFrontend.config.i18n.a11yCarouselNextSlideMessage, firstSlideMessage: elementorFrontend.config.i18n.a11yCarouselFirstSlideMessage, lastSlideMessage: elementorFrontend.config.i18n.a11yCarouselLastSlideMessage }, s.on = { slideChange: () => {
        this.a11ySetPaginationTabindex(), this.handleElementHandlers(), this.a11ySetSlideAriaHidden();
      }, init: () => {
        this.a11ySetPaginationTabindex(), this.a11ySetSlideAriaHidden("initialisation");
      } }, this.applyOffsetSettings(e2, s, t2), s;
    }
    getOffsetWidth() {
      const e2 = elementorFrontend.getCurrentDeviceMode();
      return elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), "offset_width", "size", e2) || 0;
    }
    applyOffsetSettings(e2, t2, r2) {
      const n2 = e2.offset_sides;
      if (!(elementorFrontend.isEditMode() && "NestedCarousel" === this.constructor.name) && n2 && "none" !== n2) switch (n2) {
        case "right":
          this.forceSliderToShowNextSlideWhenOnLast(t2, r2), this.addClassToSwiperContainer("offset-right");
          break;
        case "left":
          this.addClassToSwiperContainer("offset-left");
          break;
        case "both":
          this.forceSliderToShowNextSlideWhenOnLast(t2, r2), this.addClassToSwiperContainer("offset-both");
      }
    }
    forceSliderToShowNextSlideWhenOnLast(e2, t2) {
      e2.slidesPerView = t2 + 1e-3;
    }
    addClassToSwiperContainer(e2) {
      this.getDefaultElements().$swiperContainer[0].classList.add(e2);
    }
    async onInit(...e2) {
      if (super.onInit(...e2), !this.elements.$swiperContainer.length || 2 > this.elements.$slides.length) return;
      await this.initSwiper();
      "yes" === this.getElementSettings().pause_on_hover && this.togglePauseOnHover(true);
    }
    async initSwiper() {
      const e2 = elementorFrontend.utils.swiper;
      this.swiper = await new e2(this.elements.$swiperContainer, this.getSwiperSettings()), this.elements.$swiperContainer.data("swiper", this.swiper);
    }
    bindEvents() {
      this.elements.$swiperArrows.on("keydown", this.onDirectionArrowKeydown.bind(this)), this.elements.$paginationWrapper.on("keydown", ".swiper-pagination-bullet", this.onDirectionArrowKeydown.bind(this)), this.elements.$swiperContainer.on("keydown", ".swiper-slide", this.onDirectionArrowKeydown.bind(this)), this.$element.find(":focusable").on("focus", this.onFocusDisableAutoplay.bind(this)), elementorFrontend.elements.$window.on("resize", this.getSwiperSettings.bind(this));
    }
    unbindEvents() {
      this.elements.$swiperArrows.off(), this.elements.$paginationWrapper.off(), this.elements.$swiperContainer.off(), this.$element.find(":focusable").off(), elementorFrontend.elements.$window.off("resize");
    }
    onDirectionArrowKeydown(e2) {
      const t2 = elementorFrontend.config.is_rtl, r2 = e2.originalEvent.code, n2 = t2 ? "ArrowLeft" : "ArrowRight";
      if (!(-1 !== ["ArrowLeft", "ArrowRight"].indexOf(r2))) return true;
      (t2 ? "ArrowRight" : "ArrowLeft") === r2 ? this.swiper.slidePrev() : n2 === r2 && this.swiper.slideNext();
    }
    onFocusDisableAutoplay() {
      this.swiper.autoplay.stop();
    }
    updateSwiperOption(e2) {
      const t2 = this.getElementSettings()[e2], r2 = this.swiper.params;
      switch (e2) {
        case "autoplay_speed":
          r2.autoplay.delay = t2;
          break;
        case "speed":
          r2.speed = t2;
      }
      this.swiper.update();
    }
    getChangeableProperties() {
      return { pause_on_hover: "pauseOnHover", autoplay_speed: "delay", speed: "speed", arrows_position: "arrows_position" };
    }
    onElementChange(e2) {
      if (0 === e2.indexOf("image_spacing_custom")) return void this.updateSpaceBetween(e2);
      if (this.getChangeableProperties()[e2]) if ("pause_on_hover" === e2) {
        const e3 = this.getElementSettings("pause_on_hover");
        this.togglePauseOnHover("yes" === e3);
      } else this.updateSwiperOption(e2);
    }
    onEditSettingsChange(e2) {
      "activeItemIndex" === e2 && this.swiper.slideToLoop(this.getEditSettings("activeItemIndex") - 1);
    }
    getSpaceBetween(e2 = null) {
      const t2 = elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(), "image_spacing_custom", "size", e2);
      return Number(t2) || 0;
    }
    updateSpaceBetween(e2) {
      const t2 = e2.match("image_spacing_custom_(.*)"), r2 = t2 ? t2[1] : "desktop", n2 = this.getSpaceBetween(r2);
      "desktop" !== r2 && (this.swiper.params.breakpoints[elementorFrontend.config.responsive.activeBreakpoints[r2].value].spaceBetween = n2), this.swiper.params.spaceBetween = n2, this.swiper.update();
    }
    getPaginationBullets(e2 = "array") {
      const t2 = this.$element.find(this.getSettings("selectors").paginationBullet);
      return "array" === e2 ? Array.from(t2) : t2;
    }
    a11ySetPaginationTabindex() {
      const e2 = this.swiper?.params?.pagination.bulletClass, t2 = this.swiper?.params?.pagination.bulletActiveClass;
      this.getPaginationBullets().forEach((e3) => {
        e3.classList?.contains(t2) || e3.removeAttribute("tabindex");
      });
      const r2 = "ArrowLeft" === event?.code || "ArrowRight" === event?.code;
      event?.target?.classList?.contains(e2) && r2 && this.$element.find(`.${t2}`).trigger("focus");
    }
    getSwiperWrapperTranformXValue() {
      let e2 = this.elements.$swiperWrapper[0]?.style.transform;
      return e2 = e2.replace("translate3d(", ""), e2 = e2.split(","), e2 = parseInt(e2[0].replace("px", "")), e2 || 0;
    }
    a11ySetSlideAriaHidden(e2 = "") {
      if ("number" != typeof ("initialisation" === e2 ? 0 : this.swiper?.activeIndex)) return;
      const t2 = this.getSwiperWrapperTranformXValue(), r2 = this.elements.$swiperWrapper[0].clientWidth;
      this.elements.$swiperContainer.find(this.getSettings("selectors").slideContent).each((e3, n2) => {
        0 <= n2.offsetLeft + t2 && r2 > n2.offsetLeft + t2 ? (n2.removeAttribute("aria-hidden"), n2.removeAttribute("inert")) : (n2.setAttribute("aria-hidden", true), n2.setAttribute("inert", ""));
      });
    }
    handleElementHandlers() {
    }
  }
  t.default = CarouselHandlerBase;
}, 9655: (e, t, r) => {
  "use strict";
  r(9930);
}, 9930: (e, t, r) => {
  "use strict";
  var n = r(8612), i = r(1807), s = r(1506), o = r(8120), a = r(2293), c = r(41), l = r(6721), u = r(5267)("forEach", TypeError);
  n({ target: "Iterator", proto: true, real: true, forced: u }, { forEach: function forEach(e2) {
    a(this);
    try {
      o(e2);
    } catch (e3) {
      l(this, "throw", e3);
    }
    if (u) return i(u, this, e2);
    var t2 = c(this), r2 = 0;
    s(t2, function(t3) {
      e2(t3, r2++);
    }, { IS_RECORD: true });
  } });
} }, (e) => {
  var t;
  t = 4946, e(e.s = t);
}]);
!(function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function(x) {
  "use strict";
  var t, e, i, n, W, C, o, s, r, l, a, h, u;
  function E(t2, e2, i2) {
    return [parseFloat(t2[0]) * (a.test(t2[0]) ? e2 / 100 : 1), parseFloat(t2[1]) * (a.test(t2[1]) ? i2 / 100 : 1)];
  }
  function L(t2, e2) {
    return parseInt(x.css(t2, e2), 10) || 0;
  }
  function N(t2) {
    return null != t2 && t2 === t2.window;
  }
  x.ui = x.ui || {}, x.ui.version = "1.13.3", /*!
  * jQuery UI :data 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.extend(x.expr.pseudos, { data: x.expr.createPseudo ? x.expr.createPseudo(function(e2) {
    return function(t2) {
      return !!x.data(t2, e2);
    };
  }) : function(t2, e2, i2) {
    return !!x.data(t2, i2[3]);
  } }), /*!
  * jQuery UI Disable Selection 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.fn.extend({ disableSelection: (t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown", function() {
    return this.on(t + ".ui-disableSelection", function(t2) {
      t2.preventDefault();
    });
  }), enableSelection: function() {
    return this.off(".ui-disableSelection");
  } }), /*!
  * jQuery UI Focusable 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.ui.focusable = function(t2, e2) {
    var i2, n2, o2, s2 = t2.nodeName.toLowerCase();
    return "area" === s2 ? (o2 = (i2 = t2.parentNode).name, !(!t2.href || !o2 || "map" !== i2.nodeName.toLowerCase()) && 0 < (i2 = x("img[usemap='#" + o2 + "']")).length && i2.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(s2) ? (n2 = !t2.disabled) && (o2 = x(t2).closest("fieldset")[0]) && (n2 = !o2.disabled) : n2 = "a" === s2 && t2.href || e2, n2 && x(t2).is(":visible") && (function(t3) {
      var e3 = t3.css("visibility");
      for (; "inherit" === e3; ) t3 = t3.parent(), e3 = t3.css("visibility");
      return "visible" === e3;
    })(x(t2)));
  }, x.extend(x.expr.pseudos, { focusable: function(t2) {
    return x.ui.focusable(t2, null != x.attr(t2, "tabindex"));
  } }), x.fn._form = function() {
    return "string" == typeof this[0].form ? this.closest("form") : x(this[0].form);
  }, /*!
  * jQuery UI Form Reset Mixin 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.ui.formResetMixin = { _formResetHandler: function() {
    var e2 = x(this);
    setTimeout(function() {
      var t2 = e2.data("ui-form-reset-instances");
      x.each(t2, function() {
        this.refresh();
      });
    });
  }, _bindFormResetHandler: function() {
    var t2;
    this.form = this.element._form(), this.form.length && ((t2 = this.form.data("ui-form-reset-instances") || []).length || this.form.on("reset.ui-form-reset", this._formResetHandler), t2.push(this), this.form.data("ui-form-reset-instances", t2));
  }, _unbindFormResetHandler: function() {
    var t2;
    this.form.length && ((t2 = this.form.data("ui-form-reset-instances")).splice(x.inArray(this, t2), 1), t2.length ? this.form.data("ui-form-reset-instances", t2) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"));
  } }, x.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), /*!
  * jQuery UI Support for jQuery core 1.8.x and newer 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  *
  */
  x.expr.pseudos || (x.expr.pseudos = x.expr[":"]), x.uniqueSort || (x.uniqueSort = x.unique), x.escapeSelector || (e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, i = function(t2, e2) {
    return e2 ? "\0" === t2 ? "�" : t2.slice(0, -1) + "\\" + t2.charCodeAt(t2.length - 1).toString(16) + " " : "\\" + t2;
  }, x.escapeSelector = function(t2) {
    return (t2 + "").replace(e, i);
  }), x.fn.even && x.fn.odd || x.fn.extend({ even: function() {
    return this.filter(function(t2) {
      return t2 % 2 == 0;
    });
  }, odd: function() {
    return this.filter(function(t2) {
      return t2 % 2 == 1;
    });
  } }), /*!
  * jQuery UI Keycode 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, /*!
  * jQuery UI Labels 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.fn.labels = function() {
    var t2, e2, i2;
    return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e2 = this.eq(0).parents("label"), (t2 = this.attr("id")) && (i2 = (i2 = this.eq(0).parents().last()).add((i2.length ? i2 : this).siblings()), t2 = "label[for='" + x.escapeSelector(t2) + "']", e2 = e2.add(i2.find(t2).addBack(t2))), this.pushStack(e2)) : this.pushStack([]);
  }, x.ui.plugin = { add: function(t2, e2, i2) {
    var n2, o2 = x.ui[t2].prototype;
    for (n2 in i2) o2.plugins[n2] = o2.plugins[n2] || [], o2.plugins[n2].push([e2, i2[n2]]);
  }, call: function(t2, e2, i2, n2) {
    var o2, s2 = t2.plugins[e2];
    if (s2 && (n2 || t2.element[0].parentNode && 11 !== t2.element[0].parentNode.nodeType)) for (o2 = 0; o2 < s2.length; o2++) t2.options[s2[o2][0]] && s2[o2][1].apply(t2.element, i2);
  } }, /*!
  * jQuery UI Position 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  *
  * https://api.jqueryui.com/position/
  */
  W = Math.max, C = Math.abs, o = /left|center|right/, s = /top|center|bottom/, r = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, a = /%$/, h = x.fn.position, x.position = { scrollbarWidth: function() {
    var t2, e2, i2;
    return void 0 !== n ? n : (i2 = (e2 = x("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>")).children()[0], x("body").append(e2), t2 = i2.offsetWidth, e2.css("overflow", "scroll"), t2 === (i2 = i2.offsetWidth) && (i2 = e2[0].clientWidth), e2.remove(), n = t2 - i2);
  }, getScrollInfo: function(t2) {
    var e2 = t2.isWindow || t2.isDocument ? "" : t2.element.css("overflow-x"), i2 = t2.isWindow || t2.isDocument ? "" : t2.element.css("overflow-y"), e2 = "scroll" === e2 || "auto" === e2 && t2.width < t2.element[0].scrollWidth;
    return { width: "scroll" === i2 || "auto" === i2 && t2.height < t2.element[0].scrollHeight ? x.position.scrollbarWidth() : 0, height: e2 ? x.position.scrollbarWidth() : 0 };
  }, getWithinInfo: function(t2) {
    var e2 = x(t2 || window), i2 = N(e2[0]), n2 = !!e2[0] && 9 === e2[0].nodeType;
    return { element: e2, isWindow: i2, isDocument: n2, offset: !i2 && !n2 ? x(t2).offset() : { left: 0, top: 0 }, scrollLeft: e2.scrollLeft(), scrollTop: e2.scrollTop(), width: e2.outerWidth(), height: e2.outerHeight() };
  } }, x.fn.position = function(f2) {
    var c2, d2, p2, g, m, v, y, w, b, _, t2, e2;
    return f2 && f2.of ? (v = "string" == typeof (f2 = x.extend({}, f2)).of ? x(document).find(f2.of) : x(f2.of), y = x.position.getWithinInfo(f2.within), w = x.position.getScrollInfo(y), b = (f2.collision || "flip").split(" "), _ = {}, e2 = 9 === (e2 = (t2 = v)[0]).nodeType ? { width: t2.width(), height: t2.height(), offset: { top: 0, left: 0 } } : N(e2) ? { width: t2.width(), height: t2.height(), offset: { top: t2.scrollTop(), left: t2.scrollLeft() } } : e2.preventDefault ? { width: 0, height: 0, offset: { top: e2.pageY, left: e2.pageX } } : { width: t2.outerWidth(), height: t2.outerHeight(), offset: t2.offset() }, v[0].preventDefault && (f2.at = "left top"), d2 = e2.width, p2 = e2.height, m = x.extend({}, g = e2.offset), x.each(["my", "at"], function() {
      var t3, e3, i2 = (f2[this] || "").split(" ");
      (i2 = 1 === i2.length ? o.test(i2[0]) ? i2.concat(["center"]) : s.test(i2[0]) ? ["center"].concat(i2) : ["center", "center"] : i2)[0] = o.test(i2[0]) ? i2[0] : "center", i2[1] = s.test(i2[1]) ? i2[1] : "center", t3 = r.exec(i2[0]), e3 = r.exec(i2[1]), _[this] = [t3 ? t3[0] : 0, e3 ? e3[0] : 0], f2[this] = [l.exec(i2[0])[0], l.exec(i2[1])[0]];
    }), 1 === b.length && (b[1] = b[0]), "right" === f2.at[0] ? m.left += d2 : "center" === f2.at[0] && (m.left += d2 / 2), "bottom" === f2.at[1] ? m.top += p2 : "center" === f2.at[1] && (m.top += p2 / 2), c2 = E(_.at, d2, p2), m.left += c2[0], m.top += c2[1], this.each(function() {
      var i2, t3, r2 = x(this), l2 = r2.outerWidth(), a2 = r2.outerHeight(), e3 = L(this, "marginLeft"), n2 = L(this, "marginTop"), o2 = l2 + e3 + L(this, "marginRight") + w.width, s2 = a2 + n2 + L(this, "marginBottom") + w.height, h2 = x.extend({}, m), u2 = E(_.my, r2.outerWidth(), r2.outerHeight());
      "right" === f2.my[0] ? h2.left -= l2 : "center" === f2.my[0] && (h2.left -= l2 / 2), "bottom" === f2.my[1] ? h2.top -= a2 : "center" === f2.my[1] && (h2.top -= a2 / 2), h2.left += u2[0], h2.top += u2[1], i2 = { marginLeft: e3, marginTop: n2 }, x.each(["left", "top"], function(t4, e4) {
        x.ui.position[b[t4]] && x.ui.position[b[t4]][e4](h2, { targetWidth: d2, targetHeight: p2, elemWidth: l2, elemHeight: a2, collisionPosition: i2, collisionWidth: o2, collisionHeight: s2, offset: [c2[0] + u2[0], c2[1] + u2[1]], my: f2.my, at: f2.at, within: y, elem: r2 });
      }), f2.using && (t3 = function(t4) {
        var e4 = g.left - h2.left, i3 = e4 + d2 - l2, n3 = g.top - h2.top, o3 = n3 + p2 - a2, s3 = { target: { element: v, left: g.left, top: g.top, width: d2, height: p2 }, element: { element: r2, left: h2.left, top: h2.top, width: l2, height: a2 }, horizontal: i3 < 0 ? "left" : 0 < e4 ? "right" : "center", vertical: o3 < 0 ? "top" : 0 < n3 ? "bottom" : "middle" };
        d2 < l2 && C(e4 + i3) < d2 && (s3.horizontal = "center"), p2 < a2 && C(n3 + o3) < p2 && (s3.vertical = "middle"), W(C(e4), C(i3)) > W(C(n3), C(o3)) ? s3.important = "horizontal" : s3.important = "vertical", f2.using.call(this, t4, s3);
      }), r2.offset(x.extend(h2, { using: t3 }));
    })) : h.apply(this, arguments);
  }, x.ui.position = { fit: { left: function(t2, e2) {
    var i2, n2 = e2.within, o2 = n2.isWindow ? n2.scrollLeft : n2.offset.left, n2 = n2.width, s2 = t2.left - e2.collisionPosition.marginLeft, r2 = o2 - s2, l2 = s2 + e2.collisionWidth - n2 - o2;
    n2 < e2.collisionWidth ? 0 < r2 && l2 <= 0 ? (i2 = t2.left + r2 + e2.collisionWidth - n2 - o2, t2.left += r2 - i2) : t2.left = !(0 < l2 && r2 <= 0) && l2 < r2 ? o2 + n2 - e2.collisionWidth : o2 : 0 < r2 ? t2.left += r2 : 0 < l2 ? t2.left -= l2 : t2.left = W(t2.left - s2, t2.left);
  }, top: function(t2, e2) {
    var i2, n2 = e2.within, n2 = n2.isWindow ? n2.scrollTop : n2.offset.top, o2 = e2.within.height, s2 = t2.top - e2.collisionPosition.marginTop, r2 = n2 - s2, l2 = s2 + e2.collisionHeight - o2 - n2;
    o2 < e2.collisionHeight ? 0 < r2 && l2 <= 0 ? (i2 = t2.top + r2 + e2.collisionHeight - o2 - n2, t2.top += r2 - i2) : t2.top = !(0 < l2 && r2 <= 0) && l2 < r2 ? n2 + o2 - e2.collisionHeight : n2 : 0 < r2 ? t2.top += r2 : 0 < l2 ? t2.top -= l2 : t2.top = W(t2.top - s2, t2.top);
  } }, flip: { left: function(t2, e2) {
    var i2 = e2.within, n2 = i2.offset.left + i2.scrollLeft, o2 = i2.width, i2 = i2.isWindow ? i2.scrollLeft : i2.offset.left, s2 = t2.left - e2.collisionPosition.marginLeft, r2 = s2 - i2, s2 = s2 + e2.collisionWidth - o2 - i2, l2 = "left" === e2.my[0] ? -e2.elemWidth : "right" === e2.my[0] ? e2.elemWidth : 0, a2 = "left" === e2.at[0] ? e2.targetWidth : "right" === e2.at[0] ? -e2.targetWidth : 0, h2 = -2 * e2.offset[0];
    r2 < 0 ? ((o2 = t2.left + l2 + a2 + h2 + e2.collisionWidth - o2 - n2) < 0 || o2 < C(r2)) && (t2.left += l2 + a2 + h2) : 0 < s2 && (0 < (n2 = t2.left - e2.collisionPosition.marginLeft + l2 + a2 + h2 - i2) || C(n2) < s2) && (t2.left += l2 + a2 + h2);
  }, top: function(t2, e2) {
    var i2 = e2.within, n2 = i2.offset.top + i2.scrollTop, o2 = i2.height, i2 = i2.isWindow ? i2.scrollTop : i2.offset.top, s2 = t2.top - e2.collisionPosition.marginTop, r2 = s2 - i2, s2 = s2 + e2.collisionHeight - o2 - i2, l2 = "top" === e2.my[1] ? -e2.elemHeight : "bottom" === e2.my[1] ? e2.elemHeight : 0, a2 = "top" === e2.at[1] ? e2.targetHeight : "bottom" === e2.at[1] ? -e2.targetHeight : 0, h2 = -2 * e2.offset[1];
    r2 < 0 ? ((o2 = t2.top + l2 + a2 + h2 + e2.collisionHeight - o2 - n2) < 0 || o2 < C(r2)) && (t2.top += l2 + a2 + h2) : 0 < s2 && (0 < (n2 = t2.top - e2.collisionPosition.marginTop + l2 + a2 + h2 - i2) || C(n2) < s2) && (t2.top += l2 + a2 + h2);
  } }, flipfit: { left: function() {
    x.ui.position.flip.left.apply(this, arguments), x.ui.position.fit.left.apply(this, arguments);
  }, top: function() {
    x.ui.position.flip.top.apply(this, arguments), x.ui.position.fit.top.apply(this, arguments);
  } } }, x.ui.safeActiveElement = function(e2) {
    var i2;
    try {
      i2 = e2.activeElement;
    } catch (t2) {
      i2 = e2.body;
    }
    return i2 = (i2 = i2 || e2.body).nodeName ? i2 : e2.body;
  }, x.ui.safeBlur = function(t2) {
    t2 && "body" !== t2.nodeName.toLowerCase() && x(t2).trigger("blur");
  }, /*!
  * jQuery UI Scroll Parent 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.fn.scrollParent = function(t2) {
    var e2 = this.css("position"), i2 = "absolute" === e2, n2 = t2 ? /(auto|scroll|hidden)/ : /(auto|scroll)/, t2 = this.parents().filter(function() {
      var t3 = x(this);
      return (!i2 || "static" !== t3.css("position")) && n2.test(t3.css("overflow") + t3.css("overflow-y") + t3.css("overflow-x"));
    }).eq(0);
    return "fixed" !== e2 && t2.length ? t2 : x(this[0].ownerDocument || document);
  }, /*!
  * jQuery UI Tabbable 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.extend(x.expr.pseudos, { tabbable: function(t2) {
    var e2 = x.attr(t2, "tabindex"), i2 = null != e2;
    return (!i2 || 0 <= e2) && x.ui.focusable(t2, i2);
  } }), /*!
  * jQuery UI Unique ID 1.13.3
  * https://jqueryui.com
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license.
  * https://jquery.org/license
  */
  x.fn.extend({ uniqueId: (u = 0, function() {
    return this.each(function() {
      this.id || (this.id = "ui-id-" + ++u);
    });
  }), removeUniqueId: function() {
    return this.each(function() {
      /^ui-id-\d+$/.test(this.id) && x(this).removeAttr("id");
    });
  } });
  var f, c = 0, d = Array.prototype.hasOwnProperty, p = Array.prototype.slice;
  x.cleanData = (f = x.cleanData, function(t2) {
    for (var e2, i2, n2 = 0; null != (i2 = t2[n2]); n2++) (e2 = x._data(i2, "events")) && e2.remove && x(i2).triggerHandler("remove");
    f(t2);
  }), x.widget = function(t2, i2, e2) {
    var n2, o2, s2, r2 = {}, l2 = t2.split(".")[0], a2 = l2 + "-" + (t2 = t2.split(".")[1]);
    return e2 || (e2 = i2, i2 = x.Widget), Array.isArray(e2) && (e2 = x.extend.apply(null, [{}].concat(e2))), x.expr.pseudos[a2.toLowerCase()] = function(t3) {
      return !!x.data(t3, a2);
    }, x[l2] = x[l2] || {}, n2 = x[l2][t2], o2 = x[l2][t2] = function(t3, e3) {
      if (!this || !this._createWidget) return new o2(t3, e3);
      arguments.length && this._createWidget(t3, e3);
    }, x.extend(o2, n2, { version: e2.version, _proto: x.extend({}, e2), _childConstructors: [] }), (s2 = new i2()).options = x.widget.extend({}, s2.options), x.each(e2, function(e3, n3) {
      function o3() {
        return i2.prototype[e3].apply(this, arguments);
      }
      function s3(t3) {
        return i2.prototype[e3].apply(this, t3);
      }
      r2[e3] = "function" != typeof n3 ? n3 : function() {
        var t3, e4 = this._super, i3 = this._superApply;
        return this._super = o3, this._superApply = s3, t3 = n3.apply(this, arguments), this._super = e4, this._superApply = i3, t3;
      };
    }), o2.prototype = x.widget.extend(s2, { widgetEventPrefix: n2 && s2.widgetEventPrefix || t2 }, r2, { constructor: o2, namespace: l2, widgetName: t2, widgetFullName: a2 }), n2 ? (x.each(n2._childConstructors, function(t3, e3) {
      var i3 = e3.prototype;
      x.widget(i3.namespace + "." + i3.widgetName, o2, e3._proto);
    }), delete n2._childConstructors) : i2._childConstructors.push(o2), x.widget.bridge(t2, o2), o2;
  }, x.widget.extend = function(t2) {
    for (var e2, i2, n2 = p.call(arguments, 1), o2 = 0, s2 = n2.length; o2 < s2; o2++) for (e2 in n2[o2]) i2 = n2[o2][e2], d.call(n2[o2], e2) && void 0 !== i2 && (x.isPlainObject(i2) ? t2[e2] = x.isPlainObject(t2[e2]) ? x.widget.extend({}, t2[e2], i2) : x.widget.extend({}, i2) : t2[e2] = i2);
    return t2;
  }, x.widget.bridge = function(s2, e2) {
    var r2 = e2.prototype.widgetFullName || s2;
    x.fn[s2] = function(i2) {
      var t2 = "string" == typeof i2, n2 = p.call(arguments, 1), o2 = this;
      return t2 ? this.length || "instance" !== i2 ? this.each(function() {
        var t3, e3 = x.data(this, r2);
        return "instance" === i2 ? (o2 = e3, false) : e3 ? "function" != typeof e3[i2] || "_" === i2.charAt(0) ? x.error("no such method '" + i2 + "' for " + s2 + " widget instance") : (t3 = e3[i2].apply(e3, n2)) !== e3 && void 0 !== t3 ? (o2 = t3 && t3.jquery ? o2.pushStack(t3.get()) : t3, false) : void 0 : x.error("cannot call methods on " + s2 + " prior to initialization; attempted to call method '" + i2 + "'");
      }) : o2 = void 0 : (n2.length && (i2 = x.widget.extend.apply(null, [i2].concat(n2))), this.each(function() {
        var t3 = x.data(this, r2);
        t3 ? (t3.option(i2 || {}), t3._init && t3._init()) : x.data(this, r2, new e2(i2, this));
      })), o2;
    };
  }, x.Widget = function() {
  }, x.Widget._childConstructors = [], x.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: false, create: null }, _createWidget: function(t2, e2) {
    e2 = x(e2 || this.defaultElement || this)[0], this.element = x(e2), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = x(), this.hoverable = x(), this.focusable = x(), this.classesElementLookup = {}, e2 !== this && (x.data(e2, this.widgetFullName, this), this._on(true, this.element, { remove: function(t3) {
      t3.target === e2 && this.destroy();
    } }), this.document = x(e2.style ? e2.ownerDocument : e2.document || e2), this.window = x(this.document[0].defaultView || this.document[0].parentWindow)), this.options = x.widget.extend({}, this.options, this._getCreateOptions(), t2), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
  }, _getCreateOptions: function() {
    return {};
  }, _getCreateEventData: x.noop, _create: x.noop, _init: x.noop, destroy: function() {
    var i2 = this;
    this._destroy(), x.each(this.classesElementLookup, function(t2, e2) {
      i2._removeClass(e2, t2);
    }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
  }, _destroy: x.noop, widget: function() {
    return this.element;
  }, option: function(t2, e2) {
    var i2, n2, o2, s2 = t2;
    if (0 === arguments.length) return x.widget.extend({}, this.options);
    if ("string" == typeof t2) if (s2 = {}, t2 = (i2 = t2.split(".")).shift(), i2.length) {
      for (n2 = s2[t2] = x.widget.extend({}, this.options[t2]), o2 = 0; o2 < i2.length - 1; o2++) n2[i2[o2]] = n2[i2[o2]] || {}, n2 = n2[i2[o2]];
      if (t2 = i2.pop(), 1 === arguments.length) return void 0 === n2[t2] ? null : n2[t2];
      n2[t2] = e2;
    } else {
      if (1 === arguments.length) return void 0 === this.options[t2] ? null : this.options[t2];
      s2[t2] = e2;
    }
    return this._setOptions(s2), this;
  }, _setOptions: function(t2) {
    for (var e2 in t2) this._setOption(e2, t2[e2]);
    return this;
  }, _setOption: function(t2, e2) {
    return "classes" === t2 && this._setOptionClasses(e2), this.options[t2] = e2, "disabled" === t2 && this._setOptionDisabled(e2), this;
  }, _setOptionClasses: function(t2) {
    var e2, i2, n2;
    for (e2 in t2) n2 = this.classesElementLookup[e2], t2[e2] !== this.options.classes[e2] && n2 && n2.length && (i2 = x(n2.get()), this._removeClass(n2, e2), i2.addClass(this._classes({ element: i2, keys: e2, classes: t2, add: true })));
  }, _setOptionDisabled: function(t2) {
    this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t2), t2 && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
  }, enable: function() {
    return this._setOptions({ disabled: false });
  }, disable: function() {
    return this._setOptions({ disabled: true });
  }, _classes: function(o2) {
    var s2 = [], r2 = this;
    function t2(t3, e2) {
      for (var i2, n2 = 0; n2 < t3.length; n2++) i2 = r2.classesElementLookup[t3[n2]] || x(), i2 = o2.add ? ((function() {
        var i3 = [];
        o2.element.each(function(t4, e3) {
          x.map(r2.classesElementLookup, function(t5) {
            return t5;
          }).some(function(t5) {
            return t5.is(e3);
          }) || i3.push(e3);
        }), r2._on(x(i3), { remove: "_untrackClassesElement" });
      })(), x(x.uniqueSort(i2.get().concat(o2.element.get())))) : x(i2.not(o2.element).get()), r2.classesElementLookup[t3[n2]] = i2, s2.push(t3[n2]), e2 && o2.classes[t3[n2]] && s2.push(o2.classes[t3[n2]]);
    }
    return (o2 = x.extend({ element: this.element, classes: this.options.classes || {} }, o2)).keys && t2(o2.keys.match(/\S+/g) || [], true), o2.extra && t2(o2.extra.match(/\S+/g) || []), s2.join(" ");
  }, _untrackClassesElement: function(i2) {
    var n2 = this;
    x.each(n2.classesElementLookup, function(t2, e2) {
      -1 !== x.inArray(i2.target, e2) && (n2.classesElementLookup[t2] = x(e2.not(i2.target).get()));
    }), this._off(x(i2.target));
  }, _removeClass: function(t2, e2, i2) {
    return this._toggleClass(t2, e2, i2, false);
  }, _addClass: function(t2, e2, i2) {
    return this._toggleClass(t2, e2, i2, true);
  }, _toggleClass: function(t2, e2, i2, n2) {
    var o2 = "string" == typeof t2 || null === t2, e2 = { extra: o2 ? e2 : i2, keys: o2 ? t2 : e2, element: o2 ? this.element : t2, add: n2 = "boolean" == typeof n2 ? n2 : i2 };
    return e2.element.toggleClass(this._classes(e2), n2), this;
  }, _on: function(o2, s2, t2) {
    var r2, l2 = this;
    "boolean" != typeof o2 && (t2 = s2, s2 = o2, o2 = false), t2 ? (s2 = r2 = x(s2), this.bindings = this.bindings.add(s2)) : (t2 = s2, s2 = this.element, r2 = this.widget()), x.each(t2, function(t3, e2) {
      function i2() {
        if (o2 || true !== l2.options.disabled && !x(this).hasClass("ui-state-disabled")) return ("string" == typeof e2 ? l2[e2] : e2).apply(l2, arguments);
      }
      "string" != typeof e2 && (i2.guid = e2.guid = e2.guid || i2.guid || x.guid++);
      var t3 = t3.match(/^([\w:-]*)\s*(.*)$/), n2 = t3[1] + l2.eventNamespace, t3 = t3[2];
      t3 ? r2.on(n2, t3, i2) : s2.on(n2, i2);
    });
  }, _off: function(t2, e2) {
    e2 = (e2 || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t2.off(e2), this.bindings = x(this.bindings.not(t2).get()), this.focusable = x(this.focusable.not(t2).get()), this.hoverable = x(this.hoverable.not(t2).get());
  }, _delay: function(t2, e2) {
    var i2 = this;
    return setTimeout(function() {
      return ("string" == typeof t2 ? i2[t2] : t2).apply(i2, arguments);
    }, e2 || 0);
  }, _hoverable: function(t2) {
    this.hoverable = this.hoverable.add(t2), this._on(t2, { mouseenter: function(t3) {
      this._addClass(x(t3.currentTarget), null, "ui-state-hover");
    }, mouseleave: function(t3) {
      this._removeClass(x(t3.currentTarget), null, "ui-state-hover");
    } });
  }, _focusable: function(t2) {
    this.focusable = this.focusable.add(t2), this._on(t2, { focusin: function(t3) {
      this._addClass(x(t3.currentTarget), null, "ui-state-focus");
    }, focusout: function(t3) {
      this._removeClass(x(t3.currentTarget), null, "ui-state-focus");
    } });
  }, _trigger: function(t2, e2, i2) {
    var n2, o2, s2 = this.options[t2];
    if (i2 = i2 || {}, (e2 = x.Event(e2)).type = (t2 === this.widgetEventPrefix ? t2 : this.widgetEventPrefix + t2).toLowerCase(), e2.target = this.element[0], o2 = e2.originalEvent) for (n2 in o2) n2 in e2 || (e2[n2] = o2[n2]);
    return this.element.trigger(e2, i2), !("function" == typeof s2 && false === s2.apply(this.element[0], [e2].concat(i2)) || e2.isDefaultPrevented());
  } }, x.each({ show: "fadeIn", hide: "fadeOut" }, function(s2, r2) {
    x.Widget.prototype["_" + s2] = function(e2, t2, i2) {
      var n2, o2 = (t2 = "string" == typeof t2 ? { effect: t2 } : t2) ? true !== t2 && "number" != typeof t2 && t2.effect || r2 : s2;
      "number" == typeof (t2 = t2 || {}) ? t2 = { duration: t2 } : true === t2 && (t2 = {}), n2 = !x.isEmptyObject(t2), t2.complete = i2, t2.delay && e2.delay(t2.delay), n2 && x.effects && x.effects.effect[o2] ? e2[s2](t2) : o2 !== s2 && e2[o2] ? e2[o2](t2.duration, t2.easing, i2) : e2.queue(function(t3) {
        x(this)[s2](), i2 && i2.call(e2[0]), t3();
      });
    };
  });
});
"use strict";
(self.webpackChunkelementorFrontend = self.webpackChunkelementorFrontend || []).push([[313], { 607: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class Controls {
    getControlValue(e2, t2, n) {
      let r;
      return r = "object" == typeof e2[t2] && n ? e2[t2][n] : e2[t2], r;
    }
    getResponsiveControlValue(e2, t2, n = "", r = null) {
      const o = r || elementorFrontend.getCurrentDeviceMode(), s = this.getControlValue(e2, t2, n);
      if ("widescreen" === o) {
        const r2 = this.getControlValue(e2, `${t2}_widescreen`, n);
        return r2 || 0 === r2 ? r2 : s;
      }
      const i = elementorFrontend.breakpoints.getActiveBreakpointsList({ withDesktop: true });
      let a = o, l = i.indexOf(o), d = "";
      for (; l <= i.length; ) {
        if ("desktop" === a) {
          d = s;
          break;
        }
        const r2 = `${t2}_${a}`, o2 = this.getControlValue(e2, r2, n);
        if (o2 || 0 === o2) {
          d = o2;
          break;
        }
        l++, a = i[l];
      }
      return d;
    }
  };
}, 680: (e, t, n) => {
  var r = n(4762), o = n(8120);
  e.exports = function(e2, t2, n2) {
    try {
      return r(o(Object.getOwnPropertyDescriptor(e2, t2)[n2]));
    } catch (e3) {
    }
  };
}, 735: (e, t, n) => {
  var r = n(1704);
  e.exports = function(e2) {
    return r(e2) || null === e2;
  };
}, 1780: (e) => {
  e.exports = { IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 }, DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 }, HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 }, WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 }, InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 }, NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 }, NoModificationAllowedError: { s: "NO_MODIFICATION_ALLOWED_ERR", c: 7, m: 1 }, NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 }, NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 }, InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 }, InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 }, SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 }, InvalidModificationError: { s: "INVALID_MODIFICATION_ERR", c: 13, m: 1 }, NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 }, InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 }, ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 }, TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 }, SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 }, NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 }, AbortError: { s: "ABORT_ERR", c: 20, m: 1 }, URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 }, QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 }, TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 }, InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 }, DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 } };
}, 1953: (e, t, n) => {
  var r = n(680), o = n(1704), s = n(3312), i = n(3852);
  e.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
    var e2, t2 = false, n2 = {};
    try {
      (e2 = r(Object.prototype, "__proto__", "set"))(n2, []), t2 = n2 instanceof Array;
    } catch (e3) {
    }
    return function setPrototypeOf(n3, r2) {
      return s(n3), i(r2), o(n3) ? (t2 ? e2(n3, r2) : n3.__proto__ = r2, n3) : n3;
    };
  })() : void 0);
}, 2126: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var r = n(3002);
  t.default = [() => n.e(77).then(n.bind(n, 2439)), () => n.e(557).then(n.bind(n, 628)), () => n.e(557).then(n.bind(n, 3031)), (0, r.createEditorHandler)(() => n.e(396).then(n.bind(n, 9956))), (0, r.createEditorHandler)(() => n.e(220).then(n.bind(n, 3243)))];
}, 2429: (e, t, n) => {
  var r = n(1483), o = n(1704), s = n(1953);
  e.exports = function(e2, t2, n2) {
    var i, a;
    return s && r(i = t2.constructor) && i !== n2 && o(a = i.prototype) && a !== n2.prototype && s(e2, a), e2;
  };
}, 3002: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.createEditorHandler = function createEditorHandler(e2) {
    return () => new Promise((t2) => {
      elementorFrontend.isEditMode() && e2().then(t2);
    });
  };
}, 3126: (e, t, n) => {
  var r = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var o = r(n(8427));
  class VimeoLoader extends o.default {
    getApiURL() {
      return "https://player.vimeo.com/api/player.js";
    }
    getURLRegex() {
      return /^(?:https?:\/\/)?(?:www|player\.)?(?:vimeo\.com\/)?(?:video\/|external\/)?(\d+)([^.?&#"'>]?)/;
    }
    isApiLoaded() {
      return window.Vimeo;
    }
    getApiObject() {
      return Vimeo;
    }
    getAutoplayURL(e2) {
      const t2 = e2.match(/#t=[^&]*/);
      return e2.replace(t2[0], "") + t2;
    }
  }
  t.default = VimeoLoader;
}, 3582: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(6409);
  class _default extends elementorModules.ViewModule {
    getDefaultSettings() {
      return { selectors: { links: 'a[href^="%23elementor-action"], a[href^="#elementor-action"]' } };
    }
    bindEvents() {
      elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), this.runLinkAction.bind(this));
    }
    initActions() {
      this.actions = { lightbox: async (e2) => {
        const t2 = await elementorFrontend.utils.lightbox;
        e2.slideshow ? t2.openSlideshow(e2.slideshow, e2.url) : (e2.id && (e2.type = "image"), t2.showModal(e2));
      } };
    }
    addAction(e2, t2) {
      this.actions[e2] = t2;
    }
    runAction(e2, ...t2) {
      e2 = decodeURI(e2);
      const n2 = (e2 = decodeURIComponent(e2)).match(/action=(.+?)&/);
      if (!n2) return;
      const r = this.actions[n2[1]];
      if (!r) return;
      let o = {};
      const s = e2.match(/settings=(.+)/);
      s && (o = JSON.parse(atob(s[1]))), o.previousEvent = event, r(o, ...t2);
    }
    runLinkAction(e2) {
      e2.preventDefault(), this.runAction(jQuery(e2.currentTarget).attr("href"), e2);
    }
    runHashAction() {
      if (!location.hash) return;
      const e2 = document.querySelector(`[data-e-action-hash="${location.hash}"], a[href*="${location.hash}"]`);
      e2 && this.runAction(e2.getAttribute("data-e-action-hash"));
    }
    createActionHash(e2, t2) {
      return encodeURIComponent(`#elementor-action:action=${e2}&settings=${btoa(JSON.stringify(t2))}`);
    }
    onInit() {
      super.onInit(), this.initActions(), elementorFrontend.on("components:init", this.runHashAction.bind(this));
    }
  }
  t.default = _default;
}, 3678: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var r = n(3002);
  t.default = [() => n.e(557).then(n.bind(n, 628)), () => n.e(557).then(n.bind(n, 3031)), (0, r.createEditorHandler)(() => n.e(396).then(n.bind(n, 9956))), (0, r.createEditorHandler)(() => n.e(768).then(n.bind(n, 8847))), (0, r.createEditorHandler)(() => n.e(768).then(n.bind(n, 3323)))];
}, 3852: (e, t, n) => {
  var r = n(735), o = String, s = TypeError;
  e.exports = function(e2) {
    if (r(e2)) return e2;
    throw new s("Can't set " + o(e2) + " as a prototype");
  };
}, 4047: (e, t, n) => {
  var r = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var o = r(n(2890));
  class _default extends elementorModules.ViewModule {
    constructor(...e2) {
      super(...e2), this.documents = {}, this.initDocumentClasses(), this.attachDocumentsClasses();
    }
    getDefaultSettings() {
      return { selectors: { document: ".elementor" } };
    }
    getDefaultElements() {
      const e2 = this.getSettings("selectors");
      return { $documents: jQuery(e2.document) };
    }
    initDocumentClasses() {
      this.documentClasses = { base: o.default }, elementorFrontend.hooks.doAction("elementor/frontend/documents-manager/init-classes", this);
    }
    addDocumentClass(e2, t2) {
      this.documentClasses[e2] = t2;
    }
    attachDocumentsClasses() {
      this.elements.$documents.each((e2, t2) => this.attachDocumentClass(jQuery(t2)));
    }
    attachDocumentClass(e2) {
      const t2 = e2.data(), n2 = t2.elementorId, r2 = t2.elementorType, o2 = this.documentClasses[r2] || this.documentClasses.base;
      this.documents[n2] = new o2({ $element: e2, id: n2 });
    }
  }
  t.default = _default;
}, 4252: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(4846), n(6211);
  class LightboxManager extends elementorModules.ViewModule {
    static getLightbox() {
      const e2 = new Promise((e3) => {
        Promise.all([n.e(786), n.e(216)]).then(n.t.bind(n, 3942, 23)).then(({ default: t3 }) => e3(new t3()));
      }), t2 = elementorFrontend.utils.assetsLoader.load("script", "dialog"), r = elementorFrontend.utils.assetsLoader.load("style", "dialog"), o = elementorFrontend.utils.assetsLoader.load("script", "share-link"), s = elementorFrontend.utils.assetsLoader.load("style", "swiper"), i = elementorFrontend.utils.assetsLoader.load("style", "e-lightbox");
      return Promise.all([e2, t2, r, o, s, i]).then(() => e2);
    }
    getDefaultSettings() {
      return { selectors: { links: "a, [data-elementor-lightbox]", slideshow: "[data-elementor-lightbox-slideshow]" } };
    }
    getDefaultElements() {
      return { $links: jQuery(this.getSettings("selectors.links")), $slideshow: jQuery(this.getSettings("selectors.slideshow")) };
    }
    isLightboxLink(e2) {
      if ("a" === e2.tagName.toLowerCase() && (e2.hasAttribute("download") || !/^[^?]+\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(e2.href)) && !e2.dataset.elementorLightboxVideo) return false;
      const t2 = elementorFrontend.getKitSettings("global_image_lightbox"), n2 = e2.dataset.elementorOpenLightbox;
      return "yes" === n2 || t2 && "no" !== n2;
    }
    isLightboxSlideshow() {
      return 0 !== this.elements.$slideshow.length;
    }
    async onLinkClick(e2) {
      const t2 = e2.currentTarget, n2 = jQuery(e2.target), r = elementorFrontend.isEditMode(), o = r && elementor.$previewContents.find("body").hasClass("elementor-editor__ui-state__color-picker"), s = !!n2.closest(".elementor-edit-area").length;
      if (!this.isLightboxLink(t2)) return void (r && s && e2.preventDefault());
      if (e2.preventDefault(), r && !elementor.getPreferences("lightbox_in_editor")) return;
      if (o) return;
      (await LightboxManager.getLightbox()).createLightbox(t2);
    }
    bindEvents() {
      elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), (e2) => this.onLinkClick(e2));
    }
    onInit(...e2) {
      super.onInit(...e2), elementorFrontend.isEditMode() || this.maybeActivateLightboxOnLink();
    }
    maybeActivateLightboxOnLink() {
      this.elements.$links.each((e2, t2) => {
        if (this.isLightboxLink(t2)) return LightboxManager.getLightbox(), false;
      });
    }
  }
  t.default = LightboxManager;
}, 4799: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = t.Events = void 0;
  class Events {
    static dispatch(e2, t2, n = null, r = null) {
      e2 = e2 instanceof jQuery ? e2[0] : e2, r && e2.dispatchEvent(new CustomEvent(r, { detail: n })), e2.dispatchEvent(new CustomEvent(t2, { detail: n }));
    }
  }
  t.Events = Events;
  t.default = Events;
}, 4901: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(4846), n(9655);
  t.default = class SwiperHandler {
    constructor(e2, t2) {
      return this.config = t2, this.config.breakpoints && (this.config = this.adjustConfig(t2)), e2 instanceof jQuery && (e2 = e2[0]), e2.closest(".elementor-widget-wrap")?.classList.add("e-swiper-container"), e2.closest(".elementor-widget")?.classList.add("e-widget-swiper"), new Promise((t3) => {
        "undefined" != typeof Swiper ? ("function" == typeof Swiper && void 0 === window.Swiper && (window.Swiper = Swiper), t3(this.createSwiperInstance(e2, this.config))) : elementorFrontend.utils.assetsLoader.load("script", "swiper").then(() => t3(this.createSwiperInstance(e2, this.config)));
      });
    }
    createSwiperInstance(e2, t2) {
      const n2 = window.Swiper;
      return n2.prototype.adjustConfig = this.adjustConfig, new n2(e2, t2 = this.applyMotionPreferences(t2));
    }
    adjustConfig(e2) {
      if (!e2.handleElementorBreakpoints) return e2;
      const t2 = elementorFrontend.config.responsive.activeBreakpoints, n2 = elementorFrontend.breakpoints.getBreakpointValues();
      return Object.keys(e2.breakpoints).forEach((r) => {
        const o = parseInt(r);
        let s;
        if (o === t2.mobile.value || o + 1 === t2.mobile.value) s = 0;
        else if (!t2.widescreen || o !== t2.widescreen.value && o + 1 !== t2.widescreen.value) {
          const e3 = n2.findIndex((e4) => o === e4 || o + 1 === e4);
          s = n2[e3 - 1];
        } else s = o;
        e2.breakpoints[s] = e2.breakpoints[r], e2.breakpoints[r] = { slidesPerView: e2.slidesPerView, slidesPerGroup: e2.slidesPerGroup ? e2.slidesPerGroup : 1 };
      }), e2;
    }
    applyMotionPreferences(e2) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? Object.assign({}, e2, { speed: 0, autoplay: false }) : e2;
    }
  };
}, 4970: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class GlobalHandler extends elementorModules.frontend.handlers.Base {
    getWidgetType() {
      return "global";
    }
    animate() {
      const e2 = this.$element, t2 = this.getAnimation();
      if ("none" === t2) return void e2.removeClass("elementor-invisible");
      const n = this.getElementSettings(), r = n._animation_delay || n.animation_delay || 0;
      e2.removeClass(t2), this.currentAnimation && e2.removeClass(this.currentAnimation), this.currentAnimation = t2, setTimeout(() => {
        e2.removeClass("elementor-invisible").addClass("animated " + t2);
      }, r);
    }
    getAnimation() {
      return this.getCurrentDeviceSetting("animation") || this.getCurrentDeviceSetting("_animation");
    }
    onInit(...e2) {
      if (super.onInit(...e2), this.getAnimation()) {
        const e3 = elementorModules.utils.Scroll.scrollObserver({ callback: (t2) => {
          t2.isInViewport && (this.animate(), e3.unobserve(this.$element[0]));
        } });
        e3.observe(this.$element[0]);
      }
    }
    onElementChange(e2) {
      /^_?animation/.test(e2) && this.animate();
    }
  }
  t.default = (e2) => {
    elementorFrontend.elementsHandler.addHandler(GlobalHandler, { $element: e2 });
  };
}, 5073: (e, t, n) => {
  var r = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var o = r(n(8427));
  class YoutubeLoader extends o.default {
    getApiURL() {
      return "https://www.youtube.com/iframe_api";
    }
    getURLRegex() {
      return /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?vi?=|(?:embed|v|vi|user|shorts)\/))([^?&"'>]+)/;
    }
    isApiLoaded() {
      return window.YT && YT.loaded;
    }
    getApiObject() {
      return YT;
    }
  }
  t.default = YoutubeLoader;
}, 5115: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  const matchUserAgent = (e2) => n.indexOf(e2) >= 0, n = navigator.userAgent, r = !!window.opr && !!opr.addons || !!window.opera || matchUserAgent(" OPR/"), o = matchUserAgent("Firefox"), s = /^((?!chrome|android).)*safari/i.test(n) || /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && safari.pushNotification).toString(), i = /Trident|MSIE/.test(n) && !!document.documentMode, a = !i && !!window.StyleMedia || matchUserAgent("Edg"), l = !!window.chrome && matchUserAgent("Chrome") && !(a || r), d = matchUserAgent("Chrome") && !!window.CSS, c = matchUserAgent("AppleWebKit") && !d, u = { isTouchDevice: "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, appleWebkit: c, blink: d, chrome: l, edge: a, firefox: o, ie: i, mac: matchUserAgent("Macintosh"), opera: r, safari: s, webkit: matchUserAgent("AppleWebKit") };
  t.default = u;
}, 5896: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(5724), n(4846), n(9655), n(4364);
  class Breakpoints extends elementorModules.Module {
    constructor(e2) {
      super(), this.responsiveConfig = e2;
    }
    getActiveBreakpointsList(e2 = {}) {
      e2 = { largeToSmall: false, withDesktop: false, ...e2 };
      const t2 = Object.keys(this.responsiveConfig.activeBreakpoints);
      if (e2.withDesktop) {
        const e3 = -1 === t2.indexOf("widescreen") ? t2.length : t2.length - 1;
        t2.splice(e3, 0, "desktop");
      }
      return e2.largeToSmall && t2.reverse(), t2;
    }
    getBreakpointValues() {
      const { activeBreakpoints: e2 } = this.responsiveConfig, t2 = [];
      return Object.values(e2).forEach((e3) => {
        t2.push(e3.value);
      }), t2;
    }
    getDesktopPreviousDeviceKey() {
      let e2 = "";
      const { activeBreakpoints: t2 } = this.responsiveConfig, n2 = Object.keys(t2), r = n2.length;
      return e2 = "min" === t2[n2[r - 1]].direction ? n2[r - 2] : n2[r - 1], e2;
    }
    getDesktopMinPoint() {
      const { activeBreakpoints: e2 } = this.responsiveConfig;
      return e2[this.getDesktopPreviousDeviceKey()].value + 1;
    }
    getDeviceMinBreakpoint(e2) {
      if ("desktop" === e2) return this.getDesktopMinPoint();
      const { activeBreakpoints: t2 } = this.responsiveConfig, n2 = Object.keys(t2);
      let r;
      if (n2[0] === e2) r = 320;
      else if ("widescreen" === e2) r = t2[e2] ? t2[e2].value : this.responsiveConfig.breakpoints.widescreen;
      else {
        const o = n2.indexOf(e2);
        r = t2[n2[o - 1]].value + 1;
      }
      return r;
    }
    getActiveMatchRegex() {
      return new RegExp(this.getActiveBreakpointsList().map((e2) => "_" + e2).join("|") + "$");
    }
  }
  t.default = Breakpoints;
}, 5956: (e, t, n) => {
  n(5724);
  e.exports = function() {
    var e2, t2 = Array.prototype.slice, n2 = { actions: {}, filters: {} };
    function _removeHook(e3, t3, r, o) {
      var s, i, a;
      if (n2[e3][t3]) if (r) if (s = n2[e3][t3], o) for (a = s.length; a--; ) (i = s[a]).callback === r && i.context === o && s.splice(a, 1);
      else for (a = s.length; a--; ) s[a].callback === r && s.splice(a, 1);
      else n2[e3][t3] = [];
    }
    function _addHook(e3, t3, r, o, s) {
      var i = { callback: r, priority: o, context: s }, a = n2[e3][t3];
      if (a) {
        var l = false;
        if (jQuery.each(a, function() {
          if (this.callback === r) return l = true, false;
        }), l) return;
        a.push(i), a = (function _hookInsertSort(e4) {
          for (var t4, n3, r2, o2 = 1, s2 = e4.length; o2 < s2; o2++) {
            for (t4 = e4[o2], n3 = o2; (r2 = e4[n3 - 1]) && r2.priority > t4.priority; ) e4[n3] = e4[n3 - 1], --n3;
            e4[n3] = t4;
          }
          return e4;
        })(a);
      } else a = [i];
      n2[e3][t3] = a;
    }
    function _runHook(e3, t3, r) {
      var o, s, i = n2[e3][t3];
      if (!i) return "filters" === e3 && r[0];
      if (s = i.length, "filters" === e3) for (o = 0; o < s; o++) r[0] = i[o].callback.apply(i[o].context, r);
      else for (o = 0; o < s; o++) i[o].callback.apply(i[o].context, r);
      return "filters" !== e3 || r[0];
    }
    return e2 = { removeFilter: function removeFilter(t3, n3) {
      return "string" == typeof t3 && _removeHook("filters", t3, n3), e2;
    }, applyFilters: function applyFilters() {
      var n3 = t2.call(arguments), r = n3.shift();
      return "string" == typeof r ? _runHook("filters", r, n3) : e2;
    }, addFilter: function addFilter(t3, n3, r, o) {
      return "string" == typeof t3 && "function" == typeof n3 && _addHook("filters", t3, n3, r = parseInt(r || 10, 10), o), e2;
    }, removeAction: function removeAction(t3, n3) {
      return "string" == typeof t3 && _removeHook("actions", t3, n3), e2;
    }, doAction: function doAction() {
      var n3 = t2.call(arguments), r = n3.shift();
      return "string" == typeof r && _runHook("actions", r, n3), e2;
    }, addAction: function addAction(t3, n3, r, o) {
      return "string" == typeof t3 && "function" == typeof n3 && _addHook("actions", t3, n3, r = parseInt(r || 10, 10), o), e2;
    } }, e2;
  };
}, 6261: (e, t, n) => {
  var r = n(6145), o = String;
  e.exports = function(e2) {
    if ("Symbol" === r(e2)) throw new TypeError("Cannot convert a Symbol value to a string");
    return o(e2);
  };
}, 6409: (e, t, n) => {
  var r = n(8612), o = n(5578), s = n(1409), i = n(7738), a = n(5835).f, l = n(5755), d = n(6021), c = n(2429), u = n(7969), h = n(1780), m = n(8223), f = n(382), p = n(9557), g = "DOMException", v = s("Error"), y = s(g), b = function DOMException() {
    d(this, w);
    var e2 = arguments.length, t2 = u(e2 < 1 ? void 0 : arguments[0]), n2 = u(e2 < 2 ? void 0 : arguments[1], "Error"), r2 = new y(t2, n2), o2 = new v(t2);
    return o2.name = g, a(r2, "stack", i(1, m(o2.stack, 1))), c(r2, this, b), r2;
  }, w = b.prototype = y.prototype, _ = "stack" in new v(g), E = "stack" in new y(1, 2), k = y && f && Object.getOwnPropertyDescriptor(o, g), A = !(!k || k.writable && k.configurable), S = _ && !A && !E;
  r({ global: true, constructor: true, forced: p || S }, { DOMException: S ? b : y });
  var M = s(g), C = M.prototype;
  if (C.constructor !== M) {
    for (var L in p || a(C, "constructor", i(1, M)), h) if (l(h, L)) {
      var D = h[L], R = D.s;
      l(M, R) || a(M, R, i(6, D.c));
    }
  }
}, 7248: (e, t, n) => {
  var r = n(6784);
  n(4846), n(9655);
  var o = r(n(4970)), s = r(n(3678)), i = r(n(2126)), a = r(n(8891));
  e.exports = function(e2) {
    const t2 = {};
    this.elementsHandlers = { "accordion.default": () => n.e(131).then(n.bind(n, 9675)), "alert.default": () => n.e(707).then(n.bind(n, 9624)), "counter.default": () => n.e(457).then(n.bind(n, 3905)), "progress.default": () => n.e(234).then(n.bind(n, 9754)), "tabs.default": () => n.e(575).then(n.bind(n, 3485)), "toggle.default": () => n.e(775).then(n.bind(n, 3049)), "video.default": () => n.e(180).then(n.bind(n, 3774)), "image-carousel.default": () => n.e(177).then(n.bind(n, 4315)), "text-editor.default": () => n.e(212).then(n.bind(n, 5362)), "wp-widget-media_audio.default": () => n.e(211).then(n.bind(n, 2793)), container: s.default, section: i.default, column: a.default }, elementorFrontendConfig.experimentalFeatures["nested-elements"] && (this.elementsHandlers["nested-tabs.default"] = () => n.e(215).then(n.bind(n, 4328))), elementorFrontendConfig.experimentalFeatures["nested-elements"] && (this.elementsHandlers["nested-accordion.default"] = () => n.e(915).then(n.bind(n, 8216))), elementorFrontendConfig.experimentalFeatures.container && (this.elementsHandlers["contact-buttons.default"] = () => n.e(1).then(n.bind(n, 6285)), this.elementsHandlers["floating-bars-var-1.default"] = () => n.e(336).then(n.bind(n, 5199)));
    const addElementsHandlers = () => {
      e2.each(this.elementsHandlers, (e3, t3) => {
        const n2 = e3.split(".");
        e3 = n2[0];
        const r2 = n2[1] || null;
        this.attachHandler(e3, t3, r2);
      });
    }, isClassHandler = (e3) => e3.prototype?.getUniqueHandlerID, addHandlerWithHook = (e3, t3, n2 = "default") => {
      const r2 = e3 + (n2 = n2 ? "." + n2 : "");
      elementorFrontend.hooks.addAction(`frontend/element_ready/${r2}`, (e4) => {
        if (isClassHandler(t3)) this.addHandler(t3, { $element: e4, elementName: r2 }, true);
        else {
          const n3 = t3();
          if (!n3) return;
          n3 instanceof Promise ? n3.then(({ default: t4 }) => {
            this.addHandler(t4, { $element: e4, elementName: r2 }, true);
          }) : this.addHandler(n3, { $element: e4, elementName: r2 }, true);
        }
      });
    };
    this.addHandler = function(n2, r2) {
      const o2 = r2.$element.data("model-cid");
      let s2;
      if (o2) {
        s2 = n2.prototype.getConstructorID(), t2[o2] || (t2[o2] = {});
        const e3 = t2[o2][s2];
        e3 && e3.onDestroy();
      }
      const i2 = new n2(r2);
      elementorFrontend.hooks.doAction(`frontend/element_handler_ready/${r2.elementName}`, r2.$element, e2), o2 && (t2[o2][s2] = i2);
    }, this.attachHandler = (e3, t3, n2) => {
      Array.isArray(t3) || (t3 = [t3]), t3.forEach((t4) => addHandlerWithHook(e3, t4, n2));
    }, this.getHandler = function(e3) {
      const t3 = this.elementsHandlers[e3];
      return isClassHandler(t3) ? t3 : new Promise((e4) => {
        t3().then(({ default: t4 }) => {
          e4(t4);
        });
      });
    }, this.getHandlers = function(e3) {
      return elementorDevTools.deprecation.deprecated("getHandlers", "3.1.0", "elementorFrontend.elementsHandler.getHandler"), e3 ? this.getHandler(e3) : this.elementsHandlers;
    }, this.runReadyTrigger = function(t3) {
      const n2 = !!t3.closest('[data-delay-child-handlers="true"]') && 0 !== t3.closest('[data-delay-child-handlers="true"]').length;
      if (elementorFrontend.config.is_static || n2) return;
      const r2 = jQuery(t3), o2 = r2.attr("data-element_type");
      if (o2 && (elementorFrontend.hooks.doAction("frontend/element_ready/global", r2, e2), elementorFrontend.hooks.doAction(`frontend/element_ready/${o2}`, r2, e2), "widget" === o2)) {
        const t4 = r2.attr("data-widget_type");
        elementorFrontend.hooks.doAction(`frontend/element_ready/${t4}`, r2, e2);
      }
    }, this.init = () => {
      elementorFrontend.hooks.addAction("frontend/element_ready/global", o.default), addElementsHandlers();
    };
  };
}, 7603: (e, t, n) => {
  var r = n(6784);
  n(4846), n(6211), n(9655), n(8309);
  var o = r(n(4047)), s = r(n(8767)), i = r(n(5115)), a = r(n(5073)), l = r(n(3126)), d = r(n(8427)), c = r(n(3582)), u = r(n(4901)), h = r(n(4252)), m = r(n(8422)), f = r(n(5896)), p = r(n(4799)), g = r(n(7842)), v = r(n(607)), y = r(n(9807)), b = n(7672);
  const w = n(5956), _ = n(7248);
  class Frontend extends elementorModules.ViewModule {
    constructor(...e2) {
      super(...e2), this.config = elementorFrontendConfig, this.config.legacyMode = { get elementWrappers() {
        return elementorFrontend.isEditMode() && window.top.elementorDevTools.deprecation.deprecated("elementorFrontend.config.legacyMode.elementWrappers", "3.1.0"), false;
      } }, this.populateActiveBreakpointsConfig();
    }
    get Module() {
      return this.isEditMode() && parent.elementorDevTools.deprecation.deprecated("elementorFrontend.Module", "2.5.0", "elementorModules.frontend.handlers.Base"), elementorModules.frontend.handlers.Base;
    }
    getDefaultSettings() {
      return { selectors: { elementor: ".elementor", adminBar: "#wpadminbar" } };
    }
    getDefaultElements() {
      const e2 = { window, $window: jQuery(window), $document: jQuery(document), $head: jQuery(document.head), $body: jQuery(document.body), $deviceMode: jQuery("<span>", { id: "elementor-device-mode", class: "elementor-screen-only" }) };
      return e2.$body.append(e2.$deviceMode), e2;
    }
    bindEvents() {
      this.elements.$window.on("resize", () => this.setDeviceModeData());
    }
    getElements(e2) {
      return this.getItems(this.elements, e2);
    }
    getPageSettings(e2) {
      const t2 = this.isEditMode() ? elementor.settings.page.model.attributes : this.config.settings.page;
      return this.getItems(t2, e2);
    }
    getGeneralSettings(e2) {
      return this.isEditMode() && parent.elementorDevTools.deprecation.deprecated("getGeneralSettings()", "3.0.0", "getKitSettings() and remove the `elementor_` prefix"), this.getKitSettings(`elementor_${e2}`);
    }
    getKitSettings(e2) {
      return this.getItems(this.config.kit, e2);
    }
    getCurrentDeviceMode() {
      return getComputedStyle(this.elements.$deviceMode[0], ":after").content.replace(/"/g, "");
    }
    getDeviceSetting(e2, t2, n2) {
      if ("widescreen" === e2) return this.getWidescreenSetting(t2, n2);
      const r2 = elementorFrontend.breakpoints.getActiveBreakpointsList({ largeToSmall: true, withDesktop: true });
      let o2 = r2.indexOf(e2);
      for (; o2 > 0; ) {
        const e3 = t2[n2 + "_" + r2[o2]];
        if (e3 || 0 === e3) return e3;
        o2--;
      }
      return t2[n2];
    }
    getWidescreenSetting(e2, t2) {
      const n2 = t2 + "_widescreen";
      let r2;
      return r2 = e2[n2] ? e2[n2] : e2[t2], r2;
    }
    getCurrentDeviceSetting(e2, t2) {
      return this.getDeviceSetting(elementorFrontend.getCurrentDeviceMode(), e2, t2);
    }
    isEditMode() {
      return this.config.environmentMode.edit;
    }
    isWPPreviewMode() {
      return this.config.environmentMode.wpPreview;
    }
    initDialogsManager() {
      let e2;
      this.getDialogsManager = () => (e2 || (e2 = new DialogsManager.Instance()), e2);
    }
    initOnReadyComponents() {
      this.utils = { youtube: new a.default(), vimeo: new l.default(), baseVideoLoader: new d.default(), get lightbox() {
        return h.default.getLightbox();
      }, urlActions: new c.default(), swiper: u.default, environment: i.default, assetsLoader: new m.default(), escapeHTML: b.escapeHTML, events: p.default, controls: new v.default(), anchor_scroll_margin: new y.default() }, this.modules = { StretchElement: elementorModules.frontend.tools.StretchElement, Masonry: elementorModules.utils.Masonry }, this.elementsHandler.init(), this.isEditMode() ? elementor.once("document:loaded", () => this.onDocumentLoaded()) : this.onDocumentLoaded();
    }
    initOnReadyElements() {
      this.elements.$wpAdminBar = this.elements.$document.find(this.getSettings("selectors.adminBar"));
    }
    addUserAgentClasses() {
      for (const [e2, t2] of Object.entries(i.default)) t2 && this.elements.$body.addClass("e--ua-" + e2);
    }
    setDeviceModeData() {
      this.elements.$body.attr("data-elementor-device-mode", this.getCurrentDeviceMode());
    }
    addListenerOnce(e2, t2, n2, r2) {
      if (r2 || (r2 = this.elements.$window), this.isEditMode()) if (this.removeListeners(e2, t2, r2), r2 instanceof jQuery) {
        const o2 = t2 + "." + e2;
        r2.on(o2, n2);
      } else r2.on(t2, n2, e2);
      else r2.on(t2, n2);
    }
    removeListeners(e2, t2, n2, r2) {
      if (r2 || (r2 = this.elements.$window), r2 instanceof jQuery) {
        const o2 = t2 + "." + e2;
        r2.off(o2, n2);
      } else r2.off(t2, n2, e2);
    }
    debounce(e2, t2) {
      let n2;
      return function() {
        const r2 = this, o2 = arguments, s2 = !n2;
        clearTimeout(n2), n2 = setTimeout(() => {
          n2 = null, e2.apply(r2, o2);
        }, t2), s2 && e2.apply(r2, o2);
      };
    }
    muteMigrationTraces() {
      jQuery.migrateMute = true, jQuery.migrateTrace = false;
    }
    initModules() {
      const e2 = { shapes: g.default };
      elementorFrontend.trigger("elementor/modules/init:before"), elementorFrontend.trigger("elementor/modules/init/before"), Object.entries(e2).forEach(([e3, t2]) => {
        this.modulesHandlers[e3] = new t2();
      });
    }
    populateActiveBreakpointsConfig() {
      this.config.responsive.activeBreakpoints = {}, Object.entries(this.config.responsive.breakpoints).forEach(([e2, t2]) => {
        t2.is_enabled && (this.config.responsive.activeBreakpoints[e2] = t2);
      });
    }
    init() {
      this.hooks = new w(), this.breakpoints = new f.default(this.config.responsive), this.storage = new s.default(), this.elementsHandler = new _(jQuery), this.modulesHandlers = {}, this.addUserAgentClasses(), this.setDeviceModeData(), this.initDialogsManager(), this.isEditMode() && this.muteMigrationTraces(), p.default.dispatch(this.elements.$window, "elementor/frontend/init"), this.initModules(), this.initOnReadyElements(), this.initOnReadyComponents();
    }
    onDocumentLoaded() {
      this.documentsManager = new o.default(), this.trigger("components:init"), new h.default();
    }
  }
  window.elementorFrontend = new Frontend(), elementorFrontend.isEditMode() || jQuery(() => elementorFrontend.init());
}, 7672: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.isScrollSnapActive = t.escapeHTML = void 0;
  t.escapeHTML = (e2) => {
    const t2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return e2.replace(/[&<>'"]/g, (e3) => t2[e3] || e3);
  };
  t.isScrollSnapActive = () => "yes" === (elementorFrontend.isEditMode() ? elementor.settings.page.model.attributes?.scroll_snap : elementorFrontend.config.settings.page?.scroll_snap);
}, 7842: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("text-path", () => Promise.all([n.e(786), n.e(30)]).then(n.bind(n, 241)));
    }
  }
  t.default = _default;
}, 7969: (e, t, n) => {
  var r = n(6261);
  e.exports = function(e2, t2) {
    return void 0 === e2 ? arguments.length < 2 ? "" : t2 : r(e2);
  };
}, 8223: (e, t, n) => {
  var r = n(4762), o = Error, s = r("".replace), i = String(new o("zxcasd").stack), a = /\n\s*at [^:]*:[^\n]*/, l = a.test(i);
  e.exports = function(e2, t2) {
    if (l && "string" == typeof e2 && !o.prepareStackTrace) for (; t2--; ) e2 = s(e2, a, "");
    return e2;
  };
}, 8309: (e, t, n) => {
  n.p = elementorFrontendConfig.urls.assets + "js/";
}, 8422: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class AssetsLoader {
    getScriptElement(e2) {
      const t2 = document.createElement("script");
      return t2.src = e2, t2;
    }
    getStyleElement(e2) {
      const t2 = document.createElement("link");
      return t2.rel = "stylesheet", t2.href = e2, t2;
    }
    load(e2, t2) {
      const n2 = AssetsLoader.assets[e2][t2];
      return n2.loader || (n2.loader = this.isAssetLoaded(n2, e2) ? Promise.resolve(true) : this.loadAsset(n2, e2)), n2.loader;
    }
    isAssetLoaded(e2, t2) {
      const n2 = "script" === t2 ? `script[src="${e2.src}"]` : `link[href="${e2.src}"]`;
      return !!document.querySelectorAll(n2)?.length;
    }
    loadAsset(e2, t2) {
      return new Promise((n2) => {
        const r2 = "style" === t2 ? this.getStyleElement(e2.src) : this.getScriptElement(e2.src);
        r2.onload = () => n2(true), this.appendAsset(e2, r2);
      });
    }
    appendAsset(e2, t2) {
      const n2 = document.querySelector(e2.before);
      if (n2) return void n2.insertAdjacentElement("beforebegin", t2);
      const r2 = "head" === e2.parent ? e2.parent : "body";
      document[r2].appendChild(t2);
    }
  }
  t.default = AssetsLoader;
  const n = elementorFrontendConfig.urls.assets, r = elementorFrontendConfig.environmentMode.isScriptDebug ? "" : ".min", o = elementorFrontendConfig.version;
  AssetsLoader.assets = { script: { dialog: { src: `${n}lib/dialog/dialog${r}.js?ver=4.9.3` }, "share-link": { src: `${n}lib/share-link/share-link${r}.js?ver=${o}` }, swiper: { src: `${n}lib/swiper/v8/swiper${r}.js?ver=8.4.5` } }, style: { swiper: { src: `${n}lib/swiper/v8/css/swiper${r}.css?ver=8.4.5`, parent: "head" }, "e-lightbox": { src: elementorFrontendConfig?.responsive?.hasCustomBreakpoints ? `${elementorFrontendConfig.urls.uploadUrl}/elementor/css/custom-lightbox.min.css?ver=${o}` : `${n}css/conditionals/lightbox${r}.css?ver=${o}` }, dialog: { src: `${n}css/conditionals/dialog${r}.css?ver=${o}`, parent: "head", before: "#elementor-frontend-css" } } };
}, 8427: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class BaseLoader extends elementorModules.ViewModule {
    getDefaultSettings() {
      return { isInserted: false, selectors: { firstScript: "script:first" } };
    }
    getDefaultElements() {
      return { $firstScript: jQuery(this.getSettings("selectors.firstScript")) };
    }
    insertAPI() {
      this.elements.$firstScript.before(jQuery("<script>", { src: this.getApiURL() })), this.setSettings("isInserted", true);
    }
    getVideoIDFromURL(e2) {
      const t2 = e2.match(this.getURLRegex());
      return t2 && t2[1];
    }
    onApiReady(e2) {
      this.getSettings("isInserted") || this.insertAPI(), this.isApiLoaded() ? e2(this.getApiObject()) : setTimeout(() => {
        this.onApiReady(e2);
      }, 350);
    }
    getAutoplayURL(e2) {
      return e2.replace("&autoplay=0", "") + "&autoplay=1";
    }
  }
  t.default = BaseLoader;
}, 8767: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(4846), n(9655);
  class _default extends elementorModules.Module {
    get(e2, t2) {
      let n2;
      t2 = t2 || {};
      try {
        n2 = t2.session ? sessionStorage : localStorage;
      } catch (t3) {
        return e2 ? void 0 : {};
      }
      let r = n2.getItem("elementor");
      r = r ? JSON.parse(r) : {}, r.__expiration || (r.__expiration = {});
      const o = r.__expiration;
      let s = [];
      e2 ? o[e2] && (s = [e2]) : s = Object.keys(o);
      let i = false;
      return s.forEach((e3) => {
        new Date(o[e3]) < /* @__PURE__ */ new Date() && (delete r[e3], delete o[e3], i = true);
      }), i && this.save(r, t2.session), e2 ? r[e2] : r;
    }
    set(e2, t2, n2) {
      n2 = n2 || {};
      const r = this.get(null, n2);
      if (r[e2] = t2, n2.lifetimeInSeconds) {
        const t3 = /* @__PURE__ */ new Date();
        t3.setTime(t3.getTime() + 1e3 * n2.lifetimeInSeconds), r.__expiration[e2] = t3.getTime();
      }
      this.save(r, n2.session);
    }
    save(e2, t2) {
      let n2;
      try {
        n2 = t2 ? sessionStorage : localStorage;
      } catch (e3) {
        return;
      }
      n2.setItem("elementor", JSON.stringify(e2));
    }
  }
  t.default = _default;
}, 8891: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = [() => n.e(557).then(n.bind(n, 628))];
}, 9807: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(5724), n(4846), n(7458), n(9655);
  class _default extends elementorModules.ViewModule {
    getDefaultSettings() {
      return { selectors: { links: '.elementor-element a[href*="#"]', stickyElements: ".elementor-element.elementor-sticky" } };
    }
    onInit() {
      this.observeStickyElements(() => {
        this.initializeStickyAndAnchorTracking();
      });
    }
    observeStickyElements(e2) {
      new MutationObserver((t2) => {
        for (const n2 of t2) ("childList" === n2.type || "attributes" === n2.type && n2.target.classList.contains("elementor-sticky")) && e2();
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    }
    initializeStickyAndAnchorTracking() {
      const e2 = this.getAllAnchorLinks(), t2 = this.getAllStickyElements(), n2 = [];
      !t2.length > 0 && !e2.length > 0 || (this.trackStickyElements(t2, n2), this.trackAnchorLinks(e2, n2), this.organizeStickyAndAnchors(n2));
    }
    trackAnchorLinks(e2, t2) {
      e2.forEach((e3) => {
        const n2 = this.getAnchorTarget(e3), r = this.getScrollPosition(n2);
        t2.push({ element: n2, type: "anchor", scrollPosition: r });
      });
    }
    trackStickyElements(e2, t2) {
      e2.forEach((e3) => {
        const n2 = this.getElementSettings(e3);
        if (!n2 || !n2.sticky_anchor_link_offset) return;
        const { sticky_anchor_link_offset: r } = n2;
        if (0 === r) return;
        const o = this.getScrollPosition(e3);
        t2.push({ scrollMarginTop: r, type: "sticky", scrollPosition: o });
      });
    }
    organizeStickyAndAnchors(e2) {
      const t2 = this.filterAndSortElementsByType(e2, "sticky"), n2 = this.filterAndSortElementsByType(e2, "anchor");
      t2.forEach((e3, r) => {
        this.defineCurrentStickyRange(e3, r, t2, n2);
      });
    }
    defineCurrentStickyRange(e2, t2, n2, r) {
      const o = t2 + 1 < n2.length ? n2[t2 + 1].scrollPosition : 1 / 0;
      e2.anchor = r.filter((t3) => {
        const n3 = t3.scrollPosition > e2.scrollPosition && t3.scrollPosition < o;
        return n3 && (t3.element.style.scrollMarginTop = `${e2.scrollMarginTop}px`), n3;
      });
    }
    getScrollPosition(e2) {
      let t2 = 0;
      for (; e2; ) t2 += e2.offsetTop, e2 = e2.offsetParent;
      return t2;
    }
    getAllStickyElements() {
      const e2 = document.querySelectorAll(this.getSettings("selectors.stickyElements"));
      return Array.from(e2).filter((e3, t2, n2) => t2 === n2.findIndex((t3) => t3.getAttribute("data-id") === e3.getAttribute("data-id")));
    }
    getAllAnchorLinks() {
      const e2 = document.querySelectorAll(this.getSettings("selectors.links"));
      return Array.from(e2).filter((e3, t2, n2) => t2 === n2.findIndex((t3) => t3.getAttribute("href") === e3.getAttribute("href")));
    }
    filterAndSortElementsByType(e2, t2) {
      return e2.filter((e3) => t2 === e3.type).sort((e3, t3) => e3.scrollPosition - t3.scrollPosition);
    }
    isValidSelector(e2) {
      return /^#[A-Za-z_][\w-]*$/.test(e2);
    }
    getAnchorTarget(e2) {
      const t2 = e2?.hash;
      return this.isValidSelector(t2) ? document.querySelector(t2) : null;
    }
    getElementSettings(e2) {
      return JSON.parse(e2.getAttribute("data-settings"));
    }
  }
  t.default = _default;
} }, (e) => {
  e.O(0, [941], () => {
    return t = 7603, e(e.s = t);
    var t;
  });
  e.O();
}]);
(function() {
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, "passive", { get: function() {
      supportsPassive = true;
    } });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {
  }
  function init() {
    var input_begin = "";
    var keydowns = {};
    var lastKeyup = null;
    var lastKeydown = null;
    var keypresses = [];
    var modifierKeys = [];
    var correctionKeys = [];
    var lastMouseup = null;
    var lastMousedown = null;
    var mouseclicks = [];
    var mouseclickCoordinates = [];
    var mousemoveTimer = null;
    var lastMousemoveX = null;
    var lastMousemoveY = null;
    var mousemoveStart = null;
    var mousemoves = [];
    var touchmoveCountTimer = null;
    var touchmoveCount = 0;
    var lastTouchEnd = null;
    var lastTouchStart = null;
    var touchEvents = [];
    var scrollCountTimer = null;
    var scrollCount = 0;
    var correctionKeyCodes = ["Backspace", "Delete", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"];
    var modifierKeyCodes = ["Shift", "CapsLock"];
    var forms = document.querySelectorAll("form[method=post]");
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      var formAction = form.getAttribute("action");
      if (formAction) {
        if (formAction.indexOf("http://") == 0 || formAction.indexOf("https://") == 0) {
          if (formAction.indexOf("http://" + window.location.hostname + "/") != 0 && formAction.indexOf("https://" + window.location.hostname + "/") != 0) {
            continue;
          }
        }
      }
      form.addEventListener("submit", function() {
        var ak_bkp = prepare_array_for_request(keypresses);
        var ak_bmc = prepare_array_for_request(mouseclicks);
        var ak_bte = prepare_array_for_request(touchEvents);
        var ak_bmm = prepare_array_for_request(mousemoves);
        var ak_bcc = prepare_array_for_request(mouseclickCoordinates);
        var input_fields = { "bib": input_begin, "bfs": Date.now(), "bkpc": keypresses.length, "bkp": ak_bkp, "bmc": ak_bmc, "bmcc": mouseclicks.length, "bmk": modifierKeys.join(";"), "bck": correctionKeys.join(";"), "bmmc": mousemoves.length, "btmc": touchmoveCount, "bsc": scrollCount, "bte": ak_bte, "btec": touchEvents.length, "bmm": ak_bmm, "bcc": ak_bcc };
        var akismet_field_prefix = "ak_";
        if (this.getElementsByClassName) {
          var possible_akismet_containers = this.getElementsByClassName("akismet-fields-container");
          for (var containerIndex = 0; containerIndex < possible_akismet_containers.length; containerIndex++) {
            var container = possible_akismet_containers.item(containerIndex);
            if (container.getAttribute("data-prefix")) {
              akismet_field_prefix = container.getAttribute("data-prefix");
              break;
            }
          }
        }
        for (var field_name in input_fields) {
          var field = document.createElement("input");
          field.setAttribute("type", "hidden");
          field.setAttribute("name", akismet_field_prefix + field_name);
          field.setAttribute("value", input_fields[field_name]);
          this.appendChild(field);
        }
      }, supportsPassive ? { passive: true } : false);
      form.addEventListener("keydown", function(e) {
        if (e.key in keydowns) {
          return;
        }
        var keydownTime = (/* @__PURE__ */ new Date()).getTime();
        keydowns[e.key] = [keydownTime];
        if (!input_begin) {
          input_begin = keydownTime;
        }
        var lastKeyEvent = Math.max(lastKeydown, lastKeyup);
        if (lastKeyEvent) {
          keydowns[e.key].push(keydownTime - lastKeyEvent);
        }
        lastKeydown = keydownTime;
      }, supportsPassive ? { passive: true } : false);
      form.addEventListener("keyup", function(e) {
        if (!(e.key in keydowns)) {
          return;
        }
        var keyupTime = (/* @__PURE__ */ new Date()).getTime();
        if ("TEXTAREA" === e.target.nodeName || "INPUT" === e.target.nodeName) {
          if (-1 !== modifierKeyCodes.indexOf(e.key)) {
            modifierKeys.push(keypresses.length - 1);
          } else if (-1 !== correctionKeyCodes.indexOf(e.key)) {
            correctionKeys.push(keypresses.length - 1);
          } else {
            var keydownTime = keydowns[e.key][0];
            var keypress = [];
            keypress.push(keyupTime - keydownTime);
            if (keydowns[e.key].length > 1) {
              keypress.push(keydowns[e.key][1]);
            }
            keypresses.push(keypress);
          }
        }
        delete keydowns[e.key];
        lastKeyup = keyupTime;
      }, supportsPassive ? { passive: true } : false);
      form.addEventListener("focusin", function(e) {
        lastKeydown = null;
        lastKeyup = null;
        keydowns = {};
      }, supportsPassive ? { passive: true } : false);
      form.addEventListener("focusout", function(e) {
        lastKeydown = null;
        lastKeyup = null;
        keydowns = {};
      }, supportsPassive ? { passive: true } : false);
    }
    document.addEventListener("mousedown", function(e) {
      lastMousedown = (/* @__PURE__ */ new Date()).getTime();
      var mouseclickCoordinate = [];
      var rect = e.target.getBoundingClientRect();
      var relativeX = e.clientX - rect.left;
      var relativeY = e.clientY - rect.top;
      mouseclickCoordinate.push(Math.round(relativeX));
      mouseclickCoordinate.push(Math.round(relativeY));
      mouseclickCoordinate.push(rect.width > 0 ? Math.round(relativeX / rect.width * 100) : 0);
      mouseclickCoordinate.push(rect.height > 0 ? Math.round(relativeY / rect.height * 100) : 0);
      mouseclickCoordinates.push(mouseclickCoordinate);
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("mouseup", function(e) {
      if (!lastMousedown) {
        return;
      }
      var now = (/* @__PURE__ */ new Date()).getTime();
      var mouseclick = [];
      mouseclick.push(now - lastMousedown);
      if (lastMouseup) {
        mouseclick.push(lastMousedown - lastMouseup);
      }
      mouseclicks.push(mouseclick);
      lastMouseup = now;
      lastKeydown = null;
      lastKeyup = null;
      keydowns = {};
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("mousemove", function(e) {
      if (mousemoveTimer) {
        clearTimeout(mousemoveTimer);
        mousemoveTimer = null;
      } else {
        mousemoveStart = (/* @__PURE__ */ new Date()).getTime();
        lastMousemoveX = e.offsetX;
        lastMousemoveY = e.offsetY;
      }
      mousemoveTimer = setTimeout(function(theEvent, originalMousemoveStart) {
        var now = (/* @__PURE__ */ new Date()).getTime() - 500;
        var mousemove = [];
        mousemove.push(now - originalMousemoveStart);
        mousemove.push(Math.round(Math.sqrt(Math.pow(theEvent.offsetX - lastMousemoveX, 2) + Math.pow(theEvent.offsetY - lastMousemoveY, 2))));
        if (mousemove[1] > 0) {
          mousemoves.push(mousemove);
        }
        mousemoveStart = null;
        mousemoveTimer = null;
      }, 500, e, mousemoveStart);
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("touchmove", function(e) {
      if (touchmoveCountTimer) {
        clearTimeout(touchmoveCountTimer);
      }
      touchmoveCountTimer = setTimeout(function() {
        touchmoveCount++;
      }, 500);
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("touchstart", function(e) {
      lastTouchStart = (/* @__PURE__ */ new Date()).getTime();
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("touchend", function(e) {
      if (!lastTouchStart) {
        return;
      }
      var now = (/* @__PURE__ */ new Date()).getTime();
      var touchEvent = [];
      touchEvent.push(now - lastTouchStart);
      if (lastTouchEnd) {
        touchEvent.push(lastTouchStart - lastTouchEnd);
      }
      touchEvents.push(touchEvent);
      lastTouchEnd = now;
      lastKeydown = null;
      lastKeyup = null;
      keydowns = {};
    }, supportsPassive ? { passive: true } : false);
    document.addEventListener("scroll", function(e) {
      if (scrollCountTimer) {
        clearTimeout(scrollCountTimer);
      }
      scrollCountTimer = setTimeout(function() {
        scrollCount++;
      }, 500);
    }, supportsPassive ? { passive: true } : false);
  }
  function prepare_array_for_request(a, limit) {
    if (!limit) {
      limit = 100;
    }
    var rv = "";
    if (a.length > 0) {
      var random_starting_point = Math.max(0, Math.floor(Math.random() * a.length - limit));
      for (var i = 0; i < limit && i < a.length; i++) {
        var entry = a[random_starting_point + i];
        rv += entry.join(",") + ";";
      }
    }
    return rv;
  }
  if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLiteSpeedLoaded", init);
  }
})();
(() => {
  "use strict";
  var e, r, a, n = {}, b = {};
  function __webpack_require__(e2) {
    var r2 = b[e2];
    if (void 0 !== r2) return r2.exports;
    var a2 = b[e2] = { exports: {} };
    return n[e2](a2, a2.exports, __webpack_require__), a2.exports;
  }
  __webpack_require__.m = n, e = [], __webpack_require__.O = (r2, a2, n2, b2) => {
    if (!a2) {
      var i = 1 / 0;
      for (o = 0; o < e.length; o++) {
        for (var [a2, n2, b2] = e[o], c = true, t = 0; t < a2.length; t++) (false & b2 || i >= b2) && Object.keys(__webpack_require__.O).every(((e2) => __webpack_require__.O[e2](a2[t]))) ? a2.splice(t--, 1) : (c = false, b2 < i && (i = b2));
        if (c) {
          e.splice(o--, 1);
          var _ = n2();
          void 0 !== _ && (r2 = _);
        }
      }
      return r2;
    }
    b2 = b2 || 0;
    for (var o = e.length; o > 0 && e[o - 1][2] > b2; o--) e[o] = e[o - 1];
    e[o] = [a2, n2, b2];
  }, __webpack_require__.f = {}, __webpack_require__.e = (e2) => Promise.all(Object.keys(__webpack_require__.f).reduce(((r2, a2) => (__webpack_require__.f[a2](e2, r2), r2)), [])), __webpack_require__.u = (e2) => 635 === e2 ? "code-highlight.b9addbc842a50347c9ab.bundle.min.js" : 519 === e2 ? "video-playlist.909c41acbc73cb741e9d.bundle.min.js" : 375 === e2 ? "paypal-button.f4f64e46173f50701949.bundle.min.js" : 786 === e2 ? "0726b2d81686a5392236.bundle.min.js" : 857 === e2 ? "stripe-button.49130d6eecb5ebc8afbd.bundle.min.js" : 581 === e2 ? "progress-tracker.8cccdda9737c272489fc.bundle.min.js" : 961 === e2 ? "animated-headline.c009d6fa482515df23f8.bundle.min.js" : 692 === e2 ? "media-carousel.8d26e5df1a1527329fde.bundle.min.js" : 897 === e2 ? "carousel.3620fca501cb18163600.bundle.min.js" : 416 === e2 ? "countdown.0e9e688751d29d07a8d3.bundle.min.js" : 292 === e2 ? "hotspot.5033ed75928eff79cb95.bundle.min.js" : 325 === e2 ? "form.71055747203b48a65a24.bundle.min.js" : 543 === e2 ? "gallery.06be1c07b9901f53d709.bundle.min.js" : 970 === e2 ? "lottie.a287ccfe024bea61e651.bundle.min.js" : 334 === e2 ? "nav-menu.8521a0597c50611efdc6.bundle.min.js" : 887 === e2 ? "popup.f7b15b2ca565b152bf98.bundle.min.js" : 535 === e2 ? "load-more.8b46f464e573feab5dd7.bundle.min.js" : 396 === e2 ? "posts.aec59265318492b89cb5.bundle.min.js" : 726 === e2 ? "portfolio.4cd5da34009c30cb5d70.bundle.min.js" : 316 === e2 ? "share-buttons.63d984f8c96d1e053bc0.bundle.min.js" : 829 === e2 ? "slides.c0029640cbdb48199471.bundle.min.js" : 158 === e2 ? "social.d71d263bd937f0906192.bundle.min.js" : 404 === e2 ? "table-of-contents.3be1ab725f562d10dd86.bundle.min.js" : 345 === e2 ? "archive-posts.16a93245d08246e5e540.bundle.min.js" : 798 === e2 ? "search-form.b7065999d77832a1b764.bundle.min.js" : 6 === e2 ? "woocommerce-menu-cart.54f2e75f6769dce707e2.bundle.min.js" : 80 === e2 ? "woocommerce-purchase-summary.88a2d8ca449739e34f9f.bundle.min.js" : 354 === e2 ? "woocommerce-checkout-page.6ba1f1f2aa99210fa1cf.bundle.min.js" : 4 === e2 ? "woocommerce-cart.480d117b95956d1f28a5.bundle.min.js" : 662 === e2 ? "woocommerce-my-account.d54826f355f9822b0ec0.bundle.min.js" : 621 === e2 ? "woocommerce-notices.00f9132bbbd683277a27.bundle.min.js" : 787 === e2 ? "product-add-to-cart.c32f5d5e404511d68720.bundle.min.js" : 993 === e2 ? "loop.89cc81d2188312a17a17.bundle.min.js" : 932 === e2 ? "loop-carousel.cd9a95b2e4dd2a239b81.bundle.min.js" : 550 === e2 ? "ajax-pagination.2090b5f4906bcda1dcc2.bundle.min.js" : 727 === e2 ? "mega-menu.82093824ddb3f5531ab4.bundle.min.js" : 87 === e2 ? "mega-menu-stretch-content.480e081cebe071d683e8.bundle.min.js" : 912 === e2 ? "menu-title-keyboard-handler.f0362773c21105d2c65c.bundle.min.js" : 33 === e2 ? "nested-carousel.db797a097fdc5532ef4a.bundle.min.js" : 225 === e2 ? "taxonomy-filter.a32526f3e4a201b5fce1.bundle.min.js" : 579 === e2 ? "off-canvas.137463f629e2b7cbaf02.bundle.min.js" : 1 === e2 ? "contact-buttons.99a987d66bcc2ade0ee6.bundle.min.js" : 61 === e2 ? "contact-buttons-var-10.16cf733dc3d3b250fef4.bundle.min.js" : 249 === e2 ? "floating-bars-var-2.75c36e8b0bacbac6105e.bundle.min.js" : 440 === e2 ? "floating-bars-var-3.cdf99fd0b063a0032d53.bundle.min.js" : 187 === e2 ? "search.5d88e65c03029f91931d.bundle.min.js" : void 0, __webpack_require__.g = (function() {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e2) {
      if ("object" == typeof window) return window;
    }
  })(), __webpack_require__.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), r = {}, a = "elementor-pro:", __webpack_require__.l = (e2, n2, b2, i) => {
    if (r[e2]) r[e2].push(n2);
    else {
      var c, t;
      if (void 0 !== b2) for (var _ = document.getElementsByTagName("script"), o = 0; o < _.length; o++) {
        var d = _[o];
        if (d.getAttribute("src") == e2 || d.getAttribute("data-webpack") == a + b2) {
          c = d;
          break;
        }
      }
      c || (t = true, (c = document.createElement("script")).charset = "utf-8", c.timeout = 120, __webpack_require__.nc && c.setAttribute("nonce", __webpack_require__.nc), c.setAttribute("data-webpack", a + b2), c.src = e2), r[e2] = [n2];
      var onScriptComplete = (a2, n3) => {
        c.onerror = c.onload = null, clearTimeout(u);
        var b3 = r[e2];
        if (delete r[e2], c.parentNode && c.parentNode.removeChild(c), b3 && b3.forEach(((e3) => e3(n3))), a2) return a2(n3);
      }, u = setTimeout(onScriptComplete.bind(null, void 0, { type: "timeout", target: c }), 12e4);
      c.onerror = onScriptComplete.bind(null, c.onerror), c.onload = onScriptComplete.bind(null, c.onload), t && document.head.appendChild(c);
    }
  }, (() => {
    var e2;
    __webpack_require__.g.importScripts && (e2 = __webpack_require__.g.location + "");
    var r2 = __webpack_require__.g.document;
    if (!e2 && r2 && (r2.currentScript && "SCRIPT" === r2.currentScript.tagName.toUpperCase() && (e2 = r2.currentScript.src), !e2)) {
      var a2 = r2.getElementsByTagName("script");
      if (a2.length) for (var n2 = a2.length - 1; n2 > -1 && (!e2 || !/^http(s?):/.test(e2)); ) e2 = a2[n2--].src;
    }
    if (!e2) throw new Error("Automatic publicPath is not supported in this browser");
    e2 = e2.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), __webpack_require__.p = e2;
  })(), (() => {
    var e2 = { 978: 0 };
    __webpack_require__.f.j = (r3, a2) => {
      var n2 = __webpack_require__.o(e2, r3) ? e2[r3] : void 0;
      if (0 !== n2) if (n2) a2.push(n2[2]);
      else if (978 != r3) {
        var b2 = new Promise(((a3, b3) => n2 = e2[r3] = [a3, b3]));
        a2.push(n2[2] = b2);
        var i = __webpack_require__.p + __webpack_require__.u(r3), c = new Error();
        __webpack_require__.l(i, ((a3) => {
          if (__webpack_require__.o(e2, r3) && (0 !== (n2 = e2[r3]) && (e2[r3] = void 0), n2)) {
            var b3 = a3 && ("load" === a3.type ? "missing" : a3.type), i2 = a3 && a3.target && a3.target.src;
            c.message = "Loading chunk " + r3 + " failed.\n(" + b3 + ": " + i2 + ")", c.name = "ChunkLoadError", c.type = b3, c.request = i2, n2[1](c);
          }
        }), "chunk-" + r3, r3);
      } else e2[r3] = 0;
    }, __webpack_require__.O.j = (r3) => 0 === e2[r3];
    var webpackJsonpCallback = (r3, a2) => {
      var n2, b2, [i, c, t] = a2, _ = 0;
      if (i.some(((r4) => 0 !== e2[r4]))) {
        for (n2 in c) __webpack_require__.o(c, n2) && (__webpack_require__.m[n2] = c[n2]);
        if (t) var o = t(__webpack_require__);
      }
      for (r3 && r3(a2); _ < i.length; _++) b2 = i[_], __webpack_require__.o(e2, b2) && e2[b2] && e2[b2][0](), e2[b2] = 0;
      return __webpack_require__.O(o);
    }, r2 = self.webpackChunkelementor_pro = self.webpackChunkelementor_pro || [];
    r2.forEach(webpackJsonpCallback.bind(null, 0)), r2.push = webpackJsonpCallback.bind(null, r2.push.bind(r2));
  })();
})();
"use strict";
var wp;
(wp ||= {}).hooks = (() => {
  var v = Object.defineProperty;
  var S = Object.getOwnPropertyDescriptor;
  var g = Object.getOwnPropertyNames;
  var I = Object.prototype.hasOwnProperty;
  var w = (e, n) => {
    for (var s in n) v(e, s, { get: n[s], enumerable: true });
  }, D = (e, n, s, r) => {
    if (n && typeof n == "object" || typeof n == "function") for (let t of g(n)) !I.call(e, t) && t !== s && v(e, t, { get: () => n[t], enumerable: !(r = S(n, t)) || r.enumerable });
    return e;
  };
  var T = (e) => D(v({}, "__esModule", { value: true }), e);
  var le = {};
  w(le, { actions: () => ae, addAction: () => J, addFilter: () => K, applyFilters: () => N, applyFiltersAsync: () => ee, createHooks: () => F, currentAction: () => te, currentFilter: () => re, defaultHooks: () => b, didAction: () => ie, didFilter: () => se, doAction: () => X, doActionAsync: () => Y, doingAction: () => ne, doingFilter: () => oe, filters: () => ce, hasAction: () => P, hasFilter: () => Q, removeAction: () => L, removeAllActions: () => U, removeAllFilters: () => W, removeFilter: () => M });
  function z(e) {
    return typeof e != "string" || e === "" ? (console.error("The namespace must be a non-empty string."), false) : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e) ? true : (console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."), false);
  }
  var m = z;
  function E(e) {
    return typeof e != "string" || e === "" ? (console.error("The hook name must be a non-empty string."), false) : /^__/.test(e) ? (console.error("The hook name cannot begin with `__`."), false) : /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e) ? true : (console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."), false);
  }
  var f = E;
  function Z(e, n) {
    return function(r, t, a, i = 10) {
      let c = e[n];
      if (!f(r) || !m(t)) return;
      if (typeof a != "function") {
        console.error("The hook callback must be a function.");
        return;
      }
      if (typeof i != "number") {
        console.error("If specified, the hook priority must be a number.");
        return;
      }
      let l = { callback: a, priority: i, namespace: t };
      if (c[r]) {
        let o = c[r].handlers, d;
        for (d = o.length; d > 0 && !(i >= o[d - 1].priority); d--) ;
        d === o.length ? o[d] = l : o.splice(d, 0, l), c.__current.forEach((h) => {
          h.name === r && h.currentIndex >= d && h.currentIndex++;
        });
      } else c[r] = { handlers: [l], runs: 0 };
      r !== "hookAdded" && e.doAction("hookAdded", r, t, a, i);
    };
  }
  var H = Z;
  function C(e, n, s = false) {
    return function(t, a) {
      let i = e[n];
      if (!f(t) || !s && !m(a)) return;
      if (!i[t]) return 0;
      let c = 0;
      if (s) c = i[t].handlers.length, i[t] = { runs: i[t].runs, handlers: [] };
      else {
        let l = i[t].handlers;
        for (let o = l.length - 1; o >= 0; o--) l[o].namespace === a && (l.splice(o, 1), c++, i.__current.forEach((d) => {
          d.name === t && d.currentIndex >= o && d.currentIndex--;
        }));
      }
      return t !== "hookRemoved" && e.doAction("hookRemoved", t, a), c;
    };
  }
  var p = C;
  function O(e, n) {
    return function(r, t) {
      let a = e[n];
      return typeof t < "u" ? r in a && a[r].handlers.some((i) => i.namespace === t) : r in a;
    };
  }
  var _ = O;
  function j(e, n, s, r) {
    return function(a, ...i) {
      let c = e[n];
      c[a] || (c[a] = { handlers: [], runs: 0 }), c[a].runs++;
      let l = c[a].handlers;
      if (!l || !l.length) return s ? i[0] : void 0;
      let o = { name: a, currentIndex: 0 };
      async function d() {
        try {
          c.__current.add(o);
          let u = s ? i[0] : void 0;
          for (; o.currentIndex < l.length; ) u = await l[o.currentIndex].callback.apply(null, i), s && (i[0] = u), o.currentIndex++;
          return s ? u : void 0;
        } finally {
          c.__current.delete(o);
        }
      }
      function h() {
        try {
          c.__current.add(o);
          let u = s ? i[0] : void 0;
          for (; o.currentIndex < l.length; ) u = l[o.currentIndex].callback.apply(null, i), s && (i[0] = u), o.currentIndex++;
          return s ? u : void 0;
        } finally {
          c.__current.delete(o);
        }
      }
      return (r ? d : h)();
    };
  }
  var A = j;
  function $(e, n) {
    return function() {
      let r = e[n];
      return Array.from(r.__current).at(-1)?.name ?? null;
    };
  }
  var y = $;
  function V(e, n) {
    return function(r) {
      let t = e[n];
      return typeof r > "u" ? t.__current.size > 0 : Array.from(t.__current).some((a) => a.name === r);
    };
  }
  var k = V;
  function q(e, n) {
    return function(r) {
      let t = e[n];
      if (f(r)) return t[r] && t[r].runs ? t[r].runs : 0;
    };
  }
  var x = q;
  var B = class {
    actions;
    filters;
    addAction;
    addFilter;
    removeAction;
    removeFilter;
    hasAction;
    hasFilter;
    removeAllActions;
    removeAllFilters;
    doAction;
    doActionAsync;
    applyFilters;
    applyFiltersAsync;
    currentAction;
    currentFilter;
    doingAction;
    doingFilter;
    didAction;
    didFilter;
    constructor() {
      this.actions = /* @__PURE__ */ Object.create(null), this.actions.__current = /* @__PURE__ */ new Set(), this.filters = /* @__PURE__ */ Object.create(null), this.filters.__current = /* @__PURE__ */ new Set(), this.addAction = H(this, "actions"), this.addFilter = H(this, "filters"), this.removeAction = p(this, "actions"), this.removeFilter = p(this, "filters"), this.hasAction = _(this, "actions"), this.hasFilter = _(this, "filters"), this.removeAllActions = p(this, "actions", true), this.removeAllFilters = p(this, "filters", true), this.doAction = A(this, "actions", false, false), this.doActionAsync = A(this, "actions", false, true), this.applyFilters = A(this, "filters", true, false), this.applyFiltersAsync = A(this, "filters", true, true), this.currentAction = y(this, "actions"), this.currentFilter = y(this, "filters"), this.doingAction = k(this, "actions"), this.doingFilter = k(this, "filters"), this.didAction = x(this, "actions"), this.didFilter = x(this, "filters");
    }
  };
  function G() {
    return new B();
  }
  var F = G;
  var b = F(), { addAction: J, addFilter: K, removeAction: L, removeFilter: M, hasAction: P, hasFilter: Q, removeAllActions: U, removeAllFilters: W, doAction: X, doActionAsync: Y, applyFilters: N, applyFiltersAsync: ee, currentAction: te, currentFilter: re, doingAction: ne, doingFilter: oe, didAction: ie, didFilter: se, actions: ae, filters: ce } = b;
  return T(le);
})();
"use strict";
var wp;
(wp ||= {}).i18n = (() => {
  var nt = Object.create;
  var L = Object.defineProperty;
  var at = Object.getOwnPropertyDescriptor;
  var it = Object.getOwnPropertyNames;
  var ut = Object.getPrototypeOf, lt = Object.prototype.hasOwnProperty;
  var ft = (t, r) => () => (r || t((r = { exports: {} }).exports, r), r.exports), ot = (t, r) => {
    for (var e in r) L(t, e, { get: r[e], enumerable: true });
  }, O = (t, r, e, n) => {
    if (r && typeof r == "object" || typeof r == "function") for (let u of it(r)) !lt.call(t, u) && u !== e && L(t, u, { get: () => r[u], enumerable: !(n = at(r, u)) || n.enumerable });
    return t;
  };
  var st = (t, r, e) => (e = t != null ? nt(ut(t)) : {}, O(r || !t || !t.__esModule ? L(e, "default", { value: t, enumerable: true }) : e, t)), pt = (t) => O(L({}, "__esModule", { value: true }), t);
  var $ = ft((It, M) => {
    M.exports = window.wp.hooks;
  });
  var yt = {};
  ot(yt, { __: () => Z, _n: () => G, _nx: () => B, _x: () => q, createI18n: () => R, defaultI18n: () => H, getLocaleData: () => j, hasTranslation: () => Q, isRTL: () => J, resetLocaleData: () => U, setLocaleData: () => z, sprintf: () => P, subscribe: () => X });
  var ct = /%(((\d+)\$)|(\(([$_a-zA-Z][$_a-zA-Z0-9]*)\)))?[ +0#-]*\d*(\.(\d+|\*))?(ll|[lhqL])?([cduxXefgsp%])/g;
  function T(t, ...r) {
    var e = 0;
    return Array.isArray(r[0]) && (r = r[0]), t.replace(ct, function() {
      var n, u, l, o, f;
      return n = arguments[3], u = arguments[5], l = arguments[7], o = arguments[9], o === "%" ? "%" : (l === "*" && (l = r[e], e++), u === void 0 ? (n === void 0 && (n = e + 1), e++, f = r[n - 1]) : r[0] && typeof r[0] == "object" && r[0].hasOwnProperty(u) && (f = r[0][u]), o === "f" ? f = parseFloat(f) || 0 : o === "d" && (f = parseInt(f) || 0), l !== void 0 && (o === "f" ? f = f.toFixed(l) : o === "s" && (f = f.substr(0, l))), f ?? "");
    });
  }
  function P(t, ...r) {
    return T(t, ...r);
  }
  var D, I, h, N;
  D = { "(": 9, "!": 8, "*": 7, "/": 7, "%": 7, "+": 6, "-": 6, "<": 5, "<=": 5, ">": 5, ">=": 5, "==": 4, "!=": 4, "&&": 3, "||": 2, "?": 1, "?:": 1 };
  I = ["(", "?"];
  h = { ")": ["("], ":": ["?", "?:"] };
  N = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
  function b(t) {
    for (var r = [], e = [], n, u, l, o; n = t.match(N); ) {
      for (u = n[0], l = t.substr(0, n.index).trim(), l && r.push(l); o = e.pop(); ) {
        if (h[u]) {
          if (h[u][0] === o) {
            u = h[u][1] || u;
            break;
          }
        } else if (I.indexOf(o) >= 0 || D[o] < D[u]) {
          e.push(o);
          break;
        }
        r.push(o);
      }
      h[u] || e.push(u), t = t.substr(n.index + u.length);
    }
    return t = t.trim(), t && r.push(t), r.concat(e.reverse());
  }
  var dt = { "!": function(t) {
    return !t;
  }, "*": function(t, r) {
    return t * r;
  }, "/": function(t, r) {
    return t / r;
  }, "%": function(t, r) {
    return t % r;
  }, "+": function(t, r) {
    return t + r;
  }, "-": function(t, r) {
    return t - r;
  }, "<": function(t, r) {
    return t < r;
  }, "<=": function(t, r) {
    return t <= r;
  }, ">": function(t, r) {
    return t > r;
  }, ">=": function(t, r) {
    return t >= r;
  }, "==": function(t, r) {
    return t === r;
  }, "!=": function(t, r) {
    return t !== r;
  }, "&&": function(t, r) {
    return t && r;
  }, "||": function(t, r) {
    return t || r;
  }, "?:": function(t, r, e) {
    if (t) throw r;
    return e;
  } };
  function g(t, r) {
    var e = [], n, u, l, o, f, _;
    for (n = 0; n < t.length; n++) {
      if (f = t[n], o = dt[f], o) {
        for (u = o.length, l = Array(u); u--; ) l[u] = e.pop();
        try {
          _ = o.apply(null, l);
        } catch (v) {
          return v;
        }
      } else r.hasOwnProperty(f) ? _ = r[f] : _ = +f;
      e.push(_);
    }
    return e[0];
  }
  function A(t) {
    var r = b(t);
    return function(e) {
      return g(r, e);
    };
  }
  function E(t) {
    var r = A(t);
    return function(e) {
      return +r({ n: e });
    };
  }
  var S = { contextDelimiter: "", onMissingKey: null };
  function _t(t) {
    var r, e, n;
    for (r = t.split(";"), e = 0; e < r.length; e++) if (n = r[e].trim(), n.indexOf("plural=") === 0) return n.substr(7);
  }
  function x(t, r) {
    var e;
    this.data = t, this.pluralForms = {}, this.options = {};
    for (e in S) this.options[e] = r !== void 0 && e in r ? r[e] : S[e];
  }
  x.prototype.getPluralForm = function(t, r) {
    var e = this.pluralForms[t], n, u, l;
    return e || (n = this.data[t][""], l = n["Plural-Forms"] || n["plural-forms"] || n.plural_forms, typeof l != "function" && (u = _t(n["Plural-Forms"] || n["plural-forms"] || n.plural_forms), l = E(u)), e = this.pluralForms[t] = l), e(r);
  };
  x.prototype.dcnpgettext = function(t, r, e, n, u) {
    var l, o, f;
    return u === void 0 ? l = 0 : l = this.getPluralForm(t, u), o = e, r && (o = r + this.options.contextDelimiter + e), f = this.data[t][o], f && f[l] ? f[l] : (this.options.onMissingKey && this.options.onMissingKey(e, t), l === 0 ? e : n);
  };
  var K = { "": { plural_forms(t) {
    return t === 1 ? 0 : 1;
  } } }, vt = /^i18n\.(n?gettext|has_translation)(_|$)/, R = (t, r, e) => {
    let n = new x({}), u = /* @__PURE__ */ new Set(), l = () => {
      u.forEach((a) => a());
    }, o = (a) => (u.add(a), () => u.delete(a)), f = (a = "default") => n.data[a], _ = (a, i = "default") => {
      n.data[i] = { ...n.data[i], ...a }, n.data[i][""] = { ...K[""], ...n.data[i]?.[""] }, delete n.pluralForms[i];
    }, v = (a, i) => {
      _(a, i), l();
    }, V = (a, i = "default") => {
      n.data[i] = { ...n.data[i], ...a, "": { ...K[""], ...n.data[i]?.[""], ...a?.[""] } }, delete n.pluralForms[i], l();
    }, W = (a, i) => {
      n.data = {}, n.pluralForms = {}, v(a, i);
    }, m = (a = "default", i, s, c, d) => (n.data[a] || _(void 0, a), n.dcnpgettext(a, i, s, c, d)), y = (a) => a || "default", Y = (a, i) => {
      let s = m(i, void 0, a);
      return e ? (s = e.applyFilters("i18n.gettext", s, a, i), e.applyFilters("i18n.gettext_" + y(i), s, a, i)) : s;
    }, w = (a, i, s) => {
      let c = m(s, i, a);
      return e ? (c = e.applyFilters("i18n.gettext_with_context", c, a, i, s), e.applyFilters("i18n.gettext_with_context_" + y(s), c, a, i, s)) : c;
    }, k = (a, i, s, c) => {
      let d = m(c, void 0, a, i, s);
      return e ? (d = e.applyFilters("i18n.ngettext", d, a, i, s, c), e.applyFilters("i18n.ngettext_" + y(c), d, a, i, s, c)) : d;
    }, tt = (a, i, s, c, d) => {
      let F = m(d, c, a, i, s);
      return e ? (F = e.applyFilters("i18n.ngettext_with_context", F, a, i, s, c, d), e.applyFilters("i18n.ngettext_with_context_" + y(d), F, a, i, s, c, d)) : F;
    }, rt = () => w("ltr", "text direction") === "rtl", et = (a, i, s) => {
      let c = i ? i + "" + a : a, d = !!n.data?.[s ?? "default"]?.[c];
      return e && (d = e.applyFilters("i18n.has_translation", d, a, i, s), d = e.applyFilters("i18n.has_translation_" + y(s), d, a, i, s)), d;
    };
    if (t && v(t, r), e) {
      let a = (i) => {
        vt.test(i) && l();
      };
      e.addAction("hookAdded", "core/i18n", a), e.addAction("hookRemoved", "core/i18n", a);
    }
    return { getLocaleData: f, setLocaleData: v, addLocaleData: V, resetLocaleData: W, subscribe: o, __: Y, _x: w, _n: k, _nx: tt, isRTL: rt, hasTranslation: et };
  };
  var C = st($(), 1), p = R(void 0, void 0, C.defaultHooks), H = p, j = p.getLocaleData.bind(p), z = p.setLocaleData.bind(p), U = p.resetLocaleData.bind(p), X = p.subscribe.bind(p), Z = p.__.bind(p), q = p._x.bind(p), G = p._n.bind(p), B = p._nx.bind(p), J = p.isRTL.bind(p), Q = p.hasTranslation.bind(p);
  return pt(yt);
})();
(self.webpackChunkelementor_pro = self.webpackChunkelementor_pro || []).push([[313], { 3e3: (e, t, n) => {
  "use strict";
  var s = n(6784);
  n(2258);
  var i = s(n(4906)), o = s(n(2450)), r = s(n(4409)), a = s(n(7937)), l = s(n(8098)), c = s(n(6275)), d = s(n(3268)), u = s(n(4992));
  class ElementorProFrontend extends elementorModules.ViewModule {
    onInit() {
      super.onInit(), this.config = ElementorProFrontendConfig, this.modules = {}, this.initOnReadyComponents();
    }
    bindEvents() {
      jQuery(window).on("elementor/frontend/init", this.onElementorFrontendInit.bind(this));
    }
    initModules() {
      let e2 = { motionFX: i.default, sticky: o.default, codeHighlight: r.default, videoPlaylist: a.default, payments: l.default, progressTracker: c.default };
      elementorProFrontend.trigger("elementor-pro/modules/init/before"), e2 = elementorFrontend.hooks.applyFilters("elementor-pro/frontend/handlers", e2), jQuery.each(e2, ((e3, t2) => {
        this.modules[e3] = new t2();
      })), this.modules.linkActions = { addAction: (...e3) => {
        elementorFrontend.utils.urlActions.addAction(...e3);
      } };
    }
    onElementorFrontendInit() {
      this.initModules();
    }
    initOnReadyComponents() {
      this.utils = { controls: new d.default(), DropdownMenuHeightController: u.default };
    }
  }
  window.elementorProFrontend = new ElementorProFrontend();
}, 3268: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class Controls {
    getControlValue(e2, t2, n) {
      let s;
      return s = "object" == typeof e2[t2] && n ? e2[t2][n] : e2[t2], s;
    }
    getResponsiveControlValue(e2, t2, n = "") {
      const s = elementorFrontend.getCurrentDeviceMode(), i = this.getControlValue(e2, t2, n);
      if ("widescreen" === s) {
        const s2 = this.getControlValue(e2, `${t2}_widescreen`, n);
        return s2 || 0 === s2 ? s2 : i;
      }
      const o = elementorFrontend.breakpoints.getActiveBreakpointsList({ withDesktop: true });
      let r = s, a = o.indexOf(s), l = "";
      for (; a <= o.length; ) {
        if ("desktop" === r) {
          l = i;
          break;
        }
        const s2 = `${t2}_${r}`, c = this.getControlValue(e2, s2, n);
        if (c || 0 === c) {
          l = c;
          break;
        }
        a++, r = o[a];
      }
      return l;
    }
  };
}, 4992: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class DropdownMenuHeightController {
    constructor(e2) {
      this.widgetConfig = e2;
    }
    calculateStickyMenuNavHeight() {
      this.widgetConfig.elements.$dropdownMenuContainer.css(this.widgetConfig.settings.menuHeightCssVarName, "");
      const e2 = this.widgetConfig.elements.$dropdownMenuContainer.offset().top - jQuery(window).scrollTop();
      return elementorFrontend.elements.$window.height() - e2;
    }
    calculateMenuTabContentHeight(e2) {
      return elementorFrontend.elements.$window.height() - e2[0].getBoundingClientRect().top;
    }
    isElementSticky() {
      return this.widgetConfig.elements.$element.hasClass("elementor-sticky") || this.widgetConfig.elements.$element.parents(".elementor-sticky").length;
    }
    getMenuHeight() {
      return this.isElementSticky() ? this.calculateStickyMenuNavHeight() + "px" : this.widgetConfig.settings.dropdownMenuContainerMaxHeight;
    }
    setMenuHeight(e2) {
      this.widgetConfig.elements.$dropdownMenuContainer.css(this.widgetConfig.settings.menuHeightCssVarName, e2);
    }
    reassignMobileMenuHeight() {
      const e2 = this.isToggleActive() ? this.getMenuHeight() : 0;
      return this.setMenuHeight(e2);
    }
    reassignMenuHeight(e2) {
      if (!this.isElementSticky() || 0 === e2.length) return;
      const t2 = elementorFrontend.elements.$window.height() - e2[0].getBoundingClientRect().top;
      e2.height() > t2 && (e2.css("height", this.calculateMenuTabContentHeight(e2) + "px"), e2.css("overflow-y", "scroll"));
    }
    resetMenuHeight(e2) {
      this.isElementSticky() && (e2.css("height", "initial"), e2.css("overflow-y", "visible"));
    }
    isToggleActive() {
      const e2 = this.widgetConfig.elements.$menuToggle;
      return this.widgetConfig.attributes?.menuToggleState ? "true" === e2.attr(this.widgetConfig.attributes.menuToggleState) : e2.hasClass(this.widgetConfig.classes.menuToggleActiveClass);
    }
  };
}, 2258: (e, t, n) => {
  "use strict";
  n.p = ElementorProFrontendConfig.urls.assets + "js/";
}, 4409: (e, t, n) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("code-highlight", (() => n.e(635).then(n.bind(n, 7193))));
    }
  }
  t.default = _default;
}, 4906: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(820));
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("global", i.default, null);
    }
  }
  t.default = _default;
}, 820: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(739));
  class _default extends elementorModules.frontend.handlers.Base {
    __construct(...e2) {
      super.__construct(...e2), this.toggle = elementorFrontend.debounce(this.toggle, 200);
    }
    getDefaultSettings() {
      return { selectors: { container: ".elementor-widget-container" } };
    }
    getDefaultElements() {
      const e2 = this.getSettings("selectors");
      let t2 = this.$element.find(e2.container);
      return 0 === t2.length && (t2 = this.$element), { $container: t2 };
    }
    bindEvents() {
      elementorFrontend.elements.$window.on("resize", this.toggle);
    }
    unbindEvents() {
      elementorFrontend.elements.$window.off("resize", this.toggle);
    }
    addCSSTransformEvents() {
      this.getElementSettings("motion_fx_motion_fx_scrolling") && !this.isTransitionEventAdded && (this.isTransitionEventAdded = true, this.elements.$container.on("mouseenter", (() => {
        this.elements.$container.css("--e-transform-transition-duration", "");
      })));
    }
    initEffects() {
      this.effects = { translateY: { interaction: "scroll", actions: ["translateY"] }, translateX: { interaction: "scroll", actions: ["translateX"] }, rotateZ: { interaction: "scroll", actions: ["rotateZ"] }, scale: { interaction: "scroll", actions: ["scale"] }, opacity: { interaction: "scroll", actions: ["opacity"] }, blur: { interaction: "scroll", actions: ["blur"] }, mouseTrack: { interaction: "mouseMove", actions: ["translateXY"] }, tilt: { interaction: "mouseMove", actions: ["tilt"] } };
    }
    prepareOptions(e2) {
      const t2 = this.getElementSettings(), n2 = "motion_fx" === e2 ? "element" : "background", s2 = {};
      jQuery.each(t2, ((n3, i3) => {
        const o2 = new RegExp("^" + e2 + "_(.+?)_effect"), r2 = n3.match(o2);
        if (!r2 || !i3) return;
        const a2 = {}, l2 = r2[1];
        jQuery.each(t2, ((t3, n4) => {
          const s3 = new RegExp(e2 + "_" + l2 + "_(.+)"), i4 = t3.match(s3);
          if (!i4) return;
          "effect" !== i4[1] && ("object" == typeof n4 && (n4 = Object.keys(n4.sizes).length ? n4.sizes : n4.size), a2[i4[1]] = n4);
        }));
        const c = this.effects[l2], d = c.interaction;
        s2[d] || (s2[d] = {}), c.actions.forEach(((e3) => s2[d][e3] = a2));
      }));
      let i2, o, r = this.$element;
      const a = this.getElementType();
      if ("element" === n2 && !["section", "container"].includes(a)) {
        let e3;
        i2 = r, e3 = "column" === a ? ".elementor-widget-wrap" : ".elementor-widget-container", o = r.find("> " + e3), r = 0 === o.length ? this.$element : o;
      }
      const l = { type: n2, interactions: s2, elementSettings: t2, $element: r, $dimensionsElement: i2, refreshDimensions: this.isEdit, range: t2[e2 + "_range"], classes: { element: "elementor-motion-effects-element", parent: "elementor-motion-effects-parent", backgroundType: "elementor-motion-effects-element-type-background", container: "elementor-motion-effects-container", layer: "elementor-motion-effects-layer", perspective: "elementor-motion-effects-perspective" } };
      return l.range || "fixed" !== this.getCurrentDeviceSetting("_position") || (l.range = "page"), "fixed" === this.getCurrentDeviceSetting("_position") && (l.isFixedPosition = true), "background" === n2 && "column" === this.getElementType() && (l.addBackgroundLayerTo = " > .elementor-element-populated"), l;
    }
    activate(e2) {
      const t2 = this.prepareOptions(e2);
      jQuery.isEmptyObject(t2.interactions) || (this[e2] = new i.default(t2));
    }
    deactivate(e2) {
      this[e2] && (this[e2].destroy(), delete this[e2]);
    }
    toggle() {
      const e2 = elementorFrontend.getCurrentDeviceMode(), t2 = this.getElementSettings();
      ["motion_fx", "background_motion_fx"].forEach(((n2) => {
        const s2 = t2[n2 + "_devices"];
        (!s2 || -1 !== s2.indexOf(e2)) && (t2[n2 + "_motion_fx_scrolling"] || t2[n2 + "_motion_fx_mouse"]) ? this[n2] ? this.refreshInstance(n2) : this.activate(n2) : this.deactivate(n2);
      }));
    }
    refreshInstance(e2) {
      const t2 = this[e2];
      if (!t2) return;
      const n2 = this.prepareOptions(e2);
      t2.setSettings(n2), t2.refresh();
    }
    onInit() {
      super.onInit();
      const e2 = window.matchMedia("(prefers-reduced-motion: reduce)");
      e2 && e2.matches || (this.initEffects(), this.addCSSTransformEvents(), this.toggle());
    }
    onElementChange(e2) {
      if (/motion_fx_((scrolling)|(mouse)|(devices))$/.test(e2)) return "motion_fx_motion_fx_scrolling" === e2 && this.addCSSTransformEvents(), void this.toggle();
      const t2 = e2.match(".*?(motion_fx|_transform)");
      if (t2) {
        const e3 = t2[0].match("(_transform)") ? "motion_fx" : t2[0];
        this.refreshInstance(e3), this[e3] || this.activate(e3);
      }
      /^_position/.test(e2) && ["motion_fx", "background_motion_fx"].forEach(((e3) => {
        this.refreshInstance(e3);
      }));
    }
    onDestroy() {
      super.onDestroy(), ["motion_fx", "background_motion_fx"].forEach(((e2) => {
        this.deactivate(e2);
      }));
    }
  }
  t.default = _default;
}, 3039: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    getMovePointFromPassedPercents(e2, t2) {
      return +(t2 / e2 * 100).toFixed(2);
    }
    getEffectValueFromMovePoint(e2, t2) {
      return e2 * t2 / 100;
    }
    getStep(e2, t2) {
      return "element" === this.getSettings("type") ? this.getElementStep(e2, t2) : this.getBackgroundStep(e2, t2);
    }
    getElementStep(e2, t2) {
      return -(e2 - 50) * t2.speed;
    }
    getBackgroundStep(e2, t2) {
      const n = this.getSettings("dimensions.movable" + t2.axis.toUpperCase());
      return -this.getEffectValueFromMovePoint(n, e2);
    }
    getDirectionMovePoint(e2, t2, n) {
      let s;
      return e2 < n.start ? "out-in" === t2 ? s = 0 : "in-out" === t2 ? s = 100 : (s = this.getMovePointFromPassedPercents(n.start, e2), "in-out-in" === t2 && (s = 100 - s)) : e2 < n.end ? "in-out-in" === t2 ? s = 0 : "out-in-out" === t2 ? s = 100 : (s = this.getMovePointFromPassedPercents(n.end - n.start, e2 - n.start), "in-out" === t2 && (s = 100 - s)) : "in-out" === t2 ? s = 0 : "out-in" === t2 ? s = 100 : (s = this.getMovePointFromPassedPercents(100 - n.end, 100 - e2), "in-out-in" === t2 && (s = 100 - s)), s;
    }
    translateX(e2, t2) {
      e2.axis = "x", e2.unit = "px", this.transform("translateX", t2, e2);
    }
    translateY(e2, t2) {
      e2.axis = "y", e2.unit = "px", this.transform("translateY", t2, e2);
    }
    translateXY(e2, t2, n) {
      this.translateX(e2, t2), this.translateY(e2, n);
    }
    tilt(e2, t2, n) {
      const s = { speed: e2.speed / 10, direction: e2.direction };
      this.rotateX(s, n), this.rotateY(s, 100 - t2);
    }
    rotateX(e2, t2) {
      e2.axis = "x", e2.unit = "deg", this.transform("rotateX", t2, e2);
    }
    rotateY(e2, t2) {
      e2.axis = "y", e2.unit = "deg", this.transform("rotateY", t2, e2);
    }
    rotateZ(e2, t2) {
      e2.unit = "deg", this.transform("rotateZ", t2, e2);
    }
    scale(e2, t2) {
      const n = this.getDirectionMovePoint(t2, e2.direction, e2.range);
      this.updateRulePart("transform", "scale", 1 + e2.speed * n / 1e3);
    }
    transform(e2, t2, n) {
      n.direction && (t2 = 100 - t2), this.updateRulePart("transform", e2, this.getStep(t2, n) + n.unit);
    }
    setCSSTransformVariables(e2) {
      this.CSSTransformVariables = [], jQuery.each(e2, ((e3, t2) => {
        const n = e3.match(/_transform_(.+?)_effect/m);
        if (n && t2) {
          if ("perspective" === n[1]) return void this.CSSTransformVariables.unshift(n[1]);
          if (this.CSSTransformVariables.includes(n[1])) return;
          this.CSSTransformVariables.push(n[1]);
        }
      }));
    }
    opacity(e2, t2) {
      const n = this.getDirectionMovePoint(t2, e2.direction, e2.range), s = e2.level / 10, i = 1 - s + this.getEffectValueFromMovePoint(s, n);
      this.$element.css({ opacity: i, "will-change": "opacity" });
    }
    blur(e2, t2) {
      const n = this.getDirectionMovePoint(t2, e2.direction, e2.range), s = e2.level - this.getEffectValueFromMovePoint(e2.level, n);
      this.updateRulePart("filter", "blur", s + "px");
    }
    updateRulePart(e2, t2, n) {
      this.rulesVariables[e2] || (this.rulesVariables[e2] = {}), this.rulesVariables[e2][t2] || (this.rulesVariables[e2][t2] = true, this.updateRule(e2));
      const s = `--${t2}`;
      this.$element[0].style.setProperty(s, n);
    }
    updateRule(e2) {
      let t2 = "";
      t2 += this.concatTransformCSSProperties(e2), t2 += this.concatTransformMotionEffectCSSProperties(e2), this.$element.css(e2, t2);
    }
    concatTransformCSSProperties(e2) {
      let t2 = "";
      return "transform" === e2 && jQuery.each(this.CSSTransformVariables, ((e3, n) => {
        const s = n;
        n.startsWith("flip") && (n = n.replace("flip", "scale"));
        const i = n.startsWith("rotate") || n.startsWith("skew") ? "deg" : "px", o = n.startsWith("scale") ? 1 : 0 + i;
        t2 += `${n}(var(--e-transform-${s}, ${o}))`;
      })), t2;
    }
    concatTransformMotionEffectCSSProperties(e2) {
      let t2 = "";
      return jQuery.each(this.rulesVariables[e2], ((e3) => {
        t2 += `${e3}(var(--${e3}))`;
      })), t2;
    }
    runAction(e2, t2, n, ...s) {
      t2.affectedRange && (t2.affectedRange.start > n && (n = t2.affectedRange.start), t2.affectedRange.end < n && (n = t2.affectedRange.end)), this[e2](t2, n, ...s);
    }
    refresh() {
      this.rulesVariables = {}, this.CSSTransformVariables = [], this.$element.css({ transform: "", filter: "", opacity: "", "will-change": "" });
    }
    onInit() {
      this.$element = this.getSettings("$targetElement"), this.refresh();
    }
  }
  t.default = _default;
}, 3323: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.ViewModule {
    __construct(e2) {
      this.motionFX = e2.motionFX, this.intersectionObservers || this.setElementInViewportObserver();
    }
    setElementInViewportObserver() {
      this.intersectionObserver = elementorModules.utils.Scroll.scrollObserver({ callback: (e3) => {
        e3.isInViewport ? this.onInsideViewport() : this.removeAnimationFrameRequest();
      } });
      const e2 = "page" === this.motionFX.getSettings("range") ? elementorFrontend.elements.$body[0] : this.motionFX.elements.$parent[0];
      this.intersectionObserver.observe(e2);
    }
    onInsideViewport = () => {
      this.run(), this.animationFrameRequest = requestAnimationFrame(this.onInsideViewport);
    };
    runCallback(...e2) {
      this.getSettings("callback")(...e2);
    }
    removeIntersectionObserver() {
      this.intersectionObserver && this.intersectionObserver.unobserve(this.motionFX.elements.$parent[0]);
    }
    removeAnimationFrameRequest() {
      this.animationFrameRequest && cancelAnimationFrame(this.animationFrameRequest);
    }
    destroy() {
      this.removeAnimationFrameRequest(), this.removeIntersectionObserver();
    }
    onInit() {
      super.onInit();
    }
  }
  t.default = _default;
}, 5481: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(3323));
  class MouseMoveInteraction extends i.default {
    bindEvents() {
      MouseMoveInteraction.mouseTracked || (elementorFrontend.elements.$window.on("mousemove", MouseMoveInteraction.updateMousePosition), MouseMoveInteraction.mouseTracked = true);
    }
    run() {
      const e2 = MouseMoveInteraction.mousePosition, t2 = this.oldMousePosition;
      if (t2.x === e2.x && t2.y === e2.y) return;
      this.oldMousePosition = { x: e2.x, y: e2.y };
      const n2 = 100 / innerWidth * e2.x, s2 = 100 / innerHeight * e2.y;
      this.runCallback(n2, s2);
    }
    onInit() {
      this.oldMousePosition = {}, super.onInit();
    }
  }
  t.default = MouseMoveInteraction, MouseMoveInteraction.mousePosition = {}, MouseMoveInteraction.updateMousePosition = (e2) => {
    MouseMoveInteraction.mousePosition = { x: e2.clientX, y: e2.clientY };
  };
}, 2647: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(3323));
  class _default extends i.default {
    run() {
      if (pageYOffset === this.windowScrollTop) return false;
      this.onScrollMovement(), this.windowScrollTop = pageYOffset;
    }
    onScrollMovement() {
      this.updateMotionFxDimensions(), this.updateAnimation(), this.resetTransitionVariable();
    }
    resetTransitionVariable() {
      this.motionFX.$element.css("--e-transform-transition-duration", "100ms");
    }
    updateMotionFxDimensions() {
      this.motionFX.getSettings().refreshDimensions && this.motionFX.defineDimensions();
    }
    updateAnimation() {
      let e2;
      e2 = "page" === this.motionFX.getSettings("range") ? elementorModules.utils.Scroll.getPageScrollPercentage() : this.motionFX.getSettings("isFixedPosition") ? elementorModules.utils.Scroll.getPageScrollPercentage({}, window.innerHeight) : elementorModules.utils.Scroll.getElementViewportPercentage(this.motionFX.elements.$parent), this.runCallback(e2);
    }
  }
  t.default = _default;
}, 739: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(2647)), o = s(n(5481)), r = s(n(3039));
  class _default extends elementorModules.ViewModule {
    getDefaultSettings() {
      return { type: "element", $element: null, $dimensionsElement: null, addBackgroundLayerTo: null, interactions: {}, refreshDimensions: false, range: "viewport", classes: { element: "motion-fx-element", parent: "motion-fx-parent", backgroundType: "motion-fx-element-type-background", container: "motion-fx-container", layer: "motion-fx-layer", perspective: "motion-fx-perspective" } };
    }
    bindEvents() {
      this.defineDimensions = this.defineDimensions.bind(this), elementorFrontend.elements.$window.on("resize elementor-pro/motion-fx/recalc", this.defineDimensions);
    }
    unbindEvents() {
      elementorFrontend.elements.$window.off("resize elementor-pro/motion-fx/recalc", this.defineDimensions);
    }
    addBackgroundLayer() {
      const e2 = this.getSettings();
      this.elements.$motionFXContainer = jQuery("<div>", { class: e2.classes.container }), this.elements.$motionFXLayer = jQuery("<div>", { class: e2.classes.layer }), this.updateBackgroundLayerSize(), this.elements.$motionFXContainer.prepend(this.elements.$motionFXLayer);
      (e2.addBackgroundLayerTo ? this.$element.find(e2.addBackgroundLayerTo) : this.$element).prepend(this.elements.$motionFXContainer);
    }
    removeBackgroundLayer() {
      this.elements.$motionFXContainer.remove();
    }
    updateBackgroundLayerSize() {
      const e2 = this.getSettings(), t2 = { x: 0, y: 0 }, n2 = e2.interactions.mouseMove, s2 = e2.interactions.scroll;
      n2 && n2.translateXY && (t2.x = 10 * n2.translateXY.speed, t2.y = 10 * n2.translateXY.speed), s2 && (s2.translateX && (t2.x = 10 * s2.translateX.speed), s2.translateY && (t2.y = 10 * s2.translateY.speed)), this.elements.$motionFXLayer.css({ width: 100 + t2.x + "%", height: 100 + t2.y + "%" });
    }
    defineDimensions() {
      const e2 = this.getSettings("$dimensionsElement") || this.$element, t2 = e2.offset(), n2 = { elementHeight: e2.outerHeight(), elementWidth: e2.outerWidth(), elementTop: t2.top, elementLeft: t2.left };
      n2.elementRange = n2.elementHeight + innerHeight, this.setSettings("dimensions", n2), "background" === this.getSettings("type") && this.defineBackgroundLayerDimensions();
    }
    defineBackgroundLayerDimensions() {
      const e2 = this.getSettings("dimensions");
      e2.layerHeight = this.elements.$motionFXLayer.height(), e2.layerWidth = this.elements.$motionFXLayer.width(), e2.movableX = e2.layerWidth - e2.elementWidth, e2.movableY = e2.layerHeight - e2.elementHeight, this.setSettings("dimensions", e2);
    }
    initInteractionsTypes() {
      this.interactionsTypes = { scroll: i.default, mouseMove: o.default };
    }
    prepareSpecialActions() {
      const e2 = this.getSettings(), t2 = !(!e2.interactions.mouseMove || !e2.interactions.mouseMove.tilt);
      this.elements.$parent.toggleClass(e2.classes.perspective, t2);
    }
    cleanSpecialActions() {
      const e2 = this.getSettings();
      this.elements.$parent.removeClass(e2.classes.perspective);
    }
    runInteractions() {
      const e2 = this.getSettings();
      this.actions.setCSSTransformVariables(e2.elementSettings), this.prepareSpecialActions(), jQuery.each(e2.interactions, ((e3, t2) => {
        this.interactions[e3] = new this.interactionsTypes[e3]({ motionFX: this, callback: (...e4) => {
          jQuery.each(t2, ((t3, n2) => this.actions.runAction(t3, n2, ...e4)));
        } }), this.interactions[e3].run();
      }));
    }
    destroyInteractions() {
      this.cleanSpecialActions(), jQuery.each(this.interactions, ((e2, t2) => t2.destroy())), this.interactions = {};
    }
    refresh() {
      this.actions.setSettings(this.getSettings()), "background" === this.getSettings("type") && (this.updateBackgroundLayerSize(), this.defineBackgroundLayerDimensions()), this.actions.refresh(), this.destroyInteractions(), this.runInteractions();
    }
    destroy() {
      this.destroyInteractions(), this.actions.refresh();
      const e2 = this.getSettings();
      this.$element.removeClass(e2.classes.element), this.elements.$parent.removeClass(e2.classes.parent), "background" === e2.type && (this.$element.removeClass(e2.classes.backgroundType), this.removeBackgroundLayer());
    }
    onInit() {
      super.onInit();
      const e2 = this.getSettings();
      this.$element = e2.$element, this.elements.$parent = this.$element.parent(), this.$element.addClass(e2.classes.element), this.elements.$parent = this.$element.parent(), this.elements.$parent.addClass(e2.classes.parent), "background" === e2.type && (this.$element.addClass(e2.classes.backgroundType), this.addBackgroundLayer()), this.defineDimensions(), e2.$targetElement = "element" === e2.type ? this.$element : this.elements.$motionFXLayer, this.interactions = {}, this.actions = new r.default(e2), this.initInteractionsTypes(), this.runInteractions();
    }
  }
  t.default = _default;
}, 8098: (e, t, n) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("paypal-button", (() => n.e(375).then(n.bind(n, 466)))), elementorFrontend.elementsHandler.attachHandler("stripe-button", (() => Promise.all([n.e(786), n.e(857)]).then(n.bind(n, 9036))));
    }
  }
  t.default = _default;
}, 6275: (e, t, n) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("progress-tracker", (() => n.e(581).then(n.bind(n, 287))));
    }
  }
  t.default = _default;
}, 2450: (e, t, n) => {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(2121));
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("section", i.default, null), elementorFrontend.elementsHandler.attachHandler("container", i.default, null), elementorFrontend.elementsHandler.attachHandler("widget", i.default, null);
    }
  }
  t.default = _default;
}, 2121: (e, t, n) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = n(6550);
  t.default = elementorModules.frontend.handlers.Base.extend({ currentConfig: {}, debouncedReactivate: null, bindEvents() {
    elementorFrontend.addListenerOnce(this.getUniqueHandlerID() + "sticky", "resize", this.reactivateOnResize);
  }, unbindEvents() {
    elementorFrontend.removeListeners(this.getUniqueHandlerID() + "sticky", "resize", this.reactivateOnResize);
  }, isStickyInstanceActive() {
    return void 0 !== this.$element.data("sticky");
  }, getResponsiveSetting(e2) {
    const t2 = this.getElementSettings();
    return elementorFrontend.getCurrentDeviceSetting(t2, e2);
  }, getResponsiveSettingList: (e2) => ["", ...Object.keys(elementorFrontend.config.responsive.activeBreakpoints)].map(((t2) => t2 ? `${e2}_${t2}` : e2)), getConfig() {
    const e2 = this.getElementSettings(), t2 = { to: e2.sticky, offset: this.getResponsiveSetting("sticky_offset"), effectsOffset: this.getResponsiveSetting("sticky_effects_offset"), classes: { sticky: "elementor-sticky", stickyActive: "elementor-sticky--active elementor-section--handles-inside", stickyEffects: "elementor-sticky--effects", spacer: "elementor-sticky__spacer" }, isRTL: elementorFrontend.config.is_rtl, isScrollSnapActive: (0, s.isScrollSnapActive)(), handleScrollbarWidth: elementorFrontend.isEditMode() }, n2 = elementorFrontend.elements.$wpAdminBar, i = this.isContainerElement(this.$element[0]) && !this.isContainerElement(this.$element[0].parentElement);
    return n2.length && "top" === e2.sticky && "fixed" === n2.css("position") && (t2.offset += n2.height()), e2.sticky_parent && !i && (t2.parent = ".e-con, .e-con-inner, .elementor-widget-wrap"), t2;
  }, activate() {
    this.currentConfig = this.getConfig(), this.$element.sticky(this.currentConfig);
  }, deactivate() {
    this.isStickyInstanceActive() && this.$element.sticky("destroy");
  }, run(e2) {
    if (this.getElementSettings("sticky")) {
      var t2 = elementorFrontend.getCurrentDeviceMode();
      -1 !== this.getElementSettings("sticky_on").indexOf(t2) ? true === e2 ? this.reactivate() : this.isStickyInstanceActive() || this.activate() : this.deactivate();
    } else this.deactivate();
  }, reactivateOnResize() {
    clearTimeout(this.debouncedReactivate), this.debouncedReactivate = setTimeout((() => {
      const e2 = this.getConfig();
      JSON.stringify(e2) !== JSON.stringify(this.currentConfig) && this.run(true);
    }), 300);
  }, reactivate() {
    this.deactivate(), this.activate();
  }, onElementChange(e2) {
    -1 !== ["sticky", "sticky_on"].indexOf(e2) && this.run(true);
    -1 !== [...this.getResponsiveSettingList("sticky_offset"), ...this.getResponsiveSettingList("sticky_effects_offset"), "sticky_parent"].indexOf(e2) && this.reactivate();
  }, onDeviceModeChange() {
    setTimeout((() => this.run(true)));
  }, onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments), elementorFrontend.isEditMode() && elementor.listenTo(elementor.channels.deviceMode, "change", (() => this.onDeviceModeChange())), this.run();
  }, onDestroy() {
    elementorModules.frontend.handlers.Base.prototype.onDestroy.apply(this, arguments), this.deactivate();
  }, isContainerElement: (e2) => ["e-con", "e-con-inner"].some(((t2) => e2?.classList.contains(t2))) });
}, 7937: (e, t, n) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.hooks.addAction("frontend/element_ready/video-playlist.default", ((e2) => {
        n.e(519).then(n.bind(n, 4161)).then((({ default: t2 }) => {
          elementorFrontend.elementsHandler.addHandler(t2, { $element: e2, toggleSelf: false });
        }));
      }));
    }
  }
  t.default = _default;
}, 6550: (e, t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.isScrollSnapActive = t.escapeHTML = void 0;
  t.escapeHTML = (e2) => {
    const t2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return e2.replace(/[&<>'"]/g, ((e3) => t2[e3] || e3));
  };
  t.isScrollSnapActive = () => "yes" === (elementorFrontend.isEditMode() ? elementor.settings.page.model.attributes?.scroll_snap : elementorFrontend.config.settings.page?.scroll_snap);
}, 6784: (e) => {
  e.exports = function _interopRequireDefault(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }, e.exports.__esModule = true, e.exports.default = e.exports;
} }, (e) => {
  var t;
  t = 3e3, e(e.s = t);
}]);
"use strict";
(self.webpackChunkelementor_pro = self.webpackChunkelementor_pro || []).push([[624], { 2371: (e, t, n) => {
  var o = n(6784), s = o(n(6137)), r = o(n(7371)), i = o(n(3746)), l = o(n(9880)), a = o(n(6238)), d = o(n(4286)), u = o(n(4043)), c = o(n(1750)), m = o(n(4486)), h = o(n(1459)), g = o(n(8534)), f = o(n(6034)), p = o(n(6075)), _ = o(n(570)), v = o(n(9302)), b = o(n(6302)), y = o(n(7492)), F = o(n(8241)), M = o(n(325)), w = o(n(7467)), S = o(n(1953)), H = o(n(282)), E = o(n(2969)), O = o(n(5355)), T = o(n(8945));
  const extendDefaultHandlers = (e2) => ({ ...e2, ...{ animatedText: s.default, carousel: r.default, countdown: i.default, dynamicTags: l.default, hotspot: a.default, form: d.default, gallery: u.default, lottie: c.default, nav_menu: m.default, popup: h.default, posts: g.default, share_buttons: f.default, slides: p.default, social: _.default, themeBuilder: b.default, themeElements: y.default, woocommerce: F.default, tableOfContents: v.default, loopBuilder: M.default, megaMenu: w.default, nestedCarousel: S.default, taxonomyFilter: H.default, offCanvas: E.default, contactButtons: O.default, search: T.default } });
  elementorProFrontend.on("elementor-pro/modules/init/before", (() => {
    elementorFrontend.hooks.addFilter("elementor-pro/frontend/handlers", extendDefaultHandlers);
  }));
}, 4921: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class AjaxHelper {
    addLoadingAnimationOverlay(e2) {
      const t2 = document.querySelector(`.elementor-element-${e2}`);
      t2 && t2.classList.add("e-loading-overlay");
    }
    removeLoadingAnimationOverlay(e2) {
      const t2 = document.querySelector(`.elementor-element-${e2}`);
      t2 && t2.classList.remove("e-loading-overlay");
    }
  };
}, 6914: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.focusableElementSelectors = function focusableElementSelectors() {
    return "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], a[href], area[href], [tabindex]";
  };
}, 5921: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.close = void 0;
  const s = new (o(n(5194))).default("eicon");
  t.close = { get element() {
    return s.createSvgElement("close", { path: "M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z", width: 1e3, height: 1e3 });
  } };
}, 5194: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class IconsManager {
    static symbolsContainer;
    static iconsUsageList = [];
    constructor(e2) {
      if (this.prefix = `${e2}-`, !IconsManager.symbolsContainer) {
        const e3 = "e-font-icon-svg-symbols";
        IconsManager.symbolsContainer = document.getElementById(e3), IconsManager.symbolsContainer || (IconsManager.symbolsContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg"), IconsManager.symbolsContainer.setAttributeNS(null, "style", "display: none;"), IconsManager.symbolsContainer.setAttributeNS(null, "class", e3), document.body.appendChild(IconsManager.symbolsContainer));
      }
    }
    createSvgElement(e2, { path: t2, width: n, height: o }) {
      const s = this.prefix + e2, r = "#" + this.prefix + e2;
      if (!IconsManager.iconsUsageList.includes(s)) {
        if (!IconsManager.symbolsContainer.querySelector(r)) {
          const e3 = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
          e3.id = s, e3.innerHTML = '<path d="' + t2 + '"></path>', e3.setAttributeNS(null, "viewBox", "0 0 " + n + " " + o), IconsManager.symbolsContainer.appendChild(e3);
        }
        IconsManager.iconsUsageList.push(s);
      }
      const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      return i.innerHTML = '<use xlink:href="' + r + '" />', i.setAttributeNS(null, "class", "e-font-icon-svg e-" + s), i;
    }
  }
  t.default = IconsManager;
}, 7754: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var o = n(6914);
  t.default = class ModalKeyboardHandler {
    lastFocusableElement = null;
    firstFocusableElement = null;
    modalTriggerElement = null;
    constructor(e2) {
      this.config = e2, this.changeFocusAfterAnimation = false;
    }
    onOpenModal() {
      this.initializeElements(), this.setTriggerElement(), this.changeFocusAfterAnimation = "popup" === this.config.modalType && !!this.config.hasEntranceAnimation, this.changeFocusAfterAnimation || this.changeFocus(), this.bindEvents();
    }
    onCloseModal() {
      elementorFrontend.elements.$window.off("keydown", this.onKeyDownPressed.bind(this)), this.modalTriggerElement && this.setFocusToElement(this.modalTriggerElement);
    }
    bindEvents() {
      elementorFrontend.elements.$window.on("keydown", this.onKeyDownPressed.bind(this)), this.changeFocusAfterAnimation && this.config.$modalElements.on("animationend animationcancel", this.changeFocus.bind(this)), "popup" === this.config.modalType && this.onPopupCloseEvent();
    }
    onPopupCloseEvent() {
      elementorFrontend.elements.$window.on("elementor/popup/hide", this.onCloseModal.bind(this));
    }
    getFocusableElements() {
      const e2 = "popup" === this.config.modalType ? ":focusable" : (0, o.focusableElementSelectors)();
      return this.config.$modalElements.find(e2);
    }
    initializeElements() {
      const e2 = this.getFocusableElements();
      e2.length && (this.lastFocusableElement = e2[e2.length - 1], this.firstFocusableElement = e2[0]);
    }
    setTriggerElement() {
      const e2 = elementorFrontend.elements.window.document.activeElement;
      this.modalTriggerElement = e2 ? elementorFrontend.elements.window.document.activeElement : null;
    }
    changeFocus() {
      this.firstFocusableElement ? this.setFocusToElement(this.firstFocusableElement) : (this.config.$elementWrapper.attr("tabindex", "0"), this.setFocusToElement(this.config.$elementWrapper[0]));
    }
    onKeyDownPressed(e2) {
      const t2 = e2.shiftKey, n2 = "Tab" === e2.key || 9 === e2.keyCode, o2 = "0" === this.config.$elementWrapper.attr("tabindex");
      n2 && o2 ? e2.preventDefault() : n2 && this.onTabKeyPressed(n2, t2, e2);
    }
    onTabKeyPressed(e2, t2, n2) {
      elementorFrontend.isEditMode() && this.initializeElements();
      const o2 = elementorFrontend.elements.window.document.activeElement;
      if (t2) {
        o2 === this.firstFocusableElement && (this.setFocusToElement(this.lastFocusableElement), n2.preventDefault());
      } else {
        o2 === this.lastFocusableElement && (this.setFocusToElement(this.firstFocusableElement), n2.preventDefault());
      }
    }
    setFocusToElement(e2) {
      const t2 = "popup" === this.config.modalType ? 250 : 100;
      setTimeout((() => {
        e2?.focus();
      }), t2);
    }
  };
}, 5012: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = function runElementHandlers(e2) {
    [...e2].flatMap(((e3) => [...e3.querySelectorAll(".elementor-element")])).forEach(((e3) => elementorFrontend.elementsHandler.runReadyTrigger(e3)));
  };
}, 6137: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("animated-headline", (() => n.e(961).then(n.bind(n, 2590))));
    }
  }
  t.default = _default;
}, 7371: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("media-carousel", (() => n.e(692).then(n.bind(n, 8948)))), elementorFrontend.elementsHandler.attachHandler("testimonial-carousel", (() => n.e(897).then(n.bind(n, 7181)))), elementorFrontend.elementsHandler.attachHandler("reviews", (() => n.e(897).then(n.bind(n, 7181))));
    }
  }
  t.default = _default;
}, 3746: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("countdown", (() => n.e(416).then(n.bind(n, 475))));
    }
  }
  t.default = _default;
}, 9880: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.on("components:init", (() => this.onFrontendComponentsInit()));
    }
    onFrontendComponentsInit() {
      elementorFrontend.utils.urlActions.addAction("reload-page", (() => document.location.reload()));
    }
  }
  t.default = _default;
}, 5355: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.config.experimentalFeatures.container && (["contact-buttons-var-1", "contact-buttons-var-3", "contact-buttons-var-4", "contact-buttons-var-5", "contact-buttons-var-6", "contact-buttons-var-7", "contact-buttons-var-8", "contact-buttons-var-9"].forEach(((e2) => {
        elementorFrontend.elementsHandler.attachHandler(e2, (() => n.e(1).then(n.bind(n, 197))));
      })), elementorFrontend.elementsHandler.attachHandler("contact-buttons-var-10", (() => n.e(61).then(n.bind(n, 7263)))), elementorFrontend.elementsHandler.attachHandler("floating-bars-var-2", (() => n.e(249).then(n.bind(n, 2319)))), elementorFrontend.elementsHandler.attachHandler("floating-bars-var-3", (() => n.e(440).then(n.bind(n, 7704)))));
    }
  }
  t.default = _default;
}, 4286: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("form", [() => n.e(325).then(n.bind(n, 9230)), () => n.e(325).then(n.bind(n, 2176)), () => n.e(325).then(n.bind(n, 9613)), () => n.e(325).then(n.bind(n, 2478)), () => n.e(325).then(n.bind(n, 733)), () => n.e(325).then(n.bind(n, 6935))]), elementorFrontend.elementsHandler.attachHandler("subscribe", [() => n.e(325).then(n.bind(n, 9230)), () => n.e(325).then(n.bind(n, 2176)), () => n.e(325).then(n.bind(n, 9613))]);
    }
  }
  t.default = _default;
}, 4043: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("gallery", (() => n.e(543).then(n.bind(n, 771))));
    }
  }
  t.default = _default;
}, 6238: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("hotspot", (() => n.e(292).then(n.bind(n, 507))));
    }
  }
  t.default = _default;
}, 325: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), ["post", "product", "post_taxonomy", "product_taxonomy"].forEach(((e2) => {
        elementorFrontend.elementsHandler.attachHandler("loop-grid", (() => n.e(535).then(n.bind(n, 2245))), e2), elementorFrontend.elementsHandler.attachHandler("loop-grid", (() => n.e(993).then(n.bind(n, 2813))), e2), elementorFrontend.elementsHandler.attachHandler("loop-carousel", (() => n.e(993).then(n.bind(n, 2813))), e2), elementorFrontend.elementsHandler.attachHandler("loop-carousel", (() => n.e(932).then(n.bind(n, 7992))), e2), elementorFrontend.elementsHandler.attachHandler("loop-grid", (() => n.e(550).then(n.bind(n, 4734))), e2);
      }));
    }
  }
  t.default = _default;
}, 9585: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(5012)), r = o(n(4921)), i = o(n(1368)), l = n(275);
  class BaseFilterFrontendModule extends elementorModules.Module {
    constructor() {
      super(), this.loopWidgetsStore = new i.default();
    }
    removeFilterFromLoopWidget(e2, t2, n2 = "", o2 = "") {
      if (!this.loopWidgetsStore.getWidget(e2)) return this.loopWidgetsStore.addWidget(e2), void this.refreshLoopWidget(e2, t2);
      if (n2 === o2 && this.loopWidgetsStore.unsetFilter(e2, t2), n2 !== o2) {
        const o3 = this.loopWidgetsStore.getFilterTerms(e2, t2).filter((function(e3) {
          return e3 !== n2;
        }));
        this.loopWidgetsStore.setFilterTerms(e2, t2, o3);
      }
      this.refreshLoopWidget(e2, t2);
    }
    setFilterDataForLoopWidget(e2, t2, n2, o2 = true, s2 = "DISABLED") {
      this.loopWidgetsStore.maybeInitializeWidget(e2), this.loopWidgetsStore.maybeInitializeFilter(e2, t2);
      const r2 = this.validateMultipleFilterOperator(s2);
      if ("DISABLED" !== r2) {
        const o3 = this.loopWidgetsStore.getFilterTerms(e2, t2) ?? [], s3 = n2.filterData.terms;
        n2.filterData.terms = [.../* @__PURE__ */ new Set([...o3, ...s3])], n2.filterData.logicalJoin = r2;
      }
      this.loopWidgetsStore.setFilter(e2, t2, n2), o2 ? this.refreshLoopWidget(e2, t2) : this.loopWidgetsStore.consolidateFilters(e2);
    }
    validateMultipleFilterOperator(e2) {
      return e2 && ["AND", "OR"].includes(e2) ? e2 : "DISABLED";
    }
    getQueryStringInObjectForm() {
      const e2 = {};
      for (const t2 in this.loopWidgetsStore.get()) {
        const n2 = this.loopWidgetsStore.getWidget(t2);
        for (const o2 in n2.consolidatedFilters) {
          const s2 = n2.consolidatedFilters[o2];
          for (const n3 in s2) {
            const o3 = l.queryConstants[s2[n3].logicalJoin ?? "AND"].separator.decoded;
            e2[`e-filter-${t2}-${n3}`] = Object.values(s2[n3].terms).join(o3);
          }
        }
      }
      return e2;
    }
    updateURLQueryString(e2, t2) {
      const n2 = new URL(window.location.href).searchParams, o2 = this.getQueryStringInObjectForm(), s2 = new URLSearchParams();
      n2.forEach(((t3, n3) => {
        n3.startsWith("e-filter") || s2.append(n3, t3), n3.startsWith("e-page-" + e2) && s2.delete(n3);
      }));
      for (const e3 in o2) s2.set(e3, o2[e3]);
      let r2 = s2.toString();
      r2 = r2.replace(new RegExp(`${l.queryConstants.AND.separator.encoded}`, "g"), l.queryConstants.AND.separator.decoded), r2 = r2.replace(new RegExp(`${l.queryConstants.OR.separator.encoded}`, "g"), l.queryConstants.OR.separator.decoded);
      const i2 = this.getFilterHelperAttributes(t2);
      r2 = i2.pageNum > 1 ? r2 ? this.formatQueryString(i2.baseUrl, r2) : i2.baseUrl : r2 ? `?${r2}` : location.pathname, history.pushState(null, null, r2);
    }
    formatQueryString(e2, t2) {
      const n2 = e2.includes("?") ? new URLSearchParams(e2.split("?")[1]) : new URLSearchParams(), o2 = new URLSearchParams(t2);
      for (const e3 of n2.keys()) o2.has(e3) && o2.delete(e3);
      const s2 = ["page", "paged"];
      for (const e3 of s2) n2.delete(e3), o2.delete(e3);
      const r2 = new URLSearchParams(n2.toString());
      for (const [e3, t3] of o2.entries()) r2.append(e3, t3);
      return e2.split("?")[0] + (r2.toString() ? `?${r2.toString()}` : "");
    }
    getFilterHelperAttributes(e2) {
      const t2 = document.querySelector('[data-id="' + e2 + '"]');
      if (!t2) return { baseUrl: location.href, pageNum: 1 };
      return t2.querySelector(".e-filter").dataset;
    }
    prepareLoopUpdateRequestData(e2, t2) {
      const n2 = this.loopWidgetsStore.getConsolidatedFilters(e2), o2 = this.getFilterHelperAttributes(t2), s2 = { post_id: this.getClosestDataElementorId(document.querySelector(`.elementor-element-${e2}`)) || elementorFrontend.config.post.id, widget_filters: n2, widget_id: e2, pagination_base_url: o2.baseUrl };
      if (elementorFrontend.isEditMode()) {
        const t3 = window.top.$e.components.get("document").utils.findContainerById(e2);
        s2.widget_model = t3.model.toJSON({ remove: ["default", "editSettings", "defaultEditSettings"] }), s2.is_edit_mode = true;
      }
      return s2;
    }
    getClosestDataElementorId(e2) {
      const t2 = e2?.closest("[data-elementor-id]");
      return t2 ? t2.getAttribute("data-elementor-id") : null;
    }
    getFetchArgumentsForLoopUpdate(e2, t2) {
      const n2 = this.prepareLoopUpdateRequestData(e2, t2), o2 = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(n2) };
      return elementorFrontend.isEditMode() && elementorPro.config.loopFilter?.nonce && (o2.headers["X-WP-Nonce"] = elementorPro.config.loopFilter?.nonce), o2;
    }
    fetchUpdatedLoopWidgetMarkup(e2, t2) {
      return fetch(`${elementorProFrontend.config.urls.rest}elementor-pro/v1/refresh-loop`, this.getFetchArgumentsForLoopUpdate(e2, t2));
    }
    createElementFromHTMLString(e2) {
      const t2 = document.createElement("div");
      return e2 ? (t2.innerHTML = e2.trim(), t2.firstElementChild) : (t2.classList.add("elementor-widget-container"), t2);
    }
    refreshLoopWidget(e2, t2) {
      this.loopWidgetsStore.consolidateFilters(e2), this.updateURLQueryString(e2, t2);
      const n2 = document.querySelector(`.elementor-element-${e2}`);
      if (!n2) return;
      this.ajaxHelper || (this.ajaxHelper = new r.default()), this.ajaxHelper.addLoadingAnimationOverlay(e2);
      return this.fetchUpdatedLoopWidgetMarkup(e2, t2).then(((e3) => e3 instanceof Response && e3?.ok && !(400 <= e3?.status) ? e3.json() : {})).catch((() => ({}))).then(((t3) => {
        if (!t3?.data && "" !== t3?.data) return;
        const o2 = n2.querySelector(".elementor-widget-container"), s2 = this.createElementFromHTMLString(t3.data);
        n2.replaceChild(s2, o2), this.handleElementHandlers(n2), ElementorProFrontendConfig.settings.lazy_load_background_images && document.dispatchEvent(new Event("elementor/lazyload/observe")), elementorFrontend.elementsHandler.runReadyTrigger(document.querySelector(`.elementor-element-${e2}`)), n2.classList.remove("e-loading");
      })).finally((() => {
        this.ajaxHelper.removeLoadingAnimationOverlay(e2);
      }));
    }
    handleElementHandlers(e2) {
      const t2 = e2.querySelectorAll(".e-loop-item");
      (0, s.default)(t2);
    }
  }
  t.default = BaseFilterFrontendModule;
}, 282: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(9585));
  class LoopFilter extends s.default {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("taxonomy-filter", (() => n.e(225).then(n.bind(n, 2236))));
    }
  }
  t.default = LoopFilter;
}, 1368: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class LoopWidgetsStore {
    constructor() {
      this.widgets = {};
    }
    get() {
      return this.widgets;
    }
    getWidget(e2) {
      return this.widgets[e2];
    }
    setWidget(e2, t2) {
      this.widgets[e2] = t2;
    }
    unsetWidget(e2) {
      delete this.widgets[e2];
    }
    getFilters(e2) {
      return this.getWidget(e2).filters;
    }
    getFilter(e2, t2) {
      return this.getWidget(e2).filters[t2];
    }
    setFilter(e2, t2, n) {
      this.getWidget(e2).filters[t2] = n;
    }
    unsetFilter(e2, t2) {
      delete this.getWidget(e2).filters[t2];
    }
    getFilterTerms(e2, t2) {
      return this.getFilter(e2, t2).filterData.terms ?? [];
    }
    setFilterTerms(e2, t2, n) {
      this.getFilter(e2, t2).filterData.terms = n;
    }
    getConsolidatedFilters(e2) {
      return this.getWidget(e2).consolidatedFilters;
    }
    setConsolidatedFilters(e2, t2) {
      this.getWidget(e2).consolidatedFilters = t2;
    }
    addWidget(e2) {
      this.setWidget(e2, { filters: {}, consolidatedFilters: {} });
    }
    maybeInitializeWidget(e2) {
      this.getWidget(e2) || this.addWidget(e2);
    }
    maybeInitializeFilter(e2, t2) {
      if (this.getFilter(e2, t2)) return;
      this.setFilter(e2, t2, { filterData: { terms: [] } });
    }
    consolidateFilters(e2) {
      const t2 = this.getFilters(e2), n = {};
      for (const e3 in t2) {
        const o = t2[e3], s = o.filterType, r = o.filterData;
        0 !== r.terms.length && (n[s] || (n[s] = {}), n[s][r.selectedTaxonomy] || (n[s][r.selectedTaxonomy] = []), !r.terms || n[s][r.selectedTaxonomy].terms && n[s][r.selectedTaxonomy].terms.includes(r.terms) || (n[s][r.selectedTaxonomy] = { terms: "string" === r.terms ? [r.terms] : r.terms }), r.logicalJoin && !n[s][r.selectedTaxonomy].logicalJoin && (n[s][r.selectedTaxonomy] = { ...n[s][r.selectedTaxonomy] || {}, logicalJoin: r.logicalJoin ?? "AND" }));
      }
      this.setConsolidatedFilters(e2, n);
    }
  };
}, 275: (e) => {
  e.exports = { queryConstants: { AND: { separator: { decoded: "+", fromBrowser: " ", encoded: "%2B" }, operator: "AND" }, OR: { separator: { decoded: "~", fromBrowser: "~", encoded: "%7C" }, operator: "IN" }, NOT: { separator: { decoded: "!", fromBrowser: "!", encoded: "%21" }, operator: "NOT IN" }, DISABLED: { separator: { decoded: "", fromBrowser: "", encoded: "" }, operator: "AND" } } };
}, 1750: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("lottie", (() => n.e(970).then(n.bind(n, 5200))));
    }
  }
  t.default = _default;
}, 7467: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("mega-menu", [() => n.e(727).then(n.bind(n, 3431)), () => n.e(87).then(n.bind(n, 8636)), () => n.e(912).then(n.bind(n, 9774))]);
    }
  }
  t.default = _default;
}, 4486: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), jQuery.fn.smartmenus && (jQuery.SmartMenus.prototype.isCSSOn = function() {
        return true;
      }, elementorFrontend.config.is_rtl && (jQuery.fn.smartmenus.defaults.rightToLeftSubMenus = true)), elementorFrontend.elementsHandler.attachHandler("nav-menu", (() => n.e(334).then(n.bind(n, 757))));
    }
  }
  t.default = _default;
}, 1953: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("nested-carousel", (() => n.e(33).then(n.bind(n, 1195))));
    }
  }
  t.default = _default;
}, 2969: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("off-canvas", (() => n.e(579).then(n.bind(n, 9547)))), elementorFrontend.on("components:init", (() => this.onFrontendComponentsInit()));
    }
    onFrontendComponentsInit() {
      this.addUrlActions();
    }
    addUrlActions() {
      elementorFrontend.utils.urlActions.addAction("off_canvas:open", ((e2) => {
        this.toggleOffCanvasDisplay(e2);
      })), elementorFrontend.utils.urlActions.addAction("off_canvas:close", ((e2) => {
        this.toggleOffCanvasDisplay(e2);
      })), elementorFrontend.utils.urlActions.addAction("off_canvas:toggle", ((e2) => {
        this.toggleOffCanvasDisplay(e2);
      }));
    }
    toggleOffCanvasDisplay(e2) {
      window.dispatchEvent(new CustomEvent("elementor-pro/off-canvas/toggle-display-mode", { detail: e2 }));
    }
  }
  t.default = _default;
}, 2506: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(3758)), r = o(n(5469)), i = n(5921), l = o(n(7754));
  class _default extends elementorModules.frontend.Document {
    keyboardHandler = null;
    bindEvents() {
      const e2 = this.getDocumentSettings("open_selector");
      e2 && elementorFrontend.elements.$body.on("click", e2, this.showModal.bind(this));
    }
    startTiming() {
      new r.default(this.getDocumentSettings("timing"), this).check() && this.initTriggers();
    }
    initTriggers() {
      this.triggers = new s.default(this.getDocumentSettings("triggers"), this);
    }
    showModal(e2) {
      const t2 = this.getDocumentSettings();
      if (!this.isEdit) {
        if (!elementorFrontend.isWPPreviewMode()) {
          if (this.getStorage("disable")) return;
          if (e2 && elementorProFrontend.modules.popup.popupPopped && t2.avoid_multiple_popups) return;
        }
        this.$element = jQuery(this.elementHTML), this.elements.$elements = this.$element.find(this.getSettings("selectors.elements"));
      }
      const n2 = this.getModal(), o2 = n2.getElements("closeButton");
      n2.setMessage(this.$element).show(), this.isEdit || (t2.close_button_delay && (o2.hide(), clearTimeout(this.closeButtonTimeout), this.closeButtonTimeout = setTimeout((() => o2.show()), 1e3 * t2.close_button_delay)), super.runElementsHandlers()), this.setEntranceAnimation(), t2.timing && t2.timing.times_count || this.countTimes(), elementorProFrontend.modules.popup.popupPopped = true, !this.isEdit && t2.a11y_navigation && this.handleKeyboardA11y();
    }
    setEntranceAnimation() {
      const e2 = this.getModal().getElements("widgetContent"), t2 = this.getDocumentSettings(), n2 = elementorFrontend.getCurrentDeviceSetting(t2, "entrance_animation");
      if (this.currentAnimation && e2.removeClass(this.currentAnimation), this.currentAnimation = n2, !n2) return;
      const o2 = t2.entrance_animation_duration.size;
      e2.addClass(n2), setTimeout((() => e2.removeClass(n2)), 1e3 * o2);
    }
    handleKeyboardA11y() {
      this.keyboardHandler || (this.keyboardHandler = new l.default(this.getKeyboardHandlingConfig())), this.keyboardHandler.onOpenModal();
    }
    setExitAnimation() {
      const e2 = this.getModal(), t2 = this.getDocumentSettings(), n2 = e2.getElements("widgetContent"), o2 = elementorFrontend.getCurrentDeviceSetting(t2, "exit_animation"), s2 = o2 ? t2.entrance_animation_duration.size : 0;
      setTimeout((() => {
        o2 && n2.removeClass(o2 + " reverse"), this.isEdit || (this.$element.remove(), e2.getElements("widget").hide());
      }), 1e3 * s2), o2 && n2.addClass(o2 + " reverse");
    }
    initModal() {
      let e2;
      this.getModal = () => {
        if (!e2) {
          const t2 = this.getDocumentSettings(), n2 = this.getSettings("id"), triggerPopupEvent = (e3) => {
            const t3 = "elementor/popup/" + e3;
            elementorFrontend.elements.$document.trigger(t3, [n2, this]), window.dispatchEvent(new CustomEvent(t3, { detail: { id: n2, instance: this } }));
          };
          let o2 = "elementor-popup-modal";
          t2.classes && (o2 += " " + t2.classes);
          const s2 = { id: "elementor-popup-modal-" + n2, className: o2, closeButton: true, preventScroll: t2.prevent_scroll, onShow: () => triggerPopupEvent("show"), onHide: () => triggerPopupEvent("hide"), effects: { hide: () => {
            t2.timing && t2.timing.times_count && this.countTimes(), this.setExitAnimation();
          }, show: "show" }, hide: { auto: !!t2.close_automatically, autoDelay: 1e3 * t2.close_automatically, onBackgroundClick: !t2.prevent_close_on_background_click, onOutsideClick: !t2.prevent_close_on_background_click, onEscKeyPress: !t2.prevent_close_on_esc_key, ignore: ".flatpickr-calendar" }, position: { enable: false } };
          elementorFrontend.config.experimentalFeatures.e_font_icon_svg && (s2.closeButtonOptions = { iconElement: i.close.element }), s2.closeButtonClass = "eicon-close", e2 = elementorFrontend.getDialogsManager().createWidget("lightbox", s2), e2.getElements("widgetContent").addClass("animated");
          const r2 = e2.getElements("closeButton");
          this.isEdit && (r2.off("click"), e2.hide = () => {
          }), this.setCloseButtonPosition();
        }
        return e2;
      };
    }
    setCloseButtonPosition() {
      const e2 = this.getModal(), t2 = this.getDocumentSettings("close_button_position");
      e2.getElements("closeButton").prependTo(e2.getElements("outside" === t2 ? "widget" : "widgetContent"));
    }
    disable() {
      this.setStorage("disable", true);
    }
    setStorage(e2, t2, n2) {
      elementorFrontend.storage.set(`popup_${this.getSettings("id")}_${e2}`, t2, n2);
    }
    getStorage(e2, t2) {
      return elementorFrontend.storage.get(`popup_${this.getSettings("id")}_${e2}`, t2);
    }
    countTimes() {
      const e2 = this.getStorage("times") || 0;
      this.setStorage("times", e2 + 1);
    }
    runElementsHandlers() {
    }
    async onInit() {
      super.onInit(), window.DialogsManager || await elementorFrontend.utils.assetsLoader.load("script", "dialog"), this.initModal(), this.isEdit ? this.showModal() : (this.$element.show().remove(), this.elementHTML = this.$element[0].outerHTML, elementorFrontend.isEditMode() || (elementorFrontend.isWPPreviewMode() && elementorFrontend.config.post.id === this.getSettings("id") ? this.showModal() : this.startTiming()));
    }
    onSettingsChange(e2) {
      const t2 = Object.keys(e2.changed)[0];
      -1 !== t2.indexOf("entrance_animation") && this.setEntranceAnimation(), "exit_animation" === t2 && this.setExitAnimation(), "close_button_position" === t2 && this.setCloseButtonPosition();
    }
    getEntranceAnimationDuration() {
      const e2 = this.getDocumentSettings(), t2 = e2?.entrance_animation;
      if (!t2 || "" === t2 || "none" === t2) return 0;
      const n2 = e2?.entrance_animation_duration?.size;
      return n2 ? Number(n2) : 0;
    }
    getKeyboardHandlingConfig() {
      return { $modalElements: this.getModal().getElements("widgetContent"), $elementWrapper: this.$element, hasEntranceAnimation: 0 !== this.getEntranceAnimationDuration(), modalType: "popup", modalId: this.$element.data("elementor-id") };
    }
  }
  t.default = _default;
}, 1459: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2506));
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.hooks.addAction("elementor/frontend/documents-manager/init-classes", this.addDocumentClass), elementorFrontend.elementsHandler.attachHandler("form", (() => n.e(887).then(n.bind(n, 5985)))), elementorFrontend.on("components:init", (() => this.onFrontendComponentsInit())), this.shouldSetViewsAndSessions() && this.setViewsAndSessions();
    }
    shouldSetViewsAndSessions() {
      return !elementorFrontend.isEditMode() && !elementorFrontend.isWPPreviewMode() && ElementorProFrontendConfig.popup.hasPopUps;
    }
    addDocumentClass(e2) {
      e2.addDocumentClass("popup", s.default);
    }
    setViewsAndSessions() {
      const e2 = elementorFrontend.storage.get("pageViews") || 0;
      elementorFrontend.storage.set("pageViews", e2 + 1);
      if (!elementorFrontend.storage.get("activeSession", { session: true })) {
        elementorFrontend.storage.set("activeSession", true, { session: true });
        const e3 = elementorFrontend.storage.get("sessions") || 0;
        elementorFrontend.storage.set("sessions", e3 + 1);
      }
    }
    showPopup(e2, t2) {
      const n2 = elementorFrontend.documentsManager.documents[e2.id];
      if (!n2) return;
      const o2 = n2.getModal();
      e2.toggle && o2.isVisible() ? o2.hide() : n2.showModal(null, t2);
    }
    closePopup(e2, t2) {
      const n2 = jQuery(t2.target).parents('[data-elementor-type="popup"]').data("elementorId");
      if (!n2) return;
      const o2 = elementorFrontend.documentsManager.documents[n2];
      o2.getModal().hide(), e2.do_not_show_again && o2.disable();
    }
    onFrontendComponentsInit() {
      elementorFrontend.utils.urlActions.addAction("popup:open", ((e2, t2) => this.showPopup(e2, t2))), elementorFrontend.utils.urlActions.addAction("popup:close", ((e2, t2) => this.closePopup(e2, t2)));
    }
  }
  t.default = _default;
}, 5469: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(164)), r = o(n(5873)), i = o(n(7471)), l = o(n(2880)), a = o(n(5104)), d = o(n(1837)), u = o(n(3940)), c = o(n(1533)), m = o(n(8254));
  class _default extends elementorModules.Module {
    constructor(e2, t2) {
      super(e2), this.document = t2, this.timingClasses = { page_views: s.default, sessions: r.default, url: i.default, sources: l.default, logged_in: a.default, devices: d.default, times: u.default, browsers: c.default, schedule: m.default };
    }
    check() {
      const e2 = this.getSettings();
      let t2 = true;
      return jQuery.each(this.timingClasses, ((n2, o2) => {
        if (!e2[n2]) return;
        new o2(e2, this.document).check() || (t2 = false);
      })), t2;
    }
  }
  t.default = _default;
}, 2733: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor(e2, t2) {
      super(e2), this.document = t2;
    }
    getTimingSetting(e2) {
      return this.getSettings(this.getName() + "_" + e2);
    }
  }
  t.default = _default;
}, 1533: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "browsers";
    }
    check() {
      if ("all" === this.getTimingSetting("browsers")) return true;
      const e2 = this.getTimingSetting("browsers_options"), t2 = elementorFrontend.utils.environment;
      return e2.some(((e3) => t2[e3]));
    }
  }
  t.default = _default;
}, 1837: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "devices";
    }
    check() {
      return -1 !== this.getTimingSetting("devices").indexOf(elementorFrontend.getCurrentDeviceMode());
    }
  }
  t.default = _default;
}, 5104: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "logged_in";
    }
    check() {
      const e2 = elementorFrontend.config.user;
      if (!e2) return true;
      if ("all" === this.getTimingSetting("users")) return false;
      return !this.getTimingSetting("roles").filter(((t2) => -1 !== e2.roles.indexOf(t2))).length;
    }
  }
  t.default = _default;
}, 164: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "page_views";
    }
    check() {
      const e2 = elementorFrontend.storage.get("pageViews"), t2 = this.getName();
      let n2 = this.document.getStorage(t2 + "_initialPageViews");
      return n2 || (this.document.setStorage(t2 + "_initialPageViews", e2), n2 = e2), e2 - n2 >= this.getTimingSetting("views");
    }
  }
  t.default = _default;
}, 9901: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class ScheduleUtils {
    constructor(e2) {
      this.settings = e2.settings;
    }
    getCurrentDateTime() {
      let e2 = /* @__PURE__ */ new Date();
      return "site" === this.settings.timezone && this.settings.serverDatetime && (e2 = new Date(this.settings.serverDatetime)), e2;
    }
    shouldDisplay = () => {
      if (!this.settings.startDate && !this.settings.endDate) return true;
      const e2 = this.getCurrentDateTime();
      return (!this.settings.startDate || e2 >= this.settings.startDate) && (!this.settings.endDate || e2 <= this.settings.endDate);
    };
  };
}, 8254: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733)), r = o(n(9901));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2);
      const { schedule_timezone: t2, schedule_start_date: n2, schedule_end_date: o2, schedule_server_datetime: s2 } = this.getSettings();
      this.settings = { timezone: t2, startDate: !!n2 && new Date(n2), endDate: !!o2 && new Date(o2), serverDatetime: !!s2 && new Date(s2) }, this.scheduleUtils = new r.default({ settings: this.settings });
    }
    getName() {
      return "schedule";
    }
    check() {
      return this.scheduleUtils.shouldDisplay();
    }
  }
  t.default = _default;
}, 5873: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "sessions";
    }
    check() {
      const e2 = elementorFrontend.storage.get("sessions"), t2 = this.getName();
      let n2 = this.document.getStorage(t2 + "_initialSessions");
      return n2 || (this.document.setStorage(t2 + "_initialSessions", e2), n2 = e2), e2 - n2 >= this.getTimingSetting("sessions");
    }
  }
  t.default = _default;
}, 2880: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "sources";
    }
    check() {
      const e2 = this.getTimingSetting("sources");
      if (3 === e2.length) return true;
      const t2 = document.referrer.replace(/https?:\/\/(?:www\.)?/, "");
      return 0 === t2.indexOf(location.host.replace("www.", "")) ? -1 !== e2.indexOf("internal") : -1 !== e2.indexOf("external") || -1 !== e2.indexOf("search") && /^(google|yahoo|bing|yandex|baidu)\./.test(t2);
    }
  }
  t.default = _default;
}, 1744: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  t.default = class TimesUtils {
    constructor(e2) {
      this.uniqueId = e2.uniqueId, this.settings = e2.settings, this.storage = e2.storage;
    }
    getTimeFramesInSecounds(e2) {
      return { day: 86400, week: 604800, month: 2628288 }[e2];
    }
    setExpiration(e2, t2, n) {
      if (this.storage.get(e2)) this.storage.set(e2, t2);
      else {
        const o = { lifetimeInSeconds: this.getTimeFramesInSecounds(n) };
        this.storage.set(e2, t2, o);
      }
    }
    getImpressionsCount() {
      const e2 = this.storage.get(this.uniqueId) ?? 0;
      return parseInt(e2);
    }
    incrementImpressionsCount() {
      if (this.settings.period) if ("session" !== this.settings.period) {
        const e2 = this.getImpressionsCount();
        this.setExpiration(this.uniqueId, e2 + 1, this.settings.period);
      } else sessionStorage.setItem(this.uniqueId, parseInt(sessionStorage.getItem(this.uniqueId) ?? 0) + 1);
      else this.storage.set("times", (this.storage.get("times") ?? 0) + 1);
    }
    shouldCountOnOpen() {
      this.settings.countOnOpen && this.incrementImpressionsCount();
    }
    shouldDisplayPerTimeFrame() {
      return this.getImpressionsCount() < this.settings.showsLimit && (this.shouldCountOnOpen(), true);
    }
    shouldDisplayPerSession() {
      const e2 = sessionStorage.getItem(this.uniqueId) ?? 0;
      return parseInt(e2) < this.settings.showsLimit && (this.shouldCountOnOpen(), true);
    }
    shouldDisplayBackwordCompatible(e2 = 0, t2) {
      const n = parseInt(e2) < parseInt(t2);
      return this.shouldCountOnOpen(), n;
    }
  };
}, 3940: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733)), r = o(n(1744));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2), this.uniqueId = `popup-${this.document.getSettings("id")}-impressions-count`;
      const { times_count: t2, times_period: n2, times_times: o2 } = this.getSettings();
      this.settings = { countOnOpen: t2, period: n2, showsLimit: parseInt(o2) }, "" === this.settings.period && (this.settings.period = false), ["", "close"].includes(this.settings.countOnOpen) ? (this.settings.countOnOpen = false, this.onPopupHide()) : this.settings.countOnOpen = true, this.utils = new r.default({ uniqueId: this.uniqueId, settings: this.settings, storage: elementorFrontend.storage });
    }
    getName() {
      return "times";
    }
    check() {
      if (!this.settings.period) {
        const e2 = this.document.getStorage("times") || 0, t2 = this.getTimingSetting("times");
        return this.utils.shouldDisplayBackwordCompatible(e2, t2);
      }
      if ("session" !== this.settings.period) {
        if (!this.utils.shouldDisplayPerTimeFrame()) return false;
      } else if (!this.utils.shouldDisplayPerSession()) return false;
      return true;
    }
    onPopupHide() {
      window.addEventListener("elementor/popup/hide", (() => {
        this.utils.incrementImpressionsCount();
      }));
    }
  }
  t.default = _default;
}, 7471: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(2733));
  class _default extends s.default {
    getName() {
      return "url";
    }
    check() {
      const e2 = this.getTimingSetting("url"), t2 = this.getTimingSetting("action"), n2 = document.referrer;
      if ("regex" !== t2) return "hide" === t2 ^ -1 !== n2.indexOf(e2);
      let o2;
      try {
        o2 = new RegExp(e2);
      } catch (e3) {
        return false;
      }
      return o2.test(n2);
    }
  }
  t.default = _default;
}, 3758: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(9739)), r = o(n(9226)), i = o(n(4270)), l = o(n(1697)), a = o(n(9143)), d = o(n(3676)), u = o(n(7541));
  class _default extends elementorModules.Module {
    constructor(e2, t2) {
      super(e2), this.document = t2, this.triggers = [], this.triggerClasses = { page_load: s.default, scrolling: r.default, scrolling_to: i.default, click: l.default, inactivity: a.default, exit_intent: d.default, adblock_detection: u.default }, this.runTriggers();
    }
    runTriggers() {
      const e2 = this.getSettings();
      jQuery.each(this.triggerClasses, ((t2, n2) => {
        if (!e2[t2]) return;
        const o2 = new n2(e2, (() => this.onTriggerFired()));
        o2.run(), this.triggers.push(o2);
      }));
    }
    destroyTriggers() {
      this.triggers.forEach(((e2) => e2.destroy())), this.triggers = [];
    }
    onTriggerFired() {
      this.document.showModal(true), this.destroyTriggers();
    }
  }
  t.default = _default;
}, 7541: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    getName() {
      return "adblock_detection";
    }
    generateRandomString() {
      const e2 = "abcdefghijklmnopqrstuvwxyz0123456789";
      let t2 = "";
      for (let n2 = 0; n2 < 6; n2++) {
        t2 += e2[Math.floor(36 * Math.random())];
      }
      return t2;
    }
    hasAdblock() {
      const e2 = `elementor-adblock-detection-${this.generateRandomString()}`;
      this.createEmptyAdBlockElement(e2);
      const t2 = document.querySelector(`#${e2}`);
      if (!t2) return true;
      const n2 = "none" === window.getComputedStyle(t2)?.display;
      return this.removeEmptyAdBlockElement(t2), n2;
    }
    createEmptyAdBlockElement(e2) {
      const t2 = document.createElement("div");
      t2.id = e2, t2.className = "ad-box", t2.style.position = "fixed", t2.style.top = "0", t2.style.left = "0", t2.setAttribute("aria-hidden", "true"), t2.innerHTML = "&nbsp;", document.body.appendChild(t2);
    }
    removeEmptyAdBlockElement(e2) {
      e2.remove();
    }
    run() {
      this.timeout = setTimeout((() => {
        this.hasAdblock() && this.callback();
      }), 1e3 * this.getTriggerSetting("delay"));
    }
    destroy() {
      clearTimeout(this.timeout);
    }
  }
  t.default = _default;
}, 6904: (e, t) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor(e2, t2) {
      super(e2), this.callback = t2;
    }
    getTriggerSetting(e2) {
      return this.getSettings(this.getName() + "_" + e2);
    }
  }
  t.default = _default;
}, 1697: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2), this.checkClick = this.checkClick.bind(this), this.clicksCount = 0;
    }
    getName() {
      return "click";
    }
    checkClick() {
      this.clicksCount++, this.clicksCount === this.getTriggerSetting("times") && this.callback();
    }
    run() {
      elementorFrontend.elements.$body.on("click", this.checkClick);
    }
    destroy() {
      elementorFrontend.elements.$body.off("click", this.checkClick);
    }
  }
  t.default = _default;
}, 3676: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2), this.detectExitIntent = this.detectExitIntent.bind(this);
    }
    getName() {
      return "exit_intent";
    }
    detectExitIntent(e2) {
      e2.clientY <= 0 && this.callback();
    }
    run() {
      elementorFrontend.elements.$window.on("mouseleave", this.detectExitIntent);
    }
    destroy() {
      elementorFrontend.elements.$window.off("mouseleave", this.detectExitIntent);
    }
  }
  t.default = _default;
}, 9143: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2), this.restartTimer = this.restartTimer.bind(this);
    }
    getName() {
      return "inactivity";
    }
    run() {
      this.startTimer(), elementorFrontend.elements.$document.on("keypress mousemove", this.restartTimer);
    }
    startTimer() {
      this.timeOut = setTimeout(this.callback, 1e3 * this.getTriggerSetting("time"));
    }
    clearTimer() {
      clearTimeout(this.timeOut);
    }
    restartTimer() {
      this.clearTimer(), this.startTimer();
    }
    destroy() {
      this.clearTimer(), elementorFrontend.elements.$document.off("keypress mousemove", this.restartTimer);
    }
  }
  t.default = _default;
}, 9739: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    getName() {
      return "page_load";
    }
    run() {
      this.timeout = setTimeout(this.callback, 1e3 * this.getTriggerSetting("delay"));
    }
    destroy() {
      clearTimeout(this.timeout);
    }
  }
  t.default = _default;
}, 4270: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    getName() {
      return "scrolling_to";
    }
    run() {
      let e2;
      try {
        e2 = jQuery(this.getTriggerSetting("selector"));
      } catch (e3) {
        return;
      }
      e2.length && (this.setUpIntersectionObserver(), this.observer.observe(e2[0]));
    }
    setUpIntersectionObserver() {
      this.observer = new IntersectionObserver(((e2) => {
        e2.forEach(((e3) => {
          e3.isIntersecting && this.callback();
        }));
      }));
    }
    destroy() {
      this.observer && this.observer.disconnect();
    }
  }
  t.default = _default;
}, 9226: (e, t, n) => {
  var o = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var s = o(n(6904));
  class _default extends s.default {
    constructor(...e2) {
      super(...e2), this.checkScroll = this.checkScroll.bind(this), this.lastScrollOffset = 0;
    }
    getName() {
      return "scrolling";
    }
    checkScroll() {
      const e2 = scrollY > this.lastScrollOffset ? "down" : "up", t2 = this.getTriggerSetting("direction");
      if (this.lastScrollOffset = scrollY, e2 !== t2) return;
      if ("up" === e2) return void this.callback();
      const n2 = elementorFrontend.elements.$document.height() - innerHeight;
      scrollY / n2 * 100 >= this.getTriggerSetting("offset") && this.callback();
    }
    run() {
      elementorFrontend.elements.$window.on("scroll", this.checkScroll);
    }
    destroy() {
      elementorFrontend.elements.$window.off("scroll", this.checkScroll);
    }
  }
  t.default = _default;
}, 8534: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), ["classic", "full_content", "cards"].forEach(((e2) => {
        elementorFrontend.elementsHandler.attachHandler("posts", (() => n.e(535).then(n.bind(n, 2078))), e2);
      })), elementorFrontend.elementsHandler.attachHandler("posts", (() => n.e(396).then(n.bind(n, 2195))), "classic"), elementorFrontend.elementsHandler.attachHandler("posts", (() => n.e(396).then(n.bind(n, 2195))), "full_content"), elementorFrontend.elementsHandler.attachHandler("posts", (() => n.e(396).then(n.bind(n, 7907))), "cards"), elementorFrontend.elementsHandler.attachHandler("portfolio", (() => n.e(726).then(n.bind(n, 2232))));
    }
  }
  t.default = _default;
}, 8945: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("search", [() => n.e(187).then(n.bind(n, 6963)), () => n.e(187).then(n.bind(n, 7112))]);
    }
  }
  t.default = _default;
}, 6034: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("share-buttons", (() => n.e(316).then(n.bind(n, 3607))));
    }
  }
  t.default = _default;
}, 6075: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("slides", (() => n.e(829).then(n.bind(n, 3271))));
    }
  }
  t.default = _default;
}, 570: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("facebook-button", (() => n.e(158).then(n.bind(n, 5070)))), elementorFrontend.elementsHandler.attachHandler("facebook-comments", (() => n.e(158).then(n.bind(n, 5070)))), elementorFrontend.elementsHandler.attachHandler("facebook-embed", (() => n.e(158).then(n.bind(n, 5070)))), elementorFrontend.elementsHandler.attachHandler("facebook-page", (() => n.e(158).then(n.bind(n, 5070))));
    }
  }
  t.default = _default;
}, 9302: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("table-of-contents", (() => Promise.all([n.e(786), n.e(404)]).then(n.bind(n, 3827))));
    }
  }
  t.default = _default;
}, 6302: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), ["archive_classic", "archive_full_content", "archive_cards"].forEach(((e2) => {
        elementorFrontend.elementsHandler.attachHandler("archive-posts", (() => n.e(345).then(n.bind(n, 439))), e2);
      })), elementorFrontend.elementsHandler.attachHandler("archive-posts", (() => n.e(345).then(n.bind(n, 6629))), "archive_classic"), elementorFrontend.elementsHandler.attachHandler("archive-posts", (() => n.e(345).then(n.bind(n, 6629))), "archive_full_content"), elementorFrontend.elementsHandler.attachHandler("archive-posts", (() => n.e(345).then(n.bind(n, 2718))), "archive_cards"), jQuery((function() {
        var e2 = location.search.match(/theme_template_id=(\d*)/), t2 = e2 ? jQuery(".elementor-" + e2[1]) : [];
        t2.length && jQuery("html, body").animate({ scrollTop: t2.offset().top - window.innerHeight / 2 });
      }));
    }
  }
  t.default = _default;
}, 7492: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("search-form", (() => n.e(798).then(n.bind(n, 9319))));
    }
  }
  t.default = _default;
}, 8241: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  class _default extends elementorModules.Module {
    constructor() {
      super(), elementorFrontend.elementsHandler.attachHandler("woocommerce-menu-cart", (() => n.e(6).then(n.bind(n, 2115)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-purchase-summary", (() => n.e(80).then(n.bind(n, 193)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-checkout-page", (() => n.e(354).then(n.bind(n, 9391)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-cart", (() => n.e(4).then(n.bind(n, 2937)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-my-account", (() => n.e(662).then(n.bind(n, 1627)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-notices", (() => n.e(621).then(n.bind(n, 4702)))), elementorFrontend.elementsHandler.attachHandler("woocommerce-product-add-to-cart", (() => n.e(787).then(n.bind(n, 6973)))), elementorFrontend.isEditMode() && elementorFrontend.on("components:init", (() => {
        elementorFrontend.elements.$body.find(".elementor-widget-woocommerce-cart").length || elementorFrontend.elements.$body.append('<div class="woocommerce-cart-form">');
      }));
    }
  }
  t.default = _default;
}, 2470: (e) => {
  e.exports = wp.i18n;
} }, (e) => {
  e.O(0, [313], (() => {
    return t = 2371, e(e.s = t);
    var t;
  }));
  e.O();
}]);
