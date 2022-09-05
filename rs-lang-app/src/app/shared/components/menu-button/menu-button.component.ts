import { Component, Input } from '@angular/core';
import { GAME_1 } from 'src/app/constants';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  @Input() gameName: string = '';
  constructor() {}
}
