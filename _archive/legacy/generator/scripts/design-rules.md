## Rules

### Color and contrast
- Body text must reach at least 4.5:1 against its background; large text (18px+ or 14px bold), icons and focus indicators at least 3:1.
- Verified pairs: `#111318` on `#ffffff` 18.6:1 · `#5a6275` on `#ffffff` 6.1:1 · `#ffffff` on `#303030` 13.2:1 · `#111318` on `#fefa54` 16.8:1 · `#fefa54` on `#303030` 12.0:1.
- `#fefa54` is a highlight, never a wash. Use it for at most one element per viewport or slide: an active marker, a badge, an underline, or an accent word on a dark surface.
- Never use `#fefa54` as a light-mode button background or as text on a light surface (1.1:1 on white).
- Never rely on color alone for state; pair it with text, an icon or a shape change.
- Use only registered palette values. Functional colors (success, warning, error) come from the token files and are not brand colors.

### Typography
- Display and headings: Poppins 600/700, tight leading (1.1–1.25), letter-spacing −0.01 to −0.02em at 32px and above.
- Body and UI: Poppins 400/500, line height 1.5–1.6, line length 60–75 characters on desktop.
- Scale: 12 / 14 / 16 / 18 / 22 / 26 / 32 / 38 / 48 / 64px. Body copy on screens is 16px minimum; 14px only for dense UI and metadata.
- Headlines are plain text. Never paste markdown syntax (`**`, `-`, `#`) into headline, tagline or summary fields.
- Load Poppins (400, 500, 600, 700) as a web font and keep the declared fallback stack so text renders if loading fails.

### Spacing and grid
- 8px base grid: 8, 16, 24, 32, 48, 64px; 4px only for icon-to-label gaps.
- 12-column grid, max content width 1120–1200px, gutters 24px (desktop) and 16px (mobile).
- Sections are separated by 64px+ and a tonal surface shift, not by shadows.

### Shape and elevation
- Corner radius 8px for controls and cards; 12px for large panels; full radius for pills and avatars only.
- Borders are 1px `#e2e5ec` (light) or `#2a2f3c` (dark).
- Shadows are reserved for floating layers (menus, dialogs) and stay soft and low-opacity.

### Components
- **Primary button:** `#303030` background, `#ffffff` text, 8px radius; hover `#4a4a4a`, pressed `#1f1f1f`. One primary button per view.
- **Secondary button:** `#ffffff` background, 1px `#e2e5ec` border, `#111318` text.
- **Text link:** `#5a6275`, darkening to `#111318` on hover; never lighter on hover.
- **Badge / highlight:** `#fefa54` background with `#111318` text, used sparingly.
- **Tags and pills:** neutral tags `#f5f5f5` fill, `#111318` text, 1px `#e0e0e0` border. Status tags reuse the alert tints with `#111318` text: success `#defbe6` / `#a7f0ba`, warning `#fcf4d6` / `#fddc69`, error `#fff1f1` / `#ffb3b8`. Never a mid-grey fill.
- **Avatars and label boxes:** `#f5f5f5` fill, `#111318` initials or text, 1px `#e0e0e0` border.
- **Info alert:** `#f5f5f5` fill with a 1px `#e0e0e0` border; success, warning and error alerts use the same tints as their tags.
- **Form fields:** 1px `#e2e5ec` border, `#111318` input text, labels in `#5a6275`; focus moves the border to `#303030` with a visible ring; errors use text plus color.
- **Focus:** every interactive element shows a visible focus ring of at least 3:1.

### Pitch deck and landing pages
- Light slides: `#ffffff` or `#f6f7f9` ground, `#111318` headlines, `#5a6275` supporting copy.
- Accent slides (cover, traction, ask): `#303030` ground, `#ffffff` headlines and figures; `#fefa54` only for one highlight word, kicker rule or marker.
- Calls to action on accent slides use a `#ffffff` button with `#303030` text.
- Keep slide headers, footers and page numbers at 4.5:1 or better; no pale grey chrome text.

### Dark mode
- Ground `#141414`, elevated surface `#272727`, borders `#2a2f3c`, text `#dcdcdc`.
- Primary buttons invert to `#f6f7f9` with `#303030` text (12.3:1) so they stay visible on dark grounds.
- `#fefa54` may be used for highlights and accent text on dark grounds (16.7:1 on `#141414`).

### Motion
- 150–300ms for small interactions, ease-out on enter, ease-in on exit; respect `prefers-reduced-motion`.
