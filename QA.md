# QA protocol

A release is not done when `components.css`/`tokens.json` looks right in the
cloud workspace. It is done when every surface that serves it — the repo,
the Claude Design System artifact, the Showcase canvas, the Homepage canvas
— has been checked against the same gates, every time, not just when
something looks wrong in a screenshot.

This exists because four separate bugs shipped in one session before being
caught: a missing Phosphor import, a stale dark-theme focus colour, native
(unstyled) checkboxes on Multi select and Entity, and missing
`--gf-font-display`/`--gf-font-body`/`--gf-gauge-*`/`--gf-media-btn-*`
tokens on three independent mirrors. Every one of them was invisible in the
code review — a `var()` referencing an undefined custom property doesn't
error, it silently falls back (serif font, collapsed size, no colour) — and
was only found because a screenshot happened to show it. The gates below
make that kind of bug fail loudly, before publish, instead of being found
by eye after.

## Why this is gated, not just reviewed

The repo is the only source of truth. The DS artifact, the Showcase canvas
and the Homepage canvas are three independent, hand-copied mirrors with no
live link to the repo or to each other — nothing regenerates them, nothing
diffs them against the source automatically. Every mismatch found in this
project traces to that: a mirror drifting out of sync with no mechanism to
notice. The gates exist to be the mechanism.

## The gates

Run in order. A failed gate stops the release — fix it and re-run from
Gate 1, never publish a partial pass.

### Gate 0 — repo build checks (already existed; keep running them)

```
python3 scripts/check-tokens.py          # token parity, no undefined vars, no hardcoded hex, contrast
node -c components/components.js         # JS syntax
```

### Gate 1 — mirror token parity

A mirror's `tokens.css` must define every custom property `components.css`
references. Fetch the mirror's current `tokens.css` to a local scratch
path (it lives in an artifact, not this repo, so it has to be read first),
then:

```
python3 scripts/check-mirror-parity.py /tmp/mirror-ds-artifact/tokens.css \
                                        /tmp/mirror-showcase/tokens.css \
                                        /tmp/mirror-homepage/tokens.css
```

Exits 1 and names every missing `--gf-*` name if any mirror is behind.
This alone would have caught the font, gauge and media-button gaps.

### Gate 2 — rendered-state check

Renders a fixed battery of states (heading, body text, a focused input, an
invalid input, a checked checkbox, a Multi select row, a Gauge, the Video
overlay button) against the *actual* mirror's `tokens.css` + `bundle.css` —
not the repo's own `variables.css`, the literal file being shipped to that
surface — in both themes, and checks:

- `font-family-fallback` — headings/body must compute to Poppins, never a
  browser serif/system default (the signature of an undefined
  `--gf-font-display`/`--gf-font-body`)
- `zero-size` — a fixed-size component (currently: Gauge) must render at
  its documented pixel size, not 0 and not an unconstrained auto-size
  either (an undefined size var on this component's markup stretches to
  fill its container rather than collapsing — a flattened oval, not an
  invisible element)
- `native-checkbox` — a restyled checkbox (`.gf-check`,
  `.gf-multiselect__check`, the Entity selectable row) must have
  `appearance: none` applied, never the bare native control
- `broken-image` — when `--image-base` is given a real asset URL, it must
  actually load (`naturalWidth > 0`)
- `console-error` — no genuine script-level console errors (resource 404s
  for assets this isolated harness doesn't carry, like fonts/icons, are
  excluded — those are a packaging concern Gate 1 and a manual load check
  already cover, not a CSS-correctness one)

```
python3 scripts/qa-render.py /tmp/mirror-showcase/tokens.css \
                              /tmp/mirror-showcase/bundle.css \
                              --out /tmp/qa-showcase \
                              --image-base "https://claude.ai/artifact/<slug>/_blob/<id>"
```

Look at the screenshots it prints the path to, too — the script catches
what's checkable by computed style and box geometry; it is not a
replacement for looking at the result, only for having to be the one who
notices first.

### Gate 3 — cross-surface diff against ground truth

`examples/forms.html` in the repo is the confirmed-correct reference (the
user's own words: "the file ... is correct, only the ones on components
are showing different and wrong"). For any component whose focus/error/
hover treatment changed, diff the computed `border-color` and `box-shadow`
of the real rendering against each static board's hand-typed CSS for the
same state. Exact match required for solid colours; halo `rgba()` values
compared channel-by-channel, not eyeballed — this is what caught the
light-theme focus halo being a solid 2px `#303030` instead of a soft 3px
`rgba(22,22,22,0.10)`, a difference easy to wave past by eye.

### Gate 4 — publish, in one pass

Only after Gates 0–3 pass: republish `bundle.css` to the DS artifact, the
Showcase canvas and the Homepage canvas; add anything Gate 1 found to all
three `tokens.css` mirrors (not just the one that happened to get
screenshotted); bump `designSystems[0].version` in both canvases'
`canvas.json`; mirror `components.css`/`tokens.json`/`variables.css` into
the repo; commit and tag only if the change is to `components.css`/
`tokens.json` itself — a mirror-only fix (missing token, stale value) is
not a release and gets no version bump, because the repo was never wrong.

## What this doesn't cover yet

- The four static snapshot boards (`Components.dc.html`, `Dark.dc.html`,
  `Complete.dc.html`, `Patterns.dc.html`) are hand-typed CSS with no link
  to `tokens.css`/`bundle.css` at all, so Gate 1/2 can't check them
  automatically — only Gate 3's manual diff catches drift there. If these
  get rebuilt to consume the live bundle (an open question, not decided),
  Gates 1 and 2 would cover them for free.
- Asset-store health (whether an uploaded blob is still live, as opposed
  to whether the reference to it is correctly formed) has no automated
  check — Gate 2's `broken-image` check proves a *given* URL loads, but
  nothing walks every asset reference in every `preview.html`/board and
  checks it. Worth adding if another blob goes dark.
