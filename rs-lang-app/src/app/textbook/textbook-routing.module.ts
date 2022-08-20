import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextbookComponent } from './components/textbook/textbook.component';

const routes: Routes = [{ path: '', component: TextbookComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextbookRoutingModule {}
