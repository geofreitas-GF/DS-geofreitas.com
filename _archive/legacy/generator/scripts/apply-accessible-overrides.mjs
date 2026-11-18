#!/usr/bin/env node
// Re-applies the accessible colour + type overrides on top of a fresh
// `od brand finalize` rebuild. The seed-derived palette for a near-black
// primary (#303030) produces unusable tints (e.g. a #707070 "primary bg"),
// so this script pins the primary scale, adds on-primary contrast tokens,
// the #fefa54 brand-highlight tokens, the Poppins display face, and fixes
// low-contrast text roles. Fonts: Poppins for display and body. Idempotent: safe to run repeatedly.
//
// Usage (from the project root):
//   node system/scripts/apply-accessible-overrides.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SYSTEM = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (f) => path.join(SYSTEM, f);
const read = (f) => fs.readFileSync(P(f), 'utf8');
const write = (f, s) => fs.writeFileSync(P(f), s);
const exists = (f) => fs.existsSync(P(f));

const FALLBACK = "system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const DISPLAY = `Poppins, ${FALLBACK}`;
const FONT_LINK = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" data-brand-fonts>';

export const light = {
  over: {
    colorPrimary: '#303030', colorPrimaryBg: '#f5f5f5', colorPrimaryBgHover: '#ebebeb',
    colorPrimaryBorder: '#e0e0e0', colorPrimaryBorderHover: '#bfbfbf',
    colorPrimaryHover: '#4a4a4a', colorPrimaryActive: '#1f1f1f', colorPrimaryText: '#111318',
    colorInfo: '#303030', colorInfoBg: '#f5f5f5', colorInfoBorder: '#e0e0e0',
    // Status tints shared by alerts and tag pills (user-specified)
    colorSuccessBg: '#defbe6', colorSuccessBorder: '#a7f0ba',
    colorWarningBg: '#fcf4d6', colorWarningBorder: '#fddc69',
    colorErrorBg: '#fff1f1', colorErrorBorder: '#ffb3b8',
    colorLink: '#5a6275', colorLinkHover: '#2a2f3c', colorLinkActive: '#111318',
    colorTextTertiary: '#6b6d72',
  },
  add: {
    colorPrimaryContrast: '#ffffff',
    colorTagText: '#111318',
    colorAccentSecondary: '#fefa54', colorAccentSecondaryHover: '#feff7d', colorAccentSecondaryActive: '#d9d03d',
    colorAccentSecondaryBg: '#fdfff0', colorAccentSecondaryBorder: '#fbffa6',
    colorAccentSecondaryText: '#665911', colorAccentSecondaryContrast: '#111318',
  },
  palette: ['#f5f5f5', '#ebebeb', '#d9d9d9', '#bfbfbf', '#4a4a4a', '#303030', '#1f1f1f', '#141414', '#0a0a0a', '#000000'],
};
export const dark = {
  over: {
    colorPrimary: '#f6f7f9', colorPrimaryBg: '#262626', colorPrimaryBgHover: '#303030',
    colorPrimaryBorder: '#4a4a4a', colorPrimaryBorderHover: '#6b6b6b',
    colorPrimaryHover: '#ffffff', colorPrimaryActive: '#e2e5ec', colorPrimaryText: '#f6f7f9',
    colorInfo: '#f6f7f9', colorInfoBg: '#262626', colorInfoBorder: '#4a4a4a',
    colorLink: '#9aa0ad', colorLinkHover: '#b4bac6', colorLinkActive: '#8a909c',
    colorTextTertiary: '#999999',
  },
  add: {
    colorPrimaryContrast: '#303030',
    colorTagText: '#dcdcdc',
    colorAccentSecondary: '#fefa54', colorAccentSecondaryHover: '#feff7d', colorAccentSecondaryActive: '#d9d03d',
    colorAccentSecondaryBg: '#32301a', colorAccentSecondaryBorder: '#5a5b34',
    colorAccentSecondaryText: '#fefa54', colorAccentSecondaryContrast: '#111318',
  },
  palette: ['#1a1a1a', '#262626', '#303030', '#4a4a4a', '#6b6b6b', '#f6f7f9', '#f9fafb', '#fcfcfd', '#ffffff', '#ffffff'],
};

