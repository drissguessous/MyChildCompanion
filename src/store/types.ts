import type { Gender, Lang, MoodId } from '../coach/messages';
import type { ActivityKind } from '../lib/activities';
import type { Plan } from '../lib/plan';
import type { Answers } from '../lib/grading';

/** Avatar : un emoji, ou une photo (URI data:image/... stockée localement). */
export type Avatar =
  | { kind: 'illus'; id: string; bg: string }
  | { kind: 'emoji'; value: string; bg: string }
  | { kind: 'photo'; uri: string };

export interface Teacher {
  name: string;
  gender: Gender;
  avatar: Avatar;
}

export interface Child {
  id: string;
  name: string;
  gender: Gender;
  levelId: string;
  avatar: Avatar;
  teacher: Teacher;
  scienceLang: 'fr' | 'ar';
  chronoEnabled: boolean;
  createdAt: string;
  reminder?: { enabled: boolean; hour: number; minute: number };
}

export interface Attempt {
  id: string;
  childId: string;
  kind: ActivityKind;
  refId: string; // chapterId, examId, skill:seed:level ou bilan:level:seed
  date: string;
  answers: Answers;
  openGrades: Record<string, number>; // points donnés par le parent aux questions ouvertes
  earned: number;
  total: number;
  scale: 10 | 20;
  grade: number; // note sur l'échelle
  provisional: boolean; // questions ouvertes non encore notées
  durationSec?: number;
}

export interface MoodEntry {
  childId: string;
  date: string; // AAAA-MM-JJ
  mood: MoodId;
}

export interface ParentAuth {
  salt: string;
  hash: string;
  recoverySalt: string;
  recoveryHash: string;
}

export interface Draft {
  refId: string; // pour bilan/entraînement, contient la graine des questions
  answers: Answers;
  elapsedSec: number; // temps déjà passé, le chrono reprend là où il était
  savedAt: string;
}

export interface AppState {
  version: 1;
  parent?: ParentAuth;
  children: Child[];
  attempts: Attempt[];
  moods: MoodEntry[];
  stars: Record<string, number>; // childId → étoiles d'effort
  activeDays: Record<string, string[]>; // childId → dates actives
  readLessons: Record<string, string[]>; // childId → chapterIds lus
  drafts?: Record<string, Record<string, Draft>>; // childId → « mode:refId » → travail en cours
  activeChildId?: string;
  demo: boolean;
  lang: Lang;
  plans: Record<string, Plan>; // childId → plan de mise à niveau
  counters: Record<string, Record<string, number>>; // childId → compteurs (respiration…)
  missionsDone: Record<string, string[]>; // childId → dates des missions accomplies
  familyDone: Record<string, number[]>; // childId → semaines des défis famille relevés
  voices?: { fr?: string; ar?: string; en?: string }; // voix choisies (propres à l'appareil)
  voiceRate?: number;
}

export const EMPTY_STATE: AppState = {
  version: 1,
  children: [],
  attempts: [],
  moods: [],
  stars: {},
  activeDays: {},
  readLessons: {},
  demo: false,
  lang: 'fr',
  plans: {},
  counters: {},
  missionsDone: {},
  familyDone: {},
};
