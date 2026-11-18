A one-line label for an icon-only control, on hover and focus after 400ms.

**Provide:** `<span class="gf-tooltip-wrap">` around the control and `<span class="gf-tooltip" role="tooltip" id>`, joined by `aria-describedby`; `--below` flips it. Esc hides it (WCAG 1.4.13; your code).

**Don't:** put links or essential information inside it.
