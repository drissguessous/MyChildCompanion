/**
 * Web : les navigateurs ne permettent pas de programmer des notifications
 * sans serveur de push. Le rappel prend la forme d'un bandeau à l'ouverture.
 */
import type { AppState } from '../store/types';

export const remindersSupported = false;
export async function ensurePermission(): Promise<boolean> {
  return false;
}
export async function syncReminders(_state: AppState): Promise<void> {}
export { plannedReminders } from './reminders-core';
