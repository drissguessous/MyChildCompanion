import type { Chapter } from '../types';

export const GEN_O_1AC_HG_2: Chapter[] = [
  {
    id: '1AC-hg-o31',
    levelId: '1AC',
    subjectId: 'hg',
    title: 'La tolérance',
    lang: 'fr',
    objectives: [
      'Définir la tolérance et la distinguer de l’indifférence',
      'Reconnaître des attitudes tolérantes dans la vie quotidienne',
    ],
    lesson: [
      { type: 'h', text: 'La tolérance — التسامح' },
      {
        type: 'p',
        text: 'La tolérance, c’est accepter que les autres aient des idées, des croyances, des habitudes ou des origines différentes des nôtres, et les respecter. Ce n’est pas tout accepter : on ne tolère pas la violence ni l’injustice.',
      },
      {
        type: 'rule',
        text: 'Être tolérant = respecter la différence de l’autre, dialoguer et refuser la discrimination. La tolérance s’arrête là où commencent la violence et l’atteinte aux droits d’autrui.',
      },
      {
        type: 'list',
        items: [
          'À l’école : écouter un camarade qui n’a pas le même avis.',
          'Dans le quartier : respecter les voisins d’une autre région ou d’un autre pays.',
          'Sur Internet : ne pas se moquer de quelqu’un à cause de son accent ou de son apparence.',
        ],
      },
      {
        type: 'example',
        text: 'Yassine et Salma ne sont pas d’accord sur le choix d’une sortie scolaire. Au lieu de se disputer, chacun explique ses raisons, puis la classe vote : c’est une attitude tolérante.',
      },
      {
        type: 'tip',
        text: 'Avant de juger quelqu’un, essaie de te mettre à sa place : c’est le premier pas vers la tolérance.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Quelle attitude montre la tolérance ?',
        choices: [
          'Se moquer d’un camarade qui parle une autre langue',
          'Écouter un avis différent du sien avec respect',
          'Refuser de travailler avec un nouvel élève',
        ],
        answer: 1,
        explanation: 'Être tolérant, c’est respecter et écouter une opinion différente, même si on ne la partage pas.',
      },
      {
        id: 'q2',
        type: 'tf',
        prompt: 'Être tolérant signifie accepter toutes les violences.',
        answer: false,
        explanation: 'Faux. La tolérance a des limites : on ne tolère ni la violence ni l’injustice.',
      },
      {
        id: 'q3',
        type: 'text',
        prompt: 'Comment dit-on « tolérance » en arabe ?',
        accept: ['التسامح', 'تسامح', 'attasamuh', 'tasamuh'],
        explanation: 'La tolérance se dit « التسامح » (at-tasamuh).',
      },
      {
        id: 'q4',
        type: 'qcm',
        prompt: 'Le contraire de la tolérance est :',
        choices: ['Le dialogue', 'Le respect', 'Le fanatisme'],
        answer: 2,
        explanation: 'Le fanatisme (التعصب) consiste à refuser toute idée différente : c’est le contraire de la tolérance.',
      },
      {
        id: 'q5',
        type: 'open',
        prompt: 'Donne un exemple d’attitude tolérante que tu peux avoir en classe.',
        modelAnswer: 'Par exemple : accepter dans mon groupe un camarade venu d’une autre ville, écouter son avis sans l’interrompre et respecter ses habitudes.',
        explanation: 'Toute réponse qui montre le respect de la différence de l’autre et le dialogue est acceptée.',
      },
    ],
  },
  {
    id: '1AC-hg-o32',
    levelId: '1AC',
    subjectId: 'hg',
    title: 'La démocratie',
    lang: 'fr',
    objectives: [
      'Définir la démocratie et ses principes',
      'Identifier des pratiques démocratiques à l’école et dans la société',
    ],
    lesson: [
      { type: 'h', text: 'La démocratie — الديمقراطية' },
      {
        type: 'p',
        text: 'Le mot « démocratie » vient du grec : demos (le peuple) et kratos (le pouvoir). C’est un système où le pouvoir appartient au peuple, qui l’exerce directement ou par des représentants qu’il élit.',
      },
      {
        type: 'rule',
        text: 'Principes de la démocratie : élections libres, égalité des citoyens devant la loi, liberté d’expression, respect de l’avis de la majorité et des droits de la minorité, séparation des pouvoirs.',
      },
      {
        type: 'list',
        items: [
          'Pouvoir législatif : vote les lois (au Maroc, le Parlement).',
          'Pouvoir exécutif : applique les lois (le gouvernement).',
          'Pouvoir judiciaire : juge selon les lois (les tribunaux).',
        ],
      },
      {
        type: 'example',
        text: 'Dans la classe de Hamza, les élèves élisent leur délégué par un vote secret. Celui qui obtient le plus de voix est élu, et tous respectent le résultat : c’est une pratique démocratique.',
      },
      {
        type: 'tip',
        text: 'Donner ton avis calmement et accepter le résultat d’un vote, c’est déjà vivre la démocratie au quotidien.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Que signifie le mot « démocratie » ?',
        choices: ['Le pouvoir du peuple', 'Le pouvoir d’une seule personne', 'Le pouvoir des plus riches'],
        answer: 0,
        explanation: 'Démocratie vient du grec demos (peuple) et kratos (pouvoir) : le pouvoir du peuple.',
      },
      {
        id: 'q2',
        type: 'tf',
        prompt: 'Dans une démocratie, les citoyens choisissent leurs représentants par des élections.',
        answer: true,
        explanation: 'Vrai. Les élections libres sont un principe essentiel de la démocratie.',
      },
      {
        id: 'q3',
        type: 'qcm',
        prompt: 'Quel pouvoir vote les lois ?',
        choices: ['Le pouvoir judiciaire', 'Le pouvoir exécutif', 'Le pouvoir législatif'],
        answer: 2,
        explanation: 'Le pouvoir législatif (le Parlement) vote les lois ; l’exécutif les applique ; le judiciaire juge.',
      },
      {
        id: 'q4',
        type: 'text',
        prompt: 'Comment appelle-t-on l’élève élu pour représenter sa classe ?',
        accept: ['délégué', 'le délégué', 'délégué de classe', 'déléguée', 'la déléguée'],
        explanation: 'Le délégué de classe est élu par ses camarades pour les représenter.',
      },
      {
        id: 'q5',
        type: 'tf',
        prompt: 'En démocratie, la majorité peut supprimer les droits de la minorité.',
        answer: false,
        explanation: 'Faux. La majorité décide, mais elle doit respecter les droits de la minorité.',
      },
    ],
  },
  {
    id: '1AC-hg-o33',
    levelId: '1AC',
    subjectId: 'hg',
    title: 'La paix',
    lang: 'fr',
    objectives: [
      'Définir la paix et ses conditions',
      'Identifier des moyens pacifiques de régler les conflits',
    ],
    lesson: [
      { type: 'h', text: 'La paix — السلم' },
      {
        type: 'p',
        text: 'La paix est l’absence de guerre et de violence, mais aussi une situation où les personnes et les peuples vivent ensemble dans la sécurité, la justice et le respect mutuel.',
      },
      {
        type: 'rule',
        text: 'Pour construire la paix, on règle les conflits par des moyens pacifiques : le dialogue, la négociation, la médiation et le recours à la justice.',
      },
      {
        type: 'list',
        items: [
          'Conditions de la paix : justice, respect des droits de l’Homme, tolérance, solidarité.',
          'Menaces pour la paix : guerres, terrorisme, discriminations, injustice.',
          'L’Organisation des Nations unies (ONU), créée en 1945, a pour mission principale de maintenir la paix dans le monde.',
        ],
      },
      {
        type: 'example',
        text: 'Pendant la récréation, Omar et Ayoub se disputent un ballon. Leur camarade Nora propose qu’ils jouent chacun leur tour : elle joue le rôle de médiatrice et le conflit se règle sans violence.',
      },
      {
        type: 'tip',
        text: 'Quand tu es en colère, respire et parle avant d’agir : chaque dispute réglée par la parole est une petite victoire pour la paix.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Quel est un moyen pacifique de régler un conflit ?',
        choices: ['La bagarre', 'Le dialogue', 'Les insultes'],
        answer: 1,
        explanation: 'Le dialogue permet de régler un conflit sans violence.',
      },
      {
        id: 'q2',
        type: 'number',
        prompt: 'En quelle année l’ONU a-t-elle été créée ?',
        answer: 1945,
        explanation: 'L’ONU a été créée en 1945, après la Seconde Guerre mondiale, pour maintenir la paix.',
      },
      {
        id: 'q3',
        type: 'tf',
        prompt: 'La paix, c’est seulement l’absence de guerre.',
        answer: false,
        explanation: 'Faux. La paix suppose aussi la sécurité, la justice et le respect entre les personnes.',
      },
      {
        id: 'q4',
        type: 'text',
        prompt: 'Comment appelle-t-on la personne qui aide deux camarades en conflit à trouver un accord ?',
        accept: ['médiateur', 'le médiateur', 'médiatrice', 'la médiatrice', 'un médiateur', 'une médiatrice'],
        explanation: 'Le médiateur (ou la médiatrice) aide les deux parties à dialoguer et à trouver une solution.',
      },
      {
        id: 'q5',
        type: 'qcm',
        prompt: 'Laquelle de ces situations menace la paix ?',
        choices: ['La solidarité', 'La tolérance', 'La discrimination'],
        answer: 2,
        explanation: 'La discrimination crée l’injustice et les tensions : elle menace la paix.',
      },
    ],
  },
  {
    id: '1AC-hg-o34',
    levelId: '1AC',
    subjectId: 'hg',
    title: 'La règle de droit',
    lang: 'fr',
    objectives: [
      'Définir la règle de droit (règle juridique) et ses caractéristiques',
      'Comprendre pourquoi les règles sont nécessaires à la vie en société',
    ],
    lesson: [
      { type: 'h', text: 'La règle de droit — القاعدة القانونية' },
      {
        type: 'p',
        text: 'La règle de droit est une règle qui organise les relations entre les personnes dans la société. Elle est fixée par une autorité (par exemple le Parlement) et son non-respect entraîne une sanction.',
      },
      {
        type: 'rule',
        text: 'Caractéristiques de la règle de droit : elle est générale (elle concerne tout le monde), abstraite (elle ne vise pas une personne précise), obligatoire et accompagnée d’une sanction.',
      },
      {
        type: 'list',
        items: [
          'La Constitution est la loi suprême du pays (au Maroc, celle de 2011).',
          'Les lois sont votées par le Parlement.',
          'Le règlement intérieur de l’école organise la vie de l’établissement.',
        ],
      },
      {
        type: 'example',
        text: 'Le Code de la route oblige tous les conducteurs à s’arrêter au feu rouge. Celui qui ne le respecte pas peut recevoir une amende : la règle est générale, obligatoire et sanctionnée.',
      },
      {
        type: 'tip',
        text: 'Les règles ne sont pas là pour te gêner : elles protègent tes droits et ceux des autres.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Une règle de droit est :',
        choices: ['Facultative', 'Obligatoire', 'Réservée à une seule personne'],
        answer: 1,
        explanation: 'La règle de droit est obligatoire, générale et abstraite.',
      },
      {
        id: 'q2',
        type: 'tf',
        prompt: 'Le non-respect d’une règle de droit peut entraîner une sanction.',
        answer: true,
        explanation: 'Vrai. La sanction est une caractéristique de la règle de droit.',
      },
      {
        id: 'q3',
        type: 'text',
        prompt: 'Quelle est la loi suprême d’un pays ?',
        accept: ['la constitution', 'constitution', 'الدستور'],
        explanation: 'La Constitution est la loi la plus haute de l’État ; toutes les autres lois doivent la respecter.',
      },
      {
        id: 'q4',
        type: 'number',
        prompt: 'En quelle année la Constitution actuelle du Maroc a-t-elle été adoptée ?',
        answer: 2011,
        explanation: 'La Constitution actuelle du Maroc a été adoptée par référendum en 2011.',
      },
      {
        id: 'q5',
        type: 'qcm',
        prompt: 'Quel texte organise la vie à l’intérieur du collège ?',
        choices: ['Le Code de la route', 'Le règlement intérieur', 'Le contrat de travail'],
        answer: 1,
        explanation: 'Le règlement intérieur fixe les droits et les devoirs des élèves dans l’établissement.',
      },
    ],
  },
  {
    id: '1AC-hg-o35',
    levelId: '1AC',
    subjectId: 'hg',
    title: 'Visite d’une institution des droits de l’Homme',
    lang: 'fr',
    objectives: [
      'Connaître le rôle d’une institution qui protège les droits de l’Homme',
      'Préparer et rendre compte d’une visite',
    ],
    lesson: [
      { type: 'h', text: 'Visite d’une institution des droits de l’Homme — زيارة مؤسسة مهتمة بحقوق الإنسان' },
      {
        type: 'p',
        text: 'Les droits de l’Homme sont les droits que possède chaque être humain : droit à la vie, à l’éducation, à la santé, à la liberté d’expression, à l’égalité… La Déclaration universelle des droits de l’Homme a été adoptée par l’ONU le 10 décembre 1948.',
      },
      {
        type: 'rule',
        text: 'Au Maroc, le Conseil national des droits de l’Homme (CNDH) veille à la protection et à la promotion des droits de l’Homme. Des associations y contribuent aussi.',
      },
      {
        type: 'list',
        items: [
          'Avant la visite : préparer des questions (rôle de l’institution, actions menées, comment déposer une plainte).',
          'Pendant la visite : écouter, prendre des notes, poser ses questions poliment.',
          'Après la visite : rédiger un compte rendu et le présenter à la classe.',
        ],
      },
      {
        type: 'example',
        text: 'La classe de Khadija visite l’antenne régionale d’une institution des droits de l’Homme. Elle apprend que l’institution reçoit des plaintes, organise des formations et sensibilise les jeunes à leurs droits.',
      },
      {
        type: 'tip',
        text: 'Une bonne question vaut mieux qu’une longue liste : prépare deux ou trois questions qui t’intéressent vraiment.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'number',
        prompt: 'En quelle année la Déclaration universelle des droits de l’Homme a-t-elle été adoptée ?',
        answer: 1948,
        explanation: 'Elle a été adoptée par l’Assemblée générale de l’ONU le 10 décembre 1948.',
      },
      {
        id: 'q2',
        type: 'text',
        prompt: 'Quel est le sigle du Conseil national des droits de l’Homme au Maroc ?',
        accept: ['CNDH', 'C.N.D.H'],
        explanation: 'CNDH : Conseil national des droits de l’Homme.',
      },
      {
        id: 'q3',
        type: 'qcm',
        prompt: 'Que fait-on APRÈS la visite ?',
        choices: ['On prépare les questions', 'On rédige un compte rendu', 'On choisit l’institution'],
        answer: 1,
        explanation: 'Après la visite, on rédige un compte rendu pour présenter ce qu’on a appris.',
      },
      {
        id: 'q4',
        type: 'tf',
        prompt: 'Le droit à l’éducation fait partie des droits de l’Homme.',
        answer: true,
        explanation: 'Vrai. L’éducation est un droit fondamental de tout être humain, en particulier des enfants.',
      },
      {
        id: 'q5',
        type: 'open',
        prompt: 'Écris deux questions que tu poserais lors de la visite d’une institution des droits de l’Homme.',
        modelAnswer: '1) Quel est le rôle de votre institution ? 2) Comment une personne dont les droits ne sont pas respectés peut-elle vous contacter ?',
        explanation: 'Toute question claire et polie portant sur le rôle, les actions ou le fonctionnement de l’institution est acceptée.',
      },
    ],
  },
];
