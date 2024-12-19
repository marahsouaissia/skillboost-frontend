import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {CommonModule} from "@angular/common";
import {UploadCvComponent} from "./upload-cv/upload-cv.component";
import {TableModule} from "primeng/table";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {TestdeailsprofileComponent} from "./testdeailsprofile/testdeailsprofile.component";
import {MatDialog} from "@angular/material/dialog";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {AnswerService} from "../services/answer.service";
import {TestModel} from "../models/test.model";
import {CertificateComponent} from "../certificate/certificate.component";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

export interface test {
  nom: string;
  pourcentage : number;
  score: string;
  dure: number;
  date : Date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [CommonModule, FormsModule, UploadCvComponent, TableModule, ButtonDirective, Ripple, Button, ProfileDetailsComponent], // Import necessary modules directly
  standalone: true
})
export class ProfileComponent implements OnInit{
  image: any = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  currenttab = 0;
  Tests: test[] = []; //
  user : User | null;
  scors:any
  constructor(  private dialog : MatDialog,private router: Router, private renderer: Renderer2,private answerser : AnswerService,private userservice : UserService) {
    this.answerser.getscore().subscribe((data: TestModel[]) => {
      this.scors = data;
      console.log(this.scors)
    });
  this.userservice.getCurrentUser().subscribe((data) => {
      this.user = data.body;
    });
  } // Inject Router into the component
  ngOnInit() {
    this.fillProducts(); // Fill the products array on component initialization

  }
  fillProducts(): void {
    this.Tests = [
      { nom: 'HTML', pourcentage: 10, score: 'A', dure: 60, date: new Date('2024-01-10') },
      { nom: ' CSS', pourcentage: 90, score: 'A', dure: 45, date: new Date('2024-02-15') },
      { nom: ' JavaScript', pourcentage: 78, score: 'B+', dure: 70, date: new Date('2024-03-20') },
      { nom: ' Angular', pourcentage: 60, score: 'A', dure: 90, date: new Date('2024-04-05') },
      { nom: ' Node.js', pourcentage: 55, score: 'A+', dure: 100, date: new Date('2024-05-12') },
      { nom: ' TypeScript', pourcentage: 80, score: 'B', dure: 60, date: new Date('2024-06-18') },
      { nom: ' SQL', pourcentage: 30, score: 'B-', dure: 50, date: new Date('2024-07-22') },
      { nom: ' Python', pourcentage: 87, score: 'A-', dure: 80, date: new Date('2024-08-30') },
      { nom: ' React', pourcentage: 57, score: 'A', dure: 95, date: new Date('2024-09-12') },
      { nom: ' Vue.js', pourcentage: 84, score: 'B+', dure: 65, date: new Date('2024-10-03') }
    ];
  }
  getProgressBarClass(scoretest: number): string {
    if (scoretest > 90) {
      return 'high-progress'; // Vert pour les scores > 90
    } else if (scoretest >= 70) {
      return 'medium-progress'; // Orange pour les scores entre 70 et 90
    } else if (scoretest >= 50) {
      return 'medium-progress'; // Orange pour les scores entre 50 et 70
    } else {
      return 'low-progress'; // Rouge pour les scores < 50
    }
  }

// Méthode pour ouvrir le dialog
  opendialog(test: any): void {
    if (this.user == null) return;

    let badgeImage: string = '';
    const scoretest = (test.score / test.totalQuestions) * 100; // Calcul du pourcentage de score
    const progressBarClass = this.getProgressBarClass(scoretest); // Récupérer la classe de couleur de la barre

    // Conditions pour déterminer l'image du badge
    // if (scoretest > 90) {
    //   badgeImage = 'assets/images/badge-or.png'; // Image du badge en or
    // } else
    if (scoretest >= 75) {
      badgeImage = 'assets/images/badge-or.png'; // Image du badge en or
    } else if (scoretest >= 60) {
      badgeImage = 'assets/images/badge-argent.png'; // Image du badge en argent
    } else if (scoretest >= 50) {
      badgeImage = 'assets/images/badge-bronze.png'; // Image du badge en bronze
    } else {
      badgeImage = 'assets/images/badge-fail.png'; // Image pour échec
    }

    // Ouvrir un certificat si le score est supérieur ou égal à 90
    if (scoretest >= 90) {
      const dialogRef = this.dialog.open(CertificateComponent, {
        height: '220mm',
        width: '267mm', // Dimensions fixes pour un affichage optimal
        data: {
          user: this.user,
          test: test,
          progressBarClass: progressBarClass, // Passe la classe de progression
          badgeImage: badgeImage, // Passe l'image du badge
        },
        panelClass: 'custom-dialog',
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          // Gérer le résultat si nécessaire
        }
      });
    } else {
      // Sinon, afficher les détails du test
      const dialogRef = this.dialog.open(TestdeailsprofileComponent, {
        height: 'auto',
        width: '600px',
        data: {
          imageUrl: badgeImage, // Passe l'image du badge
          progressBarClass: progressBarClass, // Passe la classe CSS pour la barre
        },
        panelClass: 'custom-dialog',
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          // Gérer le résultat si nécessaire
        }
      });
    }
  }

  // Method to handle file upload and update avatar image


  navigateToJobOpportunities(): void {
    this.router.navigate(['/job_opportunities']); // Navigate to the correct route
  }


  selectedCV: string = 'Mon cv.pdf'; // Fichier téléchargé précédemment
  selectedFile: File | null = null;

  // Méthode pour gérer la sélection du CV
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Fichier CV sélectionné:', file.name);
      this.selectedCV = file.name; // Mise à jour avec le fichier nouvellement sélectionné
    }
  }


  profileImage: string = '/assets/images/upload-img.PNG'; // Default profile image

  // Handle the file selection and update the image preview

}




