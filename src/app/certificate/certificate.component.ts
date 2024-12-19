import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss'
})
export class CertificateComponent {
  user: any;
  test: any;
  today: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<CertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.test = data.test;
    console.log(this.test)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Download as Image (PNG)
  downloadAsImage(): void {
    const element = document.querySelector('.body_certificate') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'certificate.png';
      link.click();
    });
  }

  // Download as PDF
  downloadAsPDF(): void {
    const element = document.querySelector('.certificate-wrapper') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL('image/png');

      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(image, 'PNG', 10, 10, 280, 190); // Adjust dimensions for A4
      pdf.save('certificate.pdf');
    });
  }
}
