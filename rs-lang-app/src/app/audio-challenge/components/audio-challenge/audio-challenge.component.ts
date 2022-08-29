import { Component, OnInit } from '@angular/core';
import { AppPages, GAME_1, IWordCard } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { LoadWordsService } from 'src/app/core/services/load-words.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit {
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
