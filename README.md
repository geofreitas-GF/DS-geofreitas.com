# DS-geofreitas.com

Carbon structure, Apple clarity and motion, Material token roles and Airbnb patterns: one system for prototypes, products, presentations and geofreitas.com. Version 1.3.0.

## Start here

1. Read `DESIGN.md`: the single rulebook, including the five protected decisions.
2. Link `tokens/variables.css`, then `components/components.css`, then (optional) `components/components.js`.
3. Dark mode follows the OS; force it with `data-theme="dark"` or `data-theme="light"` on `<html>` or any container.
4. See every component working in `examples/landing.html`, and read `docs/components.md` for specs.

```html
<link rel="stylesheet" href="tokens/variables.css">
<link rel="stylesheet" href="components/components.css">
<a class="gf-btn gf-btn--primary" href="#">Get in touch</a>
<a class="gf-link" href="#">View case study</a>
```

## Files

| Path | Purpose |
| --- | --- |
| `DESIGN.md` | Rulebook: influences, protected decisions, colour, type, layout, components, dark mode, voice |
| `BRAND.md` | Prose brand guide with measured evidence and copy examples |
| `tokens/tokens.json` | **Source of truth.** Every value, light and dark per token |
| `tokens/variables.css` | GENERATED from `tokens.json` by `scripts/build-variables.py`: `--gf-*` properties, dark, density, contrast |
| `components/components.css` | All components, type and layout classes |
| `components/components.js` | Optional behaviour: tabs keyboard, switch, mobile nav, dialog |
| `docs/components.md` | Per-component specs: variants, states, accessibility, dos and don'ts, code |
| `examples/` | Reference pages using every component, light and dark: `landing` (site), `product` (app screen), `prototype` (dashboard), `case-study` (portfolio), `deck` (presentation) |
| `docs/writing.md` | UX writing rules for buttons, errors, empty states, toasts |
| `assets/icons/phosphor/` | Phosphor Icons (MIT) web fonts: regular, bold, fill, duotone |
| `MIGRATION.md`, `tokens/legacy-compat.css` | Map from the archived legacy system; compat layer so legacy pages keep working |
| `scripts/check-tokens.py` | Run before any change: token parity, undefined vars, hardcoded hex, contrast |
| `assets/fonts/` | Self-hosted Poppins 400–700 |
| `assets/logos/`, `assets/imagery/` | Wordmarks, favicon, project imagery |
| `claude-design/` | The same system as published to Claude Design (the default design system): brand book, tokens in Claude's format, component previews, cover. Mirror of https://claude.ai/artifact/AuwHbJwtVnSJhxKvVq8u68 |

## Changing the system

Edit `tokens/tokens.json`, run `python3 scripts/build-variables.py` then `python3 scripts/check-tokens.py` (it must print OK), then update `DESIGN.md`, `docs/components.md` and the changelog. Version rules are in `MIGRATION.md`. There is no generator step, so nothing can overwrite the custom states.
