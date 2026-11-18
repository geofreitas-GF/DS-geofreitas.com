A 40px circular button for a single icon, with a 44px hit area; `--on-media` sits over photography with a 4px white ring.

**Provide:** `<button class="gf-icon-btn" aria-label="…">` containing an inline stroke SVG (`aria-hidden="true"`, 1.5px stroke, `currentColor`).

**States:** hover moves the border to ink; pressed fills `gf-secondary-bg-pressed`; focus ring; disabled 40%.

**Do:** carousel arrows, close, share, menu toggle. **Don't:** ship it without `aria-label`; use emoji as the icon.
