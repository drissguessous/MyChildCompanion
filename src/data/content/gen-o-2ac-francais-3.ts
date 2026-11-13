import type { Chapter } from '../types';

export const GEN_O_2AC_FRANCAIS_3: Chapter[] = [
  {
    id: '2AC-francais-o61',
    levelId: '2AC',
    subjectId: 'francais',
    title: 'Concevoir la mise en scène de la pièce',
    lang: 'fr',
    objectives: ['Connaître les éléments d’une mise en scène', 'Utiliser les didascalies pour organiser le jeu', 'Répartir les rôles et les tâches dans le groupe'],
    lesson: [
      { type: 'p', text: 'Mettre en scène, c’est décider comment le texte écrit deviendra un spectacle : où jouent les acteurs, comment ils bougent, parlent, s’habillent, et ce que le public voit et entend.' },
      { type: 'list', items: ['Le décor : le lieu de l’action (une classe, un souk, une maison à Fès…), avec quelques objets simples.', 'Les costumes et accessoires : ils montrent qui est le personnage (un tablier pour un marchand, un cartable pour un élève).', 'Les déplacements : entrées, sorties, place de chacun sur la scène.', 'La voix et les gestes : ton, volume, rythme, expressions du visage.', 'Le son et la lumière : une musique, un bruit, une lumière qui baisse.'] },
      { type: 'rule', text: 'Les didascalies sont les indications écrites en italique ou entre parenthèses dans la pièce. Elles ne sont pas dites par les acteurs : elles guident la mise en scène (lieu, gestes, ton, entrées et sorties).' },
      { type: 'example', text: 'YOUSSEF, (entrant en courant, essoufflé) : Vite ! Le bus part dans deux minutes !\n→ « entrant en courant, essoufflé » indique le déplacement et l’état du personnage : l’acteur arrive vite et respire fort.' },
      { type: 'p', text: 'Le metteur en scène coordonne le travail. Le groupe répartit aussi les tâches : acteurs, responsable des décors, des costumes, du son, et un souffleur qui aide en cas de trou de mémoire.' },
      { type: 'tip', text: 'Note vos choix dans un petit carnet de mise en scène, scène par scène : tout le groupe saura quoi faire et vous gagnerez beaucoup de temps aux répétitions.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'À quoi servent les didascalies ?', choices: ['À être récitées par les acteurs', 'À donner des indications de jeu et de mise en scène', 'À résumer la pièce pour le public'], answer: 1, explanation: 'Les didascalies ne sont pas prononcées : elles indiquent le lieu, les gestes, le ton, les entrées et sorties.' },
      { id: 'q2', type: 'tf', prompt: 'Le metteur en scène est la personne qui coordonne le spectacle et guide les acteurs.', answer: true, explanation: 'Vrai : il organise les choix de décor, de jeu et de déplacements, et dirige les répétitions.' },
      { id: 'q3', type: 'qcm', prompt: 'Dans « SALMA, (à voix basse) : Ne fais pas de bruit… », que doit faire l’actrice ?', choices: ['Crier très fort', 'Sortir de scène', 'Parler doucement'], answer: 2, explanation: 'La didascalie « à voix basse » indique le ton : l’actrice parle doucement.' },
      { id: 'q4', type: 'text', prompt: 'Comment appelle-t-on la personne qui, cachée, aide un acteur qui oublie son texte ?', accept: ['le souffleur', 'souffleur', 'la souffleuse', 'souffleuse'], explanation: 'C’est le souffleur (ou la souffleuse) : il murmure la réplique oubliée.' },
      { id: 'q5', type: 'open', prompt: 'Ta pièce se passe dans un souk. Propose trois éléments de mise en scène simples (décor, costume ou accessoire, son) pour que le public reconnaisse le lieu.', modelAnswer: 'Décor : une table couverte de tissu avec des fruits et des épices. Costume : une djellaba et un tablier pour le marchand. Son : un fond sonore de voix et d’appels de vendeurs.', explanation: 'On attend trois éléments simples et cohérents avec le lieu, chacun d’un type différent (décor, costume/accessoire, son).' },
    ],
  },
  {
    id: '2AC-francais-o62',
    levelId: '2AC',
    subjectId: 'francais',
    title: 'Jouer la pièce',
    lang: 'fr',
    objectives: ['Mettre sa voix et son corps au service du personnage', 'Respecter les règles du jeu théâtral devant un public'],
    lesson: [
      { type: 'p', text: 'Jouer une pièce, c’est donner vie à un personnage devant un public. On utilise sa voix, son corps et son regard, en respectant le texte et les choix de mise en scène.' },
      { type: 'h', text: 'La voix et le corps' },
      { type: 'list', items: ['Articuler et parler assez fort pour être entendu jusqu’au fond de la salle.', 'Varier le ton selon le sentiment : joie, colère, peur, surprise.', 'Respecter la ponctuation : une pause après un point, une montée de la voix pour une question.', 'Faire face au public autant que possible et accompagner les paroles de gestes.'] },
      { type: 'rule', text: 'Sur scène, on reste dans son personnage même quand on ne parle pas : on écoute les autres, on réagit, et on enchaîne sa réplique sans attendre trop longtemps.' },
      { type: 'example', text: 'Réplique : « Tu as gagné le concours ? C’est formidable ! »\n→ La voix monte sur la question, puis l’acteur montre sa joie avec un grand sourire et un geste vers son camarade.' },
      { type: 'tip', text: 'Avoir un peu le trac, c’est normal ! Respire lentement avant d’entrer en scène. Si tu oublies une phrase, continue avec tes propres mots : le public ne s’en rendra souvent même pas compte.' },
    ],
    exercises: [
      { id: 'q1', type: 'tf', prompt: 'Quand un personnage ne parle pas, l’acteur peut sortir de son rôle et attendre sans réagir.', answer: false, explanation: 'Faux : il reste dans son personnage, écoute ses partenaires et réagit à ce qu’ils disent.' },
      { id: 'q2', type: 'qcm', prompt: 'Pour être bien entendu par le public, l’acteur doit surtout :', choices: ['Articuler et parler assez fort', 'Parler très vite', 'Tourner le dos à la salle'], answer: 0, explanation: 'Une bonne articulation et un volume suffisant permettent à toute la salle de comprendre.' },
      { id: 'q3', type: 'text', prompt: 'Quel mot désigne la peur ou l’angoisse qu’on ressent avant de monter sur scène ?', accept: ['le trac', 'trac'], explanation: 'C’est le trac. Il est normal et diminue avec la respiration et les répétitions.' },
      { id: 'q4', type: 'qcm', prompt: 'Comment dire la réplique « Qui a pris mon cahier ? » ?', choices: ['Sur un ton monotone, sans pause', 'En chuchotant, dos au public', 'Avec une voix qui monte à la fin, sur un ton intrigué ou fâché'], answer: 2, explanation: 'Le point d’interrogation demande une intonation montante ; le ton exprime l’inquiétude ou l’agacement du personnage.' },
      { id: 'q5', type: 'tf', prompt: 'Si un acteur oublie une phrase, il peut continuer avec ses propres mots pour ne pas bloquer la scène.', answer: true, explanation: 'Vrai : improviser une phrase proche du sens permet de garder le rythme ; le souffleur peut aussi aider.' },
    ],
  },
];
