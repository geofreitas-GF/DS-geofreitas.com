geO freitas's personal design system: IBM Carbon structure, Apple HIG clarity and motion, Google Material token roles, Airbnb DLS patterns and Vercel Geist interface detail, in one family (Poppins), with charcoal `#303030` and one Raggio highlight `#fefa54`. Use it by default for any design: prototypes, product screens, web pages, decks, posters and social posts.

## Build with it

- Load `tokens.css`, then `components/bundle.css`. On a Design canvas: `<link rel="stylesheet" href="ds/gf/tokens.css">` then `<link rel="stylesheet" href="ds/gf/components/bundle.css">`, with `fonts/` copied beside `tokens.css`.
- Build with the `gf-` classes in markup; there is no React bundle. Every component, its classes and its states are in the Components section.
- `components/bundle.css` imports the Phosphor icon fonts from `icons/phosphor/`. Copy that folder too, so icons render on a canvas.
- Add `data-density="compact"` to a container for product screens and dashboards.
- For decks, build 16:9 slides with `.gf-slide` (see Presentations). For charts, use the `gf-dv-*` colours and `.gf-chart` classes.
- Theme with `data-theme="light"` or `data-theme="dark"` on the root or any container. Every component reads the same tokens in both themes.
- Interactive state is markup: `aria-selected` on tabs, `aria-checked` on a switch, `aria-busy="true"` on a loading button, `aria-invalid="true"` on a field, `aria-current="page"` on the current nav link, and `open` on `<details>` and `<dialog>`. On a canvas, drive these from component state.

## Protected decisions

These five carry the brand. Never restyle them, override them with `!important`, or replace them with a generic library's states.

1. **Primary hover swap.** In light, `.gf-btn--primary` is `gf-primary-bg` (charcoal) with `gf-primary-fg` (Raggio) text, and on hover the two swap. In dark, it is a Raggio fill with `#161616` text that turns white on hover. The swap takes 180ms (`gf-dur-base`, ease-out).
2. **Editorial link underline.** `.gf-link` draws a 1px `gf-link-underline` left to right on hover and retracts it right to left over 260ms (`gf-dur-draw`, `gf-ease-draw`). Links never get lighter on hover. Linked cards (`a.gf-card`) use the same drawn line under `.gf-card__title`; every text hover in the system is this line, never a static underline.
3. **Three-tier radius.** `gf-radius-pill` for buttons, icon buttons and avatars; `gf-radius-control` (8px) for inputs and cards; `gf-radius-tag` (4px) for tags. `gf-radius-panel` (12px) for panels and hero media only.
4. **Poppins** at 400, 500, 600 and 700 for everything: one family, and weight does the work.
5. **Raggio letter avatars.** `.gf-avatar` is a `gf-raggio` circle with `gf-on-raggio` initials at 600.

## Data visualisation

- Use the categorical colours `gf-dv-1` to `gf-dv-6` in order (blue, orange, teal, violet, ink, magenta). Each is at least 3:1 on the canvas in both themes. Label every series, and never rely on colour alone.
- Use the sequential ramp `gf-dv-seq-1` to `-5` for ranges and heatmaps. Give the two lightest steps a border or a label.
- Use `gf-dv-grid` for gridlines and `gf-dv-axis` for axis text. Raggio is never a data colour on light grounds.

## Presentations

- Slides are 16:9 at a 1920 × 1080 design size, built with `.gf-slide` (`--layer`, `--accent`) and a 12-column `.gf-slide__inner` (96px margins, 32px gutters). They scale with their container.
- Type at 1920 wide: `__display` 120, `__title` 72, `__h2` 48, `__body` 28, `__caption` 20.
- Use the accent ground (`gf-slide-accent-bg`, white titles) for the cover, statements and the ask, with one Raggio highlight at most.
- One idea per slide. Numbers are sourced or bracketed placeholders.

## Content fundamentals

- **Voice:** human-first, curious, systems-led, craft-obsessed, confident, warm. A first-person creative leader speaking plainly: "I unite brand, product and business strategy…".
- **Shape:** short declarative headlines, generous sentences in body copy, and the occasional playful sign-off ("Scroll down and let the love begin.").
- **Case:** sentence case everywhere. The only uppercase is the `gf-eyebrow` kicker.
- **Use:** transform, brands & businesses, creativity & design, systems thinking, craft, people, culture and brands, partnering.
- **Avoid:** corporate stiffness, buzzwords, invented metrics, emoji, and markdown symbols in headlines.
- **Placeholders:** facts you don't have become bracketed placeholders such as `[Project name]` or `[Year]`. Never invent clients or numbers.

