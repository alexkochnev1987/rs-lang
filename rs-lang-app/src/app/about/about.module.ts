import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    AuthorizationModule,
  ],
})
export class AboutModule {}
