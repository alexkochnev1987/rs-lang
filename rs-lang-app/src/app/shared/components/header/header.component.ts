import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logo = '{RS-lang}';
  blindTitle = 'TEXTBOOK';
  isInvisible = true;
  constructor(private router: Router) {}
  showMenu() {
    this.isInvisible = !this.isInvisible;
  }
  goOnLink(link: string) {
    this.router.navigate([link]);
  }
}
