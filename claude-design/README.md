geO freitas's personal design system: Carbon structure, Apple clarity, Material token roles and Airbnb patterns, in one family (Poppins), with charcoal `#303030` and one volt highlight `#fefa54`. Use it by default for any design: web pages, product screens, decks, posters and social posts.

## Build with it

- Load `tokens.css`, then `components/bundle.css`. On a Design canvas: `<link rel="stylesheet" href="ds/gf/tokens.css">` then `<link rel="stylesheet" href="ds/gf/components/bundle.css">`, with `fonts/` copied beside `tokens.css`.
- Build with the `gf-` classes in markup; there is no React bundle. Every component, its classes and its states are in the Components section.
- Theme with `data-theme="light"` or `data-theme="dark"` on the root or any container. Every component reads the same tokens in both themes.
- Interactive state is markup: `aria-selected` on tabs, `aria-checked` on a switch, `aria-busy="true"` on a loading button, `aria-invalid="true"` on a field, `aria-current="page"` on the current nav link, and `open` on `<details>` and `<dialog>`. On a canvas, drive these from component state.

## Protected decisions

These five carry the brand. Never restyle them, override them with `!important`, or replace them with a generic library's states.

1. **Primary hover swap.** In light, `.gf-btn--primary` is `gf-primary-bg` (charcoal) with `gf-primary-fg` (volt) text, and on hover the two swap. In dark, it is a volt fill with `#161616` text that turns white on hover. The swap takes 180ms (`gf-dur-base`, ease-out).
2. **Editorial link underline.** `.gf-link` draws a 1px `gf-link-underline` left to right on hover and retracts it right to left over 260ms (`gf-dur-draw`, `gf-ease-draw`). Links never get lighter on hover.
3. **Three-tier radius.** `gf-radius-pill` for buttons, icon buttons and avatars; `gf-radius-control` (8px) for inputs and cards; `gf-radius-tag` (4px) for tags. `gf-radius-panel` (12px) for panels and hero media only.
4. **Poppins** at 400, 500, 600 and 700 for everything: one family, and weight does the work.
5. **Volt letter avatars.** `.gf-avatar` is a `gf-volt` circle with `gf-on-volt` initials at 600.

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
- Volt (`gf-volt`) is a highlight, never a wash. Use one static volt element per view: a `.gf-tag--volt` badge, a `.gf-highlight` accent word, a marker, or the avatar group. Never use volt text, or a volt button fill, on a light surface. Interaction states (primary hover, the dark CTA, the dark focus ring) are exempt.
- Never place a primary button on a volt ground, because its hover would disappear. On white, a hovered primary has about 1.1:1 edge contrast; the label stays at 12.0:1, and this is an accepted, brand-defining trade-off.
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

### States and motion

- Every interactive element has hover, pressed, focus-visible (a 2px `gf-focus-ring`, offset 2px) and disabled (40%) states.
- Touch targets are at least 44px (`gf-touch-min`); smaller visuals get an extended hit area.
- Use 150–300ms, ease-out on enter. Respect `prefers-reduced-motion`: the underline then appears instantly, and colour swaps stay.

### Imagery

- Use editorial project covers and crisp product showcases, balanced with personal art, photography and music experiments.
- Use full-bleed 16:9 heroes (`.gf-hero-media`, 12px) and 4:3 cards (`.gf-card__media`, 8px), in natural light with generous whitespace. Show product screens on neutral grounds.
- Never put text on an image: captions go below it in `figcaption`. No cluttered composites, stock clichés or recoloured client work.
- Use the Imagery assets for real project covers; their file names don't identify the client.

## Iconography

- No icon font ships with the system. Use simple inline stroke SVGs at 1.5px, round caps and joins, 14–18px, in `currentColor`, inside `.gf-icon-btn` (always with an `aria-label`; the SVG takes `aria-hidden="true"`).
- Never use emoji.

## Logos

Use the Logos assets as they are; never redraw them.

- `wordmark-black.svg` is for light grounds and `wordmark-white.svg` for dark grounds.
- `loading-mark.svg` and `favicon.svg` are the small marks.
- `footer-logo-black.png` is the raster footer lockup.
