import {QuestionModel} from "./question.model";

export class TestModel {
  _id: string;
  title: string;
  description: string;
  logo: any;
  duration: number;
  numberOfQuestions: number;
  createdAt: Date;
  questions: QuestionModel[];


  constructor(title: string, description: string, logo: any, duration: number, numberOfQuestions: number, createdAt: Date, questions: QuestionModel[]) {
    this.title = title;
    this.description = description;
    this.logo = logo;
    this.duration = duration;
    this.numberOfQuestions = numberOfQuestions;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
