/* =====================================================================
   PIVOT BUSINESS SOLUTIONS — CONCOURSE DEPARTURE BOARD
   Vanilla, no dependencies, no build.

   Motion in this hall is one idea: a board setting itself. Character
   cells flip down from the hinge, left to right, and the rows land
   behind them. That happens once, on the first screen, and nothing
   else on the site moves.

   Nothing here is required to read the page. The cell markup is added
   by this file and styled only under html.js, so a visitor whose JS
   never runs gets the same words in the same order, as tracked caps.
   ===================================================================== */
(() => {
  'use strict';

  const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. the flaps: split board text into fixed character cells ---- */
  const splitToCells = (el) => {
    const lines = el.innerHTML.split(/<br\s*\/?>/i);
    const frag = document.createDocumentFragment();
    let index = 0;

    lines.forEach((line) => {
      // Read the line as text, not markup: entities decode, tags do not run.
      const probe = document.createElement('div');
      probe.innerHTML = line;
      const text = (probe.textContent || '').trim();
      if (!text) return;

      const row = document.createElement('span');
      row.className = 'ln';

      for (const ch of text) {
        const cell = document.createElement('span');
        cell.className = ch === ' ' ? 'cell sp' : 'cell';
        cell.style.setProperty('--d', Math.min(index * 16, 760) + 'ms');
        const glyph = document.createElement('span');
        glyph.textContent = ch === ' ' ? ' ' : ch;
        cell.appendChild(glyph);
        row.appendChild(cell);
        index++;
      }
      frag.appendChild(row);
    });

    if (!frag.childNodes.length) return 0;
    el.textContent = '';
    el.appendChild(frag);
    return index;
  };

  const boards = document.querySelectorAll('[data-flap]');
  let cellCount = 0;
  boards.forEach((el) => { cellCount = Math.max(cellCount, splitToCells(el)); });

  /* ---- 2. the rows land after the flaps have set ---- */
  const tables = document.querySelectorAll('.board[data-set]');
  tables.forEach((table) => {
    const lead = Math.min(cellCount * 16, 760) * 0.65;
    table.querySelectorAll('tbody tr').forEach((tr, i) => {
      tr.style.setProperty('--d', Math.round(lead + i * 70) + 'ms');
    });
  });

  const run = () => {
    boards.forEach((el) => el.classList.add('set'));
    tables.forEach((el) => el.classList.add('set'));
  };
  if (REDUCE) run();
  else requestAnimationFrame(() => requestAnimationFrame(run));

  /* ---- 3. the route list on narrow frames ---- */
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
        status.textContent = 'Add your name and an email address I can reply to.';
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
