import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";


@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  user: any = {};
  protected apiUrl = 'http://localhost:3000'; // Replace with your actual backend URL
  selectedimage: File | null = null;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
  }

  @ViewChild('avatar') avatar?: ElementRef;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });

    // Fetch the user data
    this.fetchUser();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedimage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Ensure the image gets updated properly
        this.renderer.setAttribute(
          this.avatar?.nativeElement,
          'src',
          e.target.result
        );
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  fetchUser(): void {


    if (!this.userService.istokeexist())
      return;


    this.userService.getCurrentUser().subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.status == 200) {


          this.user = response.body;
          this.form.patchValue(this.user);

        }
      },

    });
  }

  updateuser(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.form.invalid) {
      this.errorMessage = 'your form is invalid!'
      return;
    }
    const updatedata = this.form.value;
    this.userService.updateProfile(updatedata, this.selectedimage).subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.status == 200) {
          this.user = response.body;

          this.form.patchValue(this.user);
          window.location.reload()
        }
      },

    });
  }
}
