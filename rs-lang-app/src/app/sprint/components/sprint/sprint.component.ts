import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppPages, GAME_1, IWordCard } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { LoadWordsService } from 'src/app/core/services/load-words.service';
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
  currentLevel: number = 1;
  wordsArray: IWordCard[] = [];

  constructor(
    private pageDataService: PagesDataService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }

  loadGame(page?: number) {
    const loadWordsService = new LoadWordsService(
      this.httpService,
      this.currentLevel
    );
    this.wordsArray = loadWordsService.loadWords();
    console.log(this.wordsArray);
  }
}
