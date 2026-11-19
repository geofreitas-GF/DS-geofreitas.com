# DS-geofreitas.com — component reference (v1.6)

Every component lives in `components/components.css`; behaviour for tabs, switch, mobile nav and dialog lives in `components/components.js` (optional, no dependencies). Live examples of all of them: `examples/landing.html`.

States key: **D** default · **H** hover · **P** pressed · **F** focus-visible (2px ring, `--gf-focus-ring`, 2px offset) · **X** disabled (40% opacity, not interactive) · **L** loading · **E** error.

---

## Button `.gf-btn`

Pill-shaped action. Use for actions; use `.gf-link` for navigation inside text.

| Variant | Use when |
|---|---|
| `--primary` | The one main action of the view. **Protected hover.** |
| `--secondary` | Supporting actions, alongside or instead of a primary |
| `--sm` / default / `--lg` | 34 / 40 / 48px tall. `--sm` gets an invisible 44px hit area |
| `--block` | Full-width inside panels and dialogs |

| State | Primary light | Primary dark | Secondary |
|---|---|---|---|
| D | `#303030` fill, Raggio text | Raggio fill, `#161616` text | canvas fill, subtle border |
| H | Raggio fill, `#303030` text (180ms) | `#ffffff` fill | layer-1 fill, ink border |
| P | `#1f1f1f`, Raggio text | `#e2e5ec` | layer-2 fill |
| F / X | ring / 40% | ring (Raggio) / 40% | ring / 40% |
| L | `aria-busy="true"`: spinner before the label, label stays ("Sending…"), width kept | same | spinner in ink |

**Accessibility:** use `<button>` for actions and `<a>` for navigation. Disabled anchors take `aria-disabled="true"`. A loading button keeps its accessible name; announce the outcome elsewhere.

