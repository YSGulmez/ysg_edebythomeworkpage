export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface SortSentence {
  id: string;
  text: string;
  type: 'dash' | 'paren';
  ruleName?: string;
  explanation?: string;
}
