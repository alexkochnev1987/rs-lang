import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './components/sprint/sprint.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SprintComponent],
  imports: [CommonModule, SprintRoutingModule, SharedModule],
})
export class SprintModule {}
