/**
 * Voix : lecture à voix haute (synthèse vocale du système) et compréhension
 * des réponses dictées. Le tifinagh n'a pas de voix système : il n'est pas lu.
 */
import * as Speech from 'expo-speech';

export type VoiceLang = 'fr' | 'ar' | 'en';

const LOCALE: Record<VoiceLang, string> = { fr: 'fr-FR', ar: 'ar-SA', en: 'en-US' };

// ───────────── Catalogue des voix ─────────────

export interface VoiceOption {
  id: string;
  label: string;
  language: string;
  score: number;
}

/** Voix « gadgets » d'Apple et voix de très mauvaise qualité, à exclure. */
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/i;
const PREFERRED_LOCALE: Record<VoiceLang, string[]> = { fr: ['fr-fr', 'fr-be', 'fr-ch', 'fr-ca'], ar: ['ar-ma', 'ar-sa', 'ar-xa', 'ar-eg', 'ar-ae', 'ar'], en: ['en-gb', 'en-us', 'en-au'] };

let catalog: Speech.Voice[] = [];
let loaded: Promise<Speech.Voice[]> | null = null;

export function loadVoices(force = false): Promise<Speech.Voice[]> {
  if (loaded && !force) return loaded;
  loaded = (async () => {
    for (let i = 0; i < 6; i++) {
      try {
        catalog = await Speech.getAvailableVoicesAsync();
      } catch {
        catalog = [];
      }
      if (catalog.length) break;
      await new Promise((r) => setTimeout(r, 400)); // le web charge les voix en différé
    }
    return catalog;
  })();
  return loaded;
}

function prettyName(v: Speech.Voice, i: number): string {
  // Android : identifiants techniques (fr-fr-x-frb-local) → « Voix n » ; ailleurs : nom lisible
  const technical = /^[a-z]{2,3}[-_][a-z]{2}(-x-|#|-language)/i.test(v.name) || !/[A-Za-zÀ-ÿ]{3}/.test(v.name);
  const clean = technical ? '' : v.name
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s+-\s+.*$/, '')
    .replace(/^(Microsoft|Google|Apple)\s+/, '')
    .replace(/\s+Online$/, '')
    .trim();
  const named = clean && /^[a-zà-ÿ]/.test(clean) ? v.name.replace(/\s*\(.*?\)\s*/g, ' ').trim() : clean; // « Google français » garde sa marque
  const region = v.language.split(/[-_]/)[1]?.toUpperCase();
  return `${named || `Voix ${i + 1}`}${region ? ` · ${region}` : ''}`;
}

/** Voix utilisables pour une langue, de la meilleure à la moins bonne. */
export function voicesFor(lang: VoiceLang): VoiceOption[] {
  const prefs = PREFERRED_LOCALE[lang];
  const list = catalog
    .filter((v) => v.language.toLowerCase().replace('_', '-').startsWith(lang))
    .filter((v) => !NOVELTY.test(v.name))
    .map((v) => {
      const loc = v.language.toLowerCase().replace('_', '-');
      const idx = prefs.findIndex((p) => loc.startsWith(p));
      let score = idx >= 0 ? 10 - idx : 0;
      if (v.quality === 'Enhanced') score += 6;
      if (/premium|enhanced|neural|natural|online/i.test(v.name)) score += 5;
      if (/google/i.test(v.name)) score += 3;
      if (/local/i.test(v.identifier)) score += 2;
      if (/network/i.test(v.identifier)) score -= 2; // nécessite Internet
      if (/compact/i.test(v.identifier)) score -= 3;
      return { v, score };
    })
    .sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  return list
    .filter(({ v }) => (seen.has(v.identifier) ? false : (seen.add(v.identifier), true)))
    .slice(0, 8)
    .map(({ v, score }, i) => ({ id: v.identifier, label: prettyName(v, i), language: v.language, score }));
}

/** `undefined` tant que le catalogue n'est pas chargé. */
export function hasVoice(lang: VoiceLang): boolean | undefined {
  return catalog.length === 0 ? undefined : voicesFor(lang).length > 0;
}

// ───────────── Préférences (choisies dans l'app, propres à l'appareil) ─────────────

let prefs: { voices: Partial<Record<VoiceLang, string>>; rate: number } = { voices: {}, rate: 0.92 };
export function setVoicePrefs(p: { voices?: Partial<Record<VoiceLang, string>>; rate?: number }) {
  prefs = { voices: p.voices ?? {}, rate: p.rate ?? 0.92 };
}

function voiceIdFor(lang: VoiceLang): string | undefined {
  const chosen = prefs.voices[lang];
  const options = voicesFor(lang);
  if (chosen && options.some((o) => o.id === chosen)) return chosen;
  return options[0]?.id;
}

