/**
 * Base de simulation : trois enfants fictifs avec un historique réaliste
 * (notes, humeurs, étoiles), pour les démos et les tests du front-end.
 * Mot de passe parent de la démo : 1234 — code de secours : DEMO-2026.
 */
import { getLevel } from './curriculum';
import { EXAMS } from './exams';
import { CHAPTERS } from './index';
import type { Question } from './types';
import { gradeAll, toScale, type Answers } from '../lib/grading';
import { bilanRef, resolveActivity } from '../lib/activities';
import { buildPlan, masteryFromBilan, type Plan } from '../lib/plan';
import type { AppState, Attempt, Child, MoodEntry } from '../store/types';

export const DEMO_PASSWORD = '1234';
export const DEMO_RECOVERY = 'DEMO-2026';

const DAY = 86_400_000;
const isoDay = (offset: number) => new Date(Date.now() - offset * DAY).toISOString().slice(0, 10);

/** Générateur pseudo-aléatoire déterministe (mêmes données à chaque démo). */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function wrongAnswer(q: Question): Answers[string] {
  switch (q.type) {
    case 'qcm': return (q.answer + 1) % q.choices.length;
    case 'tf': return !q.answer;
    case 'number': return String(q.answer + 1);
    case 'text': return 'je ne sais pas';
    case 'open': return '';
  }
}

function rightAnswer(q: Question): Answers[string] {
  switch (q.type) {
    case 'qcm': return q.answer;
    case 'tf': return q.answer;
    case 'number': return String(q.answer).replace('.', ',');
    case 'text': return q.accept[0];
    case 'open': return q.modelAnswer.replace(/^Exemple : /, '').slice(0, 220);
  }
}

function makeAttempt(
  child: Child, kind: Attempt['kind'], refId: string, questions: Question[], skill: number, daysAgo: number, rand: () => number, gradeOpen: boolean,
): Attempt {
  const answers: Answers = {};
  const openGrades: Record<string, number> = {};
  for (const q of questions) {
    const ok = rand() < skill;
    answers[q.id] = ok ? rightAnswer(q) : wrongAnswer(q);
    if (q.type === 'open' && gradeOpen) openGrades[q.id] = ok ? (q.points ?? 1) : Math.floor((q.points ?? 1) / 2);
  }
  const g = gradeAll(questions, answers, openGrades);
  const provisional = !gradeOpen && g.openTotal > 0;
  const scale = getLevel(child.levelId).gradeScale;
  const earned = g.outcomes.reduce((s, o) => s + o.earned, 0);
  return {
    id: `${child.id}-${refId}-${daysAgo}`,
    childId: child.id, kind, refId,
    date: new Date(Date.now() - daysAgo * DAY - 3600_000 * (2 + Math.floor(rand() * 6))).toISOString(),
    answers, openGrades, earned, total: g.total, scale,
    grade: toScale(earned, g.total, scale), provisional,
    durationSec: 300 + Math.floor(rand() * 900),
  };
}

