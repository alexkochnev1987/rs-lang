import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ExerciseBookComponent } from './components/exercise-book/exercise-book.component';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExerciseBookComponent,
    AuthorizationPageComponent,
    AboutPageComponent,
    StatisticsPageComponent,
    SprintComponent,
    AudioChallengeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
