/**
 * Thèmes du programme Massar par niveau et par matière (indicatif, à valider
 * par un enseignant — voir docs/revue-experts.md, constat C-01).
 * Un thème relié à `chapterId` a un cours rédigé dans l'app ; les autres
 * apparaissent dans la recherche avec la mention « bientôt ».
 */
import { TOPIC_LINKS } from './content/links';
import type { SubjectId } from './types';

export interface Topic {
  title: string;
  chapterId?: string;
}

const t = (title: string, chapterId?: string): Topic => ({ title, chapterId });

type Programme = Record<string, Partial<Record<SubjectId, Topic[]>>>;

const ISLAMIQUE: Topic[] = [
  t('مدخل التزكية (القرآن الكريم)'),
  t('مدخل الاقتداء (السيرة النبوية)'),
  t('مدخل الاستجابة (العبادات)'),
  t('مدخل القسط (الحقوق والواجبات)'),
  t('مدخل الحكمة (الأخلاق والقيم)'),
];

const PROGRAMME_BASE: Programme = {
  '1AP': {
    math: [
      t('Les nombres de 0 à 20', '1AP-math-1'),
      t('Les nombres jusqu’à 100'),
      t('Addition sans retenue'),
      t('Soustraction simple'),
      t('Formes géométriques : carré, rectangle, triangle, cercle'),
      t('Se repérer dans l’espace : devant, derrière, à droite, à gauche'),
      t('La monnaie : pièces et billets en dirhams'),
    ],
    francais: [
      t('Les voyelles et les syllabes', '1AP-francais-1'),
      t('Les consonnes : m, l, r, s, p, t'),
      t('Lire des mots simples'),
      t('Se présenter : je m’appelle…'),
      t('La famille et la maison (vocabulaire)'),
    ],
    arabe: [
      t('الحروف: أ ب ت', '1AP-arabe-1'),
      t('الحركات: الفتحة والضمة والكسرة'),
      t('المدود'),
      t('التعبير الشفهي: أنا وأسرتي'),
    ],
    eveil: [t('Mon corps et mes cinq sens', '1AP-eveil-1'), t('Les animaux autour de moi'), t('L’hygiène au quotidien')],
    islamique: ISLAMIQUE,
  },
  '2AP': {
    math: [
      t('Addition et soustraction jusqu’à 100', '2AP-math-1'),
      t('Les nombres jusqu’à 1 000'),
      t('Addition avec retenue'),
      t('Initiation à la multiplication'),
      t('Mesurer des longueurs : le mètre et le centimètre'),
      t('Lire l’heure'),
      t('Les droites et les segments'),
    ],
    francais: [
      t('Le nom et le déterminant', '2AP-francais-1'),
      t('Le masculin et le féminin'),
      t('Le singulier et le pluriel'),
      t('Les sons ou, on, an, in'),
      t('Lire et comprendre une petite histoire'),
    ],
    arabe: [t('التنوين', '2AP-arabe-1'), t('الشدة'), t('أسماء الإشارة'), t('قراءة نص قصير وفهمه')],
    eveil: [t('Les plantes : besoins et croissance'), t('Les saisons'), t('Les aliments et la santé')],
    islamique: ISLAMIQUE,
  },
  '3AP': {
    math: [
      t('La multiplication : tables de 2 à 5', '3AP-math-1'),
      t('Les nombres jusqu’à 10 000'),
      t('La division : partage et groupement'),
      t('Les angles droits'),
      t('Périmètre du carré et du rectangle'),
      t('Les masses : le kilogramme et le gramme'),
    ],
    francais: [
      t('Le présent des verbes du 1er groupe', '3AP-francais-1'),
      t('Le sujet et le verbe'),
      t('Les adjectifs qualificatifs'),
      t('La ponctuation'),
      t('Écrire une carte d’invitation'),
    ],
    arabe: [t('الفعل الماضي والمضارع والأمر'), t('الضمائر المنفصلة'), t('التاء المربوطة والمبسوطة')],
    eveil: [t('Les états de l’eau', '3AP-eveil-1'), t('Les sources de lumière'), t('Le squelette et les muscles')],
    hg: [t('Se repérer sur un plan'), t('Ma commune et ma région'), t('La famille et les générations')],
    islamique: ISLAMIQUE,
  },
  '4AP': {
    math: [
      t('Les fractions simples', '4AP-math-1'),
      t('Les grands nombres jusqu’à 999 999'),
      t('La multiplication posée'),
      t('La division euclidienne'),
      t('Aire du carré et du rectangle'),
      t('Les droites parallèles et perpendiculaires'),
    ],
    francais: [
      t('Le passé composé avec avoir', '4AP-francais-1'),
      t('Le futur simple'),
      t('Le complément d’objet direct'),
      t('Les homophones a / à, et / est'),
      t('Écrire un récit court'),
    ],
    arabe: [t('الجملة الاسمية', '4AP-arabe-1'), t('الجملة الفعلية'), t('المفعول به'), t('علامات الترقيم')],
    eveil: [t('La digestion'), t('Le circuit électrique simple'), t('Les mélanges')],
    hg: [t('Le Maroc : relief et climat', '4AP-hg-1'), t('Les Idrissides'), t('Droits et devoirs de l’enfant')],
    islamique: ISLAMIQUE,
  },
  '5AP': {
    math: [
      t('Les nombres décimaux', '5AP-math-1'),
      t('Addition et soustraction des décimaux'),
      t('Fractions et nombres décimaux'),
      t('Le cercle et le disque'),
      t('Les volumes : le cube et le pavé droit'),
      t('Les durées'),
    ],
    francais: [
      t('L’imparfait de l’indicatif', '5AP-francais-1'),
      t('Le complément circonstanciel'),
      t('Les pronoms personnels'),
      t('L’accord du participe passé avec être'),
      t('Écrire une lettre'),
    ],
    arabe: [t('كان وأخواتها'), t('إن وأخواتها'), t('الحال'), t('كتابة رسالة')],
    eveil: [t('La respiration', '5AP-eveil-1'), t('La circulation sanguine'), t('L’air et ses propriétés')],
    hg: [t('Les Almoravides et les Almohades'), t('Les ressources naturelles du Maroc'), t('La citoyenneté')],
    islamique: ISLAMIQUE,
  },
  '6AP': {
    math: [
      t('Proportionnalité et pourcentages', '6AP-math-1'),
      t('Multiplication et division des décimaux'),
      t('Les échelles'),
      t('Aire du triangle et du disque'),
      t('La vitesse moyenne'),
      t('Préparer l’examen provincial'),
    ],
    francais: [
      t('Les types et formes de phrases', '6AP-francais-1'),
      t('Le passé simple'),
      t('La phrase complexe : les propositions'),
      t('Le discours direct'),
      t('Production écrite : décrire un lieu'),
    ],
    arabe: [t('الصفة والموصوف', '6AP-arabe-1'), t('العدد والمعدود'), t('الإنتاج الكتابي: الوصف')],
    eveil: [t('La reproduction des plantes'), t('Les énergies renouvelables', '6AP-eveil-1'), t('L’électricité et la sécurité')],
    hg: [t('Les Saadiens et les Alaouites'), t('Le Maroc indépendant'), t('Le développement durable')],
    islamique: ISLAMIQUE,
  },
  '1AC': {
    math: [
      t('Les nombres relatifs', '1AC-math-1'),
      t('Opérations sur les nombres décimaux'),
      t('Les fractions : opérations'),
      t('Les puissances'),
      t('Le développement et la factorisation (initiation)'),
      t('La symétrie axiale et centrale'),
      t('Les triangles et les droites remarquables'),
    ],
    francais: [
      t('Le schéma narratif du conte', '1AC-francais-1'),
      t('Les classes grammaticales'),
      t('Les temps du récit'),
      t('Le portrait'),
      t('Production écrite : écrire un conte'),
    ],
    arabe: [t('النعت'), t('الإضافة'), t('الأسلوب الخبري والإنشائي')],
    anglais: [t('Greetings and introductions'), t('The verb to be', '1AC-anglais-1'), t('Family and daily routine')],
    svt: [t('Les chaînes alimentaires et l’écosystème', '1AC-svt-1'), t('La respiration chez les êtres vivants'), t('Les roches et le sol')],
    pc: [t('La matière et ses états'), t('La masse volumique'), t('Le circuit électrique simple')],
    hg: [t('Introduction à l’histoire : sources et repères'), t('Les grandes civilisations antiques'), t('Les cartes et l’échelle')],
    islamique: ISLAMIQUE,
  },
  '2AC': {
    math: [
      t('Le théorème de Pythagore', '2AC-math-1'),
      t('Le calcul littéral'),
      t('Les équations (initiation)'),
      t('Les puissances de 10 et l’écriture scientifique'),
      t('La proportionnalité et les pourcentages'),
      t('Les statistiques : moyenne et effectifs'),
    ],
    francais: [
      t('Le discours direct et indirect', '2AC-francais-1'),
      t('La nouvelle réaliste'),
      t('Les figures de style'),
      t('La lettre et le texte injonctif'),
    ],
    arabe: [t('الفاعل ونائب الفاعل'), t('المبتدأ والخبر'), t('الخطاطة السردية')],
    anglais: [t('Simple past'), t('Food and health'), t('Describing places')],
    svt: [t('La digestion et l’absorption', '2AC-svt-1'), t('La respiration et la circulation'), t('La reproduction des plantes')],
    pc: [t('Circuits en série et en dérivation', '2AC-pc-1'), t('L’intensité du courant'), t('La combustion')],
    hg: [t('Le Maroc au Moyen Âge'), t('La population mondiale'), t('Les grandes découvertes')],
    islamique: ISLAMIQUE,
  },
  '3AC': {
    math: [
      t('Les équations du premier degré', '3AC-math-1'),
      t('Le théorème de Thalès', '3AC-math-2'),
      t('Les identités remarquables'),
      t('Les systèmes de deux équations'),
      t('Les fonctions linéaires et affines'),
      t('La trigonométrie dans le triangle rectangle'),
      t('Les statistiques'),
    ],
    francais: [
      t('Le texte argumentatif', '3AC-francais-1'),
      t('Le théâtre'),
      t('L’expression de la cause et de la conséquence'),
      t('Préparer l’examen régional'),
    ],
    arabe: [t('النص الحجاجي'), t('المفعول لأجله'), t('أسلوب الشرط')],
    anglais: [t('Present perfect', '3AC-anglais-1'), t('Environment'), t('Writing an email')],
    svt: [t('Le système nerveux'), t('L’immunité', '3AC-svt-1'), t('La génétique (initiation)')],
    pc: [t('La loi d’Ohm', '3AC-pc-1'), t('Le poids et la masse'), t('Les ions et le pH')],
    hg: [t('La colonisation et la résistance'), t('L’indépendance du Maroc'), t('La mondialisation')],
    islamique: ISLAMIQUE,
  },
  TC: {
    math: [
      t('Les équations du second degré', 'TC-math-1'),
      t('Les ensembles de nombres'),
      t('L’ordre et les intervalles'),
      t('Les polynômes'),
      t('Les vecteurs et la translation'),
      t('La droite dans le plan'),
      t('Les généralités sur les fonctions'),
    ],
    francais: [
      t('Les points de vue narratifs', 'TC-francais-1'),
      t('La nouvelle'),
      t('Le résumé de texte'),
      t('L’argumentation'),
    ],
    arabe: [t('النص الشعري'), t('المقالة'), t('مهارة التلخيص')],
    anglais: [t('Education'), t('Future forms'), t('Writing a paragraph')],
    svt: [t('Les techniques d’étude d’un milieu naturel'), t('Les relations alimentaires'), t('La cellule', 'TC-svt-1')],
    pc: [t('La gravitation universelle', 'TC-pc-1'), t('Les actions mécaniques'), t('L’atome et le tableau périodique')],
    philo: [t('La naissance de la philosophie'), t('Qu’est-ce que la philosophie ?'), t('L’utilité de la philosophie')],
    islamique: ISLAMIQUE,
  },
  '1BAC': {
    math: [
      t('Les suites numériques', '1BAC-math-1'),
      t('La logique et le raisonnement'),
      t('Les fonctions : limites et dérivation'),
      t('Le barycentre'),
      t('Le produit scalaire'),
      t('La trigonométrie'),
    ],
    francais: [
      t('Méthodologie de l’examen régional', '1BAC-francais-1'),
      t('La tragédie'),
      t('Le roman à thèse'),
      t('Le récit de vie'),
    ],
    arabe: [t('القصة القصيرة'), t('المسرح'), t('مهارة التحليل')],
    anglais: [t('Cultural values'), t('Conditionals'), t('Writing an argumentative essay')],
    svt: [t('La production de la matière organique'), t('Le sol'), t('La géologie : formation des chaînes de montagnes')],
    pc: [t('Travail et énergie cinétique', '1BAC-pc-1'), t('L’énergie potentielle de pesanteur'), t('Les réactions d’oxydoréduction')],
    philo: [t('Nature et culture'), t('Le travail et la technique'), t('Le langage')],
    islamique: ISLAMIQUE,
  },
  '2BAC': {
    math: [
      t('La fonction exponentielle', '2BAC-math-1'),
      t('Limites et continuité'),
      t('La dérivation et l’étude de fonctions'),
      t('La fonction logarithme népérien'),
      t('Les nombres complexes', '2BAC-math-2'),
      t('Le calcul intégral'),
      t('Le dénombrement et les probabilités'),
    ],
    francais: [t('L’argumentation'), t('La production écrite'), t('Préparer l’oral')],
    arabe: [t('النص الشعري الحديث'), t('مهارة المقارنة')],
    anglais: [t('Women and power'), t('Reported speech'), t('Writing an opinion essay')],
    svt: [
      t('Respiration cellulaire et fermentation', '2BAC-svt-1'),
      t('L’information génétique'),
      t('La génétique humaine'),
      t('L’immunologie'),
    ],
    pc: [
      t('La décroissance radioactive', '2BAC-pc-1'),
      t('Les ondes mécaniques progressives'),
      t('Le dipôle RC'),
      t('Les lois de Newton'),
      t('Les transformations chimiques lentes et rapides'),
    ],
    philo: [t('La personne et autrui'), t('La connaissance : théorie et vérité'), t('La politique : l’État et le droit'), t('La morale : le devoir et le bonheur')],
    islamique: ISLAMIQUE,
  },
};

/** Programme avec liens vers les cours (copie par niveau : les thèmes partagés ne se mélangent pas). */
export const PROGRAMME: Programme = Object.fromEntries(
  Object.entries(PROGRAMME_BASE).map(([lvl, subs]) => [
    lvl,
    Object.fromEntries(
      Object.entries(subs).map(([sub, topics]) => [
        sub,
        (topics ?? []).map((tp) => ({ ...tp, chapterId: tp.chapterId ?? TOPIC_LINKS[`${lvl}|${sub}|${tp.title}`] })),
      ]),
    ),
  ]),
) as Programme;

export function topicsFor(levelId: string, subjectId: SubjectId): Topic[] {
  return PROGRAMME[levelId]?.[subjectId] ?? [];
}
