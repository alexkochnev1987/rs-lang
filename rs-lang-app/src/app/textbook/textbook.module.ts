import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextbookRoutingModule } from './textbook-routing.module';
import { TextbookComponent } from './components/textbook/textbook.component';


@NgModule({
  declarations: [
    TextbookComponent
  ],
  imports: [
    CommonModule,
    TextbookRoutingModule
  ]
})
export class TextbookModule { }
