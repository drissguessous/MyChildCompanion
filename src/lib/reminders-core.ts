/** Calcul pur des rappels planifiés (partagé par Android, iOS et les tests). */
import { translate } from '../i18n/translate';
import type { AppState } from '../store/types';

const MAX = 60;

export interface PlannedReminder {
  date: Date;
  title: string;
  body: string;
}

/** Liste des rappels datés à venir (fonction pure, testable). */
export function plannedReminders(state: AppState, now = new Date()): PlannedReminder[] {
  const t = (k: string, p?: Record<string, string | number>) => translate(state.lang, k, p);
  const out: PlannedReminder[] = [];
  for (const child of state.children) {
    const r = child.reminder;
    if (!r?.enabled) continue;
    const plan = state.plans[child.id];
    if (!plan) continue;
    plan.days.forEach((day, i) => {
      const at = new Date(`${day.date}T00:00:00`);
      at.setHours(r.hour, r.minute, 0, 0);
      if (at <= now || day.rest) return;
      const hasExam = day.tasks.some((tk) => tk.kind === 'examen');
      out.push({
        date: at,
        title: t('{name}, ta mission du jour t’attend 🎯', { name: child.name }),
        body: hasExam
          ? t('Aujourd’hui : examen blanc. Respire, tu es prêt·e. {teacher} est avec toi.', { teacher: child.teacher.name })
          : t('{n} petites étapes avec {teacher}. On avance ensemble !', { n: day.tasks.length, teacher: child.teacher.name }),
      });
      const next = plan.days[i + 1];
      if (next?.tasks.some((tk) => tk.kind === 'examen')) {
        const eve = new Date(at.getTime() + 2 * 3600_000);
        if (eve.getDate() === at.getDate()) {
          out.push({ date: eve, title: t('Demain : examen blanc 📝'), body: t('Une petite révision ce soir, puis bonne nuit {name} !', { name: child.name }) });
        }
      }
    });
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, MAX);
}

