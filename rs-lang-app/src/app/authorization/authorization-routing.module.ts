import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutes } from '../constants';
import { LoginComponent } from '../shared/components/authorization/login/login.component';
import { RegistrationComponent } from '../shared/components/authorization/registration/registration.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: PageRoutes.registration, component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
