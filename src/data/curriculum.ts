import type { Level, Subject, SubjectId } from './types';

export const SUBJECTS: Record<SubjectId, Subject> = {
  math: { id: 'math', name: 'Mathématiques', icon: '🔢', color: '#3B82F6' },
  francais: { id: 'francais', name: 'Français', icon: '📖', color: '#8B5CF6' },
  arabe: { id: 'arabe', name: 'اللغة العربية', icon: '✍️', color: '#10B981' },
  anglais: { id: 'anglais', name: 'Anglais', icon: '🇬🇧', color: '#EC4899' },
  eveil: { id: 'eveil', name: 'Éveil scientifique', icon: '🌱', color: '#22C55E' },
  svt: { id: 'svt', name: 'SVT', icon: '🧬', color: '#16A34A' },
  pc: { id: 'pc', name: 'Physique-Chimie', icon: '⚗️', color: '#F59E0B' },
  hg: { id: 'hg', name: 'Histoire-Géographie', icon: '🌍', color: '#0EA5E9' },
  islamique: { id: 'islamique', name: 'Éducation islamique', icon: '🕌', color: '#14B8A6' },
  philo: { id: 'philo', name: 'Philosophie', icon: '💭', color: '#6366F1' },
};

const PRIMAIRE: SubjectId[] = ['math', 'francais', 'arabe', 'eveil', 'islamique'];
const PRIMAIRE_SUP: SubjectId[] = ['math', 'francais', 'arabe', 'eveil', 'hg', 'islamique'];
const COLLEGE: SubjectId[] = ['math', 'francais', 'arabe', 'anglais', 'svt', 'pc', 'hg', 'islamique'];
const LYCEE: SubjectId[] = ['math', 'francais', 'arabe', 'anglais', 'svt', 'pc', 'philo', 'islamique'];

export const LEVELS: Level[] = [
  { id: '1AP', system: 'massar', cycle: 'primaire', label: '1re année primaire', short: 'CP', gradeScale: 10, subjects: PRIMAIRE },
  { id: '2AP', system: 'massar', cycle: 'primaire', label: '2e année primaire', short: 'CE1', gradeScale: 10, subjects: PRIMAIRE },
  { id: '3AP', system: 'massar', cycle: 'primaire', label: '3e année primaire', short: 'CE2', gradeScale: 10, subjects: PRIMAIRE_SUP },
  { id: '4AP', system: 'massar', cycle: 'primaire', label: '4e année primaire', short: 'CM1', gradeScale: 10, subjects: PRIMAIRE_SUP },
  { id: '5AP', system: 'massar', cycle: 'primaire', label: '5e année primaire', short: 'CM2', gradeScale: 10, subjects: PRIMAIRE_SUP },
  { id: '6AP', system: 'massar', cycle: 'primaire', label: '6e année primaire', short: '6AP', gradeScale: 10, subjects: PRIMAIRE_SUP, certifyingExam: 'Examen provincial (certificat d’études primaires)' },
  { id: '1AC', system: 'massar', cycle: 'college', label: '1re année collège', short: '1AC', gradeScale: 20, subjects: COLLEGE },
  { id: '2AC', system: 'massar', cycle: 'college', label: '2e année collège', short: '2AC', gradeScale: 20, subjects: COLLEGE },
  { id: '3AC', system: 'massar', cycle: 'college', label: '3e année collège', short: '3AC', gradeScale: 20, subjects: COLLEGE, certifyingExam: 'Examen régional' },
  { id: 'TC', system: 'massar', cycle: 'lycee', label: 'Tronc commun scientifique', short: 'TC', gradeScale: 20, subjects: LYCEE },
  { id: '1BAC', system: 'massar', cycle: 'lycee', label: '1re année bac (Sciences expérimentales)', short: '1BAC', gradeScale: 20, subjects: LYCEE, certifyingExam: 'Examen régional' },
  { id: '2BAC', system: 'massar', cycle: 'lycee', label: '2e année bac (Sciences PC / SVT)', short: '2BAC', gradeScale: 20, subjects: LYCEE, certifyingExam: 'Examen national' },
];

export const CYCLE_LABEL = { primaire: 'Primaire', college: 'Collège', lycee: 'Lycée' } as const;

export function getLevel(id: string): Level {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[0];
}
