import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
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
export class GameLevelComponent implements OnInit, AfterViewInit {
  isGameStart: boolean = false;
  levels: LevelColor[] = LEVELS_COLORS;
  levelSelected = 1;
  levelsContainerSize = 0;
  levelsSelectorSize = 0;
  levelsAmount: number;
  isDesktop = true;
  isTablet = false;
  isPhone = false;

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

  ngOnInit() {
    this.checkScreen();
  }

  ngAfterViewInit(): void {
    if (!this.isPhone) {
      this.levelsContainerSize = this.levelsContainer.nativeElement.offsetWidth;
      this.levelsSelectorSize =
        this.levelsSelector.get(0)?.nativeElement.offsetWidth;
    }
    if (this.isPhone) {
      this.levelsContainerSize =
        this.levelsContainer.nativeElement.offsetHeight;
      this.levelsSelectorSize =
        this.levelsSelector.get(0)?.nativeElement.offsetHeight;
    }
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
    this.levelsContainer.nativeElement.style = `background: linear-gradient(${
      !this.isPhone ? 0.25 : 0.5
    }turn, ${this.levels
      .filter((el, index) => index < this.levelsAmount)
      .map(el => el.color)
      .join(', ')});
      box-shadow: inset ${this.isPhone ? '0' : ''} ${
      selectedLevel
        ? this.levelsSelectorSize +
          ((this.levelsContainerSize - this.levelsSelectorSize) /
            (this.levelsAmount - 1)) *
            (selectedLevel - 1) -
          this.levelsContainerSize
        : this.levelsSelectorSize - this.levelsContainerSize
    }px ${this.isPhone ? '' : '0'} 0 white`;
  }

  setLevelsBackground() {
    this.levelsBackground.nativeElement.style = `background: linear-gradient(${
      !this.isPhone ? 0.25 : 0.5
    }turn, ${this.levels
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

  checkScreen() {
    if (window.visualViewport!.width >= 1280) {
      this.isDesktop = true;
      this.isTablet = false;
      this.isPhone = false;
    }
    if (
      window.visualViewport!.width < 1280 &&
      window.visualViewport!.width >= 768
    ) {
      this.isDesktop = false;
      this.isTablet = true;
      this.isPhone = false;
    }
    if (window.visualViewport!.width < 768) {
      this.isDesktop = false;
      this.isPhone = true;
      this.isTablet = false;
    }
  }

  @Output()
  buttonsActions = new EventEmitter<number>();
}
