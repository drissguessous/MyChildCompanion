import { normalize } from '../data';
import type { Question } from '../data/types';

export type AnswerValue = number | boolean | string | undefined;
export type Answers = Record<string, AnswerValue>;

export interface QuestionOutcome {
  id: string;
  status: 'correct' | 'review' | 'pending'; // pending = question ouverte, notée par le parent
  points: number;
  earned: number;
}

export function parseNumber(v: string): number | undefined {
  const cleaned = v.replace(/\s/g, '').replace(',', '.').replace('−', '-');
  if (cleaned === '' || cleaned === '-' ) return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

export function gradeQuestion(q: Question, value: AnswerValue): QuestionOutcome {
  const points = q.points ?? 1;
  let ok = false;
  switch (q.type) {
    case 'qcm':
      ok = value === q.answer;
      break;
    case 'tf':
      ok = value === q.answer;
      break;
    case 'number': {
      const n = typeof value === 'string' ? parseNumber(value) : typeof value === 'number' ? value : undefined;
      ok = n !== undefined && Math.abs(n - q.answer) <= (q.tolerance ?? 1e-9);
      break;
    }
    case 'text': {
      const v = typeof value === 'string' ? normalize(value).replace(/[.!?]$/, '').trim() : '';
      ok = v !== '' && q.accept.some((a) => normalize(a).replace(/[.!?]$/, '').trim() === v);
      break;
    }
    case 'open':
      return { id: q.id, status: 'pending', points, earned: 0 };
  }
  return { id: q.id, status: ok ? 'correct' : 'review', points, earned: ok ? points : 0 };
}

export interface GradeSummary {
  outcomes: QuestionOutcome[];
  autoEarned: number;
  autoTotal: number;
  openTotal: number;
  total: number;
}

export function gradeAll(questions: Question[], answers: Answers, openGrades: Record<string, number> = {}): GradeSummary {
  const outcomes = questions.map((q) => {
    const o = gradeQuestion(q, answers[q.id]);
    if (o.status === 'pending' && openGrades[q.id] !== undefined) {
      const earned = Math.max(0, Math.min(o.points, openGrades[q.id]));
      return { ...o, earned, status: earned >= o.points / 2 ? ('correct' as const) : ('review' as const) };
    }
    return o;
  });
  const auto = outcomes.filter((_, i) => questions[i].type !== 'open');
  const open = outcomes.filter((_, i) => questions[i].type === 'open');
  return {
    outcomes,
    autoEarned: auto.reduce((s, o) => s + o.earned, 0),
    autoTotal: auto.reduce((s, o) => s + o.points, 0),
    openTotal: open.reduce((s, o) => s + o.points, 0),
    total: outcomes.reduce((s, o) => s + o.points, 0),
  };
}

/** Note sur l'échelle Massar (10 ou 20), arrondie au quart de point. */
export function toScale(earned: number, total: number, scale: number): number {
  if (total <= 0) return 0;
  return Math.round((earned / total) * scale * 4) / 4;
}

export function formatGrade(v: number): string {
  return v.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}
