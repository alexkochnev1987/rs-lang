import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { gameLevelsAmount, LevelColor, LEVELS_COLORS } from 'src/app/constants';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.scss'],
})
export class GameLevelComponent implements AfterViewInit {
  isGameStart: boolean = false;
  levels: LevelColor[] = LEVELS_COLORS;
  levelSelected = 1;
  levelsContainerWidth = 0;
  levelsSelectorWidth = 0;
  levelsAmount: number;

  constructor(
    private userService: UserDataService = new UserDataService(),
    private _location: Location
  ) {
    this.levelsAmount = this.userService.isRegistered()
      ? gameLevelsAmount.userIsLogged
      : gameLevelsAmount.userNotLogged;
  }

  @ViewChild('levelsContainer')
  levelsContainer!: ElementRef;

  @ViewChildren('levelsSelector')
  levelsSelector!: QueryList<ElementRef>;

  @ViewChild('outerContainer')
  outerContainer!: ElementRef;

  @ViewChild('levelsBackground')
  levelsBackground!: ElementRef;

  ngAfterViewInit(): void {
    this.levelsContainerWidth = this.levelsContainer.nativeElement.offsetWidth;
    this.levelsSelectorWidth =
      this.levelsSelector.get(0)?.nativeElement.offsetWidth;
    this.hoverActions(1);
  }

  getLevelBackgroundColor(color: string) {
    return `background-color: ${color}`;
  }

  hoverActions(selectedLevel: number) {
    this.setOuterContainer(selectedLevel);
    this.setLevelsSelectBar(selectedLevel);
    this.setLevelsBackground();
    this.setSelectedLevel(this.levelSelected);
  }

  setLevelsSelectBar(selectedLevel: number) {
    this.levelsContainer.nativeElement.style = `background: linear-gradient(0.25turn, ${this.levels
      .filter((el, index) => index < this.levelsAmount)
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
  }

  setLevelsBackground() {
    this.levelsBackground.nativeElement.style = `background: linear-gradient(0.25turn, ${this.levels
      .filter((el, index) => index < this.levelsAmount)
      .map(el => el.color)
      .join(', ')});`;
  }

  setOuterContainer(selectedLevel: number) {
    this.outerContainer.nativeElement.style = `border-color: ${
      this.levels[selectedLevel - 1].color
    }`;
  }

  setSelectedLevel(id: number) {
    this.levelSelected = id;
    this.levelsSelector.forEach((el, index) => {
      if (id > index) el.nativeElement.classList.add('selected');
      else el.nativeElement.classList.remove('selected');
    });
  }

  getBorderColor(selectedLevel?: number) {
    return selectedLevel
      ? `border-color: ${this.levels[selectedLevel - 1].color}`
      : `border-color: ${this.levels[0].color}`;
  }

  get getGameLevel() {
    return this.levelSelected;
  }

  goBack() {
    this._location.back();
  }

  @Output()
  buttonsActions = new EventEmitter<number>();
}
