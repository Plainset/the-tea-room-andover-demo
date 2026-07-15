(function () {
  "use strict";

  // ---- mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var header = document.querySelector(".site-header");

  function setHeaderHeightVar() {
    if (header) {
      document.documentElement.style.setProperty(
        "--header-h",
        header.offsetHeight + "px"
      );
    }
  }
  setHeaderHeightVar();
  window.addEventListener("resize", setHeaderHeightVar);

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- scroll reveal ----
  // Standing rule: check getBoundingClientRect before observing so
  // above-the-fold [data-reveal] elements (hero content included) are
  // marked visible immediately instead of waiting for a later
  // intersection change that may never fire on first paint.
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var alreadyVisible =
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0;
      if (alreadyVisible) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
