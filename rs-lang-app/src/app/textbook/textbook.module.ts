import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextbookRoutingModule } from './textbook-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { LevelNavigationComponent } from './components/level-navigation/level-navigation.component';
import { TextbookComponent } from './components/textbook/textbook.component';

@NgModule({
  declarations: [TextbookComponent, CardComponent, LevelNavigationComponent],
  imports: [CommonModule, TextbookRoutingModule, SharedModule, RouterModule],

  exports: [],
})
export class TextbookModule {}
