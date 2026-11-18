An on/off toggle for instant settings: `<button role="switch" aria-checked>` with a 44×24 track.

**Provide:** `<button class="gf-switch" type="button" role="switch" aria-checked="false"><span class="gf-switch__track" aria-hidden="true"></span>Label</button>`; your code flips `aria-checked` on click.

**States:** off `gf-control-off` track; on `gf-control-on` (charcoal light, Raggio dark) with `gf-control-mark` knob; focus ring; disabled 40%.

**Don't:** use inside a form that needs submit (use `Checkbox`).
