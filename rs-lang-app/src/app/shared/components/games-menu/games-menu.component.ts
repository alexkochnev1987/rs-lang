import { Component } from '@angular/core';
import { GAME_1, GAME_2, PageRoutes } from 'src/app/constants';

@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrls: ['./games-menu.component.scss'],
})
export class GamesMenuComponent {
  game1 = GAME_1;
  game2 = GAME_2;
  link1 = '../' + PageRoutes.sprint;
  link2 = '../' + PageRoutes.audioChallenge;
  constructor() {}
}
