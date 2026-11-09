/**
 * Voix : lecture à voix haute (synthèse vocale du système) et compréhension
 * des réponses dictées. Le tifinagh n'a pas de voix système : il n'est pas lu.
 */
import * as Speech from 'expo-speech';

export type VoiceLang = 'fr' | 'ar' | 'en';

const LOCALE: Record<VoiceLang, string> = { fr: 'fr-FR', ar: 'ar-SA', en: 'en-US' };
export const recognitionLocale = (l: VoiceLang) => (l === 'ar' ? 'ar-MA' : LOCALE[l]);

export function detectLang(text: string, fallback: VoiceLang = 'fr'): VoiceLang {
  const ar = (text.match(/[؀-ۿ]/g) ?? []).length;
  const lat = (text.match(/[A-Za-zÀ-ÿ]/g) ?? []).length;
  if (ar > lat) return 'ar';
  return fallback;
}

/** Nettoie le texte pour la synthèse : émojis, tifinagh, symboles. */
export function speakable(text: string): string {
  return text
    .replace(/[ⴰ-⵿]+/g, ' ')
    .replace(/\p{Extended_Pictographic}|️|‍/gu, ' ')
    .replace(/×/g, ' fois ').replace(/÷/g, ' divisé par ').replace(/−/g, ' moins ')
    .replace(/²/g, ' au carré').replace(/√/g, ' racine de ').replace(/≈/g, ' environ ')
    .replace(/\s+/g, ' ')
    .trim();
}

type Listener = (id: string | null) => void;
let current: string | null = null;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l(current));
export const onSpeakingChange = (l: Listener) => { listeners.add(l); return () => { listeners.delete(l); }; };
export const speakingId = () => current;

function chunks(text: string, max: number): string[] {
  const parts = text.split(/(?<=[.!?؟:;])\s+/);
  const out: string[] = [];
  let buf = '';
  for (const p of parts) {
    if ((buf + ' ' + p).length > max && buf) { out.push(buf); buf = p; } else buf = buf ? `${buf} ${p}` : p;
  }
  if (buf) out.push(buf);
  return out;
}

/** Lit une suite de segments ; chaque segment peut avoir sa propre langue. */
export function speak(id: string, segments: { text: string; lang?: VoiceLang }[], rate = 0.92) {
  Speech.stop();
  current = id;
  emit();
  const queue = segments.flatMap((s) => {
    const clean = speakable(s.text);
    if (!clean) return [];
    const lang = s.lang ?? detectLang(clean);
    return chunks(clean, Math.min(Speech.maxSpeechInputLength || 3000, 1500)).map((t) => ({ t, lang }));
  });
  const next = (i: number) => {
    if (current !== id) return;
    if (i >= queue.length) { current = null; emit(); return; }
    Speech.speak(queue[i].t, {
      language: LOCALE[queue[i].lang],
      rate: queue[i].lang === 'ar' ? rate * 0.95 : rate,
      onDone: () => next(i + 1),
      onStopped: () => { if (current === id) { current = null; emit(); } },
      onError: () => next(i + 1),
    });
  };
  next(0);
}

export function stopSpeaking() {
  current = null;
  emit();
  Speech.stop();
}

export { wordsToNumber, matchChoice, matchTrueFalse } from './voice-core';
