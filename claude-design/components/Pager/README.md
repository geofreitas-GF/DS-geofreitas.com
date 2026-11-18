Previous / next links at the end of a case study, article or docs page.

**Provide:** `<nav class="gf-pager" aria-label="More projects">` holding up to two real links: `.gf-pager__link--prev` and `.gf-pager__link--next`, each with `.gf-pager__label` ("Previous" / "Next"), `.gf-pager__title` and a `ph-bold ph-caret-left` / `ph-caret-right` icon with `.gf-pager__icon`.

**States:** the title draws the editorial underline on hover and focus-visible (260ms, `gf-ease-draw`); focus-visible adds the 2px ring. Hit area 44px+. Under 600px the two links stack; Next stays right-aligned.

**Do:** use real project titles; leave a side out on the first or last item. **Don't:** use it for numbered lists (use Pagination) or put buttons inside.
