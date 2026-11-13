// Raccorde les fichiers src/data/content/gen-*.ts : imports dans src/data/index.ts et liens thème → cours.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const dir = join(root, 'src/data/content');
// Seuls les lots validés et terminés (scripts/content-done.json) sont raccordés.
const done = new Set(JSON.parse(readFileSync(join(root, 'scripts/content-done.json'), 'utf8')));
const files = readdirSync(dir).filter((f) => /^gen-.*\.ts$/.test(f) && done.has(f.replace(/^gen-|\.ts$/g, ''))).sort();
const manifest = JSON.parse(readFileSync(join(root, 'scripts/content-manifest.json'), 'utf8'));
const present = new Set();
const exportsList = [];
for (const f of files) {
  const src = readFileSync(join(dir, f), 'utf8');
  const exp = src.match(/export const (\w+): Chapter\[\]/)?.[1];
  if (!exp) { console.error(`export introuvable dans ${f}`); continue; }
  exportsList.push({ f: f.replace(/\.ts$/, ''), exp });
  for (const m of src.matchAll(/\bid:\s*'([^']+)'/g)) present.add(m[1]);
}
const links = {};
for (const items of Object.values(manifest)) for (const it of items) if (present.has(it.id)) links[`${it.levelId}|${it.subjectId}|${it.topic}`] = it.id;
writeFileSync(join(dir, 'links.ts'), `/** Liens thème → cours (généré par scripts/wire-generated.mjs). */\nexport const TOPIC_LINKS: Record<string, string> = ${JSON.stringify(links, null, 2)};\n`);
const idxPath = join(root, 'src/data/chapters.ts');
let idx = readFileSync(idxPath, 'utf8').replace(/^import \{ GEN_\w+ \} from '\.\/content\/gen-[\w-]+';\n/gm, '');
idx = idx.replace("import { EXTRA_CHAPTERS } from './content/extra';", exportsList.map(({ f, exp }) => `import { ${exp} } from './content/${f}';`).join('\n') + "\nimport { EXTRA_CHAPTERS } from './content/extra';");
idx = idx.replace(/export const CHAPTERS: Chapter\[\] = \[[^\]]*\];/, `export const CHAPTERS: Chapter[] = [...PRIMAIRE_CHAPTERS, ...COLLEGE_CHAPTERS, ...LYCEE_CHAPTERS, ...EXTRA_CHAPTERS${exportsList.map(({ exp }) => `, ...${exp}`).join('')}];`);
writeFileSync(idxPath, idx);
console.log(`${exportsList.length} fichiers raccordés, ${Object.keys(links).length} thèmes reliés.`);
