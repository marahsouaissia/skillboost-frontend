import { Component, OnInit } from '@angular/core';
import {SideNavComponent} from "../side-nav/side-nav.component";
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import {TopWidgetsComponent} from "../top-widgets/top-widgets.component";
import {LastFewTransactionsComponent} from "../last-few-transactions/last-few-transactions.component";
import {TopThreeTestsComponent} from "../top-three-tests/top-three-tests.component";
import {TestByCategoryComponent} from "../test-by-category/test-by-category.component";
import {TestByMonthComponent} from "../test-by-month/test-by-month.component";

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [
    SideNavComponent,
    TopWidgetsComponent,
    LastFewTransactionsComponent,
    TopThreeTestsComponent,
    TestByCategoryComponent,
    TestByMonthComponent
  ],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.scss'
})
export class AdminMainComponent implements OnInit {

  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  constructor() { }

  ngOnInit(): void {
  }

}
