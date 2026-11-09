/**
 * Bibliothèque fermée des messages du professeur-compagnon d'Oustadati,
 * en français, en arabe et en amazigh (tifinagh, bêta : à faire relire).
 * Règles : docs/revue-experts.md (charte d'accompagnement).
 * Le script `npm run check:tone` refuse tout mot des listes FORBIDDEN_*.
 *
 * c(m, f) accorde au genre de l'enfant ; t(m, f) au genre du professeur.
 */

export type Gender = 'f' | 'm';
export type Lang = 'fr' | 'ar' | 'zgh';

export interface Ctx {
  name: string;
  teacher: string;
  c: (m: string, f: string) => string;
  t: (m: string, f: string) => string;
}

type Msg = (x: Ctx) => string;

export const FORBIDDEN_WORDS = [
  'nul', 'nulle', 'raté', 'ratée', 'échec', 'échoué', 'mauvais', 'mauvaise', 'idiot', 'idiote', 'bête',
  'honte', 'décevant', 'décevante', 'déçu', 'déçue', 'paresseux', 'paresseuse', 'faible', 'catastrophe', 'stupide',
];
export const FORBIDDEN_WORDS_AR = ['فاشل', 'فاشلة', 'غبي', 'غبية', 'كسول', 'كسولة', 'ضعيف', 'ضعيفة', 'عار', 'خيبة', 'رسوب', 'أحمق'];

export const MOODS = [
  { id: 'super', emoji: '🤩' },
  { id: 'bien', emoji: '🙂' },
  { id: 'fatigue', emoji: '🥱' },
  { id: 'stresse', emoji: '😟' },
  { id: 'triste', emoji: '😢' },
] as const;
export type MoodId = (typeof MOODS)[number]['id'];

export interface CoachPack {
  greetings: Record<'matin' | 'aprem' | 'soir', Msg[]>;
  result: Record<'bravo' | 'fier' | 'progres' | 'ensemble', Msg[]>;
  improved: Msg[];
  retry: Msg[];
  examBefore: Msg[];
  examAfterPending: Msg;
  moodLabels: Record<MoodId, string>;
  moodReplies: Record<MoodId, Msg>;
  talkToParent: Msg;
  breathing: string[];
  tips: Msg[];
  streak: Msg;
  star: Msg;
  mission: Msg;
  missionDone: Msg;
}

