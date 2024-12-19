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
    const role = this.cookieService.get('role');

    if (token) {
      // Redirect based on the user's role
      if (role === 'admin') {
        this.router.navigate(['/admin-main']); // Redirect to admin dashboard
      } else {
        this.router.navigate(['/profile']); // Redirect to user profile or another page
      }
      return false; // Prevent access to login/signup pages
    }

    // User is not logged in, allow access to the page
    return true;
  }
}
