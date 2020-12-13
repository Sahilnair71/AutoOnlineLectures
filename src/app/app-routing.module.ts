import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '././homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { from } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component'
import { VerifyEmailAddressComponent } from './verify-email-address/verify-email-address.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verify-email-address', component: VerifyEmailAddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
