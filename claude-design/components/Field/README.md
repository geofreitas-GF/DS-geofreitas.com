A labelled form field: `gf-input`, `gf-select` or `gf-textarea` in a `gf-field` with `gf-label` and optional `gf-help`.

**Provide:** `<div class="gf-field">` holding `<label class="gf-label" for>`, the control, and help text joined by `aria-describedby`.

**States:** border `gf-border-control` (3:1); hover turns ink; focus = ink border + 2px ring (volt in dark); `aria-invalid="true"` sets `gf-error-solid` border and `.gf-help--error` prefixes "Error:"; disabled and readonly use `gf-bg-layer-1`.

**Do:** labels above fields at 14/500 secondary; `autocomplete` on name and email. **Don't:** use placeholder as the label; signal errors by colour alone.
