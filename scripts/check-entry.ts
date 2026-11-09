// Point d'entrée Node (sans React Native) pour les vérifications.
export { CHAPTERS } from '../src/data';
export { EXAMS as EXAMS_LIST } from '../src/data/exams';
export { PROGRAMME } from '../src/data/programme';
export { SKILLS, generate } from '../src/lib/generators';
export { gradeAll } from '../src/lib/grading';
export { buildDemoState } from '../src/data/simulation';
export { resolveActivity, bilanRef } from '../src/lib/activities';
export { buildPlan, masteryFromBilan } from '../src/lib/plan';
export { plannedReminders } from '../src/lib/reminders-core';
export { translate } from '../src/i18n/translate';
