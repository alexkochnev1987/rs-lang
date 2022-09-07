import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutes } from '../constants';
import { AuthorizationComponent } from '../shared/components/authorization/authorization.component';
import { LoginComponent } from '../shared/components/authorization/login/login.component';
import { RegistrationComponent } from '../shared/components/authorization/registration/registration.component';

const routes: Routes = [{ path: '', component: AuthorizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