## Visual foundations

### Colour

- Text is `gf-text-primary` on `gf-bg-canvas`, `gf-bg-layer-1` or `gf-bg-layer-2`. Use `gf-text-secondary` for supporting copy and labels, and `gf-text-tertiary` for metadata on canvas only.
- Separate sections by tone: canvas → `gf-bg-layer-1` → `gf-bg-layer-2`. Never separate them with shadows.
- **Raggio** is the brand yellow `#fefa54`, named from *raggio di sole* (a ray of sunshine), the sun in the logo mark.
- Raggio (`gf-raggio`) is a highlight, never a wash. Use one static Raggio element per view: a `.gf-tag--raggio` badge, a `.gf-highlight` accent word, a marker, or the avatar group. Never use Raggio text, or a Raggio button fill, on a light surface. Interaction states (primary hover, the dark CTA, the dark focus ring) are exempt.
- Never place a primary button on a Raggio ground, because its hover would disappear. On white, a hovered primary has about 1.1:1 edge contrast; the label stays at 12.0:1, and this is an accepted, brand-defining trade-off.
- Status uses Carbon pastels (`gf-success-bg`, `gf-warning-bg`, `gf-error-bg` with their borders) and `gf-status-fg` text, always paired with a word ("Sent.", "Error:"). `gf-error-solid` is only for an invalid field's border.
- Field boundaries use `gf-border-control` (3:1). Hairlines inside components use `gf-border-subtle`.

### Type

- Use the type styles: `gf-display` (one per page), `gf-h1` to `gf-h4`, `gf-body-lg`, `gf-body`, `gf-ui`, `gf-caption` and `gf-eyebrow`.
- Reading copy is `gf-body` at 16px minimum, 60–75 characters per line (`gf-measure`). Use 14px (`gf-ui`) only for controls, labels and dense metadata.
- Headings use 600 or 700 with slight negative tracking. Under 600px, display, H1, H2 and H3 step down to 48, 38, 32 and 22px.

### Space and layout

- Use the 8px grid: `gf-space-8` through `gf-space-64`. `gf-space-4` is only for icon-to-label gaps and the metadata stack under a card.
- Use a 12-column `.gf-grid` inside `.gf-container` (max width 1200px; 24px gutters, 16px on mobile), and `.gf-section` for 64px vertical rhythm (48px on mobile).
- Keep 35–40% of any viewport as open whitespace, with low visual chrome. Content and the work lead.

### Shape, borders and elevation

- Use 1px borders only. The radius tiers are as protected above.
- Everything is flat by default. `gf-shadow-float` is only for the sticky action panel, dialogs and menus; cards never cast shadows.

### States and motion (Apple-style)

- Every interactive element has hover, pressed, focus-visible (a 2px `gf-focus-ring`, offset 2px) and disabled (40%) states. Fields are quieter: hover steps the border up one grey (`gf-field-border-hover`), focus uses `gf-field-border-focus` with a soft 3px `gf-focus-halo`; an invalid field keeps its red border with `gf-error-halo`.
- Checked controls are monochrome: `gf-control-on` is charcoal in light and white in dark, never Raggio. Radios are a ring and dot; checkboxes are filled with a tick.
- Tags have no border: neutral text `gf-tag-fg`, status text `gf-success-fg`, `gf-warning-fg` or `gf-error-fg` on their tint. Corners stay 4px, because round means clickable.
- End a case study or article with the Pager (`.gf-pager`): Previous on the left, Next on the right, the title drawing the editorial underline on hover.
- Touch targets are at least 44px (`gf-touch-min`); smaller visuals get an extended hit area.
- Motion explains a change: where something came from, or what changed. It never decorates, and it is never the only signal: the end state also shows the change in text, style, focus or a count.
- Springs move things, using `gf-spring-snappy` by default, `gf-spring-smooth` for no bounce, and `gf-spring-bouncy` only for celebrations, at `gf-dur-spring-sm`, `-md` or `-lg`. Colour and state changes take 150–180ms ease-out. Keep feedback brief and tied to the action.
- Exits reverse entrances and are quieter: a sheet slides back out the way it came, a dialog sinks back, at `gf-dur-exit` with `gf-ease-exit` and no bounce. Menus, popovers and tooltips may close instantly.
- No motion on frequent actions: tabs, filters, chips, sorting and list refreshes change state without an entrance animation.
- Never make people wait: animations never block clicks, scrolling, typing or Esc.
- Icon motion is rare: only to confirm one action, under 300ms, never under Reduce Motion.
- Nothing flashes more than three times a second, and anything that moves on its own for more than five seconds has a pause control. Carousels do not auto-advance.
- Under Reduce Motion, movement becomes a short cross-fade and shimmer and breathing loaders stop.
- The protected timings stay as they are: the hover swap at 180ms and the underline at 260ms.

