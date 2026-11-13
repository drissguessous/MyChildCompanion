import type { Chapter } from '../types';

/** Cours 1BAC mathématiques (programme officiel, option internationale). */
export const GEN_O_1BAC_MATH_1: Chapter[] = [
  {
    id: '1BAC-math-o1', levelId: '1BAC', subjectId: 'math', title: 'Généralités sur les fonctions numériques', lang: 'fr',
    objectives: ['Étudier la parité et les variations d’une fonction', 'Reconnaître une fonction majorée, minorée, bornée et ses extremums', 'Composer deux fonctions et en déduire la monotonie'],
    lesson: [
      { type: 'h', text: 'Parité, bornes et extremums' },
      { type: 'rule', text: 'Si D est symétrique par rapport à 0 : f est paire si f(−x) = f(x) pour tout x de D (courbe symétrique par rapport à l’axe des ordonnées), impaire si f(−x) = −f(x) (courbe symétrique par rapport à l’origine). f est majorée par M si f(x) ≤ M pour tout x de D, minorée par m si f(x) ≥ m ; bornée si elle est les deux.' },
      { type: 'p', text: 'f admet un maximum en a sur I si f(x) ≤ f(a) pour tout x de I, un minimum si f(x) ≥ f(a). Pour un trinôme ax² + bx + c avec a > 0, le minimum est atteint en x = −b/(2a).' },
      { type: 'h', text: 'Composée et monotonie' },
      { type: 'rule', text: '(g∘f)(x) = g(f(x)), définie lorsque f(x) appartient au domaine de g. Si f et g ont la même monotonie, g∘f est croissante ; si elles ont des monotonies contraires, g∘f est décroissante.' },
      { type: 'example', text: 'Yasmine étudie f(x) = x² − 4x + 1. On écrit f(x) = (x − 2)² − 3 ≥ −3, avec égalité pour x = 2 : f est minorée par −3 et admet un minimum −3 en 2.' },
      { type: 'tip', text: 'Avant toute étude, commence par le domaine de définition : c’est le réflexe qui rend tout le reste plus simple.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'La fonction f(x) = x³ − x définie sur ℝ est :', choices: ['paire', 'impaire', 'ni paire ni impaire'], answer: 1, explanation: 'ℝ est symétrique par rapport à 0 et f(−x) = −x³ + x = −(x³ − x) = −f(x) : f est impaire.' },
      { id: 'q2', type: 'number', prompt: 'Quelle est la valeur minimale de f(x) = x² − 4x + 1 sur ℝ ?', answer: -3, explanation: 'f(x) = (x − 2)² − 3, donc f(x) ≥ −3 et f(2) = −3. Le minimum vaut −3.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : la fonction x ↦ x² + 1 est minorée par 1 sur ℝ.', answer: true, explanation: 'Vrai : x² ≥ 0 donc x² + 1 ≥ 1 pour tout réel x.' },
      { id: 'q4', type: 'number', prompt: 'Soient f(x) = 2x + 1 et g(x) = x². Calcule (g∘f)(1).', answer: 9, explanation: 'f(1) = 3, puis g(3) = 3² = 9.' },
      { id: 'q5', type: 'text', prompt: 'Si f et g sont toutes deux décroissantes (avec les intervalles adaptés), g∘f est-elle croissante ou décroissante ?', accept: ['croissante', 'elle est croissante'], explanation: 'Même monotonie ⇒ composée croissante : si a < b, alors f(a) ≥ f(b), puis g(f(a)) ≤ g(f(b)).' },
    ],
  },
  {
    id: '1BAC-math-o2', levelId: '1BAC', subjectId: 'math', title: 'La rotation dans le plan (étude géométrique)', lang: 'fr',
    objectives: ['Définir une rotation par son centre et son angle', 'Utiliser les propriétés de conservation d’une rotation'],
    lesson: [
      { type: 'h', text: 'Définition' },
      { type: 'rule', text: 'Soit Ω un point et θ un réel. La rotation R de centre Ω et d’angle θ associe à Ω lui-même, et à tout point M ≠ Ω le point M′ tel que ΩM′ = ΩM et (ΩM, ΩM′) ≡ θ [2π] (angle orienté de vecteurs).' },
      { type: 'h', text: 'Propriétés' },
      { type: 'list', items: ['Elle conserve les distances : si R(A) = A′ et R(B) = B′, alors A′B′ = AB.', 'Elle conserve les mesures des angles orientés, l’alignement et le milieu.', 'L’image d’une droite est une droite, d’un segment un segment de même longueur, d’un cercle de centre O et rayon r le cercle de centre R(O) et de même rayon.', 'La rotation d’angle π est la symétrie centrale de centre Ω ; la rotation d’angle 0 est l’identité.', 'La composée de deux rotations de même centre, d’angles θ et θ′, est la rotation de même centre et d’angle θ + θ′.'] },
      { type: 'example', text: 'Dans un triangle équilatéral direct ABC, la rotation de centre A et d’angle π/3 transforme B en C, car AB = AC et (AB, AC) ≡ π/3 [2π].' },
      { type: 'tip', text: 'Trace toujours une petite flèche pour le sens direct : elle t’évite bien des hésitations sur le signe de l’angle.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'La rotation de centre Ω et d’angle π est :', choices: ['une translation', 'l’identité', 'la symétrie centrale de centre Ω'], answer: 2, explanation: 'Avec un angle π, M′ est tel que ΩM′ = −ΩM (vecteurs) : Ω est le milieu de [MM′].' },
      { id: 'q2', type: 'number', prompt: 'AB = 5 cm. A′ et B′ sont les images de A et B par une rotation. Combien mesure A′B′ ?', answer: 5, unit: 'cm', explanation: 'Une rotation conserve les distances : A′B′ = AB = 5 cm.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : une rotation conserve les mesures des angles orientés.', answer: true, explanation: 'Vrai : c’est une isométrie qui conserve l’orientation.' },
      { id: 'q4', type: 'number', prompt: 'On compose la rotation de centre O d’angle 30° avec la rotation de centre O d’angle 45°. Quel est l’angle (en degrés) de la rotation obtenue ?', answer: 75, unit: '°', explanation: 'Même centre : les angles s’ajoutent, 30° + 45° = 75°.' },
      { id: 'q5', type: 'qcm', prompt: 'L’image du cercle de centre O et de rayon 3 par la rotation de centre O et d’angle π/2 est :', choices: ['le même cercle', 'un cercle de rayon 6', 'une droite'], answer: 0, explanation: 'Le centre O est fixe et le rayon est conservé : l’image est le même cercle.' },
    ],
  },
  {
    id: '1BAC-math-o3', levelId: '1BAC', subjectId: 'math', title: 'Vecteurs de l’espace', lang: 'fr',
    objectives: ['Calculer avec les vecteurs de l’espace (relation de Chasles)', 'Reconnaître des vecteurs colinéaires ou coplanaires'],
    lesson: [
      { type: 'h', text: 'Les règles du plan restent valables' },
      { type: 'rule', text: 'Relation de Chasles : pour tous points A, B, C de l’espace, AB + BC = AC (vecteurs). u et v sont colinéaires s’il existe un réel k tel que v = k·u (ou u = 0).' },
      { type: 'h', text: 'Coplanarité' },
      { type: 'rule', text: 'Trois vecteurs u, v, w sont coplanaires si l’un s’écrit comme combinaison linéaire des deux autres (par exemple w = a·u + b·v). Les points A, B, C, D sont coplanaires si et seulement si AB, AC, AD sont coplanaires.' },
      { type: 'p', text: 'Si u et v ne sont pas colinéaires, le plan passant par A et dirigé par u et v est l’ensemble des points M tels que AM = a·u + b·v, avec a et b réels.' },
      { type: 'example', text: 'Dans le cube ABCDEFGH (ABCD face du bas, E au-dessus de A, F de B, G de C, H de D) : AB + AD + AE = AB + BC + CG = AG.' },
      { type: 'tip', text: 'Dessine le cube en perspective et suis les flèches avec le doigt : Chasles devient un vrai chemin.' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'ABCD est un tétraèdre. AB + BC + CD est égal à :', choices: ['AC', 'AD', 'BD'], answer: 1, explanation: 'Chasles : AB + BC = AC, puis AC + CD = AD.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : trois vecteurs de l’espace sont toujours coplanaires.', answer: false, explanation: 'Faux : par exemple, les trois arêtes AB, AD, AE d’un cube issues de A ne sont pas coplanaires.' },
      { id: 'q3', type: 'number', prompt: 'Dans une base (i, j, k), u = 2i + 4j − 6k et v = −i + a·j + 3k. Pour quelle valeur de a les vecteurs sont-ils colinéaires ?', answer: -2, explanation: 'v = −½·u impose −½ × 4 = a, donc a = −2 (et on vérifie : −½ × (−6) = 3).' },
      { id: 'q4', type: 'tf', prompt: 'Vrai ou faux : si w = 2u − 3v, alors u, v, w sont coplanaires.', answer: true, explanation: 'Vrai : w est combinaison linéaire de u et v.' },
      { id: 'q5', type: 'qcm', prompt: 'Dans le cube ABCDEFGH de la leçon, AB + AD est égal à :', choices: ['AG', 'AE', 'AC'], answer: 2, explanation: 'ABCD est un carré : AD = BC, donc AB + AD = AB + BC = AC.' },
    ],
  },
  {
    id: '1BAC-math-o4', levelId: '1BAC', subjectId: 'math', title: 'Étude des fonctions numériques et représentation graphique', lang: 'fr',
    objectives: ['Dresser le tableau de variations à l’aide de la dérivée', 'Déterminer tangentes, asymptotes, points d’inflexion', 'Tracer la courbe représentative'],
    lesson: [
      { type: 'h', text: 'Le plan d’étude' },
      { type: 'list', items: ['Domaine de définition et éventuelle parité.', 'Limites aux bornes et asymptotes (verticales x = a, horizontales y = b, obliques y = ax + b).', 'Dérivée f′, son signe, tableau de variations et extremums.', 'Dérivée seconde f″ : concavité et points d’inflexion.', 'Tangentes utiles, puis tracé de la courbe.'] },
      { type: 'rule', text: 'Si f′ > 0 sur I, f est strictement croissante sur I ; si f′ < 0, strictement décroissante. La tangente en a a pour équation y = f′(a)(x − a) + f(a). Si f″ s’annule en a en changeant de signe, le point d’abscisse a est un point d’inflexion.' },
      { type: 'p', text: 'Le point Ω(a, b) est centre de symétrie de la courbe si, pour tout x tel que 2a − x ∈ D, f(2a − x) + f(x) = 2b ; la droite x = a est axe de symétrie si f(2a − x) = f(x).' },
      { type: 'example', text: 'f(x) = x³ − 3x : f′(x) = 3(x − 1)(x + 1). f croît sur ]−∞, −1], décroît sur [−1, 1], croît sur [1, +∞[ ; maximum f(−1) = 2, minimum f(1) = −2. f″(x) = 6x change de signe en 0 : O est un point d’inflexion.' },
      { type: 'tip', text: 'Place d’abord les points remarquables et les asymptotes : la courbe se dessine alors presque toute seule.' },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'f(x) = x³ − 3x. Calcule f′(2).', answer: 9, explanation: 'f′(x) = 3x² − 3, donc f′(2) = 12 − 3 = 9.' },
      { id: 'q2', type: 'qcm', prompt: 'f(x) = (2x + 1)/(x − 1). Quelle droite est asymptote horizontale en +∞ ?', choices: ['y = 1', 'y = 2', 'x = 1'], answer: 1, explanation: 'Le quotient des termes de plus haut degré donne 2x/x = 2 : lim f = 2, asymptote y = 2 (x = 1 est l’asymptote verticale).' },
      { id: 'q3', type: 'number', prompt: 'f(x) = x² − 6x + 5. En quelle valeur de x f admet-elle son minimum ?', answer: 3, explanation: 'f′(x) = 2x − 6 s’annule en 3 en passant de négatif à positif : minimum en x = 3 (f(3) = −4).' },
      { id: 'q4', type: 'number', prompt: 'La tangente à la courbe de f(x) = x² au point d’abscisse 1 a pour équation y = mx + p. Donne p.', answer: -1, explanation: 'f(1) = 1, f′(1) = 2 : y = 2(x − 1) + 1 = 2x − 1, donc p = −1.' },
      { id: 'q5', type: 'tf', prompt: 'Vrai ou faux : la courbe de f(x) = x³ admet un point d’inflexion à l’origine.', answer: true, explanation: 'Vrai : f″(x) = 6x s’annule en 0 en changeant de signe.' },
    ],
  },
  {
    id: '1BAC-math-o5', levelId: '1BAC', subjectId: 'math', title: 'Géométrie analytique de l’espace', lang: 'fr',
    objectives: ['Utiliser les coordonnées dans un repère de l’espace', 'Écrire une représentation paramétrique de droite et une équation cartésienne de plan'],
    lesson: [
      { type: 'h', text: 'Coordonnées' },
      { type: 'rule', text: 'Dans un repère (O, i, j, k) : AB(xB − xA, yB − yA, zB − zA) ; le milieu de [AB] a pour coordonnées ((xA + xB)/2, (yA + yB)/2, (zA + zB)/2). u(a, b, c) et v(a′, b′, c′) sont colinéaires si leurs coordonnées sont proportionnelles.' },
      { type: 'h', text: 'Droites et plans' },
      { type: 'rule', text: 'La droite passant par A(xA, yA, zA) et dirigée par u(a, b, c) a pour représentation paramétrique : x = xA + at, y = yA + bt, z = zA + ct (t ∈ ℝ). Tout plan a une équation cartésienne de la forme ax + by + cz + d = 0 avec (a, b, c) ≠ (0, 0, 0).' },
      { type: 'p', text: 'Trois vecteurs sont coplanaires si et seulement si leur déterminant est nul ; cela permet d’obtenir l’équation d’un plan (A, u, v) en écrivant det(AM, u, v) = 0.' },
      { type: 'example', text: 'Hamza cherche le milieu de [AB] avec A(1, 2, 3) et B(3, 0, 5) : I(2, 1, 4).' },
      { type: 'tip', text: 'Vérifie toujours ton équation de plan en y remplaçant les coordonnées d’un point connu : un contrôle rapide et rassurant.' },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'A(1, 2, 3) et B(3, 0, 5). Quelle est la cote (troisième coordonnée) du milieu de [AB] ?', answer: 4, explanation: '(3 + 5)/2 = 4.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : le point (1, 1, 1) appartient au plan d’équation x + 2y − z − 2 = 0.', answer: true, explanation: '1 + 2 − 1 − 2 = 0 : vrai.' },
      { id: 'q3', type: 'qcm', prompt: 'Une représentation paramétrique de la droite passant par A(1, 0, 2) et dirigée par u(2, −1, 1) est :', choices: ['x = 2 + t, y = −1, z = 1 + 2t', 'x = 1 + 2t, y = −t, z = 2 + t', 'x = 1 − 2t, y = t, z = 2 − 2t'], answer: 1, explanation: 'On applique x = xA + at, y = yA + bt, z = zA + ct avec A(1, 0, 2) et u(2, −1, 1).' },
      { id: 'q4', type: 'number', prompt: 'Le plan 2x − y + z − 4 = 0 coupe l’axe (Oz) en un point de cote z. Donne z.', answer: 4, explanation: 'Sur (Oz), x = y = 0 : z − 4 = 0, donc z = 4.' },
      { id: 'q5', type: 'tf', prompt: 'Vrai ou faux : u(1, 2, 3) et v(2, 4, 6) sont colinéaires.', answer: true, explanation: 'Vrai : v = 2u.' },
    ],
  },
];
