import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { AppPages, GAME_1, IWordCard } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [GameLevelComponent],
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

  loadWords(page?: number) {
    const wordsResponse = new CreateWordsResponseService(
      this.httpService,
      this.currentLevel
    );
    const observable = forkJoin(wordsResponse.createWordsResponse());
    observable.subscribe({
      next: (data: any) => {
        this.startGame(data);
      },
    });
  }

  startGame(data: any) {
    this.wordsArray = data;
    console.log(this.wordsArray);
  }
}
