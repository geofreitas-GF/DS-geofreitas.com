---
name: "DS-geofreitas.com"
version: "1.0.0"
surface: web
source_of_truth: tokens/tokens.json
---

# DS-geofreitas.com

*The brand says it. The experience proves it.*

Carbon structure, Apple clarity, Material token roles, Airbnb patterns. One rulebook: if this file, the tokens and the kits ever disagree, `tokens/tokens.json` wins and this file is corrected.

## 1. What each influence contributes

| Source | Takes | Never takes |
| --- | --- | --- |
| IBM Carbon | 12-column grid, 8px spacing scale, 1px hairlines, status-tag pastels, tonal layering | Square-corner buttons, IBM Plex |
| Apple | Editorial restraint, 35–40% whitespace, type-led hierarchy, low chrome | SF Pro, system blur materials |
| Google Material / antd | Token roles (bg, text, border, action, state), light/dark per token | Material colour palette, elevation shadows on cards |
| Airbnb | Photo-first 4:3 cards, sticky floating action panel, circular icon buttons, underline tabs, dense metadata stacks, a rare single accent | Rausch #ff385c and tier colours, Cereal, 500-as-body, 14/20/32px radii, 0.92 press scale, hairlines on every row, 1920px grid |

## 2. Protected decisions (do not change without a version bump)

1. **Primary button hover swap.** Light: `#303030` fill + `#fefa54` text → hover `#fefa54` fill + `#303030` text. Dark: `#fefa54` fill + `#161616` text → hover `#ffffff` fill. 180ms ease-out on background and colour.
2. **Editorial link underline.** 1px underline in the link colour, draws left-to-right on hover and retracts right-to-left on exit, 260ms `cubic-bezier(0.22, 1, 0.36, 1)`. `#161616` on light, `#ffffff` on dark.
3. **Three-tier radius.** 9999px pill for buttons, icon buttons and avatars; 8px for inputs, selects and cards; 4px for tags. 12px for large panels and hero media only.
4. **Poppins** 400/500/600/700, self-hosted in `assets/fonts/`.
5. **Volt letter avatars.** `#fefa54` circle, `#161616` 600 initials, no border.

Implementation: `components/components.css` (`.gf-btn--primary`, `.gf-link`, `.gf-avatar`). Never re-implement these with `!important` or `[style*=…]` selectors. `scripts/check-tokens.py` fails if a protected token drifts between `tokens.json` and `variables.css`.

## 3. Colour

| Role | Light | Dark | Notes |
| --- | --- | --- | --- |
| Canvas | `#ffffff` | `#141414` | Page ground |
| Layer 1 | `#f6f7f9` | `#1d1d1d` | Sections, panels |
| Layer 2 | `#eceef2` | `#272727` | Chips, wells, image placeholders |
| Text primary | `#161616` | `#ffffff` | 18.1:1 / 18.4:1 |
| Text secondary | `#525252` | `#adadad` | 7.8:1 / 8.2:1 |
| Text tertiary | `#6f6f6f` | `#999999` | Metadata only, on canvas; 5.0:1 / 6.5:1 (4.7:1 on layer 1) |
| Border subtle | `#e2e5ec` | `#303030` | 1px rules inside components, cards, tables |
| Border control | `#8d8d8d` | `#6f6f6f` | Input, select, textarea boundary and checkbox/switch off: 3.3:1 / 3.7:1 (WCAG 1.4.11) |
| Primary action | `#303030` / `#fefa54` text | `#fefa54` / `#161616` text | See protected hover |
| Volt highlight | `#fefa54` + `#161616` | same | Brand highlight |
| Focus ring | `#303030` | `#fefa54` | 2px, offset 2px |

**Volt rule.** Static volt (a badge, a marker, an accent word, an avatar group) is limited to one element per view. Interaction states (primary hover, dark-mode CTA, dark focus ring) are exempt because they are transient or functional. Never volt text on a light surface (1.1:1).

**Accepted trade-off.** A hovered primary button on a white canvas has ~1.1:1 edge contrast; the label stays at 12.0:1 and the colour inversion itself signals state. Accepted as brand-defining. Do not place primary buttons on `#fefa54` or volt-tinted grounds.

**Status.** Tags and alerts use Carbon pastels with primary text: success `#defbe6`/`#a7f0ba`, warning `#fcf4d6`/`#fddc69`, error `#fff1f1`/`#ffb3b8`. The only solid status colour is `#ff4d4f` / `#dc6966` for an invalid field's border. Never mid-grey fills in light mode. Never colour alone: pair state with a word ("Error:", "Sent.") or an icon.

## 4. Typography

Poppins for display and body. One family, weight does the work.