export const SAMPLE: Record<VoiceLang, string> = {
  fr: 'Bonjour ! Je suis ton professeur. On apprend ensemble aujourd’hui ?',
  ar: 'مرحبا! أنا أستاذك. هل نتعلم معا اليوم؟',
  en: 'Hello! I am your teacher. Shall we learn together today?',
};
export const recognitionLocale = (l: VoiceLang) => (l === 'ar' ? 'ar-MA' : LOCALE[l]);

export function detectLang(text: string, fallback: VoiceLang = 'fr'): VoiceLang {
  const ar = (text.match(/[؀-ۿ]/g) ?? []).length;
  const lat = (text.match(/[A-Za-zÀ-ÿ]/g) ?? []).length;
  if (ar > lat) return 'ar';
  return fallback;
}

/** Nettoie le texte pour la synthèse et rend les notations prononçables dans la langue lue. */
export function speakable(text: string, lang: VoiceLang = 'fr'): string {
  const W = {
    fr: { on: ' sur ', times: ' fois ', div: ' divisé par ', minus: ' moins ', sq: ' au carré', cube: ' au cube', root: ' racine de ', approx: ' environ ', deg: ' degrés', gt: ' plus grand que ', lt: ' plus petit que ', eq: ' égale ', arrow: ', puis ', pow: ' puissance ' },
    ar: { on: ' على ', times: ' ضرب ', div: ' قسمة ', minus: ' ناقص ', sq: ' مربع', cube: ' مكعب', root: ' جذر ', approx: ' تقريبا ', deg: ' درجة', gt: ' أكبر من ', lt: ' أصغر من ', eq: ' يساوي ', arrow: '، ثم ', pow: ' أس ' },
    en: { on: ' over ', times: ' times ', div: ' divided by ', minus: ' minus ', sq: ' squared', cube: ' cubed', root: ' square root of ', approx: ' about ', deg: ' degrees', gt: ' greater than ', lt: ' less than ', eq: ' equals ', arrow: ', then ', pow: ' to the power ' },
  }[lang];
  return text
    .replace(/[\u2D30-\u2D7F]+/g, ' ')
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, ' ')
    .replace(/(\d+)\s*\/\s*(\d+)/g, `$1${W.on}$2`)
    .replace(/°C/g, W.deg).replace(/×/g, W.times).replace(/÷/g, W.div).replace(/−/g, W.minus)
    .replace(/²/g, W.sq).replace(/³/g, W.cube).replace(/√/g, W.root).replace(/≈/g, W.approx)
    .replace(/\s>\s/g, W.gt).replace(/\s<\s/g, W.lt).replace(/\s=\s/g, W.eq).replace(/→/g, W.arrow).replace(/\^/g, W.pow)
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
let gen = 0;
export function speak(id: string, segments: { text: string; lang?: VoiceLang }[], rate = prefs.rate, forceVoice?: string) {
  Speech.stop();
  const my = ++gen; // les rappels d'une lecture annulée (stop asynchrone) sont ignorés
  void loadVoices();
  current = id;
  emit();
  const queue = segments.flatMap((s) => {
    const lang = s.lang ?? detectLang(s.text);
    const clean = speakable(s.text, lang);
    if (!clean) return [];
    return chunks(clean, Math.min(Speech.maxSpeechInputLength || 3000, 1500)).map((t) => ({ t, lang }));
  });
  const next = (i: number) => {
    if (current !== id || gen !== my) return;
    if (i >= queue.length) { current = null; emit(); return; }
    const lang = queue[i].lang;
    // Pas de voix pour cette langue sur l'appareil : on saute plutôt que de mal prononcer
    if (catalog.length && voicesFor(lang).length === 0) { next(i + 1); return; }
    const voice = forceVoice ?? voiceIdFor(lang);
    Speech.speak(queue[i].t, {
      language: LOCALE[lang],
      ...(voice ? { voice } : {}),
      rate: queue[i].lang === 'ar' ? rate * 0.95 : rate,
      onDone: () => { if (gen === my) next(i + 1); },
      onStopped: () => { if (gen === my && current === id) { current = null; emit(); } },
      onError: () => { if (gen === my) next(i + 1); },
    });
  };
  // Laisser le stop se terminer : sinon la 1re phrase (l'énoncé) est coupée et seules les options sont lues
  setTimeout(() => next(0), 250);
}

export function stopSpeaking() {
  current = null;
  emit();
  Speech.stop();
}

export { wordsToNumber, matchChoice, matchTrueFalse } from './voice-core';
