import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { ExerciseBookComponent } from './components/exercise-book/exercise-book.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'authorization', component: AuthorizationPageComponent },
  { path: 'exercise-book', component: ExerciseBookComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'audio-challenge', component: AudioChallengeComponent },
  { path: 'statistics', component: StatisticsPageComponent },
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
