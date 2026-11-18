The photo-first project card (Airbnb pattern, this system's radii): 4:3 media at 8px, no shadow, a 4px metadata stack below.

**Provide:** `<a class="gf-card" href>` with `<img class="gf-card__media" alt>` and `<div class="gf-card__meta">` holding `__title` (16/600), `__sub` (14 secondary) and `__detail` (12 tertiary). Lay several in `.gf-cards` (4 → 3 → 2 → 1 columns).

**States:** hover fades the media to 92% and underlines the title; focus ring with 4px offset.

**Don't:** put text on the image; add shadows; nest a second link inside.
