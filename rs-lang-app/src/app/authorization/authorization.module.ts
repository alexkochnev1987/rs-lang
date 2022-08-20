import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [CommonModule, AuthorizationRoutingModule, SharedModule],
})
export class AuthorizationModule {}
