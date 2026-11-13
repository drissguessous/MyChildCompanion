import type { Chapter } from '../types';

export const GEN_O_4AP_HG_1: Chapter[] = [
  {
    "id": "4AP-hg-o1",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "L'histoire de mon école",
    "lang": "fr",
    "objectives": [
      "Comprendre que mon école a une histoire",
      "Trouver des sources pour la raconter"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "L'histoire de mon école — تاريخ مدرستي"
      },
      {
        "type": "p",
        "text": "Mon école n'a pas toujours existé : elle a été construite à une certaine date, elle a eu des directeurs, des enseignants et des élèves avant moi. Raconter son passé, c'est faire un petit travail d'historien."
      },
      {
        "type": "rule",
        "text": "Pour connaître l'histoire de mon école, j'utilise des sources : les témoignages (anciens élèves, enseignants), les documents écrits (registres, plaque, archives) et les photos anciennes."
      },
      {
        "type": "example",
        "text": "Salma interroge le directeur : l'école a ouvert il y a 40 ans avec 4 classes. Aujourd'hui elle en compte 12. Salma compare une photo ancienne et une photo récente : la cour a été agrandie et une bibliothèque a été ajoutée."
      },
      {
        "type": "list",
        "items": [
          "Date de création de l'école",
          "Nom de l'école et sa signification",
          "Changements : nouvelles salles, nombre d'élèves",
          "Personnes qui y ont travaillé"
        ]
      },
      {
        "type": "tip",
        "text": "Pose tes questions poliment et note les réponses : tu deviens l'historien de ton école !"
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Qui peut témoigner de l'histoire de l'école ?",
        "choices": [
          "Un ancien élève",
          "Un dessin animé",
          "Une publicité"
        ],
        "answer": 0,
        "explanation": "Un ancien élève a vécu l'école autrefois : son témoignage est une source.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : une photo ancienne de l'école est une source historique.",
        "answer": true,
        "explanation": "Vrai : elle montre comment était l'école dans le passé.",
        "id": "q2"
      },
      {
        "type": "number",
        "prompt": "L'école a ouvert avec 4 classes et en a aujourd'hui 12. Combien de classes ont été ajoutées ?",
        "answer": 8,
        "explanation": "12 − 4 = 8 classes ajoutées.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Quel document écrit garde la liste des élèves inscrits ?",
        "choices": [
          "Une affiche",
          "Le registre",
          "Un ticket"
        ],
        "answer": 1,
        "explanation": "Le registre de l'école note les inscriptions.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Écris deux questions que tu poserais à un ancien élève de ton école.",
        "modelAnswer": "Quand étais-tu élève ici ? Comment était la cour à ton époque ?",
        "explanation": "Toute question sur le passé de l'école (date, lieux, enseignants, vie quotidienne) est acceptable.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o2",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Comment mesurer le temps",
    "lang": "fr",
    "objectives": [
      "Connaître les unités de mesure du temps",
      "Ordonner des événements"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Comment mesurer le temps — كيف نحسب الزمن"
      },
      {
        "type": "p",
        "text": "Pour situer les événements, on mesure le temps avec des unités qui vont de la plus petite à la plus grande."
      },
      {
        "type": "rule",
        "text": "1 semaine = 7 jours ; 1 mois ≈ 30 jours ; 1 an = 12 mois (365 jours, ou 366 lors d'une année bissextile) ; 1 siècle = 100 ans."
      },
      {
        "type": "list",
        "items": [
          "Le calendrier grégorien compte les années à partir de la naissance de Jésus (Aïssa).",
          "Le calendrier hégirien compte à partir de l'Hégire du Prophète vers Médine (622 de l'ère chrétienne) ; il suit la lune.",
          "Au Maroc, on utilise les deux calendriers."
        ]
      },
      {
        "type": "example",
        "text": "Youssef est né en 2016. En 2026, il a 2026 − 2016 = 10 ans. Sur une frise, sa naissance est placée avant son entrée à l'école."
      },
      {
        "type": "tip",
        "text": "Pour calculer une durée, fais une soustraction : année la plus récente moins année la plus ancienne."
      }
    ],
    "exercises": [
      {
        "type": "number",
        "prompt": "Combien de mois compte une année ?",
        "answer": 12,
        "explanation": "Une année compte 12 mois.",
        "id": "q1"
      },
      {
        "type": "number",
        "prompt": "Combien d'années compte un siècle ?",
        "answer": 100,
        "explanation": "Un siècle = 100 ans.",
        "unit": "ans",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Le calendrier hégirien commence par…",
        "choices": [
          "la naissance de Jésus",
          "l'Hégire du Prophète",
          "la construction d'une mosquée"
        ],
        "answer": 1,
        "explanation": "Il commence en 622, année de l'Hégire vers Médine.",
        "id": "q3"
      },
      {
        "type": "number",
        "prompt": "Amine est né en 2017. Quel âge a-t-il en 2026 ?",
        "answer": 9,
        "explanation": "2026 − 2017 = 9 ans.",
        "unit": "ans",
        "id": "q4"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : une semaine compte 10 jours.",
        "answer": false,
        "explanation": "Faux : une semaine compte 7 jours.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o3",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Le souk d'hier à aujourd'hui",
    "lang": "fr",
    "objectives": [
      "Décrire le souk traditionnel",
      "Comparer le commerce d'hier et d'aujourd'hui"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Le souk d'hier à aujourd'hui — السوق بين الأمس واليوم"
      },
      {
        "type": "p",
        "text": "Depuis très longtemps, le souk est un lieu d'échange au Maroc. Dans les campagnes, il se tient souvent un jour fixe de la semaine, qui donne parfois son nom au lieu : Souk El Had (dimanche), Souk Tlet (mardi), Souk El Arbaa (mercredi)…"
      },
      {
        "type": "rule",
        "text": "Hier, au souk, on échangeait parfois des produits contre d'autres (le troc) et on transportait les marchandises à dos d'âne ou de mulet. Aujourd'hui, on paie en dirhams, en espèces ou par carte, et on trouve aussi des supermarchés et le commerce en ligne."
      },
      {
        "type": "list",
        "items": [
          "Ce qui reste : on y achète légumes, épices, bétail, artisanat",
          "Ce qui change : camions, balances électroniques, paiement par carte",
          "Le souk reste un lieu de rencontre"
        ]
      },
      {
        "type": "example",
        "text": "Le grand-père de Hamza allait au souk hebdomadaire à dos de mulet. Hamza y va en voiture avec son père, mais ils y achètent toujours des olives et des épices."
      },
      {
        "type": "tip",
        "text": "Demande à tes grands-parents comment était le souk de leur enfance : c'est un témoignage précieux."
      }
    ],
    "exercises": [
      {
        "type": "text",
        "prompt": "Comment appelle-t-on l'échange d'un produit contre un autre, sans monnaie ?",
        "accept": [
          "le troc",
          "troc"
        ],
        "explanation": "C'est le troc.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Souk El Had se tient le…",
        "choices": [
          "lundi",
          "vendredi",
          "dimanche"
        ],
        "answer": 2,
        "explanation": "« Had » signifie dimanche (premier jour).",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : aujourd'hui, on peut aussi faire ses achats en ligne.",
        "answer": true,
        "explanation": "Vrai : le commerce en ligne s'est développé.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Autrefois, comment transportait-on souvent les marchandises au souk ?",
        "choices": [
          "À dos d'âne ou de mulet",
          "En avion",
          "En train à grande vitesse"
        ],
        "answer": 0,
        "explanation": "Les animaux de bât étaient le moyen le plus courant.",
        "id": "q4"
      },
      {
        "type": "text",
        "prompt": "Quelle est la monnaie du Maroc ?",
        "accept": [
          "le dirham",
          "dirham",
          "dirhams",
          "les dirhams"
        ],
        "explanation": "La monnaie du Maroc est le dirham.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o4",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Les monuments de mon quartier",
    "lang": "fr",
    "objectives": [
      "Observer et nommer les monuments du quartier",
      "Comprendre qu'ils témoignent du passé"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Les monuments de mon quartier — ألاحظ معالم الحي الذي أسكنه"
      },
      {
        "type": "p",
        "text": "Un monument (ou repère, معلمة) est une construction importante d'un lieu : mosquée, fontaine, porte, ancienne école, souk couvert, rempart."
      },
      {
        "type": "rule",
        "text": "Les monuments sont des traces du passé : ils nous aident à connaître l'histoire du quartier. Nous devons les respecter et les protéger."
      },
      {
        "type": "list",
        "items": [
          "Je l'observe : sa forme, ses matériaux, ses décorations",
          "Je cherche sa fonction : prier, boire, entrer dans la ville…",
          "Je cherche son âge : récent ou ancien"
        ]
      },
      {
        "type": "example",
        "text": "Dans l'ancienne médina de Fès, Ali observe une fontaine décorée de zellige. Son voisin lui explique que les habitants venaient y chercher de l'eau avant l'arrivée de l'eau courante."
      },
      {
        "type": "tip",
        "text": "Promène-toi avec un adulte et dessine un monument de ton quartier : observer est le premier pas."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Lequel est un monument ?",
        "choices": [
          "Une fontaine ancienne",
          "Un sac d'école",
          "Un cahier"
        ],
        "answer": 0,
        "explanation": "Une fontaine ancienne est une construction qui témoigne du passé.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on peut écrire sur les murs d'un monument.",
        "answer": false,
        "explanation": "Faux : il faut respecter et protéger les monuments.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "À quoi servait une fontaine publique autrefois ?",
        "choices": [
          "À garer les voitures",
          "À chercher de l'eau",
          "À vendre des tissus"
        ],
        "answer": 1,
        "explanation": "Les habitants y prenaient de l'eau.",
        "id": "q3"
      },
      {
        "type": "text",
        "prompt": "Comment appelle-t-on la partie ancienne d'une ville marocaine, entourée de remparts ?",
        "accept": [
          "la medina",
          "medina",
          "l'ancienne medina",
          "ancienne medina"
        ],
        "explanation": "C'est la médina.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Que nous apprennent les monuments ?",
        "choices": [
          "L'histoire du quartier",
          "La météo de demain",
          "Les règles du football"
        ],
        "answer": 0,
        "explanation": "Ils sont des traces du passé.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o5",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Les repères de mon village",
    "lang": "fr",
    "objectives": [
      "Identifier les repères d'un village",
      "Rechercher leur histoire"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Les repères de mon village — أبحث عن معالم قريتي"
      },
      {
        "type": "p",
        "text": "Un village a aussi ses repères : la mosquée, le grenier collectif (agadir), la kasbah ou le ksar, la source, le puits, le souk hebdomadaire, l'école."
      },
      {
        "type": "rule",
        "text": "Pour découvrir les repères de mon village, j'observe, je questionne les anciens et je note ce que j'apprends."
      },
      {
        "type": "example",
        "text": "Dans un village de l'Anti-Atlas, Fatima découvre un agadir : un grenier collectif où les familles gardaient autrefois leurs récoltes et leurs biens dans des cases."
      },
      {
        "type": "list",
        "items": [
          "Mosquée : lieu de prière",
          "Agadir : grenier collectif",
          "Kasbah ou ksar : habitat fortifié en terre",
          "Source ou puits : point d'eau"
        ]
      },
      {
        "type": "tip",
        "text": "Les anciens du village connaissent beaucoup d'histoires : écoute-les avec attention."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Un agadir (dans le Sud) est…",
        "choices": [
          "un grenier collectif",
          "un marché couvert",
          "un stade"
        ],
        "answer": 0,
        "explanation": "L'agadir est un grenier collectif fortifié.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Qui peut le mieux raconter l'histoire du village ?",
        "choices": [
          "Les anciens du village",
          "Un touriste de passage",
          "Personne"
        ],
        "answer": 0,
        "explanation": "Les anciens ont vécu le passé du village.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : un puits est un point d'eau.",
        "answer": true,
        "explanation": "Vrai : on y puise l'eau.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Une kasbah est souvent construite en…",
        "choices": [
          "verre",
          "terre",
          "plastique"
        ],
        "answer": 1,
        "explanation": "Les kasbahs traditionnelles sont bâties en terre (pisé).",
        "id": "q4"
      },
      {
        "type": "text",
        "prompt": "Quel lieu de prière trouve-t-on dans presque chaque village marocain ?",
        "accept": [
          "la mosquee",
          "mosquee",
          "une mosquee"
        ],
        "explanation": "La mosquée.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o6",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "La démarche de l'historien",
    "lang": "fr",
    "objectives": [
      "Connaître les étapes du travail de l'historien",
      "Distinguer les types de sources"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "La démarche de l'historien — كيف نسمي ما قمنا به خلال هذه السنة؟ خطوات المؤرخ"
      },
      {
        "type": "p",
        "text": "Cette année, nous avons étudié l'école, le souk, le quartier et le village. Sans le savoir, nous avons travaillé comme des historiens !"
      },
      {
        "type": "rule",
        "text": "Les étapes de l'historien : 1) poser une question sur le passé ; 2) chercher des sources ; 3) les observer et les comparer ; 4) écrire et raconter ce qu'il a compris."
      },
      {
        "type": "list",
        "items": [
          "Sources écrites : livres, registres, lettres",
          "Sources orales : témoignages",
          "Sources matérielles : monuments, objets, outils",
          "Sources iconographiques : photos, dessins"
        ]
      },
      {
        "type": "example",
        "text": "Pour savoir comment était le souk autrefois, Nada interroge sa grand-mère (source orale), regarde une photo ancienne (source iconographique) puis écrit un petit texte."
      },
      {
        "type": "tip",
        "text": "Un bon historien vérifie en comparant plusieurs sources : sois curieux et patient."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Quelle est la première étape de l'historien ?",
        "choices": [
          "Écrire la conclusion",
          "Poser une question sur le passé",
          "Dessiner une carte"
        ],
        "answer": 1,
        "explanation": "On commence toujours par une question.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Le témoignage d'un grand-père est une source…",
        "choices": [
          "écrite",
          "matérielle",
          "orale"
        ],
        "answer": 2,
        "explanation": "C'est une source orale : elle est racontée.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : un vieil outil agricole est une source matérielle.",
        "answer": true,
        "explanation": "Vrai : c'est un objet du passé.",
        "id": "q3"
      },
      {
        "type": "text",
        "prompt": "Comment appelle-t-on la personne qui étudie le passé ?",
        "accept": [
          "l'historien",
          "historien",
          "un historien",
          "l'historienne",
          "historienne"
        ],
        "explanation": "C'est l'historien (ou l'historienne).",
        "id": "q4"
      },
      {
        "type": "number",
        "prompt": "Combien d'étapes compte la démarche de l'historien dans ce cours ?",
        "answer": 4,
        "explanation": "Question, sources, observation/comparaison, écriture : 4 étapes.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o7",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Qu'est-ce que la géographie ?",
    "lang": "fr",
    "objectives": [
      "Définir la géographie",
      "Comprendre son utilité au quotidien"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Qu'est-ce que la géographie ? — التعريف الأولي بالجغرافيا وبفائدتها اليومية"
      },
      {
        "type": "rule",
        "text": "La géographie est la science qui étudie la Terre, ses paysages et la façon dont les hommes y vivent et l'aménagent."
      },
      {
        "type": "p",
        "text": "Le géographe se demande : où se trouve ce lieu ? Comment est-il ? Pourquoi les gens y vivent ainsi ?"
      },
      {
        "type": "list",
        "items": [
          "Lire un plan pour trouver une rue",
          "Suivre la météo avant de sortir",
          "Choisir un itinéraire pour un voyage",
          "Savoir où se trouvent montagnes, plaines et villes"
        ]
      },
      {
        "type": "example",
        "text": "Avant d'aller de Rabat à Marrakech, la famille de Karim consulte une carte routière pour choisir l'autoroute : c'est utiliser la géographie."
      },
      {
        "type": "tip",
        "text": "Chaque fois que tu demandes « où ? », tu fais déjà de la géographie !"
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "La géographie étudie surtout…",
        "choices": [
          "la Terre et la vie des hommes sur elle",
          "les nombres",
          "les animaux préhistoriques seulement"
        ],
        "answer": 0,
        "explanation": "C'est la définition de la géographie.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : lire un plan de ville est une activité utile en géographie.",
        "answer": true,
        "explanation": "Vrai : le plan aide à se repérer.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Quelle question pose souvent le géographe ?",
        "choices": [
          "Où ?",
          "Combien coûte ?",
          "Qui a gagné ?"
        ],
        "answer": 0,
        "explanation": "« Où ? » est la question centrale.",
        "id": "q3"
      },
      {
        "type": "text",
        "prompt": "Quel document représente une région ou un pays vu d'en haut, en réduit ?",
        "accept": [
          "la carte",
          "carte",
          "une carte"
        ],
        "explanation": "C'est la carte.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Donne un exemple de l'utilité de la géographie dans ta vie.",
        "modelAnswer": "Je regarde la météo pour savoir si je dois prendre un parapluie.",
        "explanation": "Toute situation de repérage, de déplacement ou de connaissance des lieux convient.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o8",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Le petit géographe",
    "lang": "fr",
    "objectives": [
      "Connaître les outils du géographe",
      "Appliquer ses étapes de travail"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Le petit géographe — الجغرافي الصغير - كيف يشتغل الجغرافي؟"
      },
      {
        "type": "p",
        "text": "Comme l'historien, le géographe a une méthode et des outils."
      },
      {
        "type": "rule",
        "text": "Le géographe observe (sur le terrain ou sur des documents), localise, décrit, puis représente et explique."
      },
      {
        "type": "list",
        "items": [
          "La boussole : trouver les points cardinaux",
          "La carte et le plan",
          "Le globe terrestre",
          "Les photographies et les images satellites"
        ]
      },
      {
        "type": "rule",
        "text": "Les 4 points cardinaux : Nord, Sud, Est, Ouest. Le soleil se lève à l'Est et se couche à l'Ouest."
      },
      {
        "type": "example",
        "text": "Sur la carte du Maroc, Tanger est au Nord et Laâyoune au Sud ; l'océan Atlantique est à l'Ouest."
      },
      {
        "type": "tip",
        "text": "Le matin, regarde où se lève le soleil : tu as trouvé l'Est !"
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Quel outil indique le Nord ?",
        "choices": [
          "La boussole",
          "La règle",
          "La calculatrice"
        ],
        "answer": 0,
        "explanation": "L'aiguille de la boussole indique le Nord.",
        "id": "q1"
      },
      {
        "type": "number",
        "prompt": "Combien y a-t-il de points cardinaux principaux ?",
        "answer": 4,
        "explanation": "Nord, Sud, Est, Ouest.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Le soleil se lève…",
        "choices": [
          "au Nord",
          "à l'Ouest",
          "à l'Est"
        ],
        "answer": 2,
        "explanation": "Il se lève à l'Est.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : l'océan Atlantique est à l'Ouest du Maroc.",
        "answer": true,
        "explanation": "Vrai : il borde la côte ouest.",
        "id": "q4"
      },
      {
        "type": "text",
        "prompt": "Quelle sphère représente la Terre en modèle réduit ?",
        "accept": [
          "le globe",
          "globe",
          "le globe terrestre",
          "globe terrestre",
          "un globe"
        ],
        "explanation": "C'est le globe terrestre.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o9",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Sur le chemin de l'école : dessiner et légender",
    "lang": "fr",
    "objectives": [
      "Représenter un trajet par un croquis",
      "Construire une légende"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Sur le chemin de l'école : dessiner et légender — في الطريق إلى المدرسة - أكتشف محيطي وأرسمه وأضع مفتاحا لرسمي"
      },
      {
        "type": "p",
        "text": "Sur le chemin de l'école, je passe devant des maisons, une boulangerie, une mosquée, un jardin, je traverse des rues."
      },
      {
        "type": "rule",
        "text": "Un croquis est un dessin simplifié vu d'en haut. Sa légende (مفتاح) explique chaque symbole ou couleur utilisée."
      },
      {
        "type": "list",
        "items": [
          "Je trace les rues par des traits",
          "Je représente les lieux par des symboles simples",
          "J'ajoute un titre et une flèche du Nord",
          "Je fais la légende : chaque symbole avec son sens"
        ]
      },
      {
        "type": "example",
        "text": "Sur le croquis de Rania : un carré rouge = sa maison, un carré bleu = l'école, une croix verte = la pharmacie, un trait gris = la rue."
      },
      {
        "type": "tip",
        "text": "Choisis des symboles faciles à reconnaître : ton croquis sera clair pour tous."
      }
    ],
    "exercises": [
      {
        "type": "text",
        "prompt": "Comment appelle-t-on le cadre qui explique les symboles d'un croquis ?",
        "accept": [
          "la legende",
          "legende",
          "une legende"
        ],
        "explanation": "C'est la légende.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Un croquis représente le lieu vu…",
        "choices": [
          "d'en haut",
          "de dessous",
          "de très loin dans l'espace seulement"
        ],
        "answer": 0,
        "explanation": "On dessine comme un oiseau qui regarde d'en haut.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : un croquis sans légende est facile à comprendre pour tous.",
        "answer": false,
        "explanation": "Faux : la légende est nécessaire pour comprendre les symboles.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Que met-on en plus pour s'orienter sur un croquis ?",
        "choices": [
          "Une flèche du Nord",
          "Une chanson",
          "Une signature"
        ],
        "answer": 0,
        "explanation": "La flèche du Nord oriente le croquis.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Propose trois symboles pour ton chemin de l'école et leur signification.",
        "modelAnswer": "Carré bleu : école ; triangle vert : jardin ; trait noir : route.",
        "explanation": "Chaque symbole doit être simple et associé clairement à un lieu.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o10",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Calculer une échelle",
    "lang": "fr",
    "objectives": [
      "Comprendre ce qu'est une échelle",
      "Calculer une distance réelle à partir d'un plan"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Calculer une échelle — أحسب مقياسا انطلاقا من الفصل الدراسي"
      },
      {
        "type": "p",
        "text": "Pour dessiner la classe sur une feuille, il faut la réduire : chaque longueur est divisée par le même nombre."
      },
      {
        "type": "rule",
        "text": "L'échelle indique combien de fois la réalité a été réduite. Échelle 1/100 : 1 cm sur le plan = 100 cm (1 m) dans la réalité."
      },
      {
        "type": "example",
        "text": "La classe mesure 8 m de long. Sur un plan à l'échelle 1/100, elle mesure 8 cm. Le tableau mesure 3 cm sur le plan : en réalité, 3 × 100 = 300 cm = 3 m."
      },
      {
        "type": "rule",
        "text": "Distance réelle = distance sur le plan × nombre de l'échelle. Distance sur le plan = distance réelle ÷ nombre de l'échelle."
      },
      {
        "type": "tip",
        "text": "Pense à convertir : 100 cm = 1 m. Vérifie toujours tes unités !"
      }
    ],
    "exercises": [
      {
        "type": "number",
        "prompt": "À l'échelle 1/100, 5 cm sur le plan représentent combien de mètres en réalité ?",
        "answer": 5,
        "explanation": "5 × 100 = 500 cm = 5 m.",
        "unit": "m",
        "id": "q1"
      },
      {
        "type": "number",
        "prompt": "À l'échelle 1/100, une classe de 9 m mesure combien de cm sur le plan ?",
        "answer": 9,
        "explanation": "9 m = 900 cm ; 900 ÷ 100 = 9 cm.",
        "unit": "cm",
        "id": "q2"
      },
      {
        "type": "number",
        "prompt": "À l'échelle 1/50, une table mesure 2 cm sur le plan. Quelle est sa longueur réelle en cm ?",
        "answer": 100,
        "explanation": "2 × 50 = 100 cm (1 m).",
        "unit": "cm",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : sur un plan, la classe est dessinée plus petite qu'en réalité.",
        "answer": true,
        "explanation": "Vrai : le plan est une réduction.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Échelle 1/100 signifie que 1 cm sur le plan vaut…",
        "choices": [
          "1 cm en réalité",
          "1 m en réalité",
          "100 m en réalité"
        ],
        "answer": 1,
        "explanation": "1 cm × 100 = 100 cm = 1 m.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o11",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Calculer une densité",
    "lang": "fr",
    "objectives": [
      "Comprendre la notion de densité",
      "Calculer une densité simple"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Calculer une densité — أتعلم حساب كثافة انطلاقا من الفصل الدراسي"
      },
      {
        "type": "p",
        "text": "Deux classes peuvent avoir le même nombre d'élèves mais des tailles différentes : dans la plus petite, les élèves sont plus serrés."
      },
      {
        "type": "rule",
        "text": "Densité = nombre de personnes ÷ surface. Dans la classe, on l'exprime en élèves par mètre carré (élèves/m²)."
      },
      {
        "type": "example",
        "text": "Une classe de 40 m² accueille 20 élèves : densité = 20 ÷ 40 = 0,5 élève/m². Une classe de 40 m² avec 40 élèves : densité = 1 élève/m², elle est plus dense."
      },
      {
        "type": "p",
        "text": "Pour un pays ou une ville, on calcule la densité de population en habitants par kilomètre carré (hab./km²)."
      },
      {
        "type": "tip",
        "text": "Plus la densité est grande, plus les personnes sont nombreuses sur le même espace."
      }
    ],
    "exercises": [
      {
        "type": "number",
        "prompt": "Une classe de 50 m² accueille 25 élèves. Quelle est sa densité (élèves/m²) ?",
        "answer": 0.5,
        "explanation": "25 ÷ 50 = 0,5 élève/m².",
        "unit": "élève/m²",
        "id": "q1"
      },
      {
        "type": "number",
        "prompt": "Une salle de 30 m² accueille 30 élèves. Quelle est sa densité ?",
        "answer": 1,
        "explanation": "30 ÷ 30 = 1 élève/m².",
        "unit": "élève/m²",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Classe A : 20 élèves dans 40 m². Classe B : 30 élèves dans 40 m². Laquelle est la plus dense ?",
        "choices": [
          "La classe A",
          "Elles sont égales",
          "La classe B"
        ],
        "answer": 2,
        "explanation": "A : 0,5 ; B : 0,75. B est plus dense.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : la densité se calcule en divisant le nombre de personnes par la surface.",
        "answer": true,
        "explanation": "Vrai : densité = personnes ÷ surface.",
        "id": "q4"
      },
      {
        "type": "number",
        "prompt": "Un village de 10 km² compte 500 habitants. Quelle est sa densité (hab./km²) ?",
        "answer": 50,
        "explanation": "500 ÷ 10 = 50 hab./km².",
        "unit": "hab./km²",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o12",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "L'environnement de mon école",
    "lang": "fr",
    "objectives": [
      "Identifier les éléments autour de l'école",
      "Distinguer éléments naturels et aménagés"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "L'environnement de mon école — أتعرف مكونات محيط مدرستي"
      },
      {
        "type": "p",
        "text": "Autour de mon école, il y a des éléments naturels et des éléments construits par l'homme."
      },
      {
        "type": "rule",
        "text": "Éléments naturels : arbres, colline, rivière, champs naturels. Éléments aménagés (humains) : routes, maisons, commerces, mosquée, dispensaire, terrain de sport."
      },
      {
        "type": "example",
        "text": "Autour de l'école de Mehdi, à Agadir : des maisons, une boulangerie, une route, un jardin public et, au loin, l'océan."
      },
      {
        "type": "list",
        "items": [
          "J'observe dans chaque direction",
          "Je classe ce que je vois : naturel ou aménagé",
          "Je note les dangers éventuels (route, chantier)"
        ]
      },
      {
        "type": "tip",
        "text": "Observer ton environnement t'aide à t'y déplacer en sécurité."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Lequel est un élément naturel ?",
        "choices": [
          "Une route",
          "Une rivière",
          "Une boulangerie"
        ],
        "answer": 1,
        "explanation": "La rivière n'est pas construite par l'homme.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Lequel est un élément aménagé par l'homme ?",
        "choices": [
          "Une colline",
          "Un arbre sauvage",
          "Un dispensaire"
        ],
        "answer": 2,
        "explanation": "Le dispensaire est construit par l'homme.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : une mosquée est un élément naturel.",
        "answer": false,
        "explanation": "Faux : c'est une construction humaine.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : la route devant l'école peut présenter un danger.",
        "answer": true,
        "explanation": "Vrai : il faut être prudent en la traversant.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Cite deux éléments naturels et deux éléments aménagés autour de ton école.",
        "modelAnswer": "Naturels : arbres, colline. Aménagés : route, épicerie.",
        "explanation": "Vérifier que le classement naturel/aménagé est juste.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o13",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Les espaces de mon école",
    "lang": "fr",
    "objectives": [
      "Nommer les espaces de l'école",
      "Connaître leur fonction"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Les espaces de mon école — أتعرف المرافق الكبرى لمدرستي"
      },
      {
        "type": "p",
        "text": "L'école est composée de plusieurs espaces (مرافق), chacun a une fonction."
      },
      {
        "type": "list",
        "items": [
          "Les salles de classe : apprendre",
          "La cour : jouer et se rassembler",
          "La bibliothèque : lire et emprunter des livres",
          "Le bureau de la direction : organiser l'école",
          "Les sanitaires : hygiène",
          "La cantine (dans certaines écoles) : manger"
        ]
      },
      {
        "type": "rule",
        "text": "Chaque espace a une fonction et des règles. Je respecte et je garde propres les espaces de mon école."
      },
      {
        "type": "example",
        "text": "Pendant la récréation, Imane joue dans la cour, puis elle se lave les mains aux sanitaires avant de retourner en classe."
      },
      {
        "type": "tip",
        "text": "Une école propre est agréable pour tout le monde : chacun peut y contribuer."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Où emprunte-t-on des livres ?",
        "choices": [
          "À la bibliothèque",
          "Dans la cour",
          "Aux sanitaires"
        ],
        "answer": 0,
        "explanation": "La bibliothèque prête des livres.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "La cour sert surtout à…",
        "choices": [
          "faire des calculs",
          "jouer et se rassembler",
          "dormir"
        ],
        "answer": 1,
        "explanation": "C'est l'espace de récréation.",
        "id": "q2"
      },
      {
        "type": "text",
        "prompt": "Dans quel bureau travaille le directeur ?",
        "accept": [
          "la direction",
          "direction",
          "le bureau de la direction",
          "bureau de la direction",
          "bureau du directeur",
          "le bureau du directeur"
        ],
        "explanation": "Le bureau de la direction.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on doit garder propres les espaces de l'école.",
        "answer": true,
        "explanation": "Vrai : c'est le respect de tous.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Où se lave-t-on les mains ?",
        "choices": [
          "À la bibliothèque",
          "Aux sanitaires",
          "Au bureau"
        ],
        "answer": 1,
        "explanation": "Les sanitaires servent à l'hygiène.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o14",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Représenter mon école avec des symboles",
    "lang": "fr",
    "objectives": [
      "Choisir des symboles pour les espaces de l'école",
      "Réaliser un plan légendé"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Représenter mon école avec des symboles — أمثل مرافق مدرستي في شكل رسم باستعمال رموز لها"
      },
      {
        "type": "rule",
        "text": "Sur un plan, on remplace chaque espace par un symbole (forme, couleur ou lettre) expliqué dans la légende."
      },
      {
        "type": "list",
        "items": [
          "Rectangle jaune : salle de classe",
          "Grand rectangle vert : cour",
          "Livre dessiné ou lettre B : bibliothèque",
          "Lettre D : direction",
          "Lettre S ou gouttes bleues : sanitaires"
        ]
      },
      {
        "type": "example",
        "text": "Le plan d'Omar : 6 rectangles jaunes autour d'une cour verte, un carré marron avec la lettre B pour la bibliothèque, une flèche pour l'entrée. Sa légende explique chaque symbole."
      },
      {
        "type": "p",
        "text": "Le plan doit avoir un titre, une légende, une orientation (flèche du Nord) et, si possible, une échelle."
      },
      {
        "type": "tip",
        "text": "Un même symbole doit toujours avoir le même sens sur ton plan."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Que doit obligatoirement accompagner les symboles d'un plan ?",
        "choices": [
          "Une légende",
          "Une chanson",
          "Une photo de classe"
        ],
        "answer": 0,
        "explanation": "La légende explique les symboles.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on peut utiliser deux symboles différents pour le même espace sur un même plan.",
        "answer": false,
        "explanation": "Faux : un espace = un seul symbole, pour éviter la confusion.",
        "id": "q2"
      },
      {
        "type": "number",
        "prompt": "Une école a 6 salles de classe, 1 bibliothèque et 1 direction. Combien de symboles d'espaces Omar dessine-t-il au total ?",
        "answer": 8,
        "explanation": "6 + 1 + 1 = 8 symboles.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Lequel n'est pas un élément du plan ?",
        "choices": [
          "Le titre",
          "L'orientation",
          "Le prénom du voisin"
        ],
        "answer": 2,
        "explanation": "Titre, légende, orientation et échelle sont les éléments du plan.",
        "id": "q4"
      },
      {
        "type": "text",
        "prompt": "Quel élément du plan indique le Nord ?",
        "accept": [
          "la fleche du nord",
          "fleche du nord",
          "l'orientation",
          "orientation",
          "la fleche",
          "fleche"
        ],
        "explanation": "La flèche du Nord (orientation).",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o15",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Observer le ciel et suivre la météo",
    "lang": "fr",
    "objectives": [
      "Décrire l'état du ciel",
      "Lire les symboles d'un bulletin météo"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Observer le ciel et suivre la météo — أرصد ألوان السماء وأتابع نشرة جوية"
      },
      {
        "type": "p",
        "text": "Le ciel change : il peut être bleu et dégagé, nuageux, gris et pluvieux, ou orageux."
      },
      {
        "type": "rule",
        "text": "Le bulletin météo annonce le temps des prochains jours : températures (en degrés Celsius, °C), pluie, vent, nuages."
      },
      {
        "type": "list",
        "items": [
          "Soleil : temps ensoleillé",
          "Nuage : temps nuageux",
          "Nuage avec gouttes : pluie",
          "Nuage avec éclair : orage",
          "Flocon : neige"
        ]
      },
      {
        "type": "example",
        "text": "Le bulletin annonce pour Ifrane 2 °C et de la neige, et pour Agadir 22 °C et du soleil. La famille de Lina prévoit des vêtements chauds pour Ifrane."
      },
      {
        "type": "tip",
        "text": "Note chaque jour le temps qu'il fait dans un tableau : tu deviens un petit météorologue."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Quel symbole annonce la pluie ?",
        "choices": [
          "Un soleil",
          "Un nuage avec des gouttes",
          "Un flocon"
        ],
        "answer": 1,
        "explanation": "Les gouttes représentent la pluie.",
        "id": "q1"
      },
      {
        "type": "text",
        "prompt": "En quelle unité exprime-t-on la température au Maroc ?",
        "accept": [
          "degre celsius",
          "degres celsius",
          "°C",
          "le degre celsius",
          "celsius",
          "degre"
        ],
        "explanation": "En degrés Celsius (°C).",
        "id": "q2"
      },
      {
        "type": "number",
        "prompt": "Il fait 22 °C à Agadir et 2 °C à Ifrane. Quelle est la différence de température ?",
        "answer": 20,
        "explanation": "22 − 2 = 20 °C.",
        "unit": "°C",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : un flocon sur le bulletin annonce de la neige.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Un ciel gris et chargé annonce souvent…",
        "choices": [
          "de la pluie",
          "une éclipse",
          "un tremblement de terre"
        ],
        "answer": 0,
        "explanation": "Les nuages gris peuvent donner de la pluie.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o16",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Situer ma ville ou mon village sur une carte",
    "lang": "fr",
    "objectives": [
      "Lire une carte du Maroc",
      "Situer sa localité avec les points cardinaux"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Situer ma ville ou mon village sur une carte — أبحث في خريطة عن موقع مدينتي - قريتي"
      },
      {
        "type": "p",
        "text": "Sur une carte du Maroc, on trouve les villes, les montagnes, les fleuves, la mer Méditerranée au nord et l'océan Atlantique à l'ouest."
      },
      {
        "type": "rule",
        "text": "Pour situer un lieu, j'utilise les points cardinaux et des repères : « Agadir est au sud-ouest du Maroc, au bord de l'océan Atlantique »."
      },
      {
        "type": "example",
        "text": "Rabat, la capitale, est sur la côte atlantique, au nord-ouest. Fès est à l'intérieur, au nord. Marrakech est au pied du Haut Atlas. Laâyoune est au sud."
      },
      {
        "type": "list",
        "items": [
          "Je trouve le titre et la légende de la carte",
          "Je repère la flèche du Nord",
          "Je cherche le nom de ma ville ou de la ville proche de mon village",
          "Je la situe par rapport à la mer, aux montagnes et aux autres villes"
        ]
      },
      {
        "type": "tip",
        "text": "Trouve d'abord une grande ville que tu connais, puis cherche ta localité autour d'elle."
      }
    ],
    "exercises": [
      {
        "type": "text",
        "prompt": "Quelle est la capitale du Maroc ?",
        "accept": [
          "rabat"
        ],
        "explanation": "Rabat est la capitale du Royaume.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Quelle mer borde le nord du Maroc ?",
        "choices": [
          "La mer Rouge",
          "La mer Méditerranée",
          "La mer Noire"
        ],
        "answer": 1,
        "explanation": "La Méditerranée borde le nord.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Agadir se trouve au bord…",
        "choices": [
          "de l'océan Atlantique",
          "de la mer Méditerranée",
          "d'un désert sans eau"
        ],
        "answer": 0,
        "explanation": "Agadir est sur la côte atlantique.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : Laâyoune se trouve au sud du Maroc.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Marrakech se trouve au pied…",
        "choices": [
          "du Rif",
          "du Haut Atlas",
          "de l'Anti-Atlas seulement"
        ],
        "answer": 1,
        "explanation": "Marrakech est au pied du Haut Atlas.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o17",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Prendre conscience de soi",
    "lang": "fr",
    "objectives": [
      "Se reconnaître comme une personne unique",
      "Connaître ses qualités et ses besoins"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Prendre conscience de soi — أعي ذاتي كإنسان"
      },
      {
        "type": "p",
        "text": "Chaque être humain est unique : il a un nom, un corps, des goûts, des émotions, des qualités et des rêves."
      },
      {
        "type": "rule",
        "text": "Je suis une personne unique avec une dignité. J'ai des qualités, et je peux progresser. Les autres sont aussi uniques que moi."
      },
      {
        "type": "list",
        "items": [
          "Mon identité : nom, prénom, date de naissance, nationalité",
          "Mes goûts : ce que j'aime faire",
          "Mes émotions : joie, peur, colère, tristesse",
          "Mes qualités : gentil, courageux, curieux…"
        ]
      },
      {
        "type": "example",
        "text": "Sara se présente : « Je m'appelle Sara, j'ai 9 ans, j'habite Tétouan, j'aime dessiner et je suis patiente. »"
      },
      {
        "type": "tip",
        "text": "Parler de ses émotions, c'est une force : tu peux toujours en parler à un adulte de confiance."
      }
    ],
    "exercises": [
      {
        "type": "tf",
        "prompt": "Vrai ou faux : chaque personne est unique.",
        "answer": true,
        "explanation": "Vrai : personne n'est exactement comme un autre.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Lequel est une émotion ?",
        "choices": [
          "La joie",
          "Une table",
          "Un crayon"
        ],
        "answer": 0,
        "explanation": "La joie est une émotion.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Lequel fait partie de mon identité ?",
        "choices": [
          "Mon prénom",
          "La couleur du ciel",
          "Le nom de la rue voisine"
        ],
        "answer": 0,
        "explanation": "Le prénom fait partie de l'identité.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on ne doit jamais parler de sa tristesse.",
        "answer": false,
        "explanation": "Faux : en parler à un adulte de confiance aide beaucoup.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Présente-toi en citant une qualité et une chose que tu aimes faire.",
        "modelAnswer": "Je m'appelle Adam, je suis généreux et j'aime jouer au football.",
        "explanation": "La réponse doit contenir une qualité et un goût personnel.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o18",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Prendre soin de soi",
    "lang": "fr",
    "objectives": [
      "Connaître les gestes d'hygiène et de santé",
      "Adopter de bonnes habitudes"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Prendre soin de soi — أحافظ على ذاتي"
      },
      {
        "type": "rule",
        "text": "Prendre soin de soi, c'est protéger son corps et sa santé : hygiène, alimentation équilibrée, sommeil, activité physique."
      },
      {
        "type": "list",
        "items": [
          "Se laver les mains avant de manger et après les toilettes",
          "Se brosser les dents matin et soir",
          "Manger des fruits et des légumes, boire de l'eau",
          "Dormir suffisamment (environ 10 heures pour un enfant de cet âge)",
          "Bouger et jouer dehors"
        ]
      },
      {
        "type": "example",
        "text": "Chaque soir, Ayoub prépare son cartable, se brosse les dents et se couche tôt : le matin, il est en forme pour apprendre."
      },
      {
        "type": "p",
        "text": "Prendre soin de soi, c'est aussi dire « non » à ce qui est dangereux et demander de l'aide à un adulte de confiance."
      },
      {
        "type": "tip",
        "text": "Une petite habitude chaque jour fait une grande différence pour ta santé."
      }
    ],
    "exercises": [
      {
        "type": "number",
        "prompt": "Combien de fois par jour, au minimum, faut-il se brosser les dents selon ce cours ?",
        "answer": 2,
        "explanation": "Matin et soir : 2 fois.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Quand faut-il se laver les mains ?",
        "choices": [
          "Avant de manger",
          "Seulement le vendredi",
          "Jamais"
        ],
        "answer": 0,
        "explanation": "Avant de manger et après les toilettes.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : boire de l'eau est bon pour la santé.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q3"
      },
      {
        "type": "qcm",
        "prompt": "Quelle habitude aide à être en forme le matin ?",
        "choices": [
          "Se coucher très tard",
          "Dormir suffisamment",
          "Sauter le petit-déjeuner"
        ],
        "answer": 1,
        "explanation": "Le sommeil permet au corps de récupérer.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Lequel est un aliment à manger souvent ?",
        "choices": [
          "Les bonbons",
          "Les sodas",
          "Les fruits"
        ],
        "answer": 2,
        "explanation": "Les fruits apportent des vitamines.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o19",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Les dangers du tabac",
    "lang": "fr",
    "objectives": [
      "Connaître les effets du tabac sur la santé",
      "Savoir dire non"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Les dangers du tabac — أعي مخاطر التدخين على الصحة"
      },
      {
        "type": "rule",
        "text": "Le tabac est dangereux pour la santé : il abîme les poumons, le cœur et peut provoquer des maladies graves. Il contient de la nicotine, qui rend dépendant."
      },
      {
        "type": "p",
        "text": "La fumée est aussi dangereuse pour les personnes autour du fumeur : c'est le tabagisme passif."
      },
      {
        "type": "list",
        "items": [
          "Toux et essoufflement",
          "Dents jaunies et mauvaise haleine",
          "Maladies des poumons et du cœur",
          "Dépense d'argent inutile"
        ]
      },
      {
        "type": "example",
        "text": "Un paquet coûte environ 30 dirhams. Une personne qui en achète un par jour dépense 30 × 30 = 900 dirhams en un mois de 30 jours."
      },
      {
        "type": "tip",
        "text": "Si quelqu'un te propose une cigarette, tu as le droit de dire « non, merci » : c'est un choix courageux."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Quel organe le tabac abîme-t-il en premier ?",
        "choices": [
          "Les poumons",
          "Les ongles",
          "Les cheveux"
        ],
        "answer": 0,
        "explanation": "La fumée entre dans les poumons.",
        "id": "q1"
      },
      {
        "type": "text",
        "prompt": "Quelle substance du tabac rend dépendant ?",
        "accept": [
          "la nicotine",
          "nicotine"
        ],
        "explanation": "La nicotine.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : respirer la fumée des autres n'est pas dangereux.",
        "answer": false,
        "explanation": "Faux : c'est le tabagisme passif, il est dangereux.",
        "id": "q3"
      },
      {
        "type": "number",
        "prompt": "Un paquet coûte 30 dirhams. Combien coûtent 10 paquets ?",
        "answer": 300,
        "explanation": "30 × 10 = 300 dirhams.",
        "unit": "DH",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Que répondre si on te propose une cigarette ?",
        "choices": [
          "Oui, pour faire comme les grands",
          "Non, merci",
          "Je vais réfléchir demain"
        ],
        "answer": 1,
        "explanation": "Dire non protège ta santé.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o20",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Respecter l'autre",
    "lang": "fr",
    "objectives": [
      "Accepter les différences",
      "Adopter des comportements respectueux"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Respecter l'autre — أقدر الآخر كما هو"
      },
      {
        "type": "p",
        "text": "Les personnes sont différentes : âge, langue (arabe, amazighe, français…), aspect physique, goûts, handicap, origine."
      },
      {
        "type": "rule",
        "text": "Chaque personne mérite le respect tel qu'elle est. Les différences sont une richesse ; personne ne doit être moqué ou exclu."
      },
      {
        "type": "list",
        "items": [
          "J'écoute l'autre sans l'interrompre",
          "Je ne me moque pas",
          "J'invite chacun à jouer",
          "J'aide un camarade en difficulté"
        ]
      },
      {
        "type": "example",
        "text": "Nouhaila se déplace en fauteuil roulant. Ses camarades adaptent le jeu dans la cour pour qu'elle puisse jouer avec eux."
      },
      {
        "type": "tip",
        "text": "Un sourire et une parole gentille peuvent changer la journée de quelqu'un."
      }
    ],
    "exercises": [
      {
        "type": "tf",
        "prompt": "Vrai ou faux : les différences entre les personnes sont une richesse.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Un camarade parle une autre langue que toi. Que fais-tu ?",
        "choices": [
          "Je me moque",
          "Je l'accueille et j'apprends quelques mots",
          "Je l'ignore"
        ],
        "answer": 1,
        "explanation": "Accueillir l'autre, c'est le respecter.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Lequel est un comportement respectueux ?",
        "choices": [
          "Exclure quelqu'un du jeu",
          "Interrompre sans cesse",
          "Écouter sans interrompre"
        ],
        "answer": 2,
        "explanation": "Écouter l'autre est une marque de respect.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on peut se moquer de l'aspect physique d'un camarade.",
        "answer": false,
        "explanation": "Faux : la moquerie blesse.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Que peux-tu faire pour qu'un nouvel élève se sente bien dans la classe ?",
        "modelAnswer": "Je lui dis bonjour, je lui montre l'école et je l'invite à jouer.",
        "explanation": "Toute action d'accueil et d'inclusion est acceptée.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o21",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "La sécurité routière",
    "lang": "fr",
    "objectives": [
      "Connaître les règles du piéton",
      "Reconnaître quelques signaux"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "La sécurité routière — أحافظ على سلامتي على الطريق"
      },
      {
        "type": "rule",
        "text": "Le piéton marche sur le trottoir et traverse sur le passage piéton, quand le feu piéton est vert, après avoir regardé à gauche, à droite, puis encore à gauche."
      },
      {
        "type": "list",
        "items": [
          "Feu rouge : je m'arrête",
          "Feu vert pour les piétons : je traverse en marchant",
          "Je ne joue jamais sur la route",
          "En voiture, je mets ma ceinture et je m'assois à l'arrière"
        ]
      },
      {
        "type": "example",
        "text": "En sortant de l'école, Hiba attend que le bonhomme du feu piéton passe au vert, regarde à gauche et à droite, puis traverse sur les bandes blanches."
      },
      {
        "type": "p",
        "text": "Le passage piéton est formé de bandes blanches sur la chaussée."
      },
      {
        "type": "tip",
        "text": "Prends ton temps pour traverser : ta sécurité passe avant tout."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Où le piéton doit-il marcher ?",
        "choices": [
          "Sur la chaussée",
          "Sur le trottoir",
          "Au milieu de la route"
        ],
        "answer": 1,
        "explanation": "Le trottoir est réservé aux piétons.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Le feu est rouge pour les piétons. Je…",
        "choices": [
          "traverse en courant",
          "m'arrête et j'attends",
          "traverse en regardant mon téléphone"
        ],
        "answer": 1,
        "explanation": "Rouge : on s'arrête.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : en voiture, un enfant doit mettre sa ceinture.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q3"
      },
      {
        "type": "text",
        "prompt": "Comment appelle-t-on les bandes blanches où l'on traverse ?",
        "accept": [
          "le passage pieton",
          "passage pieton",
          "passage pietons",
          "le passage pour pietons",
          "passage cloute"
        ],
        "explanation": "Le passage piéton.",
        "id": "q4"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on peut jouer au ballon sur la route.",
        "answer": false,
        "explanation": "Faux : c'est très dangereux.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o22",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "La règle et la loi",
    "lang": "fr",
    "objectives": [
      "Distinguer règle et loi",
      "Comprendre leur utilité"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "La règle et la loi — القاعدة والقانون"
      },
      {
        "type": "p",
        "text": "Dans la classe, à la maison, dans le jeu, il existe des règles. Dans le pays, il existe des lois."
      },
      {
        "type": "rule",
        "text": "Une règle organise la vie d'un groupe (classe, famille, jeu). Une loi s'applique à tous les citoyens d'un pays ; elle est votée au Parlement. Règles et lois protègent et permettent de vivre ensemble."
      },
      {
        "type": "example",
        "text": "Règle de classe : lever la main pour parler. Loi : s'arrêter au feu rouge, pour tous les conducteurs du Maroc."
      },
      {
        "type": "list",
        "items": [
          "Respecter une règle évite les conflits",
          "Ne pas la respecter entraîne une sanction juste",
          "Les règles valent pour tous, de la même façon"
        ]
      },
      {
        "type": "tip",
        "text": "Tu peux proposer avec ta classe de nouvelles règles pour mieux vivre ensemble."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Où les lois sont-elles votées au Maroc ?",
        "choices": [
          "Au Parlement",
          "À la boulangerie",
          "Dans la cour"
        ],
        "answer": 0,
        "explanation": "Le Parlement vote les lois.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : « lever la main pour parler » est une règle de classe.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Une loi s'applique…",
        "choices": [
          "à une seule personne",
          "à tous les citoyens du pays",
          "seulement aux enfants"
        ],
        "answer": 1,
        "explanation": "La loi vaut pour tous.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : les règles servent à mieux vivre ensemble.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q4"
      },
      {
        "type": "open",
        "prompt": "Écris une règle de ta classe et explique pourquoi elle est utile.",
        "modelAnswer": "Ranger son matériel : la classe reste en ordre et on retrouve ses affaires.",
        "explanation": "Une règle plausible + une justification liée au vivre-ensemble.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o23",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "L'écoute active",
    "lang": "fr",
    "objectives": [
      "Connaître les attitudes de l'écoute active",
      "Bien communiquer"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "L'écoute active — كيف أصغي بشكل نشيط وأتواصل"
      },
      {
        "type": "rule",
        "text": "Écouter activement, c'est regarder la personne, ne pas l'interrompre, montrer qu'on comprend, puis reformuler ou poser une question."
      },
      {
        "type": "list",
        "items": [
          "Je regarde celui qui parle",
          "Je ne l'interromps pas",
          "Je hoche la tête ou je dis « d'accord »",
          "Je reformule : « Tu veux dire que… ? »",
          "J'attends mon tour pour parler"
        ]
      },
      {
        "type": "example",
        "text": "Zakaria raconte qu'il a perdu son chat. Inès l'écoute, puis dit : « Tu es triste parce que ton chat a disparu ? Veux-tu qu'on fasse une affiche ? »"
      },
      {
        "type": "p",
        "text": "Pour bien communiquer, je parle calmement, clairement, et je respecte le tour de parole."
      },
      {
        "type": "tip",
        "text": "Écouter vraiment quelqu'un, c'est lui montrer qu'il compte pour toi."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Pendant que ton ami parle, tu…",
        "choices": [
          "le regardes et l'écoutes",
          "joues avec ton téléphone",
          "parles en même temps"
        ],
        "answer": 0,
        "explanation": "Regarder et écouter sont la base.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : interrompre quelqu'un montre qu'on l'écoute bien.",
        "answer": false,
        "explanation": "Faux : il faut attendre son tour.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Reformuler, c'est…",
        "choices": [
          "répéter avec ses mots ce qu'on a compris",
          "changer de sujet",
          "crier plus fort"
        ],
        "answer": 0,
        "explanation": "Cela vérifie qu'on a bien compris.",
        "id": "q3"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : il faut attendre son tour pour parler.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q4"
      },
      {
        "type": "qcm",
        "prompt": "Laquelle est une phrase de reformulation ?",
        "choices": [
          "Tais-toi !",
          "Tu veux dire que tu es fatigué ?",
          "Ce n'est pas mon problème."
        ],
        "answer": 1,
        "explanation": "Elle reprend le message de l'autre.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o24",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Désirs, besoins et droits",
    "lang": "fr",
    "objectives": [
      "Distinguer désir et besoin",
      "Relier besoins et droits de l'enfant"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Désirs, besoins et droits — الرغبات والحاجيات والحقوق"
      },
      {
        "type": "rule",
        "text": "Un besoin est indispensable pour vivre et grandir (manger, boire, se soigner, apprendre, être protégé). Un désir est une envie dont on peut se passer (un jouet, une console)."
      },
      {
        "type": "p",
        "text": "Les besoins essentiels de l'enfant sont protégés par des droits, reconnus par la Convention internationale des droits de l'enfant (1989), que le Maroc a ratifiée."
      },
      {
        "type": "list",
        "items": [
          "Droit à l'éducation",
          "Droit à la santé",
          "Droit à un nom et une nationalité",
          "Droit à la protection",
          "Droit au jeu et aux loisirs"
        ]
      },
      {
        "type": "example",
        "text": "Rayan veut une nouvelle console : c'est un désir. Il a besoin d'aller à l'école et de manger sainement : ce sont des besoins, protégés par des droits."
      },
      {
        "type": "tip",
        "text": "Les droits vont avec des devoirs : respecter les droits des autres aussi."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Lequel est un besoin ?",
        "choices": [
          "Une console de jeux",
          "Boire de l'eau",
          "Des baskets de marque"
        ],
        "answer": 1,
        "explanation": "L'eau est indispensable à la vie.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Lequel est un désir ?",
        "choices": [
          "Se soigner",
          "Aller à l'école",
          "Avoir un nouveau jouet"
        ],
        "answer": 2,
        "explanation": "On peut vivre sans nouveau jouet.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : l'éducation est un droit de l'enfant.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q3"
      },
      {
        "type": "number",
        "prompt": "En quelle année a été adoptée la Convention internationale des droits de l'enfant ?",
        "answer": 1989,
        "explanation": "Elle a été adoptée par l'ONU en 1989.",
        "id": "q4"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : un désir est indispensable pour vivre.",
        "answer": false,
        "explanation": "Faux : c'est le besoin qui est indispensable.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o25",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Le travail en groupe",
    "lang": "fr",
    "objectives": [
      "Comprendre l'intérêt du travail en groupe",
      "Connaître les rôles et les règles"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Le travail en groupe — أهمية العمل الجماعي - كيف أشتغل في مجموعات"
      },
      {
        "type": "rule",
        "text": "Travailler en groupe permet de partager les idées, de s'entraider et de réussir ensemble une tâche plus grande."
      },
      {
        "type": "list",
        "items": [
          "L'animateur : organise et donne la parole",
          "Le secrétaire : écrit les idées",
          "Le gardien du temps : surveille la durée",
          "Le rapporteur : présente le travail à la classe"
        ]
      },
      {
        "type": "p",
        "text": "Règles du groupe : parler à voix basse, écouter chacun, accepter les idées des autres, partager le travail."
      },
      {
        "type": "example",
        "text": "Pour préparer une affiche sur l'eau, le groupe de Kenza se répartit les rôles : Kenza écrit, Bilal dessine, Sofia surveille le temps et Anas présente l'affiche."
      },
      {
        "type": "tip",
        "text": "Chaque membre compte : ton idée peut aider tout le groupe."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Qui présente le travail du groupe à la classe ?",
        "choices": [
          "Le rapporteur",
          "Le gardien du temps",
          "Personne"
        ],
        "answer": 0,
        "explanation": "C'est le rôle du rapporteur.",
        "id": "q1"
      },
      {
        "type": "qcm",
        "prompt": "Qui écrit les idées du groupe ?",
        "choices": [
          "L'animateur",
          "Le secrétaire",
          "Le rapporteur"
        ],
        "answer": 1,
        "explanation": "Le secrétaire note.",
        "id": "q2"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : dans un groupe, une seule personne doit tout faire.",
        "answer": false,
        "explanation": "Faux : on partage le travail.",
        "id": "q3"
      },
      {
        "type": "number",
        "prompt": "Un groupe de 4 élèves doit faire 12 dessins à parts égales. Combien de dessins fait chaque élève ?",
        "answer": 3,
        "explanation": "12 ÷ 4 = 3 dessins.",
        "id": "q4"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : écouter les idées de chacun est une règle du travail en groupe.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q5"
      }
    ]
  },
  {
    "id": "4AP-hg-o26",
    "levelId": "4AP",
    "subjectId": "hg",
    "title": "Chercher et organiser l'information",
    "lang": "fr",
    "objectives": [
      "Trouver des informations dans des sources variées",
      "Les classer clairement"
    ],
    "lesson": [
      {
        "type": "h",
        "text": "Chercher et organiser l'information — كيف أبحث وأنظم المعطيات"
      },
      {
        "type": "p",
        "text": "Pour un exposé, il faut chercher des informations puis les organiser."
      },
      {
        "type": "list",
        "items": [
          "Je précise ma question (de quoi ai-je besoin ?)",
          "Je cherche dans des sources : livres, dictionnaire, encyclopédie, internet avec un adulte, personnes",
          "Je note l'essentiel avec des mots-clés",
          "J'organise : tableau, liste, plan en parties",
          "Je cite mes sources"
        ]
      },
      {
        "type": "rule",
        "text": "Une information doit être vérifiée dans plusieurs sources fiables. Les informations organisées (tableau, liste) sont plus faciles à comprendre."
      },
      {
        "type": "example",
        "text": "Pour un exposé sur l'arganier, Khadija lit un livre, interroge une coopérative près d'Essaouira, puis classe ses notes en trois parties : l'arbre, l'huile, les femmes des coopératives."
      },
      {
        "type": "tip",
        "text": "Sur internet, demande toujours l'aide d'un adulte pour choisir des sites sûrs."
      }
    ],
    "exercises": [
      {
        "type": "qcm",
        "prompt": "Que fait-on en premier pour une recherche ?",
        "choices": [
          "Préciser sa question",
          "Recopier tout un livre",
          "Présenter l'exposé"
        ],
        "answer": 0,
        "explanation": "On commence par savoir ce qu'on cherche.",
        "id": "q1"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : il faut vérifier une information dans plusieurs sources.",
        "answer": true,
        "explanation": "Vrai.",
        "id": "q2"
      },
      {
        "type": "qcm",
        "prompt": "Quel outil aide à classer des informations ?",
        "choices": [
          "Un tableau",
          "Une gomme",
          "Un ballon"
        ],
        "answer": 0,
        "explanation": "Le tableau organise les données.",
        "id": "q3"
      },
      {
        "type": "text",
        "prompt": "Quel livre donne le sens des mots, classés par ordre alphabétique ?",
        "accept": [
          "le dictionnaire",
          "dictionnaire",
          "un dictionnaire"
        ],
        "explanation": "C'est le dictionnaire.",
        "id": "q4"
      },
      {
        "type": "tf",
        "prompt": "Vrai ou faux : on peut copier toutes les informations sans citer ses sources.",
        "answer": false,
        "explanation": "Faux : on cite ses sources.",
        "id": "q5"
      }
    ]
  }
];
