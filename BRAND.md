# geO freitas — Brand Guide

> The brand says it. The experience proves it.

geO freitas is a multidisciplinary creative and design leader with 25+ years of experience. The work turns creative vision into measurable commercial growth through systems thinking, digital product ecosystems and AI-driven creative leadership. This guide tells a design agent how to produce work that looks and sounds like the brand without asking again.

Source: https://geofreitas.com/ (re-measured 2026-11-13), plus the user's pasted `context/input-DESIGN.md` and their explicit decisions in this project. Where the live site and a user decision differ, the user decision wins; both are recorded below.

## 1. Identity

- **Wordmark:** `logos/wordmark-black.svg` (178×72 viewBox). Black letterforms with a single `#fefa54` highlight mark.
- **On dark grounds:** `logos/wordmark-white.svg`.
- **Compact mark:** `logos/loading-mark.svg` (40×20), from the site's loading screen.
- **Raster fallback:** `logos/footer-logo-black.png` (2400×537).
- **Favicon:** `logos/favicon.svg` (32×32).
- Never recolour the letterforms, never set the yellow mark in another colour, and keep clear space of at least the mark's height on every side.

## 2. Colour

| Role | Hex | OKLCH | Use |
| --- | --- | --- | --- |
| background | `#ffffff` | 100% 0 0 | Page canvas |
| surface | `#f6f7f9` | 97.6% 0.003 264.5 | Cards, panels |
| muted | `#eceef2` | 94.9% 0.006 264.5 | Chips, subtle fills |
| border | `#e2e5ec` | 92.2% 0.010 267.4 | 1px hairlines (dark mode `#2a2f3c`) |
| foreground | `#111318` | 18.7% 0.011 268.1 | Headings and body |
| text-secondary | `#5a6275` | — | Captions, metadata, links |
| accent | `#303030` | 30.9% 0 0 | Primary buttons and active controls, text `#ffffff` |
| accent-secondary | `#fefa54` | 96.0% 0.179 108.0 | Brand highlight only |

**Measured on the live site:**
- Dominant text colour is `#333333`. This system deepens it to `#111318` for contrast.
- Black `#000000` and white are used for full-bleed sections.
- `#fefa54` appears in the wordmark and as highlighted text. A slightly lighter `#feff6e` (sometimes at 97% opacity) is used as a navigation and hover background.
- Panels use `#efefef`. Greys `#848484` and `#a8a8a8` appear for minor text; both fail 4.5:1 on white, so they are not part of this system.

**Contrast pairs:**
- `#111318` on `#ffffff`: 18.6:1
- `#5a6275` on `#ffffff`: 6.1:1
- `#ffffff` on `#303030`: 13.2:1
- `#111318` on `#fefa54`: 16.8:1
- `#fefa54` on `#303030`: 12.0:1

**The yellow rule:**
- `#fefa54` is a highlight: one marker, badge, underline, kicker rule or accent word per view.
- Pair it with `#111318` text, or place it on a dark surface.
- Never use it as a light-mode button background or as text on a light surface (1.1:1 on white).

## 3. Typography

- **Poppins** for display and body, weights 400, 500, 600 and 700, loaded from Google Fonts. Fallback stack: `system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif`.
- **Measured:** the site loads Poppins for headings and Open Sans as the body default. The site's CSS misspells the headline family as `"Poppings"` in places, so some headlines fall back to Open Sans. This system standardises on Poppins everywhere, by the user's decision.
- **Measured scale** (root 18px):
  - Hero headline: 110–120px (6.1–6.7rem)
  - Section titles: 40px (2.2rem)
  - Sub-heads: 30px (1.67rem)
  - Body: 18–20px, line height 1.67
- **System scale:** 12 / 14 / 16 / 18 / 22 / 26 / 32 / 38 / 48 / 64px.
  - Headings: 600/700, leading 1.05–1.25, tracking −0.01 to −0.025em.
  - Body: 400/500 at 16px or larger, line height 1.5–1.6, 60–75 characters per line.
- Headlines are plain text: no markdown markers.

## 4. Layout