### Interface details

- Inputs use 16px text on small screens; loading buttons keep their label beside the spinner ("Sending…").
- Use the real ellipsis (…), curly quotes and a non-breaking space between numbers and units. Placeholders show an example and end with an ellipsis.
- Forms: labels on every control, submit stays enabled until sending, errors beside their field with focus on the first, never block paste.
- Destructive actions need a confirmation or Undo. Delay spinners about 150ms and keep them at least 300ms. Skeletons match the final layout.
- Nested corners are never rounder than their parent. Hover, pressed and focus always have more contrast than rest.
- Use real links, and keep tabs, filters and pages in the URL.

### Site and case-study components (1.6)

- **Combobox** (`.gf-combobox`) when people need to search a long list: type to filter, arrows and Enter to pick, Esc to undo; the picked row shows a check. Keep `.gf-select` for short fixed lists.
- **Choicebox** (`.gf-choicebox` of `.gf-choice` cards) for a few options that need a line of explanation each; radio or checkbox inside.
- **Input group** (`.gf-input-group`) adds a prefix, suffix or clear button to any input; the group carries the border and focus halo.
- **Copy** (`[data-gf-copy]`): a "Copy email" button or `.gf-copytext` value with an icon button; confirms with a check for 2s.
- **Theme switcher** (`.gf-theme-switch`): System / Light / Dark on the segmented control, icon-only with labels for screen readers; remembered per visitor; the logo and theme-color follow.
- **Video** (`.gf-video`): muted loop with a poster and captions, a pause control on the frame, 12px corners; it never autoplays under Reduce Motion. Showreels with sound use native controls.

### Depth, layers and density

- Use `gf-shadow-raised` for menus, popovers, tooltips and toasts; `gf-shadow-float` for the sticky panel; and `gf-shadow-overlay` for dialogs and sheets.
- Stack with the `gf-z-*` tokens, never a raw z-index.
- `data-density="compact"` tightens controls to 32px for product screens. Under `prefers-contrast: more`, secondary text and hairlines darken.

### Imagery

- Use editorial project covers and crisp product showcases, balanced with personal art, photography and music experiments.
- Use full-bleed 16:9 heroes (`.gf-hero-media`, 12px) and 4:3 cards (`.gf-card__media`, 8px), in natural light with generous whitespace. Show product screens on neutral grounds.
- Never put text on an image: captions go below it in `figcaption`. No cluttered composites, stock clichés or recoloured client work.
- Use the Imagery assets for real project covers; their file names don't identify the client.

## Iconography

- Use **Phosphor Icons** (MIT, self-hosted in `icons/phosphor/`): `<i class="ph ph-<name> gf-icon" aria-hidden="true"></i>`. Names are listed at phosphoricons.com.
- Icon weight follows the adjacent text weight, Apple's SF Symbols rule. Use `ph` (regular) next to 400–500 text, and `ph-bold` next to 600–700 text and in every button. Use `ph-fill` for a selected or active state, and `ph-duotone` for empty states.
- Sizes: `gf-icon--sm` 16px, `gf-icon` 20px, `gf-icon--lg` 24px. Icons are `currentColor`.
- Never use emoji. Icon-only controls always carry an `aria-label`.
- SF Symbols aren't used: their licence limits them to apps on Apple platforms.

## Logos

Use the Logos assets as they are; never redraw them.

- `wordmark-black.svg` is for light grounds and `wordmark-white.svg` for dark grounds.
- `loading-mark.svg` and `favicon.svg` are the small marks.
- `footer-logo-black.png` is the raster footer lockup.
