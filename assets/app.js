/* AgniLift — minimal shared behaviour. No dependencies. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  var backdrop = document.querySelector(".nav-backdrop");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("open", open);
    if (backdrop) backdrop.classList.toggle("show", open);
    document.body.classList.toggle("nav-locked", open);
    if (open) {
      var first = menu.querySelector("a, button");
      if (first) first.focus();
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close when a link is chosen
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    // Escape closes and returns focus to the toggle
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    // Reset when resizing back to desktop
    var mq = window.matchMedia("(min-width: 901px)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function (ev) {
      if (ev.matches) setMenu(false);
    });
  }

  /* ---------- Scroll reveal (respects reduced motion) ---------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Contact form (Web3Forms submission) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var setStatus = function (kind, html) {
      if (!status) return;
      status.className = "form-status show " + kind;
      status.setAttribute("role", kind === "error" ? "alert" : "status");
      status.innerHTML = html;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("info", "Sending your enquiry…");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, data: j }; }); })
        .then(function (res) {
          if (res.ok && res.data && res.data.success) {
            form.reset();
            setStatus("success", "Thank you — your enquiry has been sent. We'll get back to you by email.");
          } else {
            var msg = (res.data && res.data.message) ? res.data.message : "Something went wrong.";
            setStatus("error", "Sorry, we couldn't send your enquiry (" + msg + "). Please try again in a moment.");
          }
        })
        .catch(function () {
          setStatus("error", "Network error — please check your connection and try again.");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          if (status) status.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "nearest" });
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
