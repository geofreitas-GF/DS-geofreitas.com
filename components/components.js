/* DS-geofreitas.com — components.js v1.3 (optional, no dependencies)
   Tabs: WAI-ARIA tabs with roving tabindex, ←/→/Home/End, automatic activation.
   Switch: toggles aria-checked. Nav: mobile menu toggle. Dialog: [data-gf-open="id"] opens <dialog id>.
   v1.1: menus and popovers (native [popover] + positioning + arrow keys), tooltip Esc, GF.toast(), sidebar toggle, search clear. */
(function () {
  function initTabs(list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = tabs.length, to = null;
        if (k === 'ArrowRight') to = (i + 1) % n;
        else if (k === 'ArrowLeft') to = (i - 1 + n) % n;
        else if (k === 'Home') to = 0;
        else if (k === 'End') to = n - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
    var start = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(start < 0 ? 0 : start, false);
  }

  // ---- Menus & popovers: <button popovertarget="m1" aria-haspopup="menu" aria-expanded="false"> + <div class="gf-menu" id="m1" popover role="menu">
  function place(pop, trigger) {
    var r = trigger.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight, gap = 8;
    var left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    var top = r.bottom + gap; if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - gap);
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  function initPopover(pop) {
    var trigger = document.querySelector('[popovertarget="' + pop.id + '"]'); if (!trigger) return;
    var isMenu = pop.classList.contains('gf-menu');
    var items = function () { return Array.prototype.slice.call(pop.querySelectorAll('.gf-menu__item:not([aria-disabled="true"])')); };
    pop.addEventListener('toggle', function (e) {
      var open = e.newState === 'open'; trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { place(pop, trigger); if (isMenu && items()[0]) items()[0].focus(); } else if (pop.contains(document.activeElement) || document.activeElement === document.body) { trigger.focus(); }
    });
    if (isMenu) pop.addEventListener('keydown', function (e) {
      var list = items(), i = list.indexOf(document.activeElement), to = null;
      if (e.key === 'ArrowDown') to = (i + 1) % list.length; else if (e.key === 'ArrowUp') to = (i - 1 + list.length) % list.length;
      else if (e.key === 'Home') to = 0; else if (e.key === 'End') to = list.length - 1;
      if (to !== null) { e.preventDefault(); list[to].focus(); }
    });
    if (isMenu) pop.addEventListener('click', function (e) { if (e.target.closest('.gf-menu__item') && pop.hidePopover) pop.hidePopover(); });
    window.addEventListener('resize', function () { if (pop.matches(':popover-open')) place(pop, trigger); });
  }

  // ---- Toast
  function region() {
    var r = document.querySelector('.gf-toast-region');
    if (!r) { r = document.createElement('div'); r.className = 'gf-toast-region'; r.setAttribute('role', 'status'); r.setAttribute('aria-live', 'polite'); document.body.appendChild(r); }
    return r;
  }
  function toast(text, opts) {
    opts = opts || {}; var t = document.createElement('div'); t.className = 'gf-toast';
    var span = document.createElement('span'); span.className = 'gf-toast__text'; span.textContent = text; t.appendChild(span);
    var close = function () { t.classList.add('is-leaving'); setTimeout(function () { t.remove(); }, 200); };
    if (opts.action) { var b = document.createElement('button'); b.type = 'button'; b.className = 'gf-toast__action'; b.textContent = opts.action;
      b.addEventListener('click', function () { if (opts.onAction) opts.onAction(); close(); }); t.appendChild(b); }
    region().appendChild(t); var ms = opts.timeout || (opts.action ? 6000 : 4000); var timer = setTimeout(close, ms);
    t.addEventListener('mouseenter', function () { clearTimeout(timer); }); t.addEventListener('mouseleave', function () { timer = setTimeout(close, 2000); });
    t.addEventListener('focusin', function () { clearTimeout(timer); }); t.addEventListener('focusout', function () { timer = setTimeout(close, 2000); });
    return close;
  }


  // ---- 1.2: chips, slider, carousel, sortable/selectable tables, calendar
  function initCarousel(c) {
    var track = c.querySelector('.gf-carousel__track'), slides = Array.prototype.slice.call(c.querySelectorAll('.gf-carousel__slide'));
    var dots = Array.prototype.slice.call(c.querySelectorAll('.gf-carousel__dot'));
    var go = function (i) { i = Math.max(0, Math.min(slides.length - 1, i)); track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
    var current = function () { var x = track.scrollLeft, best = 0; slides.forEach(function (s, i) { if (Math.abs(s.offsetLeft - track.offsetLeft - x) < Math.abs(slides[best].offsetLeft - track.offsetLeft - x)) best = i; }); return best; };
    var prev = c.querySelector('.gf-carousel__prev'), next = c.querySelector('.gf-carousel__next');
    if (prev) prev.addEventListener('click', function () { go(current() - 1); });
    if (next) next.addEventListener('click', function () { go(current() + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    var sync = function () { var i = current(); dots.forEach(function (d, j) { d.setAttribute('aria-current', i === j ? 'true' : 'false'); }); };
    track.addEventListener('scroll', function () { clearTimeout(track._t); track._t = setTimeout(sync, 80); }); sync();
  }
  function initTable(table) {
    table.querySelectorAll('th[aria-sort] .gf-sort').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var th = btn.closest('th'), idx = Array.prototype.indexOf.call(th.parentNode.children, th), dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        table.querySelectorAll('th[aria-sort]').forEach(function (h) { h.setAttribute('aria-sort', 'none'); }); th.setAttribute('aria-sort', dir);
        var body = table.tBodies[0], rows = Array.prototype.slice.call(body.rows), num = th.classList.contains('gf-num');
        rows.sort(function (a, b) { var x = a.cells[idx].textContent.trim(), y = b.cells[idx].textContent.trim();
          var r = num ? (parseFloat(x.replace(/[^0-9.-]/g, '')) || 0) - (parseFloat(y.replace(/[^0-9.-]/g, '')) || 0) : x.localeCompare(y); return dir === 'ascending' ? r : -r; });
        rows.forEach(function (r) { body.appendChild(r); });
      });
    });
    var all = table.querySelector('thead .gf-select input'), boxes = Array.prototype.slice.call(table.querySelectorAll('tbody .gf-select input'));
    var update = function () { var n = 0; boxes.forEach(function (b) { b.closest('tr').setAttribute('aria-selected', b.checked ? 'true' : 'false'); if (b.checked) n++; });
      if (all) { all.checked = n === boxes.length && n > 0; all.indeterminate = n > 0 && n < boxes.length; }
      var wrap = table.closest('.gf-table-wrap'), bar = wrap && wrap.querySelector('[data-gf-selection]');
      if (bar) { bar.hidden = n === 0; var c = bar.querySelector('[data-gf-count]'); if (c) c.textContent = n + ' selected'; } };
    boxes.forEach(function (b) { b.addEventListener('change', update); });
    if (all) all.addEventListener('change', function () { boxes.forEach(function (b) { b.checked = all.checked; }); update(); });
    if (boxes.length) update();
  }

  function init(root) {
    root = root || document;
    root.querySelectorAll('.gf-tabs[role="tablist"]').forEach(initTabs);
    root.querySelectorAll('.gf-switch[role="switch"]').forEach(function (s) {
      s.addEventListener('click', function () { s.setAttribute('aria-checked', s.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); });
    });
    root.querySelectorAll('.gf-nav__toggle').forEach(function (b) {
      var nav = b.closest('.gf-nav');
      b.addEventListener('click', function () {
        var open = nav.getAttribute('data-open') === 'true';
        nav.setAttribute('data-open', open ? 'false' : 'true');
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
    root.querySelectorAll('[data-gf-open]').forEach(function (b) {
      b.addEventListener('click', function () { var d = document.getElementById(b.getAttribute('data-gf-open')); if (d && d.showModal) d.showModal(); });
    });
    /* Exits reverse entrances: play the exit, then close. Never blocks: a fallback closes after 250ms. */
    var gfClose = function (d) {
      if (!d.open || d.classList.contains('is-leaving')) return;
      d.classList.add('is-leaving');
      var done = false, fin = function () { if (done) return; done = true; d.classList.remove('is-leaving'); d.close(); };
      d.addEventListener('animationend', fin, { once: true }); setTimeout(fin, 250);
    };
    root.querySelectorAll('dialog.gf-dialog, dialog.gf-sheet').forEach(function (d) {
      d.addEventListener('cancel', function (e) { e.preventDefault(); gfClose(d); });
    });
    root.querySelectorAll('[data-gf-close]').forEach(function (b) {
      b.addEventListener('click', function () { var d = b.closest('dialog'); if (d) gfClose(d); });
    });

    root.querySelectorAll('.gf-menu[popover], .gf-popover[popover]').forEach(initPopover);
    root.querySelectorAll('[data-gf-toast]').forEach(function (b) { b.addEventListener('click', function () { toast(b.getAttribute('data-gf-toast')); }); });
    root.querySelectorAll('.gf-sidebar__toggle').forEach(function (b) {
      var app = b.closest('.gf-app'); b.addEventListener('click', function () { var o = app.getAttribute('data-sidebar-open') === 'true'; app.setAttribute('data-sidebar-open', o ? 'false' : 'true'); b.setAttribute('aria-expanded', o ? 'false' : 'true'); });
    });
    root.querySelectorAll('.gf-search').forEach(function (w) {
      var i = w.querySelector('input'), c = w.querySelector('.gf-search__clear'); if (!i || !c) return;
      c.addEventListener('click', function () { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); i.focus(); });
    });
    root.querySelectorAll('.gf-tooltip-wrap').forEach(function (w) {
      w.addEventListener('keydown', function (e) { if (e.key === 'Escape') w.setAttribute('data-dismissed', ''); });
      w.addEventListener('mouseleave', function () { w.removeAttribute('data-dismissed'); });
      w.addEventListener('focusout', function () { w.removeAttribute('data-dismissed'); });
    });
    root.querySelectorAll('.gf-chip[aria-pressed]').forEach(function (c) { c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }); });
    root.querySelectorAll('.gf-slider').forEach(function (s) { var f = function () { var p = (s.value - (s.min || 0)) / ((s.max || 100) - (s.min || 0)) * 100; s.style.setProperty('--value', p + '%'); }; s.addEventListener('input', f); f(); });
    root.querySelectorAll('.gf-carousel').forEach(initCarousel);
    root.querySelectorAll('.gf-table').forEach(initTable);
    root.querySelectorAll('.gf-calendar').forEach(function (cal) { cal.addEventListener('click', function (e) { var d = e.target.closest('.gf-day'); if (!d || d.disabled) return;
      cal.querySelectorAll('.gf-day[aria-selected="true"]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); }); d.setAttribute('aria-selected', 'true'); }); });
  }

  window.GF = { init: init, toast: toast };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
