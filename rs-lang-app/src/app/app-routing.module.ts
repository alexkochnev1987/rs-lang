import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        m => m.AuthorizationModule
      ),
  },
  {
    path: 'textbook/:id',
    loadChildren: () =>
      import('./textbook/textbook.module').then(m => m.TextbookModule),
  },
  {
    path: 'sprint',
    loadChildren: () =>
      import('./sprint/sprint.module').then(m => m.SprintModule),
  },
  {
    path: 'audio-challenge',
    loadChildren: () =>
      import('./audio-challenge/audio-challenge.module').then(
        m => m.AudioChallengeModule
      ),
  },
  {
    path: 'statistics',
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