| Role | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| Display | 64 | 700 | 1.05 | −0.02em |
| H1 | 48 | 700 | 1.1 | −0.02em |
| H2 | 38 | 600 | 1.15 | −0.015em |
| H3 | 26 | 600 | 1.25 | −0.01em |
| H4 | 22 | 600 | 1.25 | 0 |
| Body large | 18 | 400 | 1.6 | 0 |
| Body | 16 | 400 | 1.55 | 0 |
| UI / labels | 14 | 500 | 1.43 | 0 |
| Button | 13 (12 sm, 14 lg) | 600 | 1 | 0.01em |
| Caption | 12 | 400 | 1.33 | 0 |

Reading copy is 16px minimum at 60–75 characters per line (`.gf-body` caps at 68ch). 14px is for controls, labels and dense metadata. Under 600px, Display/H1/H2/H3 step down to 48/38/32/22. Sentence case throughout; the only uppercase is the 12px eyebrow label. Headlines never contain markdown syntax. Classes: `.gf-display` … `.gf-caption`, `.gf-eyebrow`.

## 5. Space, grid, shape, elevation

- **Spacing:** 8, 12, 16, 24, 32, 48, 64. 4px only for icon-to-label gaps and metadata stacks (the lines under a card).
- **Grid:** 12 columns, max width 1200px, gutters 24px desktop / 16px mobile, 64px+ between sections.
- **Separation:** tone first (canvas → layer 1 → layer 2). Hairlines only inside components (table rows, field borders, tab bar).
- **Elevation:** flat by default. One shadow, `--gf-shadow-float`, for menus, dialogs and sticky action panels only. Cards never cast shadows.

## 6. Components

Full specs, states, accessibility and code for each: **`docs/components.md`**. Live: `examples/landing.html`.

| Group | Components |
|---|---|
| Actions | Button (primary · secondary · sm/md/lg · block · loading · disabled), Icon button (default · on-media), Link (protected underline, `.gf-prose` for inline) |
| Forms | Field, Label, Input, Select, Textarea, Help/Error, Checkbox, Radio, Switch |
| Display | Tag (neutral · success · warning · error · volt), Avatar (sm/md/lg), Alert, Card, Hero media, Figure, Table, Accordion |
| Structure | Nav + mobile menu + skip link, Footer, Panel + floating sticky panel (bottom bar under 820px), Tabs, Dialog |
| Foundations | Type classes, Container, Section, 12-col Grid, Cards grid, Stack, Cluster |

Rules that apply to all of them: every interactive element has hover, focus-visible, pressed and disabled states; touch targets are 44px minimum (hit areas extended where the visual is smaller); one primary button per view (a mobile sticky bar may repeat the page's primary).

## 7. Dark mode

Same components, token swap only. Follows the visitor's OS setting by default; force with `data-theme="dark"` / `data-theme="light"` (or `.dark`) on `<html>` or any container. Logos swap to `wordmark-white.svg` with `<picture>` + `prefers-color-scheme`. Ground `#141414`, sections `#1d1d1d`, elevated `#272727`, borders `#303030`/`#3e3e3e`, headings and body `#ffffff`, secondary `#adadad`. Primary CTA is volt → white on hover. Links and underline are white.

## 8. Motion

150ms for small state changes, 180ms for colour swaps, 260ms for the underline draw, 300ms maximum. Ease-out on enter. Under `prefers-reduced-motion`, the underline appears instantly; colour swaps remain.

## 9. Voice

Human-first, curious, systems-led, craft-obsessed, confident, warm. A first-person creative leader speaking plainly. Short declarative headlines, generous body sentences, occasional playful sign-offs ("Scroll down and let the love begin.").

- **Use:** transform, brands & businesses, creativity & design, systems thinking, craft, people, culture and brands, partnering.
- **Avoid:** corporate stiffness, buzzwords, invented metrics, visual clutter, heavy drop shadows.

Full prose guide: `BRAND.md`.

## 10. Imagery

Editorial project covers and crisp product showcases, balanced with personal art, photography and music experiments. Full-bleed 16:9 covers, natural light, generous whitespace framing, product screens on neutral grounds. No cluttered composites, stock clichés or recoloured client work. Captions sit below images, never on them.

## 11. Responsive

Breakpoints 600 / 820 / 1024 / 1440. Validate at 360, 390, 430, 600, 820, 1024, 1366, 1440 and 1920 widths. Card grids reflow 4 → 3 → 2 → 1 at 1024 / 820 / 600; grid spans go full width under 820; nav collapses to a menu button under 820. Touch targets 44px minimum.

## Changelog

- **1.0.0 (2026-11-18):** First release. Hand-owned tokens (`tokens/tokens.json`) replace the retired OpenDesign generator (archived in `_archive/legacy/`). The kits' custom states are the rule: charcoal/volt primary hover swap, editorial link underline, three-tier radius, volt avatars, Poppins. 22 components with full states, type and layout classes, dark mode that follows the OS, Airbnb-derived patterns (photo cards, sticky action panel, circular icon buttons, underline tabs), `components.js` behaviour, `docs/components.md`, `examples/landing.html`, `scripts/check-tokens.py` and a compat layer for legacy pages. Published to Claude Design as the default design system (`claude-design/`).
