import * as Print from 'expo-print';
import { Platform } from 'react-native';
import { getLevel, SUBJECTS } from '../data/curriculum';
import type { Block, Chapter, Exam, Question } from '../data/types';
import type { Attempt, Child } from '../store/types';
import { formatGrade, gradeAll } from './grading';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(title: string, meta: string, body: string, rtl = false): string {
  return `<!doctype html><html lang="${rtl ? 'ar' : 'fr'}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  body { font-family: -apple-system, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Naskh Arabic', Arial, sans-serif; color: #1F2340; font-size: 12.5pt; line-height: 1.5; }
  header { border-bottom: 3px solid #5B4BDB; padding-bottom: 8px; margin-bottom: 14px; }
  .brand { color: #5B4BDB; font-weight: 800; font-size: 11pt; letter-spacing: .5px; }
  h1 { font-size: 19pt; margin: 4px 0; }
  .meta { color: #6B7090; font-size: 10pt; }
  h2 { font-size: 14pt; color: #5B4BDB; margin: 18px 0 6px; }
  .rule { border: 2px solid #5B4BDB; background: #F3F1FF; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
  .example { border-left: 4px solid #FFB547; background: #FFF6E5; padding: 6px 12px; margin: 8px 0; }
  .tip { color: #1F9D63; font-style: italic; }
  .q { margin: 10px 0 4px; page-break-inside: avoid; }
  .pts { color: #6B7090; font-size: 10pt; }
  .lines { border-bottom: 1px dotted #999; height: 26px; }
  .choices { margin: 4px 0 0 18px; }
  .ans { background: #DDF6E9; border-radius: 6px; padding: 6px 10px; margin: 4px 0; }
  .child { background: #F3F4F8; border-radius: 6px; padding: 6px 10px; margin: 4px 0; }
  .grade { font-size: 16pt; font-weight: 800; color: #5B4BDB; }
  footer { margin-top: 24px; color: #6B7090; font-size: 9pt; border-top: 1px solid #ddd; padding-top: 6px; }
</style></head><body>
<header><div class="brand">OUSTADATI · أستاذتي</div><h1>${esc(title)}</h1><div class="meta">${esc(meta)}</div></header>
${body}
<footer>Oustadati — accompagnement scolaire (programme Massar). Contenu indicatif, à valider par l’enseignant de la classe.</footer>
</body></html>`;
}

function block(b: Block): string {
  switch (b.type) {
    case 'h': return `<h2>${esc(b.text)}</h2>`;
    case 'p': return `<p>${esc(b.text)}</p>`;
    case 'rule': return `<div class="rule"><b>À retenir :</b> ${esc(b.text)}</div>`;
    case 'example': return `<div class="example"><b>Exemple :</b> ${esc(b.text)}</div>`;
    case 'tip': return `<p class="tip">💡 ${esc(b.text)}</p>`;
    case 'list': return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  }
}

function questionBlank(q: Question, n: number): string {
  const pts = q.points && q.points > 1 ? ` <span class="pts">(${q.points} pts)</span>` : '';
  let tail = '';
  if (q.type === 'qcm') tail = `<div class="choices">${q.choices.map((c) => `☐ ${esc(c)}`).join('<br>')}</div>`;
  else if (q.type === 'tf') tail = `<div class="choices">☐ Vrai &nbsp;&nbsp; ☐ Faux</div>`;
  else if (q.type === 'open') tail = '<div class="lines"></div>'.repeat(5);
  else tail = '<div class="lines"></div>';
  return `<div class="q"><b>${n}.</b> ${esc(q.prompt)}${pts}${tail}</div>`;
}

export function correctAnswerText(q: Question): string {
  switch (q.type) {
    case 'qcm': return q.choices[q.answer];
    case 'tf': return q.answer ? 'Vrai' : 'Faux';
    case 'number': return `${String(q.answer).replace('.', ',')}${q.unit ? ` ${q.unit}` : ''}`;
    case 'text': return q.accept[0];
    case 'open': return q.modelAnswer;
  }
}

export function childAnswerText(q: Question, v: unknown): string {
  if (v === undefined || v === '' || v === null) return '— (pas de réponse)';
  if (q.type === 'qcm' && typeof v === 'number') return q.choices[v] ?? '—';
  if (q.type === 'tf') return v ? 'Vrai' : 'Faux';
  return String(v);
}

function questionCorrected(q: Question, n: number, attempt?: Attempt): string {
  const child = attempt ? `<div class="child">Réponse de l’enfant : ${esc(childAnswerText(q, attempt.answers[q.id]))}</div>` : '';
  return `<div class="q"><b>${n}.</b> ${esc(q.prompt)}${child}
    <div class="ans"><b>Réponse attendue :</b> ${esc(correctAnswerText(q))}<br>${esc(q.explanation)}</div></div>`;
}

function metaLine(levelId: string, subjectId: keyof typeof SUBJECTS, child?: Child): string {
  const lvl = getLevel(levelId);
  const parts = [`${lvl.label} (${lvl.short})`, SUBJECTS[subjectId].name];
  if (child) parts.push(`Élève : ${child.name}`);
  parts.push(new Date().toLocaleDateString('fr-FR'));
  return parts.join(' · ');
}

export const html = {
  lesson: (c: Chapter, child?: Child) =>
    page(c.title, metaLine(c.levelId, c.subjectId, child),
      `<h2>Objectifs</h2><ul>${c.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>${c.lesson.map(block).join('')}`,
      c.lang === 'ar'),
  exercises: (c: Chapter, child?: Child) =>
    page(`Exercices — ${c.title}`, metaLine(c.levelId, c.subjectId, child),
      c.exercises.map((q, i) => questionBlank(q, i + 1)).join(''), c.lang === 'ar'),
  exam: (e: Exam, child?: Child) => {
    const lvl = getLevel(e.levelId);
    let n = 0;
    const body = `<p><b>Durée :</b> ${e.durationMin} min · <b>Note sur ${lvl.gradeScale}</b></p><p><i>${esc(e.instructions)}</i></p>` +
      e.sections.map((s) => `<h2>${esc(s.title)}</h2>${s.questions.map((q) => questionBlank(q, ++n)).join('')}`).join('');
    return page(e.title, metaLine(e.levelId, e.subjectId, child), body, e.lang === 'ar');
  },
  correction: (title: string, levelId: string, subjectId: keyof typeof SUBJECTS, questions: Question[], rtl: boolean, attempt?: Attempt, child?: Child) => {
    let head = '';
    if (attempt) {
      const g = gradeAll(questions, attempt.answers, attempt.openGrades);
      head = `<p class="grade">Note : ${formatGrade(attempt.grade)} / ${attempt.scale}${attempt.provisional ? ' (provisoire)' : ''}</p>
        <p class="meta">${g.outcomes.filter((o) => o.status === 'correct').length} réponses justes sur ${questions.length}</p>`;
    }
    return page(`Corrigé — ${title}`, metaLine(levelId, subjectId, child), head + questions.map((q, i) => questionCorrected(q, i + 1, attempt)).join(''), rtl);
  },
};

/** Ouvre la fenêtre d'impression du système ; l'utilisateur peut choisir « Enregistrer en PDF ». */
export async function printHtml(content: string): Promise<void> {
  if (Platform.OS === 'web') {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (!doc || !iframe.contentWindow) return;
    doc.open();
    doc.write(content);
    doc.close();
    await new Promise((r) => setTimeout(r, 300));
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => iframe.remove(), 60_000);
    return;
  }
  await Print.printAsync({ html: content });
}