export function buildDemoState(parent: AppState['parent']): AppState {
  const now = new Date().toISOString();
  const children: Child[] = [
    {
      id: 'demo-yasmine', name: 'Yasmine', gender: 'f', levelId: '4AP', scienceLang: 'fr', chronoEnabled: false, createdAt: now,
      reminder: { enabled: true, hour: 18, minute: 0 },
      avatar: { kind: 'emoji', value: '🦋', bg: '#FDE68A' },
      teacher: { name: 'Oustadati Nadia', gender: 'f', avatar: { kind: 'emoji', value: '👩‍🏫', bg: '#DDD6FE' } },
    },
    {
      id: 'demo-adam', name: 'Adam', gender: 'm', levelId: '2AC', scienceLang: 'fr', chronoEnabled: true, createdAt: now,
      reminder: { enabled: true, hour: 18, minute: 0 },
      avatar: { kind: 'emoji', value: '🦁', bg: '#BFDBFE' },
      teacher: { name: 'Ustad Karim', gender: 'm', avatar: { kind: 'emoji', value: '👨‍🏫', bg: '#BBF7D0' } },
    },
    {
      id: 'demo-salma', name: 'Salma', gender: 'f', levelId: '2BAC', scienceLang: 'fr', chronoEnabled: true, createdAt: now,
      reminder: { enabled: true, hour: 18, minute: 0 },
      avatar: { kind: 'emoji', value: '🌸', bg: '#FBCFE8' },
      teacher: { name: 'Oustadati', gender: 'f', avatar: { kind: 'emoji', value: '🧕', bg: '#FED7AA' } },
    },
  ];
  const profiles: Record<string, { skill: number; seed: number }> = {
    'demo-yasmine': { skill: 0.72, seed: 11 },
    'demo-adam': { skill: 0.55, seed: 23 },
    'demo-salma': { skill: 0.83, seed: 37 },
  };

  const attempts: Attempt[] = [];
  const moods: MoodEntry[] = [];
  const stars: Record<string, number> = {};
  const activeDays: Record<string, string[]> = {};
  const readLessons: Record<string, string[]> = {};
  const plans: Record<string, Plan> = {};
  const missionsDone: Record<string, string[]> = {};
  const counters: Record<string, Record<string, number>> = {};
  const familyDone: Record<string, number[]> = {};

  for (const child of children) {
    const { skill, seed } = profiles[child.id];
    const rand = rng(seed);
    const chapters = CHAPTERS.filter((c) => c.levelId === child.levelId);
    const exams = EXAMS.filter((e) => e.levelId === child.levelId);
    readLessons[child.id] = chapters.map((c) => c.id);
    let day = 20;
    // Exercices : deux tentatives par chapitre, la seconde en progrès
    for (const ch of chapters) {
      attempts.push(makeAttempt(child, 'exercice', ch.id, ch.exercises, skill - 0.15, day, rand, true));
      day -= 3;
      attempts.push(makeAttempt(child, 'exercice', ch.id, ch.exercises, Math.min(0.97, skill + 0.1), Math.max(day, 1), rand, true));
      day -= 2;
    }
    // Examens blancs : le dernier reste à corriger par le parent (démontre le flux)
    exams.forEach((ex, i) => {
      const qs = ex.sections.flatMap((s) => s.questions);
      attempts.push(makeAttempt(child, 'examen', ex.id, qs, skill, Math.max(1, 6 - i * 3), rand, i < exams.length - 1));
    });
    // Bilan de positionnement il y a 5 jours, puis plan de mise à niveau en cours
    const bref = bilanRef(child.levelId, seed * 7);
    const bilan = resolveActivity('bilan', bref);
    if (bilan) {
      const b = makeAttempt(child, 'bilan', bref, bilan.questions, skill - 0.1, 5, rand, true);
      attempts.push(b);
      const plan = buildPlan(child.id, child.levelId, masteryFromBilan(bref, b.answers), new Date(Date.now() - 4 * DAY));
      const pastTasks = plan.days.filter((d) => d.date < isoDay(0)).flatMap((d) => d.tasks);
      plan.done = pastTasks.filter(() => rand() < 0.8).map((t) => t.id);
      plans[child.id] = plan;
    }
    missionsDone[child.id] = [isoDay(1), isoDay(2), isoDay(4)];
    counters[child.id] = { breathing: child.id === 'demo-adam' ? 3 : 1 };
    familyDone[child.id] = child.id === 'demo-yasmine' ? [Math.floor(Date.now() / (7 * DAY)) - 1] : [];
    stars[child.id] = 8 + Math.floor(rand() * 20);
    activeDays[child.id] = Array.from({ length: 21 }, (_, i) => i).filter((i) => i < 4 || rand() < 0.6).map(isoDay);
    const moodSeq: MoodEntry['mood'][] = child.id === 'demo-adam'
      ? ['stresse', 'triste', 'bien', 'stresse', 'bien', 'super', 'fatigue']
      : ['super', 'bien', 'bien', 'fatigue', 'super', 'bien', 'stresse'];
    moodSeq.forEach((mood, i) => moods.push({ childId: child.id, date: isoDay(i), mood }));
  }

  return {
    version: 1, parent, children, attempts, moods, stars, activeDays, readLessons,
    activeChildId: undefined, demo: true, lang: 'fr', plans, counters, missionsDone, familyDone,
  };
}
