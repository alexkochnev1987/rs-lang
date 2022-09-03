import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import {
  AppPages,
  COMBO_BONUS_GROWTH,
  CORRECT_ANSWER_POINTS,
  GAME_2,
  ISprintStats,
  IWord,
  IWordCard,
  KeyCode,
  SPRINT_TIMER,
  TIMER_LINE_SECTIONS,
  GameStatistics,
  Games,
  url,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Location } from '@angular/common';
import { QueryService } from 'src/app/core/service/query.service';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';
import { ProcessStatisticsService } from 'src/app/core/services/process-statistics.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [GameLevelComponent],
})
export class SprintComponent implements OnInit {
  wordsArray: IWordCard[] = [];
  currentAnswer: IWordCard | undefined;
  gameStats: ISprintStats[] = [];
  timerID!: ReturnType<typeof setInterval>;
  timerSections: number[] = [];
  buttonYesElement: HTMLElement | undefined;
  buttonNoElement: HTMLElement | undefined;
  userId: string | undefined = undefined;
  currentPage: number | undefined = undefined;
  userWords: IWord[] = [];
  // userGamesStats: GameStatistics | undefined;
  wordIds: string[] = [];
  currentGame = GAME_2;
  timer = SPRINT_TIMER * 10;
  fixSprintTimer = SPRINT_TIMER;
  lineSections = TIMER_LINE_SECTIONS;
  isLevelSelected = false;
  isGameStarted = false;
  isGameEnded = false;
  isAuth = false;
  isCorrect = false;
  isAllWordsLearned = false;
  currentLevel = 1;
  loadingProgress = 0;
  wordsCounter = 0;
  gameScore = 0;
  comboBonus = 0;
  combo = 0;
  longestCombo = 0;
  totalWords = 0;
  successWords = 0;
  successWordsPersent = 0;
  progress = '';
  currentWord = '';
  correctTranslate = '';
  wrongTranslate = '';
  wordTranslation = '';
  btnStyleNo = '';
  btnStyleYes = '';

  constructor(
    private userService: UserDataService = new UserDataService(),
    private pageDataService: PagesDataService,
    private userdataService: UserDataService,
    private httpService: HttpService,
    private queryService: QueryService,
    private _location: Location,
    private LevelPage: GameLevelTransferService,
    private processStatisticsService: ProcessStatisticsService,
    private http: HttpClient
  ) {
    this.isAuth = this.userService.isRegistered();
    this.isAuth
      ? (this.userId = this.userdataService.getUser().userId)
      : undefined;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (
      this.buttonNo &&
      this.isGameStarted &&
      event.code === KeyCode.LEFT_ARROW
    ) {
      this.checkAnswer(false, this.buttonNo.nativeElement);
    }
    if (
      this.buttonYes &&
      this.isGameStarted &&
      event.code === KeyCode.RIGHT_ARROW
    ) {
      this.checkAnswer(true, this.buttonYes.nativeElement);
    }
  }

  @ViewChild('buttonYes')
  buttonYes: ElementRef | undefined;

