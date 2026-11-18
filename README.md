# DS-geofreitas.com

Carbon structure, Apple clarity, Material token roles and Airbnb patterns for geofreitas.com and personal work. Version 1.0.0.

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
| `tokens/variables.css` | The same tokens as `--gf-*` custom properties, with dark overrides |
| `components/components.css` | All components, type and layout classes |
| `components/components.js` | Optional behaviour: tabs keyboard, switch, mobile nav, dialog |
| `docs/components.md` | Per-component specs: variants, states, accessibility, dos and don'ts, code |
| `examples/landing.html` | Reference page using every component, light and dark |
| `MIGRATION.md`, `tokens/legacy-compat.css` | Map from the archived legacy system; compat layer so legacy pages keep working |
| `scripts/check-tokens.py` | Run before any change: token parity, undefined vars, hardcoded hex, contrast |
| `assets/fonts/` | Self-hosted Poppins 400–700 |
| `assets/logos/`, `assets/imagery/` | Wordmarks, favicon, project imagery |
| `claude-design/` | The same system as published to Claude Design (the default design system): brand book, tokens in Claude's format, component previews, cover. Mirror of https://claude.ai/artifact/AuwHbJwtVnSJhxKvVq8u68 |
| `_archive/legacy/` | The pre-1.0 generator system, archived: original kits, sample pages, retired generator, old docs. Nothing here is used (see its README) |

## Changing the system

Edit `tokens/tokens.json`, mirror the change in `tokens/variables.css`, run `python3 scripts/check-tokens.py` (it must print OK), then update `DESIGN.md`, `docs/components.md` and the changelog. Version rules are in `MIGRATION.md`. There is no generator step, so nothing can overwrite the custom states.
