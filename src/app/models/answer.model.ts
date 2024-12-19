export interface Answer {
  question: string; // Question ID
  selectedAnswer: string; // User's chosen answer
}

export interface SubmitAnswersRequest {
  testId: string; // Test ID
  answers: Answer[]; // Array of answers
}
