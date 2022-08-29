import { Component, OnInit } from '@angular/core';
import {
  AppPages,
  BUTTON_LEAVE,
  BUTTON_RESTART,
  GAME_1,
  IGuessButton,
  IWordCard,
} from 'src/app/constants';
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
  isGameEnded = false;
  currentGame = GAME_1;
  currentLevel: number = 1;
  wordsArray: IWordCard[] = [];
  wordtoSayId: number = 0;
  buttonRestart = BUTTON_RESTART;
  buttonLeave = BUTTON_LEAVE;
  mainPageLink = '../';
  guessButtons: IGuessButton[] = [{ id: '', word: 'we' }, { id: '', word: 'can' }, { id: '', word: 'do' }, { id: '', word: 'it' }]
  guessInRow: number[] = [1, 1, 0, 0, 0];
  attemptsInRow: number[]=[1,1,1,2,0,0,0,0,0,0]
  constructor(
    private pageDataService: PagesDataService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }
  restartGame() {
    this.isGameStart = false;
  }

  sayWord(): void { }

  loadGame(page?: number) {
    const loadWordsService = new LoadWordsService(
      this.httpService,
      this.currentLevel
    );
    this.wordsArray = loadWordsService.loadWords();
    console.log(this.wordsArray);
  }
}
