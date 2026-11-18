The sticky 72px site navigation: wordmark left, `gf-link` items and one small primary right, collapsing behind a menu button under 820px.

**Provide:** `<header class="gf-nav">` → `.gf-container.gf-nav__inner` with the logo (`wordmark-black.svg` on light, `wordmark-white.svg` on dark), `<nav>` holding `ul.gf-nav__links`, and `.gf-nav__toggle` (`aria-expanded`, `aria-controls`); set `data-open="true"` on `.gf-nav` to show the mobile menu. Put a `.gf-skip` link ("Skip to content") first in `<body>`.

**Do:** mark the current page with `aria-current="page"`. **Don't:** add more than one primary.
