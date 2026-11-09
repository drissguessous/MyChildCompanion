// Liste toutes les phrases d'interface à traduire (clés françaises).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(f) && files.push(p); });
walk(join(root, 'src')); files.push(join(root, 'App.tsx'));
const keys = new Set();
for (const f of files) {
  if (f.includes('/i18n/') || f.includes('/data/content/') || f.includes('exams.ts') || f.includes('programme.ts')) continue;
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?<![.\w])t\(\s*'((?:[^'\\]|\\.)*)'/g)) keys.add(m[1]);
  for (const m of s.matchAll(/(?<![.\w])t\(\s*f \? '((?:[^'\\]|\\.)*)' : '((?:[^'\\]|\\.)*)'/g)) { keys.add(m[1]); keys.add(m[2]); }
}
// Libellés venant des données
const extra = [];
const grab = (file, re) => { const s = readFileSync(join(root, file), 'utf8'); for (const m of s.matchAll(re)) extra.push(m[1]); };
grab('src/data/curriculum.ts', /name: '([^']+)'/g);
grab('src/data/curriculum.ts', /label: '([^']+)'/g);
grab('src/data/curriculum.ts', /certifyingExam: '([^']+)'/g);
grab('src/data/curriculum.ts', /(?:primaire|college|lycee): '([^']+)'/g);
grab('src/lib/badges.ts', /title: '([^']+)'/g);
grab('src/lib/badges.ts', /desc: '([^']+)'/g);
grab('src/lib/generators.ts', /title: '([^']+)'/g);
grab('src/lib/activities.ts', /title: '([^']+)'/g);
grab('src/lib/plan.ts', /'(Bilan de fin de plan)'/g);
grab('src/screens/Home.tsx', /(?:lesson|exercice|entrainement|examen|bilan): '([A-ZÉ][^']+)'/g);
grab('src/screens/Search.tsx', /label: '([^']+)'/g);
extra.push('Bilan de positionnement', 'Retour');
extra.forEach((k) => keys.add(k));
const out = [...keys].filter((k) => !/^[\p{Script=Arabic}\s]+$/u.test(k)).sort();
if (process.argv[2] === '--check') {
  const dict = (name) => { const s = readFileSync(join(root, `src/i18n/${name}.ts`), 'utf8'); return new Set([...s.matchAll(/^\s*'((?:[^'\\]|\\.)*)':/gm)].map((m) => m[1])); };
  const ar = dict('ar'), zgh = dict('zgh');
  const missAr = out.filter((k) => !ar.has(k));
  console.log(`Arabe : ${out.length - missAr.length}/${out.length} · Amazigh : ${out.filter((k) => zgh.has(k)).length}/${out.length} (bêta, le reste en français)`);
  if (missAr.length) { console.error('Manquant en arabe :\n' + missAr.join('\n')); process.exit(1); }
} else console.log(JSON.stringify(out, null, 1));
