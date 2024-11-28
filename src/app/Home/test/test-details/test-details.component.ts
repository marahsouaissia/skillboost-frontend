import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.scss'
})
export class TestDetailsComponent {
  answers: any = {
    question1: '',
    question2: ''
  };

  onSubmit(): void {
    // Handle form submission (here we just log the answers)
    console.log('Submitted Answers:', this.answers);

    // Check results logic here (for example, show correct or incorrect answers)
  }
}
