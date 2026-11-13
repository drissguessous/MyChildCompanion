import type { Chapter } from '../types';

/** Cours générés : 1BAC français (lot o-1bac-francais-1). */
export const GEN_O_1BAC_FRANCAIS_1: Chapter[] = [
  {
    id: '1BAC-francais-o1', levelId: '1BAC', subjectId: 'francais', title: 'Pierre Boulle, « La Planète des singes »', lang: 'fr',
    objectives: ['Situer l’œuvre, son auteur et son genre', 'Comprendre la structure du récit et ses personnages', 'Dégager la portée critique du roman'],
    lesson: [
      { type: 'h', text: 'L’auteur et l’œuvre' },
      { type: 'p', text: 'Pierre Boulle (1912-1994) est un écrivain français, ingénieur de formation. Il publie « La Planète des singes » en 1963. C’est un roman de science-fiction : il imagine un monde inventé à partir d’hypothèses scientifiques (voyage interstellaire, évolution des espèces) pour faire réfléchir sur notre propre société.' },
      { type: 'list', items: [
        'Récit-cadre : deux voyageurs de l’espace, Jinn et Phyllis, trouvent un manuscrit enfermé dans une bouteille et le lisent.',
        'Récit enchâssé : le manuscrit est écrit par Ulysse Mérou, journaliste, parti avec le professeur Antelle et Arthur Levain vers l’étoile Bételgeuse.',
        'Sur la planète Soror, les singes (gorilles, orangs-outans, chimpanzés) dominent ; les humains vivent comme des bêtes, sans langage.',
        'Personnages clés : Nova, jeune femme muette ; Zira et Cornélius, chimpanzés savants ; Zaïus, orang-outan conservateur.',
      ] },
      { type: 'rule', text: 'À retenir : le roman repose sur un renversement (les singes à la place des hommes). Ce procédé sert la satire : il critique l’orgueil humain, le refus de la science par les conservateurs, l’expérimentation sur les êtres vivants et la routine qui endort une civilisation.' },
      { type: 'example', text: 'Lorsqu’Ulysse est enfermé dans une cage et étudié comme un animal de laboratoire, le lecteur ressent ce que vivent les animaux dans nos laboratoires : c’est l’effet du renversement.' },
      { type: 'p', text: 'La chute est double : de retour sur Terre, Ulysse découvre qu’elle aussi est dominée par des singes ; puis le récit-cadre révèle que Jinn et Phyllis sont eux-mêmes des chimpanzés qui jugent son histoire peu crédible.' },
      { type: 'tip', text: 'Pour l’examen, construis une fiche : auteur, date, genre, narrateur, lieux, personnages, thèmes. Relis-la souvent : tu gagneras du temps le jour J.' },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'En quelle année « La Planète des singes » a-t-il été publié ?', answer: 1963, explanation: 'Le roman de Pierre Boulle paraît en 1963.' },
      { id: 'q2', type: 'qcm', prompt: 'Qui est le narrateur du manuscrit ?', choices: ['Le professeur Antelle', 'Ulysse Mérou', 'Cornélius'], answer: 1, explanation: 'Ulysse Mérou, journaliste, raconte son aventure sur Soror dans le manuscrit.' },
      { id: 'q3', type: 'text', prompt: 'Comment s’appelle la planète où atterrissent les voyageurs ?', accept: ['Soror', 'la planète Soror'], explanation: 'Les voyageurs baptisent la planète Soror (« sœur » en latin), car elle ressemble à la Terre.' },
      { id: 'q4', type: 'tf', prompt: 'Vrai ou faux : Jinn et Phyllis, qui lisent le manuscrit, se révèlent être des chimpanzés.', answer: true, explanation: 'Vrai : c’est la chute finale du récit-cadre, qui renforce la satire.' },
      { id: 'q5', type: 'qcm', prompt: 'Quel procédé principal sert la critique de la société humaine dans le roman ?', choices: ['Le renversement des rôles entre hommes et singes', 'Le récit historique réel', 'La poésie en vers'], answer: 0, explanation: 'En plaçant les singes au pouvoir et les hommes en position d’animaux, l’auteur pousse le lecteur à regarder ses propres comportements autrement.' },
    ],
  },
  {
    id: '1BAC-francais-o2', levelId: '1BAC', subjectId: 'francais', title: 'Activités de langue : exprimer cause, conséquence, but et opposition', lang: 'fr',
    objectives: ['Distinguer les rapports logiques de cause, de conséquence, de but et d’opposition', 'Choisir le bon connecteur et le bon mode verbal'],
    lesson: [
      { type: 'h', text: 'Les rapports logiques' },
      { type: 'list', items: [
        'Cause (pourquoi ?) : parce que, puisque, comme, car, grâce à, à cause de.',
        'Conséquence (quel résultat ?) : donc, c’est pourquoi, si bien que, de sorte que (+ indicatif), si… que, tellement… que.',
        'But (dans quelle intention ?) : pour, afin de (+ infinitif), pour que, afin que (+ subjonctif).',
        'Opposition / concession : mais, pourtant, cependant, bien que, quoique (+ subjonctif), malgré (+ nom).',
      ] },
      { type: 'rule', text: 'À retenir : la cause et la conséquence se construisent avec l’indicatif ; le but et la concession avec « bien que », « pour que », « afin que » demandent le subjonctif.' },
      { type: 'example', text: 'Comme il pleuvait sur Agadir, Yasmine est restée à la maison (cause). Elle a tant révisé qu’elle se sent prête (conséquence). Elle lit chaque soir pour que son vocabulaire s’enrichisse (but). Bien qu’elle soit fatiguée, elle continue (concession).' },
      { type: 'p', text: 'Attention : « de sorte que » + indicatif exprime une conséquence réelle ; + subjonctif, il exprime un but.' },
      { type: 'tip', text: 'Pose-toi la question « pourquoi ? », « avec quel résultat ? » ou « dans quel but ? » : la réponse t’indique le rapport logique.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: '« Il est arrivé en retard à cause des embouteillages. » Quel rapport logique ?', choices: ['Le but', 'La conséquence', 'La cause'], answer: 2, explanation: '« À cause de » introduit la cause du retard.' },
      { id: 'q2', type: 'qcm', prompt: 'Complète : « Le professeur répète la consigne pour que tout le monde la … »', choices: ['comprenne', 'comprend', 'comprendra'], answer: 0, explanation: '« Pour que » exprime le but et exige le subjonctif : comprenne.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : « bien que » est suivi de l’indicatif.', answer: false, explanation: 'Faux : « bien que » est suivi du subjonctif (bien qu’il soit…).' },
      { id: 'q4', type: 'text', prompt: 'Quel rapport logique exprime « si bien que » ? (un mot)', accept: ['consequence', 'la consequence', 'conséquence'], explanation: '« Si bien que » introduit le résultat d’un fait : c’est la conséquence.' },
      { id: 'q5', type: 'qcm', prompt: '« Malgré la chaleur, Karim a couru dix kilomètres. » Quel rapport logique ?', choices: ['La cause', 'L’opposition (concession)', 'Le but'], answer: 1, explanation: '« Malgré » + nom marque une concession : le fait se réalise en dépit de l’obstacle.' },
    ],
  },
  {
    id: '1BAC-francais-o3', levelId: '1BAC', subjectId: 'francais', title: 'Production écrite : rédiger un texte argumentatif', lang: 'fr',
    objectives: ['Analyser un sujet et formuler une thèse', 'Organiser des arguments illustrés d’exemples', 'Rédiger une introduction et une conclusion'],
    lesson: [
      { type: 'h', text: 'Les étapes de la production écrite' },
      { type: 'list', items: [
        'Lire le sujet : repérer le thème, la question posée et la consigne (défendre, réfuter, discuter).',
        'Chercher des idées au brouillon puis les classer en arguments.',
        'Introduction : amener le sujet, poser la problématique, annoncer le plan.',
        'Développement : un paragraphe par argument (idée + explication + exemple), relié par des connecteurs.',
        'Conclusion : faire le bilan et ouvrir sur une nouvelle question.',
      ] },
      { type: 'rule', text: 'À retenir : un argument est une idée qui soutient la thèse ; un exemple est un fait concret qui illustre l’argument. Chaque paragraphe doit contenir les deux.' },
      { type: 'example', text: 'Thèse : la science doit rester au service de l’homme. Argument : sans règles éthiques, une découverte peut devenir dangereuse. Exemple : un roman comme « La Planète des singes » montre des êtres vivants traités comme des objets de laboratoire.' },
      { type: 'p', text: 'Pense aux connecteurs d’organisation : d’abord, ensuite, de plus, enfin, en somme. Relis-toi pour vérifier les accords, la conjugaison et la ponctuation.' },
      { type: 'tip', text: 'Garde dix minutes pour la relecture : c’est souvent là que tu gagnes de précieux points.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Quelle partie annonce le plan du devoir ?', choices: ['La conclusion', 'L’introduction', 'Le dernier paragraphe du développement'], answer: 1, explanation: 'L’introduction amène le sujet, pose la problématique et annonce le plan.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : un exemple est un fait concret qui illustre un argument.', answer: true, explanation: 'Vrai : l’argument est l’idée, l’exemple la rend concrète et convaincante.' },
      { id: 'q3', type: 'text', prompt: 'Comment appelle-t-on l’opinion que l’auteur défend dans un texte argumentatif ? (un mot)', accept: ['these', 'la these', 'thèse'], explanation: 'La thèse est la position défendue ; les arguments la soutiennent.' },
      { id: 'q4', type: 'qcm', prompt: 'Quel connecteur sert à introduire un dernier argument ?', choices: ['Enfin', 'Car', 'Pourtant'], answer: 0, explanation: '« Enfin » marque la dernière étape d’une énumération.' },
      { id: 'q5', type: 'open', prompt: 'Rédige un paragraphe argumentatif (5 à 7 lignes) sur le sujet : « La lecture aide-t-elle à mieux réfléchir ? »', modelAnswer: 'D’abord, la lecture aide à mieux réfléchir, car elle nous fait découvrir des points de vue différents du nôtre. En effet, en suivant un personnage, on apprend à comprendre ses raisons et à nuancer notre jugement. Par exemple, un roman de science-fiction pousse le lecteur à se demander comment il réagirait dans un monde inversé. Ainsi, lire entraîne l’esprit critique.', explanation: 'On attend : une idée claire (argument), une explication, un exemple précis et des connecteurs (d’abord, en effet, par exemple, ainsi). La langue doit être correcte.' },
    ],
  },
];