const kebab = (k) => '--brand-' + k.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// ---------- JSON ----------
function patchTokens(file, t) {
  if (!exists(file)) return;
  const j = JSON.parse(read(file));
  const out = {};
  for (const [k, v] of Object.entries(j)) {
    if (k in t.add || k === 'fontFamilyDisplay') continue;
    out[k] = k in t.over ? t.over[k] : k === 'primaryPalette' ? t.palette : v;
    if (k === 'colorPrimaryText') Object.assign(out, t.add);
    if (k === 'fontFamily') out.fontFamilyDisplay = DISPLAY;
  }
  write(file, JSON.stringify(out, null, 2));
}
patchTokens('tokens.default.json', light);
patchTokens('tokens.compact.json', light);
patchTokens('tokens.dark.json', dark);

function patchFlat(file, isTheme) {
  const j = JSON.parse(read(file));
  const src = isTheme ? j.token : j;
  const extra = { colorTextLightSolid: '#ffffff', colorPrimaryContrast: '#ffffff', colorAccentSecondary: '#fefa54', colorAccentSecondaryContrast: '#111318', fontFamilyDisplay: DISPLAY };
  const out = {};
  for (const [k, v] of Object.entries(src)) {
    if (k in extra) continue;
    out[k] = k === 'colorPrimary' || k === 'colorInfo' ? '#303030' : v;
    if (k === 'colorPrimary') Object.assign(out, { colorTextLightSolid: extra.colorTextLightSolid, colorPrimaryContrast: extra.colorPrimaryContrast, colorAccentSecondary: extra.colorAccentSecondary, colorAccentSecondaryContrast: extra.colorAccentSecondaryContrast });
    if (k === 'fontFamily') out.fontFamilyDisplay = DISPLAY;
  }
  if (isTheme) j.token = out;
  write(file, JSON.stringify(isTheme ? j : out, null, 2));
}
patchFlat('theme.json', true);
patchFlat('seed.json', false);

// ---------- CSS custom-property blocks ----------
function patchBlock(block, t) {
  for (const [k, v] of Object.entries(t.over)) {
    block = block.replace(new RegExp(`(${kebab(k)}:\\s*)[^;]+;`), `$1${v};`);
  }
  t.palette.forEach((v, i) => {
    block = block.replace(new RegExp(`(--brand-primary-palette-${i + 1}:\\s*)[^;]+;`), `$1${v};`);
  });
  {
    const m = block.match(/^([ \t]*)(--brand-color-primary-text:[^;]+;)\r?\n/m);
    if (m) {
      const ind = m[1];
      const want = Object.entries(t.add).map(([k, v]) => [kebab(k), `${ind}${kebab(k)}: ${v};`]);
      want.push(
        ["--brand-primary", `${ind}--brand-primary: var(--brand-color-primary);`],
        ["--brand-primary-contrast", `${ind}--brand-primary-contrast: var(--brand-color-primary-contrast);`],
        ["--brand-accent-secondary", `${ind}--brand-accent-secondary: var(--brand-color-accent-secondary);`],
        ["--brand-accent-secondary-contrast", `${ind}--brand-accent-secondary-contrast: var(--brand-color-accent-secondary-contrast);`],
      );
      const missing = want.filter(([name]) => !block.includes(name + ":")).map(([, line]) => line);
      if (missing.length) block = block.replace(m[0], `${ind}${m[2]}\n${missing.join("\n")}\n`);
    }
  }

  if (!block.includes('--brand-font-family-display')) {
    block = block.replace(/^([ \t]*)(--brand-font-family:[^;]+;)\r?\n/m, (m, ind, line) => `${ind}${line}\n${ind}--brand-font-family-display: ${DISPLAY};\n`);
  }
  return block;
}
// Patch every `{ ... }` block that declares --brand-color-primary.
// Light vs dark is decided by the selector (.dark) or by file intent.
function patchAllBlocks(src, defaultTheme) {
  // Linear scan: every brace-free { ... } block that declares --brand-color-primary.
  let out = "", i = 0, count = 0, pos = 0;
  while ((pos = src.indexOf("--brand-color-primary:", pos)) !== -1) {
    const open = src.lastIndexOf("{", pos);
    const close = src.indexOf("}", pos);
    if (open < i || close === -1 || src.lastIndexOf("}", pos) > open) { pos += 1; continue; }
    const selStart = Math.max(src.lastIndexOf("}", open), src.lastIndexOf("{", open - 1), src.lastIndexOf(">", open)) + 1;
    const sel = src.slice(selStart, open);
    const t = /\.dark\b/.test(sel) || defaultTheme === dark ? dark : light;
    out += src.slice(i, open + 1) + patchBlock(src.slice(open + 1, close), t) + "}";
    i = close + 1;
    pos = i;
    count++;
  }
  return { text: out + src.slice(i), count };
}
for (const [f, t] of [['variables.css', light], ['variables.dark.css', dark]]) {
  write(f, patchAllBlocks(read(f), t).text);
}

