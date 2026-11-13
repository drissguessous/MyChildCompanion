import type { Chapter } from '../types';

export const GEN_O_3AC_HG_2: Chapter[] = [
  {
    id: '3AC-hg-o31',
    levelId: '3AC',
    subjectId: 'hg',
    title: 'Nous et le monde : nous partageons la planète Terre',
    lang: 'fr',
    objectives: [
      'Comprendre que la Terre est un bien commun à toute l’humanité.',
      'Identifier les grands défis partagés (environnement, ressources, santé, paix).',
      'Proposer des gestes citoyens de solidarité et de responsabilité.',
    ],
    lesson: [
      { type: 'h', text: 'Nous et le monde : une seule planète (نحن والعالم نتقاسم الكرة الأرضية)' },
      {
        type: 'p',
        text: 'Tous les êtres humains vivent sur la même planète et dépendent des mêmes ressources : l’air, l’eau, les sols, les océans, la biodiversité. Ce qui se passe dans une région du monde peut avoir des effets ailleurs : la pollution, le réchauffement climatique ou une épidémie ne s’arrêtent pas aux frontières.',
      },
      {
        type: 'list',
        items: [
          'Défis environnementaux : réchauffement climatique, pollution, désertification, disparition d’espèces.',
          'Défis liés aux ressources : partage de l’eau potable, énergie, alimentation.',
          'Défis humains : pauvreté, maladies, conflits, migrations.',
          'Réponses communes : coopération internationale, accords entre États, ONG, actions locales des citoyens.',
        ],
      },
      {
        type: 'rule',
        text: 'La Terre est un patrimoine commun de l’humanité. Le citoyen du monde agit localement et pense globalement : il respecte l’environnement, les autres peuples et les générations futures (développement durable).',
      },
      {
        type: 'example',
        text: 'À Agadir, la classe de Salma organise un nettoyage de la plage et une campagne pour économiser l’eau à l’école : un petit geste local qui participe à un effort mondial.',
      },
      {
        type: 'tip',
        text: 'Retiens la formule « agir localement, penser globalement » : elle t’aidera à rédiger toutes tes réponses sur la citoyenneté mondiale.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Pourquoi dit-on que la pollution de l’air est un problème mondial ?',
        choices: [
          'Parce qu’elle ne concerne que les grandes villes.',
          'Parce qu’elle traverse les frontières et touche tous les pays.',
          'Parce qu’elle disparaît toute seule.',
        ],
        answer: 1,
        explanation: 'L’air circule partout sur la planète : la pollution émise dans un pays peut affecter d’autres pays. C’est donc un défi commun qui demande une coopération internationale.',
      },
      {
        id: 'q2',
        type: 'tf',
        prompt: 'Le développement durable consiste à répondre aux besoins d’aujourd’hui sans compromettre ceux des générations futures.',
        answer: true,
        explanation: 'C’est la définition du développement durable : concilier économie, société et environnement en pensant aux générations futures.',
      },
      {
        id: 'q3',
        type: 'text',
        prompt: 'Complète la formule : « Agir localement, penser … ».',
        accept: ['globalement', 'global'],
        explanation: 'La formule complète est « agir localement, penser globalement » : nos gestes quotidiens ont un effet sur toute la planète.',
      },
      {
        id: 'q4',
        type: 'qcm',
        prompt: 'Lequel de ces gestes est un geste de citoyen du monde ?',
        choices: [
          'Laisser le robinet ouvert en se brossant les dents.',
          'Jeter les déchets plastiques dans la mer.',
          'Trier ses déchets et économiser l’eau.',
        ],
        answer: 2,
        explanation: 'Trier ses déchets et économiser l’eau protègent les ressources communes : ce sont des gestes responsables envers la planète.',
      },
      {
        id: 'q5',
        type: 'open',
        prompt: 'Explique en quelques lignes pourquoi la coopération entre les pays est nécessaire pour protéger la planète.',
        modelAnswer: 'Les problèmes comme le réchauffement climatique, la pollution ou les épidémies dépassent les frontières. Aucun pays ne peut les résoudre seul. Les États doivent donc coopérer, signer des accords et partager leurs connaissances, tandis que chaque citoyen agit à son niveau.',
        explanation: 'On attend l’idée de défis qui dépassent les frontières, la nécessité d’accords entre États et le rôle de chaque citoyen.',
      },
    ],
  },
  {
    id: '3AC-hg-o32',
    levelId: '3AC',
    subjectId: 'hg',
    title: 'Le Maroc et le dialogue des religions',
    lang: 'fr',
    objectives: [
      'Définir le dialogue des religions et la tolérance.',
      'Connaître les fondements et des exemples de l’engagement du Maroc pour le dialogue interreligieux.',
    ],
    lesson: [
      { type: 'h', text: 'Le Maroc et le dialogue des religions (المغرب وحوار الأديان)' },
      {
        type: 'p',
        text: 'Le dialogue des religions est l’échange respectueux entre personnes de croyances différentes, pour mieux se connaître, coexister en paix et coopérer au service du bien commun. Il repose sur la tolérance, le respect de l’autre et le refus de l’extrémisme.',
      },
      {
        type: 'list',
        items: [
          'Une tradition historique : musulmans et juifs marocains ont vécu ensemble pendant des siècles ; la Constitution de 2011 reconnaît la diversité de l’identité marocaine, dont l’affluent hébraïque.',
          'Le Roi, Commandeur des croyants (Amir Al Mouminine), garantit le libre exercice des cultes.',
          'La Déclaration de Marrakech (2016) défend les droits des minorités religieuses dans les pays à majorité musulmane.',
          'La visite du pape François au Maroc en 2019 a illustré ce dialogue.',
          'L’Institut Mohammed VI de formation des imams diffuse un islam du juste milieu.',
        ],
      },
      {
        type: 'rule',
        text: 'Le Maroc défend un islam modéré et tolérant, fondé sur le juste milieu (الوسطية). Le dialogue des religions favorise la coexistence pacifique et lutte contre la haine et l’extrémisme.',
      },
      {
        type: 'example',
        text: 'À Essaouira, ville connue pour sa longue histoire de coexistence, on peut visiter côte à côte des mosquées et d’anciennes synagogues restaurées.',
      },
      {
        type: 'tip',
        text: 'Pour argumenter, appuie-toi sur trois idées : l’histoire de la coexistence, la Constitution, et les initiatives récentes. Tu as déjà tout ce qu’il faut !',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Quel titre du Roi du Maroc est lié à la protection de la religion et du libre exercice des cultes ?',
        choices: ['Commandeur des croyants (Amir Al Mouminine)', 'Président du gouvernement', 'Chef de la diplomatie'],
        answer: 0,
        explanation: 'Selon la Constitution, le Roi est Amir Al Mouminine : il veille au respect de l’islam et garantit le libre exercice des cultes.',
      },
      {
        id: 'q2',
        type: 'number',
        prompt: 'En quelle année a été adoptée la Déclaration de Marrakech sur les droits des minorités religieuses ?',
        answer: 2016,
        explanation: 'La Déclaration de Marrakech a été adoptée en janvier 2016 lors d’une conférence internationale réunie au Maroc.',
      },
      {
        id: 'q3',
        type: 'tf',
        prompt: 'La Constitution marocaine de 2011 reconnaît l’affluent hébraïque comme composante de l’identité nationale.',
        answer: true,
        explanation: 'Le préambule de la Constitution de 2011 cite les affluents de l’identité marocaine, dont l’affluent hébraïque.',
      },
      {
        id: 'q4',
        type: 'text',
        prompt: 'Quelle valeur, synonyme de respect des croyances des autres, est à la base du dialogue des religions ?',
        accept: ['la tolérance', 'tolérance', 'le respect', 'respect'],
        explanation: 'La tolérance, c’est accepter et respecter les croyances et les opinions différentes des siennes.',
      },
      {
        id: 'q5',
        type: 'qcm',
        prompt: 'Quel est l’objectif principal du dialogue des religions ?',
        choices: [
          'Obliger chacun à changer de religion.',
          'Favoriser la connaissance mutuelle et la coexistence pacifique.',
          'Séparer les croyants les uns des autres.',
        ],
        answer: 1,
        explanation: 'Le dialogue des religions vise à mieux se connaître, à se respecter et à vivre ensemble en paix, sans imposer sa croyance.',
      },
    ],
  },
  {
    id: '3AC-hg-o33',
    levelId: '3AC',
    subjectId: 'hg',
    title: 'Le Maroc et la paix mondiale',
    lang: 'fr',
    objectives: [
      'Définir la paix et la culture de la paix.',
      'Connaître les formes de contribution du Maroc à la paix dans le monde.',
    ],
    lesson: [
      { type: 'h', text: 'Le Maroc et la paix mondiale (المغرب والسلم العالمي)' },
      {
        type: 'p',
        text: 'La paix n’est pas seulement l’absence de guerre : c’est une situation de sécurité, de justice et de respect des droits humains. La culture de la paix passe par le dialogue, la tolérance et le règlement pacifique des conflits.',
      },
      {
        type: 'list',
        items: [
          'Membre de l’ONU depuis 1956, le Maroc respecte sa Charte et le droit international.',
          'Il participe depuis les années 1960 aux opérations de maintien de la paix de l’ONU (Casques bleus), notamment en Afrique.',
          'Il privilégie la médiation et le dialogue pour régler les conflits.',
          'Il mène une coopération Sud-Sud avec les pays africains et a réintégré l’Union africaine en 2017.',
          'Il apporte une aide humanitaire (hôpitaux de campagne, aide alimentaire) lors de crises.',
        ],
      },
      {
        type: 'rule',
        text: 'Le Maroc contribue à la paix mondiale par la diplomatie et la médiation, la participation aux missions de maintien de la paix, la coopération et l’aide humanitaire, et la lutte contre l’extrémisme.',
      },
      {
        type: 'example',
        text: 'Des soldats marocains servent comme Casques bleus dans des missions de l’ONU en Afrique : ils protègent les civils et aident au retour de la stabilité.',
      },
      {
        type: 'tip',
        text: 'Classe tes arguments en catégories (diplomatique, militaire, humanitaire, économique) : ta réponse sera claire et bien organisée.',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'number',
        prompt: 'En quelle année le Maroc est-il devenu membre de l’Organisation des Nations unies ?',
        answer: 1956,
        explanation: 'Le Maroc a rejoint l’ONU en 1956, l’année de son indépendance.',
      },
      {
        id: 'q2',
        type: 'text',
        prompt: 'Comment appelle-t-on les soldats de l’ONU chargés des missions de maintien de la paix ?',
        accept: ['casques bleus', 'les casques bleus', 'casque bleu'],
        explanation: 'Les soldats des opérations de maintien de la paix de l’ONU sont appelés Casques bleus, en raison de la couleur de leur casque.',
      },
      {
        id: 'q3',
        type: 'tf',
        prompt: 'La paix signifie uniquement l’absence de guerre.',
        answer: false,
        explanation: 'La paix suppose aussi la sécurité, la justice et le respect des droits humains ; l’absence de guerre ne suffit pas.',
      },
      {
        id: 'q4',
        type: 'qcm',
        prompt: 'En quelle année le Maroc a-t-il réintégré l’Union africaine ?',
        choices: ['1984', '2000', '2017'],
        answer: 2,
        explanation: 'Le Maroc a réintégré l’Union africaine en janvier 2017, renforçant sa coopération avec les pays du continent.',
      },
      {
        id: 'q5',
        type: 'qcm',
        prompt: 'Laquelle de ces actions est une contribution humanitaire à la paix ?',
        choices: [
          'Installer un hôpital de campagne pour soigner des victimes de crise.',
          'Refuser tout dialogue avec les autres pays.',
          'Encourager les discours de haine.',
        ],
        answer: 0,
        explanation: 'Soigner les victimes d’une crise est une aide humanitaire : elle soulage les populations et favorise la stabilité.',
      },
    ],
  },
  {
    id: '3AC-hg-o34',
    levelId: '3AC',
    subjectId: 'hg',
    title: 'Proposer des programmes médiatiques pour promouvoir les valeurs de citoyenneté',
    lang: 'fr',
    objectives: [
      'Comprendre le rôle des médias dans l’éducation à la citoyenneté.',
      'Concevoir étape par étape un programme médiatique citoyen.',
      'Utiliser les médias de façon responsable.',
    ],
    lesson: [
      { type: 'h', text: 'Des médias au service de la citoyenneté (اقتراح برامج إعلامية تتوخى النهوض بقيم المواطنة)' },
      {
        type: 'p',
        text: 'Les médias (radio, télévision, presse, sites internet, réseaux sociaux) informent, éduquent et influencent les opinions. Bien utilisés, ils peuvent diffuser les valeurs de citoyenneté : respect, solidarité, tolérance, protection de l’environnement, respect de la loi et participation à la vie publique.',
      },
      {
        type: 'list',
        items: [
          '1. Choisir une valeur ou un problème (ex. : civisme routier, propreté du quartier).',
          '2. Définir le public visé (élèves, parents, habitants).',
          '3. Choisir le support : affiche, journal scolaire, émission de radio, courte vidéo, page web.',
          '4. Rédiger un message court, clair et positif, avec des informations vérifiées.',
          '5. Diffuser le programme puis évaluer son effet.',
        ],
      },
      {
        type: 'rule',
        text: 'Un programme médiatique citoyen a un objectif précis, un public ciblé, un support adapté et un message vrai et respectueux. Avant de partager une information, on vérifie sa source.',
      },
      {
        type: 'example',
        text: 'Au collège de Youssef à Fès, le club média réalise une émission de radio scolaire de 10 minutes sur la sécurité routière, avec une interview d’un agent de la circulation et des conseils pratiques.',
      },
      {
        type: 'tip',
        text: 'Ton idée n’a pas besoin d’être grande pour être utile : une belle affiche bien pensée peut déjà changer des comportements !',
      },
    ],
    exercises: [
      {
        id: 'q1',
        type: 'qcm',
        prompt: 'Quelle est la première étape pour concevoir un programme médiatique citoyen ?',
        choices: [
          'Diffuser le message sans le préparer.',
          'Choisir la valeur ou le problème à traiter.',
          'Évaluer les résultats.',
        ],
        answer: 1,
        explanation: 'On commence par choisir la valeur ou le problème : c’est l’objectif qui guide ensuite le choix du public, du support et du message.',
      },
      {
        id: 'q2',
        type: 'tf',
        prompt: 'Avant de partager une information sur les réseaux sociaux, il faut vérifier sa source.',
        answer: true,
        explanation: 'Vérifier la source évite de diffuser de fausses informations : c’est un comportement de citoyen responsable.',
      },
      {
        id: 'q3',
        type: 'text',
        prompt: 'Cite un support médiatique qu’un club de collège peut utiliser pour une campagne citoyenne.',
        accept: ['affiche', 'une affiche', 'radio', 'radio scolaire', 'journal', 'journal scolaire', 'video', 'une video', 'site web', 'page web', 'reseaux sociaux', 'blog', 'podcast'],
        explanation: 'Plusieurs supports conviennent : affiche, journal scolaire, radio scolaire, vidéo, page web ou réseaux sociaux.',
      },
      {
        id: 'q4',
        type: 'qcm',
        prompt: 'Lequel de ces messages est adapté à une campagne citoyenne ?',
        choices: [
          'Un message qui se moque d’un groupe de personnes.',
          'Une rumeur non vérifiée.',
          '« Gardons notre quartier propre : chaque geste compte ! »',
        ],
        answer: 2,
        explanation: 'Un bon message citoyen est court, positif, vrai et respectueux de tous.',
      },
      {
        id: 'q5',
        type: 'open',
        prompt: 'Propose un programme médiatique pour promouvoir une valeur de citoyenneté dans ton collège (valeur, public, support, message).',
        modelAnswer: 'Valeur : la protection de l’environnement. Public : les élèves du collège. Support : une série d’affiches et une courte vidéo diffusée lors de la journée de l’environnement. Message : « Un déchet à la poubelle, un collège plus beau ! ». Évaluation : observer la propreté de la cour pendant un mois.',
        explanation: 'La réponse doit préciser une valeur, un public, un support adapté et un message clair et positif ; une étape d’évaluation est un plus.',
      },
    ],
  },
];
