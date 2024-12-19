import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar // Import MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.cookieService.get('jwt');
    const role = this.cookieService.get('role');

    if (!token) {
      this.showSnackbar('You must log in first.');
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = next.data['role']; // Get the expected role(s) from route data
    if (expectedRoles && !this.isRoleAuthorized(role, expectedRoles)) {
      this.showSnackbar('Access denied: You do not have the required permissions.');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  // Helper to check if the user's role is authorized
  private isRoleAuthorized(userRole: string, allowedRoles: string | string[]): boolean {
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(userRole); // Check if user's role is in the allowed list
    }
    return userRole === allowedRoles; // Single role case
  }

  // Function to display the snackbar
  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-error'], // Optional: custom styling
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
