/* AgniLift — shared behaviour. No dependencies. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile navigation ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  var scrim = document.getElementById("scrim");

  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("open", open);
    if (scrim) scrim.classList.toggle("show", open);
    document.body.classList.toggle("lock", open);
    if (open) { var a = menu.querySelector("a"); if (a) a.focus(); }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setMenu(false); burger.focus(); }
    });
    var mq = window.matchMedia("(min-width: 981px)");
    var onMq = function (ev) { if (ev.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener("change", onMq); else mq.addListener(onMq);
  }

  /* ---------- sticky header + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var bar = document.getElementById("progress");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("stuck", y > 12);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var targets = document.querySelectorAll(".rv, .panel");
  if (!reduced && "IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- contact form (Web3Forms) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    function say(kind, html) {
      if (!status) return;
      status.className = "fstatus show " + kind;
      status.setAttribute("role", kind === "err" ? "alert" : "status");
      status.innerHTML = html;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      say("info", "Sending your enquiry…");
      fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { Accept: "application/json" }, body: new FormData(form)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, data: j }; }); })
        .then(function (res) {
          if (res.ok && res.data && res.data.success) {
            form.reset();
            say("ok", "Thank you — your enquiry has been sent. We'll reply by email.");
          } else {
            var m = (res.data && res.data.message) ? res.data.message : "Something went wrong.";
            say("err", "Sorry, we couldn't send that (" + m + "). Please try again shortly.");
          }
        })
        .catch(function () { say("err", "Network error — please check your connection and try again."); })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          if (status) status.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
        });
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
