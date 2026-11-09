import { normalize } from '../data';

// ───────────── Compréhension des réponses dictées ─────────────

const FR_UNITS: Record<string, number> = {
  zero: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
  onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40,
  cinquante: 50, soixante: 60, cent: 100, cents: 100, mille: 1000,
};
const AR_UNITS: Record<string, number> = {
  صفر: 0, واحد: 1, واحدة: 1, اثنان: 2, اثنين: 2, ثلاثة: 3, ثلاث: 3, أربعة: 4, اربعة: 4, خمسة: 5, ستة: 6, سبعة: 7, ثمانية: 8,
  تسعة: 9, عشرة: 10, عشرون: 20, عشرين: 20, ثلاثون: 30, ثلاثين: 30, أربعون: 40, أربعين: 40, خمسون: 50, خمسين: 50, مئة: 100, مائة: 100, ألف: 1000,
};

/** « vingt-quatre » → 24 ; « moins trois » → -3 ; « deux virgule cinq » → 2,5 ; chiffres conservés. */
export function wordsToNumber(raw: string): string | undefined {
  const t = normalize(raw).replace(/-/g, ' ');
  const digits = t.match(/-?\d+(?:[.,]\d+)?/);
  if (digits) return digits[0].replace('.', ',');
  const words = t.split(/\s+/).filter((w) => w && w !== 'et' && w !== 'و');
  if (!words.length) return undefined;
  let sign = 1;
  if (words[0] === 'moins' || words[0] === 'ناقص') { sign = -1; words.shift(); }
  const parsePart = (ws: string[]) => {
    let total = 0, cur = 0, seen = false;
    for (const w of ws) {
      const v = FR_UNITS[w] ?? AR_UNITS[w];
      if (v === undefined) continue;
      seen = true;
      if (v === 100) cur = (cur || 1) * 100;
      else if (v === 1000) { total += (cur || 1) * 1000; cur = 0; }
      else if (v === 20 && cur === 4) cur = 80; // quatre-vingt
      else cur += v;
    }
    return seen ? total + cur : undefined;
  };
  const sep = words.findIndex((w) => w === 'virgule' || w === 'فاصلة');
  const ent = parsePart(sep >= 0 ? words.slice(0, sep) : words);
  if (ent === undefined) return undefined;
  if (sep >= 0) {
    const dec = parsePart(words.slice(sep + 1));
    if (dec !== undefined) return `${sign < 0 ? '-' : ''}${ent},${dec}`;
  }
  return String(sign * ent);
}

/** Associe une phrase dictée à un choix de QCM (« réponse B », « la deuxième », texte du choix). */
export function matchChoice(spoken: string, choices: string[]): number | undefined {
  const s = normalize(spoken);
  const letter = s.match(/\b(?:reponse|choix|lettre)?\s*\b([abcd])\b/);
  if (letter) return 'abcd'.indexOf(letter[1]);
  const ordinals = [['premiere', 'premier', 'un', 'الأول', 'الاول'], ['deuxieme', 'second', 'seconde', 'deux', 'الثاني'], ['troisieme', 'trois', 'الثالث'], ['quatrieme', 'quatre', 'الرابع']];
  for (let i = 0; i < Math.min(ordinals.length, choices.length); i++) if (ordinals[i].some((o) => s.split(' ').includes(o))) return i;
  let best = -1, score = 0;
  choices.forEach((c, i) => {
    const words = normalize(c).split(' ').filter((w) => w.length > 1);
    const hit = words.filter((w) => s.includes(w)).length / Math.max(1, words.length);
    if (hit > score) { score = hit; best = i; }
  });
  return score >= 0.6 ? best : undefined;
}

export function matchTrueFalse(spoken: string): boolean | undefined {
  const s = normalize(spoken);
  if (/\b(vrai|oui|yes|true)\b|صحيح|نعم/.test(s)) return true;
  if (/\b(faux|non|no|false)\b|خطأ|خطا|لا/.test(s)) return false;
  return undefined;
}
