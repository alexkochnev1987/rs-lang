import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioChallengeRoutingModule } from './audio-challenge-routing.module';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';


@NgModule({
  declarations: [
    AudioChallengeComponent
  ],
  imports: [
    CommonModule,
    AudioChallengeRoutingModule
  ]
})
export class AudioChallengeModule { }
