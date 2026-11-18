A searchable select: type to filter, ↑/↓ to move, Enter to pick, Esc to restore the last value. The picked row shows a check; result counts are announced. Behaviour comes from `components.js`.

**Provide:** label; `.gf-input-group` with `.gf-combobox__icon` (`ph-magnifying-glass`), an input `role="combobox" aria-expanded aria-controls aria-autocomplete="list" autocomplete="off"` and a `.gf-combobox__toggle`; `<ul class="gf-combobox__list" role="listbox">` of `.gf-combobox__option[role="option"]` plus a `.gf-combobox__empty` row.

**Do:** use it when the list is long or people know what they are looking for. **Don't:** use it for 2–6 fixed options (use `.gf-select`, segmented or choicebox).