const FR: CoachPack = {
  greetings: {
    matin: [
      (x) => `Bonjour ${x.name} ! J’espère que tu as bien dormi. On apprend une petite chose ensemble ?`,
      (x) => `Sabah el kheir ${x.name} ☀️ Je suis ${x.t('content', 'contente')} de te voir ce matin.`,
    ],
    aprem: [
      (x) => `Coucou ${x.name} ! Tu as goûté ? Un cerveau bien nourri apprend mieux.`,
      (x) => `Re-bonjour ${x.name} ! Je t’attendais avec plaisir.`,
    ],
    soir: [
      (x) => `Bonsoir ${x.name} 🌙 Une petite révision douce, puis au lit à l’heure ?`,
      (x) => `Masa el kheir ${x.name}. Même dix minutes ce soir, c’est déjà un beau cadeau pour demain.`,
    ],
  },
  result: {
    bravo: [
      (x) => `Waouh ${x.name} ! Tu as tout compris. Je suis ${x.t('fier', 'fière')} du travail que tu as fourni.`,
      (x) => `Magnifique ! Ta concentration a payé, ${x.name}. Tu peux être ${x.c('fier', 'fière')} de toi.`,
    ],
    fier: [
      (x) => `Très beau travail, ${x.name} ! Il reste juste quelques questions à revoir, et on s’en occupe ensemble.`,
      () => `Tu as bien travaillé ! Les questions en orange sont de petites marches de plus à monter.`,
    ],
    progres: [
      (x) => `Tu avances, ${x.name}. Chaque question réussie est une vraie victoire. On reprend celles en orange ?`,
      () => `Bien joué d’avoir essayé jusqu’au bout ! Réessayer, c’est comme ça que le cerveau grandit.`,
    ],
    ensemble: [
      (x) => `Merci d’avoir essayé, ${x.name}. Ce chapitre est nouveau pour toi, c’est normal qu’il demande du temps. Relisons le cours ensemble, puis on réessaie.`,
      () => `Ce n’est pas encore facile, et c’est normal : on apprend justement en se trompant. Je reste à côté de toi, on y va doucement.`,
    ],
  },
  improved: [
    (x) => `Tu as fait mieux que la dernière fois, ${x.name} ! Ta persévérance porte ses fruits. 🌟`,
    () => `Tu progresses, et ça se voit. Continue comme ça, pas à pas.`,
  ],
  retry: [
    (x) => `Allez ${x.name}, une seconde chance ! Prends ton temps et relis bien la question.`,
    () => `Respire, relis, essaie. Je crois en toi.`,
  ],
  examBefore: [
    (x) => `Avant de commencer, ${x.name} : ce n’est qu’un entraînement. Commence par ce que tu sais, et n’oublie pas de respirer.`,
    (x) => `Tu as révisé, tu es ${x.c('prêt', 'prête')}. Lis tranquillement chaque question ; je suis là.`,
  ],
  examAfterPending: () => `Tu as terminé, bravo pour ta concentration ! Certaines réponses rédigées seront lues avec papa ou maman pour compléter ta note.`,
  moodLabels: { super: 'Super', bien: 'Bien', fatigue: 'Fatigué·e', stresse: 'Stressé·e', triste: 'Triste' },
  moodReplies: {
    super: (x) => `Génial ${x.name} ! Profitons de cette belle énergie pour apprendre une chose nouvelle.`,
    bien: (x) => `Je suis ${x.t('content', 'contente')} pour toi. On commence doucement ?`,
    fatigue: (x) => `Merci de me le dire, ${x.name}. Bois un verre d’eau, étire-toi un peu. Aujourd’hui, on fait une petite séance courte, c’est déjà très bien.`,
    stresse: (x) => `C’est normal d’être ${x.c('stressé', 'stressée')} parfois, même les grands le sont. On fait ensemble un petit exercice de respiration ?`,
    triste: (x) => `Je suis là, ${x.name}. Tu as le droit d’être triste. Si tu veux, va faire un câlin à papa ou maman et parle-leur : ça aide beaucoup. Je t’attendrai ici.`,
  },
  talkToParent: (x) => `${x.name}, ces derniers jours ont l’air difficiles pour toi. Ce serait bien d’en parler avec papa, maman ou un adulte en qui tu as confiance. Tu n’es pas ${x.c('seul', 'seule')}. 💛`,
  breathing: ['Inspire doucement par le nez…', 'Garde l’air un petit moment…', 'Souffle tout doucement par la bouche…'],
  tips: [
    () => 'Astuce : explique la leçon à voix haute comme si tu étais le professeur. C’est la meilleure façon de la retenir.',
    () => 'Astuce : un peu chaque jour vaut mieux que beaucoup la veille du contrôle.',
    () => 'Astuce : se tromper, c’est apprendre. Les erreurs sont des indices, pas des fautes.',
    () => 'Astuce : range ton bureau avant de travailler, ton esprit sera plus clair.',
    () => 'Astuce : après 25 minutes de travail, fais une pause de 5 minutes.',
    (x) => `Astuce de ${x.teacher} : bien dormir aide la mémoire à ranger ce que tu as appris.`,
  ],
  streak: (x) => `Tu es venu${x.c('', 'e')} travailler plusieurs jours de suite, ${x.name}. Cette régularité, c’est ta super-force ! 🔥`,
  star: () => `Tu gagnes des étoiles pour ton effort ⭐`,
  mission: (x) => `Voici ta mission du jour, ${x.name}. Trois petites étapes, et on avance ensemble !`,
  missionDone: (x) => `Mission accomplie, ${x.name} ! Je suis ${x.t('fier', 'fière')} de ta régularité. 🎉`,
};

