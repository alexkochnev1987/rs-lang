import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { PageRoutes } from 'src/app/constants';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../audio-challenge';
  link1Level = -1;
  link1Page = -1;
  isDesktop = true;
  isTablet = false;
  isPhone = false;
  constructor(
    private pagesDataService: PagesDataService,
    private gameLevelPage: GameLevelTransferService
  ) {}
  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.Main);
    this.checkScreen();
  }
  resetLevelPage() {
    this.gameLevelPage.gamePageLevel = [];
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
}
