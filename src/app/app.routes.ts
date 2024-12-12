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




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  {path: 'forgot-password' , component : ForgotPasswordComponent, canActivate: [AuthRedirectGuard]},
  {path: 'sign-in' , component : SignInComponent, canActivate: [AuthRedirectGuard]},
  {path: 'reset-password' , component : ResetPasswordComponent, canActivate: [AuthRedirectGuard]},
  {path: 'test' , component : TestComponent, canActivate: [AuthGuard]},
  {path: 'test-details' , component : TestDetailsComponent, canActivate: [AuthGuard]},
  {path: 'upload-cv' , component : UploadCvComponent, canActivate: [AuthGuard]},
  {path: 'profile' , component : ProfileComponent, canActivate: [AuthGuard]},
  {path: 'job-opportunities' , component : JobOpportunitiesComponent},
  {path: 'confirm-test/:id' , component : ConfirmTestComponent},
  {path: 'side-nav' , component : SideNavComponent},
  {path: 'admin-main' , component : AdminMainComponent},





];

