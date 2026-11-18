A scroll-snap carousel (Airbnb pattern): swipe, on-media previous/next buttons and dots.

**Provide:** `.gf-carousel` (+ `--cards` for three-up cards) → `__track` of `__slide`s, `.gf-icon-btn--on-media.gf-carousel__prev/__next`, `__dots` of `__dot` buttons (`aria-current="true"` active, each with `aria-label`). Your code scrolls on click and syncs the dots; instant under Reduce Motion.