const AR: CoachPack = {
  greetings: {
    matin: [
      (x) => `صباح الخير يا ${x.name}! أتمنى أن ${x.c('تكون قد نمت', 'تكوني قد نمت')} جيدا. هل نتعلم شيئا صغيرا معا؟`,
      (x) => `صباح النور يا ${x.name} ☀️ أنا ${x.t('سعيد', 'سعيدة')} برؤيتك هذا الصباح.`,
    ],
    aprem: [
      (x) => `مرحبا يا ${x.name}! هل ${x.c('تناولت', 'تناولت')} لمجتك؟ العقل المغذى جيدا يتعلم أفضل.`,
      (x) => `أهلا من جديد يا ${x.name}! كنت ${x.t('أنتظرك', 'أنتظرك')} بكل سرور.`,
    ],
    soir: [
      (x) => `مساء الخير يا ${x.name} 🌙 مراجعة خفيفة، ثم إلى النوم في الوقت؟`,
      (x) => `مساء النور يا ${x.name}. حتى عشر دقائق هذا المساء هدية جميلة للغد.`,
    ],
  },
  result: {
    bravo: [
      (x) => `رائع يا ${x.name}! لقد فهمت كل شيء. أنا ${x.t('فخور', 'فخورة')} بعملك.`,
      (x) => `ممتاز! تركيزك أعطى ثماره يا ${x.name}. يمكنك أن ${x.c('تفخر', 'تفخري')} بنفسك.`,
    ],
    fier: [
      (x) => `عمل جميل جدا يا ${x.name}! بقيت بعض الأسئلة للمراجعة، وسنهتم بها معا.`,
      () => `أحسنت العمل! الأسئلة البرتقالية درجات صغيرة أخرى سنصعدها.`,
    ],
    progres: [
      (x) => `أنت ${x.c('تتقدم', 'تتقدمين')} يا ${x.name}. كل سؤال صحيح انتصار حقيقي. هل نعيد الأسئلة البرتقالية؟`,
      (x) => `أحسنت لأنك ${x.c('حاولت', 'حاولت')} حتى النهاية! بالمحاولة يكبر العقل.`,
    ],
    ensemble: [
      (x) => `شكرا لأنك ${x.c('حاولت', 'حاولت')} يا ${x.name}. هذا الدرس جديد عليك، ومن الطبيعي أن يحتاج إلى وقت. لنقرأ الدرس معا ثم نحاول من جديد.`,
      () => `ليس سهلا بعد، وهذا طبيعي: نتعلم بالضبط عندما نخطئ. أنا بجانبك، سنمضي بهدوء.`,
    ],
  },
  improved: [
    (x) => `لقد ${x.c('تحسنت', 'تحسنت')} مقارنة بالمرة السابقة يا ${x.name}! مثابرتك تعطي ثمارها. 🌟`,
    (x) => `أنت ${x.c('تتقدم', 'تتقدمين')}، وهذا واضح. ${x.c('واصل', 'واصلي')} خطوة بخطوة.`,
  ],
  retry: [
    (x) => `هيا يا ${x.name}، فرصة ثانية! ${x.c('خذ', 'خذي')} وقتك و${x.c('اقرأ', 'اقرئي')} السؤال جيدا.`,
    (x) => `${x.c('تنفس', 'تنفسي')}، ${x.c('اقرأ', 'اقرئي')}، ${x.c('حاول', 'حاولي')}. أنا أثق بك.`,
  ],
  examBefore: [
    (x) => `قبل أن ${x.c('تبدأ', 'تبدئي')} يا ${x.name}: هذا مجرد تدريب. ${x.c('ابدأ', 'ابدئي')} بما ${x.c('تعرفه', 'تعرفينه')}، ولا ${x.c('تنس', 'تنسي')} أن ${x.c('تتنفس', 'تتنفسي')}.`,
    (x) => `لقد ${x.c('راجعت', 'راجعت')}، أنت ${x.c('مستعد', 'مستعدة')}. ${x.c('اقرأ', 'اقرئي')} كل سؤال بهدوء؛ أنا هنا.`,
  ],
  examAfterPending: (x) => `${x.c('انتهيت', 'انتهيت')}، أحسنت على تركيزك! بعض الأجوبة المكتوبة ستقرأ مع أبيك أو أمك لإتمام نقطتك.`,
  moodLabels: { super: 'ممتاز', bien: 'بخير', fatigue: 'متعب', stresse: 'قلق', triste: 'حزين' },
  moodReplies: {
    super: (x) => `رائع يا ${x.name}! لنستغل هذه الطاقة الجميلة لنتعلم شيئا جديدا.`,
    bien: (x) => `أنا ${x.t('سعيد', 'سعيدة')} من أجلك. هل نبدأ بهدوء؟`,
    fatigue: (x) => `شكرا لأنك ${x.c('أخبرتني', 'أخبرتني')} يا ${x.name}. ${x.c('اشرب', 'اشربي')} كأس ماء و${x.c('تمدد', 'تمددي')} قليلا. اليوم حصة قصيرة، وهذا جيد جدا.`,
    stresse: (x) => `من الطبيعي أن ${x.c('تشعر', 'تشعري')} بالقلق أحيانا، حتى الكبار يشعرون به. هل نقوم معا بتمرين تنفس صغير؟`,
    triste: (x) => `أنا هنا يا ${x.name}. من حقك أن ${x.c('تحزن', 'تحزني')}. إن ${x.c('أردت', 'أردت')}، ${x.c('اذهب', 'اذهبي')} لعناق أبيك أو أمك و${x.c('تحدث', 'تحدثي')} معهما: هذا يساعد كثيرا. سأنتظرك هنا.`,
  },
  talkToParent: (x) => `يا ${x.name}، يبدو أن الأيام الأخيرة كانت صعبة عليك. من الجيد أن ${x.c('تتحدث', 'تتحدثي')} مع أبيك أو أمك أو شخص كبير ${x.c('تثق', 'تثقين')} به. لست ${x.c('وحدك', 'وحدك')}. 💛`,
  breathing: ['استنشق الهواء بهدوء من أنفك…', 'احتفظ بالهواء لحظة صغيرة…', 'أخرج الهواء ببطء من فمك…'],
  tips: [
    () => 'نصيحة: اشرح الدرس بصوت عال كأنك الأستاذ، فهذه أفضل طريقة لحفظه.',
    () => 'نصيحة: القليل كل يوم أفضل من الكثير ليلة الفرض.',
    () => 'نصيحة: الخطأ تعلم. الأخطاء إشارات تساعدنا، وليست عيبا.',
    () => 'نصيحة: رتب مكتبك قبل العمل، سيكون ذهنك أصفى.',
    () => 'نصيحة: بعد 25 دقيقة من العمل، خذ استراحة 5 دقائق.',
    (x) => `نصيحة من ${x.teacher}: النوم الجيد يساعد الذاكرة على ترتيب ما تعلمته.`,
  ],
  streak: (x) => `لقد ${x.c('جئت', 'جئت')} للعمل عدة أيام متتالية يا ${x.name}. هذه المواظبة هي قوتك الخارقة! 🔥`,
  star: () => `ربحت نجوما على مجهودك ⭐`,
  mission: (x) => `هذه مهمتك لليوم يا ${x.name}. ثلاث خطوات صغيرة، ونتقدم معا!`,
  missionDone: (x) => `أنجزت المهمة يا ${x.name}! أنا ${x.t('فخور', 'فخورة')} بمواظبتك. 🎉`,
};

