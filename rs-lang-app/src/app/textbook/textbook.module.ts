import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextbookRoutingModule } from './textbook-routing.module';
import { TextbookComponent } from './components/textbook/textbook.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TextbookComponent],
  imports: [CommonModule, TextbookRoutingModule, SharedModule],
  exports: [],
})
export class TextbookModule {}
