Text tabs with a 2px ink underline on the selected tab (Airbnb pattern, never volt), following the WAI-ARIA tabs pattern.

**Provide:** `.gf-tabs[role=tablist]` of `<button class="gf-tab" role="tab" aria-selected aria-controls>` and matching `.gf-tabpanel[role=tabpanel]` (others `hidden`). Your code sets `aria-selected`, roving `tabindex`, and ←/→/Home/End.

**States:** hover = ink text + grey underline; selected = ink, 600, ink underline; focus = inset ring.
