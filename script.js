/* ============================================================
   PIVOT BUSINESS SOLUTIONS — interactions (vanilla, no deps)
   theme toggle · nav-over-hero · scroll reveals · counters
   · mobile menu · quote form. Respects reduced motion.
   ============================================================ */
(function () {
  'use strict';
  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document.documentElement;

  /* ---- theme toggle ---- */
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = doc.getAttribute('data-theme');
      if (!cur) cur = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('pivot-theme', next); } catch (e) {}
    });
  }

  /* ---- nav state (transparent white over hero, solid past it) + progress ---- */
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');
  var progress = document.querySelector('[data-progress]');
  var NAVH = 74;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var threshold = (hero ? hero.offsetHeight : 480) - NAVH - 40;
    var overHero = hero ? y < threshold : false;
    document.body.classList.toggle('hero-active', overHero);
    if (nav) nav.classList.toggle('scrolled', !overHero);
    if (progress) {
      var max = doc.scrollHeight - doc.clientHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ---- reveals + counters ---- */
  function reveal(scope, stagger) {
    var items = scope.querySelectorAll('[data-a]');
    for (var i = 0; i < items.length; i++) {
      if (!REDUCE && stagger) items[i].style.transitionDelay = (i * 70) + 'ms';
      items[i].classList.add('in');
    }
  }
  function count(scope) {
    var nums = scope.querySelectorAll('[data-count]');
    for (var i = 0; i < nums.length; i++) {
      (function (el) {
        if (el.dataset.done) return; el.dataset.done = '1';
        var to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
        if (REDUCE) { el.textContent = to + suf; return; }
        var start = null, dur = 1400;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * eased) + suf;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })(nums[i]);
    }
  }

  // hero reveals on load (not a [data-reveal] section)
  if (hero) reveal(hero, true);

  var sections = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    for (var s = 0; s < sections.length; s++) { reveal(sections[s], false); count(sections[s]); }
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target, true); count(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    for (var k = 0; k < sections.length; k++) io.observe(sections[k]);
  }

  /* ---- quote form → mailto ---- */
  var form = document.getElementById('quoteForm');
  if (form) {
    var status = form.querySelector('[data-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var who = form.who.value;
      var details = form.details.value.trim();
      var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      var ok = true;
      form.name.classList.toggle('invalid', !name); if (!name) ok = false;
      form.email.classList.toggle('invalid', !emailOk); if (!emailOk) ok = false;
      if (!ok) { status.textContent = 'Please add your name and a valid email address.'; status.classList.add('is-error'); return; }
      status.classList.remove('is-error');
      status.textContent = 'Opening your email app with the details filled in…';
      var subject = encodeURIComponent('Consult request — ' + who);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nI am a: ' + who + '\n\n' + (details || 'Where I am right now: '));
      window.location.href = 'mailto:hello@pivotbusinesssolutions.com?subject=' + subject + '&body=' + body;
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
