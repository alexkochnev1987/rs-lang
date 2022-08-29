import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './components/sprint/sprint.component';
import { SharedModule } from '../shared/shared.module';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { GameLevelComponent } from '../shared/components/game-level/game-level.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SprintComponent, GameStatisticsComponent, GameLevelComponent],
  imports: [
    CommonModule,
    SprintRoutingModule,
    FormsModule,
    // SharedModule
  ],
  providers: [GameLevelComponent],
})
export class SprintModule {}
