import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {ButtonDirective} from "primeng/button";
import {ActivatedRoute, Router} from "@angular/router";
import {TestServiceService} from "../../../services/test.service.service";
import {TestModel} from "../../../models/test.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirm-test',
  standalone: true,
  imports: [
    MatCard,
    ButtonDirective,
    NgIf
  ],
  templateUrl: './confirm-test.component.html',
  styleUrl: './confirm-test.component.scss'
})
export class ConfirmTestComponent {
  testid : any ;
  test:TestModel;
  apiUrl = 'http://localhost:3000'; // URL de votre backend

  constructor(private router: Router,private activeroute : ActivatedRoute,private  testservice: TestServiceService) {
    this.testid = this.activeroute.snapshot.paramMap.get('id');
    this.testservice.getTestById(this.testid).subscribe((res)=>{
      this.test=res;
    })
  }

  startTest() {
    // Redirection vers la page des questions
    this.router.navigate([`/test-details/${this.test._id}`]);
    console.log('TestModel démarré');
  }
  navigateToTest(test: any) {
    this.router.navigate(['/confirm-test'], { state: { test } });

  }
}
