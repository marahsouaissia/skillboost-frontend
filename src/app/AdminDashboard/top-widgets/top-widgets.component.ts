import { Component, OnInit } from '@angular/core';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [ FontAwesomeModule],
  templateUrl: './top-widgets.component.html',
  styleUrl: './top-widgets.component.scss'
})
export class TopWidgetsComponent implements OnInit {

  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  constructor() { }

  ngOnInit(): void {
  }

}
