// import { Component, Input, OnInit } from '@angular/core';
// import { LevelColor } from 'src/app/constants';
// import { UnitsDataService } from 'src/app/core/services/units-data.service';
// import { UserDataService } from 'src/app/core/services/user-data.service';

// @Component({
//   selector: 'app-level-navigation',
//   templateUrl: './level-navigation.component.html',
//   styleUrls: ['./level-navigation.component.scss'],
// })
// export class LevelNavigationComponent implements OnInit {
//   units: LevelColor[] = [];
//   @Input() currentLevel: number = 1;

//   constructor(
//     private unitsDataService: UnitsDataService,
//     private userDataService: UserDataService
//   ) {}

//   ngOnInit(): void {
//     this.units = this.unitsDataService.getUnitsForUser();
//   }

//   isRegisteredUser(i: number) {
//     return i < 7 || this.userDataService.isRegistered();
//   }
// }
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { LevelColor, LEVELS_COLORS } from 'src/app/constants';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';
import { TextbookDataService } from 'src/app/core/services/textbook-data.service';

import { UnitsDataService } from 'src/app/core/services/units-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-level-navigation',
  templateUrl: './level-navigation.component.html',
  styleUrls: ['./level-navigation.component.scss'],
  providers: [],
})
export class LevelNavigationComponent
  implements OnInit, AfterViewInit, OnChanges
{
  unitsAuth: LevelColor[] = LEVELS_COLORS;
  unitsNotAuth: LevelColor[] = LEVELS_COLORS.slice(0, 6);
  levelsAmount: number = 0;
  levelsContainerWidth = 0;
  levelsSelectorWidth = 0;
  isAuth: boolean = false;

  constructor(
    private unitsDataService: UnitsDataService,
    private userDataService: UserDataService,
    private textbookDataService: TextbookDataService,
    private levelPage: GameLevelTransferService
  ) {}

  @Input() currentLevel: number = 1;

  @ViewChild('levelsContainer')
  levelsContainer!: ElementRef;

  @ViewChildren('levelsSelector')
  levelsSelector!: QueryList<ElementRef>;

  @ViewChild('outerContainer')
  outerContainer!: ElementRef;

  @ViewChild('levelsBackground')
  levelsBackground!: ElementRef;

  @ViewChild('unitsContainer')
  unitsContainer!: TemplateRef<ElementRef>;

  ngOnInit(): void {
    this.isAuth = this.userDataService.isRegistered();
    this.currentLevel = this.textbookDataService.getCurrentLevel();
    this.unitsAuth = this.unitsDataService.getUnitsForUser();
  }

  ngAfterViewInit() {
    this.hoverActions(this.currentLevel);
  }

  isRegisteredUser(i: number) {
    this.currentLevel = this.textbookDataService.getCurrentLevel();
    return i < 7 || this.userDataService.isRegistered();
  }

  hoverActions(selectedLevel: number) {
    this.levelsContainerWidth = this.levelsContainer.nativeElement.offsetWidth;
    this.levelsSelectorWidth =
      this.levelsSelector.get(0)?.nativeElement.offsetWidth;
    this.setOuterContainer(selectedLevel);
    this.setLevelsSelectBar(selectedLevel);
    this.setLevelsBackground();
    this.setSelectedLevel(this.currentLevel);
  }

  setOuterContainer(selectedLevel: number) {
    this.outerContainer.nativeElement.style = `border-color: ${
      this.unitsAuth[selectedLevel - 1].color
    }`;
    this.currentLevel = selectedLevel;
  }

  setLevelsSelectBar(selectedLevel: number) {
    this.levelsAmount = this.isAuth
      ? this.unitsAuth.length
      : this.unitsNotAuth.length;
    this.levelsContainer.nativeElement.style = `background: linear-gradient( 0.25turn, ${this.unitsAuth
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
    this.currentLevel = selectedLevel;
  }

  getLevelBackgroundColor(color: string) {
    return `background-color: ${color}`;
  }

  setSelectedLevel(id: number) {
    this.currentLevel = id;
    this.levelsSelector.forEach((el, index) => {
      if (id > index) el.nativeElement.classList.add('selected');
      else el.nativeElement.classList.remove('selected');
    });
  }

  setLevelsBackground() {
    this.levelsBackground.nativeElement.style = `background: linear-gradient( 0.25turn, ${this.unitsAuth
      .filter((el, index) => index < this.levelsAmount)
      .map(el => el.color)
      .join(', ')});`;
  }

  setLevelPage(arr: number[]) {
    this.levelPage.gamePageLevel = [+arr];
  }

  ngOnChanges(currentLevel: SimpleChanges): void {
    setTimeout(() => this.ngAfterViewInit(), 0);
  }
}
