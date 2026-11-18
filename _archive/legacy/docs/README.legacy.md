# geO freitas — DS-geofreitas.com

Carbon structure, Apple clarity and Material tokens for geofreitas.com.

> The brand says it. The experience proves it.

## Core decisions

| Decision | Value |
| --- | --- |
| Primary action | `#303030` with `#ffffff` text (13.2:1) |
| Brand highlight | `#fefa54` with `#111318` text (16.8:1). Highlight only: never a light-mode button background or light-mode text |
| Text | `#111318` primary, `#5a6275` secondary |
| Surfaces | `#ffffff` → `#f6f7f9` → `#eceef2`, hairlines `#e2e5ec` |
| Display type | Poppins 600/700 |
| Body type | Poppins 400/500 |
| Shape | 8px radius, 1px borders, 8px spacing grid, 12-column layout |
| Dark mode | Primary inverts to `#f6f7f9` with `#303030` text (12.3:1) |

## What's in the package

| Path | Purpose |
| --- | --- |
| `DESIGN.md` | The design system: palette, type, voice, imagery, layout and the full usage rules |
| `BRAND.md` | Prose brand guide with measured evidence, real copy examples and provenance |
| `SKILL.md` | Instructions for an AI agent applying this brand |
| `brand.json` | Source of truth for the generated system (colour roles, type, voice, seed) |
| `colors_and_type.css` | Drop-in colour, type, spacing and motion custom properties, with Poppins loading |
| `preview/` | HTML cards. Hand-built: `colors`, `typography`, `buttons`, `forms`, `spacing`, `deck-slide` (share `_card.css`). Generated: `brand-assets`, `colors-primary`, `colors-theme-light`, `colors-theme-dark`, `components-buttons`, `components-inputs`, `spacing-tokens`, `spacing-radius`, `spacing-shadows`, `typography-specimens` |
| `fonts/` | Self-hosted Poppins 400/500/600/700 (`fonts.css`, latin + latin-ext woff2, `manifest.json`) |
| `ui_kits/app/` | Generated starter UI kit (React components and `index.html`) |
| `context/` | Source notes, the pasted `input-DESIGN.md` and `provenance.md` |
| `system/` | Generated tokens (`tokens.*.json`, `theme.json`, `variables*.css`), component kit and sample artifacts (landing, deck, form, email, newsletter, poster) |
| `brand.html`, `guide.md` | Generated brand overview page and short guide |
| `logos/` | `wordmark-black.svg` (primary), `wordmark-white.svg`, `loading-mark.svg`, `footer-logo-black.png`, `favicon.svg`, all from geofreitas.com |
| `imagery/` | Eight listed samples (Qiddiya, Perk, Mood, Lloyds app, mobile screens, Capsula di Luna, L’Ombra d’Ogni Giorno, Findings in the City), plus two unlisted experiment images (`hero-3`, `hero-4`) |

## Using it

- **Plain CSS:** import `colors_and_type.css` and use `var(--color-accent)`, `var(--font-display)` and so on.
- **Full token set:** link `system/variables.css` for the `--brand-*` properties. Add `class="dark"` on a container for dark mode.
- **Ant Design:** pass `system/theme.json` to `ConfigProvider`.
- **Primary button text:** use `--brand-primary-contrast` (`#ffffff`). `colorPrimaryText` means "text tinted with the primary colour" and is `#303030`.
- **Highlight:** use `--brand-accent-secondary` with `--brand-accent-secondary-contrast`.

## Rebuilding

`system/` is generated from `brand.json`. After changing `brand.json`:

1. Run `od brand finalize geofreitas-2e13ed`.
2. Run `node system/scripts/apply-accessible-overrides.mjs`.

Step 2 is required. For `#303030` the generator derives failing tints (for example a `#707070` "primary background"), and it omits the on-primary and highlight tokens and the Poppins font links. The script pins the accessible values. It also re-appends the full Rules section (kept in `system/scripts/design-rules.md`) to `DESIGN.md`, because finalize regenerates `DESIGN.md` from `brand.json`. The script is safe to run repeatedly.

The core rules also live in `brand.json` under `layout.postureRules`, so they survive in `DESIGN.md` even before step 2 runs. Edit rules there or in `design-rules.md`, not in `DESIGN.md` directly.

## Fonts

Poppins 400, 500, 600 and 700 are self-hosted in `fonts/` and loaded by `colors_and_type.css`. The rebuild only self-hosts the extended-Latin subset, so the fix-up script re-adds the basic Latin faces (kept in `system/scripts/fonts-latin.css`). If the fonts can't load, text falls back to `system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif`.