  @ViewChild('buttonNo')
  buttonNo: ElementRef | undefined;

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
    if (this.isAuth) {
      this.getUserWords();
      // this.getUserStatistics();
    }
    if (this.LevelPage.gamePageLevel.length) {
      this.currentLevel = this.LevelPage.gamePageLevel[0];
      this.loadWords(this.LevelPage.gamePageLevel[1]);
      this.isLevelSelected = true;
    }
  }

  loadWords(page?: number) {
    this.currentPage = page !== undefined ? page : undefined;
    const wordsResponse = new CreateWordsResponseService(
      this.httpService,
      this.currentLevel,
      this.currentPage
    );
    this.currentPage
      ? console.log(
          'Playing Level:',
          this.currentLevel,
          '; page: ',
          this.currentPage + 1
        )
      : console.log('Playing Level:', this.currentLevel, ' all pages');
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
    if (this.isAuth && this.currentPage !== undefined) {
      this.http
        .get(url + `/users/${this.userId}/words`)
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
    let currentIndex = data.length;
    let randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    data.length === 0 ? this.noWordsToLearn() : this.startGame(data);
  }

  startGame(data: IWordCard[]) {
    this.processStatisticsService.getUserStatistics();
    this.wordsArray = data;
    this.isGameStarted = true;
    this.timerSections = this.timerSectionsArray();
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
        if (this.totalWords > 0 && this.isAuth) {
          // this.processStatistics();
          const statsSet = new Set(this.gameStats);
          this.processStatisticsService.serviceData = {
            game: Games.Sprint,
            gameStats: this.gameStats,
            longestCombo: this.longestCombo,
          };
          this.processStatisticsService.processStatistics();
        }
      }
    }, 100);
  }

  getWord() {
    this.isCorrect = Math.random() > 0.5 ? true : false;
    this.currentAnswer = this.wordsArray[this.wordsCounter];
    this.currentWord = this.wordsArray[this.wordsCounter].word;
    this.correctTranslate = this.wordsArray[this.wordsCounter].wordTranslate;
    this.wrongTranslate =
      this.wordsArray[
        Math.floor(Math.random() * this.wordsArray.length)
      ].wordTranslate;
    if (this.isCorrect) {
      this.wordTranslation = this.correctTranslate;
    } else {
      this.wordTranslation = this.wrongTranslate;
      this.isCorrect =
        this.wordTranslation === this.correctTranslate ? true : false;
    }
  }

  checkAnswer(answer: boolean, buttonPressed: HTMLElement) {
    buttonPressed.classList.remove('button-dashed-correct');
    buttonPressed.classList.remove('button-dashed-wrong');
    if (answer === this.isCorrect) {
      this.gameScore += 50 + this.comboBonus;
      this.combo++;
      buttonPressed.setAttribute('disabled', '');
      setTimeout(() => {
        buttonPressed.classList.add('button-dashed-correct');
        buttonPressed.removeAttribute('disabled');
      }, 0);
    } else {
      this.combo = 0;
      buttonPressed.setAttribute('disabled', '');
      setTimeout(() => {
        buttonPressed.classList.add('button-dashed-wrong');
        buttonPressed.removeAttribute('disabled');
      }, 0);
    }
    this.comboBonus = this.combo * CORRECT_ANSWER_POINTS * COMBO_BONUS_GROWTH;
    this.longestCombo =
      this.combo > this.longestCombo ? this.combo : this.longestCombo;
    if (this.currentAnswer && !this.wordIds.includes(this.currentAnswer.id)) {
      this.wordIds.push(this.currentAnswer.id);
      this.gameStats.push({
        id: this.currentAnswer.id,
        word: this.currentAnswer.word,
        audio: this.currentAnswer.audio,
        transcription: this.currentAnswer.transcription,
        wordTranslate: this.currentAnswer.wordTranslate,
        success: answer === this.isCorrect ? true : false,
      });
    }
    this.wordsCounter++;
    this.wordsCounter < this.wordsArray.length
      ? this.getWord()
      : (this.timer = 0);
  }

  timerSectionsArray() {
    return Array(this.lineSections)
      .fill('')
      .map((el: number, index: number) => {
        return index + 1;
      });
  }

  changeStyle(element: HTMLElement) {
    return element.classList.add('timer-isup');
  }

  resetGame() {
    if (this.timerID) clearInterval(this.timerID);
    this.isGameEnded = false;
    this.isGameStarted = false;
    this.gameStats = [];
    this.wordIds = [];
    this.timer = SPRINT_TIMER * 10;
    this.gameScore = 0;
    this.combo = 0;
    this.comboBonus = 0;
    this.longestCombo = 0;
    this.wordsCounter = 0;
    this.loadingProgress = 0;
    this.progress = '';
  }

  restartGame() {
    if (this.LevelPage.gamePageLevel.length) {
      this.currentLevel = this.LevelPage.gamePageLevel[0];
      this.loadWords(this.LevelPage.gamePageLevel[1]);
    }
    if (!this.LevelPage.gamePageLevel.length) {
      this.loadWords();
    }
  }

  goBack() {
    this._location.back();
  }

  getUserWords() {
    this.queryService.getUserWords().subscribe({
      next: (data: any) => {
        this.userWords = data;
      },
    });
  }

  // getUserStatistics() {
  //   this.queryService.getUserStatistics().subscribe({
  //     next: (data: any) => {
  //       this.userGamesStats = data;
  //     },
  //   });
  // }

  noWordsToLearn() {
    console.log('ALL WORDS LEARNED');
    this.isAllWordsLearned = true;
  }
}
