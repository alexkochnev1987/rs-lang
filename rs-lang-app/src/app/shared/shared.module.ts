import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnitsMenuComponent } from './components/units-menu/units-menu.component';
import { LoginComponent } from '../authorization/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    LoginComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    UnitsMenuComponent,
    LoginComponent,
  ],
})
export class SharedModule {}
