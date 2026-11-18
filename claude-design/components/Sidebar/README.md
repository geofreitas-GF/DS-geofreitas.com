App navigation: a 264px sticky sidebar beside `.gf-app__main`, off-canvas under 820px.

**Provide:** `<div class="gf-app">` → `<aside class="gf-sidebar">` with `.gf-sidebar__item` links (icon + label; current: `aria-current="page"`, `ph-fill` icon, `gf-nav-active-bg`), `.gf-sidebar__section` + `gf-eyebrow` headings; `.gf-sidebar__toggle` (`aria-expanded`) opens it on mobile via `data-sidebar-open="true"` on `.gf-app`.
