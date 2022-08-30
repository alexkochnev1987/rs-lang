import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationComponent } from '../shared/components/authorization/authorization.component';
import { HardWordsComponent } from './components/tables/hardwords/hardwords.component';
import { EasyWordsComponent } from './components/tables/easy-words/easy-words.component';

@NgModule({
  declarations: [StatisticsComponent, HardWordsComponent, EasyWordsComponent],
  imports: [CommonModule, StatisticsRoutingModule, SharedModule],
})
export class StatisticsModule {}
