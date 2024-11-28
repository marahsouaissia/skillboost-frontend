import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-confirm-test',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './confirm-test.component.html',
  styleUrl: './confirm-test.component.scss'
})
export class ConfirmTestComponent {
  test = {
    title: 'Test Angular Basics',
    description:
      "Évaluez vos compétences fondamentales en Angular. Ce test comprend des questions sur les composants, services, directives, et bien plus encore.",
    numberOfQuestions: 20,
    duration: 30,
    level: 'Débutant',
    imageUrl: 'assets/images/angular-logo.png',
  };
  private router: any;

  startTest() {
    // Redirection vers la page des questions
    console.log('Test démarré');
  }
  navigateToTest(test: any) {
    this.router.navigate(['/confirm-test'], { state: { test } });
  }
}