/** Amazigh standard (tifinagh) — bêta, à faire relire par un locuteur. Les messages absents reprennent le français. */
const ZGH: Partial<CoachPack> = {
  greetings: {
    matin: [(x) => `ⴰⵣⵓⵍ ${x.name}! ⵜⵉⴼⴰⵡⵉⵏ ☀️ ⵎⴰⵏⵉⴽ ⴰⴷ ⵏⵍⵎⴷ ⵉⵎⵉⴽ ⴰⵙⵙⴰ?`],
    aprem: [(x) => `ⴰⵣⵓⵍ ${x.name}! ⵎⴰⵏⵉⴽ ⴰⴷ ⵏⵍⵎⴷ ⵉⵎⵉⴽ ⴰⵙⵙⴰ?`],
    soir: [(x) => `ⴰⵣⵓⵍ ${x.name} 🌙 ⵉⵎⵉⴽ ⵏ ⵓⵍⵎⵎⵓⴷ, ⴷ ⴰⴷ ⵜⴳⵏⴷ.`],
  },
  result: {
    bravo: [(x) => `ⵉⴼⵓⵍⴽⵉ ⴰⵟⵟⴰⵙ, ${x.name}! ⵜⴼⵀⵎⴷ ⴽⵓⵍⵍⵓ. 🌟`],
    fier: [(x) => `ⵉⴼⵓⵍⴽⵉ, ${x.name}! ⵎⵇⵇⴰⵔ ⴽⵔⴰ ⵏ ⵉⵙⵇⵙⵉⵜⵏ, ⴰⴷ ⵜⵏ ⵏⵙⵙⵓⵖⵍ ⵏⴽⴽⵏⵉ ⴷ ⴽⵢⵢ.`],
    progres: [(x) => `ⴽⵢⵢ ⵜⴷⴷⵓⴷ ⵙ ⴷⴰⵜ, ${x.name}. ⴽⵓ ⴰⵙⵇⵙⵉ ⵉⵚⵃⴰⵏ ⴷ ⴰⵙⵉⵡⴹ.`],
    ensemble: [(x) => `ⵜⴰⵏⵎⵎⵉⵔⵜ, ${x.name}. ⴰⴷ ⵏⵖⵔ ⵜⴰⵎⵙⵉⵔⵜ ⵏⴽⴽⵏⵉ ⴷ ⴽⵢⵢ, ⵙ ⵍⵄⴰⴼⵉⵜ.`],
  },
  moodLabels: { super: 'ⵉⴼⵓⵍⴽⵉ ⴰⵟⵟⴰⵙ', bien: 'ⵉⴼⵓⵍⴽⵉ', fatigue: 'ⵔⵎⵉⵖ', stresse: 'ⵉⵖⴰⵡⵙⵏ', triste: 'ⵉⵎⵓⵔⴰⵏ' },
  star: () => `⭐ ⵜⴰⵏⵎⵎⵉⵔⵜ ⵅⴼ ⵓⵎⵏⴰⴷ ⵏⵏⴽ`,
  mission: (x) => `ⴰⵣⵓⵍ ${x.name}! ⵜⴰⵡⵓⵔⵉ ⵏ ⵡⴰⵙⵙ: ⴽⵕⴰⴹ ⵏ ⵜⵙⵓⵔⵉⴼⵉⵏ.`,
  missionDone: (x) => `ⵉⴼⵓⵍⴽⵉ ⴰⵟⵟⴰⵙ, ${x.name}! 🎉`,
};

export function coachPack(lang: Lang): CoachPack {
  if (lang === 'ar') return AR;
  if (lang === 'zgh') return { ...FR, ...ZGH, result: { ...FR.result, ...ZGH.result }, greetings: { ...FR.greetings, ...ZGH.greetings } };
  return FR;
}
