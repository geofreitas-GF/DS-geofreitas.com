A modal dialog on native `<dialog>` opened with `showModal()`: focus trap, Esc and backdrop come free.

**Provide:** `<dialog class="gf-dialog" aria-labelledby>` with `.gf-dialog__head` (title + close icon button), content, and `.gf-dialog__actions` (secondary then primary). 520px max, 12px radius, `gf-shadow-float`, `gf-scrim` backdrop, 300ms entrance (none under reduced motion).

**Don't:** stack dialogs; use for content that should be a page.
