import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the cookie 'jwt' exists
    const token = this.cookieService.get('jwt');
    if (token) {
      // User is authenticated
      return true;
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
