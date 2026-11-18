A 24px, 4px-radius label for categories and status; not interactive. No border: neutral tags use `gf-tag-fg` text, status tags show their state in the text colour (`gf-success-fg`, `gf-warning-fg`, `gf-error-fg`) on their tint. Corners stay 4px because round means clickable.

**Provide:** `<span class="gf-tag">` plus `--success`, `--warning`, `--error` or `--raggio`.

**Do:** pair every status tint with a word. `--raggio` counts as the view's one static Raggio element. **Don't:** use mid-grey fills; make tags clickable (use a button or link).
