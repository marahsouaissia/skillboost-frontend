import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CvService } from "../../services/cv.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-upload-cv',
  standalone: true,
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.scss'],
  imports: [
    CommonModule, // Ensures Angular directives like *ngIf work
    FormsModule,
    NgIf
  ]

})
export class UploadCvComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedfile: File | null = null;
  cvPreviewUrl: SafeUrl | null = null; // For the CV preview in the popup
  showModal: boolean = false; // To toggle the popup visibility
  cvs: any[] = []; // List of all CVs

  constructor(
    private cvservice: CvService,
    private sanitizer: DomSanitizer
  ) {

    this.fetchAllCvs()
  }
  previewCv(cvPath: string): void {
    this.cvPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `http://localhost:3000${cvPath}`
    );
    this.showModal = true;
  }
  // Handle file selection
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedfile = input.files[0];
    }
  }

  // Submit and upload the CV
  updateCv(): void {
    if (!this.selectedfile) {
      this.errorMessage = "Aucun fichier sélectionné !";
      return;
    }

    this.cvservice.updateCv(this.selectedfile).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.successMessage = "CV téléchargé avec succès.";
          const filePath = response.body.file.path; // Adjust as per backend response

          // Convert the file path to a secure URL
          this.cvPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `http://localhost:3000${filePath}`
          );
          this.showModal = true; // Show the popup
        }
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du CV :", err);
        this.errorMessage = "Une erreur est survenue lors de l'envoi.";
      },
    });
  }
  fetchAllCvs(): void {
    this.cvservice.getAllCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: (err) => {
        console.error("Error fetching CVs:", err);
        this.errorMessage = "An error occurred while fetching CVs.";
      }
    });
  }
  // Close the modal
  closeModal(): void {
    this.showModal = false;
    window.location.reload();
  }
}
