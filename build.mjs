// Prosty build: Tailwind -> CSS, ikony Lucide -> sprite SVG, fonty lokalne, podmiana {{zmiennych}} z src/site.json.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';

const SRC = 'src';
const OUT = 'dist';
const site = JSON.parse(readFileSync(join(SRC, 'site.json'), 'utf8'));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'fonts'), { recursive: true });

// Fonty (samohostowane, bez połączeń do Google)
const fonts = {
  'inter-latin.woff2': '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'inter-latin-ext.woff2': '@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2',
  'jakarta-latin.woff2': '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
  'jakarta-latin-ext.woff2': '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-ext-wght-normal.woff2',
};
for (const [name, path] of Object.entries(fonts)) cpSync(join('node_modules', path), join(OUT, 'fonts', name));

// Ikony: tylko te, których używa strona
const icons = [
  'phone', 'arrow-right', 'external-link', 'circle-check', 'star', 'key-round', 'building-2',
  'search-check', 'chart-column', 'message-circle', 'mail', 'map-pin', 'lock',
  'chevron-left', 'chevron-right', 'menu', 'x', 'house', 'bed-double', 'ruler', 'layers',
];
const symbols = icons.map((name) => {
  const svg = readFileSync(join('node_modules/lucide-static/icons', `${name}.svg`), 'utf8');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').trim();
  return `<symbol id="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
});
writeFileSync(join(OUT, 'icons.svg'), `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`);

// {{i:nazwa|klasy}} -> <svg>, {{klucz}} -> wartość z site.json
function render(text) {
  return text
    .replace(/\{\{i:([a-z0-9-]+)(?:\|([^}]*))?\}\}/g, (_, name, cls = '') => {
      if (!icons.includes(name)) throw new Error(`Brak ikony w sprite: ${name}`);
      return `<svg class="ico ${cls}" aria-hidden="true" focusable="false"><use href="/icons.svg#${name}"/></svg>`;
    })
    .replace(/\{\{([a-zA-Z]+)\}\}/g, (m, key) => {
      if (!(key in site)) throw new Error(`Brak klucza w site.json: ${key}`);
      return site[key];
    });
}

const TEMPLATED = new Set(['.html', '.xml', '.txt']);
function walk(dir, rel = '') {
  for (const entry of readdirSync(join(dir, rel))) {
    const relPath = join(rel, entry);
    if (statSync(join(dir, relPath)).isDirectory()) {
      mkdirSync(join(OUT, relPath), { recursive: true });
      walk(dir, relPath);
    } else if (relPath === 'site.json' || relPath === 'input.css') {
      continue;
    } else if (TEMPLATED.has(extname(entry))) {
      writeFileSync(join(OUT, relPath), render(readFileSync(join(dir, relPath), 'utf8')));
    } else {
      cpSync(join(dir, relPath), join(OUT, relPath));
    }
  }
}
walk(SRC);

execSync(`npx tailwindcss -c tailwind.config.js -i ${SRC}/input.css -o ${OUT}/styles.css --minify`, { stdio: 'inherit' });
if (!existsSync(join(OUT, 'index.html'))) throw new Error('Brak dist/index.html');
console.log('Build OK ->', OUT);
