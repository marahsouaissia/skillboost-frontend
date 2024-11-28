import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,

  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.form.invalid) {
      return;
    }

    // Create user data object
    const userData = this.form.value;

    // Call the sign-up method from the user service
    this.userService.signUp(userData).subscribe({
      next: (res) => {
        console.log('User signed up:', res);
        this.successMessage = 'Sign-up successful! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);  // Redirect to login page
        }, 2000);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = err.error?.message || 'An error occurred during sign-up.';
      }
    });
  }
}
