import type { Lang } from '../coach/messages';
import { AR } from './ar';
import { ZGH } from './zgh';

const DICTS: Record<Lang, Record<string, string>> = { fr: {}, ar: AR, zgh: ZGH };

export function translate(lang: Lang, key: string, params?: Record<string, string | number>): string {
  let s = DICTS[lang]?.[key] ?? key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  return s;
}
