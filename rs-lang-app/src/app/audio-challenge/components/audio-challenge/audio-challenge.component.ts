import { NgIfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, tap } from 'rxjs';
import {
  AppPages,
  AUDIO_CHALLENGE_ATTEMPTS,
  BUTTON_CANCEL,
  BUTTON_LEAVE,
  BUTTON_RESTART,
  BUTTON_START,
  GameSound,
  GAME_1,
  IGuessButton,
  IWord,
  IWordCard,
  LEVELS_COLORS,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { HttpService } from 'src/app/core/services/http.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit, OnDestroy {
  source = url + SLASH;
  isGameStart = false;
  isGameEnded = false;
  isFromTextbook = false;
  isInProgress = true;
  currentGame = GAME_1;
  currentLevel: number = -1;
  currentPage?: number = -1;
  loadingProgress = 0;
  progress = 0;
  dataLength = 0;
  attempt = 0;
  arrayForGuess: IWordCard[] = [];
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
  guessButtons: IGuessButton[] = Array(4).fill({});
  rightButtonNumber = 0;
  rightWord?: IWordCard;
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
    this.isFromTextbook = this.currentPage != -1 && this.currentLevel > -1;
    this.getGuessInRowArray(0);
    if (this.userDataService.isRegistered()) {
      this.userId = this.userDataService.getUser().userId;
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

  startGame() {
    this.isGameStart = true;
    if (this.currentLevel === 7) {
      this.loadForUser();
    } else {
      this.load();
    }
  }

  load() {
    if (this.currentPage == -1) {
      this.currentPage = undefined;
    } else this.currentPage = this.currentPage! - 1;
    const wordsResponse = new CreateWordsResponseService(
      this.httpService,
      this.currentLevel,
      this.currentPage
    );
    const observables = wordsResponse.createWordsResponse();
    const len = observables.length;
    const observable = forkJoin(
      observables.map(el =>
        el.pipe(
          tap(() => {
            this.loadingProgress++;
            this.progress = (this.loadingProgress / len) * 100;
          })
        )
      )
    );
    observable.subscribe((data: any) => {
      this.filterWords(data);
    });
  }

  filterWords(data: any) {
    let userEasyWordsIds: string[] = [];
    let readyWordArray: IWordCard[] = [];
    if (this.userDataService.isRegistered()) {
      const id = this.userDataService.getUser()?.userId;
      this.httpService
        .getData(`/users/${id}/words`)
        .subscribe((userWords: any) => {
          userEasyWordsIds = userWords
            .filter((el: IWord) => el.difficulty === 'easy')
            .map((el: IWord) => el.wordId);
          data.forEach((wordsPageArray: IWordCard[]) => {
            for (let i = 0; i < wordsPageArray.length; i++) {
              if (!userEasyWordsIds.includes(wordsPageArray[i].id)) {
                readyWordArray.push(wordsPageArray[i]);
              }
            }
          });
          this.arrayForGuess = readyWordArray;
          this.begin();
        });
    } else {
      data.forEach((wordsPageArray: IWordCard[]) => {
        readyWordArray.push(...wordsPageArray);
      });
      this.arrayForGuess = readyWordArray;
      this.begin();
    }
  }

  begin() {
    this.dataLength = this.arrayForGuess.length;
    this.isInProgress = false;
    this.getWords();
  }
  getWords() {
    this.rightButtonNumber = Math.ceil(Math.random() * 3);
    this.guessButtons = this.guessButtons.map((el, index) => {
      const randomIndex = Math.round(Math.random() * (this.dataLength - 1));
      const randomWord = this.arrayForGuess[randomIndex];
      if (index === this.rightButtonNumber) {
        this.rightWord = randomWord;
      }
      return { id: randomWord?.id, word: randomWord?.wordTranslate };
    });
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
                this.arrayForGuess.push(data);
                console.log(data);
              },
            });
          });
        },
      });
  }
  restartGame() {
    this.isGameStart = false;
    this.isInProgress = true;
    this.loadingProgress = 0;
    this.progress = 0;
  }

  sayWord(): void {
    const audio = new Audio(this.source + this.rightWord?.audio);
    audio.play();
  }
  checkAnswer(index: number) {
    let answer = -1;
    let sounlink = '';
    if (index === this.rightButtonNumber) {
      answer = 1;
      sounlink = GameSound.success;
    } else {
      answer = 0;
      sounlink = GameSound.failed;
    }
    this.attemptsInRow[this.attempt] = answer;
    this.attempt++;
    new Audio(sounlink).play();
    if (this.attempt < AUDIO_CHALLENGE_ATTEMPTS) {
      this.begin();
    } else {
      setTimeout(() => (this.isGameEnded = true), 2000);
    }
  }
}
