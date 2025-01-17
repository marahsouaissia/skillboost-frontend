import {Component, Inject, Input} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-testdeailsprofile',
  standalone: true,
  imports: [
    DialogModule,
    NgIf
  ],
  templateUrl: './testdeailsprofile.component.html',
  styleUrl: './testdeailsprofile.component.scss'
})
export class TestdeailsprofileComponent {
  test: any; // Receive product data as input

  constructor(
    public dialogRef: MatDialogRef<TestdeailsprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.test = data; // Assign the passed data to the product
  }

  // Optional: You can create a method to close the dialog explicitly
  closeDialog(): void {
    this.dialogRef.close();
  }
  downloadImage(): void {
    const link = document.createElement('a'); // Create an anchor element
    link.href = this.data.imageUrl; // The URL of the image
    link.download = 'badge.png'; // The name for the downloaded file

    // Trigger the download
    link.click();

    // Cleanup the anchor element
    link.remove();
  }

}
