import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnitsMenuComponent } from './components/units-menu/units-menu.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/authorization/registration/registration.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { GameLevelComponent } from './components/game-level/game-level.component';
import { UserStatisticsComponent } from './components/authorization/user-statistics/user-statistics.component';
import { UpdateUserComponent } from './components/authorization/update-user/update-user.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ErrorMessageComponent } from './components/authorization/error-message/error-message.component';
import { ErrorRegistrationComponent } from './components/authorization/error-registration/error-registration.component';
import { SuccessComponent } from './components/authorization/success/success.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    LoginComponent,
    GamesMenuComponent,
    MenuButtonComponent,
    RegistrationComponent,
    AuthorizationComponent,
    UserStatisticsComponent,
    GameLevelComponent,
    UpdateUserComponent,
    GameLevelComponent,
    PaginatorComponent,
    ErrorMessageComponent,
    ErrorRegistrationComponent,
    SuccessComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    MenuButtonComponent,
    GamesMenuComponent,
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    LoginComponent,
    RegistrationComponent,
    AuthorizationComponent,
    GameLevelComponent,
    PaginatorComponent,
    ErrorMessageComponent,
    ErrorRegistrationComponent,
  ],
})
export class SharedModule {}
