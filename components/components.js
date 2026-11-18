/* DS-geofreitas.com — components.js v1.0 (optional, no dependencies)
   Tabs: WAI-ARIA tabs with roving tabindex, ←/→/Home/End, automatic activation.
   Switch: toggles aria-checked. Nav: mobile menu toggle. Dialog: [data-gf-open="id"] opens <dialog id>. */
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
    root.querySelectorAll('[data-gf-close]').forEach(function (b) {
      b.addEventListener('click', function () { var d = b.closest('dialog'); if (d) d.close(); });
    });
  }
  window.GF = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
