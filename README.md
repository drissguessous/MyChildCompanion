# Oustadati · أستاذتي · ⵜⴰⵙⵍⵎⴰⴷⵜ ⵉⵏⵓ

Application d’accompagnement scolaire bienveillant pour les élèves marocains du **système Massar** (public et privé), du CP (1AP) à la 2e année du bac. Un professeur-compagnon, dont l’enfant choisit le prénom et le visage, l’encourage comme un parent.

| Accès | Lien |
|---|---|
| Web (et iPhone : Partager → « Sur l’écran d’accueil ») | https://drissguessous.github.io/MyChildCompanion/ |
| APK Android | [Releases → latest](https://github.com/drissguessous/MyChildCompanion/releases/latest) |
| iOS natif | prêt pour EAS Build, en attente d’un compte Apple Developer |

## Fonctions

- **Programme Massar** : 12 niveaux, toutes les matières, thèmes du programme indexés ([`src/data/programme.ts`](src/data/programme.ts)) ; cours rédigés, exercices et examens blancs (6AP provincial, 3AC et 1BAC régionaux, 2BAC national) dans [`src/data/content/`](src/data/content) et [`src/data/exams.ts`](src/data/exams.ts).
- **Recherche** filtrable par cycle, niveau, matière et type (cours, examens, thèmes à venir).
- **Correction automatique** et notes sur 10 (primaire) ou 20 (collège, lycée) ; l’enfant voit « juste » ou « à revoir » et a une seconde chance ; le **corrigé détaillé** s’ouvre avec le **mot de passe parent**, qui note aussi les questions rédigées.
- **Entraînement illimité** : 18 générateurs d’exercices ([`src/lib/generators.ts`](src/lib/generators.ts)).
- **Bilan de positionnement → plan de mise à niveau** de 2 à 4 semaines, points fragiles d’abord, répétition espacée, jour de repos ([`src/lib/plan.ts`](src/lib/plan.ts)) ; **mission du jour** de 3 tâches.
- **Rappels planifiés** (Android / iOS) : notification à l’heure choisie par le parent, chaque jour de travail du plan, et la veille d’un examen blanc ([`src/lib/reminders.ts`](src/lib/reminders.ts)).
- **Impression PDF** : cours, fiches d’exercices, sujets, corrigés, plan, diplôme d’effort.
- **Accompagnement** : messages bienveillants accordés au genre de l’enfant et du professeur, météo de l’humeur, exercice de respiration, alerte douce au parent après plusieurs jours difficiles, badges d’effort, défi famille, invitation à partager.
- **Langues** : français, arabe (de droite à gauche), amazigh en tifinagh (**bêta**, à faire relire).
- **Hors ligne et privé** : tout reste sur l’appareil, aucun compte, aucune publicité.

## Démo

Au premier lancement, « Découvrir avec la démo » charge une base de simulation ([`src/data/simulation.ts`](src/data/simulation.ts)) : Yasmine (4AP), Adam (2AC), Salma (2BAC), avec notes, bilans, plans, humeurs et rappels. **Mot de passe parent : `1234`**, code de secours : `DEMO-2026`.

## Développement

```bash
npm install
npm run web          # navigateur
npm run android      # appareil ou émulateur
npm test             # types, charte de ton, couverture arabe, contenu et logique
```

Les choix pédagogiques et les règles du compagnon sont dans [`docs/revue-experts.md`](docs/revue-experts.md). Le contenu est indicatif et doit être validé par un enseignant avant diffusion hors famille.
