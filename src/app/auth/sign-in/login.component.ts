import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    console.log('1');

    // Création du formulaire avec email et password seulement
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    // Validate form inputs
    if (!email || !password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    // Call the login method from UserService
    this.userService.login(email, password).subscribe({
      next: async (res) => {
        console.log('Réponse API:', res);
        this.successMessage = "Connexion réussie ! Bienvenue.";
        const token = res.body?.token;
        if (token) {
          this.userService.savetoken(token);  // 1-day expiry
          await this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);  // Optionally log the error
        this.errorMessage = err.error?.message || "Une erreur est survenue lors de la connexion.";
      }
    });
  }


}
