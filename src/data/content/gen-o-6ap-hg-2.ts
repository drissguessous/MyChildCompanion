import type { Chapter } from '../types';

/** Éducation à la citoyenneté, 6AP (programme officiel, unité التربية على المواطنة). */
export const GEN_O_6AP_HG_2: Chapter[] = [
  {
    id: '6AP-hg-o31', levelId: '6AP', subjectId: 'hg', title: 'Qui doit me protéger ?', lang: 'fr',
    objectives: ['Citer les personnes et les institutions chargées de protéger l’enfant', 'Savoir à qui s’adresser en cas de danger'],
    lesson: [
      { type: 'h', text: 'Les acteurs de la protection de l’enfant — ما هي الجهات التي عليها حمايتي؟' },
      { type: 'p', text: 'Tout enfant a droit à la protection contre la violence, la négligence, l’exploitation et les dangers. Ce droit est reconnu par la Convention internationale des droits de l’enfant (1989), que le Maroc a ratifiée, et par la Constitution marocaine.' },
      { type: 'list', items: ['La famille : les parents protègent, nourrissent, soignent et éduquent l’enfant.', 'L’école : les enseignants et la direction veillent à la sécurité des élèves.', 'L’État et ses institutions : la police, la gendarmerie, la justice, les hôpitaux, la protection civile.', 'La société civile : les associations qui aident et défendent les enfants.'] },
      { type: 'rule', text: 'À retenir : la protection de l’enfant est une responsabilité partagée entre la famille, l’école, l’État et la société. En cas de danger, l’enfant peut demander de l’aide à un adulte de confiance.' },
      { type: 'example', text: 'Yassine voit un incendie dans un terrain près de chez lui à Fès. Il prévient tout de suite ses parents, qui appellent la protection civile au 15.' },
      { type: 'tip', text: 'Apprends par cœur deux numéros utiles au Maroc : 19 pour la police et 15 pour la protection civile (pompiers). Tu sauras réagir calmement si besoin !' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Qui est le premier responsable de la protection de l’enfant au quotidien ?', choices: ['Les commerçants', 'La famille', 'Les touristes'], answer: 1, explanation: 'Les parents (la famille) protègent, soignent et éduquent l’enfant chaque jour.' },
      { id: 'q2', type: 'number', prompt: 'Quel numéro appelle-t-on au Maroc pour joindre la police ?', answer: 19, explanation: 'Le 19 est le numéro de la police au Maroc.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : seule la famille doit protéger l’enfant.', answer: false, explanation: 'Faux : la famille, l’école, l’État et les associations partagent cette responsabilité.' },
      { id: 'q4', type: 'qcm', prompt: 'Quelle institution intervient en cas d’incendie ?', choices: ['La protection civile', 'La bibliothèque', 'La poste'], answer: 0, explanation: 'La protection civile (les pompiers) éteint les incendies et porte secours.' },
      { id: 'q5', type: 'open', prompt: 'Un camarade est menacé par un inconnu à la sortie de l’école. Que peux-tu faire ?', modelAnswer: 'Ne pas s’approcher de l’inconnu, prévenir tout de suite un adulte de confiance (enseignant, directeur, parent) qui pourra appeler la police au 19.', explanation: 'L’essentiel est de rester en sécurité et d’alerter rapidement un adulte, qui contactera si besoin les autorités.' },
    ],
  },
  {
    id: '6AP-hg-o32', levelId: '6AP', subjectId: 'hg', title: 'Me protéger et protéger les autres', lang: 'fr',
    objectives: ['Adopter des comportements de prudence', 'Savoir aider et alerter quand quelqu’un est en danger'],
    lesson: [
      { type: 'h', text: 'Prudence et solidarité — كيف أحمي نفسي بنفسي؟ كيف أحمي غيري؟' },
      { type: 'p', text: 'Se protéger, c’est éviter les dangers : sur la route, à la maison, sur Internet ou face à des inconnus. Protéger les autres, c’est être solidaire : aider, alerter et ne jamais mettre quelqu’un en danger.' },
      { type: 'list', items: ['Sur la route : traverser sur le passage piéton, regarder à gauche puis à droite.', 'À la maison : ne pas toucher aux prises électriques, au gaz ou aux médicaments.', 'Sur Internet : ne jamais donner son adresse, son mot de passe ou ses photos à un inconnu.', 'Face à un inconnu : ne pas le suivre, ne rien accepter, prévenir un adulte.'] },
      { type: 'rule', text: 'À retenir : je me protège en étant prudent, et je protège les autres en alertant un adulte ou les secours sans me mettre moi-même en danger.' },
      { type: 'example', text: 'Salma reçoit un message d’un inconnu qui lui demande son adresse. Elle ne répond pas et montre le message à sa mère.' },
      { type: 'tip', text: 'Demander de l’aide, c’est un signe de courage et d’intelligence. Tu as toujours le droit de dire « non » et d’en parler à un adulte de confiance.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Où dois-tu traverser la rue ?', choices: ['Entre deux voitures garées', 'En courant n’importe où', 'Sur le passage piéton'], answer: 2, explanation: 'Le passage piéton est l’endroit prévu et le plus sûr pour traverser.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : je peux donner mon mot de passe à un ami rencontré sur Internet.', answer: false, explanation: 'Faux : un mot de passe reste secret ; on ne connaît pas vraiment une personne rencontrée en ligne.' },
      { id: 'q3', type: 'qcm', prompt: 'Ton petit frère joue près d’une prise électrique. Que fais-tu ?', choices: ['Je l’éloigne et je préviens un adulte', 'Je le laisse jouer', 'Je touche la prise pour vérifier'], answer: 0, explanation: 'On éloigne l’enfant du danger et on prévient un adulte, sans toucher soi-même la prise.' },
      { id: 'q4', type: 'number', prompt: 'Quel numéro appelle-t-on au Maroc pour joindre la protection civile (pompiers) ?', answer: 15, explanation: 'Le 15 est le numéro de la protection civile au Maroc.' },
      { id: 'q5', type: 'tf', prompt: 'Vrai ou faux : pour aider une personne en danger, je dois parfois alerter un adulte ou les secours plutôt qu’agir seul.', answer: true, explanation: 'Vrai : alerter permet d’aider sans se mettre soi-même en danger.' },
    ],
  },
  {
    id: '6AP-hg-o33', levelId: '6AP', subjectId: 'hg', title: 'Mon droit de participer aux décisions qui me concernent', lang: 'fr',
    objectives: ['Comprendre le droit de l’enfant à exprimer son avis', 'Connaître des lieux de participation des enfants'],
    lesson: [
      { type: 'h', text: 'Le droit de participation — حقي في المشاركة في اتخاذ القرارات التي تهمني' },
      { type: 'p', text: 'La Convention internationale des droits de l’enfant reconnaît à l’enfant le droit d’exprimer librement son opinion sur les questions qui le concernent, et que cette opinion soit prise en compte selon son âge et sa maturité.' },
      { type: 'list', items: ['En famille : donner son avis sur une sortie, l’organisation de la maison.', 'À l’école : élire des délégués de classe, participer au conseil ou aux clubs.', 'Dans la société : le Parlement de l’enfant au Maroc permet à des enfants de débattre de leurs droits.'] },
      { type: 'rule', text: 'À retenir : participer, c’est exprimer son avis avec respect, écouter celui des autres et accepter la décision prise ensemble, souvent par vote.' },
      { type: 'example', text: 'Dans la classe de Omar à Agadir, les élèves votent pour choisir le thème de la fête de fin d’année. Le choix qui a le plus de voix est adopté.' },
      { type: 'tip', text: 'Ton avis compte ! Prépare tes idées, explique-les calmement et écoute aussi tes camarades : c’est comme ça qu’on construit de bonnes décisions.' },
    ],
    exercises: [
      { id: 'q1', type: 'tf', prompt: 'Vrai ou faux : l’enfant a le droit d’exprimer son avis sur les questions qui le concernent.', answer: true, explanation: 'Vrai : c’est un droit reconnu par la Convention internationale des droits de l’enfant.' },
      { id: 'q2', type: 'qcm', prompt: 'Comment choisit-on souvent un délégué de classe ?', choices: ['Par tirage au sort secret du directeur', 'Par un vote des élèves', 'Le plus grand de la classe est choisi'], answer: 1, explanation: 'Les élèves élisent leur délégué par un vote.' },
      { id: 'q3', type: 'text', prompt: 'Complète : au Maroc, le Parlement de l’… permet à des enfants de débattre de leurs droits.', accept: ['enfant', 'l enfant', 'l’enfant', 'enfants'], explanation: 'Le Parlement de l’enfant réunit des enfants représentants pour débattre de leurs droits.' },
      { id: 'q4', type: 'qcm', prompt: 'Quelle attitude est correcte pendant un débat en classe ?', choices: ['Couper la parole', 'Se moquer des idées des autres', 'Écouter et donner son avis avec respect'], answer: 2, explanation: 'Participer, c’est s’exprimer avec respect et écouter les autres.' },
      { id: 'q5', type: 'tf', prompt: 'Vrai ou faux : quand une décision est prise par vote, on la respecte même si on a voté autrement.', answer: true, explanation: 'Vrai : respecter le choix de la majorité fait partie de la vie démocratique.' },
    ],
  },
  {
    id: '6AP-hg-o34', levelId: '6AP', subjectId: 'hg', title: 'Participer au développement de ma commune et de mon pays', lang: 'fr',
    objectives: ['Comprendre ce qu’est le développement local et national', 'Identifier des droits et des devoirs du citoyen dans ce développement'],
    lesson: [
      { type: 'h', text: 'Le citoyen acteur du développement — حقي وواجبي في المشاركة في تنمية جماعتي (محليا/وطنيا)' },
      { type: 'p', text: 'La commune (الجماعة) est gérée par un conseil communal élu par les habitants. Elle s’occupe de services de proximité : propreté, éclairage public, routes locales, espaces verts, marchés. Le développement améliore la vie de tous : écoles, santé, eau, emploi, environnement.' },
      { type: 'list', items: ['Mes droits : profiter des services publics, être informé, donner mon avis.', 'Mes devoirs : respecter les biens publics, garder les lieux propres, économiser l’eau et l’électricité.', 'Agir ensemble : participer à des actions de volontariat ou d’associations (plantation d’arbres, nettoyage).'] },
      { type: 'rule', text: 'À retenir : chaque citoyen, même enfant, a le droit de profiter du développement et le devoir d’y participer, au niveau local (la commune) comme au niveau national (le Maroc).' },
      { type: 'example', text: 'À Tiznit, l’association du quartier organise une journée de plantation d’arbres. Hiba et ses camarades y participent avec leurs parents.' },
      { type: 'tip', text: 'Même un petit geste compte : fermer le robinet, jeter un papier à la poubelle ou prendre soin des arbres, c’est déjà participer au développement !' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Qui gère la commune ?', choices: ['Un conseil communal élu', 'Les élèves de l’école', 'Une entreprise étrangère'], answer: 0, explanation: 'La commune est gérée par un conseil communal élu par les habitants.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : abîmer un banc du jardin public n’a aucune conséquence pour les habitants.', answer: false, explanation: 'Faux : les biens publics appartiennent à tous ; les abîmer prive les habitants et coûte de l’argent à la collectivité.' },
      { id: 'q3', type: 'qcm', prompt: 'Lequel est un devoir du citoyen ?', choices: ['Gaspiller l’eau', 'Respecter et protéger les biens publics', 'Jeter les déchets dans la rue'], answer: 1, explanation: 'Protéger les biens publics est un devoir de chaque citoyen.' },
      { id: 'q4', type: 'text', prompt: 'Comment appelle-t-on, en un mot, la collectivité locale gérée par un conseil élu (الجماعة) ?', accept: ['commune', 'la commune', 'une commune'], explanation: 'La commune (الجماعة) est la collectivité territoriale de proximité.' },
      { id: 'q5', type: 'open', prompt: 'Propose deux actions qu’un enfant peut faire pour participer au développement de sa commune.', modelAnswer: 'Par exemple : participer à une campagne de nettoyage ou de plantation d’arbres, économiser l’eau et l’électricité, respecter les espaces verts et le matériel de l’école.', explanation: 'Toute action concrète qui protège l’environnement, les biens publics ou aide les autres est acceptée.' },
    ],
  },
];
