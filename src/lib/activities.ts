/**
 * Résolution des activités (exercices de cours, examens, entraînement généré, bilan)
 * en une liste de questions, à partir de leur identifiant. Permet de recalculer
 * un corrigé à tout moment sans stocker les questions générées.
 */
import { CHAPTERS, getChapter, getExam } from '../data';
import { LEVELS } from '../data/curriculum';
import type { ExamSection, Lang, Question, SubjectId } from '../data/types';
import { generate, getSkill, skillsFor } from './generators';

export type ActivityKind = 'exercice' | 'examen' | 'entrainement' | 'bilan';

export interface Activity {
  kind: ActivityKind;
  refId: string;
  title: string;
  levelId: string;
  subjectId?: SubjectId;
  lang: Lang;
  sections: ExamSection[];
  questions: Question[];
  durationMin?: number;
}

const LEVEL_ORDER = LEVELS.map((l) => l.id);
export const UNIT_SEP = '::';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** refId d'un entraînement : `${skillId}:${seed}:${levelId}` */
export const practiceRef = (skillId: string, levelId: string, seed = Date.now() % 1_000_000) => `${skillId}:${seed}:${levelId}`;
/** refId d'un bilan : `bilan:${levelId}:${seed}` */
export const bilanRef = (levelId: string, seed = Date.now() % 1_000_000) => `bilan:${levelId}:${seed}`;

export function bilanQuestions(levelId: string, seed: number): ExamSection[] {
  const chapters = CHAPTERS.filter((c) => c.levelId === levelId);
  const { current, review } = skillsFor(levelId, LEVEL_ORDER);
  const fromCourses: Question[] = chapters.flatMap((c) =>
    c.exercises.filter((q) => q.type !== 'open').slice(0, 2).map((q) => ({ ...q, id: `${c.id}${UNIT_SEP}${q.id}` })),
  );
  const fromSkills = (skills: typeof current, n: number): Question[] =>
    skills.slice(0, 4).flatMap((s) => generate(s.id, seed + hash(s.id), n).map((q) => ({ ...q, id: `${s.id}${UNIT_SEP}${q.id}` })));
  const sections: ExamSection[] = [];
  if (fromCourses.length) sections.push({ title: 'Les cours de ton année', questions: fromCourses });
  const cur = fromSkills(current, 2);
  if (cur.length) sections.push({ title: 'Automatismes de ton année', questions: cur });
  const rev = fromSkills(review, 2);
  if (rev.length) sections.push({ title: 'Les bases des années précédentes', questions: rev });
  return sections;
}

export function unitOf(questionId: string): string {
  return questionId.split(UNIT_SEP)[0];
}

export function unitTitle(unit: string): string {
  return getChapter(unit)?.title ?? getSkill(unit)?.title ?? unit;
}

export function resolveActivity(kind: ActivityKind, refId: string): Activity | undefined {
  if (kind === 'exercice') {
    const c = getChapter(refId);
    if (!c) return undefined;
    return { kind, refId, title: c.title, levelId: c.levelId, subjectId: c.subjectId, lang: c.lang, sections: [{ title: '', questions: c.exercises }], questions: c.exercises };
  }
  if (kind === 'examen') {
    const e = getExam(refId);
    if (!e) return undefined;
    return { kind, refId, title: e.title, levelId: e.levelId, subjectId: e.subjectId, lang: e.lang, sections: e.sections, questions: e.sections.flatMap((s) => s.questions), durationMin: e.durationMin };
  }
  if (kind === 'entrainement') {
    const [skillId, seedStr, levelId] = refId.split(':');
    const skill = getSkill(skillId);
    if (!skill) return undefined;
    const questions = generate(skillId, Number(seedStr) || 1, 8);
    return { kind, refId, title: skill.title, levelId: levelId ?? skill.levels[0], subjectId: skill.subjectId, lang: 'fr', sections: [{ title: '', questions }], questions };
  }
  const [, levelId, seedStr] = refId.split(':');
  const sections = bilanQuestions(levelId, Number(seedStr) || 1);
  return { kind, refId, title: 'Bilan de positionnement', levelId, lang: 'fr', sections, questions: sections.flatMap((s) => s.questions), durationMin: 30 };
}