// ---------- HTML pages ----------
function addFonts(h) {
  // drop any earlier brand font links, then add the current one
  h = h.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"><link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=[^"]*"[^>]*>\n?/g, "");
  return h.replace(/<\/head>/i, `${FONT_LINK}\n</head>`);
}
function onPrimary(h) {
  return h
    .replace(/background:var\(--brand-color-primary\);color:#fff\b/g, 'background:var(--brand-color-primary);color:var(--brand-color-primary-contrast)')
    .replace(/(background:var\(--brand-color-primary\);justify-content:flex-end"><span style="[^"]*?)background:#fff\b/g, '$1background:var(--brand-color-primary-contrast)');
}
function patchKit(file, t) {
  if (!exists(file)) return;
  let h = patchAllBlocks(read(file), t).text;
  const styleEnd = h.indexOf('</style>');
  let head = h.slice(0, styleEnd);
  let body = h.slice(styleEnd);
  if (!head.includes('font-family:var(--brand-font-family-display)')) {
    head += 'h1,h2,h3{font-family:var(--brand-font-family-display)}\n';
  }
  const pStart = body.indexOf('Primary palette');
  const pEnd = pStart >= 0 ? body.indexOf('Functional', pStart) : -1;
  if (pStart >= 0 && pEnd > pStart) {
    let i = 0;
    const grp = body.slice(pStart, pEnd).replace(/background:#[0-9a-fA-F]{6}/g, (s) => (i < 10 ? `background:${t.palette[i++]}` : s));
    body = body.slice(0, pStart) + grp + body.slice(pEnd);
  }
  body = body.replace(/background:#[0-9a-fA-F]{6}("><\/div>\s*<span[^>]*>(?:primary|info)<\/span>)/g, `background:${t.over.colorPrimary}$1`);
  if (!body.includes('>accent-2</span>')) {
    body = body.replace(/(>info<\/span>\s*<\/div>)/, `$1<div style="display:flex;flex-direction:column;gap:var(--brand-size-xxs)">
    <div style="height:48px;border-radius:var(--brand-border-radius-sm);border:var(--brand-line-width) solid var(--brand-color-border-secondary);background:${t.add.colorAccentSecondary}"></div>
    <span style="font-size:11px;font-family:var(--brand-font-family-code);color:var(--brand-color-text-tertiary)">accent-2</span>
  </div>`);
  }
  write(file, addFonts(onPrimary(head + body)));
}
patchKit('kit.html', light);
patchKit('kit.dark.html', dark);

function patchArtifact(file) {
  if (!exists(file)) return;
  let h = patchAllBlocks(read(file), light).text;
  h = onPrimary(h)
    .replace(/color:\s?var\(--brand-color-text-quaternary\)/g, (s) => s.replace('quaternary', 'tertiary'))
    // pitch-deck accent slides: #303030 ground, white type, one yellow highlight
    .replace('.frame--accent .s-kicker::before { background: rgba(255,255,255,0.85); }', '.frame--accent .s-kicker::before { background: var(--brand-color-accent-secondary); }')
    .replace('.frame--accent .s-accent { color: #fff; }', '.frame--accent .s-accent { color: var(--brand-color-accent-secondary); }')
    .replace(/(\.frame--accent [^{]*\{\s*color:\s*)#fff;/g, '$1var(--brand-color-primary-contrast);')
    .replace(/(\.s-matrix \.yes \{[^}]*color:\s*)#fff;/, '$1var(--brand-color-primary-contrast);');
  write(file, addFonts(h));
}
for (const f of ['deck', 'form', 'landing', 'email', 'newsletter', 'poster']) patchArtifact(`artifacts/${f}.html`);

if (exists('index.html')) {
  const r = patchAllBlocks(read('index.html'), light);
  write('index.html', addFonts(onPrimary(r.text).replace(/color:\s?var\(--brand-color-text-quaternary\)/g, (s) => s.replace('quaternary', 'tertiary'))));
}
console.log('Accessible overrides applied to', SYSTEM);

// ---------- DESIGN.md expanded rules ----------
// finalize regenerates DESIGN.md from brand.json; re-append the full Rules section.
const designPath = path.join(SYSTEM, '..', 'DESIGN.md');
const rulesPath = path.join(SYSTEM, 'scripts', 'design-rules.md');
if (fs.existsSync(designPath) && fs.existsSync(rulesPath)) {
  const design = fs.readFileSync(designPath, 'utf8');
  if (!/^## Rules$/m.test(design)) {
    fs.writeFileSync(designPath, design.replace(/\s*$/, '\n\n') + fs.readFileSync(rulesPath, 'utf8'));
    console.log('Appended expanded rules to DESIGN.md');
  }
}

// ---------- kit.html: Data display chips ----------
// The three avatar circles and two tag pills in the Data display row use a
// dedicated chip background (now #f5f5f5, per the latest request) instead of the shared primary tint.
{
  const f = 'kit.html';
  if (exists(f)) {
    let h = read(f);
    if (!h.includes('--brand-color-chip-bg')) {
      h = h.replace(/(:root\s*\{[^}]*?--brand-color-primary-bg:[^;]+;)/, '$1\n  --brand-color-chip-bg: #f5f5f5;');
    }
    const anchor = h.indexOf('>HB</span>');
    if (anchor >= 0) {
      const start = h.lastIndexOf('<div', anchor);
      const end = h.indexOf('</div>', anchor);
      const row = h.slice(start, end).split('background:var(--brand-color-primary-bg)').join('background:var(--brand-color-chip-bg)');
      h = h.slice(0, start) + row + h.slice(end);
    }
    write(f, h);
  }
}

// ---------- kit.html: header label box ----------
// The box holding the "DS-geofreitas.com … · default theme" label
// uses a dedicated #f5f5f5 background.
{
  const f = 'kit.html';
  if (exists(f)) {
    let h = read(f);
    if (!h.includes('--brand-color-label-bg')) {
      h = h.replace(/(:root\s*\{[^}]*?--brand-color-primary-bg:[^;]+;)/, '$1\n  --brand-color-label-bg: #f5f5f5;');
    }
    const anchor = h.indexOf(' · default theme</div>');
    if (anchor >= 0) {
      const start = h.lastIndexOf('<div', anchor);
      const tag = h.slice(start, anchor).replace('background:var(--brand-color-primary-bg)', 'background:var(--brand-color-label-bg)');
      h = h.slice(0, start) + tag + h.slice(anchor);
    }
    write(f, h);
  }
}

// ---------- fonts/: basic Latin Poppins faces ----------
// finalize self-hosts only the latin-ext subset; re-append the basic Latin faces.
{
  const fontsCss = path.join(SYSTEM, '..', 'fonts', 'fonts.css');
  const latin = path.join(SYSTEM, 'scripts', 'fonts-latin.css');
  if (fs.existsSync(fontsCss) && fs.existsSync(latin)) {
    const cur = fs.readFileSync(fontsCss, 'utf8');
    if (!cur.includes('-latin.woff2')) {
      fs.writeFileSync(fontsCss, cur.replace(/\s*$/, '\n') + fs.readFileSync(latin, 'utf8'));
      console.log('Added basic Latin Poppins faces to fonts/fonts.css');
    }
  }
}

// ---------- light pages: neutral + status tag pills, avatars, label box ----------
// Neutral tags (Primary, Info, live, beta, design, Most popular), avatars and the
// header label: #f5f5f5 fill, #111318 text, 1px #e0e0e0 border.
// Status tags match the alert tints: success #defbe6/#a7f0ba, warning #fcf4d6/#fddc69,
// error #fff1f1/#ffb3b8, all with #111318 text. Light-mode pages only.
{
  const TAG = /color:var\(--brand-color-(primary|info|success|warning|error)\);background:var\(--brand-color-(?:primary|chip)-bg\);border:var\(--brand-line-width\) solid var\(--brand-color-primary-border\)/g;
  const AVATAR = /border-radius:50%;background:var\(--brand-color-(?:primary|chip)-bg\);color:var\(--brand-color-primary(?:-text)?\)(?!;border:)/g;
  const files = ['kit.html', 'index.html', ...['deck', 'form', 'landing', 'email', 'newsletter', 'poster'].map((n) => `artifacts/${n}.html`)];
  for (const f of files) {
    if (!exists(f)) continue;
    let h = read(f);
    const before = h;
    h = h.replace(TAG, (m, kind) => {
      const tint = kind === 'primary' || kind === 'info' ? 'primary' : kind;
      return `color:var(--brand-color-tag-text);background:var(--brand-color-${tint}-bg);border:var(--brand-line-width) solid var(--brand-color-${tint}-border)`;
    });
    h = h.replace(AVATAR, (m) => m.replace(/color:var\(--brand-color-primary(?:-text)?\)/, 'color:var(--brand-color-tag-text)') + ';border:var(--brand-line-width) solid var(--brand-color-primary-border);box-sizing:border-box');
    h = h.replace(/(background:var\(--brand-color-label-bg\);color:)var\(--brand-color-primary\)(?!;border)/, '$1var(--brand-color-tag-text);border:var(--brand-line-width) solid var(--brand-color-primary-border)');
    if (h !== before) write(f, h);
  }
}

// ---------- brand.html: embedded token summary ----------
{
  const bh = path.join(SYSTEM, '..', 'brand.html');
  if (fs.existsSync(bh)) {
    let h = fs.readFileSync(bh, 'utf8');
    const start = h.indexOf('"tokens":{');
    if (start >= 0) {
      const end = h.indexOf('}', start);
      let seg = h.slice(start, end);
      for (const [k, v] of Object.entries(light.over)) seg = seg.replace(new RegExp(`("${k}":)"#[0-9a-fA-F]{6}"`), `$1"${v}"`);
      fs.writeFileSync(bh, h.slice(0, start) + seg + h.slice(end));
    }
  }
}

// ---------- locked !important overrides (kit.html, variables.css, tokens.default.json) ----------
{
  const { createRequire } = await import('node:module');
  createRequire(import.meta.url)('./lock-overrides.cjs');
}
