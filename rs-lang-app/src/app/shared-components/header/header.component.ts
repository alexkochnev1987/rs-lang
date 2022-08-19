import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logo = '{RS-lang}';
  blindTitle = 'EXERCISE BOOK';
  isInvisible = true;
  constructor() {}
  showMenu() {
    this.isInvisible = !this.isInvisible;
  }
  hideMenu() {
    this.isInvisible = true;
  }
}
