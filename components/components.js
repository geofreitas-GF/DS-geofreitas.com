/* DS-geofreitas.com — components.js v1.7 (optional, no dependencies)
   Tabs: WAI-ARIA tabs with roving tabindex, ←/→/Home/End, automatic activation.
   Switch: toggles aria-checked. Nav: mobile menu toggle. Dialog: [data-gf-open="id"] opens <dialog id>.
   v1.7: show more (expand, moves focus into the reveal), multi select (roving rows, per-row "only"), gauge (SVG ring, auto tone from value).
   v1.6: combobox (filter, arrows, Enter, Esc), theme switcher (system/light/dark, remembered, logo swap), copy, video (pause control, no autoplay under Reduce Motion), input clear.
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

  /* ---- 1.6: combobox, theme switcher, copy, video, input clear ---- */
  function initCombobox(cb) {
    var input = cb.querySelector('[role="combobox"]'), list = cb.querySelector('[role="listbox"]');
    if (!input || !list) return;
    var toggle = cb.querySelector('.gf-combobox__toggle'), empty = cb.querySelector('.gf-combobox__empty');
    var opts = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
    var status = document.createElement('span'); status.className = 'gf-visually-hidden'; status.setAttribute('aria-live', 'polite'); cb.appendChild(status);
    var committed = input.value;
    opts.forEach(function (o, i) { if (!o.id) o.id = (list.id || 'gf-cb') + '-o' + i; if (!o.hasAttribute('aria-selected')) o.setAttribute('aria-selected', 'false'); });
    var isOpen = function () { return cb.getAttribute('data-open') === 'true'; };
    var visible = function () { return opts.filter(function (o) { return !o.hidden; }); };
    var setActive = function (o) {
      opts.forEach(function (x) { x.classList.remove('is-active'); });
      if (o) { o.classList.add('is-active'); input.setAttribute('aria-activedescendant', o.id); o.scrollIntoView({ block: 'nearest' }); }
      else input.removeAttribute('aria-activedescendant');
    };
    var reset = function () { opts.forEach(function (x) { x.hidden = false; }); if (empty) empty.hidden = true; };
    var open = function () {
      if (isOpen()) return;
      list.hidden = false; cb.setAttribute('data-open', 'true'); input.setAttribute('aria-expanded', 'true');
      setActive(opts.filter(function (o) { return o.getAttribute('aria-selected') === 'true' && !o.hidden; })[0] || null);
    };
    var close = function () { list.hidden = true; cb.setAttribute('data-open', 'false'); input.setAttribute('aria-expanded', 'false'); setActive(null); };
    var filter = function () {
      var q = input.value.trim().toLowerCase(), n = 0;
      opts.forEach(function (o) { var hit = !q || o.textContent.toLowerCase().indexOf(q) > -1; o.hidden = !hit; if (hit) n++; });
      if (empty) empty.hidden = n > 0;
      status.textContent = n ? n + (n === 1 ? ' result' : ' results') : 'No results';
      setActive(visible()[0] || null);
    };
    var pick = function (o) {
      opts.forEach(function (x) { x.setAttribute('aria-selected', 'false'); }); o.setAttribute('aria-selected', 'true');
      input.value = o.textContent.trim(); committed = input.value; reset(); close();
      cb.dispatchEvent(new CustomEvent('gf-change', { bubbles: true, detail: { value: o.getAttribute('data-value') || input.value } }));
    };
    input.addEventListener('focus', function () { open(); });
    input.addEventListener('click', open);
    input.addEventListener('input', function () { open(); filter(); });
    input.addEventListener('keydown', function (e) {
      var v = visible(), cur = list.querySelector('.is-active'), i = v.indexOf(cur);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen()) { open(); return; } setActive(v[Math.min(i + 1, v.length - 1)] || null); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (!isOpen()) { open(); return; } setActive(v[Math.max(i - 1, 0)] || null); }
      else if (e.key === 'Enter') { if (isOpen() && cur) { e.preventDefault(); pick(cur); } }
      else if (e.key === 'Escape') { if (isOpen()) { e.preventDefault(); input.value = committed; reset(); close(); } }
      else if (e.key === 'Tab') { close(); }
    });
    list.addEventListener('mousedown', function (e) { e.preventDefault(); });
    list.addEventListener('click', function (e) { var o = e.target.closest('[role="option"]'); if (o) pick(o); });
    list.addEventListener('mousemove', function (e) { var o = e.target.closest('[role="option"]'); if (o && !o.classList.contains('is-active')) setActive(o); });
    if (toggle) { toggle.addEventListener('mousedown', function (e) { e.preventDefault(); }); toggle.addEventListener('click', function () { if (isOpen()) close(); else { input.focus(); open(); } }); }
    input.addEventListener('blur', function () { setTimeout(function () { if (!cb.contains(document.activeElement)) { input.value = committed; reset(); close(); } }, 0); });
  }

  /* Theme: "system" (follow the OS), "light" or "dark", remembered per visitor. Logos: <img data-gf-logo-dark="…"> swaps. */
  var THEME_KEY = 'gf-theme';
  function applyTheme(mode) {
    var r = document.documentElement;
    if (mode === 'light' || mode === 'dark') r.setAttribute('data-theme', mode); else r.removeAttribute('data-theme');
    var dark = mode === 'dark' || (mode !== 'light' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelectorAll('img[data-gf-logo-dark]').forEach(function (img) {
      if (!img.getAttribute('data-gf-logo-light')) img.setAttribute('data-gf-logo-light', img.getAttribute('src'));
      img.setAttribute('src', dark ? img.getAttribute('data-gf-logo-dark') : img.getAttribute('data-gf-logo-light'));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(r).getPropertyValue('--gf-bg-canvas').trim() || (dark ? '#141414' : '#ffffff'));
  }
  function storedTheme() { try { return localStorage.getItem(THEME_KEY) || 'system'; } catch (e) { return 'system'; } }
  function initThemeSwitch(sw) {
    var mode = storedTheme(), radios = sw.querySelectorAll('input[type="radio"]');
    radios.forEach(function (r) {
      r.checked = r.value === mode;
      r.addEventListener('change', function () { if (!r.checked) return; try { localStorage.setItem(THEME_KEY, r.value); } catch (e) {} applyTheme(r.value); });
    });
  }

  /* Copy: [data-gf-copy="text"], or empty inside .gf-copytext to copy its value. Confirms for 2s and announces it. */
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise(function (res, rej) {
      var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} a.remove(); ok ? res() : rej();
    });
  }
  function initCopy(b) {
    var label = b.getAttribute('aria-label');
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-gf-copy'), wrap = b.closest('.gf-copytext');
      if (!t && wrap) { var v = wrap.querySelector('.gf-copytext__value'); t = v ? v.textContent.trim() : ''; }
      copyText(t).then(function () {
        b.setAttribute('data-copied', 'true'); if (label) b.setAttribute('aria-label', 'Copied');
        var live = region(), s = document.createElement('span'); s.className = 'gf-visually-hidden'; s.textContent = 'Copied to clipboard'; live.appendChild(s); setTimeout(function () { s.remove(); }, 1500);
        clearTimeout(b._gfT); b._gfT = setTimeout(function () { b.removeAttribute('data-copied'); if (label) b.setAttribute('aria-label', label); }, 2000);
      }, function () { toast('Copy failed. Select the text and copy it instead.'); });
    });
  }

  /* Video: autoplays muted only with [data-gf-autoplay] and never under Reduce Motion; the toggle pauses and plays. */
  function initVideo(f) {
    var v = f.querySelector('video'), b = f.querySelector('.gf-video__toggle'); if (!v) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sync = function () {
      if (!b) return; var playing = !v.paused;
      b.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
      var i = b.querySelector('i'); if (i) i.className = 'ph-fill ' + (playing ? 'ph-pause' : 'ph-play') + ' gf-icon';
    };
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if (b) b.addEventListener('click', function () { if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    if (v.hasAttribute('data-gf-autoplay') && !reduce) { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    sync();
  }

  /* ---- 1.7: show more, multi select, gauge ---- */
  function initShowMore(sm) {
    var trigger = sm.querySelector('.gf-showmore__trigger'), list = sm.querySelector('.gf-showmore__list'); if (!trigger || !list) return;
    if (!list.id) list.id = 'gf-sm-' + Math.random().toString(36).slice(2, 8);
    trigger.setAttribute('aria-controls', list.id);
    var hidden = Math.max(0, list.children.length - 5);
    if (hidden <= 0) { sm.hidden = true; return; }
    var moreLabel = trigger.getAttribute('data-gf-more') || ('Show ' + hidden + ' more'), lessLabel = trigger.getAttribute('data-gf-less') || 'Show less';
    var text = trigger.querySelector('.gf-showmore__text');
    var sync = function () {
      var collapsed = list.getAttribute('data-collapsed') !== 'false';
      trigger.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      if (text) text.textContent = collapsed ? moreLabel : lessLabel;
    };
    list.setAttribute('data-collapsed', 'true');
    trigger.addEventListener('click', function () {
      var collapsed = list.getAttribute('data-collapsed') !== 'false';
      list.setAttribute('data-collapsed', collapsed ? 'false' : 'true'); sync();
      if (collapsed) { var row = list.children[5]; if (row) { var f = row.querySelector('a,button,[tabindex]'); if (!f) { row.setAttribute('tabindex', '-1'); f = row; } if (f.focus) f.focus(); } }
    });
    sync();
  }

  function initMultiSelect(ms) {
    var trigger = ms.querySelector('.gf-multiselect__trigger'), list = ms.querySelector('.gf-multiselect__list'); if (!trigger || !list) return;
    var rows = Array.prototype.slice.call(list.querySelectorAll('.gf-multiselect__row'));
    var summaryEl = trigger.querySelector('.gf-multiselect__summary');
    var allLabel = ms.getAttribute('data-gf-all-label') || 'All selected', noneLabel = ms.getAttribute('data-gf-none-label') || 'None selected';
    var checks = function () { return rows.map(function (r) { return r.querySelector('input[type="checkbox"]'); }); };
    var summarize = function () {
      var cb = checks(), picked = cb.filter(function (c) { return c.checked; }), n = picked.length;
      var txt = n === 0 ? noneLabel : n === cb.length ? allLabel : n === 1 ? picked[0].closest('.gf-multiselect__row').querySelector('.gf-multiselect__label').textContent.trim() : n + ' selected';
      if (summaryEl) summaryEl.textContent = txt;
      ms.dispatchEvent(new CustomEvent('gf-change', { bubbles: true, detail: { values: picked.map(function (c) { return c.value; }) } }));
    };
    var isOpen = function () { return ms.getAttribute('data-open') === 'true'; };
    var open = function () { if (isOpen()) return; list.hidden = false; ms.setAttribute('data-open', 'true'); trigger.setAttribute('aria-expanded', 'true'); place(list, trigger); var first = rows[0]; if (first) first.focus(); };
    var close = function (focusBack) { list.hidden = true; ms.setAttribute('data-open', 'false'); trigger.setAttribute('aria-expanded', 'false'); if (focusBack) trigger.focus(); };
    trigger.addEventListener('click', function () { if (isOpen()) close(true); else open(); });
    trigger.addEventListener('keydown', function (e) { if (!isOpen() && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); } });
    var toggleRow = function (row) { var cb = row.querySelector('input[type="checkbox"]'); cb.checked = !cb.checked; row.setAttribute('aria-selected', cb.checked ? 'true' : 'false'); summarize(); };
    rows.forEach(function (row) {
      row.setAttribute('tabindex', '-1');
      row.addEventListener('click', function (e) { if (e.target.closest('.gf-multiselect__action')) return; toggleRow(row); });
      row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRow(row); } });
      var action = row.querySelector('.gf-multiselect__action');
      if (action) action.addEventListener('click', function (e) {
        e.stopPropagation();
        rows.forEach(function (r) { var cb = r.querySelector('input[type="checkbox"]'); cb.checked = (r === row); r.setAttribute('aria-selected', cb.checked ? 'true' : 'false'); });
        summarize();
      });
    });
    list.addEventListener('keydown', function (e) {
      var i = rows.indexOf(document.activeElement), to = null;
      if (e.key === 'ArrowDown') to = Math.min(rows.length - 1, i + 1);
      else if (e.key === 'ArrowUp') to = Math.max(0, i - 1);
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = rows.length - 1;
      else if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
      else if (e.key === 'Tab') { close(false); return; }
      if (to !== null) { e.preventDefault(); rows.forEach(function (r) { r.classList.remove('is-active'); }); rows[to].classList.add('is-active'); rows[to].focus(); }
    });
    document.addEventListener('click', function (e) { if (isOpen() && !ms.contains(e.target)) close(false); });
    window.addEventListener('resize', function () { if (isOpen()) place(list, trigger); });
    summarize();
  }

  /* Gauge: value drives --gauge-offset and the centred number; tone defaults from warning/danger thresholds unless data-tone is set by hand. */
  function initGauge(g) {
    var C = 100.53;
    var sync = function () {
      var valEl = g.querySelector('.gf-gauge__value'), now = g.getAttribute('aria-valuenow');
      if (g.classList.contains('gf-gauge--indeterminate') || now === null) { g.style.removeProperty('--gauge-offset'); if (valEl) valEl.textContent = ''; return; }
      var min = parseFloat(g.getAttribute('aria-valuemin')) || 0, max = parseFloat(g.getAttribute('aria-valuemax')) || 100;
      var v = Math.max(min, Math.min(max, parseFloat(now))), pct = max > min ? (v - min) / (max - min) : 0;
      g.style.setProperty('--gauge-offset', (C * (1 - pct)).toFixed(2));
      if (valEl) valEl.textContent = Math.round(pct * 100);
      if (!g.hasAttribute('data-tone')) {
        var warn = parseFloat(g.getAttribute('data-gf-warning')); if (isNaN(warn)) warn = 80;
        var danger = parseFloat(g.getAttribute('data-gf-danger')); if (isNaN(danger)) danger = 95;
        var p100 = pct * 100;
        g.setAttribute('data-tone', p100 >= danger ? 'danger' : p100 >= warn ? 'warning' : 'normal');
      }
    };
    sync();
    new MutationObserver(sync).observe(g, { attributes: true, attributeFilter: ['aria-valuenow'] });
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
    root.querySelectorAll('.gf-combobox').forEach(initCombobox);
    root.querySelectorAll('.gf-theme-switch').forEach(initThemeSwitch);
    root.querySelectorAll('[data-gf-copy]').forEach(initCopy);
    root.querySelectorAll('.gf-video').forEach(initVideo);
    root.querySelectorAll('.gf-input-group__clear').forEach(function (c) { var i = c.closest('.gf-input-group').querySelector('input'); if (!i) return;
      c.addEventListener('click', function () { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); i.focus(); }); });
    root.querySelectorAll('.gf-calendar').forEach(function (cal) { cal.addEventListener('click', function (e) { var d = e.target.closest('.gf-day'); if (!d || d.disabled) return;
      cal.querySelectorAll('.gf-day[aria-selected="true"]').forEach(function (x) { x.setAttribute('aria-selected', 'false'); }); d.setAttribute('aria-selected', 'true'); }); });
    root.querySelectorAll('.gf-showmore').forEach(initShowMore);
    root.querySelectorAll('.gf-multiselect').forEach(initMultiSelect);
    root.querySelectorAll('.gf-gauge').forEach(initGauge);
  }

  applyTheme(storedTheme());
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (storedTheme() === 'system') applyTheme('system'); });
  window.GF = { init: init, toast: toast, theme: applyTheme, copy: copyText };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
