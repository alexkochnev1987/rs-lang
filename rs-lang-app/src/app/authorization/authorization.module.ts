import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [AuthorizationComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, AuthorizationRoutingModule, SharedModule],
})
export class AuthorizationModule {}
