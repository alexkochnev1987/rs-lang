import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioChallengeRoutingModule } from './audio-challenge-routing.module';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AudioChallengeComponent],
  imports: [CommonModule, AudioChallengeRoutingModule, SharedModule],
})
export class AudioChallengeModule {}
