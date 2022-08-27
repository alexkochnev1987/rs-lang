import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { gameLevelsAmount } from 'src/app/constants';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.scss'],
})
export class GameLevelComponent implements AfterViewInit {
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
  levelSelected: number = 1;
  levelsContainerWidth = 0;
  levelsSelectorWidth = 0;
  levelsAmount: number = 7;

  // constructor(@Inject('isLoggedIn') isLoggedIn: boolean) {
  //   this.levelsAmount = isLoggedIn
  //     ? gameLevelsAmount.userIsLogged
  //     : gameLevelsAmount.userNotLogged;
  // }
  constructor() {}
  ngAfterViewInit(): void {
    this.levelsContainerWidth = this.levelsContainer.nativeElement.offsetWidth;
    this.levelsSelectorWidth = this.levelsSelector.nativeElement.offsetWidth;
    this.hoverActions(1);
  }

  @ViewChild('levelsContainer')
  levelsContainer!: ElementRef;

  @ViewChild('levelsSelector')
  levelsSelector!: ElementRef;

  @ViewChild('outerContainer')
  outerContainer!: ElementRef;

  @ViewChild('levelsBackground')
  levelsBackground!: ElementRef;

  getLevelBackgroundColor(color: string) {
    return `background-color: ${color}`;
  }

  hoverActions(selectedLevel: number) {
    this.levelsContainer.nativeElement.style = `background: linear-gradient(0.25turn, ${this.levels
      .map(el => el.color)
      .join(', ')});
      box-shadow: inset ${
        selectedLevel
          ? this.levelsSelectorWidth +
            ((this.levelsContainerWidth - this.levelsSelectorWidth) /
              (this.levelsAmount - 1)) *
              (selectedLevel - 1) -
            this.levelsContainerWidth
          : this.levelsSelectorWidth - this.levelsContainerWidth
      }px 0 0 white`;

    this.outerContainer.nativeElement.style = `border-color: ${
      this.levels[selectedLevel - 1].color
    }`;

    this.levelsBackground.nativeElement.style = `background: linear-gradient(0.25turn, ${this.levels
      .map(el => el.color)
      .join(', ')});`;
  }

  getBorderColor(selectedLevel?: number) {
    return selectedLevel
      ? `border-color: ${this.levels[selectedLevel - 1].color}`
      : `border-color: ${this.levels[0].color}`;
  }
}
