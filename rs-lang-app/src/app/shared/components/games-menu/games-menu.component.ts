import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrls: ['./games-menu.component.scss'],
})
export class GamesMenuComponent {
  game1 = 'AUDIO-CHALLENGE';
  game2 = 'SPRINT';
  constructor(private router: Router) {}

  goOnLink(link: string) {
    this.router.navigate([link]);
  }
}
