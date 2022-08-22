/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logoPart1 = '{';
  logoPart2 = 'RS';
  logoPart3 = '}';
  logoPart4 = 'Lang';
  isMenuInvisible = true;
  isGamesMenuInvisible = true;
  @Output() onLink = new EventEmitter<number>();
  getLink(id: number) {
    this.onLink.emit(id);
  }

  constructor(private router: Router) {}

  showMenu() {
    this.isMenuInvisible = !this.isMenuInvisible;
  }

  showGamesMenu() {
    this.isGamesMenuInvisible = !this.isGamesMenuInvisible;
  }

  goOnLink(link: string) {
    this.router.navigate([link]);
  }
}
