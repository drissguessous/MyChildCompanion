// Vérifie la cohérence du contenu et la logique (correction, générateurs, plan, démo).
// Exécuté avec tsx : npx tsx scripts/check-content.mjs
import { CHAPTERS, EXAMS_LIST, PROGRAMME, SKILLS, generate, gradeAll, buildDemoState, resolveActivity, buildPlan, masteryFromBilan, bilanRef, plannedReminders, translate } from './check-entry.ts';

let errors = 0;
const fail = (m) => { console.error('✗ ' + m); errors++; };
const right = (q) => q.type === 'qcm' || q.type === 'tf' ? q.answer : q.type === 'number' ? String(q.answer).replace('.', ',') : q.type === 'text' ? q.accept[0] : 'x';

const ids = new Set();
for (const c of CHAPTERS) {
  if (ids.has(c.id)) fail(`chapitre en double ${c.id}`); ids.add(c.id);
  const qids = new Set();
  for (const q of c.exercises) {
    if (qids.has(q.id)) fail(`${c.id}: question en double ${q.id}`); qids.add(q.id);
    if (q.type === 'qcm' && (q.answer < 0 || q.answer >= q.choices.length)) fail(`${c.id}/${q.id}: réponse QCM hors limites`);
  }
  const g = gradeAll(c.exercises, Object.fromEntries(c.exercises.map((q) => [q.id, right(q)])));
  if (g.autoEarned !== g.autoTotal) fail(`${c.id}: les bonnes réponses ne donnent pas la note maximale`);
}
for (const e of EXAMS_LIST) {
  const qs = e.sections.flatMap((s) => s.questions);
  const g = gradeAll(qs, Object.fromEntries(qs.map((q) => [q.id, right(q)])));
  if (g.autoEarned !== g.autoTotal) fail(`${e.id}: correction incohérente`);
}
for (const [lvl, subjects] of Object.entries(PROGRAMME))
  for (const topics of Object.values(subjects))
    for (const t of topics) if (t.chapterId && !CHAPTERS.some((c) => c.id === t.chapterId)) fail(`${lvl}: thème relié à un chapitre absent ${t.chapterId}`);
for (const s of SKILLS) for (let seed = 1; seed < 40; seed++) {
  const qs = generate(s.id, seed, 8);
  if (qs.length < 4) fail(`${s.id}: trop peu de questions générées`);
  const g = gradeAll(qs, Object.fromEntries(qs.map((q) => [q.id, right(q)])));
  if (g.autoEarned !== g.autoTotal) fail(`${s.id} (graine ${seed}): réponse générée mal corrigée — ${qs.map((q) => q.prompt).join(' | ')}`);
}
for (const lvl of Object.keys(PROGRAMME)) {
  const act = resolveActivity('bilan', bilanRef(lvl, 7));
  if (!act || act.questions.length < 4) fail(`${lvl}: bilan trop court (${act?.questions.length ?? 0})`);
  const ans = Object.fromEntries(act.questions.map((q, i) => [q.id, i % 2 ? right(q) : '']));
  const plan = buildPlan('x', lvl, masteryFromBilan(act.refId, ans));
  if (!plan.days.some((d) => d.tasks.length)) fail(`${lvl}: plan vide`);
}
const demo = buildDemoState(undefined);
if (demo.children.length !== 3 || !Object.keys(demo.plans).length) fail('démo incomplète');
for (const a of demo.attempts) if (!resolveActivity(a.kind, a.refId)) fail(`démo : activité introuvable ${a.kind} ${a.refId}`);
const rem = plannedReminders(demo);
if (!rem.length) fail('aucun rappel planifié pour la démo');
if (translate('ar', 'Commencer') === 'Commencer') fail('traduction arabe absente');

if (errors) { console.error(`\n${errors} erreur(s).`); process.exit(1); }
console.log(`✓ Contenu et logique vérifiés : ${CHAPTERS.length} cours, ${EXAMS_LIST.length} examens, ${SKILLS.length} générateurs × 39 graines, 12 bilans et plans, démo (${demo.attempts.length} tentatives, ${rem.length} rappels).`);
