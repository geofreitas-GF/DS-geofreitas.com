An action list opened from a button, on the native `[popover]` top layer.

**Provide:** a trigger `<button popovertarget="id" aria-haspopup="menu" aria-expanded>` and `<div class="gf-menu" id popover role="menu">` of `.gf-menu__item[role=menuitem]` (icon + label, optional `.gf-menu__meta`), `.gf-menu__sep` and `.gf-menu__label`. Your code positions it under the trigger and handles ↑/↓/Home/End; Esc and outside clicks close it (native).

**States:** hover/focus `gf-bg-layer-1` (focus adds an inset ring); `aria-disabled` 40%; `--danger` tints only the icon. Enters on `gf-spring-snappy`.
