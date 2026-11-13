import type { Chapter } from '../types';

/** 2BAC Mathématiques (option internationale) : leçons du programme officiel, groupe o-2bac-math-1. */
export const GEN_O_2BAC_MATH_1: Chapter[] = [
  {
    id: '2BAC-math-o1', levelId: '2BAC', subjectId: 'math', title: "Suites numériques : limite d'une suite", lang: 'fr',
    objectives: ["Calculer la limite d'une suite à l'aide des règles usuelles", "Utiliser les théorèmes de convergence (monotonie, comparaison)", "Déterminer la limite d'une suite récurrente u(n+1) = f(u(n))"],
    lesson: [
      { type: 'h', text: 'Suites convergentes et divergentes' },
      { type: 'p', text: "Une suite (u(n)) converge vers un réel l si les termes u(n) deviennent aussi proches de l que l'on veut pour n assez grand. Sinon, elle diverge (par exemple vers +∞ ou sans limite, comme (-1)^n)." },
      { type: 'rule', text: "Suites géométriques : si -1 < q < 1, alors q^n → 0 ; si q > 1, alors q^n → +∞ ; si q = 1, q^n = 1 ; si q ≤ -1, (q^n) n'a pas de limite. Toute suite croissante et majorée converge ; toute suite décroissante et minorée converge." },
      { type: 'list', items: ["Comparaison : si u(n) ≥ v(n) et v(n) → +∞, alors u(n) → +∞.", "Gendarmes : si v(n) ≤ u(n) ≤ w(n) et v(n), w(n) → l, alors u(n) → l.", "Suite récurrente : si u(n+1) = f(u(n)), u(n) → l et f continue en l, alors l = f(l)."] },
      { type: 'example', text: "u(n) = (2n + 1)/(n + 3). On factorise par n : u(n) = (2 + 1/n)/(1 + 3/n) → 2. Autre exemple : u(0) = 1 et u(n+1) = 0,5·u(n) + 3. Si la suite converge vers l, alors l = 0,5·l + 3, donc l = 6." },
      { type: 'tip', text: "Devant une forme indéterminée, pense à factoriser par le terme dominant : c'est souvent la clé, et avec un peu d'entraînement cela devient un réflexe." },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'Calcule la limite de u(n) = (3n² + 1)/(n² + 5).', answer: 3, explanation: 'On factorise par n² : u(n) = (3 + 1/n²)/(1 + 5/n²). Les termes 1/n² et 5/n² tendent vers 0, donc u(n) → 3/1 = 3.' },
      { id: 'q2', type: 'tf', prompt: 'Vrai ou faux : la suite (0,5)^n tend vers 0.', answer: true, explanation: 'Vrai : 0,5 est strictement compris entre -1 et 1, donc (0,5)^n → 0.' },
      { id: 'q3', type: 'qcm', prompt: "La suite définie par u(0) = 1 et u(n+1) = 0,5·u(n) + 3 converge. Quelle est sa limite ?", choices: ['3', '1,5', '6'], answer: 2, explanation: "La fonction f(x) = 0,5x + 3 est continue ; la limite l vérifie l = 0,5l + 3, soit 0,5l = 3, donc l = 6." },
      { id: 'q4', type: 'qcm', prompt: 'Une suite croissante et majorée est…', choices: ['convergente', 'divergente vers +∞', 'forcément constante'], answer: 0, explanation: "C'est le théorème de convergence monotone : toute suite croissante et majorée converge (vers un réel inférieur ou égal au majorant)." },
      { id: 'q5', type: 'number', prompt: 'On sait que 2 - 1/n ≤ u(n) ≤ 2 + 1/n pour tout n ≥ 1. Quelle est la limite de u(n) ?', answer: 2, explanation: "Les deux suites 2 - 1/n et 2 + 1/n tendent vers 2. D'après le théorème des gendarmes, u(n) → 2." },
    ],
  },
  {
    id: '2BAC-math-o2', levelId: '2BAC', subjectId: 'math', title: 'Fonctions primitives', lang: 'fr',
    objectives: ["Connaître la définition d'une primitive", 'Utiliser le tableau des primitives usuelles', 'Déterminer la primitive qui vérifie une condition donnée'],
    lesson: [
      { type: 'h', text: "Qu'est-ce qu'une primitive ?" },
      { type: 'rule', text: "F est une primitive de f sur un intervalle I si F est dérivable sur I et F'(x) = f(x) pour tout x de I. Toute fonction continue sur I admet des primitives ; elles sont de la forme F(x) + c (c réel). Pour x0 de I et y0 donné, il existe une unique primitive qui vaut y0 en x0." },
      { type: 'list', items: ['x^n (n ≠ -1) → x^(n+1)/(n+1)', '1/x → ln|x| ; e^x → e^x', 'cos x → sin x ; sin x → -cos x', "u'·u^n → u^(n+1)/(n+1) (n ≠ -1) ; u'/u → ln|u| ; u'·e^u → e^u", "u'/(2√u) → √u (u > 0)"] },
      { type: 'example', text: "Primitive de f(x) = 2x + 1 qui vaut 3 en 0 : F(x) = x² + x + c, et F(0) = c = 3, donc F(x) = x² + x + 3. Primitive de g(x) = 2x/(x² + 1) : on reconnaît u'/u avec u = x² + 1 > 0, donc G(x) = ln(x² + 1)." },
      { type: 'tip', text: "Vérifie toujours ta réponse en dérivant ta primitive : si tu retrouves f, c'est gagné !" },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'F est la primitive de f(x) = 2x + 1 sur ℝ telle que F(0) = 3. Calcule F(2).', answer: 9, explanation: 'F(x) = x² + x + 3, donc F(2) = 4 + 2 + 3 = 9.' },
      { id: 'q2', type: 'qcm', prompt: 'Une primitive de cos x sur ℝ est…', choices: ['-sin x', 'sin x', '-cos x'], answer: 1, explanation: "(sin x)' = cos x, donc sin x est une primitive de cos x." },
      { id: 'q3', type: 'qcm', prompt: 'Une primitive de e^(2x) sur ℝ est…', choices: ['2e^(2x)', 'e^(2x)', 'e^(2x)/2'], answer: 2, explanation: "La dérivée de e^(2x)/2 est (1/2)·2e^(2x) = e^(2x)." },
      { id: 'q4', type: 'tf', prompt: 'Vrai ou faux : toute fonction continue sur un intervalle admet des primitives sur cet intervalle.', answer: true, explanation: "Vrai : c'est un théorème du cours. Ces primitives diffèrent entre elles d'une constante." },
      { id: 'q5', type: 'text', prompt: 'Donne une primitive de 2x/(x² + 1) sur ℝ (écris par exemple ln(x²+1)).', accept: ['ln(x²+1)', 'ln(x^2+1)', 'ln(x2+1)', 'ln(1+x²)', 'ln(1+x^2)', 'ln (x²+1)', 'ln (x^2+1)', 'ln(x² + 1)', 'ln(x^2 + 1)'], explanation: "On reconnaît u'/u avec u(x) = x² + 1, strictement positive. Une primitive est ln(x² + 1)." },
    ],
  },
  {
    id: '2BAC-math-o3', levelId: '2BAC', subjectId: 'math', title: 'Nombres complexes (partie 2)', lang: 'fr',
    objectives: ['Passer de la forme algébrique à la forme trigonométrique et exponentielle', 'Résoudre dans ℂ une équation du second degré à coefficients réels', 'Écrire l’expression complexe d’une translation, d’une homothétie, d’une rotation'],
    lesson: [
      { type: 'h', text: 'Forme trigonométrique et exponentielle' },
      { type: 'rule', text: "Tout complexe non nul s'écrit z = r(cos θ + i sin θ) = r·e^(iθ), avec r = |z| et θ = arg z [2π]. On a e^(iθ)·e^(iθ') = e^(i(θ+θ')) et (e^(iθ))^n = e^(inθ) (formule de Moivre). Formules d'Euler : cos θ = (e^(iθ) + e^(-iθ))/2 et sin θ = (e^(iθ) - e^(-iθ))/(2i)." },
      { type: 'p', text: "Équation az² + bz + c = 0 (a, b, c réels, a ≠ 0), Δ = b² - 4ac : si Δ < 0, les deux solutions sont complexes conjuguées : z = (-b ± i√(-Δ))/(2a)." },
      { type: 'list', items: ["Translation de vecteur d'affixe b : z' = z + b", "Homothétie de centre Ω(ω), de rapport k : z' - ω = k(z - ω)", "Rotation de centre Ω(ω), d'angle θ : z' - ω = e^(iθ)(z - ω)"] },
      { type: 'example', text: "z = 1 + i : |z| = √2 et arg z = π/4, donc z = √2·e^(iπ/4). Équation z² + 2z + 5 = 0 : Δ = 4 - 20 = -16, donc z = (-2 ± 4i)/2, soit -1 + 2i et -1 - 2i." },
      { type: 'tip', text: "Pour multiplier ou élever à une puissance, la forme exponentielle est ton alliée : on multiplie les modules et on additionne les arguments." },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'Calcule le module de z = 3 + 4i.', answer: 5, explanation: '|z| = √(3² + 4²) = √25 = 5.' },
      { id: 'q2', type: 'qcm', prompt: 'Que vaut e^(iπ) ?', choices: ['1', '-1', 'i'], answer: 1, explanation: 'e^(iπ) = cos π + i sin π = -1 + 0i = -1.' },
      { id: 'q3', type: 'qcm', prompt: "Quelles sont les solutions dans ℂ de z² + 2z + 5 = 0 ?", choices: ['-1 + 2i et -1 - 2i', '1 + 2i et 1 - 2i', '-2 + i et -2 - i'], answer: 0, explanation: 'Δ = 2² - 4×5 = -16 = (4i)². Donc z = (-2 ± 4i)/2 = -1 ± 2i.' },
      { id: 'q4', type: 'tf', prompt: 'Vrai ou faux : (1 + i)² = 2i.', answer: true, explanation: 'Vrai : (1 + i)² = 1 + 2i + i² = 1 + 2i - 1 = 2i.' },
      { id: 'q5', type: 'qcm', prompt: "L'écriture complexe de la rotation de centre O et d'angle π/2 est…", choices: ["z' = z + i", "z' = 2z", "z' = iz"], answer: 2, explanation: "Rotation de centre O : z' = e^(iθ)z, et e^(iπ/2) = i, donc z' = iz." },
    ],
  },
  {
    id: '2BAC-math-o4', levelId: '2BAC', subjectId: 'math', title: 'Équations différentielles', lang: 'fr',
    objectives: ["Résoudre une équation y' = ay + b", "Résoudre une équation y'' + ay' + by = 0 grâce à l'équation caractéristique", 'Déterminer la solution vérifiant des conditions initiales'],
    lesson: [
      { type: 'h', text: "Équations du premier ordre y' = ay + b" },
      { type: 'rule', text: "Pour a ≠ 0, les solutions de y' = ay + b sont les fonctions y(x) = C·e^(ax) - b/a (C réel). En particulier, les solutions de y' = ay sont y(x) = C·e^(ax). Il existe une unique solution vérifiant y(x0) = y0." },
      { type: 'h', text: "Équations du second ordre y'' + ay' + by = 0" },
      { type: 'list', items: ["On résout l'équation caractéristique r² + ar + b = 0, de discriminant Δ.", 'Δ > 0 (racines r1, r2) : y = α·e^(r1·x) + β·e^(r2·x)', 'Δ = 0 (racine double r) : y = (αx + β)·e^(rx)', 'Δ < 0 (racines p ± iq) : y = e^(px)·(α cos(qx) + β sin(qx))'] },
      { type: 'example', text: "y' = 2y et y(0) = 3 : y(x) = C·e^(2x) et y(0) = C = 3, donc y(x) = 3e^(2x). y'' - 3y' + 2y = 0 : r² - 3r + 2 = 0 a pour racines 1 et 2, donc y = α·e^x + β·e^(2x)." },
      { type: 'tip', text: "Écris toujours l'équation caractéristique en premier : une fois les racines trouvées, la forme des solutions suit naturellement." },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: "Quelle est la seule solution constante de l'équation y' = -y + 4 ?", answer: 4, explanation: "Une constante k a une dérivée nulle : 0 = -k + 4, donc k = 4. C'est aussi -b/a avec a = -1 et b = 4." },
      { id: 'q2', type: 'qcm', prompt: "La solution de y' = 2y vérifiant y(0) = 3 est…", choices: ['y = 2e^(3x)', 'y = 3e^(2x)', 'y = 3e^x + 2'], answer: 1, explanation: 'Les solutions sont C·e^(2x) ; y(0) = C = 3, donc y = 3e^(2x).' },
      { id: 'q3', type: 'qcm', prompt: "Les solutions de y'' + 4y = 0 sont…", choices: ['α·e^(2x) + β·e^(-2x)', '(αx + β)·e^(2x)', 'α cos(2x) + β sin(2x)'], answer: 2, explanation: "r² + 4 = 0 donne r = ±2i (p = 0, q = 2). Donc y = α cos(2x) + β sin(2x)." },
      { id: 'q4', type: 'tf', prompt: "Vrai ou faux : les racines de l'équation caractéristique de y'' - 3y' + 2y = 0 sont 1 et 2.", answer: true, explanation: 'Vrai : r² - 3r + 2 = (r - 1)(r - 2).' },
      { id: 'q5', type: 'number', prompt: "f est la solution de y' = -y + 4 telle que f(0) = 1. Calcule f(0) + f'(0).", answer: 4, explanation: "f'(0) = -f(0) + 4 = -1 + 4 = 3, donc f(0) + f'(0) = 1 + 3 = 4. (On peut aussi écrire f(x) = 4 - 3e^(-x).)" },
    ],
  },
  {
    id: '2BAC-math-o5', levelId: '2BAC', subjectId: 'math', title: "Géométrie dans l'espace : produit scalaire et sphère", lang: 'fr',
    objectives: ['Calculer un produit scalaire et une distance dans un repère orthonormé', "Déterminer l'équation cartésienne d'un plan et la distance d'un point à un plan", "Reconnaître l'équation d'une sphère et étudier la position d'un plan par rapport à une sphère"],
    lesson: [
      { type: 'h', text: 'Produit scalaire dans un repère orthonormé' },
      { type: 'rule', text: "Pour u(x, y, z) et v(x', y', z') : u·v = xx' + yy' + zz' et ||u|| = √(x² + y² + z²). u et v sont orthogonaux si u·v = 0. Un plan de vecteur normal n(a, b, c) a une équation ax + by + cz + d = 0, et la distance de A(x0, y0, z0) à ce plan vaut |ax0 + by0 + cz0 + d| / √(a² + b² + c²)." },
      { type: 'h', text: 'La sphère' },
      { type: 'p', text: "La sphère de centre Ω(a, b, c) et de rayon R a pour équation (x - a)² + (y - b)² + (z - c)² = R². Si d est la distance de Ω à un plan P : d > R, P ne coupe pas la sphère ; d = R, P est tangent ; d < R, P coupe la sphère selon un cercle de rayon √(R² - d²)." },
      { type: 'example', text: "x² + y² + z² - 2x + 4y - 4 = 0 s'écrit (x - 1)² + (y + 2)² + z² = 1 + 4 + 4 = 9 : sphère de centre Ω(1, -2, 0) et de rayon 3." },
      { type: 'tip', text: "Pour reconnaître une sphère, complète les carrés pas à pas : c'est une méthode sûre et très rassurante le jour de l'examen." },
    ],
    exercises: [
      { id: 'q1', type: 'number', prompt: 'Calcule u·v pour u(1, 2, -1) et v(3, 0, 2).', answer: 1, explanation: 'u·v = 1×3 + 2×0 + (-1)×2 = 3 + 0 - 2 = 1.' },
      { id: 'q2', type: 'number', prompt: "Calcule la distance de l'origine O au plan P : 2x - y + 2z - 9 = 0.", answer: 3, explanation: 'd = |0 - 0 + 0 - 9| / √(4 + 1 + 4) = 9/3 = 3.' },
      { id: 'q3', type: 'qcm', prompt: 'Quel est le rayon de la sphère x² + y² + z² - 2x + 4y - 4 = 0 ?', choices: ['9', '3', '2'], answer: 1, explanation: "(x - 1)² + (y + 2)² + z² = 4 + 1 + 4 = 9 = 3², donc R = 3." },
      { id: 'q4', type: 'tf', prompt: "Vrai ou faux : si la distance du centre d'une sphère à un plan est égale au rayon, le plan est tangent à la sphère.", answer: true, explanation: 'Vrai : d = R signifie que le plan et la sphère ont un seul point commun.' },
      { id: 'q5', type: 'qcm', prompt: "Une sphère de rayon 5 et un plan situé à distance 3 de son centre se coupent selon un cercle de rayon…", choices: ['4', '2', '√34'], answer: 0, explanation: 'r = √(R² - d²) = √(25 - 9) = √16 = 4.' },
    ],
  },
  {
    id: '2BAC-math-o6', levelId: '2BAC', subjectId: 'math', title: "Géométrie dans l'espace : produit vectoriel", lang: 'fr',
    objectives: ['Calculer les coordonnées du produit vectoriel de deux vecteurs', "Utiliser le produit vectoriel pour calculer une aire ou trouver un vecteur normal à un plan", "Calculer la distance d'un point à une droite"],
    lesson: [
      { type: 'h', text: 'Définition et coordonnées' },
      { type: 'rule', text: "Dans un repère orthonormé direct, pour u(x, y, z) et v(x', y', z') : u ∧ v = (yz' - zy', zx' - xz', xy' - yx'). u ∧ v est orthogonal à u et à v, v ∧ u = -(u ∧ v), et u ∧ v = 0 si et seulement si u et v sont colinéaires." },
      { type: 'list', items: ['Aire du triangle ABC : (1/2)·||AB ∧ AC||', 'Si A, B, C ne sont pas alignés, AB ∧ AC est un vecteur normal au plan (ABC).', "Distance de M à la droite D(A, u) : ||AM ∧ u|| / ||u||"] },
      { type: 'example', text: "u(1, 2, 3) et v(4, 5, 6) : u ∧ v = (2×6 - 3×5, 3×4 - 1×6, 1×5 - 2×4) = (-3, 6, -3). Vérification : u·(u ∧ v) = -3 + 12 - 9 = 0." },
      { type: 'tip', text: "Après un calcul de produit vectoriel, fais le produit scalaire avec u : s'il vaut 0, tu peux avancer en confiance." },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Dans un repère orthonormé direct, i ∧ j est égal à…', choices: ['k', '-k', 'le vecteur nul'], answer: 0, explanation: '(1, 0, 0) ∧ (0, 1, 0) = (0×0 - 0×1, 0×0 - 1×0, 1×1 - 0×0) = (0, 0, 1) = k.' },
      { id: 'q2', type: 'number', prompt: "Calcule l'aire du triangle de sommets A(0, 0, 0), B(2, 0, 0) et C(0, 3, 0).", answer: 3, explanation: 'AB(2, 0, 0), AC(0, 3, 0), AB ∧ AC = (0, 0, 6), de norme 6. Aire = 6/2 = 3.' },
      { id: 'q3', type: 'tf', prompt: 'Vrai ou faux : pour tous vecteurs u et v, v ∧ u = -(u ∧ v).', answer: true, explanation: "Vrai : le produit vectoriel est antisymétrique." },
      { id: 'q4', type: 'qcm', prompt: 'u ∧ v est le vecteur nul si et seulement si…', choices: ['u et v sont orthogonaux', 'u et v sont colinéaires', 'u et v ont la même norme'], answer: 1, explanation: "u ∧ v = 0 équivaut à u et v colinéaires (en particulier si l'un d'eux est nul)." },
      { id: 'q5', type: 'number', prompt: "u(1, 2, 3) et v(4, 5, 6). Quelle est la deuxième coordonnée de u ∧ v ?", answer: 6, explanation: "Deuxième coordonnée : zx' - xz' = 3×4 - 1×6 = 12 - 6 = 6. On a u ∧ v = (-3, 6, -3)." },
    ],
  },
];
