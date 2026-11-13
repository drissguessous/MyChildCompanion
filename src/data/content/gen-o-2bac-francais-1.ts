import type { Chapter } from '../types';

/** Cours 2BAC français – programme officiel (groupe o-2bac-francais-1). */
export const GEN_O_2BAC_FRANCAIS_1: Chapter[] = [
  {
    id: '2BAC-francais-o1', levelId: '2BAC', subjectId: 'francais', title: 'Voltaire, « Candide ou l’optimisme »', lang: 'fr',
    objectives: ['Situer l’œuvre dans le siècle des Lumières', 'Identifier les caractéristiques du conte philosophique', 'Analyser la critique de l’optimisme et l’ironie voltairienne'],
    lesson: [
      { type: 'h', text: 'Une œuvre des Lumières' },
      { type: 'p', text: 'Publié en 1759, Candide est un conte philosophique de Voltaire (1694-1778), grande figure des Lumières. Le jeune Candide, chassé du château du baron de Thunder-ten-tronckh en Westphalie, parcourt le monde (Europe, Amérique du Sud, Eldorado, Turquie) et découvre la guerre, l’intolérance, l’esclavage et les catastrophes, comme le tremblement de terre de Lisbonne (1755).' },
      { type: 'rule', text: 'Le conte philosophique utilise un récit simple et souvent invraisemblable (voyages, rebondissements, personnages peu approfondis) pour transmettre une idée et critiquer la société. Ici, Voltaire critique l’optimisme de Pangloss, selon lequel « tout est au mieux dans le meilleur des mondes possibles ».' },
      { type: 'list', items: ['Candide : héros naïf qui apprend par l’expérience (récit d’apprentissage).', 'Pangloss : précepteur optimiste, caricature de la philosophie de Leibniz.', 'Martin : compagnon pessimiste, contrepoint de Pangloss.', 'Cunégonde : la jeune femme aimée de Candide ; Cacambo : son valet fidèle.', 'Conclusion : « il faut cultiver notre jardin », éloge du travail concret et utile.'] },
      { type: 'example', text: 'L’ironie consiste à dire le contraire de ce que l’on pense pour faire réagir le lecteur. Quand le narrateur présente une bataille sanglante avec des mots élogieux (« belle », « bien ordonnée »), il dénonce en réalité l’horreur de la guerre.' },
      { type: 'tip', text: 'Pour l’examen, associe chaque étape du voyage à une cible de la critique (guerre, religion, esclavage, argent) : tu auras des arguments prêts pour la production écrite.' },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'En quelle année Candide a-t-il été publié ?', answer: 1759, explanation: 'Candide paraît en 1759, en plein siècle des Lumières.' },
      { id: 'q2', type: 'qcm', prompt: 'Quel personnage incarne la philosophie optimiste ?', choices: ['Martin', 'Cacambo', 'Pangloss'], answer: 2, explanation: 'Pangloss répète que tout est au mieux ; Martin, lui, est pessimiste.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : dans un conte philosophique, le récit sert surtout à transmettre une réflexion critique.', answer: true, explanation: 'Vrai : l’histoire est un prétexte pour faire réfléchir le lecteur et critiquer la société.' },
      { id: 'q4', type: 'text', prompt: 'Quel procédé consiste à dire le contraire de ce que l’on pense pour critiquer ? (un mot)', accept: ['ironie', 'l\'ironie', 'l’ironie'], explanation: 'L’ironie est l’arme principale de Voltaire : elle fait sourire et dénonce en même temps.' },
      { id: 'q5', type: 'qcm', prompt: 'Quelle leçon finale le conte propose-t-il ?', choices: ['Il faut cultiver notre jardin', 'Tout est au mieux dans le meilleur des mondes', 'Il faut fuir le monde'], answer: 0, explanation: 'Candide conclut qu’il faut travailler concrètement plutôt que de spéculer : c’est la morale de l’action.' },
    ],
  },
  {
    id: '2BAC-francais-o2', levelId: '2BAC', subjectId: 'francais', title: 'Mohammed Khaïr-Eddine, « Il était une fois un vieux couple heureux »', lang: 'fr',
    objectives: ['Situer l’auteur et l’œuvre dans la littérature maghrébine d’expression française', 'Identifier les thèmes principaux du roman', 'Analyser le cadre spatio-temporel et les personnages'],
    lesson: [
      { type: 'h', text: 'L’auteur et l’œuvre' },
      { type: 'p', text: 'Mohammed Khaïr-Eddine (1941-1995), écrivain marocain originaire du Souss, est connu pour une écriture souvent révoltée. Ce roman, publié après sa mort (2002), adopte au contraire un ton apaisé : il raconte la vie simple d’un vieux couple, Bouchaïb et sa femme, dans un village berbère de montagne du sud marocain.' },
      { type: 'rule', text: 'Le roman met en avant la sagesse, l’harmonie conjugale et l’attachement à la terre et aux traditions amazighes, face aux changements du monde moderne (exode rural, émigration, transformation des valeurs).' },
      { type: 'list', items: ['Cadre spatial : un village du Sud, entre montagne, maison et nature.', 'Cadre temporel : le Maroc du XXe siècle, après l’indépendance.', 'Personnages : un couple âgé, uni et respecté ; Bouchaïb est un homme sage et lettré.', 'Thèmes : bonheur simple, vieillesse, mémoire, identité, rapport tradition/modernité.'] },
      { type: 'example', text: 'Une description du lever du soleil sur les montagnes, du bruit des bêtes et du travail des champs crée une atmosphère paisible : on parle de registre lyrique et de rythme lent, qui reflètent la sérénité du couple.' },
      { type: 'tip', text: 'Compare ce roman avec Candide : les deux œuvres valorisent une vie simple et utile, loin des agitations du monde. C’est une piste de réflexion appréciée.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Comment s’appelle le vieil homme du couple ?', choices: ['Rastignac', 'Bouchaïb', 'Cacambo'], answer: 1, explanation: 'Bouchaïb est le héros, mari de la vieille femme ; Rastignac appartient au Père Goriot et Cacambo à Candide.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : le roman se déroule dans une grande ville du nord du Maroc.', answer: false, explanation: 'Faux : il se déroule dans un village de montagne du sud marocain.' },
      { id: 'q3', type: 'qcm', prompt: 'Quel ton domine dans ce roman ?', choices: ['Un ton violent et révolté', 'Un ton apaisé et serein', 'Un ton comique et absurde'], answer: 1, explanation: 'Contrairement à ses œuvres précédentes, Khaïr-Eddine adopte ici un ton serein, centré sur le bonheur tranquille du couple.' },
      { id: 'q4', type: 'text', prompt: 'De quelle région marocaine Khaïr-Eddine est-il originaire ? (un mot)', accept: ['Souss', 'le Souss', 'Sous'], explanation: 'L’auteur est originaire du Souss, dans le sud du Maroc, région qui inspire le cadre du roman.' },
      { id: 'q5', type: 'open', prompt: 'En quelques lignes, explique comment le roman oppose tradition et modernité.', modelAnswer: 'Le couple vit selon les valeurs traditionnelles du village : solidarité, respect, attachement à la terre. Autour de lui, le monde change : départ des jeunes vers les villes ou l’étranger, nouvelles habitudes. Le roman valorise la sagesse ancienne tout en montrant avec lucidité ces transformations.', explanation: 'Une bonne réponse cite les valeurs traditionnelles du couple, des signes de modernité (exode, émigration) et le regard de l’auteur.' },
    ],
  },
  {
    id: '2BAC-francais-o3', levelId: '2BAC', subjectId: 'francais', title: 'Honoré de Balzac, « Le Père Goriot »', lang: 'fr',
    objectives: ['Situer l’œuvre dans le réalisme et dans La Comédie humaine', 'Connaître les personnages principaux et leurs relations', 'Analyser les fonctions de la description réaliste'],
    lesson: [
      { type: 'h', text: 'Un roman réaliste' },
      { type: 'p', text: 'Publié en 1835, Le Père Goriot d’Honoré de Balzac (1799-1850) fait partie de La Comédie humaine, vaste ensemble de romans qui peint la société française du XIXe siècle. L’action se passe à Paris en 1819, notamment dans la pension Vauquer, une modeste maison du quartier Sainte-Geneviève.' },
      { type: 'list', items: ['Le père Goriot : ancien vermicellier enrichi, qui se ruine par amour pour ses deux filles.', 'Anastasie de Restaud et Delphine de Nucingen : ses filles, mariées dans la haute société.', 'Eugène de Rastignac : jeune étudiant ambitieux venu de province.', 'Vautrin : pensionnaire mystérieux, en réalité un ancien forçat.'] },
      { type: 'rule', text: 'Le réalisme cherche à représenter la réalité de façon fidèle : descriptions précises des lieux, personnages marqués par leur milieu social, place de l’argent et de l’ambition. Chez Balzac, le lieu explique le personnage : la pension misérable reflète la condition de ses habitants.' },
      { type: 'example', text: 'Exemple inventé de description réaliste : « La salle à manger sentait le renfermé ; les chaises boiteuses et la nappe tachée disaient la gêne des pensionnaires. » Les détails concrets révèlent la pauvreté.' },
      { type: 'tip', text: 'Retiens le parcours de Rastignac : il observe la société, apprend ses règles et décide finalement de la conquérir. C’est un excellent exemple de roman d’apprentissage.' },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'En quelle année Le Père Goriot a-t-il été publié ?', answer: 1835, explanation: 'Le roman paraît en 1835 (d’abord en feuilleton, puis en volume).' },
      { id: 'q2', type: 'text', prompt: 'Quel est le nom de la pension où vivent Goriot et Rastignac ?', accept: ['Vauquer', 'pension Vauquer', 'la pension Vauquer', 'maison Vauquer'], explanation: 'La pension Vauquer, tenue par Mme Vauquer, est le lieu central du roman.' },
      { id: 'q3', type: 'qcm', prompt: 'Pourquoi le père Goriot se ruine-t-il ?', choices: ['À cause du jeu', 'Par amour pour ses filles', 'À cause d’un procès'], answer: 1, explanation: 'Il donne tout son argent à Anastasie et Delphine : c’est l’amour paternel poussé à l’excès.' },
      { id: 'q4', type: 'qcm', prompt: 'Qui est en réalité Vautrin ?', choices: ['Un ancien forçat', 'Un banquier', 'Un médecin'], answer: 0, explanation: 'Vautrin est un ancien bagnard évadé, arrêté dans la pension.' },
      { id: 'q5', type: 'tf', prompt: 'Vrai ou faux : dans le roman réaliste, la description du lieu aide à comprendre les personnages.', answer: true, explanation: 'Vrai : chez Balzac, le milieu reflète et explique les personnages.' },
    ],
  },
  {
    id: '2BAC-francais-o4', levelId: '2BAC', subjectId: 'francais', title: 'Activités de langue', lang: 'fr',
    objectives: ['Reconnaître les principales figures de style', 'Identifier les modalisateurs et les connecteurs logiques', 'Transformer un discours direct en discours indirect'],
    lesson: [
      { type: 'h', text: 'Les outils de la langue pour analyser un texte' },
      { type: 'list', items: ['Comparaison : rapprochement avec un outil (comme, tel) — « Il est rapide comme le vent. »', 'Métaphore : rapprochement sans outil — « Cet élève est un lion. »', 'Antithèse : opposition de deux mots — « la richesse et la misère ».', 'Hyperbole : exagération — « J’ai attendu mille ans. »', 'Personnification : un objet agit comme un humain — « La ville s’éveille. »'] },
      { type: 'rule', text: 'La modalisation exprime le degré de certitude ou le jugement de l’auteur : adverbes (peut-être, sans doute), verbes (sembler, paraître), conditionnel, vocabulaire mélioratif ou péjoratif. Les connecteurs logiques organisent l’argumentation : cause (car, parce que), conséquence (donc, ainsi), opposition (mais, cependant), addition (de plus).' },
      { type: 'p', text: 'Au discours indirect, on supprime les guillemets, on ajoute une subordonnée (que, si) et on change les pronoms et les temps si le verbe introducteur est au passé : le présent devient imparfait, le futur devient conditionnel présent.' },
      { type: 'example', text: 'Discours direct : Salma a dit : « Je partirai à Fès demain. » → Discours indirect : Salma a dit qu’elle partirait à Fès le lendemain.' },
      { type: 'tip', text: 'Quand tu relèves une figure de style, explique toujours son effet sur le lecteur : c’est cela qui rapporte des points.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: '« Le temps est un voleur » : quelle figure de style ?', choices: ['Comparaison', 'Antithèse', 'Métaphore'], answer: 2, explanation: 'Il y a rapprochement sans outil de comparaison : c’est une métaphore.' },
      { id: 'q2', type: 'qcm', prompt: 'Quel connecteur exprime l’opposition ?', choices: ['cependant', 'donc', 'car'], answer: 0, explanation: '« Cependant » marque l’opposition ; « donc » la conséquence ; « car » la cause.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : « peut-être » est un modalisateur qui exprime le doute.', answer: true, explanation: 'Vrai : cet adverbe nuance l’affirmation et exprime l’incertitude.' },
      { id: 'q4', type: 'text', prompt: 'Complète au discours indirect : Youssef a dit : « Je viendrai. » → Youssef a dit qu’il … (un verbe conjugué)', accept: ['viendrait'], explanation: 'Avec un verbe introducteur au passé, le futur devient conditionnel présent : « viendrait ».' },
      { id: 'q5', type: 'qcm', prompt: '« Je meurs de faim » est un exemple de…', choices: ['personnification', 'hyperbole', 'antithèse'], answer: 1, explanation: 'C’est une exagération pour insister sur la faim : une hyperbole.' },
    ],
  },
];
