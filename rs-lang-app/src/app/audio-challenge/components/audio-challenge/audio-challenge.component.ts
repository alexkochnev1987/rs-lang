import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AppPages,
  BUTTON_CANCEL,
  BUTTON_LEAVE,
  BUTTON_RESTART,
  BUTTON_START,
  GAME_1,
  IGuessButton,
  IWordCard,
  LEVELS_COLORS,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit, OnDestroy {
  isGameStart = false;
  isGameEnded = false;
  currentGame = GAME_1;
  currentLevel: number | string = -1;
  currentPage: number = 0;
  wordsArray: IWordCard[] = [];
  wordtoSayId: number = 0;
  buttonRestart = BUTTON_RESTART;
  buttonLeave = BUTTON_LEAVE;
  buttonCancel = BUTTON_CANCEL;
  buttonStart = BUTTON_START;
  levelsColors = LEVELS_COLORS;
  mainPageLink = '../../../';
  guessButtons: IGuessButton[] = [
    { id: '', word: 'we' },
    { id: '', word: 'can' },
    { id: '', word: 'do' },
    { id: '', word: 'it' },
  ];
  guessInRow: number[] = [1, 1, 0, 0, 0];
  attemptsInRow: number[] = [1, 1, 1, 0, -1, -1, -1, -1, -1, -1];
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDataService: PagesDataService,
    private httpService: HttpService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.currentLevel = params['level'];
      this.currentPage = params['page'];
      alert(`level: ${this.currentLevel}, page; ${this.currentPage}`);
    });
  }
  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getColor(level: number | string) {
    return this.levelsColors[+level - 1].color;
  }
  restartGame() {
    this.isGameStart = false;
  }

  sayWord(): void {}

  startGame() {
    this.isGameStart = true;
  }
}
