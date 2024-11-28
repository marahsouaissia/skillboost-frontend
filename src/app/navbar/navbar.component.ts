import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {HttpResponse} from "@angular/common/http";
import {filter} from "rxjs";


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  errorMessage: string
  user: User | null=null;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchUser();
    });
  }

  fetchUser(): void {

    if(!this.userService.istokeexist())
      return;


    this.userService.getCurrentUser().subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.status==200) {
          this.user = response.body;  // Get the user data from the response
          console.log('User data:', this.user);

        }
      },

    });
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussite.');
        this.userService.removeToken();
        window.location.reload();
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion :', err);
      }
    });
  }

}
