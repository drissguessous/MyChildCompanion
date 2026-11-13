import type { Chapter } from '../types';

/** Cours 3AP français : projets des unités du programme officiel. */
export const GEN_O_3AP_FRANCAIS_1: Chapter[] = [
  {
    id: '3AP-francais-o1', levelId: '3AP', subjectId: 'francais', title: 'Projet : un dossier sur les métiers', lang: 'fr',
    objectives: ['Nommer des métiers et leurs outils', 'Dire ce que fait une personne avec « il / elle + verbe »', 'Préparer une fiche pour le dossier'],
    lesson: [
      { type: 'h', text: 'Les métiers autour de nous' },
      { type: 'list', items: ['Le boulanger fait le pain.', 'La médecin soigne les malades.', 'L’agriculteur cultive la terre.', 'La maîtresse enseigne aux élèves.', 'Le menuisier fabrique des meubles en bois.'] },
      { type: 'rule', text: 'Pour présenter un métier, je dis : son nom, le lieu de travail, les outils et ce que fait la personne. Exemple : « Le menuisier travaille dans un atelier. Il utilise une scie. »' },
      { type: 'example', text: 'Fiche du dossier : Métier : pêcheur. Lieu : le port d’Agadir. Outils : le filet, la barque. Il attrape des poissons.' },
      { type: 'p', text: 'Pour le dossier, chaque élève prépare une fiche avec un dessin et quelques phrases. On réunit toutes les fiches dans une chemise avec une page de titre.' },
      { type: 'tip', text: 'Interroge une personne de ta famille sur son métier : tu auras de belles informations pour ta fiche !' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Qui fait le pain ?', choices: ['le boulanger', 'le facteur', 'le pêcheur'], answer: 0, explanation: 'Le boulanger prépare et cuit le pain dans sa boulangerie.' },
      { id: 'q2', type: 'qcm', prompt: 'Le menuisier utilise…', choices: ['un stéthoscope', 'une scie', 'un filet'], answer: 1, explanation: 'Le menuisier coupe le bois avec une scie. Le stéthoscope est l’outil du médecin, le filet celui du pêcheur.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : l’agriculteur travaille dans un hôpital.', answer: false, explanation: 'Faux : l’agriculteur travaille dans les champs. On travaille à l’hôpital quand on est médecin ou infirmier.' },
      { id: 'q4', type: 'text', prompt: 'Complète : « La médecin … les malades. » (verbe soigner)', accept: ['soigne'], explanation: 'Avec « elle », le verbe soigner se termine par -e : elle soigne.' },
      { id: 'q5', type: 'qcm', prompt: 'Où travaille le pêcheur ?', choices: ['à l’école', 'à la boulangerie', 'au port'], answer: 2, explanation: 'Le pêcheur part du port avec sa barque pour attraper des poissons.' },
    ],
  },
  {
    id: '3AP-francais-o2', levelId: '3AP', subjectId: 'francais', title: 'Projet : un dossier sur l’amitié', lang: 'fr',
    objectives: ['Se présenter et présenter un ami', 'Utiliser des mots pour décrire un ami', 'Écrire quelques phrases pour le dossier'],
    lesson: [
      { type: 'h', text: 'Mon ami, mon amie' },
      { type: 'p', text: 'Un ami, c’est une personne avec qui on joue, on partage et on s’entraide.' },
      { type: 'rule', text: 'Pour présenter un ami, je dis : « Il s’appelle… Il a … ans. Il est gentil. Il aime… » Pour une amie : « Elle s’appelle… Elle est gentille. »' },
      { type: 'example', text: 'Mon amie s’appelle Salma. Elle a huit ans. Elle habite à Fès. Elle est drôle et généreuse. Elle aime dessiner.' },
      { type: 'list', items: ['Des mots de l’amitié : partager, aider, jouer ensemble, écouter.', 'Des qualités : gentil / gentille, poli / polie, drôle, généreux / généreuse.'] },
      { type: 'tip', text: 'Dans ton dossier, colle une photo ou un dessin de ton ami à côté de ta présentation : ce sera très joli !' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Choisis la bonne phrase pour une fille.', choices: ['Elle est gentil.', 'Elle est gentille.', 'Il est gentille.'], answer: 1, explanation: 'Pour une fille, on écrit « elle » et on ajoute -le : gentille.' },
      { id: 'q2', type: 'text', prompt: 'Complète : « Mon ami … Youssef. » (verbe s’appeler)', accept: ['s’appelle', "s'appelle", 'sappelle'], explanation: 'On dit : il s’appelle Youssef.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : un bon ami aide les autres.', answer: true, explanation: 'Vrai : l’entraide est une belle qualité de l’amitié.' },
      { id: 'q4', type: 'qcm', prompt: 'Quel mot est une qualité ?', choices: ['un cartable', 'courir', 'poli'], answer: 2, explanation: '« Poli » décrit une personne : c’est une qualité. Le cartable est un objet, courir est une action.' },
      { id: 'q5', type: 'open', prompt: 'Écris deux phrases pour présenter ton ami ou ton amie.', modelAnswer: 'Mon ami s’appelle Adam. Il a neuf ans et il aime jouer au football.', explanation: 'On accepte toute présentation avec le prénom et une information (âge, qualité, goût). Vérifier la majuscule et le point.' },
    ],
  },
  {
    id: '3AP-francais-o3', levelId: '3AP', subjectId: 'francais', title: 'Projet : un journal sur la coopérative scolaire', lang: 'fr',
    objectives: ['Comprendre ce qu’est une coopérative scolaire', 'Connaître les parties d’un journal', 'Écrire une courte nouvelle'],
    lesson: [
      { type: 'h', text: 'La coopérative scolaire' },
      { type: 'p', text: 'Dans la coopérative, les élèves travaillent ensemble pour leur école : ils plantent des fleurs, rangent la bibliothèque ou organisent une fête.' },
      { type: 'h', text: 'Le journal de la classe' },
      { type: 'rule', text: 'Un journal a un nom (le titre), une date, des articles avec un titre et une image. Un article répond à : Qui ? Quoi ? Où ? Quand ?' },
      { type: 'example', text: 'Titre : Un jardin pour notre école. Lundi, les élèves de 3e année ont planté des rosiers dans la cour avec leur maître.' },
      { type: 'tip', text: 'Chaque élève peut écrire un petit article : ensemble, vous ferez un vrai journal, comme une équipe !' },
    ],
    exercises: [
      { id: 'q1', type: 'tf', prompt: 'Vrai ou faux : dans une coopérative, les élèves travaillent ensemble.', answer: true, explanation: 'Vrai : coopérer, c’est travailler ensemble pour un même but.' },
      { id: 'q2', type: 'qcm', prompt: 'Dans un journal, on trouve…', choices: ['des articles', 'des ingrédients', 'des billets de train'], answer: 0, explanation: 'Un journal contient des articles qui racontent des nouvelles.' },
      { id: 'q3', type: 'qcm', prompt: '« Lundi » répond à la question…', choices: ['Qui ?', 'Quand ?', 'Où ?'], answer: 1, explanation: 'Lundi est un moment : il répond à « Quand ? ».' },
      { id: 'q4', type: 'qcm', prompt: '« dans la cour » répond à la question…', choices: ['Quand ?', 'Qui ?', 'Où ?'], answer: 2, explanation: '« Dans la cour » indique un lieu : il répond à « Où ? ».' },
      { id: 'q5', type: 'text', prompt: 'Complète : « Les élèves … des fleurs. » (verbe planter, au présent)', accept: ['plantent'], explanation: 'Avec « les élèves » (ils), le verbe se termine par -ent : ils plantent.' },
    ],
  },
  {
    id: '3AP-francais-o4', levelId: '3AP', subjectId: 'francais', title: 'Projet : une affiche sur l’importance de l’eau', lang: 'fr',
    objectives: ['Dire pourquoi l’eau est importante', 'Donner des conseils avec l’impératif', 'Réaliser une affiche'],
    lesson: [
      { type: 'h', text: 'L’eau, c’est la vie' },
      { type: 'p', text: 'Les hommes, les animaux et les plantes ont besoin d’eau pour vivre. On utilise l’eau pour boire, se laver, cuisiner et arroser.' },
      { type: 'rule', text: 'Pour donner un conseil sur une affiche, j’utilise l’impératif : « Ferme le robinet ! », « Ne gaspille pas l’eau ! »' },
      { type: 'example', text: 'Affiche : grand titre « Économisons l’eau ! », un dessin de robinet, trois conseils courts.' },
      { type: 'list', items: ['Ferme le robinet quand tu te brosses les dents.', 'Prends une douche courte.', 'Arrose les plantes le soir.'] },
      { type: 'tip', text: 'Une belle affiche a peu de mots, écrits en gros, et des couleurs : laisse parler ta créativité !' },
    ],
    exercises: [
      { id: 'q1', type: 'tf', prompt: 'Vrai ou faux : les plantes ont besoin d’eau pour vivre.', answer: true, explanation: 'Vrai : sans eau, les plantes se dessèchent.' },
      { id: 'q2', type: 'qcm', prompt: 'Quel conseil aide à économiser l’eau ?', choices: ['Laisse couler le robinet.', 'Ferme le robinet.', 'Prends un très long bain.'], answer: 1, explanation: 'Fermer le robinet évite de gaspiller l’eau.' },
      { id: 'q3', type: 'qcm', prompt: 'Quelle phrase est à l’impératif ?', choices: ['Je ferme le robinet.', 'Il ferme le robinet.', 'Ferme le robinet !'], answer: 2, explanation: 'À l’impératif, il n’y a pas de sujet : « Ferme le robinet ! ».' },
      { id: 'q4', type: 'text', prompt: 'Complète le conseil : « Ne … pas l’eau ! » (verbe gaspiller)', accept: ['gaspille'], explanation: 'À l’impératif avec « tu » : ne gaspille pas l’eau !' },
      { id: 'q5', type: 'qcm', prompt: 'Sur une affiche, on écrit…', choices: ['un titre en gros', 'une très longue histoire', 'rien du tout'], answer: 0, explanation: 'Une affiche doit se lire vite : un titre en gros, un dessin et des phrases courtes.' },
    ],
  },
  {
    id: '3AP-francais-o5', levelId: '3AP', subjectId: 'francais', title: 'Projet : un dossier sur les voyages et les excursions', lang: 'fr',
    objectives: ['Nommer des moyens de transport et des lieux', 'Raconter une sortie simplement', 'Préparer une page du dossier'],
    lesson: [
      { type: 'h', text: 'Partir en voyage' },
      { type: 'list', items: ['Les moyens de transport : le car, le train, l’avion, le bateau, la voiture.', 'Les lieux : la mer, la montagne, le désert, la ville, la forêt.', 'Les affaires : le sac à dos, la casquette, la gourde, l’appareil photo.'] },
      { type: 'rule', text: 'On dit : voyager en car, en train, en avion, en bateau, mais à pied. Pour raconter, j’utilise d’abord, ensuite, enfin.' },
      { type: 'example', text: 'Avec ma classe, nous sommes allés à Ifrane en car. D’abord, nous avons visité la forêt. Ensuite, nous avons pique-niqué. Enfin, nous sommes rentrés.' },
      { type: 'tip', text: 'Pour ta page du dossier, ajoute une carte postale ou un dessin du lieu visité : tes camarades voyageront avec toi !' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Quel moyen de transport vole dans le ciel ?', choices: ['le train', 'l’avion', 'le bateau'], answer: 1, explanation: 'L’avion vole dans le ciel. Le train roule sur des rails, le bateau navigue sur l’eau.' },
      { id: 'q2', type: 'qcm', prompt: 'Complète : « Je vais à l’école … pied. »', choices: ['à', 'en', 'dans'], answer: 0, explanation: 'On dit « à pied », mais « en car », « en train ».' },
      { id: 'q3', type: 'text', prompt: 'Complète : « Nous voyageons … train. »', accept: ['en'], explanation: 'On dit « en train ».' },
      { id: 'q4', type: 'tf', prompt: 'Vrai ou faux : « enfin » sert à dire la dernière étape.', answer: true, explanation: 'Vrai : d’abord (début), ensuite (milieu), enfin (fin).' },
      { id: 'q5', type: 'qcm', prompt: 'Que mets-tu dans ton sac pour boire pendant l’excursion ?', choices: ['un parapluie', 'un cahier', 'une gourde'], answer: 2, explanation: 'La gourde contient de l’eau à boire.' },
    ],
  },
  {
    id: '3AP-francais-o6', levelId: '3AP', subjectId: 'francais', title: 'Projet : un dépliant pour se protéger des dangers', lang: 'fr',
    objectives: ['Reconnaître des dangers à la maison et dans la rue', 'Donner des consignes de sécurité', 'Réaliser un dépliant'],
    lesson: [
      { type: 'h', text: 'Attention aux dangers !' },
      { type: 'list', items: ['À la maison : le feu, l’électricité, les médicaments, les objets coupants.', 'Dans la rue : les voitures, traverser sans regarder.'] },
      { type: 'rule', text: 'Une consigne de sécurité utilise l’impératif ou « il faut » : « Traverse sur le passage piéton. » « Il ne faut pas toucher les prises électriques. »' },
      { type: 'example', text: 'Dépliant : page 1 le titre « Je me protège ! », page 2 les dangers à la maison, page 3 les dangers dans la rue, avec un dessin pour chaque conseil.' },
      { type: 'p', text: 'En cas de problème, je demande toujours de l’aide à un adulte.' },
      { type: 'tip', text: 'Montre ton dépliant à ta famille : tu deviens un petit ambassadeur de la sécurité !' },
    ],
    exercises: [
      { id: 'q1', type: 'tf', prompt: 'Vrai ou faux : on peut jouer avec les allumettes.', answer: false, explanation: 'Faux : les allumettes peuvent provoquer un incendie. On ne joue pas avec le feu.' },
      { id: 'q2', type: 'qcm', prompt: 'Où traverse-t-on la rue ?', choices: ['entre deux voitures', 'sur le passage piéton', 'en courant n’importe où'], answer: 1, explanation: 'On traverse sur le passage piéton, après avoir regardé à gauche et à droite.' },
      { id: 'q3', type: 'qcm', prompt: 'Quelle phrase est une consigne de sécurité ?', choices: ['Ne touche pas la prise électrique !', 'J’aime le chocolat.', 'Le ciel est bleu.'], answer: 0, explanation: 'Une consigne dit ce qu’il faut faire ou ne pas faire pour rester en sécurité.' },
      { id: 'q4', type: 'text', prompt: 'Complète : « Il ne … pas prendre les médicaments seul. » (verbe falloir)', accept: ['faut'], explanation: 'On dit : il ne faut pas.' },
      { id: 'q5', type: 'qcm', prompt: 'Si tu te blesses, tu dois…', choices: ['te cacher', 'ne rien dire', 'appeler un adulte'], answer: 2, explanation: 'Un adulte peut t’aider et te soigner : il faut toujours prévenir.' },
    ],
  },
];
