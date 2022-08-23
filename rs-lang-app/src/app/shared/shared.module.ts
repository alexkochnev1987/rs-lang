import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnitsMenuComponent } from './components/units-menu/units-menu.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    GamesMenuComponent,
    MenuButtonComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    MenuButtonComponent,
    GamesMenuComponent,
  ],
})
export class SharedModule {}
