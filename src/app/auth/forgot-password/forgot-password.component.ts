import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {


  constructor(private router: Router) {}

  // Handle form submission for password reset
  onSubmit(form: any): void {
    const email = form.value.email;

    if (email) {
      // Here, you would typically send the email to your backend to handle password reset
      console.log("Email for password reset:", email);

      // Simulating a success message for now
      alert('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');

      // Optionally, redirect to login page after reset
      this.router.navigate(['/login']);
    } else {
      alert('Veuillez entrer une adresse e-mail valide.');
    }
  }

}
