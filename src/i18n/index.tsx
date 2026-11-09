/**
 * Traduction de l'interface. Les clés sont les phrases françaises (source),
 * les dictionnaires arabe et amazigh les traduisent ; une phrase absente
 * reste en français. `npm run check:i18n` mesure la couverture.
 */
import { useMemo } from 'react';
import { Platform, type TextStyle } from 'react-native';
import type { Lang } from '../coach/messages';
import { CYCLE_LABEL, SUBJECTS } from '../data/curriculum';
import type { Cycle, Level, SubjectId } from '../data/types';
import { useApp } from '../store/AppContext';
import { translate } from './translate';

export { translate };

export type { Lang };

export const LANGS: { id: Lang; label: string; native: string }[] = [
  { id: 'fr', label: 'Français', native: 'Français' },
  { id: 'ar', label: 'Arabe', native: 'العربية' },
  { id: 'zgh', label: 'Amazigh', native: 'ⵜⴰⵎⴰⵣⵉⵖⵜ' },
];

export const TIFINAGH_FONT = 'NotoSansTifinagh_400Regular';

export interface I18n {
  lang: Lang;
  rtl: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
  /** Style à appliquer aux textes : sens d'écriture et police tifinagh. */
  ts: TextStyle;
  row: 'row' | 'row-reverse';
  subject: (id: SubjectId) => string;
  level: (l: Level) => string;
  cycle: (c: Cycle) => string;
}

export function makeI18n(lang: Lang): I18n {
  const rtl = lang === 'ar';
  const ts: TextStyle = {
    ...(rtl ? { writingDirection: 'rtl', textAlign: 'right' } : {}),
    ...(lang === 'zgh' ? { fontFamily: Platform.OS === 'web' ? `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif, ${TIFINAGH_FONT}` : TIFINAGH_FONT } : {}),
  };
  const t = (key: string, params?: Record<string, string | number>) => translate(lang, key, params);
  return {
    lang, rtl, t, ts,
    row: rtl ? 'row-reverse' : 'row',
    subject: (id) => (id === 'arabe' ? SUBJECTS.arabe.name : t(SUBJECTS[id].name)),
    level: (l) => t(l.label),
    cycle: (c) => t(CYCLE_LABEL[c]),
  };
}

export function useI18n(): I18n {
  const { state } = useApp();
  return useMemo(() => makeI18n(state.lang ?? 'fr'), [state.lang]);
}
