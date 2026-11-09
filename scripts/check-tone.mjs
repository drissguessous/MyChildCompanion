// Vérifie la charte d'accompagnement (docs/revue-experts.md, C-04) :
// aucun mot dévalorisant dans les messages du professeur ni dans les écrans.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const messages = readFileSync(join(root, 'src/coach/messages.ts'), 'utf8');
const listMatch = messages.match(/FORBIDDEN_WORDS = \[([\s\S]*?)\];/);
if (!listMatch) throw new Error('FORBIDDEN_WORDS introuvable');
const arMatch = messages.match(/FORBIDDEN_WORDS_AR = \[([\s\S]*?)\];/);
const words = [...listMatch[1].matchAll(/'([^']+)'/g), ...(arMatch ? arMatch[1].matchAll(/'([^']+)'/g) : [])].map((m) => m[1]);

const files = [
  'src/coach/messages.ts',
  ...readdirSync(join(root, 'src/screens')).map((f) => `src/screens/${f}`),
  'src/ui/ParentGate.tsx',
  'src/i18n/ar.ts',
  'src/i18n/zgh.ts',
  'src/lib/reminders.ts',
];
let errors = 0;
for (const f of files) {
  let txt = readFileSync(join(root, f), 'utf8');
  if (f.endsWith('messages.ts')) txt = txt.replace(listMatch[0], '').replace(arMatch?.[0] ?? '', '');
  txt.split('\n').forEach((line, i) => {
    for (const w of words) {
      const re = new RegExp(`(^|[^\\p{L}])${w}([^\\p{L}]|$)`, 'iu');
      if (re.test(line)) {
        console.error(`✗ ${f}:${i + 1} contient « ${w} » : ${line.trim()}`);
        errors++;
      }
    }
  });
}
if (errors) {
  console.error(`\n${errors} occurrence(s) contraire(s) à la charte.`);
  process.exit(1);
}
console.log(`✓ Charte respectée : ${files.length} fichiers vérifiés, ${words.length} mots interdits.`);
