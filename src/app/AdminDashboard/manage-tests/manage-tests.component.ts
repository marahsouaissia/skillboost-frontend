import { Component, OnInit } from '@angular/core';
import { TestModel } from '../../models/test.model';
import { QuestionModel } from '../../models/question.model';
import { TestServiceService } from "../../services/test.service.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-manage-tests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-tests.component.html',
  styleUrls: ['./manage-tests.component.scss'],
})
export class ManageTestsComponent implements OnInit {
  tests: TestModel[] = [];
  questions: QuestionModel[] = [];
  selectedTest: TestModel | null = null;
  newQuestion: QuestionModel = {
    _id: '',
    text: '',
    choices: [],
    correctAnswer: '',
    test: '',
    choicesString: '',
  };

  // Champs pour le formulaire d'ajout de test
  title: string = '';
  description: string = '';
  duration: number = 30;
  createdAt: Date = new Date();
  logo: File | null = null;

  // Champ pour le logo dans le formulaire de modification
  editLogo: File | null = null;

  constructor(private testService: TestServiceService) {}

  ngOnInit(): void {
    this.loadTests();
  }

  // Gestion de la sélection du fichier pour le logo (ajout)
  onFileSelected(event: any): void {
    this.logo = event.target.files[0];
  }

  // Gestion de la sélection du fichier pour le logo (édition)
  onLogoSelected(event: any): void {
    this.editLogo = event.target.files[0];
  }

  // Ajouter un nouveau champ de question
  addNewQuestionField(): void {
    this.questions.push({
      _id: '',
      text: '',
      choices: [],
      correctAnswer: '',
      test: '',
      choicesString: '',
    });
  }

  // Mettre à jour les choix des questions en fonction de l'entrée utilisateur
  onChoicesChange(value: string, index: number): void {
    this.questions[index].choices = value.split(',').map((choice) => choice.trim());
  }

  // Supprimer une question du formulaire d'ajout
  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  // Charger tous les tests depuis le service
  loadTests(): void {
    this.testService.getAllTests().subscribe((data: TestModel[]) => {
      this.tests = data;
    });
  }

  // Ajouter un nouveau test
  addTest(): void {
    if (!this.title || !this.description || this.duration <= 0 || this.questions.length <= 0) {
      alert('Veuillez remplir tous les champs obligatoires pour créer un test.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('duration', this.duration.toString());

    if (this.logo) {
      formData.append('logo', this.logo);
    }

    // Ajouter les questions comme une chaîne JSON
    formData.append('questions', JSON.stringify(this.questions));

    this.testService.createTest(formData).subscribe(
      (res) => {
        console.log('Nouveau test créé :', res.body);
        this.loadTests(); // Recharger les tests
        this.resetForm(); // Réinitialiser le formulaire après soumission
      },
      (error) => {
        console.error('Erreur lors de la création du test :', error);
        alert('Une erreur est survenue lors de la création du test.');
      }
    );
  }

  // Réinitialiser le formulaire d'ajout de test
  resetForm(): void {
    this.title = '';
    this.description = '';
    this.logo = null;
    this.duration = 30;
    this.questions = [];
  }

  // Ajouter une question à un test existant
  addQuestionToTest(testId: string): void {
    if (
      !this.newQuestion.text ||
      this.newQuestion.choices.length < 2 ||
      !this.newQuestion.correctAnswer
    ) {
      alert('Veuillez remplir tous les champs pour la question.');
      return;
    }

    this.testService.addQuestionToTest(testId, this.newQuestion).subscribe(
      (res) => {
        console.log('Nouvelle question créée :', res);
        this.newQuestion = {
          _id: '',
          text: '',
          choices: [],
          correctAnswer: '',
          test: '',
          choicesString: '',
        }; // Réinitialiser après l'ajout de la question
        this.loadTests();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la question :', error);
        alert('Une erreur est survenue lors de l\'ajout de la question.');
      }
    );
  }

  // Supprimer un test
  deleteTest(testId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce test ?')) {
      this.testService.deleteTest(testId).subscribe(
        () => {
          this.loadTests();
          // Si le test supprimé est celui sélectionné, annuler l'édition
          if (this.selectedTest && this.selectedTest._id === testId) {
            this.cancelEdit();
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression du test :', error);
          alert('Une erreur est survenue lors de la suppression du test.');
        }
      );
    }
  }

  // Sélectionner un test pour le modifier
  selectTest(test: TestModel): void {
    this.selectedTest = { ...test }; // Cloner l'objet pour éviter les mutations directes
    this.editLogo = null; // Réinitialiser le logo sélectionné pour l'édition
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.selectedTest = null;
    this.editLogo = null;
  }

  // Mettre à jour un test existant
  updateTest(): void {
    if (!this.selectedTest || !this.selectedTest._id) {
      alert('Le test sélectionné est invalide.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.selectedTest.title);
    formData.append('description', this.selectedTest.description);
    formData.append('duration', this.selectedTest.duration.toString());

    if (this.editLogo) {
      formData.append('logo', this.editLogo);
    }

    // Ajouter les questions comme une chaîne JSON
    formData.append('questions', JSON.stringify(this.selectedTest.questions));

    this.testService.updateTest(this.selectedTest._id, formData).subscribe(
      (res) => {
        console.log('Test mis à jour :', res.body);
        this.selectedTest = null; // Réinitialiser le test sélectionné après la mise à jour
        this.editLogo = null; // Réinitialiser le logo
        this.loadTests(); // Recharger la liste des tests
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du test :', error);
        alert('Une erreur est survenue lors de la mise à jour du test.');
      }
    );
  }

  // Supprimer une question d'un test
  deleteQuestion(questionId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      this.testService.deleteQuestion(questionId).subscribe(
        () => {
          this.loadTests();
          // Si le test édité contient la question supprimée, mettre à jour l'affichage
          if (this.selectedTest) {
            this.selectedTest.questions = this.selectedTest.questions.filter(q => q._id !== questionId);
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression de la question :', error);
          alert('Une erreur est survenue lors de la suppression de la question.');
        }
      );
    }
  }
}
