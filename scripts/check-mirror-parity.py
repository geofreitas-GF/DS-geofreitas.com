#!/usr/bin/env python3
"""
Diffs the custom properties components.css actually uses (var(--x)) against
what a mirror's tokens.css defines (--x: ...). This is the specific check
that would have caught every mirror-drift bug found in the 2026-11-18/19
session: the missing Phosphor import, the missing --gf-font-display/
--gf-font-body aliases, the missing --gf-gauge-* size tokens, and the
missing --gf-media-btn-bg-hover/-pressed tokens.

A var() referencing an undefined custom property does NOT error or warn —
it silently falls back to the inherited/initial value (serif fonts,
collapsed width/height, invisible colour). Nothing in the console says so.
That is why this has to be checked explicitly, every release, not spotted
by eye.

Usage:
  python3 scripts/check-mirror-parity.py <path-to-mirror-tokens.css> [more paths...]

The mirror tokens.css files live in artifacts (the Claude Design System
artifact, the Showcase canvas, the Homepage canvas), not in this repo, so
this script can't reach them directly. Fetch each one's current tokens.css
to a local scratch path first (read_file), then run this against those
local copies — before publishing, not after a bug report.

Exits 1 if any mirror is missing a variable components.css references.
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
COMPONENTS_CSS = REPO_ROOT / "components" / "components.css"

# Names that are legitimately set per-instance via inline style="--x: ..."
# (e.g. a gauge's fill offset, a progress bar's percent) rather than being
# global design tokens. A real gap here would be a false negative, so only
# add a name after confirming by hand that it is genuinely per-instance.
INLINE_ONLY = {"gauge-offset", "progress", "ratio", "value"}


def used_vars(css_text: str) -> set[str]:
    return set(re.findall(r"var\(--([a-zA-Z0-9-]+)", css_text))


def defined_vars(css_text: str) -> set[str]:
    return set(re.findall(r"--([a-zA-Z0-9-]+)\s*:", css_text))


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)

    used = used_vars(COMPONENTS_CSS.read_text(encoding="utf-8")) - INLINE_ONLY
    failed = False

    for mirror_path in sys.argv[1:]:
        mirror = Path(mirror_path)
        defined = defined_vars(mirror.read_text(encoding="utf-8"))
        missing = sorted(used - defined)
        if missing:
            failed = True
            print(f"FAIL  {mirror}")
            for name in missing:
                print(f"        --{name}  (used in components.css, not defined here)")
        else:
            print(f"OK    {mirror}  ({len(used)} variables checked)")

    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
