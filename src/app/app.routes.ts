import { Routes } from '@angular/router';
import { HomeComponent} from "./Home/home.component";
import { LoginComponent } from './auth/sign-in/login.component';
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {SignInComponent} from "./auth/sign-up/sign-in.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {TestComponent} from "./Home/test/test.component";
import {UploadCvComponent} from "./profile/upload-cv/upload-cv.component";
import {ProfileComponent} from "./profile/profile.component";
import {TestDetailsComponent} from "./Home/test/test-details/test-details.component";
import {JobOpportunitiesComponent} from "./job-opportunities/job-opportunities.component";
import {AuthRedirectGuard} from "./guard/auth-redirect.guard";
import {AuthGuard} from "./guard/auth.guard";
import {provideHttpClient} from "@angular/common/http";
import {ConfirmTestComponent} from "./Home/test/confirm-test/confirm-test.component";
import {SideNavComponent} from "./AdminDashboard/side-nav/side-nav.component";
import {AdminMainComponent} from "./AdminDashboard/admin-main/admin-main.component";
import {ManageUsersComponent} from "./AdminDashboard/manage-users/manage-users.component";
import {ManageTestsComponent} from "./AdminDashboard/manage-tests/manage-tests.component";
import {SuccessComponent} from "./success/success.component";




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthRedirectGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthRedirectGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthRedirectGuard] },

  // Routes for users
  { path: 'test', component: TestComponent, canActivate: [AuthGuard], data: { role: ['user', 'admin'] } },
  { path: 'test-details/:id', component: TestDetailsComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'upload-cv', component: UploadCvComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'confirm-test/:id', component: ConfirmTestComponent, canActivate: [AuthGuard], data: { role: 'user' } },

  // Admin routes
  { path: 'admin-main', component: AdminMainComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'manage-user', component: ManageUsersComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'manage-test', component: ManageTestsComponent, canActivate: [AuthGuard], data: { role: 'admin' } },

  // Shared Routes
  { path: 'job-opportunities', component: JobOpportunitiesComponent },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
  { path: 'side-nav', component: SideNavComponent }
];


