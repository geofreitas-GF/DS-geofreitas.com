// Locked !important overrides for kit.html, variables.css and tokens.default.json.
// Called at the end of apply-accessible-overrides.mjs. Idempotent.
const fs = require('fs');
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const V = {
  neutralBg: '#f5f5f5', neutralBorder: '#e0e0e0', text: '#111318',
  successBg: '#defbe6', successBorder: '#a7f0ba',
  warningBg: '#fcf4d6', warningBorder: '#fddc69',
  errorBg: '#fff1f1', errorBorder: '#ffb3b8',
};
const BLOCK = `
/* ===== Locked overrides (hand-edited, do not regenerate) =====
   Neutral pills/tags/avatars/header pill/Info alert: #f5f5f5 + #111318 + 1px #e0e0e0.
   Status tags + alerts: IBM Carbon pastels with #111318 text. No mid-grey fills in light mode.
   Primary buttons are not touched (#303030 fill, #ffffff text). */
:root {
  --brand-primary-bg: ${V.neutralBg} !important;
  --brand-color-primary-bg: ${V.neutralBg} !important;
  --brand-color-info-bg: ${V.neutralBg} !important;
  --brand-color-primary-border: ${V.neutralBorder} !important;
  --brand-color-info-border: ${V.neutralBorder} !important;
  --brand-color-success-bg: ${V.successBg} !important;
  --brand-color-success-border: ${V.successBorder} !important;
  --brand-color-warning-bg: ${V.warningBg} !important;
  --brand-color-warning-border: ${V.warningBorder} !important;
  --brand-color-error-bg: ${V.errorBg} !important;
  --brand-color-error-border: ${V.errorBorder} !important;
  --brand-primary-palette-1: ${V.neutralBg} !important;
}
.od-neutral { background-color: ${V.neutralBg} !important; color: ${V.text} !important; border: 1px solid ${V.neutralBorder} !important; }
.od-success { background-color: ${V.successBg} !important; color: ${V.text} !important; border: 1px solid ${V.successBorder} !important; }
.od-warning { background-color: ${V.warningBg} !important; color: ${V.text} !important; border: 1px solid ${V.warningBorder} !important; }
.od-error   { background-color: ${V.errorBg} !important; color: ${V.text} !important; border: 1px solid ${V.errorBorder} !important; }
/* ===== end locked overrides ===== */
`;
const strip = (s) => s.replace(/\n\/\* ===== Locked overrides[\s\S]*?\/\* ===== end locked overrides ===== \*\/\n/g, '');

// ---- variables.css: fix light :root values, append locked block ----
let css = strip(fs.readFileSync('variables.css', 'utf8'));
const rootEnd = css.indexOf('}');
let root = css.slice(0, rootEnd);
const setVar = (blk, name, val) => blk.replace(new RegExp(`(${name}:\\s*)[^;]+;`), `$1${val};`);
for (const [n, v] of [['--brand-color-primary-bg', V.neutralBg], ['--brand-color-info-bg', V.neutralBg], ['--brand-color-primary-border', V.neutralBorder], ['--brand-color-info-border', V.neutralBorder], ['--brand-color-success-bg', V.successBg], ['--brand-color-success-border', V.successBorder], ['--brand-color-warning-bg', V.warningBg], ['--brand-color-warning-border', V.warningBorder], ['--brand-color-error-bg', V.errorBg], ['--brand-color-error-border', V.errorBorder], ['--brand-primary-palette-1', V.neutralBg]]) root = setVar(root, n, v);
css = root + css.slice(rootEnd);
css = css.replace(/\s*$/, '\n') + BLOCK;
fs.writeFileSync('variables.css', css);

// ---- tokens.default.json ----
const t = JSON.parse(fs.readFileSync('tokens.default.json', 'utf8'));
Object.assign(t, { colorPrimaryBg: V.neutralBg, colorInfoBg: V.neutralBg, colorPrimaryBorder: V.neutralBorder, colorInfoBorder: V.neutralBorder, colorSuccessBg: V.successBg, colorSuccessBorder: V.successBorder, colorWarningBg: V.warningBg, colorWarningBorder: V.warningBorder, colorErrorBg: V.errorBg, colorErrorBorder: V.errorBorder });
if (Array.isArray(t.primaryPalette)) t.primaryPalette[0] = V.neutralBg;
fs.writeFileSync('tokens.default.json', JSON.stringify(t, null, 2));

// ---- kit.html ----
let h = fs.readFileSync('kit.html', 'utf8');
h = h.replace(/\n?<style id="od-locked-overrides">[\s\S]*?<\/style>/g, '');
h = h.replace(/ class="od-(neutral|success|warning|error)"/g, '');
// inline :root token values
const kEnd = h.indexOf('}', h.indexOf(':root{'));
let kr = h.slice(0, kEnd);
for (const [n, v] of [['--brand-color-primary-bg', V.neutralBg], ['--brand-color-info-bg', V.neutralBg], ['--brand-color-primary-border', V.neutralBorder], ['--brand-color-info-border', V.neutralBorder], ['--brand-color-success-bg', V.successBg], ['--brand-color-success-border', V.successBorder], ['--brand-color-warning-bg', V.warningBg], ['--brand-color-warning-border', V.warningBorder], ['--brand-color-error-bg', V.errorBg], ['--brand-color-error-border', V.errorBorder], ['--brand-primary-palette-1', V.neutralBg]]) kr = setVar(kr, n, v);
h = kr + h.slice(kEnd);
// palette swatch literals: any mid-grey swatch becomes the neutral tint
{ const a = h.indexOf('Primary palette'), b = h.indexOf('Functional', a); if (a >= 0 && b > a) h = h.slice(0, a) + h.slice(a, b).replace(/background:#(?:707070|6e6e6e)/gi, `background:${V.neutralBg}`) + h.slice(b); }
// classes on tags, avatars
const kind = { Primary: 'neutral', Info: 'neutral', live: 'neutral', beta: 'neutral', design: 'neutral', 'Most popular': 'neutral', HB: 'neutral', AL: 'neutral', TB: 'neutral', Success: 'success', ops: 'success', Warning: 'warning', Error: 'error' };
let tagged = 0;
h = h.replace(/<span style="([^"]*background:var\(--brand-color-[a-z]+-bg\)[^"]*)">(Primary|Info|live|beta|design|Most popular|HB|AL|TB|Success|ops|Warning|Error)</g, (m, st, txt) => { tagged++; return `<span class="od-${kind[txt]}" style="${st}">${txt}<`; });
// header pill
h = h.replace(/<div style="([^"]*background:var\(--brand-color-[a-z]+-bg\)[^"]*)">([^<]*· default theme)/, (m, st, txt) => { tagged++; return `<div class="od-neutral" style="${st}">${txt}`; });
// alerts
h = h.replace(/<div style="([^"]*background:var\(--brand-color-(info|success|warning|error)-bg\)[^"]*)">/g, (m, st, k) => { tagged++; return `<div class="od-${k === 'info' ? 'neutral' : k}" style="${st}">`; });
h = h.replace('</head>', `<style id="od-locked-overrides">${BLOCK}</style>\n</head>`);
fs.writeFileSync('kit.html', h);
console.log('Locked overrides applied; tagged elements:', tagged);
