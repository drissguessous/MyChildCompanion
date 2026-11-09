import type { Child, Teacher } from '../store/types';
import { coachPack, type Ctx, type Lang, type MoodId } from './messages';

export interface Coach extends Ctx {
  lang: Lang;
}

export function ctx(child: Child, teacher: Teacher, lang: Lang = 'fr'): Coach {
  return {
    lang,
    name: child.name,
    teacher: teacher.name,
    c: (m, f) => (child.gender === 'f' ? f : m),
    t: (m, f) => (teacher.gender === 'f' ? f : m),
  };
}

/** Choix stable dans la journée (évite que le message change à chaque rendu). */
function pick<T>(arr: T[], seed = 0): T {
  const day = Math.floor(Date.now() / 86_400_000);
  return arr[Math.abs(day + seed) % arr.length];
}

const P = (x: Coach) => coachPack(x.lang);

export function greeting(x: Coach, hour = new Date().getHours()): string {
  const slot = hour < 12 ? 'matin' : hour < 18 ? 'aprem' : 'soir';
  return pick(P(x).greetings[slot])(x);
}

export function resultMessage(x: Coach, ratio: number, previousRatio?: number, seed = 0): string {
  const band = ratio >= 0.9 ? 'bravo' : ratio >= 0.7 ? 'fier' : ratio >= 0.4 ? 'progres' : 'ensemble';
  const base = pick(P(x).result[band], seed)(x);
  if (previousRatio !== undefined && ratio > previousRatio + 0.01) return `${pick(P(x).improved, seed)(x)} ${base}`;
  return base;
}

export const retryMessage = (x: Coach) => pick(P(x).retry)(x);
export const examBefore = (x: Coach) => pick(P(x).examBefore)(x);
export const examAfterPending = (x: Coach) => P(x).examAfterPending(x);
export const dailyTip = (x: Coach) => pick(P(x).tips, 3)(x);
export const moodReply = (x: Coach, mood: MoodId) => P(x).moodReplies[mood](x);
export const moodLabel = (lang: Lang, mood: MoodId) => coachPack(lang).moodLabels[mood];
export const talkToParent = (x: Coach) => P(x).talkToParent(x);
export const streakMessage = (x: Coach) => P(x).streak(x);
export const starMessage = (x: Coach) => P(x).star(x);
export const missionMessage = (x: Coach, done: boolean) => (done ? P(x).missionDone(x) : P(x).mission(x));
export const breathingSteps = (lang: Lang) => coachPack(lang).breathing;

/** Trois jours difficiles (stressé ou triste) parmi les quatre derniers relevés. */
export function needsAdult(moods: { mood: MoodId; date: string }[]): boolean {
  const last = [...moods].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  return last.filter((m) => m.mood === 'triste' || m.mood === 'stresse').length >= 3;
}
