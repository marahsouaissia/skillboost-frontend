import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";
import { TestServiceService } from "../../services/test.service.service";
import { TestModel } from "../../models/test.model";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  apiUrl = 'http://localhost:3000'; // Backend URL

  Tests: TestModel[] = [];
  filteredTests: TestModel[] = []; // Filtered list
  value: string = ''; // Search input value

  constructor(private router: Router, private testservice: TestServiceService) {
    // Fetch all tests
    this.testservice.getAllTests().subscribe((res) => {
      this.Tests = res;
      this.filteredTests = res; // Initialize filtered list
    });
  }

  // Update filtered list based on search input
  filterTests(): void {
    const searchTerm = this.value.toLowerCase();
    this.filteredTests = this.Tests.filter(test =>
      test.title.toLowerCase().includes(searchTerm) ||
      (test.description && test.description.toLowerCase().includes(searchTerm))
    );
  }

  navigateToTest(testItem: TestModel): void {
    console.log('Navigating to test:', testItem.title);
    this.router.navigate(['/confirm-test', testItem._id]);
  }
}
