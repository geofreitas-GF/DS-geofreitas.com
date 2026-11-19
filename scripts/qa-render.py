#!/usr/bin/env python3
"""
Renders a battery of component states against a given tokens.css +
components.css pair and reports anything that would otherwise only be
caught by a person looking at a screenshot: fonts falling back off
Poppins, elements collapsing to zero size, native form controls left
unstyled, and broken image references.

This is not a general visual-regression suite. It encodes the specific
failure classes that have actually hit this project — each check below
is named after the bug it would have caught:

  font-family-fallback   the Dialog/MultiSelect heading bug (missing
                          --gf-font-display/--gf-font-body)
  zero-size              the Gauge bug (missing --gf-gauge-* tokens)
  native-checkbox        the blue-checkbox bug (missing appearance: none
                          on .gf-multiselect__check / entity input)
  broken-image            the Gallery/IconButton bug (a blob reference
                          that doesn't resolve)
  console-error           anything JS-level that fails silently otherwise

Usage:
  python3 scripts/qa-render.py <tokens.css> <components.css> [--out DIR]
                                [--image-base URL]

--image-base lets you point <img> fixtures at real asset URLs (e.g. an
artifact's /_blob/<id> paths) to check they actually load; without it the
broken-image check is skipped since there's nothing live to test against.

Exits 1 on any failure. Always prints where the screenshots landed —
look at them too; this script catches what's checkable, not everything.
"""
import argparse
import functools
import http.server
import shutil
import sys
import threading
from pathlib import Path

FIXTURES_HTML = """<!doctype html>
<html data-theme="{theme}">
<head><meta charset="utf-8">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<style>body{{margin:0;padding:24px;display:flex;flex-direction:column;gap:16px;max-width:360px}}</style>
</head>
<body>
  <h1 class="gf-h1" data-qa="heading">Heading</h1>
  <h4 class="gf-h4" data-qa="h4">Sub-heading</h4>
  <p class="gf-body" data-qa="body">Body text</p>
  <input class="gf-input" data-qa="input-rest" placeholder="rest">
  <input class="gf-input" data-qa="input-error" aria-invalid="true">
  <label class="gf-check" data-qa="check-row"><input type="checkbox" checked data-qa="checkbox-checked"> Checked</label>
  <div class="gf-multiselect__row" data-qa="ms-row"><input type="checkbox" class="gf-multiselect__check" checked data-qa="ms-checkbox" tabindex="-1"><span>Row</span></div>
  <div class="gf-gauge gf-gauge--lg" data-qa="gauge-lg"><svg viewBox="0 0 36 36"><circle class="gf-gauge__track" cx="18" cy="18" r="16"></circle><circle class="gf-gauge__fill" cx="18" cy="18" r="16"></circle></svg></div>
  <button class="gf-icon-btn gf-icon-btn--on-media" data-qa="media-btn" type="button">x</button>
  {image_fixture}
</body></html>"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("tokens_css")
    ap.add_argument("components_css")
    ap.add_argument("--out", default="/tmp/qa-render")
    ap.add_argument("--image-base", default=None, help="A real image URL to check actually loads (the broken-image check)")
    args = ap.parse_args()

    out = Path(args.out)
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    shutil.copy(args.tokens_css, out / "tokens.css")
    shutil.copy(args.components_css, out / "components.css")

    image_fixture = f'<img src="{args.image_base}" data-qa="asset-check" style="width:80px;height:80px;object-fit:cover">' if args.image_base else ""

    for theme in ("light", "dark"):
        (out / f"test-{theme}.html").write_text(
            FIXTURES_HTML.format(theme=theme, image_fixture=image_fixture), encoding="utf-8"
        )

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright not installed in this environment; install it before running this script.")
        sys.exit(2)

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(out))
    httpd = http.server.HTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_port
    threading.Thread(target=httpd.serve_forever, daemon=True).start()

    failures: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        for theme in ("light", "dark"):
            page = browser.new_page(viewport={"width": 420, "height": 560})
            # Resource 404s (missing font/icon files in this isolated harness) are a
            # separate concern from script errors, and the harness doesn't carry the
            # full asset tree — only flag genuine script-level console errors here.
            console_errors: list[str] = []
            page.on(
                "console",
                lambda m: console_errors.append(m.text)
                if m.type == "error" and "Failed to load resource" not in m.text
                else None,
            )
            page.goto(f"http://127.0.0.1:{port}/test-{theme}.html")
            page.wait_for_timeout(350)

            # font-family-fallback: headings/body must resolve to Poppins, never a
            # browser serif/system default (the signature of an undefined --gf-font-* var)
            for sel in [".gf-h1", ".gf-h4", ".gf-body"]:
                ff = page.eval_on_selector(sel, "el => getComputedStyle(el).fontFamily")
                if "Poppins" not in ff:
                    failures.append(f"[{theme}] font-family-fallback: {sel} resolved to '{ff}', expected Poppins")

            # zero-size: a sized component must render at its known fixed size, not
            # 0 (what you'd expect from an undefined var) and not an unconstrained
            # auto-size either — an undefined width/height on an inline-grid element
            # with a 100%-width SVG child actually stretches to fill its container,
            # which is the real signature this project hit (a flattened oval, not an
            # invisible element), so check against the expected px value, not just 0.
            expected_sizes = {".gf-gauge--lg": 64}
            for sel, expected_px in expected_sizes.items():
                box = page.eval_on_selector(sel, "el => ({w: el.offsetWidth, h: el.offsetHeight})")
                if box["w"] != expected_px or box["h"] != expected_px:
                    failures.append(
                        f"[{theme}] zero-size: {sel} rendered at {box['w']}x{box['h']}, expected {expected_px}x{expected_px}"
                    )

            # native-checkbox: decorative/row checkboxes must be restyled (appearance: none),
            # not left as bare native controls
            for sel in ["[data-qa=checkbox-checked]", "[data-qa=ms-checkbox]"]:
                appearance = page.eval_on_selector(sel, "el => getComputedStyle(el).appearance")
                if appearance not in ("none",):
                    failures.append(f"[{theme}] native-checkbox: {sel} appearance is '{appearance}', expected 'none'")

            # broken-image: only runs when --image-base was given
            if args.image_base:
                ok = page.eval_on_selector(
                    "[data-qa=asset-check]", "el => el.complete && el.naturalWidth > 0"
                )
                if not ok:
                    failures.append(f"[{theme}] broken-image: {args.image_base} did not load")

            if console_errors:
                failures.append(f"[{theme}] console-error: {console_errors}")

            page.screenshot(path=str(out / f"result-{theme}.png"))
            page.close()
        browser.close()
    httpd.shutdown()

    print(f"Screenshots: {out}/result-light.png, {out}/result-dark.png")
    if failures:
        print("QA RENDER: FAIL")
        for f in failures:
            print(" -", f)
        sys.exit(1)
    print("QA RENDER: PASS")


if __name__ == "__main__":
    main()
