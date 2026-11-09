/**
 * Plan de mise à niveau : construit à partir d'un bilan de positionnement.
 * Principes (pédagogue) : points fragiles d'abord, répétition espacée,
 * séances courtes (3 tâches par jour), un jour de repos par semaine,
 * un examen blanc en fin de semaine quand il existe, bilan final.
 */
import { CHAPTERS, examsFor, getChapter } from '../data';
import { LEVELS } from '../data/curriculum';
import { getSkill, skillsFor } from './generators';
import { gradeAll, type Answers } from './grading';
import { resolveActivity, unitOf, unitTitle } from './activities';

export type TaskKind = 'lesson' | 'exercice' | 'entrainement' | 'examen' | 'bilan';

export interface PlanTask {
  id: string;
  kind: TaskKind;
  ref: string; // chapterId, examId, skillId, ou 'bilan'
  title: string;
}

export interface PlanDay {
  date: string; // AAAA-MM-JJ
  rest: boolean;
  tasks: PlanTask[];
}

export interface Mastery {
  unit: string;
  title: string;
  ratio: number;
}

export interface Plan {
  id: string;
  childId: string;
  levelId: string;
  createdAt: string;
  weeks: number;
  mastery: Mastery[];
  days: PlanDay[];
  done: string[];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function masteryFromBilan(refId: string, answers: Answers): Mastery[] {
  const act = resolveActivity('bilan', refId);
  if (!act) return [];
  const g = gradeAll(act.questions, answers);
  const byUnit = new Map<string, { ok: number; n: number }>();
  act.questions.forEach((q, i) => {
    const u = unitOf(q.id);
    const cur = byUnit.get(u) ?? { ok: 0, n: 0 };
    cur.n += 1;
    if (g.outcomes[i].status === 'correct') cur.ok += 1;
    byUnit.set(u, cur);
  });
  return [...byUnit.entries()].map(([unit, v]) => ({ unit, title: unitTitle(unit), ratio: v.ok / v.n })).sort((a, b) => a.ratio - b.ratio);
}

export function buildPlan(childId: string, levelId: string, mastery: Mastery[], start = new Date()): Plan {
  const weak = mastery.filter((m) => m.ratio < 0.6);
  const medium = mastery.filter((m) => m.ratio >= 0.6 && m.ratio < 0.85);
  const strong = mastery.filter((m) => m.ratio >= 0.85);
  const weeks = weak.length >= 4 ? 4 : weak.length >= 2 ? 3 : 2;

  let n = 0;
  const task = (kind: TaskKind, ref: string, title: string): PlanTask => ({ id: `t${++n}`, kind, ref, title });
  const forUnit = (m: Mastery, deep: boolean): PlanTask[] => {
    if (getChapter(m.unit)) {
      return deep
        ? [task('lesson', m.unit, m.title), task('exercice', m.unit, m.title)]
        : [task('exercice', m.unit, m.title)];
    }
    if (getSkill(m.unit)) return [task('entrainement', m.unit, m.title)];
    return [];
  };

  // Semaine 1 : points fragiles en profondeur ; puis révision espacée et consolidation
  const queue: PlanTask[] = [
    ...weak.flatMap((m) => forUnit(m, true)),
    ...medium.flatMap((m) => forUnit(m, false)),
    ...weak.flatMap((m) => forUnit(m, false)), // répétition espacée
    ...strong.slice(0, 3).flatMap((m) => forUnit(m, false)),
  ];
  // Chapitres de l'année non couverts par le bilan : lecture + exercices
  const covered = new Set(mastery.map((m) => m.unit));
  for (const c of CHAPTERS.filter((ch) => ch.levelId === levelId && !covered.has(ch.id))) {
    queue.push(task('lesson', c.id, c.title), task('exercice', c.id, c.title));
  }
  const fillers = skillsFor(levelId, LEVELS.map((l) => l.id)).current;
  const exams = examsFor(levelId);

  const days: PlanDay[] = [];
  const totalDays = weeks * 7;
  let fi = 0;
  for (let d = 0; d < totalDays; d++) {
    const date = new Date(start.getTime() + d * 86_400_000);
    const dayInWeek = d % 7;
    if (dayInWeek === 6) {
      days.push({ date: iso(date), rest: true, tasks: [] });
      continue;
    }
    const tasks: PlanTask[] = [];
    const isLastDay = d === totalDays - 2;
    const isWeekEnd = dayInWeek === 5;
    if (isLastDay) tasks.push(task('bilan', 'bilan', 'Bilan de fin de plan'));
    else if (isWeekEnd && exams.length) {
      const ex = exams[Math.floor(d / 7) % exams.length];
      tasks.push(task('examen', ex.id, ex.title));
    }
    while (tasks.length < 3) {
      const next = queue.shift();
      if (next) tasks.push(next);
      else if (fillers.length) {
        const s = fillers[fi++ % fillers.length];
        tasks.push(task('entrainement', s.id, s.title));
      } else break;
    }
    days.push({ date: iso(date), rest: false, tasks });
  }
  return { id: `plan-${Date.now()}`, childId, levelId, createdAt: new Date().toISOString(), weeks, mastery, days, done: [] };
}

export function planProgress(plan: Plan) {
  const all = plan.days.flatMap((d) => d.tasks);
  return { done: plan.done.length, total: all.length, ratio: all.length ? plan.done.length / all.length : 0 };
}

export function todayTasks(plan: Plan, date = iso(new Date())): PlanDay | undefined {
  return plan.days.find((d) => d.date === date);
}

/** Marque la première tâche non faite correspondant à l'activité, en priorité celles d'aujourd'hui et du passé. */
export function completeInPlan(plan: Plan, kind: TaskKind, ref: string): Plan {
  const todayIso = iso(new Date());
  const candidates = plan.days.filter((d) => d.date <= todayIso).reverse().concat(plan.days.filter((d) => d.date > todayIso));
  for (const d of candidates) {
    const t = d.tasks.find((x) => x.kind === kind && x.ref === ref && !plan.done.includes(x.id));
    if (t) return { ...plan, done: [...plan.done, t.id] };
  }
  return plan;
}
