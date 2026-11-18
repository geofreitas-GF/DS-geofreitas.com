The pill-shaped action button: primary (protected charcoal/volt hover swap) and secondary, in three sizes.

**Provide:** an `<a>` for navigation or a `<button>` for actions, with class `gf-btn` plus `gf-btn--primary` or `gf-btn--secondary`; optionally `gf-btn--sm` / `gf-btn--lg` / `gf-btn--block`. Label text is the content.

**States:** hover and pressed come from tokens (`gf-primary-bg-hover`, `gf-primary-fg-hover`, `gf-primary-bg-pressed`); focus-visible shows `gf-focus-ring`; `disabled` or `aria-disabled="true"` fades to 40%; `aria-busy="true"` hides the label and shows a spinner, keeping the width.

**Do:** one primary per view (a mobile sticky bar may repeat the page's primary); sentence-case verbs ("Start a conversation").
**Don't:** put a primary on a volt ground; re-implement the hover with `filter`, `opacity` or `!important`; use a button for in-text navigation (use `Link`).
