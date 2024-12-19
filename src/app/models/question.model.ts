export class QuestionModel {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  test: string;
  choicesString?: string;
}
