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

  constructor(  private dialog : MatDialog,private router: Router, private renderer: Renderer2) {
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
  getProgressBarColor(pourcentage: number): string {
    if (pourcentage < 40) {
      return 'low-progress';
    } else if (pourcentage >= 40 && pourcentage <= 70) {
      return 'medium-progress';
    } else {
      return 'high-progress';
    }
  }

  // Method to open the dialog
  // Method to open the dialog
  opendialog(test: any): void {
      let badgeImage: string = '';

    // Conditions pour déterminer l'image du badge
    if (test.pourcentage > 90) {
      badgeImage = 'path/to/certification-image.png'; // Image de certification
    } else if (test.pourcentage >= 80) {
      badgeImage = 'assets/images/badge-or.png'; // Image du badge en or
    } else if (test.pourcentage >= 70) {
      badgeImage = 'assets/images/badge-argent.png'; // Image du badge en argent
    } else if (test.pourcentage >= 60) {
      badgeImage = 'assets/images/badge-bronze.png'; // Image du badge en bronze
    }

    const dialogRef = this.dialog.open(TestdeailsprofileComponent, {
      height: 'auto',
      width: '600px', // Set a fixed width for better appearance
      data: {
        imageUrl: badgeImage // Pass the image URL to the dialog
      },
      panelClass: 'custom-dialog', // Add this line for custom styling
    });



    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // Handle the result if needed
      }
    });
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




