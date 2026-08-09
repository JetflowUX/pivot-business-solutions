/* ============================================================
   PIVOT BUSINESS SOLUTIONS — AZULEJO STATION HALL
   Vanilla, no dependencies, no build.

   Motion in this hall is one idea: glaze flooding line work in the kiln.
   Panels do not slide or bounce; their ink washes in from the top edge.
   Nothing is hidden from a visitor whose JS never runs — the wash styles
   are scoped to .js, which the inline head partner of this file sets.
   ============================================================ */
(() => {
  'use strict';

  const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---- 1. kiln: light glaze / dark glaze, remembered ---- */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      let current = root.getAttribute('data-theme');
      if (!current) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        current = prefersDark ? 'dark' : 'light';
      }
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      themeBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to the light glaze' : 'Switch to the dark glaze');
      try { localStorage.setItem('pivot-theme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ---- 2. the route list on narrow frames ---- */
  const routeToggle = document.getElementById('routeToggle');
  const mobileRoutes = document.getElementById('mobileRoutes');
  if (routeToggle && mobileRoutes) {
    const setOpen = (open) => {
      mobileRoutes.classList.toggle('open', open);
      routeToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      routeToggle.setAttribute('aria-label', open ? 'Close the route list' : 'Open the route list');
    };
    routeToggle.addEventListener('click', () => {
      setOpen(!mobileRoutes.classList.contains('open'));
    });
    mobileRoutes.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileRoutes.classList.contains('open')) {
        setOpen(false);
        routeToggle.focus();
      }
    });
  }

  /* ---- 3. the glaze wash ---- */
  const washables = document.querySelectorAll('[data-a]');
  const flood = (el, delay) => {
    if (!REDUCE && delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add('in');
  };

  if (!('IntersectionObserver' in window) || REDUCE) {
    washables.forEach((el) => flood(el, 0));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target.parentElement || document.body;
        const siblings = group.querySelectorAll(':scope > [data-a]');
        const index = Array.prototype.indexOf.call(siblings, entry.target);
        flood(entry.target, Math.max(0, index) * 80);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    washables.forEach((el) => io.observe(el));
  }

  /* ---- 4. the consult request → the visitor's own mail client ---- */
  /* PLACEHOLDER: swap this address for the practice's real one.
     It also appears in the contact panel and the footer of every page. */
  const CONSULT_ADDRESS = 'hello@pivotbusinesssolutions.com';

  const form = document.getElementById('consultForm');
  if (form) {
    const status = form.querySelector('[data-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const who = form.who.value;
      const details = form.details.value.trim();
      const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

      form.name.classList.toggle('invalid', !name);
      form.email.classList.toggle('invalid', !emailOk);

      if (!name || !emailOk) {
        status.textContent = 'Please add your name and an email address I can reply to.';
        status.classList.add('is-error');
        (name ? form.email : form.name).focus();
        return;
      }

      status.classList.remove('is-error');
      status.textContent = 'Opening your email app with the details filled in…';

      const subject = encodeURIComponent(`Consult request — ${who}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `I am a: ${who}\n\n` +
        (details || 'Where I am right now: ')
      );
      window.location.href = `mailto:${CONSULT_ADDRESS}?subject=${subject}&body=${body}`;
    });
  }

  /* ---- 5. the year in the footer ---- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
