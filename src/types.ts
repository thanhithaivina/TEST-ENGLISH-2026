export type QuestionType = 'use_of_english' | 'reading' | 'writing' | 'speaking';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  vietnameseTranslation?: string;
  passage?: string; // For reading comprehension passage
}

export interface TestSet {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number; // -1 if not answered
  isCorrect: boolean;
}

export interface TestAttempt {
  id: string;
  testSetId: string;
  testSetTitle: string;
  score: number; // Correct answers count
  totalQuestions: number;
  percentage: number;
  dateStr: string;
  spentTimeSeconds: number;
  answers: UserAnswer[];
  recommendedLevel: string; // "Bậc 2 (A2)" | "Bậc 3 (B1)" | "Bậc 4 (B2)" | "Bậc 5 (C1)" etc.
}
