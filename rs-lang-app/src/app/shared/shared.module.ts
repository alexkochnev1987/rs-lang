import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnitsMenuComponent } from './components/units-menu/units-menu.component';
import { LoginComponent } from '../authorization/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from '../authorization/registration/registration.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';

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
  ],
})
export class SharedModule {}
