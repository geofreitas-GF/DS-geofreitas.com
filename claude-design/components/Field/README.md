A labelled form field: `gf-input`, `gf-select` or `gf-textarea` in a `gf-field` with `gf-label` and optional `gf-help`.

**Provide:** `<div class="gf-field">` holding `<label class="gf-label" for>`, the control, and help text joined by `aria-describedby`.

**States:** border `gf-border-control` (3:1); hover turns ink; focus = ink border (white in dark) + soft 3px `gf-focus-halo`, no Raggio ring on fields; invalid + focus keeps the red border with `gf-error-halo`; under 600px the text is 16px so phones never zoom; `aria-invalid="true"` sets `gf-error-solid` border and `.gf-help--error` prefixes "Error:"; disabled and readonly use `gf-bg-layer-1`.

**Do:** labels above fields at 14/500 secondary; `autocomplete` on name and email. **Don't:** use placeholder as the label; signal errors by colour alone.
