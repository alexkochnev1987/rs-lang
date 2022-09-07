import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { AppPages, GAME_1, GAME_2, PageRoutes } from 'src/app/constants';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logoParts = ['{', 'RS', '}', 'Lang'];
  isMenuInvisible = true;
  isGamesMenuInvisible = true;
  isAuthShow = false;
  isMenuShow = false;
  isTablet = false;
  isPhone = false;
  skip = true;
  currentPage = -1;
  AppPages = AppPages;
  game1 = GAME_1;
  game2 = GAME_2;
  link2 = '../' + PageRoutes.sprint;
  link1 = '../audio-challenge';
  link1Level = -1;
  link1Page = -1;

  @HostListener('window:click') onClick() {
    if (this.skip) {
      this.skip = false;
      return;
    }
    this.closeMenu();
    this.closeGamesMenu();
  }
  @HostListener('window: mousemove') onEvent() {
    this.currentPage = this.pagesDataService.getPage();
  }
  constructor(
    private userDataService: UserDataService,
    private pagesDataService: PagesDataService,
    private levelService: GameLevelTransferService
  ) {}

  ngOnInit(): void {
    this.checkScreen();
    this.currentPage = this.pagesDataService.getPage();
  }

  @ViewChild('auth')
  auth: ElementRef | undefined;

  @ViewChild('authBackground')
  authBackground: ElementRef | undefined;

  @ViewChild('burger')
  menuButtons: ElementRef | undefined;

  @ViewChild('menuBackground')
  menuBackground: ElementRef | undefined;

  @ViewChild('gameMenu')
  gameMenu!: ElementRef;

  showMenu() {
    this.isMenuInvisible = !this.isMenuInvisible;
    this.skip = true;
  }
  closeMenu() {
    this.isMenuInvisible = true;
  }

  closeGamesMenu() {
    this.isGamesMenuInvisible = true;
  }

  showGamesMenu() {
    this.isGamesMenuInvisible = !this.isGamesMenuInvisible;
    this.skip = true;
  }

  isUser() {
    return this.userDataService.isRegistered();
  }

  getLevelPage() {
    return this.levelService.gamePageLevel[0];
  }

  resetLevelPage() {
    this.levelService.gamePageLevel = [];
  }

  authShow() {
    this.isAuthShow = !this.isAuthShow;
    setTimeout(() => {
      this.auth?.nativeElement.classList.toggle('show');
      this.authBackground?.nativeElement.classList.toggle('show-background');
    }, 0);
  }

  menuShow() {
    this.isMenuShow = !this.isMenuShow;
    setTimeout(() => {
      this.menuButtons?.nativeElement.classList.toggle('show');
      this.menuBackground?.nativeElement.classList.toggle('show-background');
    }, 0);
  }

  checkScreen() {
    if (window.visualViewport!.width >= 1280) {
      this.isTablet = false;
      this.isPhone = false;
    }
    if (
      window.visualViewport!.width < 1280 &&
      window.visualViewport!.width >= 768
    ) {
      this.isTablet = true;
      this.isPhone = false;
    }
    if (window.visualViewport!.width < 768) {
      this.isPhone = true;
      this.isTablet = false;
    }
  }
}
