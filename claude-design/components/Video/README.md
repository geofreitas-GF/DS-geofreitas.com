A case-study player: muted loop with a poster and captions, a pause control on the frame and 12px corners. Autoplays only with `data-gf-autoplay`, never under Reduce Motion.

**Provide:** `<figure class="gf-video">` with `<video playsinline muted loop preload="metadata" poster aria-label>`, an MP4 `<source>`, a captions `<track>`, a `.gf-video__toggle` (`.gf-icon-btn--on-media`) and an optional `<figcaption class="gf-caption">`. Ratio via the local `--ratio` property (default 16 / 9).

**Don't:** autoplay anything with sound; showreels with sound use native `controls`.
