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
import { TextbookDataService } from 'src/app/core/services/textbook-data.service';

import { UnitsDataService } from 'src/app/core/services/units-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-units-menu',
  templateUrl: './units-menu.component.html',
  styleUrls: ['./units-menu.component.scss'],
  providers: [],
})
export class UnitsMenuComponent implements OnInit, AfterViewInit, OnChanges {
  // currentLevel: number = 1;
  unitsAuth: LevelColor[] = LEVELS_COLORS;
  unitsNotAuth: LevelColor[] = LEVELS_COLORS.slice(0, 6);
  levelsAmount: number = 0;
  levelsContainerHeight = 0;
  levelsSelectorHeight = 0;
  currentPage = 0;

  constructor(
    private unitsDataService: UnitsDataService,
    private userDataService: UserDataService,
    private textbookDataService: TextbookDataService
  ) {}

  @Input()
  isAuth: boolean = false;

  @Input()
  currentLevel: number = 1;

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
    this.currentLevel = this.textbookDataService.getCurrentLevel();
    this.unitsAuth = this.unitsDataService.getUnitsForUser();
  }

  ngAfterViewInit() {
    this.hoverActions(1);
  }

  isRegisteredUser(i: number) {
    this.currentLevel = this.textbookDataService.getCurrentLevel();
    return i < 7 || this.userDataService.isRegistered();
  }

  hoverActions(selectedLevel: number) {
    this.levelsContainerHeight =
      this.levelsContainer.nativeElement.offsetHeight;
    this.levelsSelectorHeight =
      this.levelsSelector.get(0)?.nativeElement.offsetHeight;
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
    this.levelsContainer.nativeElement.style = `background: linear-gradient(${this.unitsAuth
      .filter((el, index) => index < this.levelsAmount)
      .map(el => el.color)
      .join(', ')});
      box-shadow: inset 0 ${
        selectedLevel
          ? this.levelsSelectorHeight +
            ((this.levelsContainerHeight - this.levelsSelectorHeight) /
              (this.levelsAmount - 1)) *
              (selectedLevel - 1) -
            this.levelsContainerHeight
          : this.levelsSelectorHeight - this.levelsContainerHeight
      }px 0 white`;
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
    this.levelsBackground.nativeElement.style = `background: linear-gradient(${this.unitsAuth
      .filter((el, index) => index < this.levelsAmount)
      .map(el => el.color)
      .join(', ')});`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      if (change === 'isAuth') {
        setTimeout(() => this.ngAfterViewInit(), 0);
      }
      if (change === 'currentLevel') {
        this.currentLevel = changes[change].currentValue;
        setTimeout(() => this.hoverActions(this.currentLevel), 0);
      }
    }
  }
}
