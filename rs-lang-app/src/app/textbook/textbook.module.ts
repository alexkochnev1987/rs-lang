import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextbookRoutingModule } from './textbook-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TextbookComponent } from './components/textbook/textbook.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [TextbookComponent, CardComponent],
  imports: [CommonModule, TextbookRoutingModule, SharedModule],
  exports: [],
})
export class TextbookModule {}
