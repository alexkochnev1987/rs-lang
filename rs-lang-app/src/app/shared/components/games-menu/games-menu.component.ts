import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrls: ['./games-menu.component.scss'],
})
export class GamesMenuComponent implements OnInit {
  game1 = 'SRPINTER';
  game2 = 'AUDIO CHALLENGE';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goOnLink(link: string) {
    this.router.navigate([link]);
  }
}
