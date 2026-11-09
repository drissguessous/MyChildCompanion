/**
 * Générateurs d'exercices : entraînement illimité, bilans et défis famille.
 * Déterministes à partir d'une graine, pour pouvoir recalculer le corrigé.
 */
import type { Question, SubjectId } from '../data/types';

export function rng(seed: number) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
type Rand = () => number;
const int = (r: Rand, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const pick = <T,>(r: Rand, arr: T[]) => arr[Math.floor(r() * arr.length)];
const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace('.', ',');

export interface Skill {
  id: string;
  title: string;
  subjectId: SubjectId;
  levels: string[]; // niveaux où la compétence est travaillée
  make: (r: Rand, id: string) => Question;
}

const VERBS = ['jouer', 'chanter', 'parler', 'marcher', 'regarder', 'danser', 'écouter', 'aimer', 'dessiner', 'arriver', 'travailler', 'sauter'];
const PRONOUNS: [string, string, string][] = [
  ['je', 'e', 'ais'], ['tu', 'es', 'ais'], ['il', 'e', 'ait'], ['elle', 'e', 'ait'],
  ['nous', 'ons', 'ions'], ['vous', 'ez', 'iez'], ['ils', 'ent', 'aient'], ['elles', 'ent', 'aient'],
];
const elide = (p: string, v: string) => (p === 'je' && /^[aeéiouh]/.test(v) ? `j’${v}` : `${p} ${v}`);

export const SKILLS: Skill[] = [
  {
    id: 'add20', title: 'Additions jusqu’à 20', subjectId: 'math', levels: ['1AP', '2AP'],
    make: (r, id) => { const a = int(r, 1, 12), b = int(r, 1, 20 - a); return { id, type: 'number', prompt: `${a} + ${b} = ?`, answer: a + b, explanation: `On part de ${a} et on avance de ${b} : ${a + b}.` }; },
  },
  {
    id: 'sub20', title: 'Soustractions jusqu’à 20', subjectId: 'math', levels: ['1AP', '2AP'],
    make: (r, id) => { const a = int(r, 5, 20), b = int(r, 1, a); return { id, type: 'number', prompt: `${a} − ${b} = ?`, answer: a - b, explanation: `On part de ${a} et on recule de ${b} : ${a - b}. Vérification : ${a - b} + ${b} = ${a}.` }; },
  },
  {
    id: 'add100', title: 'Additions et soustractions jusqu’à 100', subjectId: 'math', levels: ['2AP', '3AP'],
    make: (r, id) => {
      if (r() < 0.5) { const a = int(r, 10, 60), b = int(r, 5, 99 - a); return { id, type: 'number', prompt: `${a} + ${b} = ?`, answer: a + b, explanation: `Unités puis dizaines : ${a} + ${b} = ${a + b}.` }; }
      const a = int(r, 30, 99), b = int(r, 5, a - 1); return { id, type: 'number', prompt: `${a} − ${b} = ?`, answer: a - b, explanation: `${a} − ${b} = ${a - b} ; vérification : ${a - b} + ${b} = ${a}.` };
    },
  },
  {
    id: 'tables', title: 'Tables de multiplication', subjectId: 'math', levels: ['3AP', '4AP', '5AP', '6AP'],
    make: (r, id) => { const a = int(r, 2, 9), b = int(r, 2, 10); return { id, type: 'number', prompt: `${a} × ${b} = ?`, answer: a * b, explanation: `${a} × ${b} = ${a * b} (${b} fois ${a}).` }; },
  },
  {
    id: 'division', title: 'Division euclidienne', subjectId: 'math', levels: ['4AP', '5AP', '6AP'],
    make: (r, id) => { const b = int(r, 2, 9), q = int(r, 3, 12), rest = int(r, 0, b - 1), a = b * q + rest; return { id, type: 'number', prompt: `Quel est le quotient de ${a} divisé par ${b} ?`, answer: q, explanation: `${a} = ${b} × ${q} + ${rest} : le quotient est ${q}, le reste ${rest}.` }; },
  },
  {
    id: 'fractions', title: 'Fractions d’une quantité', subjectId: 'math', levels: ['4AP', '5AP', '6AP'],
    make: (r, id) => { const d = pick(r, [2, 3, 4, 5, 10]), n = int(r, 1, d - 1), k = int(r, 2, 9), total = d * k; return { id, type: 'number', prompt: `Calcule ${n}/${d} de ${total}.`, answer: n * k, explanation: `${total} ÷ ${d} = ${k}, puis ${k} × ${n} = ${n * k}.` }; },
  },
  {
    id: 'decimaux', title: 'Calcul avec les décimaux', subjectId: 'math', levels: ['5AP', '6AP', '1AC'],
    make: (r, id) => { const a = int(r, 10, 99) / 10, b = int(r, 100, 999) / 100; const s = Math.round((a + b) * 100) / 100; return { id, type: 'number', prompt: `${fr(a)} + ${fr(b)} = ?`, answer: s, tolerance: 0.001, explanation: `On aligne les virgules : ${fr(a)}0 + ${fr(b)} = ${fr(s)}.` }; },
  },
  {
    id: 'pourcentages', title: 'Pourcentages', subjectId: 'math', levels: ['6AP', '1AC', '2AC'],
    make: (r, id) => { const p = pick(r, [10, 20, 25, 50, 75]), n = pick(r, [40, 60, 80, 120, 200, 240, 400]); return { id, type: 'number', prompt: `Calcule ${p} % de ${n}.`, answer: (n * p) / 100, explanation: `${n} × ${p} ÷ 100 = ${fr((n * p) / 100)}.` }; },
  },
  {
    id: 'relatifs', title: 'Nombres relatifs', subjectId: 'math', levels: ['1AC', '2AC', '3AC'],
    make: (r, id) => {
      const a = int(r, -15, 15), b = int(r, -15, 15), sub = r() < 0.5;
      const sb = b < 0 ? `(${b})` : `(+${b})`, sa = a < 0 ? `(${a})` : `(+${a})`;
      const res = sub ? a - b : a + b;
      return { id, type: 'number', prompt: `${sa} ${sub ? '−' : '+'} ${sb} = ?`, answer: res, explanation: sub ? `Soustraire ${sb}, c’est ajouter son opposé : ${a} + (${-b}) = ${res}.` : `Résultat : ${res}.` };
    },
  },
  {
    id: 'pythagore', title: 'Théorème de Pythagore', subjectId: 'math', levels: ['2AC', '3AC', 'TC'],
    make: (r, id) => {
      const [a, b, c] = pick(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]); const k = int(r, 1, 3);
      if (r() < 0.5) return { id, type: 'number', prompt: `Triangle rectangle : côtés de l’angle droit ${a * k} et ${b * k}. Hypoténuse ?`, answer: c * k, explanation: `${a * k}² + ${b * k}² = ${(a * k) ** 2 + (b * k) ** 2} = ${c * k}².` };
      return { id, type: 'number', prompt: `Triangle rectangle : hypoténuse ${c * k}, un côté ${a * k}. Autre côté ?`, answer: b * k, explanation: `${c * k}² − ${a * k}² = ${(c * k) ** 2 - (a * k) ** 2} = ${b * k}².` };
    },
  },
  {
    id: 'equations', title: 'Équations du premier degré', subjectId: 'math', levels: ['3AC', 'TC'],
    make: (r, id) => { const a = int(r, 2, 9), x = int(r, -6, 12), b = int(r, -20, 20), c = a * x + b; const sb = b < 0 ? `− ${-b}` : `+ ${b}`; return { id, type: 'number', prompt: `Résous : ${a}x ${sb} = ${c}. x = ?`, answer: x, explanation: `${a}x = ${c} ${b < 0 ? '+' : '−'} ${Math.abs(b)} = ${a * x}, donc x = ${x}.` }; },
  },
  {
    id: 'second-degre', title: 'Équations du second degré', subjectId: 'math', levels: ['TC', '1BAC'],
    make: (r, id) => {
      const r1 = int(r, -6, 6), r2 = int(r, -6, 6), s = r1 + r2, p = r1 * r2;
      const co = (k: number) => (k === 1 ? '' : String(k));
      const bs = -s === 0 ? '' : -s > 0 ? ` + ${co(-s)}x` : ` − ${co(s)}x`, cs = p === 0 ? '' : p > 0 ? ` + ${p}` : ` − ${-p}`;
      return { id, type: 'number', prompt: `Plus petite solution de x²${bs}${cs} = 0 ?`, answer: Math.min(r1, r2), explanation: `Δ = ${s * s - 4 * p} ; solutions ${Math.min(r1, r2)} et ${Math.max(r1, r2)} (somme ${s}, produit ${p}).` };
    },
  },
  {
    id: 'suites', title: 'Suites arithmétiques et géométriques', subjectId: 'math', levels: ['1BAC', '2BAC'],
    make: (r, id) => {
      if (r() < 0.5) { const u0 = int(r, -5, 10), q = int(r, -4, 6) || 2, n = int(r, 5, 20); return { id, type: 'number', prompt: `Suite arithmétique : u(0) = ${u0}, r = ${q}. u(${n}) = ?`, answer: u0 + n * q, explanation: `u(${n}) = ${u0} + ${n} × ${q} = ${u0 + n * q}.` }; }
      const u0 = int(r, 1, 5), q = int(r, 2, 3), n = int(r, 2, 5); return { id, type: 'number', prompt: `Suite géométrique : u(0) = ${u0}, q = ${q}. u(${n}) = ?`, answer: u0 * q ** n, explanation: `u(${n}) = ${u0} × ${q}^${n} = ${u0 * q ** n}.` };
    },
  },
  {
    id: 'exponentielle', title: 'Équations avec l’exponentielle', subjectId: 'math', levels: ['2BAC'],
    make: (r, id) => { const a = int(r, 1, 4), x = int(r, -4, 6), b = int(r, -5, 5), c = a * x + b; const sb = b === 0 ? '' : b > 0 ? ` + ${b}` : ` − ${-b}`; return { id, type: 'number', prompt: `Résous : e^(${a === 1 ? '' : a}x${sb}) = e^(${c}). x = ?`, answer: x, explanation: `exp est strictement croissante donc injective : ${a}x${sb} = ${c}, x = ${x}.` }; },
  },
  {
    id: 'radioactivite', title: 'Demi-vie radioactive', subjectId: 'pc', levels: ['2BAC'],
    make: (r, id) => { const n = int(r, 1, 4), t = pick(r, [2, 5, 8, 10]), N0 = 1000 * 2 ** int(r, 2, 4); return { id, type: 'number', prompt: `N₀ = ${N0} noyaux, t½ = ${t} jours. Noyaux restants après ${n * t} jours ?`, answer: N0 / 2 ** n, explanation: `${n * t} jours = ${n} demi-vie(s) : ${N0} / 2^${n} = ${N0 / 2 ** n}.` }; },
  },
  {
    id: 'loi-ohm', title: 'Loi d’Ohm', subjectId: 'pc', levels: ['3AC', 'TC'],
    make: (r, id) => { const R = pick(r, [10, 20, 50, 100, 220, 470]), I = pick(r, [0.1, 0.2, 0.05, 0.5]); return { id, type: 'number', prompt: `R = ${R} Ω, I = ${fr(I)} A. U = ? (V)`, answer: Math.round(R * I * 1000) / 1000, tolerance: 0.001, unit: 'V', explanation: `U = R × I = ${R} × ${fr(I)} = ${fr(R * I)} V.` }; },
  },
  {
    id: 'present', title: 'Le présent (verbes en -er)', subjectId: 'francais', levels: ['3AP', '4AP', '5AP'],
    make: (r, id) => { const v = pick(r, VERBS), [p, end] = pick(r, PRONOUNS); const radical = v.slice(0, -2); const form = elide(p, radical + end); return { id, type: 'text', prompt: `Conjugue « ${v} » au présent avec « ${p} ».`, accept: [form, radical + end], explanation: `Radical « ${radical} » + terminaison « -${end} » : ${form}.` }; },
  },
  {
    id: 'imparfait', title: 'L’imparfait (verbes en -er)', subjectId: 'francais', levels: ['5AP', '6AP', '1AC'],
    make: (r, id) => { const v = pick(r, VERBS), [p, , end] = pick(r, PRONOUNS); const radical = v.slice(0, -2); const form = elide(p, radical + end); return { id, type: 'text', prompt: `Conjugue « ${v} » à l’imparfait avec « ${p} ».`, accept: [form, radical + end], explanation: `Radical « ${radical} » + terminaison « -${end} » : ${form}.` }; },
  },
];

export const getSkill = (id: string) => SKILLS.find((s) => s.id === id);

/** Compétences du niveau, puis celles des niveaux précédents (mise à niveau). */
export function skillsFor(levelId: string, levelOrder: string[]): { current: Skill[]; review: Skill[] } {
  const idx = levelOrder.indexOf(levelId);
  const before = new Set(levelOrder.slice(Math.max(0, idx - 2), idx));
  const current = SKILLS.filter((s) => s.levels.includes(levelId));
  const review = SKILLS.filter((s) => !s.levels.includes(levelId) && s.levels.some((l) => before.has(l)));
  return { current, review };
}

export function generate(skillId: string, seed: number, count = 8): Question[] {
  const skill = getSkill(skillId);
  if (!skill) return [];
  const r = rng(seed);
  const out: Question[] = [];
  const seen = new Set<string>();
  for (let i = 0; out.length < count && i < count * 6; i++) {
    const q = skill.make(r, `${skillId}-${out.length + 1}`);
    if (seen.has(q.prompt)) continue;
    seen.add(q.prompt);
    out.push(q);
  }
  return out;
}

export const weekNumber = (d = new Date()) => Math.floor(d.getTime() / (7 * 86_400_000));
