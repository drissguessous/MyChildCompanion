/**
 * Rappels planifiés (Android / iOS) : notifications locales calculées sur l'appareil.
 * - avec un plan : un rappel chaque jour de travail du plan (rien les jours de repos),
 *   plus un rappel la veille d'un examen blanc ;
 * - sans plan : un rappel quotidien à l'heure choisie.
 * iOS limite à 64 notifications en attente : on en programme au plus 60.
 */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { translate } from '../i18n/translate';
import { plannedReminders } from './reminders-core';

export { plannedReminders };
import type { AppState } from '../store/types';

const CHANNEL = 'rappels';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
});

export const remindersSupported = true;

export async function ensurePermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, { name: 'Rappels', importance: Notifications.AndroidImportance.DEFAULT });
  }
  const cur = await Notifications.getPermissionsAsync();
  if (cur.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

/** Reprogramme tous les rappels à partir de l'état. */
export async function syncReminders(state: AppState): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  const anyEnabled = state.children.some((c) => c.reminder?.enabled);
  if (!anyEnabled) return;
  const perm = await Notifications.getPermissionsAsync();
  if (!perm.granted) return;
  const t = (k: string, p?: Record<string, string | number>) => translate(state.lang, k, p);
  // Enfants sans plan : rappel quotidien
  for (const child of state.children) {
    const r = child.reminder;
    if (!r?.enabled || state.plans[child.id]) continue;
    await Notifications.scheduleNotificationAsync({
      content: { title: t('{name}, ta mission du jour t’attend 🎯', { name: child.name }), body: t('Quelques minutes avec {teacher}, c’est déjà une victoire.', { teacher: child.teacher.name }) },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: r.hour, minute: r.minute, channelId: CHANNEL },
    });
  }
  for (const p of plannedReminders(state)) {
    await Notifications.scheduleNotificationAsync({
      content: { title: p.title, body: p.body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: p.date, channelId: CHANNEL },
    });
  }
}
