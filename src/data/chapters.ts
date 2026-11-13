import { COLLEGE_CHAPTERS } from './content/college';
import { GEN_ANGLAIS_PHILO } from './content/gen-anglais-philo';
import { GEN_ARABE } from './content/gen-arabe';
import { GEN_FRANCAIS_PRIMAIRE } from './content/gen-francais-primaire';
import { GEN_FRANCAIS_SECONDAIRE } from './content/gen-francais-secondaire';
import { GEN_HG_EVEIL } from './content/gen-hg-eveil';
import { GEN_ISLAMIQUE_PRIMAIRE } from './content/gen-islamique-primaire';
import { GEN_ISLAMIQUE_SECONDAIRE } from './content/gen-islamique-secondaire';
import { GEN_MATH_PRIMAIRE } from './content/gen-math-primaire';
import { GEN_MATH_SECONDAIRE } from './content/gen-math-secondaire';
import { GEN_SCIENCES } from './content/gen-sciences';
import { EXTRA_CHAPTERS } from './content/extra';
import { LYCEE_CHAPTERS } from './content/lycee';
import { PRIMAIRE_CHAPTERS } from './content/primaire';
import type { Chapter } from './types';

export const CHAPTERS: Chapter[] = [...PRIMAIRE_CHAPTERS, ...COLLEGE_CHAPTERS, ...LYCEE_CHAPTERS, ...EXTRA_CHAPTERS, ...GEN_ANGLAIS_PHILO, ...GEN_ARABE, ...GEN_FRANCAIS_PRIMAIRE, ...GEN_FRANCAIS_SECONDAIRE, ...GEN_HG_EVEIL, ...GEN_ISLAMIQUE_PRIMAIRE, ...GEN_ISLAMIQUE_SECONDAIRE, ...GEN_MATH_PRIMAIRE, ...GEN_MATH_SECONDAIRE, ...GEN_SCIENCES];
