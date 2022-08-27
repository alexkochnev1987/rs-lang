import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { gameLevelsAmount, LevelColor, LEVELS_COLORS } from 'src/app/constants';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.scss'],
})
export class GameLevelComponent implements AfterViewInit {
  levels: LevelColor[] = LEVELS_COLORS;

  mousePosX?: [MouseEvent, number];
  levelSelected: number = 1;
  levelsContainerWidth = 0;
  levelsSelectorWidth = 0;
  levelsAmount: number;

  constructor(private userService: UserDataService = new UserDataService()) {
    console.log(this.userService.isRegistered());
    this.levelsAmount = this.userService.isRegistered()
      ? gameLevelsAmount.userIsLogged
      : gameLevelsAmount.userNotLogged;
  }

  ngAfterViewInit(): void {
    this.levelsContainerWidth = this.levelsContainer.nativeElement.offsetWidth;
    this.levelsSelectorWidth =
      this.levelsSelector.get(0)?.nativeElement.offsetWidth;
    this.hoverActions(1);
  }

  @ViewChild('levelsContainer')
  levelsContainer!: ElementRef;

  @ViewChildren('levelsSelector', { read: ElementRef })
  levelsSelector!: QueryList<ElementRef>;

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

    this.setSelectedLevel(this.levelSelected);
  }

  setSelectedLevel(id: number) {
    this.levelSelected = id;
    this.levelsSelector.forEach((el, index) => {
      if (id > index) el.nativeElement.classList.add('selected');
      else el.nativeElement.classList.remove('selected');
    });
    return id;
  }

  getBorderColor(selectedLevel?: number) {
    return selectedLevel
      ? `border-color: ${this.levels[selectedLevel - 1].color}`
      : `border-color: ${this.levels[0].color}`;
  }
}
