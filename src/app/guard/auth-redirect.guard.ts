import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the 'jwt' cookie exists
    const token = this.cookieService.get('jwt');
    if (token) {
      // User is already logged in, redirect to the home page (or another protected page)
      this.router.navigate(['']);
      return false; // Prevent access to login page
    } else {
      // User is not logged in, allow access to the login page
      return true;
    }
  }
}
