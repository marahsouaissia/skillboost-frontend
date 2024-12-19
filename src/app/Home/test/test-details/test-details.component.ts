import { Component, OnDestroy } from '@angular/core'; // Import OnDestroy
import { FormsModule } from "@angular/forms";
import { TestModel } from "../../../models/test.model";
import { ActivatedRoute, Router } from "@angular/router";
import { TestServiceService } from "../../../services/test.service.service";
import { QuestionModel } from "../../../models/question.model";
import { NgForOf, NgIf } from "@angular/common";
import { AnswerService } from "../../../services/answer.service";

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnDestroy {
  questions: QuestionModel[] = [];
  currentQuestionIndex: number = 0;
  testid: any;
  test: TestModel;
  userAnswers: { [key: string]: string } = {};
  selectedAnswer: string = '';
  timer: number = 0; // Countdown timer in seconds
  interval: any; // Reference to the interval for clearing on destroy
  minutes: number = 0; // Remaining minutes
  seconds: number = 0; // Remaining seconds

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private testservice: TestServiceService,
    private answerService: AnswerService
  ) {
    this.testid = this.activeroute.snapshot.paramMap.get('id');
    this.testservice.getTestById(this.testid).subscribe((res) => {
      this.test = res;
      this.questions = this.test.questions;
      this.timer = res.duration * 60; // Convert duration from minutes to seconds
      this.updateTimeDisplay(); // Initial time calculation
      this.startTimer();
    });
  }

  // Start the countdown timer
  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.interval); // Stop the timer when it reaches zero
        this.router.navigate(['']); // Redirect to home page
      }
    }, 1000); // Update every second
  }

  // Update the minutes and seconds display
  updateTimeDisplay(): void {
    this.minutes = Math.floor(this.timer / 60);
    this.seconds = this.timer % 60;
  }

  // Stop the timer when the component is destroyed
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onSubmit(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.userAnswers[currentQuestion._id] = this.selectedAnswer;

    this.selectedAnswer = '';

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submitAnswersToBackend();
    }
  }

  submitAnswersToBackend(): void {
    const payload = {
      testId: this.testid,
      answers: Object.keys(this.userAnswers).map((questionId) => ({
        question: questionId,
        selectedAnswer: this.userAnswers[questionId]
      }))
    };

    this.answerService.submitAnswers(payload).subscribe(
      (response) => {
        this.router.navigate(['/success']);
      },
      (error) => {
        console.error('Error submitting answers:', error);
      }
    );
  }
}
