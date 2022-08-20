import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';

const routes: Routes = [{ path: '', component: AudioChallengeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioChallengeRoutingModule {}
