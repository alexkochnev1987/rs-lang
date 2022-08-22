import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutes } from './constants';

const routes: Routes = [
  {
    path: PageRoutes.about,
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: PageRoutes.authorization,
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        m => m.AuthorizationModule
      ),
  },
  {
    path: PageRoutes.textBook,
    loadChildren: () =>
      import('./textbook/textbook.module').then(m => m.TextbookModule),
  },
  {
    path: PageRoutes.sprint,
    loadChildren: () =>
      import('./sprint/sprint.module').then(m => m.SprintModule),
  },
  {
    path: PageRoutes.audioChallenge,
    loadChildren: () =>
      import('./audio-challenge/audio-challenge.module').then(
        m => m.AudioChallengeModule
      ),
  },
  {
    path: PageRoutes.statistics,
    loadChildren: () =>
      import('./statistics/statistics.module').then(m => m.StatisticsModule),
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
