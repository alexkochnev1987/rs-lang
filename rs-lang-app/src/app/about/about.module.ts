import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { AuthorCardComponent } from './components/author-card/author-card.component';

@NgModule({
  declarations: [AboutComponent, AuthorCardComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    AuthorizationModule,
  ],
})
export class AboutModule {}
