/**
 * Programme officiel Massar (unités et leçons dans l'ordre officiel), relevé à partir
 * des programmes du ministère et des répartitions des manuels agréés (voir
 * docs/programme-officiel.md). Une leçon est reliée à son cours quand il est rédigé ;
 * les cours de l'app hors programme de leur niveau apparaissent en « Compléments ».
 */
import { CHAPTERS } from './chapters';
import OFFICIAL from './official.json';
import type { SubjectId } from './types';

export interface Topic {
  title: string;
  unit: string;
  chapterId?: string;
}

type Raw = Record<string, Partial<Record<SubjectId, { conf: string; units: { u: string; l: { t: string; f?: string; c?: string; id?: string }[] }[] }>>>;
const RAW = OFFICIAL as Raw;
const FR_SUBJECTS = new Set<SubjectId>(['math', 'pc', 'svt', 'eveil']);
const ids = new Set(CHAPTERS.map((c) => c.id));
const used = new Set<string>();

type Programme = Record<string, Partial<Record<SubjectId, Topic[]>>>;
export const PROGRAMME: Programme = {};
for (const [lvl, subs] of Object.entries(RAW)) {
  for (const [sub, e] of Object.entries(subs) as [SubjectId, NonNullable<Raw[string][SubjectId]>][]) {
    const topics: Topic[] = [];
    for (const u of e.units) {
      for (const l of u.l) {
        const chapterId = l.c && ids.has(l.c) ? l.c : l.id && ids.has(l.id) ? l.id : undefined;
        if (chapterId) used.add(chapterId);
        const ch = chapterId ? CHAPTERS.find((c) => c.id === chapterId) : undefined;
        const title = ch && ch.lang !== 'ar' && FR_SUBJECTS.has(sub) ? (l.f ?? ch.title) : FR_SUBJECTS.has(sub) && l.f ? l.f : l.t;
        topics.push({ title, unit: u.u, chapterId });
      }
    }
    (PROGRAMME[lvl] ??= {})[sub] = topics;
  }
}
for (const c of CHAPTERS) {
  if (used.has(c.id)) continue;
  ((PROGRAMME[c.levelId] ??= {})[c.subjectId] ??= []).push({ title: c.title, unit: 'Compléments', chapterId: c.id });
}

export const confidenceOf = (levelId: string, subjectId: SubjectId) => RAW[levelId]?.[subjectId]?.conf;

export function topicsFor(levelId: string, subjectId: SubjectId): Topic[] {
  return PROGRAMME[levelId]?.[subjectId] ?? [];
}
