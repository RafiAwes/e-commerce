"use strict";
var $ = jQuery.noConflict();
$.extend($.easing, {
  def: "easeOutQuad",
  swing: function (t, e, i, a, n) {
    return $.easing[$.easing.def](t, e, i, a, n);
  },
  easeOutQuad: function (t, e, i, a, n) {
    return -a * (e /= n) * (e - 2) + i;
  },
  easeOutQuint: function (t, e, i, a, n) {
    return a * ((e = e / n - 1) * e * e * e * e + 1) + i;
  },
}),
  (window.Zomex = {}),
  (function (t) {
    var e, i, a, n, o, s, r;
    (Zomex.$window = t(window)),
      (Zomex.$body = t(document.body)),
      (Zomex.status = ""),
      (Zomex.isIE = navigator.userAgent.indexOf("Trident") >= 0),
      (Zomex.isEdge = navigator.userAgent.indexOf("Edge") >= 0),
      (Zomex.isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )),
      (Zomex.call = function (t, e) {
        setTimeout(t, e);
      }),
      (Zomex.parseOptions = function (t) {
        return "string" == typeof t
          ? JSON.parse(t.replace(/'/g, '"').replace(";", ""))
          : {};
      }),
      (Zomex.parseTemplate = function (t, e) {
        return t.replace(/\{\{(\w+)\}\}/g, function () {
          return e[arguments[1]];
        });
      }),
      (Zomex.byId = function (t) {
        return document.getElementById(t);
      }),
      (Zomex.byTag = function (t, e) {
        return e ? e.getElementsByTagName(t) : document.getElementsByTagName(t);
      }),
      (Zomex.byClass = function (t, e) {
        return e
          ? e.getElementsByClassName(t)
          : document.getElementsByClassName(t);
      }),
      (Zomex.setCookie = function (t, e, i) {
        var a = new Date();
        a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3),
          (document.cookie =
            t + "=" + e + ";expires=" + a.toUTCString() + ";path=/");
      }),
      (Zomex.getCookie = function (t) {
        for (
          var e = t + "=", i = document.cookie.split(";"), a = 0;
          a < i.length;
          ++a
        ) {
          for (var n = i[a]; " " == n.charAt(0); ) n = n.substring(1);
          if (0 == n.indexOf(e)) return n.substring(e.length, n.length);
        }
        return "";
      }),
      (Zomex.$ = function (e) {
        return e instanceof jQuery ? e : t(e);
      }),
      (Zomex.isOnScreen = function (t) {
        var e = window.pageXOffset,
          i = window.pageYOffset,
          a = t.getBoundingClientRect(),
          n = a.left + e,
          o = a.top + i;
        return (
          o + a.height >= i &&
          o <= i + window.innerHeight &&
          n + a.width >= e &&
          n <= e + window.innerWidth
        );
      }),
      (Zomex.appear = function (e, i, a) {
        return (
          a &&
            Object.keys(a).length &&
            t.extend(intersectionObserverOptions, a),
          new IntersectionObserver(
            function (e) {
              for (var a = 0; a < e.length; a++) {
                var n = e[a];
                if (n.intersectionRatio > 0)
                  if ("string" == typeof i)
                    Function("return " + functionName)();
                  else i.call(t(n.target));
              }
            },
            { rootMargin: "0px 0px 200px 0px", threshold: 0, alwaysObserve: !0 }
          ).observe(e),
          this
        );
      }),
      (Zomex.requestTimeout = function (t, e) {
        var i =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame;
        if (!i) return setTimeout(t, e);
        var a,
          n = new Object();
        return (
          (n.val = i(function o(s) {
            a || (a = s), s - a >= e ? t() : (n.val = i(o));
          })),
          n
        );
      }),
      (Zomex.requestInterval = function (t, e, i) {
        var a =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame;
        if (!a)
          return i
            ? (console.log("settimeout"), setInterval(t, e))
            : (console.log("settimeout"), setTimeout(t, i));
        var n,
          o,
          s = new Object();
        return (
          (s.val = a(function r(l) {
            n || (n = o = l),
              !i || l - n < i
                ? l - o > e
                  ? (t(), (s.val = a(r)), (o = l))
                  : (s.val = a(r))
                : t();
          })),
          console.log(s),
          s
        );
      }),
      (Zomex.deleteTimeout = function (t) {
        if (t) {
          var e =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame;
          return e ? (t.val ? e(t.val) : void 0) : clearTimeout(t);
        }
      }),
      (Zomex.setTab = function (e) {
        Zomex.$body
          .on("click", ".tab .nav-link", function (e) {
            var i = t(this);
            if ((e.preventDefault(), !i.hasClass("active"))) {
              var a = t(i.attr("href"));
              a.siblings(".active").removeClass("in active"),
                a.addClass("active in"),
                i.parent().parent().find(".active").removeClass("active"),
                i.addClass("active");
            }
          })
          .on("click", ".link-to-tab", function (e) {
            var i = t(e.currentTarget).attr("href"),
              a = t(i),
              n = a.parent().siblings(".nav");
            e.preventDefault(),
              a.siblings().removeClass("active in"),
              a.addClass("active in"),
              n.find(".nav-link").removeClass("active"),
              n.find('[href="' + i + '"]').addClass("active"),
              t("html").animate({ scrollTop: a.offset().top - 150 });
          });
      }),
      (Zomex.initCartAction = function (e) {
        Zomex.$body
          .on("click", e, function (e) {
            t(".cart-dropdown").addClass("opened"), e.preventDefault();
          })
          .on("click", ".cart-offcanvas .cart-overlay", function (e) {
            t(".cart-dropdown").removeClass("opened"), e.preventDefault();
          })
          .on(
            "click",
            ".cart-offcanvas .cart-header, .cart-close",
            function (e) {
              t(".cart-dropdown").removeClass("opened"), e.preventDefault();
            }
          );
      }),
      (Zomex.initScrollTopButton = function () {
        var e = Zomex.byId("scroll-top");
        e.addEventListener("click", function (e) {
          t("html, body").animate({ scrollTop: 0 }, 600), e.preventDefault();
        });
        var i = function () {
          if (window.pageYOffset > 400) {
            e.classList.add("show");
            var i = t(document).height(),
              a = t(window).height(),
              n = (t(window).scrollTop() / (i - a)) * 214;
            t("#progress-indicator").length > 0 &&
              t("#progress-indicator").css("stroke-dasharray", n + ", 400");
          } else e.classList.remove("show");
        };
        Zomex.call(i, 500),
          window.addEventListener("scroll", i, { passive: !0 });
      }),
      (Zomex.stickyDefaultOptions = {
        minWidth: 992,
        maxWidth: 2e4,
        top: !1,
        hide: !1,
        scrollMode: !0,
      }),
      (Zomex.stickyToolboxOptions = {
        minWidth: 0,
        maxWidth: 767,
        top: !1,
        scrollMode: !0,
      }),
      (Zomex.stickyProductOptions = {
        minWidth: 0,
        maxWidth: 2e4,
        scrollMode: !0,
        top: !1,
        hide: !1,
      }),
      (Zomex.windowResized = function (e) {
        return (
          e == Zomex.resizeTimeStamp ||
            (void 0 === window.innerHeight &&
              (window.innerWidth =
                t(window).width() + Zomex.getScrollbarWidth()),
            (Zomex.resizeChanged = Zomex.canvasWidth != window.innerWidth),
            (Zomex.canvasWidth = window.innerWidth),
            (Zomex.resizeTimeStamp = e)),
          Zomex.resizeChanged
        );
      }),
      (Zomex.getScrollbarWidth = function () {
        if (void 0 === Zomex.scrollbarSize) {
          var t = document.createElement("div");
          (t.style.cssText =
            "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
            document.body.appendChild(t),
            (Zomex.scrollbarSize = t.offsetWidth - t.clientWidth),
            document.body.removeChild(t);
        }
        return Zomex.scrollbarSize;
      }),
      (Zomex.stickyContent = (function () {
        function e(t, e) {
          return this.init(t, e);
        }
        function i() {
          Zomex.$window.trigger("sticky_refresh.Zomex", {
            index: 0,
            offsetTop: 0,
          });
        }
        function a(t) {
          (t && !Zomex.windowResized(t.timeStamp)) ||
            (Zomex.$window.trigger("sticky_refresh_size.Zomex"), i());
        }
        return (
          (e.prototype.init = function (e, i) {
            (this.$el = e),
              (this.options = t.extend(
                !0,
                {},
                Zomex.stickyDefaultOptions,
                i,
                Zomex.parseOptions(e.attr("data-sticky-options"))
              )),
              Zomex.$window
                .on("sticky_refresh.Zomex", this.refresh.bind(this))
                .on("sticky_refresh_size.Zomex", this.refreshSize.bind(this));
          }),
          (e.prototype.refreshSize = function (t) {
            var e =
              window.innerWidth >= this.options.minWidth &&
              window.innerWidth <= this.options.maxWidth;
            if (
              ((this.scrollPos = window.pageYOffset),
              void 0 === this.top && (this.top = this.options.top),
              window.innerWidth >= 768 && this.getTop)
            )
              this.top = this.getTop();
            else if (
              !this.options.top &&
              ((this.top = this.isWrap
                ? this.$el.parent().offset().top
                : this.$el.offset().top + this.$el[0].offsetHeight),
              this.$el.hasClass("has-dropdown"))
            ) {
              var i = this.$el.find(".category-dropdown .dropdown-box");
              i.length && (this.top += i[0].offsetHeight);
            }
            this.isWrap ? e || this.unwrap() : e && this.wrap(),
              (Zomex.sticky_top_height = 0),
              t && setTimeout(this.refreshSize.bind(this), 50);
          }),
          (e.prototype.wrap = function () {
            this.$el.wrap('<div class="sticky-content-wrapper"></div>'),
              (this.isWrap = !0);
          }),
          (e.prototype.unwrap = function () {
            this.$el.unwrap(".sticky-content-wrapper"), (this.isWrap = !1);
          }),
          (e.prototype.refresh = function (t, e) {
            var i = window.pageYOffset + e.offsetTop,
              a = this.$el;
            i > this.top && this.isWrap
              ? ((this.height = a[0].offsetHeight),
                a.hasClass("fixed") ||
                  a.parent().css("height", this.height + "px"),
                a.hasClass("fix-top")
                  ? (a.css("margin-top", e.offsetTop + "px"),
                    (this.zIndex = this.options.max_index - e.index))
                  : a.hasClass("fix-bottom")
                  ? (a.css("margin-bottom", e.offsetBottom + "px"),
                    (this.zIndex = this.options.max_index - e.index))
                  : a.css({
                      transition: "opacity .5s",
                      "z-index": this.zIndex,
                    }),
                this.options.scrollMode
                  ? ((this.scrollPos >= i && a.hasClass("fix-top")) ||
                    (this.scrollPos <= i && a.hasClass("fix-bottom"))
                      ? (a.addClass("fixed"),
                        this.onFixed && this.onFixed(),
                        a.hasClass("product-sticky-content") &&
                          Zomex.$body.addClass("addtocart-fixed"))
                      : (a
                          .removeClass("fixed")
                          .css("margin-top", "")
                          .css("margin-bottom", ""),
                        this.onUnfixed && this.onUnfixed(),
                        a.hasClass("product-sticky-content") &&
                          Zomex.$body.removeClass("addtocart-fixed")),
                    (this.scrollPos = i))
                  : (a.addClass("fixed"), this.onFixed && this.onFixed()),
                a.is(".fixed.fix-top")
                  ? ((e.offsetTop += a[0].offsetHeight),
                    (Zomex.sticky_top_height = e.offsetTop))
                  : a.is(".fixed.fix-bottom") &&
                    (e.offsetBottom += a[0].offsetHeight))
              : (a.parent().css("height", ""),
                a.removeClass("fixed").css({
                  "margin-top": "",
                  "margin-bottom": "",
                  "z-index": "",
                }),
                this.onUnfixed && this.onUnfixed(),
                a.hasClass("product-sticky-content") &&
                  Zomex.$body.removeClass("addtocart-fixed"));
          }),
          Zomex.$window.on("Zomex_complete", function () {
            window.addEventListener("scroll", i, { passive: !0 }),
              Zomex.$window.on("resize", a),
              setTimeout(function () {
                a();
              }, 300);
          }),
          function (i, a) {
            Zomex.$(i).each(function () {
              var i = t(this);
              i.data("sticky-content") || i.data("sticky-content", new e(i, a));
            });
          }
        );
      })()),
      (Zomex.parallax = function (e, i) {
        t.fn.themePluginParallax &&
          Zomex.$(e).each(function () {
            var e = t(this);
            e.themePluginParallax(
              t.extend(
                !0,
                Zomex.parseOptions(e.attr("data-parallax-options")),
                i
              )
            );
          });
      }),
      (Zomex.skrollrParallax = function () {
        Zomex.isMobile ||
          ("undefined" != typeof skrollr &&
            Zomex.$(".skrollable").length &&
            skrollr.init({ forceHeight: !1 }));
      }),
      (Zomex.initFloatingParallax = function () {
        t.fn.parallax &&
          Zomex.$(".floating-item").each(function (e) {
            var i = t(this);
            i.data("parallax") &&
              (i.parallax("disable"),
              i.removeData("parallax"),
              i.removeData("options")),
              i
                .children()
                .addClass("layer")
                .attr("data-depth", i.attr("data-child-depth")),
              i.parallax(Zomex.parseOptions(i.data("options")));
          });
      }),
      (Zomex.isotopeOptions = {
        itemsSelector: ".grid-item",
        layoutMode: "masonry",
        percentPosition: !0,
        masonry: { columnWidth: ".grid-space" },
      }),
      (Zomex.isotopes = function (e, i) {
        if ("function" == typeof imagesLoaded && t.fn.isotope) {
          var a = this;
          Zomex.$(e).each(function () {
            var e = t(this),
              n = t.extend(
                !0,
                {},
                a.isotopeOptions,
                Zomex.parseOptions(e.attr("data-grid-options")),
                i || {}
              );
            Zomex.lazyLoad(e),
              e.imagesLoaded(function () {
                n.customInitHeight && e.height(e.height()),
                  n.customDelay &&
                    Zomex.call(function () {
                      e.isotope(n);
                    }, parseInt(n.customDelay)),
                  e.isotope(n);
              });
          });
        }
      }),
      (Zomex.initNavFilter = function (e) {
        t.fn.isotope &&
          Zomex.$(e).on("click", function (e) {
            var i = t(this),
              a = i.attr("data-filter"),
              n = i.parent().parent().attr("data-target");
            t(n || ".grid")
              .isotope({ filter: a })
              .isotope("on", "arrangeComplete", function () {
                Zomex.$window.trigger("appear.check");
              }),
              i.parent().siblings().children().removeClass("active"),
              i.addClass("active"),
              e.preventDefault();
          });
      }),
      (Zomex.ratingTooltip = function (t) {
        for (
          var e = Zomex.byClass("ratings-full", t || document.body),
            i = e.length,
            a = function () {
              var t =
                parseInt(this.firstElementChild.style.width.slice(0, -1)) / 20;
              this.lastElementChild.innerText = t ? t.toFixed(2) : t;
            },
            n = 0;
          n < i;
          ++n
        )
          e[n].addEventListener("mouseover", a),
            e[n].addEventListener("touchstart", a, { passive: !0 });
      }),
      (Zomex.setProgressBar = function (e) {
        Zomex.$(e).each(function () {
          var e = t(this),
            i = e.parent().find("mark")[0].innerHTML,
            a = "";
          -1 != i.indexOf("%")
            ? (a = i)
            : -1 != i.indexOf("/") &&
              (a =
                (a =
                  (parseInt(i.split("/")[0]) / parseInt(i.split("/")[1])) * 100)
                  .toFixed(2)
                  .toString() + "%"),
            e.find("span").css("width", a);
        });
      }),
      (Zomex.alert = function (e) {
        Zomex.$body.on("click", e + " .btn-close", function (i) {
          i.preventDefault(),
            t(this)
              .closest(e)
              .fadeOut(function () {
                t(this).remove();
              });
        });
      }),
      (Zomex.closeTopNotice = function (e) {
        Zomex.$body.on("click", e, function (e) {
          e.preventDefault(), t(".top-banner").slideUp();
        });
      }),
      (Zomex.accordion = function (e) {
        Zomex.$body.on("click", e, function (e) {
          var a = t(this),
            n = a.closest(".card").find(a.attr("href")),
            o = a.closest(".accordion");
          e.preventDefault(),
            0 === o.find(".collapsing").length &&
              0 === o.find(".expanding").length &&
              (n.hasClass("expanded")
                ? o.hasClass("radio-type") || i(n)
                : n.hasClass("collapsed") &&
                  (o.find(".expanded").length > 0
                    ? Zomex.isIE
                      ? i(o.find(".expanded"), function () {
                          i(n);
                        })
                      : (i(o.find(".expanded")), i(n))
                    : i(n)));
        });
        var i = function (t, i) {
          var a = t.closest(".card").find(e);
          t.hasClass("expanded")
            ? (a.removeClass("collapse").addClass("expand"),
              t.addClass("collapsing").slideUp(300, function () {
                t.removeClass("expanded collapsing").addClass("collapsed"),
                  i && i();
              }))
            : t.hasClass("collapsed") &&
              (a.removeClass("expand").addClass("collapse"),
              t.addClass("expanding").slideDown(300, function () {
                t.removeClass("collapsed expanding").addClass("expanded"),
                  i && i();
              }));
        };
      }),
      (Zomex.animationOptions = {
        name: "fadeIn",
        duration: "1.2s",
        delay: ".2s",
      }),
      (Zomex.appearAnimate = function (e) {
        Zomex.$(e).each(function () {
          var e = this;
          Zomex.appear(e, function () {
            if (e.classList.contains("appear-animate")) {
              var i = t.extend(
                {},
                Zomex.animationOptions,
                Zomex.parseOptions(e.getAttribute("data-animation-options"))
              );
              setTimeout(
                function () {
                  (e.style["animation-duration"] = i.duration),
                    e.classList.add(i.name),
                    e.classList.add("appear-animation-visible");
                },
                i.delay ? 1e3 * Number(i.delay.slice(0, -1)) : 0
              );
            }
          });
        });
      }),
      (Zomex.countDown = function (e) {
        t.fn.countdown &&
          Zomex.$(e).each(function () {
            var e = t(this),
              i = e.data("until"),
              a = e.data("compact"),
              n = e.data("format") ? e.data("format") : "DHMS",
              o = e.data("labels-short")
                ? ["Years", "Months", "Weeks", "Days", "Hrs", "Mins", "Secs"]
                : [
                    "Years",
                    "Months",
                    "Weeks",
                    "Days",
                    "Hours",
                    "Minutes",
                    "Seconds",
                  ],
              s = e.data("labels-short")
                ? ["Year", "Month", "Week", "Day", "Hour", "Min", "Sec"]
                : ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"];
            if (e.data("relative")) l = i;
            else
              var r = i.split(", "),
                l = new Date(r[0], r[1] - 1, r[2]);
            e.countdown({
              until: l,
              format: n,
              padZeroes: !0,
              compact: a,
              compactLabels: [" y", " m", " w", " days, "],
              timeSeparator: " : ",
              labels: o,
              labels1: s,
            });
          });
      }),
      (Zomex.priceSlider = function (e, i) {
        "object" == typeof noUiSlider &&
          Zomex.$(e).each(function () {
            var e = this;
            noUiSlider.create(
              e,
              t.extend(
                !0,
                {
                  start: [0, 400],
                  connect: !0,
                  step: 1,
                  range: { min: 0, max: 635 },
                },
                i
              )
            ),
              e.noUiSlider.on("update", function (i, a) {
                i = i.map(function (t) {
                  return "$" + parseInt(t);
                });
                t(e).parent().find(".filter-price-range").text(i.join(" - "));
              });
          });
      }),
      (Zomex.stickySidebarOptions = {
        autoInit: !0,
        minWidth: 991,
        containerSelector: ".sticky-sidebar-wrapper",
        autoFit: !0,
        activeClass: "sticky-sidebar-fixed",
        top: 0,
        bottom: 0,
      }),
      (Zomex.stickySidebar = function (e) {
        if (t.fn.themeSticky) {
          var i = 0;
          function a() {
            Zomex.$(e).trigger("recalc.pin"), t(window).trigger("appear.check");
          }
          !t(".sticky-sidebar > .filter-actions").length &&
            t(window).width() >= 992 &&
            t(".sticky-content.fix-top").each(function (e) {
              if (!t(this).hasClass("sticky-toolbox")) {
                var a = t(this).hasClass("fixed");
                (i += t(this).addClass("fixed").outerHeight()),
                  a || t(this).removeClass("fixed");
              }
            }),
            Zomex.$(e).each(function () {
              var e = t(this);
              e.themeSticky(
                t.extend(
                  {},
                  Zomex.stickySidebarOptions,
                  { padding: { top: i } },
                  Zomex.parseOptions(e.attr("data-sticky-options"))
                )
              );
            }),
            setTimeout(a, 300),
            Zomex.$window.on("click", ".tab .nav-link", function () {
              setTimeout(a);
            });
        }
      }),
      (Zomex.zoomImageOptions = {
        responsive: !0,
        borderSize: 0,
        zoomType: "inner",
        onZoomIn: !0,
        magnify: 1.1,
      }),
      (Zomex.zoomImageObjects = []),
      (Zomex.zoomImage = function (e) {
        t.fn.zoom &&
          e &&
          ("string" == typeof e ? t(e) : e).find("img").each(function () {
            var e = t(this);
            (Zomex.zoomImageOptions.target = e.parent()),
              (Zomex.zoomImageOptions.url = e.attr("data-zoom-image")),
              e.zoom(Zomex.zoomImageOptions),
              Zomex.zoomImageObjects.push(e);
          });
      }),
      (Zomex.zoomImageOnResize = function () {
        Zomex.zoomImageObjects.forEach(function (e) {
          e.each(function () {
            var e = t(this).data("zoom");
            e && e.refresh();
          });
        });
      }),
      (Zomex.lazyLoad = function (t, e) {
        function i() {
          this.setAttribute("src", this.getAttribute("data-src")),
            this.addEventListener("load", function () {
              (this.style["padding-top"] = ""),
                this.classList.remove("lazy-img");
            });
        }
        Zomex.$(t)
          .find(".lazy-img")
          .each(function () {
            void 0 !== e && e ? i.call(this) : Zomex.appear(this, i);
          });
      }),
      (Zomex.initPopup = function (e, i) {
        Zomex.$body.hasClass("home") &&
          "false" !== Zomex.getCookie("hideNewsletterPopup") &&
          // setTimeout(function () {
          //   Zomex.popup({
          //     items: { src: ".newsletter-popup" },
          //     type: "inline",
          //     tLoading: "",
          //     mainClass: "mfp-newsletter mfp-fadein-popup",
          //     callbacks: {
          //       beforeClose: function () {
          //         t("#hide-newsletter-popup")[0].checked &&
          //           Zomex.setCookie("hideNewsletterPopup", !0, 7);
          //       },
          //     },
          //   });
          // }, 7500),
          Zomex.$body.on("click", ".btn-iframe", function (e) {
            e.preventDefault(),
              Zomex.popup(
                {
                  items: {
                    src:
                      '<video src="' +
                      t(e.currentTarget).attr("href") +
                      '" autoplay loop controls>',
                    type: "inline",
                  },
                  mainClass: "mfp-video-popup",
                },
                "video"
              );
          }),
          Zomex.$body
            .on("click", ".sign-in", function (e) {
              e.preventDefault(),
                Zomex.popup(
                  { items: { src: t(e.currentTarget).attr("href") } },
                  "login"
                );
            })
            .on("click", ".register", function (e) {
              e.preventDefault(),
                Zomex.popup(
                  {
                    items: { src: t(e.currentTarget).attr("href") },
                    callbacks: {
                      ajaxContentAdded: function () {
                        this.wrap.find('[href="#sign-up"]').click();
                      },
                    },
                  },
                  "login"
                );
            });
      }),
      (Zomex.initNotificationAlert = function () {
        Zomex.$body.hasClass("has-notification") &&
          setTimeout(function () {
            Zomex.$body.addClass("show-notification");
          }, 5e3);
      }),
      (Zomex.countTo = function (e) {
        t.fn.countTo &&
          Zomex.$(e).each(function () {
            Zomex.appear(this, function () {
              var e = t(this);
              setTimeout(function () {
                e.countTo({
                  onComplete: function () {
                    e.addClass("complete");
                  },
                });
              }, 300);
            });
          });
      }),
      (Zomex.minipopupOption = {
        productClass: "",
        imageSrc: "",
        imageLink: "#",
        name: "",
        nameLink: "#",
        message: "",
        actionTemplate: "",
        isPurchased: !1,
        delay: 4e3,
        space: 20,
        template:
          '<div class="minipopup-box"><div class="product product-list-sm {{productClass}}"><figure class="product-media"><a href="{{imageLink}}"><img src="{{imageSrc}}" alt="Product" width="80" height="90" /></a></figure><div class="product-details"><h4 class="product-name"><a href="{{nameLink}}">{{name}}</a></h4>{{message}}</div></div><div class="product-action">{{actionTemplate}}</div></div>',
      }),
      (Zomex.Minipopup =
        ((i = 0),
        (a = []),
        (n = !1),
        (o = []),
        (s = !1),
        (r = function () {
          if (!n)
            for (var t = 0; t < o.length; ++t)
              (o[t] -= 200) <= 0 && this.close(t--);
        }),
        {
          init: function () {
            var i = document.createElement("div");
            (i.className = "minipopup-area"),
              Zomex.byClass("page-wrapper")[0].appendChild(i),
              (e = t(i)),
              (this.close = this.close.bind(this)),
              (r = r.bind(this));
          },
          open: function (n, l) {
            var c,
              d = this,
              p = t.extend(!0, {}, Zomex.minipopupOption, n);
            (c = t(Zomex.parseTemplate(p.template, p))), (d.space = p.space);
            var u = c.appendTo(e).css("top", -i).find("img");
            u.length &&
              u.on("load", function () {
                (i += c[0].offsetHeight + d.space),
                  c.addClass("show"),
                  c.offset().top - window.pageYOffset < 0 &&
                    (d.close(), c.css("top", -i + c[0].offsetHeight + d.space)),
                  c
                    .on("mouseenter", function () {
                      d.pause();
                    })
                    .on("mouseleave", function () {
                      d.resume();
                    })
                    .on("touchstart", function (t) {
                      d.pause(), t.stopPropagation();
                    })
                    .on("mousedown", function () {
                      t(this).addClass("focus");
                    })
                    .on("mouseup", function () {
                      d.close(t(this).index());
                    }),
                  Zomex.$body.on("touchstart", function () {
                    d.resume();
                  }),
                  a.push(c),
                  o.length || (s = setInterval(r, 200)),
                  o.push(p.delay),
                  l && l(c);
              });
          },
          close: function (t) {
            var e = void 0 === t ? 0 : t,
              n = a.splice(e, 1)[0];
            o.splice(e, 1)[0];
            var r = n[0].offsetHeight;
            (i -= r + this.space),
              n.removeClass("show"),
              setTimeout(function () {
                n.remove();
              }, 300),
              a.forEach(function (t, i) {
                i >= e &&
                  t.hasClass("show") &&
                  t
                    .stop(!0, !0)
                    .animate(
                      { top: parseInt(t.css("top")) + r + 20 },
                      600,
                      "easeOutQuint"
                    );
              }),
              a.length || clearTimeout(s);
          },
          pause: function () {
            n = !0;
          },
          resume: function () {
            n = !1;
          },
        })),
      (Zomex.headerToggleSearch = function (t) {
        var e = Zomex.$(t);
        Zomex.$body.on("click", ".hs-toggle .search-toggle", function (t) {
          t.preventDefault();
        }),
          "ontouchstart" in document
            ? (e.find(".search-toggle").on("click", function (t) {
                e.toggleClass("show");
              }),
              Zomex.$body.on("click", function (t) {
                e.removeClass("show");
              }),
              e.on("click", function (t) {
                t.preventDefault(), t.stopPropagation();
              }))
            : e
                .find(".form-control")
                .on("focusin", function (t) {
                  e.addClass("show");
                })
                .on("focusout", function (t) {
                  e.removeClass("show");
                });
      }),
      (Zomex.scrollTo = function (e, i) {
        var a = void 0 === i ? 0 : i;
        if ("number" == typeof e) o = e;
        else {
          var n = Zomex.$(e);
          if (!n.length || "none" == n.css("display")) return;
          var o = n.offset().top,
            s = t("#wp-toolbar");
          window.innerWidth > 600 &&
            s.length &&
            (o -= s.parent().outerHeight()),
            t(".sticky-content.fix-top.fixed").each(function () {
              o -= this.offsetHeight;
            });
        }
        t("html,body").stop().animate({ scrollTop: o }, a);
      });
  })(jQuery),
  (function (t) {
    var e = function (t) {
        t.preventDefault(), Zomex.$body.addClass("mmenu-active");
      },
      i = function (t) {
        t.preventDefault(), Zomex.$body.removeClass("mmenu-active");
      },
      a = {
        init: function () {
          this.initMenu(),
            this.initCategoryMenu(),
            this.initMobileMenu(),
            this.initFilterMenu(),
            this.initCollapsibleWidget(),
            this.initSubmenu();
        },
        initMenu: function () {
          t(".menu li").each(function () {
            !this.lastElementChild ||
              ("UL" !== this.lastElementChild.tagName &&
                !this.lastElementChild.classList.contains("megamenu")) ||
              t(this).parent().hasClass("megamenu") ||
              (this.classList.add("has-submenu"),
              !this.lastElementChild.classList.contains("megamenu") &&
                this.lastElementChild.classList.add("submenu"));
          }),
            Zomex.$window.on("resize", function () {
              t(".main-nav megamenu").each(function () {
                var e = t(this),
                  i = e.offset().left,
                  a = i + e.outerWidth() - (window.innerWidth - 20);
                a > 0 && i > 20 && e.css("margin-left", -a);
              });
            });
        },
        initCategoryMenu: function () {
          var e = t(".category-dropdown");
          if (e.length) {
            var i = e.find(".dropdown-box");
            if (i.length) {
              var a = t(".main").offset().top + i[0].offsetHeight;
              (window.pageYOffset <= a || window.innerWidth < 992) &&
                e.removeClass("show"),
                window.addEventListener(
                  "scroll",
                  function () {
                    window.pageYOffset <= a &&
                      window.innerWidth >= 992 &&
                      e.removeClass("show");
                  },
                  { passive: !0 }
                ),
                t(".category-toggle").on("click", function (t) {
                  t.preventDefault();
                }),
                e.on("mouseover", function (t) {
                  ((e.hasClass("menu-fixed") &&
                    window.pageYOffset > a &&
                    window.innerWidth >= 992) ||
                    (!e.hasClass("menu-fixed") && window.innerWidth >= 992)) &&
                    e.addClass("show");
                }),
                e.on("mouseleave", function (t) {
                  ((e.hasClass("menu-fixed") &&
                    window.pageYOffset > a &&
                    window.innerWidth >= 992) ||
                    (!e.hasClass("menu-fixed") && window.innerWidth >= 992)) &&
                    e.removeClass("show");
                });
            }
            if (e.hasClass("with-sidebar")) {
              var n = Zomex.byClass("sidebar");
              n.length &&
                (e.find(".dropdown-box").css("width", n[0].offsetWidth - 20),
                Zomex.$window.on("resize", function () {
                  e.find(".dropdown-box").css("width", n[0].offsetWidth - 20);
                }));
            }
          }
        },
        initMobileMenu: function () {
          t(".mobile-menu li, .toggle-menu li").each(function () {
            if (
              this.lastElementChild &&
              ("UL" === this.lastElementChild.tagName ||
                this.lastElementChild.classList.contains("megamenu"))
            ) {
              var t = document.createElement("span");
              (t.className = "toggle-btn"),
                this.firstElementChild.appendChild(t);
            }
          }),
            t(".mobile-menu-toggle").on("click", e),
            t(".mobile-menu-overlay").on("click", i),
            t(".mobile-menu-close").on("click", i),
            Zomex.$window.on("resize", i);
        },
        initFilterMenu: function () {
          t(".search-ul li").each(function () {
            if (
              this.lastElementChild &&
              "UL" === this.lastElementChild.tagName
            ) {
              var t = document.createElement("i");
              (t.className = "la la-angle-down"),
                this.classList.add("with-ul"),
                this.firstElementChild.appendChild(t);
            }
          }),
            t(".with-ul > a i, .toggle-btn").on("click", function (e) {
              t(this);
              t(this)
                .parent()
                .next()
                .slideToggle(300)
                .parent()
                .toggleClass("show"),
                e.preventDefault();
            });
        },
        initCollapsibleWidget: function () {
          t(".widget-collapsible .widget-title").each(function () {
            var t = document.createElement("span");
            (t.className = "toggle-btn"), this.appendChild(t);
          }),
            t(".widget-collapsible .widget-title").on("click", function (e) {
              var i = t(this),
                a = i.siblings(".widget-body");
              i.hasClass("collapsed") || a.css("display", "block"),
                a.stop().slideToggle(300),
                i.toggleClass("collapsed"),
                setTimeout(function () {
                  t(".sticky-sidebar").trigger("recalc.pin");
                }, 300);
            });
        },
        initSubmenu: function () {
          t(".submenu-toggle-btn").on("click", function (e) {
            t(this).parent().parent().toggleClass("show"), e.preventDefault();
          }),
            Zomex.$window.on("resize", function () {
              window.innerWidth >= 1200 &&
                t(".submenu-toggle-btn").parent().parent().removeClass("show");
            });
        },
      };
    Zomex.menu = a;
  })(jQuery),
  (function (t) {
    function e(t, e) {
      return this.init(t, e);
    }
    var i = function (t) {
        var e = this.wrapperEl,
          i = e.getAttribute("class");
        if (
          (i.match(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g) &&
            e.setAttribute(
              "class",
              i
                .replace(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g, "")
                .replace(/\s+/, " ")
            ),
          e.classList.contains("animation-slider"))
        )
          for (var a = e.children, n = a.length, o = 0; o < n; ++o)
            a[o].setAttribute("data-index", o + 1);
      },
      a = function (t) {
        var e,
          i = this.firstElementChild.firstElementChild.children,
          a = i.length;
        for (e = 0; e < a; ++e)
          if (!i[e].classList.contains("active")) {
            var n,
              o = Zomex.byClass("appear-animate", i[e]);
            for (n = o.length - 1; n >= 0; --n)
              o[n].classList.remove("appear-animate");
          }
      },
      n = function (e) {
        t(window).trigger("appear.check");
        var i = t(e.currentTarget),
          a = i.find(".swiper-slide.active video");
        i
          .find(".swiper-slide:not(.swiper-slide-active) video")
          .each(function () {
            this.paused || i.trigger("autoplayStart"),
              this.pause(),
              (this.currentTime = 0);
          }),
          a.length &&
            (!0 === i.data("slider").options.autoplay &&
              i.trigger("autoplayStop"),
            a.each(function () {
              this.paused && this.play();
            }));
      },
      o = function () {
        var e = this;
        t(this.wrapperEl)
          .find(".swiper-slide-active .slide-animate")
          .each(function () {
            var i = t(this),
              a = t.extend(
                !0,
                {},
                Zomex.animationOptions,
                Zomex.parseOptions(i.data("animation-options"))
              ),
              n = a.duration,
              o = a.delay,
              s = a.name;
            setTimeout(function () {
              if (
                (i.css("animation-duration", n),
                i.css("animation-delay", o),
                i.addClass(s),
                i.hasClass("maskLeft"))
              ) {
                i.css("width", "fit-content");
                var t = i.width();
                i
                  .css("width", 0)
                  .css(
                    "transition",
                    "width " + (n || "0.75s") + " linear " + (o || "0s")
                  ),
                  i.css("width", t);
              }
              n = n || "0.75s";
              var a = Zomex.requestTimeout(
                function () {
                  i.addClass("show-content");
                },
                o ? 1e3 * Number(o.slice(0, -1)) + 200 : 200
              );
              e.timers.push(a);
            }, 300);
          });
      },
      s = function (e) {
        t(this.wrapperEl)
          .find(".swiper-slide-active .slide-animate")
          .each(function () {
            var e = t(this);
            e.addClass("show-content"), e.attr("style", "");
          });
      },
      r = function (e) {
        var i = this,
          a = t(this.wrapperEl);
        (i.translateFlag = 1),
          (i.prev = i.next),
          a.find(".swiper-slide .slide-animate").each(function () {
            var e = t(this),
              i = t.extend(
                !0,
                {},
                Zomex.animationOptions,
                Zomex.parseOptions(e.data("animation-options"))
              );
            e.removeClass(i.name);
          });
      },
      l = function (e) {
        var i = this,
          a = t(this.wrapperEl);
        if (1 == i.translateFlag) {
          if (
            ((i.next = this.slider.activeIndex),
            a.find(".show-content").removeClass("show-content"),
            i.prev != i.next)
          ) {
            if (
              (a.find(".show-content").removeClass("show-content"),
              a.hasClass("animation-slider"))
            ) {
              for (var n = 0; n < i.timers.length; n++)
                Zomex.deleteTimeout(i.timers[n]);
              i.timers = [];
            }
            a.find(".swiper-slide-active .slide-animate").each(function () {
              var e = t(this),
                a = t.extend(
                  !0,
                  {},
                  Zomex.animationOptions,
                  Zomex.parseOptions(e.data("animation-options"))
                ),
                n = a.duration,
                o = a.delay,
                s = a.name;
              e.css("animation-duration", n),
                e.css("animation-delay", o),
                e.css("transition-property", "visibility, opacity"),
                e.css("transition-delay", o),
                e.css("transition-duration", n),
                e.addClass(s),
                (n = n || "0.75s");
              var r = Zomex.requestTimeout(
                function () {
                  e.css("transition-property", ""),
                    e.css("transition-delay", ""),
                    e.css("transition-duration", ""),
                    e.addClass("show-content"),
                    i.timers.splice(i.timers.indexOf(r), 1);
                },
                o
                  ? 1e3 * Number(o.slice(0, -1)) + 500 * Number(n.slice(0, -1))
                  : 500 * Number(n.slice(0, -1))
              );
              i.timers.push(r);
            });
          } else
            a.find(".swiper-slide")
              .eq(this.slider.activeIndex)
              .find(".slide-animate")
              .addClass("show-content");
          i.translateFlag = 0;
        }
      };
    (e.defaults = { slidesPerView: 1, speed: 300 }),
      (e.presets = {
        "product-thumbs-wrap": {
          slidesPerView: 4,
          spaceBetween: 10,
          freeMode: !0,
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
          freeModeSticky: !0,
        },
      }),
      (e.prototype.init = function (c, d) {
        (this.timers = []),
          (this.translateFlag = 0),
          (this.prev = 0),
          (this.next = 0),
          (this.container = c[0]),
          (this.wrapperEl = c.children()[0]);
        var p = c.children(".swiper-button-next"),
          u = c.children(".swiper-button-prev"),
          m = c.children(".swiper-pagination"),
          h = c.children(".custom-dots");
        if (!c.data("slider")) {
          Zomex.lazyLoad(c, !0);
          var f = c.attr("class").split(" "),
            g = t.extend(!0, {}, e.defaults);
          f.forEach(function (i) {
            var a = e.presets[i];
            a && t.extend(!0, g, a);
          }),
            p.length && t.extend(!0, g, { navigation: { nextEl: p[0] } }),
            u.length && t.extend(!0, g, { navigation: { prevEl: u[0] } }),
            m.length &&
              t.extend(!0, g, { pagination: { el: m[0], clickable: !0 } }),
            c.find("video").each(function () {
              this.loop = !1;
            }),
            t.extend(
              !0,
              g,
              Zomex.parseOptions(c.attr("data-swiper-options")),
              d
            ),
            i.call(this),
            (this.slider = new Swiper(this.container, g)),
            c.data("slider", this.slider),
            c.trigger("initialized.slider", this.slider),
            this.slider.on("afterInit", a).on("transitionEnd", n),
            c.hasClass("animation-slider") && o.call(this),
            c.hasClass("animation-slider") &&
              this.slider
                .on("resize", s)
                .on("transitionStart", r.bind(this))
                .on("transitionEnd", l.bind(this)),
            h.length &&
              (this.slider.on("transitionEnd", function () {
                var t = this.activeIndex;
                h.children("a:nth-child(" + ++t + ")")
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              }),
              h.children("a").on("click", function (e) {
                e.preventDefault();
                var i = t(this);
                if (!i.hasClass("active")) {
                  var a = i.index();
                  i.closest(".swiper-container").data("slider").slideTo(a),
                    i.addClass("active").siblings().removeClass("active");
                }
              }));
        }
      }),
      (Zomex.slider = function (i, a = {}, n = !1) {
        Zomex.$(i).each(function () {
          var i = t(this);
          n
            ? new e(i, a)
            : Zomex.call(function () {
                new e(i, a);
              });
        });
      }),
      (Zomex.slider.pgToggle = function () {
        t(".swiper-container:not([class*='pg-']) .swiper-pagination").each(
          function () {
            var e = t(this);
            e.find("*").length <= 1
              ? e.css("display", "none")
              : e.css("display", "block");
          }
        );
      });
  })(jQuery),
  (function (t) {
    function e(t) {
      return this.init(t);
    }
    var i = function () {
      window.innerWidth < 992 &&
        (this.$sidebar.find(".sidebar-content").removeAttr("style"),
        this.$sidebar.find(".sidebar-content").attr("style", ""),
        this.$sidebar
          .find(".toolbox")
          .children(":not(:first-child)")
          .removeAttr("style"));
    };
    (e.prototype.init = function (e) {
      var a = this;
      return (
        (a.name = e),
        (a.$sidebar = t("." + e)),
        (a.isNavigation = !1),
        a.$sidebar.length &&
          ((a.isNavigation =
            a.$sidebar.hasClass("sidebar-fixed") &&
            a.$sidebar.parent().hasClass("toolbox-wrap")),
          a.isNavigation && ((i = i.bind(this)), Zomex.$window.on("resize", i)),
          Zomex.$window.on("resize", function (t) {
            Zomex.windowResized(t.timeStamp) &&
              Zomex.$body.removeClass(e + "-active");
          }),
          a.$sidebar
            .find(".sidebar-toggle, .sidebar-toggle-btn")
            .add("sidebar" === e ? ".left-sidebar-toggle" : "." + e + "-toggle")
            .on("click", function (e) {
              a.toggle(), t(this).blur(), e.preventDefault();
            }),
          a.$sidebar
            .find(".sidebar-overlay, .sidebar-close")
            .on("click", function (t) {
              Zomex.$body.removeClass(e + "-active"), t.preventDefault();
            })),
        !1
      );
    }),
      (e.prototype.toggle = function () {
        var e = this,
          i = 992;
        if (
          (e.$sidebar.hasClass("sidebar-switch-xl") && (i = 1200),
          window.innerWidth >= i && e.$sidebar.hasClass("sidebar-fixed"))
        ) {
          var a = e.$sidebar.hasClass("closed");
          if (
            (e.isNavigation &&
              (a || e.$sidebar.find(".filter-clean").hide(),
              e.$sidebar
                .siblings(".toolbox")
                .children(":not(:first-child)")
                .fadeToggle("fast"),
              e.$sidebar
                .find(".sidebar-content")
                .stop()
                .animate(
                  { height: "toggle", "margin-bottom": a ? "toggle" : -6 },
                  function () {
                    t(this).css("margin-bottom", ""),
                      a && e.$sidebar.find(".filter-clean").fadeIn("fast");
                  }
                )),
            e.$sidebar.hasClass("shop-sidebar"))
          ) {
            var n = t(".main-content .product-wrapper");
            n.length &&
              n.hasClass("product-lists") &&
              n.toggleClass("row cols-xl-2", !a);
          }
        } else
          e.$sidebar
            .find(".sidebar-overlay .sidebar-close")
            .css(
              "margin-left",
              -(window.innerWidth - document.body.clientWidth)
            ),
            Zomex.$body.toggleClass(e.name + "-active").removeClass("closed");
        setTimeout(function () {
          t(window).trigger("appear.check");
        }, 400);
      }),
      (Zomex.sidebar = function (t) {
        return new e().init(t);
      });
  })(jQuery),
  (function (t) {
    var e = {
      init: function () {
        var e;
        Zomex.call(Zomex.ratingTooltip, 500),
          Zomex.call(Zomex.setProgressBar(".progress-bar"), 500),
          this.initVariation(),
          this.initProductsScrollLoad(".scroll-load"),
          Zomex.$body
            .on("mousedown", ".select-menu", function (e) {
              var i = t(e.currentTarget),
                a = t(e.target),
                n = i.hasClass("opened");
              t(".select-menu").removeClass("opened"),
                i.is(a.parent())
                  ? (!n && i.addClass("opened"), e.stopPropagation())
                  : (a.parent().toggleClass("active"),
                    a.parent().hasClass("active")
                      ? (t(".selected-items").children().length < 2 &&
                          t(".selected-items").show(),
                        t(
                          '<a href="#" class="selected-item">' +
                            a.text().split("(")[0] +
                            '<i class="w-icon-times-solid"></i></a>'
                        )
                          .insertBefore(".selected-items .filter-clean")
                          .hide()
                          .fadeIn()
                          .data("link", a.parent()))
                      : t(".selected-items > .selected-item")
                          .filter(function (t, e) {
                            return e.innerText == a.text().split("(")[0];
                          })
                          .fadeOut(function () {
                            t(this).remove(),
                              t(".selected-items").children().length < 2 &&
                                t(".selected-items").hide();
                          }));
            })
            .on("click", ".selected-item", function (e) {
              var i = t(this),
                a = i.data("link");
              a &&
                a.removeClass("active").fadeOut(function () {
                  i.remove();
                }),
                e.preventDefault();
            }),
          t(".selected-items .filter-clean").on("click", function (e) {
            var i = t(this);
            i.siblings().each(function () {
              var e = t(this).data("link");
              e && e.removeClass("active");
            }),
              i.parent().fadeOut(function () {
                i.siblings().remove();
              }),
              e.preventDefault();
          }),
          t(".filter-clean").on("click", function (e) {
            t(".shop-sidebar .filter-items .active").removeClass("active"),
              e.preventDefault();
          }),
          Zomex.$body.on("click", ".select-menu a", function (t) {
            t.preventDefault();
          }),
          Zomex.$body.on("click", ".selected-item i", function (e) {
            t(e.currentTarget)
              .parent()
              .fadeOut(function () {
                var e = t(this),
                  i = e.data("link");
                i && i.toggleClass("active"),
                  e.remove(),
                  t(".select-items").children().length < 2 &&
                    t(".select-items").hide();
              }),
              e.preventDefault();
          }),
          Zomex.$body.on("mousedown", function (e) {
            t(".select-menu").removeClass("opened");
          }),
          Zomex.$body.on("click", ".filter-items a", function (e) {
            var i = t(this).closest(".filter-items");
            i.hasClass("search-ul") ||
              i.parent().hasClass("select-menu") ||
              (t(this).parent().toggleClass("active"), e.preventDefault());
          }),
          Zomex.$body.on(
            "click",
            ".product:not(.product-select) .btn-cart, .product-popup .btn-cart, .home .product-single .btn-cart",
            function (e) {
              e.preventDefault();
              var i = t(this),
                a = i.closest(".product, .product-popup");
              i.hasClass("disabled")
                ? alert(
                    "Please select some product options before adding this product to your cart."
                  )
                : (i.toggleClass("added").addClass("load-more-overlay loading"),
                  setTimeout(function () {
                    i.removeClass("load-more-overlay loading"),
                      Zomex.Minipopup.open({
                        productClass: " product-cart",
                        name: a.find(".product-name, .product-title").text(),
                        nameLink: a
                          .find(".product-name > a, .product-title > a")
                          .attr("href"),
                        imageSrc: a
                          .find(
                            ".product-media img, .product-image:first-child img"
                          )
                          .attr("src"),
                        imageLink: a.find(".product-name > a").attr("href"),
                        message: "<p>has been added to cart:</p>",
                        actionTemplate:
                          '<a href="cart.html" class="btn btn-rounded btn-sm">View Cart</a><a href="checkout.html" class="btn btn-dark btn-rounded btn-sm">Checkout</a>',
                      });
                  }, 500));
            }
          ),
          Zomex.$body.on(
            "click",
            ".product:not(.product-single) .btn-wishlist",
            function (e) {
              e.preventDefault();
              var i = t(this);
              i.toggleClass("added").addClass("load-more-overlay loading"),
                setTimeout(function () {
                  i.removeClass("load-more-overlay loading"),
                    i
                      .toggleClass("w-icon-heart")
                      .toggleClass("w-icon-heart-full");
                }, 500);
            }
          ),
          (e = t(".product-popup")).length &&
            Zomex.$body.on("click", ".btn-quickview", function (i) {
              i.preventDefault(),
                Zomex.popup(
                  {
                    items: { src: e[0].outerHTML },
                    callbacks: {
                      open: function () {
                        Zomex.productSingle(t(".mfp-product .product-single"));
                      },
                      close: function () {
                        t(".mfp-product .swiper-container")
                          .data("slider")
                          .destroy();
                      },
                    },
                  },
                  "quickview"
                );
            }),
          (function () {
            var e,
              i = [],
              a = t(".page-wrapper > .compare-popup");
            function n() {
              a
                .find(".title")
                .after(
                  '<p class="compare-count text-center text-light mb-0">(' +
                    e +
                    " Products)</p>"
                ),
                a.find(".compare-count").length > 1 &&
                  a.find("p:last-child").remove();
            }
            a.length ||
              document.body.classList.contains("docs") ||
              (t(".page-wrapper").append(
                '<div class="compare-popup">                    <div class="container">                        <div class="compare-title">                            <h4 class="title title-center">Compare Products</h4>                        </div>                        <ul class="compare-product-list list-style-none">                            <li></li><li></li><li></li><li></li>                        </ul>                        <a href="#" class="btn btn-clean">Clean All</a>                        <a href="compare.html" class="btn btn-dark btn-rounded">Start Compare !</a>                    </div>                </div>                <div class="compare-popup-overlay">                </div>'
              ),
              (a = t(".page-wrapper > .compare-popup"))),
              Zomex.$body
                .on("click", ".product .btn-compare", function (o) {
                  var s = t(this);
                  s.hasClass("added") && returne(),
                    o.preventDefault(),
                    s
                      .toggleClass("added")
                      .addClass("load-more-overlay loading"),
                    setTimeout(function () {
                      s.removeClass("load-more-overlay loading"),
                        s
                          .toggleClass("w-icon-compare")
                          .toggleClass("w-icon-check-solid"),
                        s.attr("href", "compare.html"),
                        a.addClass("show");
                    }, 500);
                  var r = s.closest(".product").find("img").eq(0).attr("src");
                  i.length >= 4 && i.shift(),
                    i.push(r),
                    t(".compare-popup li").each(function (t) {
                      i[t] &&
                        (this.innerHTML =
                          '<a href="product-details.html"><figure><img src="' +
                          i[t] +
                          '"/></figure></a>                                        <a href="#" class="btn btn-remove"><i class="w-icon-times-solid"></i></a>');
                    }),
                    (e = i.length),
                    n();
                })
                .on("click", ".compare-popup .btn-remove", function (a) {
                  a.preventDefault();
                  var o = t(a.currentTarget).closest("li"),
                    s = o.index(),
                    r = o.find("img").attr("src");
                  r &&
                    t(".page-wrapper .product img").each(function () {
                      if (this.getAttribute("src") == r) {
                        var e = t(this)
                          .closest(".product")
                          .find(".btn-compare");
                        e.length &&
                          (e.removeClass("added").attr("href", "#"),
                          e
                            .toggleClass("w-icon-check-solid")
                            .toggleClass("w-icon-compare"));
                      }
                    }),
                    i.splice(s, 1),
                    3 == s && o.empty(),
                    o
                      .nextAll()
                      .each(function () {
                        t(this).prev().html(t(this).html());
                      })
                      .last()
                      .empty(),
                    (e = i.length),
                    n();
                })
                .on("click", ".compare-popup .btn-clean", function (a) {
                  a.preventDefault(),
                    t(".page-wrapper .product img").each(function () {
                      var e = t(this),
                        a = this.getAttribute("src");
                      i.forEach(function (t) {
                        if (a == t) {
                          var i = e.closest(".product").find(".btn-compare");
                          i.length &&
                            (i.removeClass("added").attr("href", "#"),
                            i
                              .toggleClass("w-icon-check-solid")
                              .toggleClass("w-icon-compare"));
                        }
                      });
                    }),
                    i.splice(0, 4),
                    (e = i.length),
                    t(this).parent().find(".compare-product-list li").empty(),
                    n();
                }),
              Zomex.$body.on("click", ".compare-popup-overlay", function () {
                a.removeClass("show");
              });
          })(),
          Zomex.priceSlider(".filter-price-slider");
      },
      initVariation: function (e) {
        t(".product:not(.product-single) .product-variations > a").on(
          "click",
          function (e) {
            var i = t(this),
              a = i.closest(".product").find(".product-media img");
            a.data("image-src") || a.data("image-src", a.attr("src")),
              i.toggleClass("active").siblings().removeClass("active"),
              i.hasClass("active")
                ? a.attr("src", i.data("src"))
                : (a.attr("src", a.data("image-src")), i.blur()),
              e.preventDefault();
          }
        );
      },
      initProductsScrollLoad: function (e) {
        var i,
          a = Zomex.$(e),
          n = t(e).data("url");
        n || (n = "assets/ajax/products.html");
        var o = function (e) {
          window.pageYOffset > i + a.outerHeight() - window.innerHeight - 150 &&
            "loading" != a.data("load-state") &&
            t.ajax({
              url: n,
              success: function (e) {
                var i = t(e);
                a.data("load-state", "loading"),
                  a.next().hasClass("load-more-overlay")
                    ? a.next().addClass("loading")
                    : t(
                        '<div class="mt-4 mb-4 load-more-overlay loading"></div>'
                      ).insertAfter(a),
                  setTimeout(function () {
                    a.next().removeClass("loading"),
                      a.append(i),
                      setTimeout(function () {
                        a.find(".product-wrap.fade:not(.in)").addClass("in");
                      }, 200),
                      a.data("load-state", "loaded"),
                      Zomex.countDown(i.find(".product-countdown"));
                  }, 500);
                var n = parseInt(
                  a.data("load-count") ? a.data("load-count") : 0
                );
                a.data("load-count", ++n),
                  n > 2 &&
                    window.removeEventListener("scroll", o, { passive: !0 });
              },
              failure: function () {
                $this.text("Sorry something went wrong.");
              },
            });
        };
        a.length > 0 &&
          ((i = a.offset().top),
          window.addEventListener("scroll", o, { passive: !0 }));
      },
    };
    Zomex.shop = e;
  })(jQuery),
  (function (t) {
    function e(t) {
      return this.init(t);
    }
    (e.min = 1),
      (e.max = 1e6),
      (e.value = 1),
      (e.prototype.init = function (t) {
        var i = this;
        (i.$minus = !1),
          (i.$plus = !1),
          (i.$value = !1),
          (i.value = !1),
          (i.startIncrease = i.startIncrease.bind(i)),
          (i.startDecrease = i.startDecrease.bind(i)),
          (i.stop = i.stop.bind(i)),
          (i.min = parseInt(t.attr("min"))),
          (i.max = parseInt(t.attr("max"))),
          i.min || t.attr("min", (i.min = e.min)),
          i.max || t.attr("max", (i.max = e.max)),
          (i.$value = t.val((i.value = e.value))),
          (i.$minus = t
            .parent()
            .find(".quantity-minus")
            .on("mousedown", function (t) {
              t.preventDefault(), i.startDecrease();
            })
            .on("touchstart", function (t) {
              t.cancelable && t.preventDefault(), i.startDecrease();
            })
            .on("mouseup", i.stop)),
          (i.$plus = t
            .parent()
            .find(".quantity-plus")
            .on("mousedown", function (t) {
              t.preventDefault(), i.startIncrease();
            })
            .on("touchstart", function (t) {
              t.cancelable && t.preventDefault(), i.startIncrease();
            })
            .on("mouseup", i.stop)),
          Zomex.$body
            .on("mouseup", i.stop)
            .on("touchend", i.stop)
            .on("touchcancel", i.stop);
      }),
      (e.prototype.startIncrease = function (t) {
        t && t.preventDefault();
        var e = this;
        (e.value = e.$value.val()),
          e.value < e.max && e.$value.val(++e.value),
          (e.increaseTimer = Zomex.requestTimeout(function () {
            (e.speed = 1),
              (e.increaseTimer = Zomex.requestInterval(function () {
                e.$value.val(
                  (e.value = Math.min(
                    e.value + Math.floor((e.speed *= 1.05)),
                    e.max
                  ))
                );
              }, 50));
          }, 400));
      }),
      (e.prototype.startDecrease = function (t) {
        t && t.preventDefault();
        var e = this;
        (e.value = e.$value.val()),
          e.value > e.min && e.$value.val(--e.value),
          (e.decreaseTimer = Zomex.requestTimeout(function () {
            (e.speed = 1),
              (e.decreaseTimer = Zomex.requestInterval(function () {
                e.$value.val(
                  (e.value = Math.max(
                    e.value - Math.floor((e.speed *= 1.05)),
                    e.min
                  ))
                );
              }, 50));
          }, 400));
      }),
      (e.prototype.stop = function (t) {
        Zomex.deleteTimeout(this.increaseTimer),
          Zomex.deleteTimeout(this.decreaseTimer);
      }),
      (Zomex.initQtyInput = function (i) {
        Zomex.$(i).each(function () {
          var i = t(this);
          i.data("quantityInput") || i.data("quantityInput", new e(i));
        });
      });
  })(jQuery),
  (function (t) {
    function e(t, e) {
      return this.init(t, e);
    }
    (e.defaults = {
      removalDelay: 300,
      closeOnBgClick: !1,
      callbacks: {
        open: function () {
          t("html").css("overflow-y", "hidden"),
            t("body").css("overflow-x", "visible"),
            t(".mfp-wrap").css("overflow", "hidden auto"),
            t(".sticky-header.fixed").css(
              "padding-right",
              window.innerWidth - document.body.clientWidth
            );
        },
        close: function () {
          t("html").css("overflow-y", ""),
            t("body").css("overflow-x", "hidden"),
            t(".mfp-wrap").css("overflow", ""),
            t(".sticky-header.fixed").css("padding-right", "");
        },
      },
    }),
      (e.presets = {
        quickview: {
          type: "inline",
          mainClass: "mfp-product mfp-fade",
          tLoading: "Loading...",
        },
        video: {
          type: "iframe",
          mainClass: "mfp-fade",
          preloader: !1,
          closeBtnInside: !1,
        },
        login: {
          type: "ajax",
          mainClass: "mfp-login-popup mfp-fade ",
          tLoading: "",
          preloader: !1,
        },
      }),
      (e.prototype.init = function (i, a) {
        var n = t.magnificPopup.instance;
        function o(e) {
          !t(e.target).closest(".mfp-content").length ||
          t(e.target).hasClass("mfp-content")
            ? t.magnificPopup.instance.close()
            : ((n.st.closeOnBgClick = !1), (n.st.closeOnBgContentClick = !1));
        }
        n.isOpen
          ? n.content
            ? setTimeout(function () {
                Zomex.popup(i, a);
              }, 5e3)
            : t.magnificPopup.close()
          : t.magnificPopup.open(
              t.extend(!0, {}, e.defaults, a ? e.presets[a] : {}, i)
            ),
          Zomex.$body.on("mousedown", ".mfp-wrap", o),
          "ontouchstart" in document &&
            document.addEventListener("touchstart", o, { passive: !0 });
      }),
      (Zomex.popup = function (t, i) {
        return new e(t, i);
      });
  })(jQuery),
  (function (t) {
    function e(t) {
      return this.init(t);
    }
    var i = function () {
        this.$wrapper
          .find(".product-details")
          .css(
            "height",
            window.innerWidth > 767
              ? this.$wrapper.find(".product-gallery")[0].clientHeight
              : ""
          );
      },
      a = function (e) {
        var i = t(this);
        i.hasClass("added") ||
          (e.preventDefault(),
          i.addClass("load-more-overlay loading"),
          setTimeout(function () {
            i.removeClass("load-more-overlay loading")
              .toggleClass("w-icon-heart")
              .toggleClass("w-icon-heart-full")
              .addClass("added")
              .attr("href", "wishlist.html");
          }, 500));
      },
      n = function (e) {
        e.preventDefault(),
          Zomex.scrollTo(
            t(
              '.product-tabs > .nav a[href="' + this.getAttribute("href") + '"]'
            ).trigger("click")
          );
      };
    (e.prototype.init = function (e) {
      var o = this,
        s = e.find(".product-single-swiper");
      (o.$wrapper = e),
        (o.isQuickView = !!e.closest(".mfp-content").length),
        (o._isPgVertical = !1),
        o.isQuickView && ((i = i.bind(this)), Zomex.ratingTooltip()),
        (function (t) {
          (t.$thumbs = t.$wrapper.find(".product-thumbs")),
            (t.$thumbsWrap = t.$thumbs.parent()),
            (t.$thumbUp = t.$thumbsWrap.find(".thumb-up")),
            (t.$thumbDown = t.$thumbsWrap.find(".thumb-down")),
            (t.$thumbsDots = t.$thumbs.children()),
            (t.thumbsCount = t.$thumbsDots.length),
            (t.$productThumb = t.$thumbsDots.eq(0)),
            (t._isPgVertical = t.$thumbsWrap
              .parent()
              .hasClass("product-gallery-vertical")),
            (t.thumbsIsVertical = t._isPgVertical && window.innerWidth >= 992),
            Zomex.slider(t.$thumbsWrap, {}, !0);
        })(o),
        document.body.classList.contains("home") ||
          (s.parent().hasClass("product-gallery-video") &&
            (o.isQuickView ||
              s.append(
                '<a href="#" class="product-gallery-btn product-degree-viewer" title="Product 360 Degree Gallery"><i class="w-icon-rotate-3d"></i></a>'
              ),
            o.isQuickView ||
              s.append(
                '<a href="#" class="product-gallery-btn product-video-viewer" title="Product Video Thumbnail"><i class="w-icon-movie"></i></a>'
              ))),
        o.$wrapper.on("click", ".btn-wishlist", a),
        o.$wrapper.on("click", ".rating-reviews", n),
        "complete" === Zomex.status &&
          (Zomex.slider(s, {
            thumbs: { swiper: o.$thumbsWrap.data("slider") },
          }),
          Zomex.initQtyInput(e.find(".quantity"))),
        s.length &&
          window.addEventListener(
            "resize",
            function () {
              Zomex.requestTimeout(function () {
                null != s.data("slider") &&
                  (s.data("slider").update(),
                  o.$thumbsWrap.data("slider").update());
              }, 100);
            },
            { passive: !0 }
          ),
        o.$wrapper
          .find(".product-single-swiper")
          .on("initialized.slider", function (e) {
            t(e.target).find(".product-image").zoom(Zomex.zoomImageOptions);
          }),
        o.$wrapper.find(".product-thumbs-sticky").length &&
          ((o.isStickyScrolling = !1),
          o.$wrapper.on(
            "click",
            ".product-thumb:not(.active)",
            o.clickStickyThumbnail.bind(this)
          ),
          window.addEventListener(
            "scroll",
            o.scrollStickyThumbnail.bind(this),
            { passive: !0 }
          )),
        (function (e) {
          (e.$selects = e.$wrapper.find(".product-variations select")),
            (e.$items = e.$wrapper.find(".product-variations")),
            (e.$priceWrap = e.$wrapper.find(".product-variation-price")),
            (e.$clean = e.$wrapper.find(".product-variation-clean")),
            (e.$btnCart = e.$wrapper.find(".btn-cart")),
            e.variationCheck(),
            e.$selects.on("change", function (t) {
              e.variationCheck();
            }),
            e.$items.children("a").on("click", function (i) {
              t(this).toggleClass("active").siblings().removeClass("active"),
                i.preventDefault(),
                e.variationCheck(),
                e.$items.parent(".product-image-swatch") && e.swatchImage();
            }),
            e.$clean.on("click", function (t) {
              t.preventDefault(), e.variationClean(!0);
            });
        })(this);
    }),
      (e.prototype.variationCheck = function () {
        var e = this,
          i = !0;
        e.$selects.each(function () {
          return this.value || (i = !1);
        }),
          e.$items.each(function () {
            var e = t(this);
            if (e.children("a:not(.size-guide)").length)
              return e.children(".active").length || (i = !1);
          }),
          i ? e.variationMatch() : e.variationClean();
      }),
      (e.prototype.variationMatch = function () {
        var t = this;
        t.$priceWrap
          .find("span")
          .text("$" + (Math.round(50 * Math.random()) + 200) + ".00"),
          t.$priceWrap.slideDown(),
          t.$clean.slideDown(),
          t.$btnCart.removeClass("disabled");
      }),
      (e.prototype.variationClean = function (t) {
        t && this.$selects.val(""),
          t && this.$items.children(".active").removeClass("active"),
          this.$priceWrap.slideUp(),
          this.$clean.css("display", "none"),
          this.$btnCart.addClass("disabled");
      }),
      (e.prototype.clickStickyThumbnail = function (e) {
        var i = this,
          a = t(e.currentTarget),
          n = (a.parent().children(".active").index(), a.index() + 1);
        a.addClass("active").siblings(".active").removeClass("active"),
          (this.isStickyScrolling = !0);
        var o = a
          .closest(".product-thumbs-sticky")
          .find(".product-image-wrapper > :nth-child(" + n + ")");
        o.length && ((o = o.offset().top + 10), Zomex.scrollTo(o, 500)),
          setTimeout(function () {
            i.isStickyScrolling = !1;
          }, 300);
      }),
      (e.prototype.scrollStickyThumbnail = function () {
        var e = this;
        this.isStickyScrolling ||
          e.$wrapper
            .find(".product-image-wrapper .product-image")
            .each(function () {
              if (Zomex.isOnScreen(this))
                return (
                  e.$wrapper
                    .find(
                      ".product-thumbs > :nth-child(" +
                        (t(this).index() + 1) +
                        ")"
                    )
                    .addClass("active")
                    .siblings()
                    .removeClass("active"),
                  !1
                );
            });
      }),
      (e.prototype.swatchImage = function () {
        var t = this.$items.find(".active img").attr("src"),
          e = this.$wrapper.find(
            ".swiper-slide:first-child .product-image img"
          ),
          i = this.$wrapper.find(
            ".swiper-slide:first-child .product-thumb img"
          );
        e.attr("src", t), i.attr("src", t);
      }),
      (Zomex.productSingle = function (i) {
        return (
          Zomex.$(i).each(function () {
            var i = t(this);
            i.is("body > *") || i.data("product-single", new e(i));
          }),
          null
        );
      });
  })(jQuery),
  (function (t) {
    function e(e) {
      e.preventDefault();
      var i,
        a,
        n = t(e.currentTarget),
        o = n.closest(".product-single"),
        s = n.closest(".review-image");
      if (
        (i = n.closest(".review-image").length
          ? n.closest(".review-image").find("img")
          : o.find(".product-single-swiper").length
          ? o.find(
              ".product-single-swiper .swiper-slide:not(.cloned) img:first-child"
            )
          : o.find(".product-gallery-carousel").length
          ? o.find(".product-gallery-carousel .swiper-slide:not(.cloned) img")
          : o.find(".product-image img:first-child")).length
      ) {
        a = i
          .map(function () {
            var e = t(this);
            return {
              src: e.attr("data-zoom-image"),
              w: 800,
              h: 900,
              title: e.attr("alt"),
            };
          })
          .get();
        var r = o.find(".product-single-swiper").data("slider"),
          l = r
            ? r.activeIndex
            : o.find(".product-gallery .product-gallery-btn").index(n);
        if (1 == s.length) l = s.find("img").index(n);
        if ("undefined" != typeof PhotoSwipe) {
          var c = t(".pswp")[0];
          if ("rtl" == Zomex.$body.attr("dir"))
            var d = new PhotoSwipe(c, PhotoSwipeUI_Default, a, {
              index: l,
              closeOnScroll: !1,
              showAnimationDuration: 0,
              rtl: !0,
            });
          else
            d = new PhotoSwipe(c, PhotoSwipeUI_Default, a, {
              index: l,
              closeOnScroll: !1,
              showAnimationDuration: 0,
            });
          d.init(), (Zomex.photoSwipe = d);
        }
      }
    }
    function i(t) {
      t.preventDefault(),
        Zomex.popup(
          {
            items: {
              src: '<video src="assets/video/memory-of-a-woman.mp4" autoplay loop controls>',
              type: "inline",
            },
            mainClass: "mfp-video-popup",
          },
          "video"
        );
    }
    function a(e) {
      var i = t(this);
      i.addClass("active").siblings().removeClass("active"),
        i.parent().addClass("selected"),
        i.closest(".rating-form").find("select").val(i.text()),
        e.preventDefault();
    }
    function n(e) {
      var i = t(this),
        a = t(".main-content > .alert, .container > .alert");
      if (i.hasClass("disabled"))
        alert(
          "Please select some product options before adding this product to your cart."
        );
      else {
        if (a.length)
          a.fadeOut(function () {
            a.fadeIn();
          });
        else {
          var n =
            '<div class="alert alert-success alert-cart-product mb-2">                            <a href="cart.html" class="btn btn-success btn-rounded">View Cart</a>                            <p class="mb-0 ls-normal">“' +
            i.closest(".product-single").find(".product-title").text() +
            '” has been added to your cart.</p>                            <a href="#" class="btn btn-link btn-close" aria-label="button"><i class="close-icon"></i></a>                            </div>';
          i.closest(".product-single").before(n);
        }
        t(".product-sticky-content").trigger("recalc.pin");
      }
    }
    Zomex.initProductSinglePage = function () {
      t(".product-gallery").each(function () {
        var e = t(this),
          i = e.find(".product-image");
        i.length &&
          0 == e.find(".swiper-container").length &&
          i.zoom(Zomex.zoomImageOptions);
      }),
        (function (e) {
          var i = t(e),
            a = i.closest(".product-single"),
            n =
              '<div class="product product-list-sm mr-auto">                                        <figure class="product-media">                                        <img src="' +
              a.find(".product-image img").eq(0).attr("src") +
              '" alt="Product" width="85" height="85" />                                        </figure>                                        <div class="product-details pt-0 pl-2 pr-2">                                        <h4 class="product-name font-weight-normal mb-1">' +
              a.find(".product-details .product-title").text() +
              '</h4>                                        <div class="product-price mb-0">                                        <ins class="new-price">' +
              a.find(".new-price").text() +
              '</ins><del class="old-price">' +
              a.find(".old-price").text() +
              "</del></div>                                        </div></div>";
          function o() {
            i.hasClass("fix-top") &&
              window.innerWidth > 767 &&
              i.removeClass("fix-top").addClass("fix-bottom"),
              (i.hasClass("fix-bottom") && window.innerWidth > 767) ||
                (i.hasClass("fix-bottom") &&
                  window.innerWidth < 768 &&
                  i.removeClass("fix-bottom").addClass("fix-top"),
                i.hasClass("fix-top") && window.innerWidth);
          }
          i.find(".product-qty-form").before(n),
            window.addEventListener("resize", o, { passive: !0 }),
            o();
        })(".product-sticky-content"),
        document.body.classList.contains("home") ||
          Zomex.$body
            .on("click", ".product-image-full", e)
            .on("click", ".review-image img", e)
            .on("click", ".product-video-viewer", i)
            .on("click", ".product-degree-viewer", function (e) {
              e.preventDefault(e),
                t.fn.ThreeSixty &&
                  (function (t) {
                    t.preventDefault(),
                      Zomex.popup({
                        type: "inline",
                        mainClass: "product-popupbox wm-fade product-360-popup",
                        preloader: !1,
                        items: {
                          src: '<div class="product-gallery-degree">\t\t\t\t\t\t<div class="w-loading"><i></i></div>\t\t\t\t\t\t<ul class="product-degree-images"></ul>\t\t\t\t\t</div>',
                        },
                        callbacks: {
                          open: function () {
                            this.container
                              .find(".product-gallery-degree")
                              .ThreeSixty({
                                imagePath: "assets/images/products/video/",
                                filePrefix: "360-",
                                ext: ".jpg",
                                totalFrames: 18,
                                endFrame: 18,
                                currentFrame: 1,
                                imgList: this.container.find(
                                  ".product-degree-images"
                                ),
                                progress: ".w-loading",
                                height: 500,
                                width: 830,
                                navigation: !0,
                              });
                          },
                          beforeClose: function () {
                            this.container.empty();
                          },
                        },
                      });
                  })(e);
            })
            .on("click", ".rating-form .rating-stars > a", a)
            .on("click", ".product-single:not(.product-popup) .btn-cart", n);
    };
  })(jQuery),
  (function (t) {
    Zomex.initCodePopup = function () {
      t(".box-btn.showcode span").each(function () {
        t(this).text("</>");
      }),
        t(".show-code-action").each(function () {
          var e,
            i,
            a = t(this),
            n = a[0].outerHTML.replace("show-code-action", ""),
            o = n.slice(1, n.length - 1).indexOf("<"),
            s = n.indexOf(">");
          o - s > 6
            ? ((e = new RegExp("\n" + String(" ").repeat(o - s - 6), "gi")),
              (i = n.replace(e, "\n")))
            : (i = n),
            a.data("codepopup", i);
        }),
        Zomex.$body.on("click", ".box-btn.showcode", function () {
          var e = t(this);
          e.hasClass("enabled")
            ? (e.removeClass("enabled").addClass("disabled"),
              (e.children("p")[0].innerHTML = "Show Code: Disabled"),
              t(".show-code-action").each(function () {
                var e = t(this);
                e.removeClass("show-code-added"),
                  setTimeout(function () {
                    e[0].removeChild(e[0].lastElementChild);
                  }, 300);
              }))
            : (e.removeClass("disabled").addClass("enabled"),
              (e.children("p")[0].innerHTML = "Show Code: Enabled"),
              t(".show-code-action").each(function () {
                var e = t(this),
                  i = document.createElement("span");
                (i.className = "show-code"),
                  i.appendChild(document.createTextNode("</>")),
                  this.appendChild(i),
                  setTimeout(function () {
                    e.addClass("show-code-added");
                  }, 200);
              }));
        }),
        Zomex.$body.on("click", ".show-code", function (e) {
          e.stopPropagation();
          var i = t(this).parent();
          if (i.hasClass("show-code-added")) {
            var a = i[0].lastElementChild;
            i[0].removeChild(a),
              t(".code-popup #textareaCode").text(i.data("codepopup")),
              t(".code-copy a").html(
                '<i class="copy-icon far fa-copy"></i>Copy to Clipboard'
              ),
              Zomex.$body.on("click", ".code-copy a", function (e) {
                e.preventDefault(),
                  t(".code-popup #textareaCode").trigger("select"),
                  document.execCommand("copy"),
                  t(this).html('<i class="copy-icon far fa-copy"></i>Copied');
              }),
              setTimeout(function () {
                Zomex.popup({
                  items: { src: ".code-popup" },
                  type: "inline",
                  tLoading: "",
                  mainClass: "mfp-code mfp-fadein-popup",
                }),
                  t(".CodeMirror").remove(),
                  CodeMirror.fromTextArea(
                    document.getElementById("textareaCode"),
                    {
                      mode: "text/html",
                      htmlMode: !0,
                      lineWrapping: !1,
                      smartIndent: !1,
                      spellcheck: !0,
                      addModeClass: !0,
                      readOnly: !0,
                    }
                  );
              }, 100),
              i[0].appendChild(a);
          }
        }),
        Zomex.$body.on(
          "mouseenter mouseleave",
          ".show-code-action",
          function (t) {
            t.stopPropagation();
          }
        );
    };
  })(jQuery),
  (function (t) {
    function e(t, e) {
      return this.init(t, e);
    }
    var i = function (t) {
      var e = this,
        i = e.settings.months[t.getMonth()];
      (i += e.settings.displayYear ? " " + t.getFullYear() : ""),
        e.element.find(".calendar-title").html(i);
    };
    (e.defaultOptions = {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      days: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      displayYear: !0,
      fixedStartDay: !0,
      dayNumber: 0,
      dayExcerpt: 3,
    }),
      (e.prototype.init = function (a, n) {
        var o = this;
        (o.element = a),
          (o.settings = t.extend(
            {},
            !0,
            e.defaultOptions,
            Zomex.parseOptions(a.attr("data-calendar-options")),
            n
          )),
          (o.today = new Date()),
          (i = i.bind(this));
        var s = t('<div class="calendar"></div>'),
          r = t(
            '<div class="calendar-header"><a href="#" class="btn-calendar btn-calendar-prev"><i class="la la-angle-left"></i></a><span class="calendar-title"></span><a href="#" class="btn-calendar btn-calendar-next"><i class="la la-angle-right"></i></a></div>'
          );
        s.append(r),
          a.append(s),
          i(o.today),
          o.render(o.today, s),
          o.bindEvents();
      }),
      (e.prototype.render = function (e, i) {
        var a = this;
        i.find("table") && i.find("table").remove();
        var n = t("<table></table>"),
          o = t("<thead></thead>"),
          s = t("<tbody></tbody"),
          r = e.getFullYear(),
          l = e.getMonth(),
          c = new Date(r, l, 1),
          d = new Date(r, l + 1, 0),
          p = c.getDay();
        if (a.settings.fixedStartDay) {
          for (p = a.settings.dayNumber; c.getDay() != p; )
            c.setDate(c.getDate() - 1);
          for (; d.getDay() != (p + 7) % 7; ) d.setDate(d.getDate() + 1);
        }
        for (var u = p; u < p + 7; u++) {
          var m = t(
            "<th>" +
              a.settings.days[u % 7].substring(0, a.settings.dayExcerpt) +
              "</th>"
          );
          u % 7 == 0 && m.addClass("holiday"), o.append(m);
        }
        for (var h = c; h < d; h.setDate(h.getDate())) {
          var f = t("<tr></tr>");
          for (u = 0; u < 7; u++) {
            var g = t(
              '<td><span class="day" data-date="' +
                h.toISOString() +
                '">' +
                h.getDate() +
                "</span></td>"
            );
            h.toDateString() == new Date().toDateString() &&
              g.find(".day").addClass("today"),
              h.getMonth() != e.getMonth() &&
                g.find(".day").addClass("disabled"),
              f.append(g),
              h.setDate(h.getDate() + 1);
          }
          s.append(f);
        }
        n.append(o), n.append(s), i.append(n);
      }),
      (e.prototype.changeMonth = function (e) {
        this.today.setMonth(this.today.getMonth() + e, 1),
          this.render(this.today, t(this.element).find(".calendar")),
          i(this.today);
      }),
      (e.prototype.bindEvents = function () {
        var e = this;
        t(e.element)
          .find(".btn-calendar-prev")
          .on("click", function (t) {
            e.changeMonth(-1), t.preventDefault();
          }),
          t(e.element)
            .find(".btn-calendar-next")
            .on("click", function (t) {
              e.changeMonth(1), t.preventDefault();
            });
      }),
      (Zomex.calendar = function (i, a) {
        Zomex.$(i).each(function () {
          var i = t(this);
          Zomex.call(function () {
            new e(i, a);
          });
        });
      }),
      (Zomex.initVendor = function (e) {
        var i = t(e),
          a = i.closest(".page-content").find(".toolbox .vendor-search-toggle"),
          n = i.find(".store-phone");
        a.on("click", function (t) {
          var e = a.closest(".vendor-toolbox").next(".vendor-search-wrapper");
          e.hasClass("open")
            ? e.removeClass("open").slideUp()
            : e.addClass("open").slideDown(),
            t.preventDefault();
        }),
          n.on("click", function () {
            alert("Always open these types of links in the associated app");
          });
      }),
      (Zomex.slideContent = function (e) {
        var i = t(e),
          a = i.next();
        i.on("click", function (t) {
          t.preventDefault(),
            a.hasClass("open")
              ? (a.removeClass("open").slideUp(),
                i.find(".custom-checkbox").removeClass("checked"))
              : (a.addClass("open").slideDown(),
                i.find(".custom-checkbox").addClass("checked"));
        });
      }),
      (Zomex.initLoginVendor = function (e) {
        var i = t(e),
          a = i.parent().find(".login-vendor"),
          n = i.find(".check-customer");
        i.find(".check-seller").on("click", function () {
          i.find("#check-seller").addClass("active"),
            i.find("#check-customer").removeClass("active"),
            a.slideDown();
        }),
          n.on("click", function () {
            i.find("#check-customer").addClass("active"),
              i.find("#check-seller").removeClass("active"),
              a.slideUp();
          });
      });
  })(jQuery),
  jQuery,
  (Zomex.initLayout = function () {
    Zomex.isotopes(".grid:not(.grid-float)"),
      Zomex.stickySidebar(".sticky-sidebar");
  }),
  (Zomex.init = function () {
    Zomex.appearAnimate(".appear-animate"),
      Zomex.setTab(".nav-tabs"),
      Zomex.stickyContent(".sticky-header", { scrollMode: !1 }),
      Zomex.stickyContent(".sticky-footer", {
        minWidth: 0,
        maxWidth: 767,
        top: 150,
        hide: !0,
        max_index: 2100,
        scrollMode: !0,
      }),
      Zomex.stickyContent(".sticky-toolbox", Zomex.stickyToolboxOptions),
      Zomex.stickyContent(
        ".product-sticky-content",
        Zomex.stickyProductOptions
      ),
      Zomex.parallax(".parallax"),
      Zomex.skrollrParallax(),
      Zomex.initFloatingParallax(),
      Zomex.menu.init(),
      Zomex.initScrollTopButton(),
      Zomex.shop.init(),
      Zomex.alert(".alert"),
      Zomex.closeTopNotice(".banner-close"),
      Zomex.accordion(".card-header > a"),
      Zomex.sidebar("sidebar"),
      Zomex.sidebar("right-sidebar"),
      Zomex.productSingle(".product-single"),
      Zomex.initProductSinglePage(),
      Zomex.initQtyInput(".quantity"),
      Zomex.initNavFilter(".nav-filters .nav-filter"),
      Zomex.calendar(".calendar-container"),
      Zomex.countDown(".product-countdown, .countdown"),
      Zomex.initPopup(),
      Zomex.initNotificationAlert(),
      Zomex.countTo(".count-to"),
      Zomex.initCartAction(".cart-offcanvas .cart-toggle"),
      Zomex.Minipopup.init(),
      Zomex.headerToggleSearch(".hs-toggle"),
      Zomex.initVendor(".store"),
      Zomex.slideContent(".login-toggle"),
      Zomex.slideContent(".coupon-toggle"),
      Zomex.slideContent(".checkbox-toggle"),
      Zomex.initLoginVendor(".user-checkbox"),
      Zomex.initCodePopup(),
      Zomex.slider(".swiper-container"),
      Zomex.call(Zomex.slider.pgToggle),
      Zomex.$window.on("resize", function () {
        Zomex.call(Zomex.slider.pgToggle);
      });
  }),
  jQuery,
  (window.onload = function () {
    (Zomex.canvasWidth = window.innerWidth),
      (Zomex.resizeTimeStamp = 0),
      (Zomex.resizeChanged = !1),
      (Zomex.status = "loaded"),
      document.body.classList.add("loaded"),
      Zomex.call(Zomex.initLayout),
      Zomex.call(Zomex.init),
      (Zomex.status = "complete"),
      Zomex.$window.trigger("Zomex_complete");
  });
