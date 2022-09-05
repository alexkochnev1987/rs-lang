import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationComponent } from '../shared/components/authorization/authorization.component';
import { HardWordsComponent } from './components/tables/hardwords/hardwords.component';
import { EasyWordsComponent } from './components/tables/easy-words/easy-words.component';
import { GraphsComponent } from './components/tables/graphs/graphs.component';
import { AllTimeComponent } from './components/tables/graphs/all-time/all-time.component';
import { TodayComponent } from './components/tables/graphs/today/today.component';
import { SprintComponent } from './components/tables/graphs/sprint/sprint.component';
import { AudioComponent } from './components/tables/graphs/audio/audio.component';
import { GraphicsComponent } from './components/tables/graphs/all-time/graphics/graphics.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    HardWordsComponent,
    EasyWordsComponent,
    GraphsComponent,
    AllTimeComponent,
    TodayComponent,
    SprintComponent,
    AudioComponent,
    GraphicsComponent,
  ],
  imports: [CommonModule, StatisticsRoutingModule, SharedModule],
})
export class StatisticsModule {}
