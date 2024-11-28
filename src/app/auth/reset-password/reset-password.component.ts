import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(private router: Router) {}

  onSubmit(formValue: any): void {
    // Handle form submission, e.g., send to API
    console.log('Password reset form submitted:', formValue);

    // After successful password reset, redirect to login
    this.router.navigate(['/login']);
  }
}
