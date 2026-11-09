export type SchoolSystem = 'massar'; // V2 : 'mission-fr' | 'american' | 'british'
export type Cycle = 'primaire' | 'college' | 'lycee';
export type Lang = 'fr' | 'ar' | 'en';

export type SubjectId =
  | 'math'
  | 'francais'
  | 'arabe'
  | 'anglais'
  | 'eveil'
  | 'svt'
  | 'pc'
  | 'hg'
  | 'islamique'
  | 'philo';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
}

export interface Level {
  id: string; // '1AP' … '2BAC'
  system: SchoolSystem;
  cycle: Cycle;
  label: string;
  short: string;
  gradeScale: 10 | 20;
  subjects: SubjectId[];
  certifyingExam?: string;
}

export type Block =
  | { type: 'h'; text: string }
  | { type: 'p'; text: string }
  | { type: 'rule'; text: string } // encadré « à retenir »
  | { type: 'example'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tip'; text: string }; // astuce bienveillante

interface QBase {
  id: string;
  prompt: string;
  points?: number; // 1 par défaut
  explanation: string; // corrigé détaillé (accès parent)
}

export type Question =
  | (QBase & { type: 'qcm'; choices: string[]; answer: number })
  | (QBase & { type: 'tf'; answer: boolean })
  | (QBase & { type: 'number'; answer: number; tolerance?: number; unit?: string })
  | (QBase & { type: 'text'; accept: string[] })
  | (QBase & { type: 'open'; modelAnswer: string });

export interface Chapter {
  id: string;
  levelId: string;
  subjectId: SubjectId;
  title: string;
  lang: Lang;
  objectives: string[];
  lesson: Block[];
  exercises: Question[];
}

export interface ExamSection {
  title: string;
  questions: Question[];
}

export interface Exam {
  id: string;
  levelId: string;
  subjectId: SubjectId;
  title: string;
  lang: Lang;
  durationMin: number;
  kind: 'controle' | 'examen-blanc';
  instructions: string;
  sections: ExamSection[];
}
