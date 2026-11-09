/** Badges d'effort : ils récompensent la régularité, la persévérance et la curiosité, jamais la note seule. */
import { getChapter } from '../data';
import type { AppState } from '../store/types';

export interface Badge {
  id: string;
  icon: string;
  title: string;
  desc: string;
  earned: boolean;
}

function streak(days: string[] = []): number {
  const set = new Set(days);
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function badgesFor(state: AppState, childId: string): Badge[] {
  const child = state.children.find((c) => c.id === childId);
  const mine = state.attempts.filter((a) => a.childId === childId);
  const counters = state.counters[childId] ?? {};
  const byRef = new Map<string, number[]>();
  for (const a of [...mine].sort((x, y) => x.date.localeCompare(y.date))) {
    const key = a.kind === 'entrainement' ? a.refId.split(':')[0] : a.refId;
    byRef.set(key, [...(byRef.get(key) ?? []), a.earned / Math.max(1, a.total)]);
  }
  const retried = [...byRef.values()].filter((v) => v.length >= 2).length;
  const improved = [...byRef.values()].some((v) => v.length >= 2 && v[v.length - 1] > v[0] + 0.01);
  const read = state.readLessons[childId] ?? [];
  const otherLevel = read.some((id) => getChapter(id) && getChapter(id)!.levelId !== child?.levelId);
  const s = streak(state.activeDays[childId]);
  const missions = (state.missionsDone[childId] ?? []).length;
  const family = (state.familyDone[childId] ?? []).length;

  return [
    { id: 'premier-pas', icon: '👣', title: 'Premier pas', desc: 'Faire ton premier exercice', earned: mine.length >= 1 },
    { id: 'regulier', icon: '🔥', title: 'Régulier', desc: 'Travailler 3 jours de suite', earned: s >= 3 },
    { id: 'super-regulier', icon: '🌈', title: 'Super régulier', desc: 'Travailler 7 jours de suite', earned: s >= 7 },
    { id: 'perseverant', icon: '🧗', title: 'Persévérant', desc: 'Refaire 3 activités pour progresser', earned: retried >= 3 },
    { id: 'progres', icon: '📈', title: 'En progrès', desc: 'Faire mieux qu’à ton premier essai', earned: improved },
    { id: 'curieux', icon: '🔭', title: 'Curieux', desc: 'Lire 5 cours', earned: read.length >= 5 },
    { id: 'explorateur', icon: '🧭', title: 'Explorateur', desc: 'Lire un cours d’un autre niveau', earned: otherLevel },
    { id: 'zen', icon: '🧘', title: 'Zen', desc: 'Faire 3 exercices de respiration', earned: (counters.breathing ?? 0) >= 3 },
    { id: 'mission', icon: '🎯', title: 'Missionnaire', desc: 'Accomplir 5 missions du jour', earned: missions >= 5 },
    { id: 'famille', icon: '👨‍👩‍👧', title: 'Professeur de la famille', desc: 'Relever un défi famille', earned: family >= 1 },
    { id: 'examen', icon: '🎓', title: 'Courageux', desc: 'Terminer un examen blanc', earned: mine.some((a) => a.kind === 'examen') },
    { id: 'bilan', icon: '🗺️', title: 'Bon départ', desc: 'Faire ton bilan de positionnement', earned: mine.some((a) => a.kind === 'bilan') },
  ];
}
