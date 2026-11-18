---
name: "DS-geofreitas.com"
version: "1.3.1"
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
2. **Editorial link underline.** 1px underline in the link colour, draws left-to-right on hover and retracts right-to-left on exit, 260ms `cubic-bezier(0.22, 1, 0.36, 1)`. `#161616` on light, `#ffffff` on dark. Linked cards use the same line under the card title.
3. **Three-tier radius.** 9999px pill for buttons, icon buttons and avatars; 8px for inputs, selects and cards; 4px for tags. 12px for large panels and hero media only.
4. **Poppins** 400/500/600/700, self-hosted in `assets/fonts/`.
5. **Raggio letter avatars.** `#fefa54` circle, `#161616` 600 initials, no border.

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
| Raggio highlight | `#fefa54` + `#161616` | same | Brand highlight |
| Focus ring | `#303030` | `#fefa54` | 2px, offset 2px |

**Raggio** `#fefa54` is the brand yellow, named from *raggio di sole* (a ray of sunshine), the sun in the logo mark. Code: `--gf-raggio`, `--gf-on-raggio`, `.gf-tag--raggio`.

**Raggio rule.** Static Raggio (a badge, a marker, an accent word, an avatar group) is limited to one element per view. Interaction states (primary hover, dark-mode CTA, dark focus ring) are exempt because they are transient or functional. Never Raggio text on a light surface (1.1:1).

**Accepted trade-off.** A hovered primary button on a white canvas has ~1.1:1 edge contrast; the label stays at 12.0:1 and the colour inversion itself signals state. Accepted as brand-defining. Do not place primary buttons on `#fefa54` or Raggio-tinted grounds.

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

Sizes are tokens in rem (16px = 1rem), so all type follows the reader's browser text size. Reading copy is 16px minimum at 60–75 characters per line (`.gf-body` caps at 68ch). 14px is for controls, labels and dense metadata. Under 600px, Display/H1/H2/H3 step down to 48/38/32/22. Sentence case throughout; the only uppercase is the 12px eyebrow label. Headlines never contain markdown syntax. Classes: `.gf-display` … `.gf-caption`, `.gf-eyebrow`.

## 5. Space, grid, shape, elevation

- **Spacing:** 8, 12, 16, 24, 32, 48, 64. 4px only for icon-to-label gaps and metadata stacks (the lines under a card).
- **Grid:** 12 columns, max width 1200px, gutters 24px desktop / 16px mobile, 64px+ between sections.
- **Separation:** tone first (canvas → layer 1 → layer 2). Hairlines only inside components (table rows, field borders, tab bar).
- **Elevation:** flat by default. One shadow, `--gf-shadow-float`, for menus, dialogs and sticky action panels only. Cards never cast shadows.

## 6. Components

Full specs, states, accessibility and code for each: **`docs/components.md`**. Writing rules: **`docs/writing.md`**. Live: `examples/landing.html` (site), `examples/product.html` (product screen), `examples/prototype.html` (dashboard), `examples/case-study.html` (portfolio case) and `examples/deck.html` (presentation).

| Group | Components |
|---|---|
| Actions | Button (primary · secondary · sm/md/lg · block · loading · disabled), Icon button (default · on-media), Link (protected underline, `.gf-prose` for inline) |
| Forms | Field, Label, Input, Select, Textarea, Help/Error, Checkbox, Radio, Switch |
| Display | Tag (neutral · success · warning · error · Raggio), Avatar (sm/md/lg), Alert, Card, Hero media, Figure, Table, Accordion |
| Structure | Nav + mobile menu + skip link, Footer, Panel + floating sticky panel (bottom bar under 820px), Tabs, Dialog |
| Overlays | Menu, Popover, Tooltip, Toast |
| Feedback | Progress (determinate, indeterminate), Loader (spinner, brand mark), Skeleton (text, title, circle, media), Empty state |
| Navigation | Breadcrumb, Pagination, Search field, Sidebar (app layout, off-canvas under 820px) |
| Selection | Filter chips, Segmented control, Slider, Calendar (date picker panel) |
| Content | Carousel, Gallery (1 large + 4), Data table (sort, select, sticky header, selection toolbar, footer), Stat, Quote, Awards |
| Surfaces | Sheet (bottom sheet under 820px, side panel above) |
| Data & slides | Legend and chart classes with categorical (dv-1–6) and sequential colours; 16:9 slides (`.gf-slide`, accent, layer) |
| Foundations | Type classes, Container, Section, 12-col Grid, Cards grid, Stack, Cluster |

