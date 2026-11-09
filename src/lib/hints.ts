/**
 * « Explique-moi » : une piste de méthode pour chaque question, sans donner la réponse
 * (le corrigé reste protégé par le mot de passe parent).
 */
import { CHAPTERS, getChapter } from '../data';
import type { Chapter, Question } from '../data/types';
import type { Activity } from './activities';
import { unitOf } from './activities';
import { getSkill } from './generators';

export const SKILL_HINTS: Record<string, string> = {
  add20: 'Pars du plus grand nombre et avance un par un sur tes doigts ou sur une ligne de nombres.',
  sub20: 'Pars du premier nombre et recule. Vérifie ensuite en faisant l’addition inverse.',
  add100: 'Sépare dizaines et unités : additionne les unités, puis les dizaines. N’oublie pas la retenue si les unités dépassent 9.',
  tables: 'Une multiplication, c’est une addition répétée : 4 × 3, c’est 3 + 3 + 3 + 3. Aide-toi de la table que tu connais le mieux.',
  division: 'Cherche dans la table du diviseur le plus grand produit qui ne dépasse pas le nombre. Ce que tu as multiplié, c’est le quotient.',
  fractions: 'Divise d’abord la quantité par le dénominateur (le nombre du bas), puis multiplie par le numérateur (le nombre du haut).',
  decimaux: 'Écris les nombres l’un sous l’autre en alignant les virgules, complète avec des zéros, puis calcule comme d’habitude.',
  pourcentages: 'Prendre p % d’un nombre, c’est le multiplier par p puis diviser par 100. Astuce : 10 % c’est diviser par 10, 50 % c’est la moitié.',
  relatifs: 'Pense à un thermomètre. Soustraire un nombre, c’est ajouter son opposé. Même signe : on additionne ; signes contraires : on soustrait.',
  pythagore: 'Repère l’hypoténuse (en face de l’angle droit). Son carré est égal à la somme des carrés des deux autres côtés.',
  equations: 'Isole x : enlève d’abord le nombre ajouté (de chaque côté), puis divise par le nombre devant x. Vérifie en remplaçant.',
  'second-degre': 'Calcule Δ = b² − 4ac, puis les racines (−b ± √Δ) / 2a. Vérifie avec la somme (−b/a) et le produit (c/a).',
  suites: 'Arithmétique : on ajoute la raison à chaque étape, u(n) = u(0) + n × r. Géométrique : on multiplie, u(n) = u(0) × qⁿ.',
  exponentielle: 'La fonction exponentielle est strictement croissante : si e^A = e^B alors A = B. Résous ensuite l’équation obtenue.',
  radioactivite: 'Compte combien de demi-vies se sont écoulées ; à chaque demi-vie, le nombre de noyaux est divisé par 2.',
  'loi-ohm': 'U = R × I : multiplie la résistance (en ohms) par l’intensité (en ampères). Convertis les milliampères avant.',
  present: 'Enlève -er pour trouver le radical, puis ajoute la terminaison du présent : -e, -es, -e, -ons, -ez, -ent.',
  imparfait: 'Enlève -er pour trouver le radical, puis ajoute la terminaison de l’imparfait : -ais, -ais, -ait, -ions, -iez, -aient.',
};

const TYPE_TIPS: Record<'fr' | 'ar', Record<Question['type'], string>> = {
  fr: {
    qcm: 'Lis toutes les propositions et élimine d’abord celles qui sont impossibles.',
    tf: 'Cherche un exemple qui confirme ou qui contredit la phrase.',
    number: 'Pose le calcul au brouillon, puis écris seulement le nombre trouvé.',
    text: 'Relis la règle du cours, puis écris ta réponse sans faute.',
    open: 'Réponds par des phrases complètes : une idée, une justification, et si possible un exemple.',
  },
  ar: {
    qcm: 'اقرأ كل الاقتراحات واستبعد أولا ما هو مستحيل.',
    tf: 'ابحث عن مثال يؤكد الجملة أو ينفيها.',
    number: 'أنجز العملية في المسودة، ثم اكتب العدد فقط.',
    text: 'أعد قراءة قاعدة الدرس، ثم اكتب جوابك بدون أخطاء.',
    open: 'أجب بجمل تامة: فكرة، ثم تعليل، ومثال إن أمكن.',
  },
};

function rulesOf(ch?: Chapter): string[] {
  if (!ch) return [];
  return ch.lesson.filter((b) => b.type === 'rule').slice(0, 2).map((b) => ('text' in b ? b.text : ''));
}

export interface Hint {
  lang: 'fr' | 'ar' | 'en';
  method?: string;
  rules: string[];
  tip: string;
}

export function hintFor(q: Question, act: Activity): Hint {
  const unit = unitOf(q.id);
  let ch: Chapter | undefined;
  let skillId: string | undefined;
  if (act.kind === 'exercice') ch = getChapter(act.refId);
  else if (act.kind === 'entrainement') skillId = act.refId.split(':')[0];
  else if (act.kind === 'bilan') { ch = getChapter(unit); if (!ch && getSkill(unit)) skillId = unit; }
  else ch = CHAPTERS.find((c) => c.levelId === act.levelId && c.subjectId === act.subjectId);
  const lang = ch?.lang ?? act.lang;
  const tipLang = lang === 'ar' ? 'ar' : 'fr';
  return {
    lang,
    method: skillId ? SKILL_HINTS[skillId] : undefined,
    rules: rulesOf(ch),
    tip: TYPE_TIPS[tipLang][q.type],
  };
}
