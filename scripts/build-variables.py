#!/usr/bin/env python3
"""Generate tokens/variables.css from tokens/tokens.json (the single source). Run after every token change:
   python3 scripts/build-variables.py && python3 scripts/check-tokens.py"""
import json, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
t = json.loads((root/'tokens/tokens.json').read_text())
st, th = t['static'], t['themed']
def ref(v, k=None):  # "fs-12" style references become var(--gf-fs-12)
    v = str(v)
    return f'var(--gf-{v})' if v in st and v != k and not re.fullmatch(r'[0-9.]+', v) else v
def decl(k, v): return f'  --gf-{k}: {v};'
static = []
for k, v in st.items():
    if k in ('type', 'breakpoints'): continue
    static.append(decl(k, ref(v, k)))
for r, d in st['type'].items():
    for p in ('size', 'line', 'track', 'weight'):
        static.append(decl(f'type-{r}-{p}', ref(d[p])))
def theme(name): return [decl(k, v[name]) for k, v in th.items()] + [f'  color-scheme: {name};']
L = ['/* DS-geofreitas.com — variables.css v' + t['meta']['version'] + ' — GENERATED from tokens/tokens.json by scripts/build-variables.py. Do not edit by hand.',
     '   Theme: light by default; follows the OS dark setting; force with data-theme="light" | "dark" (or .dark).',
     '   Density: data-density="compact". Contrast: follows prefers-contrast: more. */', '',
     '@import url("../assets/fonts/fonts.css");', '@import url("../assets/icons/phosphor/phosphor.css");', '',
     ':root {', *static, '', *theme('light'), '}', '',
     '[data-theme="light"] {', *theme('light'), '}', '',
     '[data-theme="dark"], .dark {', *theme('dark'), '}', '',
     '@media (prefers-color-scheme: dark) {', '  :root:not([data-theme="light"]) {', *['  ' + l for l in theme('dark')], '  }', '}', '',
     '[data-density="compact"] {', *[decl(k, ref(v)) for k, v in t['density']['compact'].items()], '}', '']
for q, d in t['responsive'].items():
    L += [f'@media ({q}) {{', '  :root { ' + ' '.join(f'--gf-{k}: {ref(v)};' for k, v in d.items()) + ' }', '}', '']
cm = t['contrast-more']
L += ['@media (prefers-contrast: more) {',
      '  :root, [data-theme="light"] { ' + ' '.join(f'--gf-{k}: {v};' for k, v in cm['light'].items()) + ' }',
      '  [data-theme="dark"], .dark { ' + ' '.join(f'--gf-{k}: {v};' for k, v in cm['dark'].items()) + ' }', '}', '']
(root/'tokens/variables.css').write_text('\n'.join(L))
print('variables.css generated:', len(L), 'lines')
