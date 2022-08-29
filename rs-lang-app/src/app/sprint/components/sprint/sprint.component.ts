import { Component, OnInit } from '@angular/core';
import { forkJoin, map, pipe, tap } from 'rxjs';
import { AppPages, GAME_2, IWord, IWordCard } from 'src/app/constants';
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
  isGameStart = false;
  currentGame = GAME_2;
  currentLevel = 1;
  loadingProgress = 0;
  progress = '';
  renderGame = false;
  isAuth = false;
  wordsCounter = 0;
  gameScore = 0;
  currentWord = '';
  wordTranslation = '';
  isCorrect = false;

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
    this.renderGame = true;
    console.log(this.wordsArray);
    this.getWord();
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
    if (answer === this.isCorrect) this.gameScore += 50;
  }
}
