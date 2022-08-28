import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppPages, GAME_1 } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  isGameStart = false;
  currentGame = GAME_1;
  currentLevel!: number;

  constructor(
    private pageDataService: PagesDataService,
    private gameLevel: GameLevelComponent
  ) {
    this.gameLevel = new GameLevelComponent();
    this.currentLevel = this.gameLevel.getGameLevel;
  }

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }

  gameActions(level: number) {
    this.currentLevel = level;
    console.log(level);
  }
}
