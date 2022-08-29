import { Component, OnInit } from '@angular/core';
import { forkJoin, map, pipe, tap } from 'rxjs';
import {
  AppPages,
  GAME_2,
  ISprintStats,
  IWord,
  IWordCard,
  SPRINT_TIMER,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [GameLevelComponent],
})
export class SprintComponent implements OnInit {
  wordsArray: IWordCard[] = [];
  gameStats: ISprintStats[] = [];
  timerID!: ReturnType<typeof setInterval>;
  currentGame = GAME_2;
  timer = SPRINT_TIMER * 10;
  isLevelSelected = false;
  isGameStarted = false;
  isGameEnded = false;
  isAuth = false;
  isCorrect = false;
  currentLevel = 1;
  loadingProgress = 0;
  wordsCounter = 0;
  gameScore = 0;
  combo = 0;
  longestCombo = 0;
  totalWords = 0;
  successWords = 0;
  successWordsPersent = 0;
  progress = '';
  currentWord = '';
  wordTranslation = '';

  constructor(
    private userService: UserDataService = new UserDataService(),
    private pageDataService: PagesDataService,
    private httpService: HttpService
  ) {
    this.isAuth = this.userService.isRegistered();
  }

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
  }

  loadWords(page?: number) {
    const wordsResponse = new CreateWordsResponseService(
      this.httpService,
      this.currentLevel
    );
    const observables = wordsResponse.createWordsResponse();
    const len = observables.length;
    const observable = forkJoin(
      observables.map(el =>
        el.pipe(
          tap(() => {
            this.loadingProgress++;
            this.progress = `Loading...${Math.round(
              (this.loadingProgress / len) * 100
            )}%`;
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
    if (this.isAuth) {
      const id = this.userService.getUser().userId;
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
          this.shuffleWords(readyWordArray);
        });
    } else {
      data.forEach((wordsPageArray: IWordCard[]) => {
        readyWordArray.push(...wordsPageArray);
      });
      this.shuffleWords(readyWordArray);
    }
  }

  shuffleWords(data: IWordCard[]) {
    let currentIndex = data.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    this.startGame(data);
  }

  startGame(data: IWordCard[]) {
    this.wordsArray = data;
    this.isGameStarted = true;
    console.log(this.wordsArray);
    this.getWord();
    this.getTimer();
  }

  getTimer() {
    this.timerID = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.isGameEnded = true;
        clearInterval(this.timerID);
        this.totalWords = this.gameStats.length;
        this.successWords = this.gameStats.filter(el => el.success).length;
        this.successWordsPersent =
          this.totalWords !== 0
            ? Math.round((this.successWords / this.totalWords) * 100)
            : 0;
      }
    }, 100);
  }

  getWord() {
    this.isCorrect = Math.random() > 0.5 ? true : false;
    this.currentWord = this.wordsArray[this.wordsCounter].word;
    this.wordTranslation =
      this.wordsArray[
        this.isCorrect
          ? this.wordsCounter
          : Math.floor(Math.random() * this.wordsArray.length)
      ].wordTranslate;
    this.wordsCounter++;
  }

  checkAnswer(answer: boolean) {
    console.log(`Answer: ${answer}; isCorrect: ${this.isCorrect}`);
    if (answer === this.isCorrect) {
      this.gameScore += 50;
      this.combo++;
    } else {
      this.combo = 0;
    }
    this.longestCombo =
      this.combo > this.longestCombo ? this.combo : this.longestCombo;
    this.gameStats.push({
      id: this.wordsArray[this.wordsCounter].id,
      word: this.wordsArray[this.wordsCounter].word,
      audio: this.wordsArray[this.wordsCounter].audio,
      transcription: this.wordsArray[this.wordsCounter].transcription,
      wordTranslate: this.wordsArray[this.wordsCounter].wordTranslate,
      success: answer === this.isCorrect ? true : false,
    });
  }
}
