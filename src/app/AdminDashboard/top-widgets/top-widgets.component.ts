import { Component, OnInit } from '@angular/core';
import { faFlask, faUser, faComments } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [ FontAwesomeModule],
  templateUrl: './top-widgets.component.html',
  styleUrl: './top-widgets.component.scss'
})
export class TopWidgetsComponent implements OnInit {



// Déclaration des icônes
faFlask = faFlask;
faUser = faUser;
faComments = faComments;


constructor() { }

  ngOnInit(): void {
  }

}
