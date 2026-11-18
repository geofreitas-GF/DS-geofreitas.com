#!/usr/bin/env python3
"""Parity + contrast check: tokens/tokens.json vs tokens/variables.css, and every var() used in components.css is defined.
Run: python3 scripts/check-tokens.py   (exit 1 on any failure)"""
import json, re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
t = json.loads((root/'tokens/tokens.json').read_text())
css = (root/'tokens/variables.css').read_text()
comp = (root/'components/components.css').read_text()
fails = []
def block(sel):
    m = re.search(re.escape(sel) + r'\s*\{(.*?)\n\}', css, re.S); return m.group(1) if m else ''
light, dark = block(':root'), block('[data-theme="dark"], .dark')
def val(blk, k):
    m = re.search(r'--gf-' + re.escape(k) + r':\s*([^;]+);', blk); return m.group(1).strip() if m else None
for k, v in t['themed'].items():
    for theme, blk in (('light', light), ('dark', dark)):
        got = val(blk, k)
        if got is None or got.lower() != v[theme].lower(): fails.append(f'themed {k}.{theme}: json={v[theme]} css={got}')
for k, v in t['static'].items():
    if isinstance(v, dict): continue
    got = val(light, k)
    if got is None: fails.append(f'static {k}: missing in css'); continue
    exp = f'var(--gf-{v})' if re.fullmatch(r'[a-z]+(-[a-z0-9]+)+', v) and val(light, v) is not None else v
    if got.replace(' ', '') not in (exp.replace(' ', ''), v.replace(' ', '')): fails.append(f'static {k}: json={v} css={got}')
defined = set(re.findall(r'--gf-([a-z0-9-]+):', css))
for u in sorted(set(re.findall(r'var\(--gf-([a-z0-9-]+)', comp + css)) - defined): fails.append(f'undefined var --gf-{u}')
for h in re.findall(r'#[0-9a-fA-F]{3,6}\b', comp): fails.append(f'hardcoded hex in components.css: {h}')
def L(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= 0.03928 else ((x+0.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def ratio(a, b): a, b = L(a), L(b); return (max(a, b)+.05)/(min(a, b)+.05)
th = t['themed']
pairs = [('text-primary', 'bg-canvas', 4.5), ('text-secondary', 'bg-canvas', 4.5), ('text-tertiary', 'bg-canvas', 4.5),
         ('text-secondary', 'bg-layer-1', 4.5), ('primary-fg', 'primary-bg', 4.5), ('primary-fg-hover', 'primary-bg-hover', 4.5),
         ('border-control', 'bg-canvas', 3), ('control-off', 'bg-canvas', 3), ('control-on', 'bg-canvas', 3),
         ('focus-ring', 'bg-canvas', 3), ('control-mark', 'control-on', 3), ('status-fg', 'success-bg', 4.5),
         ('status-fg', 'warning-bg', 4.5), ('status-fg', 'error-bg', 4.5), ('tag-fg', 'tag-bg', 4.5), ('error-solid', 'bg-canvas', 3),
         ('tooltip-fg', 'tooltip-bg', 4.5), ('text-primary', 'nav-active-bg', 4.5), ('text-secondary', 'bg-elevated', 4.5),
         ('chip-selected-fg', 'chip-selected-bg', 4.5), ('text-primary', 'row-selected', 4.5), ('slide-accent-fg', 'slide-accent-bg', 4.5), ('slide-accent-muted', 'slide-accent-bg', 4.5), ('dv-axis', 'bg-canvas', 4.5)]
pairs += [(f'dv-{i}', 'bg-canvas', 3) for i in range(1, 7)]
for theme in ('light', 'dark'):
    for fg, bg, need in pairs:
        r = ratio(th[fg][theme], th[bg][theme])
        if r < need: fails.append(f'contrast {theme} {fg} on {bg}: {r:.2f} < {need}')
print('\n'.join(fails) if fails else 'OK — tokens in parity, no undefined vars, no hardcoded hex, all contrast pairs pass')
sys.exit(1 if fails else 0)
