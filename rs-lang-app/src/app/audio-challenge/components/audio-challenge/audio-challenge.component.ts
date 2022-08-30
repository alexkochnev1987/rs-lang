import { NgIfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  IWord,
  IWordCard,
  LEVELS_COLORS,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit, OnDestroy {
  isGameStart = false;
  isGameEnded = false;
  isSpeakerDisable = true;
  currentGame = GAME_1;
  currentLevel: number | string = -1;
  currentPage: number = 0;
  wordsArray: IWordCard[] = [];
  wordtoSayId: number = 0;
  userId: string | undefined;
  userWords: IWord[] = [];
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
  guessInRow: number[] = [];
  attemptsInRow: number[] = Array(10).fill(-1);
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDataService: PagesDataService,
    private http: HttpClient,
    private httpService: HttpService,
    private userDataService: UserDataService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.currentLevel = params['level'];
      this.currentPage = params['page'];
    });
  }
  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
    this.getGuessInRowArray(0);
    if (this.userDataService.isRegistered()) {
      this.userId = this.userDataService.getUser().userId;
      alert(this.userId);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getGuessInRowArray(times: number): void {
    if (times < 6) {
      this.guessInRow = Array(5)
        .fill(0)
        .map((i, index) => (index < times ? 1 : 0));
    }
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
    if (this.currentLevel === 7) {
      this.loadForUser();
    }
    this.load();
  }

  load() {
    if (this.currentPage !== -1) {
      this.httpService
        .getData(
          `/words?group=${+this.currentLevel - 1}&page=${this.currentPage}`
        )
        .subscribe({
          next: (data: any) => {
            this.wordsArray = data;
            this.next();
          },
        });
    } else {
      for (let page = 0; page < 1; page += 1) {
        this.httpService
          .getData(
            `/words?group=${+this.currentLevel - 1}&page=${this.currentPage}`
          )
          .subscribe({
            next: (data: any) => {
              this.wordsArray += data;

              this.next();
            },
          });
      }
      this.next();
    }
  }
  next() {
    console.log(this.wordsArray);
    this.isSpeakerDisable = false;
  }
  loadForUser() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
          this.userWords.forEach(item => {
            this.httpService.getData(`/words/${item.wordId}`).subscribe({
              next: (data: any) => {
                this.wordsArray.push(data);
                console.log(data)
              },
            });
          });

        },
      });
  }
}
