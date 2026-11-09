# Revue d'équipe — MyChildCompanion V1 (Massar) — 8 novembre 2026

Rôles convoqués : expert programme scolaire Massar, pédagogue (didactique et évaluation), psychologue de l'enfant et de l'adolescent, UX designer enfant, développeur mobile, QA, juriste données personnelles (mineurs).

## Synthèse

- **Périmètre V1** : système Massar (public et privé), du CP (1AP) à la 2e année du bac (2BAC). Les missions étrangères (française, américaine, britannique) sont prévues en V2 : le modèle de données accepte déjà un champ `system`.
- **Un seul code** (Expo / React Native) pour le web, Android (APK) et iOS (web installable en attendant un compte Apple Developer).
- **Hors ligne, tout sur l'appareil** : aucun compte, aucun serveur, aucune donnée d'enfant ne sort du téléphone.
- **Trois points majeurs** : le corrigé est derrière le mot de passe parent ; l'enfant voit toujours ce qui est juste et ce qui est « à revoir » (sans la réponse) pour pouvoir réessayer ; le compagnon félicite l'effort, jamais l'intelligence, et ne compare jamais.
- **Décision demandée** : faire relire le contenu pédagogique par un enseignant de chaque cycle avant diffusion hors famille (voir C-01).

## Structure Massar retenue (source : organisation du système éducatif marocain)

| Cycle | Niveaux | Notation | Examen certificatif |
|---|---|---|---|
| Primaire | 1AP → 6AP | sur 10 | 6AP : examen provincial (certificat d'études primaires) |
| Collège | 1AC → 3AC | sur 20 | 3AC : examen régional |
| Lycée | Tronc commun, 1BAC, 2BAC | sur 20 | 1BAC : examen régional ; 2BAC : examen national |

Matières par cycle : voir [`src/data/curriculum.ts`](../src/data/curriculum.ts). Les matières scientifiques du collège et du lycée sont proposées en français (option internationale « BIOF ») ; la langue d'enseignement est un réglage du profil enfant.

## Constats

| # | Rôle | Gravité | Constat | Conséquence | Recommandation | Décideur |
|---|---|---|---|---|---|---|
| C-01 | Expert programme | Bloquant pour diffusion publique | Le contenu V1 est rédigé à partir des orientations du programme, pas des manuels agréés. | Un écart avec le manuel de la classe peut dérouter l'enfant. | Mention « contenu à valider par un enseignant » dans l'app ; relecture par cycle avant toute diffusion hors famille. | Toi |
| C-02 | Pédagogue | Majeur | Donner le corrigé immédiatement pousse à recopier sans chercher. | Pas d'apprentissage. | L'enfant voit juste / à revoir, réessaie une fois les questions à revoir ; le corrigé détaillé s'ouvre avec le parent. | Appliqué |
| C-03 | Pédagogue | Majeur | Les questions ouvertes (rédaction, démonstration) ne se corrigent pas automatiquement. | Note fausse si on les ignore. | Type `open` : corrigé type visible par le parent, qui attribue les points ; la note reste « provisoire » tant que ce n'est pas fait. | Appliqué |
| C-04 | Psychologue | Bloquant | Un message négatif (« nul », « raté », « mauvais ») après une note basse abîme la confiance. | Décrochage, anxiété. | Bibliothèque de messages fermée, vérifiée par un script (`npm run check:tone`) qui refuse les mots interdits. | Appliqué |
| C-05 | Psychologue | Majeur | Le chronomètre stresse les petits. | Anxiété d'examen. | Chrono désactivé par défaut en primaire, optionnel ailleurs ; exercice de respiration proposé avant chaque examen blanc. | Appliqué |
| C-06 | Psychologue | Majeur | Un enfant qui dit être triste ou stressé plusieurs jours de suite a besoin d'un adulte, pas d'une app. | Signal manqué. | Météo de l'humeur ; après trois jours difficiles, l'app invite doucement à en parler à papa ou maman, et le parent le voit dans son espace. | Appliqué |
| C-07 | UX enfant | Majeur | Les petits (1AP–2AP) lisent peu. | Blocage. | Gros boutons, emojis, consignes courtes, couleurs par matière ; « à revoir » en orange, jamais en rouge. | Appliqué |
| C-08 | Juriste | Majeur | Données de mineurs (loi 09-08, CNDP). | Risque si collecte. | Aucune collecte : stockage local uniquement, pas d'analytics, pas de publicité. À revoir si un mode cloud est ajouté. | Appliqué |
| C-09 | Sécurité / QA | Mineur | Le mot de passe parent est une barrière locale (haché SHA-256 avec sel) : un enfant qui efface les données de l'app la contourne, mais perd aussi sa progression. | Fausse impression de sécurité forte. | Le dire honnêtement dans l'espace parent ; code de secours donné à la création pour le mot de passe oublié. | Appliqué |

## Charte d'accompagnement (règles du compagnon « Najm »)

1. Féliciter l'effort, la persévérance et la stratégie, pas le « don ».
2. Ne jamais comparer à un autre enfant, ni à la moyenne de la classe.
3. Une note basse est une information sur ce qu'on va travailler ensemble, pas un jugement.
4. Proposer toujours une prochaine petite étape concrète.
5. Mots interdits (vérifiés automatiquement) : nul, nulle, raté, ratée, échec, mauvais, mauvaise, idiot, bête, honte, décevant, décevante, paresseux, paresseuse, faible, catastrophe.
6. Ton chaleureux, comme un parent : prénom de l'enfant, tutoiement, phrases courtes.
7. Si l'enfant va mal, orienter vers un adulte de confiance.

## Désaccords entre experts

- **Pédagogue contre psychologue sur l'affichage des erreurs** : le pédagogue veut montrer la bonne réponse tout de suite, le psychologue craint la frustration de « voir faux ». Arbitrage : afficher « à revoir » sans la réponse, une seconde chance, puis corrigé avec le parent (moment d'échange familial).

## Prochaines actions

- Relecture du contenu par un enseignant de chaque cycle (toi).
- V2 : missions française, américaine et britannique ; banque de contenu étendue ; option cloud multi-appareils.
- Compte Apple Developer pour publier l'app iOS native (TestFlight puis App Store).