- 12-column grid, 8px spacing scale (8, 16, 24, 32, 48, 64), max content width 1120–1200px.
- Editorial restraint: 35–40% open whitespace, low chrome, content and metrics lead.
- Separate sections with tonal surface shifts (`#ffffff` → `#f6f7f9` → `#eceef2`), not shadows.
- **Radius:** 8px for controls and cards, 12px for large panels, full radius for pills and avatars.
  - The live site uses 2px buttons and 9999px pills.
  - The 8px value comes from the pasted DESIGN.md.
- **Site patterns worth keeping:**
  - Full-bleed project covers.
  - Large confident hero statements.
  - A dense "Selected work & projects" list.
  - Capability lists with a leading arrow (➥).
  - A short career timeline.
  - Separate sections for personal experiments (music, photography, illustration).

## 5. Components

- **Primary button:** `#303030` fill with `#ffffff` text, hover `#4a4a4a`, pressed `#1f1f1f`. One per view.
- **Secondary button:** white fill, 1px `#e2e5ec` border, `#111318` text.
- **Link:** `#5a6275`, darkening to `#111318` on hover. Never lighter on hover.
- **Chips, tags and avatars:** neutral tags, avatars, the kit header label and the Info alert use `#f5f5f5` with `#111318` text and a 1px `#e0e0e0` border. Status tags match the alert tints with `#111318` text: success `#defbe6` / `#a7f0ba`, warning `#fcf4d6` / `#fddc69`, error `#fff1f1` / `#ffb3b8`. Never use a mid-grey fill such as `#6e6e6e` in light mode.
- **Forms:**
  - Labels `#5a6275`, input text `#111318`, 1px `#e2e5ec` borders.
  - Focus: `#303030` border plus a visible 2px ring.
  - Errors use the word "Error" as well as colour.
- **Pitch decks:**
  - Light slides: `#ffffff` or `#f6f7f9` grounds.
  - Accent slides: a `#303030` ground with white titles and at most one yellow highlight.
  - Call to action: a white button with `#303030` text.
  - Slide chrome (headers, footers, page numbers) stays at 4.5:1 or better.
- **Dark mode:**
  - Ground `#141414`, elevated `#272727`, text `#dcdcdc`, links `#9aa0ad`.
  - Primary buttons invert to `#f6f7f9` with `#303030` text.

## 6. Voice

- **Character:** confident, warm and human; first person; executive-ready without corporate stiffness.
- **How it reads:**
  - Short declarative headlines.
  - Generous body sentences.
  - Occasional playful sign-offs.
- **Real lines from the site:**
  - "Let's transform brands & businesses with creativity & design."
  - "My Hands, Mind and Heart are always ready to think, connect and create strong relationships between people, culture and brands."
  - "Partnering with inspiring leaders, clients and brands to transform and elevate their businesses through imagination, creativity and technology."
  - "Scroll down and let the love begin."
- **Use:** transform, creativity & design, systems thinking, ecosystem, craft, people, culture and brands, digital transformation.
- **Avoid:**
  - Buzzwords and jargon.
  - Invented metrics; use clearly labelled placeholders instead.

## 7. Imagery

Real samples live in `imagery/` and are listed in `brand.json`:
- **Client covers:** Qiddiya, Perk and Mood.
- **Product screens:** Lloyds Group Technology and mobile screens.
- **Personal work:** Capsula di Luna, L'Ombra d'Ogni Giorno and Findings in the City.

How to use them:
- Show them full bleed or in a calm grid, with natural light and no heavy filters or drop shadows.
- Never recolour client work.

## 8. Provenance and caveats

- Colours, fonts, sizes, logo files and imagery were measured from the live HTML and CSS on 2026-11-13. They were not taken from a rendered screenshot, so hover and animation states come from the CSS alone.
- Roles `surface`, `muted`, `border` and the 8px radius come from `context/input-DESIGN.md`. The primary `#303030`, Poppins for body text, the `#f5f5f5` neutral tag, avatar and label fills and the status tag tints are the user's explicit decisions.
- The rebuild derives some tokens poorly for a near-black primary. Run `node system/scripts/apply-accessible-overrides.mjs` after every `od brand finalize`.
