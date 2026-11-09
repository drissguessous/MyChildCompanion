/**
 * Valide un fichier de cours : npx tsx scripts/validate-chapters.ts src/data/content/gen-xxx.ts [manifest.json groupe]
 * Vérifie le schéma, la cohérence des corrigés et la charte de ton des astuces.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gradeAll } from '../src/lib/grading.ts';
import type { Chapter, Question } from '../src/data/types.ts';

const [file, manifestPath, group] = process.argv.slice(2);
const mod = await import(resolve(file));
const chapters: Chapter[] = Object.values(mod).filter(Array.isArray).flat() as Chapter[];
const FORBIDDEN = /\b(nul|nulle|raté|ratée|échec|mauvais|mauvaise|idiot|bête|honte|décevant|paresseux|stupide)\b|فاشل|غبي|كسول/i;
const errs: string[] = [];
const fail = (m: string) => errs.push(m);
const right = (q: Question) => (q.type === 'qcm' || q.type === 'tf' ? q.answer : q.type === 'number' ? String(q.answer).replace('.', ',') : q.type === 'text' ? q.accept[0] : 'x');
const expected = manifestPath ? (JSON.parse(readFileSync(manifestPath, 'utf8'))[group] as { id: string; levelId: string; subjectId: string }[]) : undefined;
const ids = new Set<string>();
for (const c of chapters) {
  const where = c.id ?? '(sans id)';
  if (ids.has(c.id)) fail(`${where}: id en double`); ids.add(c.id);
  if (expected) {
    const e = expected.find((x) => x.id === c.id);
    if (!e) fail(`${where}: id absent du manifeste`);
    else if (e.levelId !== c.levelId || e.subjectId !== c.subjectId) fail(`${where}: levelId/subjectId incohérents avec le manifeste`);
  }
  if (!['fr', 'ar', 'en'].includes(c.lang)) fail(`${where}: lang invalide`);
  if (!c.title || !c.objectives?.length) fail(`${where}: titre ou objectifs manquants`);
  if ((c.lesson?.length ?? 0) < 4) fail(`${where}: leçon trop courte (${c.lesson?.length ?? 0} blocs, minimum 4)`);
  if (!c.lesson?.some((b) => b.type === 'rule')) fail(`${where}: aucun bloc « rule » (à retenir)`);
  for (const b of c.lesson ?? []) if (b.type === 'tip' && FORBIDDEN.test(b.text)) fail(`${where}: astuce contraire à la charte : ${b.text}`);
  if ((c.exercises?.length ?? 0) < 5) fail(`${where}: moins de 5 exercices`);
  const qids = new Set<string>();
  for (const q of c.exercises ?? []) {
    if (qids.has(q.id)) fail(`${where}/${q.id}: id de question en double`); qids.add(q.id);
    if (!q.prompt || !q.explanation) fail(`${where}/${q.id}: énoncé ou explication manquant`);
    if (q.type === 'qcm' && (!Array.isArray(q.choices) || q.choices.length < 2 || q.answer < 0 || q.answer >= q.choices.length)) fail(`${where}/${q.id}: QCM invalide`);
    if (q.type === 'number' && !Number.isFinite(q.answer)) fail(`${where}/${q.id}: réponse numérique invalide`);
    if (q.type === 'text' && !q.accept?.length) fail(`${where}/${q.id}: aucune réponse acceptée`);
    if (q.type === 'open' && !q.modelAnswer) fail(`${where}/${q.id}: corrigé type manquant`);
  }
  const g = gradeAll(c.exercises ?? [], Object.fromEntries((c.exercises ?? []).map((q) => [q.id, right(q)])));
  if (g.autoEarned !== g.autoTotal) fail(`${where}: les bonnes réponses ne donnent pas la note maximale`);
  if ((c.exercises ?? []).filter((q) => q.type !== 'open').length < 4) fail(`${where}: au moins 4 questions doivent être corrigées automatiquement`);
}
if (expected) for (const e of expected) if (!ids.has(e.id)) fail(`${e.id}: cours manquant`);
if (errs.length) { console.error(errs.join('\n')); console.error(`\n✗ ${errs.length} problème(s) sur ${chapters.length} cours.`); process.exit(1); }
console.log(`✓ ${chapters.length} cours valides.`);
