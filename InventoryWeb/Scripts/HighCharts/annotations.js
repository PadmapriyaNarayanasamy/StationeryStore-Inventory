﻿/*
 Highcharts JS v7.0.1 (2018-12-19)
 Annotations module

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (l) { "object" === typeof module && module.exports ? module.exports = l : "function" === typeof define && define.amd ? define(function () { return l }) : l("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (l) {
    var B = function (a) {
        return {
            addEvents: function () {
                var f = this; a.addEvent(f.graphic.element, "mousedown", function (d) { f.onMouseDown(d) }); a.objectEach(f.options.events, function (d, b) {
                    var c = function (c) { "click" === b && f.cancelClick || d.call(f, f.chart.pointer.normalize(c), f.target) }; if ("drag" !== b) f.graphic.on(b,
                        c); else a.addEvent(f, "drag", c)
                }); f.options.draggable && (a.addEvent(f, "drag", f.onDrag), f.graphic.renderer.styledMode || f.graphic.css({ cursor: { x: "ew-resize", y: "ns-resize", xy: "move" }[f.options.draggable] }))
            }, removeDocEvents: function () { this.removeDrag && (this.removeDrag = this.removeDrag()); this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp()) }, onMouseDown: function (f) {
                var d = this, b = d.chart.pointer, c, h; 2 !== f.button && (f.stopPropagation(), f = b.normalize(f), c = f.chartX, h = f.chartY, d.cancelClick = !1, d.removeDrag =
                    a.addEvent(a.doc, "mousemove", function (p) { d.hasDragged = !0; p = b.normalize(p); p.prevChartX = c; p.prevChartY = h; a.fireEvent(d, "drag", p); c = p.chartX; h = p.chartY }), d.removeMouseUp = a.addEvent(a.doc, "mouseup", function (c) { d.cancelClick = d.hasDragged; d.hasDragged = !1; d.onMouseUp(c) }))
            }, onMouseUp: function () { this.removeDocEvents() }, onDrag: function (a) {
                if (this.chart.isInsidePlot(a.chartX - this.chart.plotLeft, a.chartY - this.chart.plotTop)) {
                    var d = this.mouseMoveToTranslation(a); "x" === this.options.draggable && (d.y = 0); "y" === this.options.draggable &&
                        (d.x = 0); this.points.length ? this.translate(d.x, d.y) : (this.shapes.forEach(function (b) { b.translate(d.x, d.y) }), this.labels.forEach(function (b) { b.translate(d.x, d.y) })); this.redraw(!1)
                }
            }, mouseMoveToRadians: function (a, d, b) { var c = a.prevChartY - b, h = a.prevChartX - d; b = a.chartY - b; a = a.chartX - d; this.chart.inverted && (d = h, h = c, c = d, d = a, a = b, b = d); return Math.atan2(b, a) - Math.atan2(c, h) }, mouseMoveToTranslation: function (a) {
                var d = a.chartX - a.prevChartX; a = a.chartY - a.prevChartY; var b; this.chart.inverted && (b = a, a = d, d = b); return {
                    x: d,
                    y: a
                }
            }, mouseMoveToScale: function (a, d, b) { d = (a.chartX - d || 1) / (a.prevChartX - d || 1); a = (a.chartY - b || 1) / (a.prevChartY - b || 1); this.chart.inverted && (b = a, a = d, d = b); return { x: d, y: a } }, destroy: function () { this.removeDocEvents(); a.removeEvent(this); this.hcEvents = null }
        }
    }(l), C = function (a, f) {
        function d(b, c, h, d) { this.chart = b; this.target = c; this.options = h; this.index = a.pick(h.index, d) } a.extend(d.prototype, f); d.prototype.setVisibility = function (b) { this.graphic.attr("visibility", b ? "visible" : "hidden"); this.options.visible = b }; d.prototype.render =
            function () { var b = this.chart, c = this.options; this.graphic = b.renderer.symbol(c.symbol, 0, 0, c.width, c.height).add(b.controlPointsGroup).css(c.style); this.setVisibility(c.visible); this.addEvents() }; d.prototype.redraw = function (b) { this.graphic[b ? "animate" : "attr"](this.options.positioner.call(this, this.target)) }; d.prototype.destroy = function () { f.destroy.call(this); this.graphic && (this.graphic = this.graphic.destroy()); this.options = this.target = this.chart = null }; d.prototype.update = function (b) {
                var c = this.chart, h =
                    this.target, d = this.index; b = a.merge(!0, this.options, b); this.destroy(); this.constructor(c, h, b, d); this.render(c.controlPointsGroup); this.redraw()
            }; return d
    }(l, B), z = function (a) {
        function f(d, b, c) { this.series = { visible: !0, chart: d, getPlotBox: a.Series.prototype.getPlotBox }; this.target = b || null; this.options = c; this.applyOptions(this.getOptions()) } f.fromPoint = function (a) { return new f(a.series.chart, null, { x: a.x, y: a.y, xAxis: a.series.xAxis, yAxis: a.series.yAxis }) }; f.pointToPixels = function (a, b) {
            var c = a.series, h = c.chart,
                d = a.plotX, g = a.plotY; h.inverted && (a.mock ? (d = a.plotY, g = a.plotX) : (d = h.plotWidth - a.plotY, g = h.plotHeight - a.plotX)); c && !b && (a = c.getPlotBox(), d += a.translateX, g += a.translateY); return { x: d, y: g }
        }; f.pointToOptions = function (a) { return { x: a.x, y: a.y, xAxis: a.series.xAxis, yAxis: a.series.yAxis } }; a.extend(f.prototype, {
            mock: !0, hasDynamicOptions: function () { return "function" === typeof this.options }, getOptions: function () { return this.hasDynamicOptions() ? this.options.call(this, this.target) : this.options }, applyOptions: function (a) {
                this.command =
                    a.command; this.setAxis(a, "x"); this.setAxis(a, "y"); this.refresh()
            }, setAxis: function (d, b) { b += "Axis"; d = d[b]; var c = this.series.chart; this.series[b] = d instanceof a.Axis ? d : a.defined(d) ? c[b][d] || c.get(d) : null }, toAnchor: function () { var a = [this.plotX, this.plotY, 0, 0]; this.series.chart.inverted && (a[0] = this.plotY, a[1] = this.plotX); return a }, getLabelConfig: function () { return { x: this.x, y: this.y, point: this } }, isInsidePane: function () {
                var d = this.plotX, b = this.plotY, c = this.series.xAxis, h = this.series.yAxis, p = !0; c && (p = a.defined(d) &&
                    0 <= d && d <= c.len); h && (p = p && a.defined(b) && 0 <= b && b <= h.len); return p
            }, refresh: function () { var a = this.series, b = a.xAxis, a = a.yAxis, c = this.getOptions(); b ? (this.x = c.x, this.plotX = b.toPixels(c.x, !0)) : (this.x = null, this.plotX = c.x); a ? (this.y = c.y, this.plotY = a.toPixels(c.y, !0)) : (this.y = null, this.plotY = c.y); this.isInside = this.isInsidePane() }, translate: function (a, b, c, h) { this.hasDynamicOptions() || (this.plotX += c, this.plotY += h, this.refreshOptions()) }, scale: function (a, b, c, h) {
                if (!this.hasDynamicOptions()) {
                    var d = this.plotY *
                        h; this.plotX = (1 - c) * a + this.plotX * c; this.plotY = (1 - h) * b + d; this.refreshOptions()
                }
            }, rotate: function (a, b, c) { if (!this.hasDynamicOptions()) { var h = Math.cos(c); c = Math.sin(c); var d = this.plotX, g = this.plotY, d = d - a, g = g - b; this.plotX = d * h - g * c + a; this.plotY = d * c + g * h + b; this.refreshOptions() } }, refreshOptions: function () { var a = this.series, b = a.xAxis, a = a.yAxis; this.x = this.options.x = b ? this.options.x = b.toValue(this.plotX, !0) : this.plotX; this.y = this.options.y = a ? a.toValue(this.plotY, !0) : this.plotY }
        }); return f
    }(l), u = function (a, f,
        d) {
        return {
            init: function (a, c) { this.annotation = a; this.chart = a.chart; this.options = c; this.points = []; this.controlPoints = []; this.linkPoints(); this.addControlPoints() }, attr: function () { this.graphic.attr.apply(this.graphic, arguments) }, getPointsOptions: function () { var b = this.options; return b.points || b.point && a.splat(b.point) }, attrsFromOptions: function (a) { var c = this.constructor.attrsMap, b = {}, d, g, f = this.chart.styledMode; for (d in a) g = c[d], !g || f && -1 !== ["fill", "stroke", "stroke-width"].indexOf(g) || (b[g] = a[d]); return b },
            anchor: function (b) { var c = b.series.getPlotBox(); b = b.mock ? b.toAnchor() : a.Tooltip.prototype.getAnchor.call({ chart: b.series.chart }, b); b = { x: b[0] + (this.options.x || 0), y: b[1] + (this.options.y || 0), height: b[2] || 0, width: b[3] || 0 }; return { relativePosition: b, absolutePosition: a.merge(b, { x: b.x + c.translateX, y: b.y + c.translateY }) } }, point: function (b, c) {
                if (b && b.series) return b; c && null !== c.series || (a.isObject(b) ? c = new d(this.chart, this, b) : a.isString(b) ? c = this.chart.get(b) || null : "function" === typeof b && (c = b.call(c, this), c =
                    c.series ? c : new d(this.chart, this, b))); return c
            }, linkPoints: function () { var a = this.getPointsOptions(), c = this.points, h = a && a.length || 0, d, g; for (d = 0; d < h; d++) { g = this.point(a[d], c[d]); if (!g) { c.length = 0; return } g.mock && g.refresh(); c[d] = g } return c }, addControlPoints: function () { var b = this.options.controlPoints; (b || []).forEach(function (c, h) { c = a.merge(this.options.controlPointOptions, c); c.index || (c.index = h); b[h] = c; this.controlPoints.push(new f(this.chart, this, c)) }, this) }, shouldBeDrawn: function () { return !!this.points.length },
            render: function () { this.controlPoints.forEach(function (a) { a.render() }) }, redraw: function (a) { this.controlPoints.forEach(function (c) { c.redraw(a) }) }, transform: function (a, c, h, d, g) { if (this.chart.inverted) { var b = c; c = h; h = b } this.points.forEach(function (b, k) { this.transformPoint(a, c, h, d, g, k) }, this) }, transformPoint: function (a, c, h, p, g, f) { var b = this.points[f]; b.mock || (b = this.points[f] = d.fromPoint(b)); b[a](c, h, p, g) }, translate: function (a, c) { this.transform("translate", null, null, a, c) }, translatePoint: function (a, c, h) {
                this.transformPoint("translate",
                    null, null, a, c, h)
            }, rotate: function (a, c, h) { this.transform("rotate", a, c, h) }, scale: function (a, c, h, d) { this.transform("scale", a, c, h, d) }, setControlPointsVisibility: function (a) { this.controlPoints.forEach(function (c) { c.setVisibility(a) }) }, destroy: function () { this.graphic && (this.graphic = this.graphic.destroy()); this.tracker && (this.tracker = this.tracker.destroy()); this.controlPoints.forEach(function (a) { a.destroy() }); this.options = this.controlPoints = this.points = this.chart = null; this.annotation && (this.annotation = null) },
            update: function (b) { var c = this.annotation; b = a.merge(!0, this.options, b); var h = this.graphic.parentGroup; this.destroy(); this.constructor(c, b); this.render(h); this.redraw() }
        }
    }(l, C, z), v = function (a) {
        var f = {
            arrow: { tagName: "marker", render: !1, id: "arrow", refY: 5, refX: 9, markerWidth: 10, markerHeight: 10, children: [{ tagName: "path", d: "M 0 0 L 10 5 L 0 10 Z", strokeWidth: 0 }] }, "reverse-arrow": {
                tagName: "marker", render: !1, id: "reverse-arrow", refY: 5, refX: 1, markerWidth: 10, markerHeight: 10, children: [{
                    tagName: "path", d: "M 0 5 L 10 0 L 10 10 Z",
                    strokeWidth: 0
                }]
            }
        }; a.SVGRenderer.prototype.addMarker = function (b, c) { var h = { id: b }, d = { stroke: c.color || "none", fill: c.color || "rgba(0, 0, 0, 0.75)" }; h.children = c.children.map(function (c) { return a.merge(d, c) }); c = this.definition(a.merge(!0, { markerWidth: 20, markerHeight: 20, refX: 0, refY: 0, orient: "auto" }, c, h)); c.id = b; return c }; var d = function (a) { return function (c) { this.attr(a, "url(#" + c + ")") } }, d = {
            markerEndSetter: d("marker-end"), markerStartSetter: d("marker-start"), setItemMarkers: function (b) {
                var c = b.options, h = b.chart,
                    d = h.options.defs, g = c.fill, f = a.defined(g) && "none" !== g ? g : c.stroke;["markerStart", "markerEnd"].forEach(function (g) { var k = c[g], e, m, q; if (k) { for (q in d) if (e = d[q], k === e.id && "marker" === e.tagName) { m = e; break } m && (k = b[g] = h.renderer.addMarker((c.id || a.uniqueKey()) + "-" + m.id, a.merge(m, { color: f })), b.attr(g, k.attr("id"))) } })
            }
        }; a.SVGRenderer.prototype.definition = function (b) {
            function c(b, d) {
                var g; a.splat(b).forEach(function (b) {
                    var k = h.createElement(b.tagName), e = {}; a.objectEach(b, function (a, c) {
                        "tagName" !== c && "children" !==
                            c && "textContent" !== c && (e[c] = a)
                    }); k.attr(e); k.add(d || h.defs); b.textContent && k.element.appendChild(a.doc.createTextNode(b.textContent)); c(b.children || [], k); g = k
                }); return g
            } var h = this; return c(b)
        }; a.addEvent(a.Chart, "afterGetContainer", function () { this.options.defs = a.merge(f, this.options.defs || {}); a.objectEach(this.options.defs, function (a) { "marker" === a.tagName && !1 !== a.render && this.renderer.addMarker(a.id, a) }, this) }); return d
    }(l), v = function (a, f, d) {
        function b(a, c) { this.init(a, c) } var c = "rgba(192,192,192," +
            (a.svg ? .0001 : .002) + ")"; b.attrsMap = { dashStyle: "dashstyle", strokeWidth: "stroke-width", stroke: "stroke", fill: "fill", zIndex: "zIndex" }; a.merge(!0, b.prototype, f, {
                type: "path", setMarkers: d.setItemMarkers, toD: function () {
                    var a = this.options.d; if (a) return "function" === typeof a ? a.call(this) : a; for (var c = this.points, b = c.length, d = b, f = c[0], k = d && this.anchor(f).absolutePosition, e = 0, m = 2, a = k && ["M", k.x, k.y]; ++e < b && d;)f = c[e], d = f.command || "L", k = this.anchor(f).absolutePosition, "Z" === d ? a[++m] = d : (d !== c[e - 1].command && (a[++m] =
                        d), a[++m] = k.x, a[++m] = k.y), d = f.series.visible; return d ? this.chart.renderer.crispLine(a, this.graphic.strokeWidth()) : null
                }, shouldBeDrawn: function () { return f.shouldBeDrawn.call(this) || !!this.options.d }, render: function (b) {
                    var h = this.options, g = this.attrsFromOptions(h); this.graphic = this.annotation.chart.renderer.path(["M", 0, 0]).attr(g).add(b); h.className && this.graphic.addClass(h.className); this.tracker = this.annotation.chart.renderer.path(["M", 0, 0]).addClass("highcharts-tracker-line").attr({ zIndex: 2 }).add(b);
                    this.annotation.chart.styledMode || this.tracker.attr({ "stroke-linejoin": "round", stroke: c, fill: c, "stroke-width": this.graphic.strokeWidth() + 2 * h.snap }); f.render.call(this); a.extend(this.graphic, { markerStartSetter: d.markerStartSetter, markerEndSetter: d.markerEndSetter }); this.setMarkers(this)
                }, redraw: function (a) {
                    var c = this.toD(), b = a ? "animate" : "attr"; c ? (this.graphic[b]({ d: c }), this.tracker[b]({ d: c })) : (this.graphic.attr({ d: "M 0 -9000000000" }), this.tracker.attr({ d: "M 0 -9000000000" })); this.graphic.placed = this.tracker.placed =
                        !!c; f.redraw.call(this, a)
                }
            }); return b
    }(l, u, v), F = function (a, f, d) {
        function b(a, b) { this.init(a, b) } b.attrsMap = a.merge(d.attrsMap, { width: "width", height: "height" }); a.merge(!0, b.prototype, f, {
            type: "rect", render: function (a) { var c = this.attrsFromOptions(this.options); this.graphic = this.annotation.chart.renderer.rect(0, -9E9, 0, 0).attr(c).add(a); f.render.call(this) }, redraw: function (a) {
                var c = this.anchor(this.points[0]).absolutePosition; if (c) this.graphic[a ? "animate" : "attr"]({ x: c.x, y: c.y, width: this.options.width, height: this.options.height });
                else this.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!c; f.redraw.call(this, a)
            }, translate: function (a, b) { this.translatePoint(a, b, 0) }
        }); return b
    }(l, u, v), G = function (a, f, d) {
        function b(a, b) { this.init(a, b) } b.attrsMap = a.merge(d.attrsMap, { r: "r" }); a.merge(!0, b.prototype, f, {
            type: "circle", render: function (a) { var c = this.attrsFromOptions(this.options); this.graphic = this.annotation.chart.renderer.circle(0, -9E9, 0).attr(c).add(a); f.render.call(this) }, redraw: function (a) {
                var c = this.anchor(this.points[0]).absolutePosition;
                if (c) this.graphic[a ? "animate" : "attr"]({ x: c.x, y: c.y, r: this.options.r }); else this.graphic.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!c; f.redraw.call(this, a)
            }, translate: function (a, b) { this.translatePoint(a, b, 0) }, setRadius: function (a) { this.options.r = a }
        }); return b
    }(l, u, v), D = function (a, f, d) {
        function b(a, b) { this.init(a, b) } b.shapesWithoutBackground = ["connector"]; b.alignedPosition = function (a, b) {
            var c = a.align, d = a.verticalAlign, h = (b.x || 0) + (a.x || 0), f = (b.y || 0) + (a.y || 0), k, e; "right" === c ? k = 1 : "center" === c && (k = 2); k &&
                (h += (b.width - (a.width || 0)) / k); "bottom" === d ? e = 1 : "middle" === d && (e = 2); e && (f += (b.height - (a.height || 0)) / e); return { x: Math.round(h), y: Math.round(f) }
        }; b.justifiedOptions = function (a, b, d, g) {
            var c = d.align, h = d.verticalAlign, k = b.box ? 0 : b.padding || 0, e = b.getBBox(); b = { align: c, verticalAlign: h, x: d.x, y: d.y, width: b.width, height: b.height }; d = g.x - a.plotLeft; var m = g.y - a.plotTop; g = d + k; 0 > g && ("right" === c ? b.align = "left" : b.x = -g); g = d + e.width - k; g > a.plotWidth && ("left" === c ? b.align = "right" : b.x = a.plotWidth - g); g = m + k; 0 > g && ("bottom" ===
                h ? b.verticalAlign = "top" : b.y = -g); g = m + e.height - k; g > a.plotHeight && ("top" === h ? b.verticalAlign = "bottom" : b.y = a.plotHeight - g); return b
        }; b.attrsMap = { backgroundColor: "fill", borderColor: "stroke", borderWidth: "stroke-width", zIndex: "zIndex", borderRadius: "r", padding: "padding" }; a.merge(!0, b.prototype, f, {
            translatePoint: function (a, b) { f.translatePoint.call(this, a, b, 0) }, translate: function (a, b) { this.options.x += a; this.options.y += b }, render: function (a) {
                var c = this.options, d = this.attrsFromOptions(c), g = c.style; this.graphic =
                    this.annotation.chart.renderer.label("", 0, -9E9, c.shape, null, null, c.useHTML, null, "annotation-label").attr(d).add(a); this.annotation.chart.styledMode || ("contrast" === g.color && (g.color = this.annotation.chart.renderer.getContrast(-1 < b.shapesWithoutBackground.indexOf(c.shape) ? "#FFFFFF" : c.backgroundColor)), this.graphic.css(c.style).shadow(c.shadow)); c.className && this.graphic.addClass(c.className); this.graphic.labelrank = c.labelrank; f.render.call(this)
            }, redraw: function (c) {
                var b = this.options, d = this.text || b.format ||
                    b.text, g = this.graphic, n = this.points[0]; g.attr({ text: d ? a.format(d, n.getLabelConfig(), this.annotation.chart.time) : b.formatter.call(n, this) }); b = this.anchor(n); (d = this.position(b)) ? (g.alignAttr = d, d.anchorX = b.absolutePosition.x, d.anchorY = b.absolutePosition.y, g[c ? "animate" : "attr"](d)) : g.attr({ x: 0, y: -9E9 }); g.placed = !!d; f.redraw.call(this, c)
            }, anchor: function () {
                var a = f.anchor.apply(this, arguments), b = this.options.x || 0, d = this.options.y || 0; a.absolutePosition.x -= b; a.absolutePosition.y -= d; a.relativePosition.x -=
                    b; a.relativePosition.y -= d; return a
            }, position: function (c) {
                var h = this.graphic, f = this.annotation.chart, g = this.points[0], n = this.options, l = c.absolutePosition, k = c.relativePosition, e; if (c = g.series.visible && d.prototype.isInsidePane.call(g)) n.distance ? e = a.Tooltip.prototype.getPosition.call({ chart: f, distance: a.pick(n.distance, 16) }, h.width, h.height, { plotX: k.x, plotY: k.y, negative: g.negative, ttBelow: g.ttBelow, h: k.height || k.width }) : n.positioner ? e = n.positioner.call(this) : (g = { x: l.x, y: l.y, width: 0, height: 0 }, e = b.alignedPosition(a.extend(n,
                    { width: h.width, height: h.height }), g), "justify" === this.options.overflow && (e = b.alignedPosition(b.justifiedOptions(f, h, n, e), g))), n.crop && (n = e.x - f.plotLeft, g = e.y - f.plotTop, c = f.isInsidePlot(n, g) && f.isInsidePlot(n + h.width, g + h.height)); return c ? e : null
            }
        }); a.SVGRenderer.prototype.symbols.connector = function (b, d, f, g, n) {
            var c = n && n.anchorX; n = n && n.anchorY; var k, e, m = f / 2; a.isNumber(c) && a.isNumber(n) && (k = ["M", c, n], e = d - n, 0 > e && (e = -g - e), e < f && (m = c < b + f / 2 ? e : f - e), n > d + g ? k.push("L", b + m, d + g) : n < d ? k.push("L", b + m, d) : c < b ? k.push("L",
                b, d + g / 2) : c > b + f && k.push("L", b + f, d + g / 2)); return k || []
        }; return b
    }(l, u, z), H = function (a, f, d) {
        function b(a, b) { this.init(a, b) } b.attrsMap = { width: "width", height: "height", zIndex: "zIndex" }; a.merge(!0, b.prototype, f, {
            type: "image", render: function (a) { var b = this.attrsFromOptions(this.options), c = this.options; this.graphic = this.annotation.chart.renderer.image(c.src, 0, -9E9, c.width, c.height).attr(b).add(a); this.graphic.width = c.width; this.graphic.height = c.height; f.render.call(this) }, redraw: function (a) {
                var b = this.anchor(this.points[0]);
                if (b = d.prototype.position.call(this, b)) this.graphic[a ? "animate" : "attr"]({ x: b.x, y: b.y }); else this.graphic.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!b; f.redraw.call(this, a)
            }, translate: function (a, b) { this.translatePoint(a, b, 0) }
        }); return b
    }(l, u, D); (function (a, f, d, b, c, h, l, g, n, t) {
        var k = a.merge, e = a.addEvent, m = a.defined, q = a.erase, w = a.find, A = a.isString, E = a.pick, y = a.reduce, p = a.splat, x = a.destroyObjectProperties, r = a.Annotation = function (a, b) {
            var e; this.chart = a; this.points = []; this.controlPoints = []; this.coll = "annotations";
            this.labels = []; this.shapes = []; this.options = b; this.userOptions = k(!0, {}, b); e = this.getLabelsAndShapesOptions(this.userOptions, b); this.userOptions.labels = e.labels; this.userOptions.shapes = e.shapes; this.init(a, b)
        }; k(!0, r.prototype, f, g, {
            defaultOptions: {
                visible: !0, draggable: "xy", labelOptions: {
                    align: "center", allowOverlap: !1, backgroundColor: "rgba(0, 0, 0, 0.75)", borderColor: "black", borderRadius: 3, borderWidth: 1, className: "", crop: !1, formatter: function () { return m(this.y) ? this.y : "Annotation label" }, overflow: "justify",
                    padding: 5, shadow: !1, shape: "callout", style: { fontSize: "11px", fontWeight: "normal", color: "contrast" }, useHTML: !1, verticalAlign: "bottom", x: 0, y: -16
                }, shapeOptions: { stroke: "rgba(0, 0, 0, 0.75)", strokeWidth: 1, fill: "rgba(0, 0, 0, 0.75)", r: 0, snap: 2 }, controlPointOptions: { symbol: "circle", width: 10, height: 10, style: { stroke: "black", "stroke-width": 2, fill: "white" }, visible: !1, events: {} }, events: {}, zIndex: 6
            }, init: function () {
                this.linkPoints(); this.addControlPoints(); this.addShapes(); this.addLabels(); this.addClipPaths();
                this.setLabelCollector()
            }, getLabelsAndShapesOptions: function (a, b) { var e = {};["labels", "shapes"].forEach(function (c) { a[c] && (e[c] = p(b[c]).map(function (b, e) { return k(a[c][e], b) })) }); return e }, addShapes: function () { (this.options.shapes || []).forEach(function (a, b) { a = this.initShape(a); this.options.shapes[b] = a.options }, this) }, addLabels: function () { (this.options.labels || []).forEach(function (a, b) { a = this.initLabel(a); this.options.labels[b] = a.options }, this) }, addClipPaths: function () {
                this.setClipAxes(); this.clipXAxis &&
                    this.clipYAxis && (this.clipRect = this.chart.renderer.clipRect(this.getClipBox()))
            }, setClipAxes: function () { var a = this.chart.xAxis, b = this.chart.yAxis, e = y((this.options.labels || []).concat(this.options.shapes || []), function (e, c) { return [a[c && c.point && c.point.xAxis] || e[0], b[c && c.point && c.point.yAxis] || e[1]] }, []); this.clipXAxis = e[0]; this.clipYAxis = e[1] }, getClipBox: function () { return { x: this.clipXAxis.left, y: this.clipYAxis.top, width: this.clipXAxis.width, height: this.clipYAxis.height } }, setLabelCollector: function () {
                var a =
                    this; a.labelCollector = function () { return a.labels.reduce(function (a, b) { b.options.allowOverlap || a.push(b.graphic); return a }, []) }; a.chart.labelCollectors.push(a.labelCollector)
            }, setOptions: function (a) { this.options = k(this.defaultOptions, a) }, redraw: function (a) { this.linkPoints(); this.graphic || this.render(); this.clipRect && this.clipRect.animate(this.getClipBox()); this.redrawItems(this.shapes, a); this.redrawItems(this.labels, a); f.redraw.call(this, a) }, redrawItems: function (a, b) {
                for (var e = a.length; e--;)this.redrawItem(a[e],
                    b)
            }, render: function () { var a = this.chart.renderer; this.graphic = a.g("annotation").attr({ zIndex: this.options.zIndex, visibility: this.options.visible ? "visible" : "hidden" }).add(); this.shapesGroup = a.g("annotation-shapes").add(this.graphic).clip(this.chart.plotBoxClip); this.labelsGroup = a.g("annotation-labels").attr({ translateX: 0, translateY: 0 }).add(this.graphic); this.clipRect && this.graphic.clip(this.clipRect); this.addEvents(); f.render.call(this) }, setVisibility: function (a) {
                var b = this.options; a = E(a, !b.visible);
                this.graphic.attr("visibility", a ? "visible" : "hidden"); a || this.setControlPointsVisibility(!1); b.visible = a
            }, setControlPointsVisibility: function (a) { var b = function (b) { b.setControlPointsVisibility(a) }; f.setControlPointsVisibility.call(this, a); this.shapes.forEach(b); this.labels.forEach(b) }, destroy: function () {
                var a = this.chart, b = function (a) { a.destroy() }; this.labels.forEach(b); this.shapes.forEach(b); this.clipYAxis = this.clipXAxis = null; q(a.labelCollectors, this.labelCollector); g.destroy.call(this); f.destroy.call(this);
                x(this, a)
            }, remove: function () { return this.destroy() }, update: function (b) { var e = this.chart, c = this.getLabelsAndShapesOptions(this.userOptions, b); b = a.merge(!0, this.userOptions, b); b.labels = c.labels; b.shapes = c.shapes; this.destroy(); this.constructor(e, b); this.redraw() }, initShape: function (a) { a = k(this.options.shapeOptions, { controlPointOptions: this.options.controlPointOptions }, a); a = new r.shapesMap[a.type](this, a); a.itemType = "shape"; this.shapes.push(a); return a }, initLabel: function (a) {
                a = k(this.options.labelOptions,
                    { controlPointOptions: this.options.controlPointOptions }, a); a = new l(this, a); a.itemType = "label"; this.labels.push(a); return a
            }, redrawItem: function (b, e) { b.linkPoints(); b.shouldBeDrawn() ? (b.graphic || this.renderItem(b), b.redraw(a.pick(e, !0) && b.graphic.placed), b.points.length && this.adjustVisibility(b)) : this.destroyItem(b) }, adjustVisibility: function (a) { var b = !1, e = a.graphic; a.points.forEach(function (a) { !1 !== a.series.visible && !1 !== a.visible && (b = !0) }); b ? "hidden" === e.visibility && e.show() : e.hide() }, destroyItem: function (a) {
                q(this[a.itemType +
                    "s"], a); a.destroy()
            }, renderItem: function (a) { a.render("label" === a.itemType ? this.labelsGroup : this.shapesGroup) }
        }); r.shapesMap = { rect: d, circle: b, path: c, image: h }; r.types = {}; r.MockPoint = n; r.ControlPoint = t; a.extendAnnotation = function (a, b, e, c) { b = b || r; k(!0, a.prototype, b.prototype, e); a.prototype.defaultOptions = k(a.prototype.defaultOptions, c || {}) }; a.Chart.prototype.collectionsWithUpdate.push("annotations"); a.extend(a.Chart.prototype, {
            initAnnotation: function (b) {
                var e = r.types[b.type] || r; b = a.merge(e.prototype.defaultOptions,
                    b); e = new e(this, b); this.annotations.push(e); return e
            }, addAnnotation: function (a, b) { a = this.initAnnotation(a); this.options.annotations.push(a.options); E(b, !0) && a.redraw(); return a }, removeAnnotation: function (a) { var b = this.annotations, e = A(a) ? w(b, function (b) { return b.options.id === a }) : a; e && (q(this.options.annotations, e.options), q(b, e), e.destroy()) }, drawAnnotations: function () { this.plotBoxClip.attr(this.plotBox); this.annotations.forEach(function (a) { a.redraw() }) }
        }); a.Chart.prototype.callbacks.push(function (a) {
            a.annotations =
                []; a.options.annotations || (a.options.annotations = []); a.plotBoxClip = this.renderer.clipRect(this.plotBox); a.controlPointsGroup = a.renderer.g("control-points").attr({ zIndex: 99 }).clip(a.plotBoxClip).add(); a.options.annotations.forEach(function (b, e) { b = a.initAnnotation(b); a.options.annotations[e] = b.options }); a.drawAnnotations(); e(a, "redraw", a.drawAnnotations); e(a, "destroy", function () { a.plotBoxClip.destroy(); a.controlPointsGroup.destroy() })
        })
    })(l, u, F, G, v, H, D, B, z, C); (function (a) {
        function f(b) {
            var e = b.prototype.defaultOptions.events &&
                b.prototype.defaultOptions.events.click; a.merge(!0, b.prototype.defaultOptions.events, {
                    click: function (a) {
                        var b = this, c = b.chart.navigationBindings, d = c.activeAnnotation; e && e.click.call(b, a); d !== b ? (c.deselectAnnotation(), c.activeAnnotation = b, b.setControlPointsVisibility(!0), g(c, "showPopup", {
                            annotation: b, formType: "annotation-toolbar", options: c.annotationToFields(b), onSubmit: function (a) {
                                var e = {}; "remove" === a.actionType ? (c.activeAnnotation = !1, c.chart.removeAnnotation(b)) : (c.fieldsToOptions(a.fields, e), c.deselectAnnotation(),
                                    a = e.typeOptions, "measure" === b.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth, a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth), b.update(e))
                            }
                        })) : (c.deselectAnnotation(), g(c, "closePopup")); a.activeAnnotation = !0
                    }
                })
        } var d = a.doc, b = a.addEvent, c = a.pick, h = a.extend, l = a.isNumber, g = a.fireEvent, n = a.isArray, t = a.isObject, k = a.objectEach; a.NavigationBindings = function (a, b) { this.chart = a; this.options = b; this.eventsToUnbind = []; this.container = d.getElementsByClassName(this.options.bindingsClassName) };
        a.NavigationBindings.annotationsEditable = {
            nestedOptions: {
                labelOptions: ["style", "format", "backgroundColor"], labels: ["style"], label: ["style"], style: ["fontSize", "color"], background: ["fill", "strokeWidth", "stroke"], innerBackground: ["fill", "strokeWidth", "stroke"], outerBackground: ["fill", "strokeWidth", "stroke"], shapeOptions: ["fill", "strokeWidth", "stroke"], shapes: ["fill", "strokeWidth", "stroke"], line: ["strokeWidth", "stroke"], backgroundColors: [!0], connector: ["fill", "strokeWidth", "stroke"], crosshairX: ["strokeWidth",
                    "stroke"], crosshairY: ["strokeWidth", "stroke"]
            }, circle: ["shapes"], verticalLine: [], label: ["labelOptions"], measure: ["background", "crosshairY", "crosshairX"], fibonacci: [], tunnel: ["background", "line", "height"], pitchfork: ["innerBackground", "outerBackground"], rect: ["shapes"], crookedLine: []
        }; a.NavigationBindings.annotationsNonEditable = { rectangle: ["crosshairX", "crosshairY", "label"] }; h(a.NavigationBindings.prototype, {
            initEvents: function () {
                var a = this, c = a.chart, d = a.container, f = a.options; a.boundClassNames = {}; k(f.bindings,
                    function (b) { a.boundClassNames[b.className] = b });[].forEach.call(d, function (e) { a.eventsToUnbind.push(b(e, "click", function (b) { var e = a.getButtonEvents(d, b); e && a.bindingsButtonClick(e.button, e.events, b) })) }); k(f.events || {}, function (e, c) { a.eventsToUnbind.push(b(a, c, e)) }); a.eventsToUnbind.push(b(c.container, "click", function (b) { !c.cancelClick && c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) && a.bindingsChartClick(this, b) })); a.eventsToUnbind.push(b(c.container, "mousemove", function (b) {
                        a.bindingsContainerMouseMove(this,
                            b)
                    }))
            }, bindingsButtonClick: function (a, b, c) { var e = this.chart; this.selectedButtonElement && (g(this, "deselectButton", { button: this.selectedButtonElement }), this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && e.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1)); this.selectedButton = b; this.selectedButtonElement = a; g(this, "selectButton", { button: a }); b.init && b.init.call(this, a, c); (b.start || b.steps) && e.renderer.boxWrapper.addClass("highcharts-draw-mode") },
            bindingsChartClick: function (a, b) {
                a = this.selectedButton; var c = this.chart.renderer.boxWrapper; this.activeAnnotation && !b.activeAnnotation && b.target.parentNode && !b.target.closest(".highcharts-popup") && (g(this, "closePopup"), this.deselectAnnotation()); a && a.start && (this.nextEvent ? (this.nextEvent.call(this, b, this.currentUserDetails), this.steps && (this.stepIndex++ , a.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex] : (g(this, "deselectButton", { button: this.selectedButtonElement }),
                    c.removeClass("highcharts-draw-mode"), a.end && a.end.call(this, b, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = a.start.call(this, b), a.steps ? (this.stepIndex = 0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex]) : (g(this, "deselectButton", { button: this.selectedButtonElement }), c.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, a.end && a.end.call(this, b, this.currentUserDetails))))
            }, bindingsContainerMouseMove: function (a,
                b) { this.mouseMoveEvent && this.mouseMoveEvent.call(this, b, this.currentUserDetails) }, fieldsToOptions: function (a, b) { k(a, function (a, e) { var d = parseFloat(a), k = e.split("."), q = b, m = k.length - 1; !l(d) || a.match(/px/g) || e.match(/format/g) || (a = d); "" !== a && "undefined" !== a && k.forEach(function (b, e) { var d = c(k[e + 1], ""); m === e ? q[b] = a : (q[b] || (q[b] = d.match(/\d/g) ? [] : {}), q = q[b]) }) }); return b }, deselectAnnotation: function () { this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1), this.activeAnnotation = !1) },
            annotationToFields: function (b) {
                function e(c, d, q, f) { var m; q && -1 === l.indexOf(d) && (0 <= (q.indexOf && q.indexOf(d)) || q[d] || !0 === q) && (n(c) ? (f[d] = [], c.forEach(function (a, b) { t(a) ? (f[d][b] = {}, k(a, function (a, c) { e(a, c, g[d], f[d][b]) })) : e(a, 0, g[d], f[d]) })) : t(c) ? (m = {}, n(f) ? (f.push(m), m[d] = {}, m = m[d]) : f[d] = m, k(c, function (a, b) { e(a, b, 0 === d ? q : g[d], m) })) : "format" === d ? f[d] = [a.format(c, b.labels[0].points[0]).toString(), "text"] : n(f) ? f.push([c, h(c)]) : f[d] = [c, h(c)]) } var d = b.options, f = a.NavigationBindings.annotationsEditable,
                    g = f.nestedOptions, h = this.utils.getFieldType, y = c(d.type, d.shapes && d.shapes[0] && d.shapes[0].type, d.labels && d.labels[0] && d.labels[0].itemType, "label"), l = a.NavigationBindings.annotationsNonEditable[d.langKey] || [], p = { langKey: d.langKey, type: y }; k(d, function (a, b) { "typeOptions" === b ? (p[b] = {}, k(d[b], function (a, c) { e(a, c, g, p[b], !0) })) : e(a, b, f[y], p) }); return p
            }, getClickedClassNames: function (b, c) {
                var e = c.target; c = []; for (var d; e && ((d = a.attr(e, "class")) && (c = c.concat(d.split(" ").map(function (a) { return [a, e] }))), e =
                    e.parentNode, e !== b);); return c
            }, getButtonEvents: function (a, b) { var c = this, e; this.getClickedClassNames(a, b).forEach(function (a) { c.boundClassNames[a[0]] && !e && (e = { events: c.boundClassNames[a[0]], button: a[1] }) }); return e }, update: function () { this.removeEvents(); this.initEvents() }, removeEvents: function () { this.eventsToUnbind.forEach(function (a) { a() }) }, destroy: function () { this.removeEvents() }, utils: {
                updateRectSize: function (a, b) {
                    var c = b.options.typeOptions, e = this.chart.xAxis[0].toPixels(c.point.x), c = this.chart.yAxis[0].toPixels(c.point.y);
                    b.update({ typeOptions: { background: { width: a.chartX - e + "px", height: a.chartY - c + "px" } } })
                }, getFieldType: function (a) { return { string: "text", number: "number", "boolean": "checkbox" }[typeof a] }
            }
        }); b(a.Chart, "load", function () { var b = this.options; b && b.navigation && b.navigation.bindings && (this.navigationBindings = new a.NavigationBindings(this, b.navigation), this.navigationBindings.initEvents()) }); b(a.Chart, "destroy", function () { this.navigationBindings && this.navigationBindings.destroy() }); b(a.NavigationBindings, "deselectButton",
            function () { this.selectedButtonElement = null }); a.Annotation && (f(a.Annotation), a.objectEach(a.Annotation.types, function (a) { f(a) })); a.setOptions({
                lang: {
                    navigation: {
                        popup: {
                            simpleShapes: "Simple shapes", lines: "Lines", circle: "Circle", rectangle: "Rectangle", label: "Label", shapeOptions: "Shape options", typeOptions: "Details", fill: "Fill", format: "Text", strokeWidth: "Line width", stroke: "Line color", title: "Title", name: "Name", labelOptions: "Label options", labels: "Labels", backgroundColor: "Background color", backgroundColors: "Background colors",
                            borderColor: "Border color", borderRadius: "Border radius", borderWidth: "Border width", style: "Style", padding: "Padding", fontSize: "Font size", color: "Color", height: "Height", shapes: "Shape options"
                        }
                    }
                }, navigation: {
                    bindingsClassName: "highcharts-bindings-wrapper", bindings: {
                        circleAnnotation: {
                            className: "highcharts-circle-annotation", start: function (b) {
                                var c = this.chart.xAxis[0].toValue(b.chartX); b = this.chart.yAxis[0].toValue(b.chartY); return this.chart.addAnnotation({
                                    langKey: "circle", shapes: [{
                                        type: "circle", point: {
                                            xAxis: 0,
                                            yAxis: 0, x: c, y: b
                                        }, r: 5, controlPoints: [{ positioner: function (b) { var c = a.Annotation.MockPoint.pointToPixels(b.points[0]); b = b.options.r; return { x: c.x + b * Math.cos(Math.PI / 4) - this.graphic.width / 2, y: c.y + b * Math.sin(Math.PI / 4) - this.graphic.height / 2 } }, events: { drag: function (a, b) { a = this.mouseMoveToTranslation(a); b.setRadius(Math.max(b.options.r + a.y / Math.sin(Math.PI / 4), 5)); b.redraw(!1) } } }]
                                    }]
                                })
                            }, steps: [function (a, b) {
                                var c = b.options.shapes[0].point, d = this.chart.xAxis[0].toPixels(c.x), c = this.chart.yAxis[0].toPixels(c.y);
                                b.update({ shapes: [{ r: Math.max(Math.sqrt(Math.pow(d - a.chartX, 2) + Math.pow(c - a.chartY, 2)), 5) }] })
                            }]
                        }, rectangleAnnotation: {
                            className: "highcharts-rectangle-annotation", start: function (b) {
                                var c = this.chart.xAxis[0].toValue(b.chartX); b = this.chart.yAxis[0].toValue(b.chartY); return this.chart.addAnnotation({
                                    langKey: "rectangle", shapes: [{
                                        type: "rect", point: { x: c, y: b, xAxis: 0, yAxis: 0 }, width: 5, height: 5, controlPoints: [{
                                            positioner: function (b) {
                                                var c = a.Annotation.MockPoint.pointToPixels(b.points[0]); return {
                                                    x: c.x + b.options.width -
                                                        4, y: c.y + b.options.height - 4
                                                }
                                            }, events: { drag: function (a, b) { a = this.mouseMoveToTranslation(a); b.options.width = Math.max(b.options.width + a.x, 5); b.options.height = Math.max(b.options.height + a.y, 5); b.redraw(!1) } }
                                        }]
                                    }]
                                })
                            }, steps: [function (a, b) { var c = this.chart.yAxis[0], d = b.options.shapes[0].point, e = this.chart.xAxis[0].toPixels(d.x), c = c.toPixels(d.y); b.update({ shapes: [{ width: Math.max(a.chartX - e, 5), height: Math.max(a.chartY - c, 5), point: { x: d.x, y: d.y } }] }) }]
                        }, labelAnnotation: {
                            className: "highcharts-label-annotation", start: function (b) {
                                var c =
                                    this.chart.xAxis[0].toValue(b.chartX); b = this.chart.yAxis[0].toValue(b.chartY); this.chart.addAnnotation({
                                        langKey: "label", labelOptions: { format: "{y:.2f}" }, labels: [{
                                            point: { x: c, y: b, xAxis: 0, yAxis: 0 }, controlPoints: [{ symbol: "triangle-down", positioner: function (b) { if (!b.graphic.placed) return { x: 0, y: -9E7 }; b = a.Annotation.MockPoint.pointToPixels(b.points[0]); return { x: b.x - this.graphic.width / 2, y: b.y - this.graphic.height / 2 } }, events: { drag: function (a, b) { a = this.mouseMoveToTranslation(a); b.translatePoint(a.x, a.y); b.redraw(!1) } } },
                                            { symbol: "square", positioner: function (a) { return a.graphic.placed ? { x: a.graphic.alignAttr.x - this.graphic.width / 2, y: a.graphic.alignAttr.y - this.graphic.height / 2 } : { x: 0, y: -9E7 } }, events: { drag: function (a, b) { a = this.mouseMoveToTranslation(a); b.translate(a.x, a.y); b.redraw(!1) } } }], overflow: "none", crop: !0
                                        }]
                                    })
                            }
                        }
                    }, events: {}
                }
            })
    })(l); (function (a) {
        var f = a.addEvent, d = a.createElement, b = a.objectEach, c = a.pick, h = a.wrap, l = a.isString, g = a.isObject, n = a.isArray, t = /\d/g; h(a.Pointer.prototype, "onContainerMouseDown", function (a,
            b) { var c = b.target && b.target.className; l(c) && 0 <= c.indexOf("highcharts-popup-field") || a.apply(this, Array.prototype.slice.call(arguments, 1)) }); a.Popup = function (a) { this.init(a) }; a.Popup.prototype = {
                init: function (a) { this.container = d("div", { className: "highcharts-popup" }, null, a); this.lang = this.getLangpack(); this.addCloseBtn.call(this) }, addCloseBtn: function () { var a = this, b; b = d("div", { className: "highcharts-popup-close" }, null, this.container); f(b, "click", function () { a.closePopup.call(a) }) }, addColsContainer: function (a) {
                    var b;
                    b = d("div", { className: "highcharts-popup-lhs-col" }, null, a); a = d("div", { className: "highcharts-popup-rhs-col" }, null, a); d("div", { className: "highcharts-popup-rhs-col-wrapper" }, null, a); return { lhsCol: b, rhsCol: a }
                }, addInput: function (a, b, c, f) { var e = a.split("."), e = e[e.length - 1], k = this.lang; b = "highcharts-" + b + "-" + e; b.match(t) || d("label", { innerHTML: k[e] || e, htmlFor: b }, null, c); d("input", { name: b, value: f[0], type: f[1], className: "highcharts-popup-field" }, null, c).setAttribute("highcharts-data-name", a) }, addButton: function (a,
                    b, c, g, h) { var e = this, k = this.closePopup, m = this.getFields; a = d("button", { innerHTML: b }, null, a); f(a, "click", function () { k.call(e); return g(m(h, c)) }); return a }, getFields: function (a, b) {
                        var c = a.querySelectorAll("input"), d = a.querySelectorAll("#highcharts-select-series \x3e option:checked")[0]; a = a.querySelectorAll("#highcharts-select-volume \x3e option:checked")[0]; var e, k, f; f = { actionType: b, linkedTo: d && d.getAttribute("value"), fields: {} }; c.forEach(function (a) {
                            k = a.getAttribute("highcharts-data-name"); (e = a.getAttribute("highcharts-data-series-id")) ?
                                f.seriesId = a.value : k ? f.fields[k] = a.value : f.type = a.value
                        }); a && (f.fields["params.volumeSeriesID"] = a.getAttribute("value")); return f
                    }, showPopup: function () { var a = this.container, b = a.querySelectorAll(".highcharts-popup-close")[0]; a.innerHTML = ""; 0 <= a.className.indexOf("highcharts-annotation-toolbar") && (a.classList.remove("highcharts-annotation-toolbar"), a.removeAttribute("style")); a.appendChild(b); a.style.display = "block" }, closePopup: function () { this.popup.container.style.display = "none" }, showForm: function (a,
                        b, c, d) { this.popup = b.navigationBindings.popup; this.showPopup(); "indicators" === a && this.indicators.addForm.call(this, b, c, d); "annotation-toolbar" === a && this.annotations.addToolbar.call(this, b, c, d); "annotation-edit" === a && this.annotations.addForm.call(this, b, c, d); "flag" === a && this.annotations.addForm.call(this, b, c, d, !0) }, getLangpack: function () { return a.getOptions().lang.navigation.popup }, annotations: {
                            addToolbar: function (a, b, f) {
                                var e = this, k = this.lang, g = this.popup.container, h = this.showForm, m; -1 === g.className.indexOf("highcharts-annotation-toolbar") &&
                                    (g.className += " highcharts-annotation-toolbar"); g.style.top = a.plotTop + 10 + "px"; d("span", { innerHTML: c(k[b.langKey] || b.langKey, b.shapes && b.shapes[0].type) }, null, g); m = this.addButton.call(this, g, k.removeButton || "remove", "remove", f, g); m.className += " highcharts-annotation-remove-button"; m = this.addButton.call(this, g, k.editButton || "edit", "edit", function () { h.call(e, "annotation-edit", a, b, f) }, g); m.className += " highcharts-annotation-edit-button"
                            }, addForm: function (a, b, c, f) {
                                var e = this.popup.container, k = this.lang,
                                    g, h; d("h2", { innerHTML: k[b.langKey] || b.langKey, className: "highcharts-popup-main-title" }, null, e); h = d("div", { className: "highcharts-popup-lhs-col highcharts-popup-lhs-full" }, null, e); g = d("div", { className: "highcharts-popup-bottom-row" }, null, e); this.annotations.addFormFields.call(this, h, a, "", b, [], !0); this.addButton.call(this, g, f ? k.addButton || "add" : k.saveButton || "save", f ? "add" : "save", c, e)
                            }, addFormFields: function (a, c, f, h, l, A) {
                                var e = this, k = this.annotations.addFormFields, m = this.addInput, q = this.lang, p, w; b(h,
                                    function (b, d) { p = "" !== f ? f + "." + d : d; g(b) && (!n(b) || n(b) && g(b[0]) ? (w = q[d] || d, w.match(t) || l.push([!0, w, a]), k.call(e, a, c, p, b, l, !1)) : l.push([e, p, "annotation", a, b])) }); A && (l = l.sort(function (a) { return a[1].match(/format/g) ? -1 : 1 }), l.forEach(function (a) { !0 === a[0] ? d("span", { className: "highcharts-annotation-title", innerHTML: a[1] }, null, a[2]) : m.apply(a[0], a.splice(1)) }))
                            }
                        }, indicators: {
                            addForm: function (a, b, c) {
                                var d = this.indicators, e = this.lang, f; this.tabs.init.call(this, a); b = this.popup.container.querySelectorAll(".highcharts-tab-item-content");
                                this.addColsContainer(b[0]); d.addIndicatorList.call(this, a, b[0], "add"); f = b[0].querySelectorAll(".highcharts-popup-rhs-col")[0]; this.addButton.call(this, f, e.addButton || "add", "add", c, f); this.addColsContainer(b[1]); d.addIndicatorList.call(this, a, b[1], "edit"); f = b[1].querySelectorAll(".highcharts-popup-rhs-col")[0]; this.addButton.call(this, f, e.saveButton || "save", "edit", c, f); this.addButton.call(this, f, e.removeButton || "remove", "remove", c, f)
                            }, addIndicatorList: function (c, e, g) {
                                var k = this, h = e.querySelectorAll(".highcharts-popup-lhs-col")[0];
                                e = e.querySelectorAll(".highcharts-popup-rhs-col")[0]; var m = a.getOptions(), l = "edit" === g, n = l ? c.series : m.plotOptions, p = this.indicators.addFormFields, x, r, t; r = d("ul", { className: "highcharts-indicator-list" }, null, h); x = e.querySelectorAll(".highcharts-popup-rhs-col-wrapper")[0]; b(n, function (a, b) {
                                    var e = a.options; if (a.params || e && e.params) {
                                        var g = k.indicators.getNameType(a, b); t = d("li", { className: "highcharts-indicator-list", innerHTML: g.name }, null, r); f(t, "click", function () {
                                            p.call(k, c, l ? a : n[g.type], g.type, x); l &&
                                                a.options && d("input", { type: "hidden", name: "highcharts-id-" + g.type, value: a.options.id }, null, x).setAttribute("highcharts-data-series-id", a.options.id)
                                        })
                                    }
                                }); 0 < r.childNodes.length && r.childNodes[0].click()
                            }, getNameType: function (b, c) { var d = b.options, e = a.seriesTypes, e = e[c] && e[c].prototype.nameBase || c.toUpperCase(); d && d.type && (c = b.options.type, e = b.name); return { name: e, type: c } }, listAllSeries: function (a, b, c, f) {
                                a = "highcharts-" + b + "-type-" + a; var e, g; d("label", { innerHTML: this.lang[b] || b, htmlFor: a }, null, f); e = d("select",
                                    { name: a, className: "highcharts-popup-field" }, null, f); e.setAttribute("id", "highcharts-select-" + b); c.series.forEach(function (a) { g = a.options; !g.params && g.id && "highcharts-navigator-series" !== g.id && d("option", { innerHTML: g.name || g.id, value: g.id }, null, e) })
                            }, addFormFields: function (a, b, c, f) {
                                var e = b.params || b.options.params, g = this.indicators.getNameType; f.innerHTML = ""; d("h3", { className: "highcharts-indicator-title", innerHTML: g(b, c).name }, null, f); d("input", { type: "hidden", name: "highcharts-type-" + c, value: c }, null,
                                    f); this.indicators.listAllSeries.call(this, c, "series", a, f); e.volumeSeriesID && this.indicators.listAllSeries.call(this, c, "volume", a, f); this.indicators.addParamInputs.call(this, a, "params", e, c, f)
                            }, addParamInputs: function (a, c, d, f, h) { var e = this, k = this.indicators.addParamInputs, m = this.addInput, l; b(d, function (b, d) { l = c + "." + d; g(b) ? k.call(e, a, l, b, f, h) : "params.volumeSeriesID" !== l && m.call(e, l, f, h, [b, "text"]) }) }, getAmount: function () {
                                var a = 0; b(this.series, function (b) { var c = b.options; (b.params || c && c.params) && a++ });
                                return a
                            }
                        }, tabs: {
                            init: function (a) { var b = this.tabs; a = this.indicators.getAmount.call(a); var c; c = b.addMenuItem.call(this, "add"); b.addMenuItem.call(this, "edit", a); b.addContentItem.call(this, "add"); b.addContentItem.call(this, "edit"); b.switchTabs.call(this, a); b.selectTab.call(this, c, 0) }, addMenuItem: function (a, b) {
                                var c = this.popup.container, e = "highcharts-tab-item", f = this.lang; 0 === b && (e += " highcharts-tab-disabled"); b = d("span", { innerHTML: f[a + "Button"] || a, className: e }, null, c); b.setAttribute("highcharts-data-tab-type",
                                    a); return b
                            }, addContentItem: function () { return d("div", { className: "highcharts-tab-item-content" }, null, this.popup.container) }, switchTabs: function (a) { var b = this, c; this.popup.container.querySelectorAll(".highcharts-tab-item").forEach(function (d, e) { c = d.getAttribute("highcharts-data-tab-type"); "edit" === c && 0 === a || f(d, "click", function () { b.tabs.deselectAll.call(b); b.tabs.selectTab.call(b, this, e) }) }) }, selectTab: function (a, b) {
                                var c = this.popup.container.querySelectorAll(".highcharts-tab-item-content"); a.className +=
                                    " highcharts-tab-item-active"; c[b].className += " highcharts-tab-item-show"
                            }, deselectAll: function () { var a = this.popup.container, b = a.querySelectorAll(".highcharts-tab-item"), a = a.querySelectorAll(".highcharts-tab-item-content"), c; for (c = 0; c < b.length; c++)b[c].classList.remove("highcharts-tab-item-active"), a[c].classList.remove("highcharts-tab-item-show") }
                        }
            }; f(a.NavigationBindings, "showPopup", function (b) {
                this.popup || (this.popup = new a.Popup(this.chart.container)); this.popup.showForm(b.formType, this.chart,
                    b.options, b.onSubmit)
            }); f(a.NavigationBindings, "closePopup", function () { this.popup && this.popup.closePopup() })
    })(l)
});
//# sourceMappingURL=annotations.js.map