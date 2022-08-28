import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  currentLevel!: number;

  constructor(
    private pageDataService: PagesDataService,
    private gameLevel: GameLevelComponent
  ) {
    this.gameLevel = new GameLevelComponent();
    this.currentLevel = this.gameLevel.getGameLevel;
  }

  @ViewChild('gameLevelSetter')
  gameLevelSetter!: ElementRef;

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }

  get getGameLevel() {
    console.log(JSON.stringify(this.gameLevelSetter));
    return this.currentLevel;
  }
}
