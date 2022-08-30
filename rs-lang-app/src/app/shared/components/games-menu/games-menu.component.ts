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
  link2 = '../' + PageRoutes.sprint;
  link1 = '../audio-challenge';
  link1Level = -1;
  link1Page = -1;
  constructor() {}
}
