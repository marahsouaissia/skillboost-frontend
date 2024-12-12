import { Component, OnInit } from '@angular/core';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf
  ],
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  navItems = [
    { label: 'Dashboard', icon: faDashboard },
    { label: 'Locations', icon: faLocation },
    { label: 'Shops', icon: faShop },
    { label: 'Products', icon: faBox },
    { label: 'Sales', icon: faMoneyBill },
    { label: 'Statistics', icon: faChartBar },
    { label: 'Contact', icon: faContactBook },
    { label: 'Help', icon: faHand },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
