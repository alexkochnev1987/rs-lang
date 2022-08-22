import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnitsMenuComponent } from './components/units-menu/units-menu.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    GamesMenuComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, UnitsMenuComponent],
})
export class SharedModule {}
