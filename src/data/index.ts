import { COLLEGE_CHAPTERS } from './content/college';
import { GEN_FRANCAIS_PRIMAIRE } from './content/gen-francais-primaire';
import { GEN_FRANCAIS_SECONDAIRE } from './content/gen-francais-secondaire';
import { GEN_MATH_PRIMAIRE } from './content/gen-math-primaire';
import { EXTRA_CHAPTERS } from './content/extra';
import { LYCEE_CHAPTERS } from './content/lycee';
import { PRIMAIRE_CHAPTERS } from './content/primaire';
import { CYCLE_LABEL, getLevel, LEVELS, SUBJECTS } from './curriculum';
import { EXAMS } from './exams';
import { PROGRAMME } from './programme';
import type { Chapter, Exam, SubjectId } from './types';

export const CHAPTERS: Chapter[] = [...PRIMAIRE_CHAPTERS, ...COLLEGE_CHAPTERS, ...LYCEE_CHAPTERS, ...EXTRA_CHAPTERS, ...GEN_FRANCAIS_PRIMAIRE, ...GEN_FRANCAIS_SECONDAIRE, ...GEN_MATH_PRIMAIRE];

export const getChapter = (id: string) => CHAPTERS.find((c) => c.id === id);
export const getExam = (id: string) => EXAMS.find((e) => e.id === id);
export const chaptersFor = (levelId: string, subjectId: SubjectId) =>
  CHAPTERS.filter((c) => c.levelId === levelId && c.subjectId === subjectId);
export const examsFor = (levelId: string, subjectId?: SubjectId) =>
  EXAMS.filter((e) => e.levelId === levelId && (!subjectId || e.subjectId === subjectId));

// ───────────── Recherche ─────────────

export type SearchKind = 'cours' | 'examen' | 'theme';

export interface SearchItem {
  key: string;
  kind: SearchKind;
  title: string;
  levelId: string;
  subjectId: SubjectId;
  available: boolean;
  chapterId?: string;
  examId?: string;
  haystack: string;
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents latins
    .replace(/[ً-ْ]/g, '') // harakat arabes
    .replace(/[’']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  const linked = new Set<string>();
  for (const level of LEVELS) {
    for (const subjectId of Object.keys(PROGRAMME[level.id] ?? {}) as SubjectId[]) {
      for (const topic of PROGRAMME[level.id][subjectId] ?? []) {
        const ch = topic.chapterId ? getChapter(topic.chapterId) : undefined;
        if (ch) linked.add(ch.id);
        const extra = ch
          ? [...ch.objectives, ...ch.lesson.map((b) => ('text' in b ? b.text : b.items.join(' ')))].join(' ')
          : '';
        items.push({
          key: `${level.id}-${subjectId}-${topic.title}`,
          kind: ch ? 'cours' : 'theme',
          title: topic.title,
          levelId: level.id,
          subjectId,
          available: !!ch,
          chapterId: ch?.id,
          haystack: normalize(
            [topic.title, SUBJECTS[subjectId].name, level.label, level.short, CYCLE_LABEL[level.cycle], extra].join(' '),
          ),
        });
      }
    }
  }
  // Chapitres non référencés dans le programme (sécurité)
  for (const ch of CHAPTERS.filter((c) => !linked.has(c.id))) {
    const level = getLevel(ch.levelId);
    items.push({
      key: ch.id, kind: 'cours', title: ch.title, levelId: ch.levelId, subjectId: ch.subjectId, available: true, chapterId: ch.id,
      haystack: normalize([ch.title, SUBJECTS[ch.subjectId].name, level.label, level.short].join(' ')),
    });
  }
  for (const ex of EXAMS) {
    const level = getLevel(ex.levelId);
    items.push({
      key: ex.id, kind: 'examen', title: ex.title, levelId: ex.levelId, subjectId: ex.subjectId, available: true, examId: ex.id,
      haystack: normalize([ex.title, 'examen blanc sujet controle', SUBJECTS[ex.subjectId].name, level.label, level.short, CYCLE_LABEL[level.cycle]].join(' ')),
    });
  }
  return items;
}

export const SEARCH_INDEX = buildIndex();

export interface SearchFilters {
  query: string;
  cycle?: 'primaire' | 'college' | 'lycee';
  levelId?: string;
  subjectId?: SubjectId;
  kind?: SearchKind | 'disponible';
}

export function search(f: SearchFilters): SearchItem[] {
  const terms = normalize(f.query).split(' ').filter(Boolean);
  const levelOrder = new Map(LEVELS.map((l, i) => [l.id, i]));
  return SEARCH_INDEX.filter((it) => {
    if (f.levelId && it.levelId !== f.levelId) return false;
    if (f.cycle && getLevel(it.levelId).cycle !== f.cycle) return false;
    if (f.subjectId && it.subjectId !== f.subjectId) return false;
    if (f.kind === 'disponible' && !it.available) return false;
    if (f.kind && f.kind !== 'disponible' && it.kind !== f.kind) return false;
    return terms.every((t) => it.haystack.includes(t));
  }).sort((a, b) => {
    if (a.available !== b.available) return a.available ? -1 : 1;
    return (levelOrder.get(a.levelId) ?? 0) - (levelOrder.get(b.levelId) ?? 0);
  });
}

export function catalogStats() {
  return {
    chapters: CHAPTERS.length,
    exams: EXAMS.length,
    topics: SEARCH_INDEX.filter((i) => i.kind !== 'examen').length,
    questions: CHAPTERS.reduce((n, c) => n + c.exercises.length, 0) + EXAMS.reduce((n, e) => n + e.sections.reduce((m, s) => m + s.questions.length, 0), 0),
  };
}

export type { Chapter, Exam };
