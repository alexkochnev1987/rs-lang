import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthorizationComponent } from './components/authorization/authorization.component';

const routes: Routes = [{ path: '', component: AuthorizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
