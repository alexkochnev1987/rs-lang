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
  constructor(
    private pagesDataService: PagesDataService,
    private gameLevelPage: GameLevelTransferService
  ) {}
  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.Main);
    if (window.visualViewport!.width < 1280) this.isDesktop = false;
  }
  resetLevelPage() {
    this.gameLevelPage.gamePageLevel = [];
  }
}
