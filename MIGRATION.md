# Migrating from the legacy system (`--brand-*`, generator) to 1.0 (`--gf-*`, hand-owned)

The legacy system is the generated pre-1.0 kit archived in `_archive/legacy/`.

## Quick path (nothing breaks)

Load `tokens/legacy-compat.css` after `tokens/variables.css`. It maps all 75 `--brand-*` variables that the legacy kit and sample pages use onto 1.0 tokens, including dark mode.

```html
<link rel="stylesheet" href="tokens/variables.css">
<link rel="stylesheet" href="tokens/legacy-compat.css">
```

## Full path (recommended for new and rebuilt pages)

1. Replace inline `style="…var(--brand-…)"` markup with 1.0 classes (`docs/components.md`).
2. Delete the legacy `!important` override blocks: the protected states are now `.gf-btn--primary`, `.gf-link` and `.gf-avatar`.
3. Remove `legacy-compat.css` once `grep -r -- '--brand-' your-site/` returns nothing.

## Visible differences when the compat layer is used

| Legacy | 1.0 | Why |
|---|---|---|
| Light primary hover `#4a4a4a` (`--brand-color-primary-hover`) | Volt `#fefa54` | The kit's custom hover is now the rule |
| `--brand-color-primary-contrast` `#ffffff` | Volt text | Matches the kit's charcoal + volt primary |
| Control heights 24 / 32 / 40 | 34 / 40 / 48 | 1.0 button and input sizes |
| Radii 3 / 5 / 8 / 10 | 4 / 8 / 12 + pill | Three-tier radius |
| Heading sizes 40 / 32 / 24 / 20 | 38 / 32 / 26 / 22 | Nearest 1.0 scale steps |
| `--brand-size-md` 20px | 24px | No 20px step on the 8px grid |
| Status solids `#52c41a` / `#faad14` | Their status border tints | The solids failed 3:1 as icons or bars on white |
| Input borders `#e2e5ec` | `#8d8d8d` (`--gf-border-control`) | Field boundaries now meet 3:1 (WCAG 1.4.11) |

## Version policy

- **Patch (1.0.x):** value fixes that don't change the look.
- **Minor (1.x):** new tokens or components; nothing removed.
- **Major (2.0):** a renamed or removed token, or a changed protected decision. It needs a migration table like the one above.

Run `python3 scripts/check-tokens.py` before every version bump. It fails on token drift, undefined variables, hardcoded colours in components, or any contrast pair below its minimum. Keep `claude-design/` in step: after a change, update the Claude Design system and copy its files here.