Rules that apply to all of them: every interactive element has hover, focus-visible, pressed and disabled states; touch targets are 44px minimum (hit areas extended where the visual is smaller); one primary button per view (a mobile sticky bar may repeat the page's primary).

## 7. Dark mode

Same components, token swap only. Follows the visitor's OS setting by default; force with `data-theme="dark"` / `data-theme="light"` (or `.dark`) on `<html>` or any container. Logos swap to `wordmark-white.svg` with `<picture>` + `prefers-color-scheme`. Ground `#141414`, sections `#1d1d1d`, elevated `#333333`, borders `#303030`/`#525252`, headings and body `#ffffff`, secondary `#adadad`. Primary CTA is Raggio → white on hover. Links and underline are white.

## 8. Motion (Apple-style)

- **Motion explains a change**: where something came from, what changed, what to look at. Never decorate.
- **Motion is never the only signal.** Every change it shows is also visible in the end state: text, a selected style, focus or a count. With motion off, nothing is lost.
- **Springs move things; durations recolour them.** Movement (menus, toasts, sheets, dialogs, page transitions) uses the spring tokens `gf-spring-smooth` (no bounce), `gf-spring-snappy` (a hint of overshoot, the default) and `gf-spring-bouncy` (celebratory moments only), at `gf-dur-spring-sm` 350ms (small surfaces), `-md` 500ms (dialogs, sheets) or `-lg` 700ms (page-level). Colour and state changes use 150–180ms ease-out.
- **Brief and precise.** Feedback motion is short and tied to the action that caused it. If people notice the animation more than the result, it is too much.
- **Exits reverse entrances.** Something that slides in from the right leaves to the right; a bottom sheet goes back down; a dialog sinks back. Exits are quieter: `gf-dur-exit` 150ms with `gf-ease-exit` (ease-in), no bounce. Small surfaces (menus, popovers, tooltips) may close instantly.
- **No motion on frequent actions.** Tabs, filters, chips, sorting and list refreshes change state without an entrance animation. Keep entrances for things that appear rarely.
- **Never make people wait.** Animations never block input: people can click, scroll, type or press Esc mid-animation. Nothing waits for an animation to finish before it responds.
- **Icon motion is rare.** Animate an icon only to confirm one action (a check, a save), under 300ms, never on a loop beyond loaders, and never under Reduce Motion.
- **Moving content can be paused.** Nothing flashes more than three times a second. Anything that moves on its own for more than five seconds (an auto-advancing carousel, autoplay video, a looping background) has a visible pause control. Carousels do not auto-advance by default.
- **Reduce Motion** replaces movement with a short cross-fade (`gf-dur-fast`); skeleton shimmer and the loader breathe stop; nothing jumps.
- **Protected timings stay:** primary hover swap 180ms ease-out, link underline 260ms `gf-ease-draw`.
- Classes: `.gf-enter-rise`, `.gf-enter-scale`, `.gf-enter-pop`, `.gf-enter-fade`, `.gf-exit`. Dialogs and sheets play their exit through `components.js` (close buttons and Esc).
- Source: Apple Human Interface Guidelines, Motion (updated September 2025) and Accessibility.

## 8a. Icons (Phosphor, Apple's weight system)

- Phosphor Icons (MIT), self-hosted in `assets/icons/phosphor/`. Use `<i class="ph ph-<name> gf-icon" aria-hidden="true"></i>`; names at phosphoricons.com.
- **Weight follows text weight** (the SF Symbols rule): `ph` (regular) next to 400–500 text, `ph-bold` next to 600–700 text and in every button. `ph-fill` marks a selected or active state (current sidebar item, liked); `ph-duotone` is for empty states and large illustrative moments.
- **Sizes:** `gf-icon--sm` 16px, `gf-icon` 20px, `gf-icon--lg` 24px; in buttons icons size to the label automatically.
- Icons are `currentColor`, never Raggio on light grounds, never emoji. An icon-only control always has an `aria-label`. SF Symbols are not used: their licence limits them to apps on Apple platforms.

## 8b. Depth, layers, density and contrast

- **Elevation:** flat by default; `gf-shadow-raised` for menus, popovers, tooltips and toasts; `gf-shadow-float` for the sticky action panel; `gf-shadow-overlay` for dialogs and sheets.
- **Stacking:** `gf-z-raised` 10 · `gf-z-sticky` 20 · `gf-z-nav` 30 · `gf-z-popover` 40 · `gf-z-modal` 50 · `gf-z-toast` 60 · `gf-z-skip` 70. Never a raw z-index.
- **Density:** `data-density="compact"` on any container tightens controls (32px), buttons (28/32/40) and spacing for product screens and dashboards. Hit areas stay 44px.
- **Contrast:** under `prefers-contrast: more`, secondary text darkens, hairlines reach 3:1 and focus rings go to 3px. Under Windows forced colours, components switch to system colours and keep visible borders and focus.

## 8c. Data visualisation

- **Categorical** `gf-dv-1` to `gf-dv-6` (blue, orange, teal, violet, ink, magenta), each at least 3:1 on the canvas in both themes. Use them in order, label every series, and never rely on colour alone.
- **Sequential** `gf-dv-seq-1` to `-5` for heatmaps and ranges; the two lightest steps need a border or a label.
- Gridlines `gf-dv-grid`, axis text `gf-dv-axis`. Raggio is never a data colour on light grounds.
- Charts are inline SVG with the `.gf-chart` classes (`.grid`, `.axis`, `.s1`–`.s6`, `.line`) and an `aria-label` that states what the chart shows.

## 8d. Presentations

- Slides are 16:9 (1920 × 1080 design size), built with `.gf-slide` and scaled by container units, so one deck works at any width and prints a slide per page.
- **Type at 1920 wide:** display 120, title 72, H2 48, body 28, caption 20. **Layout:** 96px margins, 12 columns, 32px gutters.
- **Grounds:** canvas for content, `--layer` for supporting slides, and `--accent` (`#303030`, white text) for the cover, statements and the ask, with at most one Raggio highlight per slide.
- One idea per slide; numbers are sourced or bracketed placeholders; slide footers stay at 4.5:1 or better.

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

- **1.3.1 (2026-11-18):** Motion section completed against Apple's HIG: motion is never the only signal, brief and precise, exits reverse entrances, no motion on frequent actions, never block input, rare icon motion, pause control for anything that moves on its own. Code: dialogs and sheets now play their exit (sheet slides back out, dialog sinks), including on Esc; toasts pause while focused.
- **1.3.0 (2026-11-18):** The brand yellow is named **Raggio** (from *raggio di sole*). New tokens `--gf-raggio`, `--gf-on-raggio` and class `.gf-tag--raggio`; the old `volt` names are removed (nothing used them). Colour unchanged. The pre-1.0 archive (`_archive/legacy/`) is removed from the repo; restore it with `git checkout v1.0.0 -- _archive`.
- **1.2.5 (2026-11-18):** Touch targets: every `.gf-btn` size, every `.gf-link` and the nav logo now carry an invisible 44px hit area (`::before`); footer link lists space to a 44px pitch. Found in the homepage audit; nothing visual changes.
- **1.2.4 (2026-11-18):** Mobile nav: the link underline now sits 2px under the words, not at the bottom of the 44px touch box. Rows stay 44px; the hit area is an invisible `::before`.
- **1.2.3 (2026-11-18):** `.gf-highlight` is now a volt band from just above the letters to just below the descenders, not the full line-height box, so it no longer rises into the line above in display type. Wraps with `box-decoration-break: clone`.
- **1.2.2 (2026-11-18):** Dark mode only: `bg-elevated` #272727 → #333333, so menus, popovers, dialogs and sheets sit one step above layer 2 (as in Apple, Carbon and Material); `border-strong` #3e3e3e → #525252 (1.7:1 → 2.4:1 on the ground), so dashed slots, dividers and strong outlines read. Ground, layers, text and the protected states are unchanged.
- **1.2.1 (2026-11-18):** Linked cards (`a.gf-card`) now hover with the protected editorial line under the title (draws L→R, retracts R→L, 260ms), replacing the static underline. Every text hover in the system is now that line.
- **1.2.0 (2026-11-18):** Added filter chips, segmented control, slider, calendar, sheet, carousel, gallery, full data table (sort, row selection, sticky header, selection toolbar), stat, quote and awards, data-visualisation colours and chart classes, and the presentation layer (16:9 slides). New examples: prototype dashboard, case study, deck. Nothing renamed or removed.

- **1.1.0 (2026-11-18):** Scope widened to products, prototypes and presentations. Added Phosphor icons with Apple's weight-follows-text rule and three icon sizes; Apple-style spring motion with exit and Reduce Motion rules; rem type; raised and overlay elevation; stacking tokens; compact density; high-contrast and forced-colours support; UX writing rules. New components: menu, popover, tooltip, toast, progress, loader, skeleton, empty state, breadcrumb, pagination, search field, sidebar. `tokens/variables.css` is now generated from `tokens.json` (`scripts/build-variables.py`). Dialogs now enter with a spring. Nothing renamed or removed.

- **1.0.0 (2026-11-18):** First release. Hand-owned tokens (`tokens/tokens.json`) replace the retired OpenDesign generator (archived in `_archive/legacy/`). The kits' custom states are the rule: charcoal/volt primary hover swap, editorial link underline, three-tier radius, volt avatars, Poppins. 22 components with full states, type and layout classes, dark mode that follows the OS, Airbnb-derived patterns (photo cards, sticky action panel, circular icon buttons, underline tabs), `components.js` behaviour, `docs/components.md`, `examples/landing.html`, `scripts/check-tokens.py` and a compat layer for legacy pages. Published to Claude Design as the default design system (`claude-design/`).
