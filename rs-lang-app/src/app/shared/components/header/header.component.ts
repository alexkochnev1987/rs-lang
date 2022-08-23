/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logoParts = ['{', 'RS', '}', 'Lang'];
  isMenuInvisible = true;
  isGamesMenuInvisible = true;

  constructor(private router: Router) {}

  showMenu() {
    this.isMenuInvisible = !this.isMenuInvisible;
  }

  showGamesMenu() {
    this.isGamesMenuInvisible = !this.isGamesMenuInvisible;
  }
}
