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
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  navItems = [
    { label: 'Dashboard', icon: faDashboard, route: '/dashboard' },
    { label: 'Tests', icon: faLocation, route: '/manage-test' },
    { label: 'Users', icon: faLocation, route: '/manage-user' },
    { label: 'Badge', icon: faLocation, route: '/manage-badge' },
    { label: 'Statistics', icon: faChartBar, route: '/statistics' },
    { label: 'Contact', icon: faContactBook, route: '/contact' },
    { label: 'Help', icon: faHand, route: '/help' },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
