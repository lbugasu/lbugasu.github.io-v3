/* eslint-disable no-undef */
console.log("ice berg");

// eslint-disable-next-line no-undef
new CookiesEuBanner(function () {
  (function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l;
    b[l] ||
      (b[l] = function () {
        (b[l].q = b[l].q || []).push(arguments);
      });
    b[l].l = +new Date();
    e = o.createElement(i);
    r = o.getElementsByTagName(i)[0];
    e.src = "https://www.googletagmanager.com/gtag/js?id=UA-171168411-3";
    r.parentNode.insertBefore(e, r);
  })(window, document, "script", "ga");
  ga("create", "UA-171168411-3");
  ga("send", "pageview");
}, true);
