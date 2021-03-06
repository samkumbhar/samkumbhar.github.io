! function() {
    function a() {
        C.ribbon = document.querySelector(".forkit"), C.curtain = document.querySelector("#request_form"), C.closeButton = document.querySelector("#request_form .close-button"), C.ribbon && (E = C.ribbon.getAttribute("data-text") || "", F = C.ribbon.getAttribute("data-text-detached") || E, C.ribbon.innerHTML = '<span class="string"></span><span class="tag">' + E + "</span>", C.ribbonString = C.ribbon.querySelector(".string"), C.ribbonTag = C.ribbon.querySelector(".tag"), C.ribbon.addEventListener("click", h, !1), document.addEventListener("mousemove", c, !1), document.addEventListener("mousedown", b, !1), document.addEventListener("mouseup", d, !1), document.addEventListener("touchstart", e, !1), document.addEventListener("touchmove", f, !1), document.addEventListener("touchend", g, !1), window.addEventListener("resize", j, !1), C.closeButton && C.closeButton.addEventListener("click", i, !1), n())
    }

    function b(a) {
        C.curtain && D === w && (a.preventDefault(), dragY = a.clientY, dragTime = Date.now(), dragging = !0)
    }

    function c(a) {
        mouse.x = a.clientX, mouse.y = a.clientY
    }

    function d() {
        D !== x && (D = v, dragging = !1)
    }

    function e(a) {
        if (C.curtain && D === w) {
            a.preventDefault();
            var b = a.touches[0];
            dragY = b.clientY, dragTime = Date.now(), dragging = !0
        }
    }

    function f(a) {
        var b = a.touches[0];
        mouse.x = b.pageX, mouse.y = b.pageY
    }

    function g() {
        D !== x && (D = v, dragging = !1)
    }

    function h(a) {
        C.curtain && (a.preventDefault(), D === x ? l() : Date.now() - dragTime < 300 && k())
    }

    function i(a) {
        a.preventDefault(), l()
    }

    function j() {
        D === x && (curtainTargetY = window.innerHeight, curtainCurrentY = curtainTargetY)
    }

    function k() {
        dragging = !1, D = x, t("forkit-open"), $("#request_form").show()
    }

    function l() {
        dragging = !1, D = v, C.ribbonTag.innerHTML = E, t("forkit-close"), $("#request_form").fadeOut()
    }

    function m() {
        D = w, C.ribbonTag.innerHTML = F, $("#request_form").show()
    }

    function n() {
        o(), p(), requestAnimFrame(n)
    }

    function o() {
        var a = s(mouse.x, mouse.y, window.innerWidth, 0);
        if (D === x ? curtainTargetY = Math.min(curtainTargetY + .2 * (window.innerHeight - curtainTargetY), window.innerHeight) : (1.5 * z > a ? m() : !dragging && D === w && a > 2 * z && l(), dragging ? (curtainTargetY = Math.max(mouse.y - dragY, 0), curtainTargetY > window.innerHeight * B && k()) : curtainTargetY *= .8), curtainCurrentY += .3 * (curtainTargetY - curtainCurrentY), dragging || D === w) {
            velocity /= G, velocity += gravity;
            var b = C.ribbon.offsetLeft,
                c = Math.max(.2 * (mouse.x - b - closedX), -A);
            anchorB.x += .1 * (closedX + c - anchorB.x), anchorB.y += velocity;
            var d = s(anchorA.x, anchorA.y, anchorB.x, anchorB.y);
            d > A && (velocity -= Math.abs(d) / (1.25 * A));
            var e = Math.max(mouse.y - anchorB.y, 0),
                f = mouse.x - (b + anchorB.x),
                g = Math.min(130, Math.max(50, 180 * Math.atan2(e, f) / Math.PI));
            rotation += .1 * (g - rotation)
        } else D === x ? (anchorB.x += .2 * (openedX - anchorB.x), anchorB.y += .2 * (openedY - anchorB.y), rotation += .02 * (90 - rotation)) : (anchorB.x += .2 * (anchorA.x - anchorB.x), anchorB.y += .2 * (anchorA.y - anchorB.y), rotation += .2 * (45 - rotation))
    }

    function p() {
        C.curtain && (C.curtain.style.top = -100 + Math.min(curtainCurrentY / window.innerHeight * 100, 100) + "%"), C.ribbon.style[q("transform")] = r(0, curtainCurrentY, 0), C.ribbonTag.style[q("transform")] = r(anchorB.x, anchorB.y, rotation);
        var a = anchorB.y - anchorA.y,
            b = anchorB.x - anchorA.x,
            c = 180 * Math.atan2(a, b) / Math.PI;
        C.ribbonString.style.width = anchorB.y + "px", C.ribbonString.style[q("transform")] = r(anchorA.x, 0, c)
    }

    function q(a, b) {
        for (var c = a.slice(0, 1).toUpperCase() + a.slice(1), d = 0, e = VENDORS.length; e > d; d++) {
            var f = VENDORS[d];
            if ("undefined" != typeof(b || document.body).style[f + c]) return f + c
        }
        return a
    }

    function r(a, b, c) {
        return "translate(" + a + "px," + b + "px) rotate(" + c + "deg)"
    }

    function s(a, b, c, d) {
        var e = a - c,
            f = b - d;
        return Math.sqrt(e * e + f * f)
    }

    function t(a) {
        var b = document.createEvent("HTMLEvents", 1, 2);
        b.initEvent(a, !0, !0), C.ribbon.dispatchEvent(b)
    }

    function u(a, b) {
        this.x = a || 0, this.y = b || 0
    }
    var v = 0,
        w = 1,
        x = 2,
        y = 30,
        z = 110,
        A = 40,
        B = .36;
    VENDORS = ["Webkit", "Moz", "O", "ms"];
    var C = {
            ribbon: null,
            ribbonString: null,
            ribbonTag: null,
            curtain: null,
            closeButton: null
        },
        D = v,
        E = "",
        F = "",
        G = 1.04;
    gravity = 1.5, closedX = .4 * z, closedY = .5 * -y, openedX = .4 * z, openedY = y, velocity = 0, rotation = 45, curtainTargetY = 0, curtainCurrentY = 0, dragging = !1, dragTime = 0, dragY = 0, anchorA = new u(closedX, closedY), anchorB = new u(closedX, closedY), mouse = new u, u.prototype.distanceTo = function(a, b) {
        var c = a - this.x,
            d = b - this.y;
        return Math.sqrt(c * c + d * d)
    }, u.prototype.clone = function() {
        return new u(this.x, this.y)
    }, u.prototype.interpolate = function(a, b, c) {
        this.x += (a - this.x) * c, this.y += (b - this.y) * c
    }, window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 500 / 60)
        }
    }(), a()
}();