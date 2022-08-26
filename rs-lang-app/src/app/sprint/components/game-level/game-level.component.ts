import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.scss'],
})
export class GameLevelComponent {
  levels: { id: number; color: string }[] = [
    { id: 1, color: '#88E564' },
    { id: 2, color: '#45DEC3' },
    { id: 3, color: '#64C6E5' },
    { id: 4, color: '#508BE4' },
    { id: 5, color: '#AC64E5' },
    { id: 6, color: '#E564B9' },
    { id: 7, color: '#EB4949' },
  ];

  mousePosX?: [MouseEvent, number];

  constructor() {}

  getLevelBackgroundColor(color: string) {
    return `background-color: ${color}`;
  }

  getLevelsGradientBackground(mousePosX?: [MouseEvent, number]) {
    return mousePosX
      ? `background: linear-gradient(0.25turn, ${this.levels
          .map(el => el.color)
          .join(', ')});
      box-shadow: inset ${
        50 +
        (((<Element>mousePosX[0].composedPath()[1]).clientWidth - 50) / 6) *
          (mousePosX[1] - 1) -
        (<Element>mousePosX[0].composedPath()[1]).clientWidth
      }px 0 0 white`
      : `background: linear-gradient(0.25turn, ${this.levels
          .map(el => el.color)
          .join(', ')});
      box-shadow: inset 0 0 0 white`;
  }

  getMousePosition(data: MouseEvent, id: number): [MouseEvent, number] {
    return [data, id];
  }

  getBorderColor(mousePosX?: [MouseEvent, number]) {
    return mousePosX
      ? `border-color: ${this.levels[mousePosX[1] - 1].color}`
      : `border-color: ${this.levels[0].color}`;
  }
}