| ✅ Do | ❌ Don't |
|---|---|
| One primary per view (a mobile sticky bar may repeat the page's primary) | Put a primary on a Raggio ground (the hover would vanish) |
| Sentence-case verbs: "Start a conversation" | Re-implement the hover with `!important` or `filter` |

```html
<a class="gf-btn gf-btn--primary gf-btn--lg" href="#contact">Start a conversation</a>
<button class="gf-btn gf-btn--secondary" type="button">View work</button>
<button class="gf-btn gf-btn--primary" type="submit" aria-busy="true">Sending</button>
```

## Icon button `.gf-icon-btn`

A 40px circle with a 44px hit area. States: D, H (ink border), P (layer-2 fill), F, X. `--on-media` puts a white fill with a 4px white ring over photography.

**Accessibility:** always add an `aria-label`; the SVG inside takes `aria-hidden="true"`.

```html
<button class="gf-icon-btn" type="button" aria-label="Next"><svg aria-hidden="true">…</svg></button>
```

## Link `.gf-link` (protected)

A 1px underline draws left to right on hover and focus and retracts right to left (260ms, `--gf-ease-draw`). `aria-current="page"` keeps the underline drawn. Under reduced motion the underline appears instantly.

Inside running text, wrap the text in `.gf-prose`: links there carry a static underline so they are never told apart by colour alone.

| ✅ Do | ❌ Don't |
|---|---|
| Nav, footer, card actions, "Download CV" | Lighten the link on hover |

## Form field `.gf-field` + `.gf-label` + `.gf-input` / `.gf-select` / `.gf-textarea` + `.gf-help`

40px tall, 8px corners, 1px `--gf-border-control` border (3:1).

| State | Visual |
|---|---|
| D | control border, canvas fill, tertiary placeholder |
| H | border steps up one grey (`gf-field-border-hover`) |
| F | `gf-field-border-focus` border + soft 3px `gf-focus-halo` |
| E | `aria-invalid="true"` sets an error border; `.gf-help--error` prefixes the message with "Error:" |
| X / read-only | layer-1 fill, tertiary text |

**Accessibility:** every control has a `<label for>`. Help and error text connect through `aria-describedby`. Use `autocomplete` for name and email.

```html
<div class="gf-field">
  <label class="gf-label" for="email">Email</label>
  <input class="gf-input" id="email" type="email" aria-invalid="true" aria-describedby="email-err">
  <span class="gf-help gf-help--error" id="email-err">enter a full email address</span>
</div>
```

## Checkbox and radio `.gf-check`

Native inputs, restyled: a 20px box (4px corners) or circle, with a 44px row. Off: 1.5px `--gf-control-off` border (3.3:1). On: checkbox = `--gf-control-on` fill with `--gf-control-mark` tick; radio = `--gf-control-on` ring and dot on the canvas. Monochrome in both themes (white in dark, never Raggio). H: `gf-field-border-hover`. X: 40%.

```html
<label class="gf-check"><input type="checkbox"> Send me the newsletter</label>
```

## Switch `.gf-switch`

`<button role="switch" aria-checked>` with a 44×24 track. Off: `--gf-control-off`. On: `gf-control-on` (charcoal in light, white in dark), with the knob in `gf-control-mark`. `components.js` toggles `aria-checked`. Use a switch for instant settings and a checkbox for form answers.

```html
<button class="gf-switch" type="button" role="switch" aria-checked="false"><span class="gf-switch__track" aria-hidden="true"></span>Reply by phone</button>
```

## Tag `.gf-tag`

24px tall, 4px corners, not interactive. Variants: neutral (default), `--success`, `--warning`, `--error`, `--raggio` (counts as the view's one static Raggio element). Status always pairs the tint with a word.

## Avatar `.gf-avatar` (protected)

A Raggio circle with 600-weight initials. `--sm` 32 / default 40 / `--lg` 48. It may hold an `<img>`. Decorative avatars take `aria-hidden="true"` next to a visible name.

## Alert `.gf-alert`

An inline message with an 8px radius, in neutral (default), `--success`, `--warning` or `--error` tints with primary text. Start it with `.gf-alert__title`, a word such as "Sent." or "Error:" that names the state. Use `role="status"` for confirmations and `role="alert"` for blocking errors.

## Card `.gf-card` (Airbnb pattern)

4:3 `__media` at 8px corners, no shadow, no text over the image. `__meta` stacks title (16/600), `__sub` (14 secondary) and `__detail` (12 tertiary) at 4px gaps. When the card is a link: on hover the media fades to 92% and the title underlines; on focus a ring with 4px offset appears.

**Accessibility:** the whole card is one `<a>`. The image alt names the project; never place a nested link inside a card.

## Hero media `.gf-hero-media` and figure `.gf-figure`

16:9 at 12px corners. Captions go in `<figcaption>`, below the image.

## Panel `.gf-panel` / `.gf-panel--float`

A tonal panel (layer 1, 12px corners, 24px padding). `--float` is the sticky action panel: elevated, with the single float shadow, pinned at `--gf-sticky-top`. Under 820px it becomes a fixed bottom bar. Anything marked `.gf-panel__extra` hides there, and the body gets bottom padding so content is never covered.

## Tabs `.gf-tabs` + `.gf-tab` + `.gf-tabpanel`

Text tabs with a 2px ink underline on the selected tab (never Raggio). H: ink text with a grey underline. F: inset ring.

**Keyboard** (`components.js`, WAI-ARIA pattern): ←/→ move and select, Home/End jump. Only the selected tab sits in the Tab order (roving `tabindex`).

```html
<div class="gf-tabs" role="tablist" aria-label="Filter work">
  <button class="gf-tab" role="tab" id="t1" aria-controls="p1" aria-selected="true">All work</button>
  <button class="gf-tab" role="tab" id="t2" aria-controls="p2" aria-selected="false">Brand</button>
</div>
<div class="gf-tabpanel" role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">…</div>
<div class="gf-tabpanel" role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>…</div>
```

## Table `.gf-table-wrap` + `.gf-table`

Hairline rows, a layer-1 header, 8px outer corners and horizontal scroll on narrow screens. `.gf-num` right-aligns tabular figures. Always include a `<caption>` and `scope` on header cells.

## Accordion `.gf-accordion`

Native `<details>/<summary>`, so there is no JavaScript and the keyboard and screen-reader behaviour comes free. The chevron rotates 180ms. Each row is at least 44px.

## Navigation `.gf-nav` and skip link `.gf-skip`

A sticky 72px bar on the canvas colour with a hairline bottom. Links are `.gf-link`, the current page carries `aria-current="page"`, and one `--sm` primary sits at the end. Under 820px the links collapse behind `.gf-nav__toggle`, an icon button with `aria-expanded` and `aria-controls`. Make `.gf-skip` the first element in `<body>`.

## Footer `.gf-footer`

Layer-1 ground in 3 columns (one column under 820px). Footer links keep a 24px minimum height.

## Dialog `.gf-dialog`

Native `<dialog>` opened with `showModal()`, so focus trapping, Esc and the backdrop come free. Max width 520px, 12px corners, float shadow, `--gf-scrim` backdrop, spring entrance at `gf-dur-spring-md`; on close (`[data-gf-close]` or Esc) it sinks back in 150ms, a short fade under Reduce Motion. `[data-gf-open="id"]` opens it. Label it with `aria-labelledby` and put actions at the end: secondary, then primary.

## Type classes

`.gf-display` `.gf-h1`–`.gf-h4` `.gf-body-lg` `.gf-body` `.gf-ui` `.gf-caption` `.gf-eyebrow` map 1:1 to the type role tokens. Display, H1, H2 and H3 step down one size under 600px. `.gf-body` and `.gf-body-lg` cap line length at 68ch. `.gf-highlight` is the one static Raggio word per view.

## Layout classes

`.gf-container` (1200px max, 24/16px gutters), `.gf-section` (64/48px vertical rhythm), `--layer-1`/`--layer-2` tonal sections, `.gf-grid` (12 columns) with `.gf-span-4/6/7/8/12` and `.gf-start-9` (all go full width under 820px), `.gf-cards` (4→3→2→1 columns), `.gf-stack`, `.gf-cluster`.

---

# Added in 1.1

## Icons `.gf-icon` (Phosphor)

`<i class="ph ph-<name> gf-icon" aria-hidden="true"></i>`, with weight classes `ph` / `ph-bold` / `ph-fill` / `ph-duotone` and sizes `gf-icon--sm` / default / `--lg`. Weight follows the adjacent text (bold in buttons). An icon-only control needs an `aria-label`. Find names at phosphoricons.com.

## Menu `.gf-menu`

An action list on the native `[popover]` top layer, positioned under its trigger by `components.js`.

| State | Visual |
|---|---|
| Item H / F | `gf-bg-layer-1` fill; focus adds an inset ring |
| Disabled | `aria-disabled="true"`, 40% |
| Danger | `.gf-menu__item--danger` tints the icon only, and the label still says what happens |

**Keyboard:** Enter or Space opens and focuses the first item; ↑/↓, Home and End move; Esc closes and returns focus to the trigger.

```html
<button class="gf-btn gf-btn--secondary" popovertarget="m1" aria-haspopup="menu" aria-expanded="false">Actions</button>
<div class="gf-menu" id="m1" popover role="menu" aria-label="Actions">
  <button class="gf-menu__item" role="menuitem" type="button"><i class="ph ph-copy gf-icon" aria-hidden="true"></i>Duplicate</button>
  <hr class="gf-menu__sep">
  <button class="gf-menu__item gf-menu__item--danger" role="menuitem" type="button"><i class="ph ph-trash gf-icon" aria-hidden="true"></i>Delete</button>
</div>
```

## Popover `.gf-popover`

The same mechanics as Menu, for rich content (a small form, filters, details). It's 320px wide, 16px padding, `gf-shadow-raised`, and dismisses when you click outside. Close it from inside with `popovertargetaction="hide"`.

## Tooltip `.gf-tooltip`

A short label (≤ 1 line) for icon-only controls. It shows on hover and on focus after 400ms, and Esc hides it (WCAG 1.4.13). Ink on `gf-tooltip-bg` (inverted per theme). Never put interactive content inside, and never use it for essential information.

```html
<span class="gf-tooltip-wrap"><button class="gf-icon-btn" aria-label="Share" aria-describedby="t1">…</button><span class="gf-tooltip" role="tooltip" id="t1">Share</span></span>
```

## Toast `GF.toast(text, { action, onAction, timeout })`

A confirmation, bottom-centre, in an inverted ink fill with `gf-shadow-raised`. It lasts 4s (6s with an action) and pauses while the pointer is over it. It enters with a snappy spring and exits by sinking for 150ms. It's announced through a polite live region. The text is past tense ("Link copied."), and Undo is the preferred action. `data-gf-toast="…"` on a button shows one without code.

## Progress `.gf-progress`

A 4px pill track with a `gf-control-on` bar. Set `--progress: 72%` and `aria-valuenow`. `--indeterminate` loops on a smooth spring. Always give it an `aria-label`.

## Loader `.gf-loader`, `.gf-loader-mark`

A spinner the size of an icon (`--lg` is 40px) for actions in place. For a page or app load, use `.gf-loader-mark` on `assets/logos/loading-mark.svg` (breathing animation). Mark it `role="status"` with an `aria-label`.

## Skeleton `.gf-skeleton`

Placeholder shapes `--text`, `--title`, `--circle` and `--media` (4:3), with a shimmer that stops under Reduce Motion. Mirror the real layout, and set `aria-busy="true"` on the container.

## Empty state `.gf-empty`

A duotone icon (48px) plus `__title`, `__text` and one action. Copy rules are in `docs/writing.md`.

## Breadcrumb `.gf-breadcrumb`

`<nav aria-label="Breadcrumb"><ol>`, with "/" separators and the current page as `aria-current="page"` in ink at 600. Links are `.gf-link`.

## Pagination `.gf-pagination`

40px pill pages with a 44px hit area. The current page has an ink border and 600 weight (`aria-current="page"`), not a primary fill. Previous and next use caret icons with `aria-label`. `.gf-page--gap` marks the ellipsis.

## Search field `.gf-search`

A `type="search"` input (8px control tier) with a leading magnifier and a trailing clear icon button that shows only when there's text. It needs a visually hidden `<label>`.

## Sidebar `.gf-app` + `.gf-sidebar`

An app layout: a 264px sticky sidebar plus `.gf-app__main`. Items are `.gf-sidebar__item` with an icon and label. The current item gets `aria-current="page"`, `gf-nav-active-bg`, 600 weight and a `ph-fill` icon. Section headings use `gf-eyebrow`. Under 820px it becomes an off-canvas drawer opened by `.gf-sidebar__toggle` (`aria-expanded`).

## Density

`data-density="compact"` on any container sets 32px controls and 28/32/40 buttons for dashboards and data-heavy screens. Hit areas stay 44px, and type is unchanged.

---

# Added in 1.2

## Filter chips `.gf-chip`

Toggle buttons for filtering: `<button class="gf-chip" aria-pressed="false">` with a hidden `ph-bold ph-check` (`.gf-chip__check`) that shows when the chip is selected. Selected chips are inverted ink (`gf-chip-selected-*`), never Raggio. Group them in `.gf-chips` with `role="group"` and an `aria-label`. Chips are 32px tall with a 44px hit area.

## Segmented control `.gf-segmented`

Two to five mutually exclusive views, built from native radios inside labels (`role="radiogroup"`, `aria-label`). The selected segment sits on a canvas-coloured pill with `gf-shadow-raised` (Apple style) and moves on `gf-spring-snappy`. Use it for views of the same content; use Tabs when the panels differ.

## Slider `.gf-slider`

A native `<input type="range">` with a 4px track filled in `gf-control-on` and a 20px thumb. `components.js` keeps `--value` in sync. Always pair it with a visible label, and show the value when it matters.

## Calendar `.gf-calendar`

The visual date panel for prototypes: a header with month navigation, a 7-column grid of `.gf-day` buttons (`aria-current="date"` for today, `aria-selected="true"` for the selection, `--in-range`, `--outside`, `disabled`). In production forms use `<input class="gf-input" type="date">`, which gives native, accessible keyboard entry.

## Sheet `.gf-sheet`

A native `<dialog>` opened with `showModal()` (`data-gf-open`). Under 820px it's a bottom sheet with a handle and 12px top corners; above that it's a 480px side panel on the right. It enters on `gf-spring-snappy` at the medium spring duration and leaves the way it came (back to the right, or down on mobile) in 150ms when closed or on Esc. Use it for details, filters and secondary flows that keep the page in view.

## Carousel `.gf-carousel` and gallery `.gf-gallery`

- **Carousel:** a scroll-snap track (`__track` > `__slide`) with on-media previous and next buttons, and dots (`aria-current="true"` marks the active one). `--cards` shows three cards at a time (85% under 820px). Swipe, the buttons and the dots all work, and it scrolls instantly under Reduce Motion.
- **Gallery:** the Airbnb layout, one large image plus four smaller ones in a 12px-radius frame, with an optional `.gf-gallery__more` "Show all" button. It becomes a swipeable strip under 820px.

## Data table (full)

On top of `.gf-table`:

- **Sorting:** `th[aria-sort]` holds `.gf-sort` buttons with a caret icon; `components.js` sorts the rows, numerically for `.gf-num` columns.
- **Row selection:** a `.gf-select` checkbox column plus a select-all box that turns indeterminate when only some rows are selected. Selected rows get `aria-selected="true"`.
- **Toolbars:** `.gf-table-toolbar--selection` with `data-gf-selection` and `data-gf-count` shows "N selected" and the bulk actions.
- **Sticky header:** `.gf-table--sticky` in `.gf-table-wrap--scroll`.
- **Footer:** `.gf-table-foot` for counts and pagination. Add `data-density="compact"` for dense tables.

## Stat `.gf-stat`

A 48px tabular `__value`, `__label` and an optional `__delta` (an arrow icon plus words, so the change is never shown by colour alone). Lay several out in `.gf-stats`. Values must be sourced; otherwise use `[x]`.

## Quote `.gf-quote`

`<figure>` holding `blockquote.gf-quote__text` (26px, 500) with a generated opening mark in tertiary ink, and `figcaption.gf-quote__by` (avatar, name, role). Only use real, approved quotes. No left-border cards.

## Awards `.gf-award`

A recognition block: a Phosphor duotone icon (trophy, medal, seal), `__title` and `__meta` (category · year), separated by a top hairline. Lay several out in `.gf-awards`.

## Data visualisation

Use the categorical colours `gf-dv-1`–`6`, the sequential ramp `gf-dv-seq-1`–`5`, `gf-dv-grid` and `gf-dv-axis`. Draw charts as inline SVG with `.gf-chart` (`.grid`, `.axis`, `.s1`–`.s6`, `.line`) plus `role="img"` and an `aria-label`, and add a `.gf-legend`. Label series directly where you can.

## Presentation layer `.gf-slide`

16:9 slides scaled with container units (`.gf-deck` > `.gf-slide` > `.gf-slide__inner`, a 12-column grid with 96px margins at 1920 wide). Type classes: `__display` 120, `__title` 72, `__h2` 48, `__body` 28, `__caption` 20, `__kicker`, `__muted`, `__foot`. Grounds: default, `--layer`, `--accent`. Each slide prints on its own page.


## Pager `.gf-pager` (added in 1.5)

Previous / next links at the end of a case study, article or docs page. A `<nav aria-label="More projects">` holding up to two real links: `.gf-pager__link--prev` (left) and `.gf-pager__link--next` (right), each with a `.gf-pager__label` ("Previous" / "Next"), a `.gf-pager__title` and a `ph-bold ph-caret-left|right` `.gf-pager__icon`. Either side may be missing; the next link stays on the right. The title draws the editorial underline on hover and focus. Under 600px the two stack. Hit area 44px+.

```html
<nav class="gf-pager" aria-label="More projects">
  <a class="gf-pager__link gf-pager__link--prev" href="starbucks.html"><span class="gf-pager__label">Previous</span><i class="ph-bold ph-caret-left gf-icon gf-pager__icon" aria-hidden="true"></i><span class="gf-pager__title">Starbucks</span></a>
  <a class="gf-pager__link gf-pager__link--next" href="qiddiya.html"><span class="gf-pager__label">Next</span><span class="gf-pager__title">Qiddiya</span><i class="ph-bold ph-caret-right gf-icon gf-pager__icon" aria-hidden="true"></i></a>
</nav>
```

**Fields (1.5):** focus shows a one-step border (`gf-field-border-focus`) with a soft 3px `gf-focus-halo`; hover steps up once (`gf-field-border-hover`); invalid fields keep the red border with `gf-error-halo`. Buttons, links and other controls keep the solid 2px focus ring.

**Tags (1.5):** no border; neutral text `gf-tag-fg`, status text `gf-success-fg` / `gf-warning-fg` / `gf-error-fg` on their tints (all at least 5.9:1). Corners stay 4px: round means clickable.


## Added in 1.6

### Input group `.gf-input-group`
Wrap any `.gf-input` to add a prefix or suffix (`.gf-input-group__affix`, e.g. `https://`, `£`, `GBP`) or a clear button (`.gf-input-group__clear`, needs a `placeholder` so it hides when empty). The group draws the border, hover and focus halo; the input inside is borderless.

### Combobox `.gf-combobox`
A searchable select. Markup: label, an input group holding `ph-magnifying-glass` (`.gf-combobox__icon`), an input with `role="combobox" aria-expanded aria-controls aria-autocomplete="list" autocomplete="off"`, and a `.gf-combobox__toggle`; then `<ul class="gf-combobox__list" role="listbox" hidden>` of `.gf-combobox__option[role="option"]` (optional `data-value`) and a `.gf-combobox__empty` row. `components.js`: focus or click opens, typing filters, ↑/↓ move, Enter picks, Esc restores the last value, Tab and blur close; the picked row gets a check; result counts are announced. Fires `gf-change` with `detail.value`. Use `.gf-select` for short fixed lists, where the phone's own picker is better.

### Choicebox `.gf-choicebox`
A `<fieldset>` of `.gf-choice` cards, each a `<label>` with a radio or checkbox, `.gf-choice__title` and `.gf-choice__desc`. Selected: ink border, doubled. Focus ring on the whole card.

### Copy `[data-gf-copy]`
`<button class="gf-btn gf-btn--secondary gf-btn--sm gf-copy" data-gf-copy="text">` with `.gf-copy__idle` and `.gf-copy__done` icon and label pairs; or `.gf-copytext` with a `.gf-copytext__value` and an icon-only `.gf-copy` (empty `data-gf-copy` copies the value). Shows the done state for 2s and announces "Copied to clipboard".

### Theme switcher `.gf-theme-switch`
A `.gf-segmented.gf-theme-switch` fieldset of three radios (`system`, `light`, `dark`) with `ph-desktop`, `ph-sun`, `ph-moon` and an `aria-label` each. Remembered in `localStorage` (`gf-theme`). Logos: `<img src="wordmark-black.svg" data-gf-logo-dark="wordmark-white.svg">` swaps with the theme; `<meta name="theme-color">` follows. Put the one-line snippet from `examples/forms.html` in `<head>` so a saved theme applies before first paint.

### Video `.gf-video`
`<figure class="gf-video">` with `<video playsinline muted loop preload="metadata" poster data-gf-autoplay aria-label>`, an MP4 `<source>`, a captions `<track>`, a `.gf-video__toggle` (`.gf-icon-btn--on-media`) and an optional `<figcaption>`. Autoplays muted only with `data-gf-autoplay` and never under Reduce Motion; the toggle pauses and plays. Ratio via the local `--ratio` property on the figure (default 16 / 9). Showreels with sound: use native `controls` instead, never autoplay.
## Fixed in 1.7.1

The Video component's overlay toggle (`.gf-icon-btn--on-media`) no longer shows a
fixed white ring at rest; it now changes to light grey on hover/press instead
(`--gf-media-btn-bg-hover` / `--gf-media-btn-bg-pressed`), and its keyboard focus
outline always uses the button's own ink colour rather than the page's focus-ring
token, so Raggio never appears on it in dark theme.

## Added in 1.7

### Banner `.gf-banner`
A persistent project-wide notice about a state that needs resolving — overdue billing, an active rollback, attack mitigation. Never dismissable: if a message can be dismissed without the underlying state resolving, use Alert instead. Show only one at a time. `<div class="gf-banner gf-banner--warning">` with an icon, `.gf-banner__text` and an optional `.gf-banner__cta` button. Variants: default (neutral), `--success`, `--warning`, `--error`.

### Show more `.gf-showmore`
Progressive disclosure for one long list — recent activity, branches, attached resources. Not for sibling pages of the same set (use Pagination) or an optional section (use Accordion). Shows the first 5 rows; `components.js` reveals the rest and moves focus into the first newly-shown row. Never re-collapses once opened. `<div class="gf-showmore"><ul class="gf-showmore__list">…8–10 rows…</ul><button class="gf-showmore__trigger" aria-expanded="false"><span class="gf-showmore__text"></span><i class="ph-bold ph-caret-down"></i></button></div>`. `data-gf-more` / `data-gf-less` on the trigger override the default "Show N more" / "Show less" labels. `--noborder` drops the top rule.

### Entity `.gf-entity` / `.gf-entity-list`
A row of up to two columns: descriptive content on the left (`.gf-entity__left` — avatar or icon, `.gf-entity__body` with `__title` and `__desc`), one or two controls on the right (`.gf-entity__right`). Not for sortable tabular data (use Table) or static key/value facts (use Description). Selectable rows (`--selectable`) wrap the left column in a `<label>` holding the checkbox, so the whole left side toggles it; the right-side control stays a separate interactive element outside the label.

```html
<div class="gf-entity-list">
  <div class="gf-entity gf-entity--selectable">
    <label class="gf-entity__left">
      <input type="checkbox" aria-label="Acme Inc.">
      <span class="gf-avatar gf-avatar--sm">A</span>
      <span class="gf-entity__body"><span class="gf-entity__title">Acme Inc.</span><span class="gf-entity__desc">acme.example.com</span></span>
    </label>
    <span class="gf-entity__right"><button type="button" class="gf-btn gf-btn--secondary gf-btn--sm">Remove</button></span>
  </div>
</div>
```

### Multi select `.gf-multiselect`
A trigger button that opens a listbox of checkable rows; the trigger summarises the selection ("None selected" / one name / "n selected" / "All selected"). Simplified from Vercel's two-axis keyboard model (checkbox and action each independently focusable): here the row itself (`role="option"`) is the one focusable, selectable unit, moved with ↑/↓/Home/End and toggled with Enter/Space/click; the checkbox is a decorative echo of `aria-selected` (`aria-hidden`, `tabindex="-1"`). Each row can carry one `.gf-multiselect__action` ("Only") that selects just that row — shown on hover/focus. Esc or an outside click closes; Tab closes and moves on. Fires `gf-change` with `detail.values`.

```html
<div class="gf-multiselect" data-open="false">
  <button type="button" class="gf-multiselect__trigger" aria-haspopup="listbox" aria-expanded="false" id="ms-1">
    <span class="gf-multiselect__summary"></span><i class="ph-bold ph-caret-down gf-icon" aria-hidden="true"></i>
  </button>
  <div class="gf-multiselect__list" role="listbox" aria-multiselectable="true" hidden aria-labelledby="ms-1">
    <div class="gf-multiselect__row" role="option" aria-selected="true">
      <input type="checkbox" class="gf-multiselect__check" checked value="design" aria-hidden="true" tabindex="-1">
      <span class="gf-multiselect__label">Design</span>
      <button type="button" class="gf-multiselect__action">Only</button>
    </div>
  </div>
</div>
```

### Gauge `.gf-gauge`
A circular SVG ring for a percentage. `role="progressbar"` with `aria-valuemin/max/now`, paired with `aria-labelledby`. Sizes `--tiny` (24px, no number), `--sm`, `--md`, `--lg`. Default tone is monochrome (`gf-control-on`) — Raggio stays out of it, matching the rule that colour is reserved for the primary CTA, the highlight and the focus ring. `components.js` reads the value and sets `data-tone="warning"` at 80% and `"danger"` at 95% (override with `data-gf-warning` / `data-gf-danger`, or set `data-tone` by hand). `--indeterminate` spins a quarter arc for an unknown value — omit `aria-valuenow` and add nearby text such as "Calculating usage…".

```html
<div class="gf-gauge gf-gauge--md" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="88" aria-labelledby="g1-label">
  <svg viewBox="0 0 36 36"><circle class="gf-gauge__track" cx="18" cy="18" r="16"></circle><circle class="gf-gauge__fill" cx="18" cy="18" r="16"></circle></svg>
  <span class="gf-gauge__value"></span>
</div>
<span id="g1-label" class="gf-visually-hidden">Storage used 88%</span>
```

### Two existing patterns, not new components
**Dots menu:** a kebab icon trigger opening the existing `Menu` — `<button class="gf-icon-btn" popovertarget="m1" aria-haspopup="menu" aria-expanded="false" aria-label="More actions"><i class="ph-bold ph-dots-three"></i></button>` + `<div class="gf-menu" id="m1" popover role="menu">…</div>`. No new classes.
**Filter params:** the existing `Chips` component (`.gf-chips[role=group]` of `.gf-chip[aria-pressed]`) already is Vercel's "Filter Params" pattern — toggle chips reflected in the URL or request state by your own code.
