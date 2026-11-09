import type { Exam } from './types';

const CALME = 'Lis chaque question jusqu’au bout. Commence par ce que tu sais faire. Tu as le droit de revenir en arrière.';

export const EXAMS: Exam[] = [
  {
    id: 'EX-1AP-math', levelId: '1AP', subjectId: 'math', title: 'Contrôle — nombres jusqu’à 20', lang: 'fr', durationMin: 20, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Compter et comparer', questions: [
        { id: 'a1', type: 'number', prompt: 'Combien font 6 + 4 ?', answer: 10, explanation: '6 + 4 = 10.' },
        { id: 'a2', type: 'number', prompt: 'Quel nombre vient après 13 ?', answer: 14, explanation: '13, 14.' },
        { id: 'a3', type: 'qcm', prompt: 'Quel est le plus petit ?', choices: ['11', '8', '17'], answer: 1, explanation: '8 est avant 11 et 17.' },
      ] },
      { title: 'Petit problème', questions: [
        { id: 'b1', type: 'number', prompt: 'Rim a 5 bonbons. Sa maman lui en donne 3. Combien en a-t-elle ?', answer: 8, points: 2, explanation: '5 + 3 = 8 bonbons.' },
        { id: 'b2', type: 'number', prompt: 'Il y a 9 oiseaux sur un arbre. 2 s’envolent. Combien en reste-t-il ?', answer: 7, points: 2, explanation: '9 − 2 = 7 oiseaux.' },
      ] },
    ],
  },
  {
    id: 'EX-2AP-math', levelId: '2AP', subjectId: 'math', title: 'Contrôle — additions et soustractions', lang: 'fr', durationMin: 30, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Calcul', questions: [
        { id: 'a1', type: 'number', prompt: '43 + 25 = ?', answer: 68, explanation: '3 + 5 = 8 ; 40 + 20 = 60.' },
        { id: 'a2', type: 'number', prompt: '87 − 52 = ?', answer: 35, explanation: '7 − 2 = 5 ; 80 − 50 = 30.' },
        { id: 'a3', type: 'number', prompt: '60 + 30 = ?', answer: 90, explanation: '6 dizaines + 3 dizaines = 9 dizaines.' },
      ] },
      { title: 'Problèmes', questions: [
        { id: 'b1', type: 'number', prompt: 'Un bus transporte 34 élèves. 21 autres montent. Combien d’élèves dans le bus ?', answer: 55, points: 2, explanation: '34 + 21 = 55.' },
        { id: 'b2', type: 'number', prompt: 'Ali a 98 DH. Il achète un ballon à 45 DH. Combien lui reste-t-il ?', answer: 53, points: 2, explanation: '98 − 45 = 53 DH.' },
      ] },
    ],
  },
  {
    id: 'EX-3AP-math', levelId: '3AP', subjectId: 'math', title: 'Contrôle — multiplication', lang: 'fr', durationMin: 30, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Tables', questions: [
        { id: 'a1', type: 'number', prompt: '4 × 6 = ?', answer: 24, explanation: 'Table de 4.' },
        { id: 'a2', type: 'number', prompt: '5 × 9 = ?', answer: 45, explanation: 'Table de 5.' },
        { id: 'a3', type: 'number', prompt: '3 × 8 = ?', answer: 24, explanation: 'Table de 3.' },
        { id: 'a4', type: 'number', prompt: '2 × 7 = ?', answer: 14, explanation: 'Table de 2.' },
      ] },
      { title: 'Problème', questions: [
        { id: 'b1', type: 'number', prompt: 'Un paquet contient 5 stylos. Combien de stylos dans 8 paquets ?', answer: 40, points: 2, explanation: '8 × 5 = 40.' },
        { id: 'b2', type: 'open', prompt: 'Invente un petit problème qui se résout avec 3 × 4.', modelAnswer: 'Exemple : « J’ai 3 boîtes de 4 œufs. Combien d’œufs ai-je ? » Réponse : 12.', points: 2, explanation: 'Vérifier : situation de groupes égaux (3 groupes de 4 ou 4 groupes de 3).' },
      ] },
    ],
  },
  {
    id: 'EX-4AP-math', levelId: '4AP', subjectId: 'math', title: 'Contrôle — fractions', lang: 'fr', durationMin: 30, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Comprendre', questions: [
        { id: 'a1', type: 'qcm', prompt: 'Un gâteau coupé en 6 parts ; on en mange 2. Fraction mangée ?', choices: ['2/6', '6/2', '4/6'], answer: 0, explanation: '2 parts sur 6.' },
        { id: 'a2', type: 'qcm', prompt: 'La plus grande fraction :', choices: ['3/8', '7/8', '5/8'], answer: 1, explanation: 'Même dénominateur : 7 est le plus grand numérateur.' },
        { id: 'a3', type: 'number', prompt: 'La moitié de 18 :', answer: 9, explanation: '18 ÷ 2 = 9.' },
      ] },
      { title: 'Problème', questions: [
        { id: 'b1', type: 'number', prompt: 'Un quart des 20 élèves d’une classe porte un bonnet. Combien d’élèves ?', answer: 5, points: 2, explanation: '20 ÷ 4 = 5.' },
        { id: 'b2', type: 'number', prompt: 'Combien de tiers dans une unité ?', answer: 3, explanation: '3/3 = 1.' },
      ] },
    ],
  },
  {
    id: 'EX-5AP-math', levelId: '5AP', subjectId: 'math', title: 'Contrôle — nombres décimaux', lang: 'fr', durationMin: 40, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Calcul', questions: [
        { id: 'a1', type: 'number', prompt: '3,4 + 2,35 = ?', answer: 5.75, explanation: '3,40 + 2,35 = 5,75.' },
        { id: 'a2', type: 'number', prompt: '10 − 4,6 = ?', answer: 5.4, explanation: '10,0 − 4,6 = 5,4.' },
        { id: 'a3', type: 'qcm', prompt: 'Range du plus petit au plus grand : 2,1 ; 2,09 ; 2,15', choices: ['2,09 < 2,1 < 2,15', '2,1 < 2,09 < 2,15', '2,15 < 2,1 < 2,09'], answer: 0, explanation: '2,09 < 2,10 < 2,15.' },
      ] },
      { title: 'Problème', questions: [
        { id: 'b1', type: 'number', prompt: 'Salma achète du pain à 1,5 DH et du lait à 3,75 DH. Combien paie-t-elle ?', answer: 5.25, unit: 'DH', points: 2, explanation: '1,50 + 3,75 = 5,25 DH.' },
        { id: 'b2', type: 'number', prompt: 'Elle paie avec un billet de 20 DH. Combien lui rend-on ?', answer: 14.75, unit: 'DH', points: 2, explanation: '20 − 5,25 = 14,75 DH.' },
      ] },
    ],
  },
  {
    id: 'EX-6AP-math', levelId: '6AP', subjectId: 'math', title: 'Examen blanc provincial — Mathématiques', lang: 'fr', durationMin: 60, kind: 'examen-blanc', instructions: CALME + ' Cet examen ressemble à l’examen provincial : prends-le comme un entraînement.',
    sections: [
      { title: 'Exercice 1 — Calcul', questions: [
        { id: 'a1', type: 'number', prompt: '12,5 × 4 = ?', answer: 50, explanation: '12,5 × 4 = 50.' },
        { id: 'a2', type: 'number', prompt: '20 % de 150 = ?', answer: 30, explanation: '150 × 20 ÷ 100 = 30.' },
        { id: 'a3', type: 'number', prompt: '7,2 ÷ 3 = ?', answer: 2.4, explanation: '7,2 ÷ 3 = 2,4.' },
      ] },
      { title: 'Exercice 2 — Proportionnalité', questions: [
        { id: 'b1', type: 'number', prompt: '3 kg de tomates coûtent 18 DH. Combien coûtent 5 kg ?', answer: 30, unit: 'DH', points: 2, explanation: '1 kg = 6 DH ; 5 × 6 = 30 DH.' },
        { id: 'b2', type: 'number', prompt: 'Sur une carte à l’échelle 1/100 000, 3 cm représentent combien de km ?', answer: 3, unit: 'km', points: 2, explanation: '3 × 100 000 cm = 300 000 cm = 3 km.' },
      ] },
      { title: 'Exercice 3 — Géométrie', questions: [
        { id: 'c1', type: 'number', prompt: 'Aire (cm²) d’un rectangle de 8 cm sur 5 cm ?', answer: 40, unit: 'cm²', explanation: '8 × 5 = 40 cm².' },
        { id: 'c2', type: 'number', prompt: 'Périmètre (cm) d’un carré de 7 cm de côté ?', answer: 28, unit: 'cm', explanation: '4 × 7 = 28 cm.' },
        { id: 'c3', type: 'open', prompt: 'Une voiture roule à 60 km/h pendant 2 h 30 min. Quelle distance parcourt-elle ? Explique ton calcul.', modelAnswer: '2 h 30 min = 2,5 h ; distance = 60 × 2,5 = 150 km.', points: 3, explanation: 'Vérifier la conversion de la durée et le calcul.' },
      ] },
    ],
  },
  {
    id: 'EX-1AC-math', levelId: '1AC', subjectId: 'math', title: 'Contrôle — nombres relatifs', lang: 'fr', durationMin: 55, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Exercice 1 — Calculs (8 pts)', questions: [
        { id: 'a1', type: 'number', prompt: '(−7) + (+3) = ?', answer: -4, points: 2, explanation: '7 − 3 = 4, signe de −7 : −4.' },
        { id: 'a2', type: 'number', prompt: '(−5) − (+6) = ?', answer: -11, points: 2, explanation: '−5 + (−6) = −11.' },
        { id: 'a3', type: 'number', prompt: '(+2) − (−9) = ?', answer: 11, points: 2, explanation: '2 + 9 = 11.' },
        { id: 'a4', type: 'number', prompt: '(−3,5) + (−1,5) = ?', answer: -5, points: 2, explanation: '−(3,5 + 1,5) = −5.' },
      ] },
      { title: 'Exercice 2 — Comparer et problème (12 pts)', questions: [
        { id: 'b1', type: 'qcm', prompt: 'Range dans l’ordre croissant : −2 ; 4 ; −9 ; 0', choices: ['−9 < −2 < 0 < 4', '−2 < −9 < 0 < 4', '0 < −2 < −9 < 4'], answer: 0, points: 4, explanation: 'Le plus à gauche est −9.' },
        { id: 'b2', type: 'number', prompt: 'Un plongeur est à −18 m. Il remonte de 7 m. À quelle profondeur est-il ?', answer: -11, unit: 'm', points: 4, explanation: '−18 + 7 = −11 m.' },
        { id: 'b3', type: 'open', prompt: 'Explique avec tes mots pourquoi −3 est plus grand que −10.', modelAnswer: '−3 est plus proche de zéro que −10 ; sur la droite graduée, −3 est à droite de −10, donc il est plus grand.', points: 4, explanation: 'Vérifier l’idée de position sur la droite ou de distance à zéro pour les négatifs.' },
      ] },
    ],
  },
  {
    id: 'EX-2AC-math', levelId: '2AC', subjectId: 'math', title: 'Contrôle — Pythagore', lang: 'fr', durationMin: 55, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Exercice 1 (10 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'ABC rectangle en B ; AB = 5, BC = 12. Calcule AC.', answer: 13, points: 4, explanation: 'AC² = 25 + 144 = 169 ; AC = 13.' },
        { id: 'a2', type: 'number', prompt: 'MNP rectangle en M ; NP = 10, MN = 6. Calcule MP.', answer: 8, points: 3, explanation: 'MP² = 100 − 36 = 64 ; MP = 8.' },
        { id: 'a3', type: 'tf', prompt: 'Un triangle de côtés 6, 9 et 11 est rectangle.', answer: false, points: 3, explanation: '11² = 121 ; 6² + 9² = 117 ≠ 121 : non rectangle.' },
      ] },
      { title: 'Exercice 2 — Problème (10 pts)', questions: [
        { id: 'b1', type: 'number', prompt: 'Un écran a une largeur de 80 cm et une hauteur de 60 cm. Longueur de sa diagonale (cm) ?', answer: 100, unit: 'cm', points: 5, explanation: 'd² = 6400 + 3600 = 10 000 ; d = 100 cm.' },
        { id: 'b2', type: 'open', prompt: 'Démontre qu’un triangle de côtés 8 cm, 15 cm et 17 cm est rectangle et précise en quel sommet (côtés AB = 8, AC = 15, BC = 17).', modelAnswer: 'BC² = 289 et AB² + AC² = 64 + 225 = 289. D’après la réciproque du théorème de Pythagore, ABC est rectangle en A.', points: 5, explanation: 'Vérifier : calcul séparé des deux membres, citation de la réciproque, sommet A.' },
      ] },
    ],
  },
  {
    id: 'EX-3AC-math', levelId: '3AC', subjectId: 'math', title: 'Examen régional blanc — Mathématiques', lang: 'fr', durationMin: 120, kind: 'examen-blanc', instructions: CALME + ' Format proche de l’examen régional : organise ton temps, exercice par exercice.',
    sections: [
      { title: 'Exercice 1 — Équations (6 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'Résous : 3x − 7 = 11. x = ?', answer: 6, points: 2, explanation: '3x = 18, x = 6.' },
        { id: 'a2', type: 'number', prompt: 'Résous : 2(x + 4) = 5x − 1. x = ?', answer: 3, points: 2, explanation: '2x + 8 = 5x − 1 → 9 = 3x → x = 3.' },
        { id: 'a3', type: 'number', prompt: 'Le prix d’un cahier augmenté de 4 DH, multiplié par 3, donne 27 DH. Prix du cahier ?', answer: 5, unit: 'DH', points: 2, explanation: '3(x + 4) = 27 → x + 4 = 9 → x = 5.' },
      ] },
      { title: 'Exercice 2 — Thalès (6 pts)', questions: [
        { id: 'b1', type: 'number', prompt: '(EF) // (BC) ; AE = 4, AB = 10, BC = 15. Calcule EF.', answer: 6, points: 3, explanation: 'EF = 15 × 4 / 10 = 6.' },
        { id: 'b2', type: 'tf', prompt: 'AM = 2, AB = 5, AN = 3, AC = 7,5 (même ordre). (MN) // (BC) ?', answer: true, points: 3, explanation: '2/5 = 0,4 et 3/7,5 = 0,4 : rapports égaux.' },
      ] },
      { title: 'Exercice 3 — Problème (8 pts)', questions: [
        { id: 'c1', type: 'open', prompt: 'Une salle de sport propose : tarif A, 50 DH par mois + 10 DH par séance ; tarif B, 20 DH par séance sans abonnement. À partir de combien de séances le tarif A est-il plus avantageux ? Justifie par une inéquation.', modelAnswer: '50 + 10x < 20x ⇔ 50 < 10x ⇔ x > 5. Le tarif A est plus avantageux à partir de 6 séances par mois (égalité à 5 séances).', points: 8, explanation: 'Vérifier : mise en inéquation, résolution, interprétation (6 séances, égalité à 5).' },
      ] },
    ],
  },
  {
    id: 'EX-3AC-francais', levelId: '3AC', subjectId: 'francais', title: 'Examen régional blanc — Français', lang: 'fr', durationMin: 120, kind: 'examen-blanc', instructions: CALME,
    sections: [
      { title: 'Texte', questions: [
        { id: 't0', type: 'open', prompt: 'Lis ce texte : « Beaucoup pensent que les écrans éloignent les jeunes de la lecture. Pourtant, une tablette peut contenir des centaines de livres. De plus, les applications de lecture proposent des dictionnaires intégrés qui aident à comprendre les mots difficiles. Cependant, l’écran fatigue les yeux s’il est utilisé trop longtemps. C’est pourquoi il faut trouver un équilibre. » — Quelle est la thèse défendue dans ce texte ? Justifie.', modelAnswer: 'La thèse : les écrans peuvent aider à la lecture si on les utilise avec équilibre. Justification : « une tablette peut contenir des centaines de livres », « il faut trouver un équilibre ».', points: 4, explanation: 'Vérifier : thèse nuancée identifiée, citation à l’appui.' },
      ] },
      { title: 'Langue', questions: [
        { id: 'l1', type: 'qcm', prompt: 'Dans le texte, « Pourtant » exprime…', choices: ['l’opposition', 'la cause', 'l’ajout'], answer: 0, points: 2, explanation: 'Connecteur d’opposition.' },
        { id: 'l2', type: 'qcm', prompt: '« C’est pourquoi » exprime…', choices: ['la conséquence', 'la cause', 'le temps'], answer: 0, points: 2, explanation: 'Connecteur de conséquence.' },
        { id: 'l3', type: 'qcm', prompt: '« De plus » exprime…', choices: ['l’ajout', 'l’opposition', 'la conclusion'], answer: 0, points: 2, explanation: 'Connecteur d’ajout.' },
      ] },
      { title: 'Production écrite (10 pts)', questions: [
        { id: 'p1', type: 'open', prompt: 'Faut-il interdire les téléphones portables au collège ? Donne ton avis en une quinzaine de lignes, avec deux arguments et des exemples.', modelAnswer: 'Attendus : introduction avec la question, prise de position claire, deux arguments illustrés d’exemples, connecteurs logiques, conclusion. Orthographe et ponctuation soignées.', points: 10, explanation: 'Grille indicative : idées (4), organisation (3), langue (3).' },
      ] },
    ],
  },
  {
    id: 'EX-TC-math', levelId: 'TC', subjectId: 'math', title: 'Contrôle — second degré', lang: 'fr', durationMin: 60, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Exercice 1 (10 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'Discriminant de x² + 4x − 5 = 0 ?', answer: 36, points: 3, explanation: 'Δ = 16 + 20 = 36.' },
        { id: 'a2', type: 'qcm', prompt: 'Solutions de x² + 4x − 5 = 0 :', choices: ['1 et −5', '−1 et 5', '2 et −3'], answer: 0, points: 4, explanation: 'x = (−4 ± 6)/2 : 1 et −5.' },
        { id: 'a3', type: 'number', prompt: 'Somme des racines de 2x² − 8x + 3 = 0 ?', answer: 4, points: 3, explanation: '−b/a = 8/2 = 4.' },
      ] },
      { title: 'Exercice 2 (10 pts)', questions: [
        { id: 'b1', type: 'open', prompt: 'Résous dans ℝ l’inéquation x² − 3x − 4 ≤ 0.', modelAnswer: 'Δ = 9 + 16 = 25 ; racines −1 et 4. Le trinôme (a = 1 > 0) est négatif entre ses racines : S = [−1 ; 4].', points: 10, explanation: 'Vérifier : racines, signe du trinôme (signe de a à l’extérieur), intervalle fermé.' },
      ] },
    ],
  },
  {
    id: 'EX-1BAC-math', levelId: '1BAC', subjectId: 'math', title: 'Contrôle — suites numériques', lang: 'fr', durationMin: 120, kind: 'controle', instructions: CALME,
    sections: [
      { title: 'Exercice 1 (8 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'Suite arithmétique : u(3) = 11, u(7) = 23. Raison r ?', answer: 3, points: 3, explanation: 'u(7) − u(3) = 4r = 12, r = 3.' },
        { id: 'a2', type: 'number', prompt: 'Avec cette suite, u(0) = ?', answer: 2, points: 2, explanation: 'u(0) = u(3) − 3r = 11 − 9 = 2.' },
        { id: 'a3', type: 'number', prompt: 'Somme u(0) + u(1) + … + u(9) ?', answer: 155, points: 3, explanation: 'u(9) = 2 + 27 = 29 ; 10 × (2 + 29)/2 = 155.' },
      ] },
      { title: 'Exercice 2 (12 pts)', questions: [
        { id: 'b1', type: 'open', prompt: 'On place 10 000 DH à 5 % d’intérêts composés par an. Soit C(n) le capital après n années. Montre que (C(n)) est géométrique, exprime C(n) et calcule C(3).', modelAnswer: 'C(n+1) = C(n) × 1,05 : géométrique de raison 1,05 et de premier terme C(0) = 10 000. C(n) = 10 000 × 1,05ⁿ. C(3) = 10 000 × 1,157625 = 11 576,25 DH.', points: 12, explanation: 'Vérifier : relation de récurrence, raison, formule, calcul exact.' },
      ] },
    ],
  },
  {
    id: 'EX-1BAC-francais', levelId: '1BAC', subjectId: 'francais', title: 'Examen régional blanc — Français', lang: 'fr', durationMin: 120, kind: 'examen-blanc', instructions: CALME + ' Vérifie avec ton professeur les œuvres au programme de ton année.',
    sections: [
      { title: 'Compréhension (10 pts)', questions: [
        { id: 'a1', type: 'qcm', prompt: 'Une tragédie se caractérise par…', choices: ['une fin heureuse', 'un héros face à un destin inévitable', 'des personnages comiques'], answer: 1, points: 2, explanation: 'La fatalité est au cœur de la tragédie.' },
        { id: 'a2', type: 'qcm', prompt: '« Je meurs de faim » (sans danger réel) est…', choices: ['une hyperbole', 'une litote', 'un euphémisme'], answer: 0, points: 2, explanation: 'Exagération : hyperbole.' },
        { id: 'a3', type: 'qcm', prompt: 'Un monologue est…', choices: ['un dialogue entre deux personnages', 'un personnage seul qui parle', 'une indication de mise en scène'], answer: 1, points: 2, explanation: 'Personnage seul en scène qui s’exprime.' },
        { id: 'a4', type: 'open', prompt: 'Pourquoi un auteur choisit-il parfois de raconter à la première personne ? Donne deux effets.', modelAnswer: 'La première personne rapproche le lecteur du narrateur (identification, accès aux émotions) et donne une impression de sincérité ou de témoignage.', points: 4, explanation: 'Accepter deux effets pertinents justifiés.' },
      ] },
      { title: 'Production écrite (10 pts)', questions: [
        { id: 'b1', type: 'open', prompt: 'Selon vous, la littérature peut-elle changer la société ? Développez votre point de vue dans un texte argumentatif structuré.', modelAnswer: 'Attendus : introduction (amener, poser, annoncer), deux ou trois arguments illustrés d’exemples littéraires, connecteurs, conclusion avec ouverture.', points: 10, explanation: 'Grille indicative : pertinence (4), organisation (3), langue (3).' },
      ] },
    ],
  },
  {
    id: 'EX-2BAC-math', levelId: '2BAC', subjectId: 'math', title: 'Examen national blanc — Mathématiques (extrait)', lang: 'fr', durationMin: 180, kind: 'examen-blanc', instructions: CALME + ' Ceci est un extrait d’entraînement : un sujet national complet comporte plusieurs problèmes.',
    sections: [
      { title: 'Exercice 1 — Exponentielle (8 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'Résous e^(2x) = e^(x + 3). x = ?', answer: 3, points: 2, explanation: '2x = x + 3, x = 3.' },
        { id: 'a2', type: 'qcm', prompt: 'lim (x→+∞) x·e^(−x) = ?', choices: ['0', '+∞', '1'], answer: 0, points: 2, explanation: 'x·e^(−x) = x/eˣ → 0 (croissances comparées).' },
        { id: 'a3', type: 'qcm', prompt: 'Dérivée de f(x) = e^(x²) :', choices: ['e^(x²)', '2x·e^(x²)', 'x²·e^(x² − 1)'], answer: 1, points: 2, explanation: '(eᵘ)′ = u′eᵘ avec u = x².' },
        { id: 'a4', type: 'number', prompt: 'Valeur de ln(e³) ?', answer: 3, points: 2, explanation: 'ln(e³) = 3.' },
      ] },
      { title: 'Problème — étude de fonction (12 pts)', questions: [
        { id: 'b1', type: 'open', prompt: 'Soit f(x) = x − 1 + e^(−x) sur ℝ. 1) Calcule f′(x). 2) Étudie le signe de f′ et dresse le tableau de variations. 3) Montre que la droite y = x − 1 est asymptote à la courbe en +∞.', modelAnswer: '1) f′(x) = 1 − e^(−x). 2) f′(x) ≥ 0 ⇔ e^(−x) ≤ 1 ⇔ x ≥ 0 : f décroissante sur ]−∞ ; 0], croissante sur [0 ; +∞[, minimum f(0) = 0. 3) f(x) − (x − 1) = e^(−x) → 0 quand x → +∞ : y = x − 1 est asymptote oblique en +∞.', points: 12, explanation: 'Barème indicatif : dérivée (3), signe et variations (5), asymptote (4).' },
      ] },
    ],
  },
  {
    id: 'EX-2BAC-pc', levelId: '2BAC', subjectId: 'pc', title: 'Examen national blanc — Physique (radioactivité)', lang: 'fr', durationMin: 60, kind: 'examen-blanc', instructions: CALME,
    sections: [
      { title: 'Radioactivité (20 pts)', questions: [
        { id: 'a1', type: 'number', prompt: 'L’iode 131 a une demi-vie de 8 jours. Quelle fraction (en %) reste-t-il après 24 jours ?', answer: 12.5, unit: '%', points: 5, explanation: '24 jours = 3 demi-vies : 1/8 = 12,5 %.' },
        { id: 'a2', type: 'number', prompt: 'λ (en jour⁻¹, arrondi au millième) pour t½ = 8 jours ?', answer: 0.087, tolerance: 0.001, points: 5, explanation: 'λ = ln 2 / 8 ≈ 0,0866 ≈ 0,087 j⁻¹.' },
        { id: 'a3', type: 'open', prompt: 'Un patient reçoit une dose d’activité a₀. Au bout de combien de jours l’activité sera-t-elle inférieure à 1 % de a₀ ? (t½ = 8 jours)', modelAnswer: 'a = a₀e^(−λt) < 0,01a₀ ⇔ t > ln(100)/λ = 8 × ln(100)/ln 2 ≈ 53,2 jours. Donc à partir d’environ 54 jours.', points: 10, explanation: 'Vérifier : inéquation, passage au logarithme, valeur numérique et conclusion.' },
      ] },
    ],
  },
];
