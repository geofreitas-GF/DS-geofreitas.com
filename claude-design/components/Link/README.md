The editorial text link with the protected animated underline: 1px, draws left to right on hover, retracts right to left (260ms).

**Provide:** `<a class="gf-link" href="…">`; `aria-current="page"` keeps the underline drawn for the current nav item. For links inside paragraphs, wrap the text in `.gf-prose` (static underline).

**Do:** nav, footer, "Download CV", secondary text actions. **Don't:** lighten the link on hover; change the underline speed, thickness or direction.
