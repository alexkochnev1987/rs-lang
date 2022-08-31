import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { forkJoin, map, pipe, tap } from 'rxjs';
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
  url,
  QueryParams,
  SLASH,
  IWordsData,
  Difficulty,
  GameStatistics,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Location } from '@angular/common';
import { QueryService } from 'src/app/core/service/query.service';
import { HttpClient } from '@angular/common/http';

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
  timerSections: number[] = [];
  buttonYesElement: HTMLElement | undefined;
  buttonNoElement: HTMLElement | undefined;
  userId: string | undefined = undefined;
  currentPage: number | undefined = undefined;
  userWords: IWord[] = [];
  userGamesStats: GameStatistics | undefined;
  currentGame = GAME_2;
  timer = SPRINT_TIMER * 10;
  fixSprintTimer = SPRINT_TIMER;
  lineSections = TIMER_LINE_SECTIONS;
  isLevelSelected = false;
  isGameStarted = false;
  isGameEnded = false;
  isAuth = false;
  isCorrect = false;
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
  wordTranslation = '';
  btnStyleNo = '';
  btnStyleYes = '';

  constructor(
    private userService: UserDataService = new UserDataService(),
    private pageDataService: PagesDataService,
    private userdataService: UserDataService,
    private httpService: HttpService,
    private queryService: QueryService,
    private http: HttpClient,
    private _location: Location
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
      this.getWord();
    }
    if (
      this.buttonYes &&
      this.isGameStarted &&
      event.code === KeyCode.RIGHT_ARROW
    ) {
      this.checkAnswer(true, this.buttonYes.nativeElement);
      this.getWord();
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
      this.getUserStatistics();
    }
  }

  loadWords(page?: number) {
    this.currentPage = page !== undefined ? page : undefined;
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
      this.httpService
        .getData(`/users/${this.userId}/words`)
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
    this.currentPage === undefined
      ? console.log('All words on level: ', data)
      : console.log('Words on level and page: ', data);
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
    this.startGame(data);
  }

  startGame(data: IWordCard[]) {
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
          this.processStatistics();
        }
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

  checkAnswer(answer: boolean, buttonPressed: HTMLElement) {
    buttonPressed.classList.remove('button-dashed-correct');
    buttonPressed.classList.remove('button-dashed-wrong');
    if (answer === this.isCorrect) {
      this.gameScore += 50 + this.comboBonus;
      this.combo++;
      setTimeout(() => buttonPressed.classList.add('button-dashed-correct'), 0);
    } else {
      this.combo = 0;
      setTimeout(() => buttonPressed.classList.add('button-dashed-wrong'), 0);
    }
    this.comboBonus = this.combo * CORRECT_ANSWER_POINTS * COMBO_BONUS_GROWTH;
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

    // this.queryService.postUserWords(this.wordsArray[this.wordsCounter].id, )
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
    this.isGameStarted = true;
    this.gameStats = [];
    this.timer = SPRINT_TIMER * 10;
    this.gameScore = 0;
    this.combo = 0;
    this.comboBonus = 0;
    this.longestCombo = 0;
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

  getUserStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: (data: any) => {
        this.userGamesStats = data;
      },
    });
  }

  putUserStatistics(options: GameStatistics) {
    this.queryService.setUserStatistics(options).subscribe({
      next: (data: any) => {
        this.userGamesStats = data;
      },
    });
  }

  processUserWord(word: IWord, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
      difficulty: ' ',
      optional: {
        rightGuessesInRow: 0,
      },
    };
    if (wordGameStats.success) {
      if (
        (word.optional?.rightGuessesInRow === 2 &&
          word.difficulty !== Difficulty.Hard) ||
        (word.optional?.rightGuessesInRow === 4 &&
          word.difficulty === Difficulty.Hard) ||
        (word.difficulty === Difficulty.Easy &&
          word.optional?.dateEasy === undefined)
      ) {
        optionsWord.difficulty = 'easy';
        optionsWord.optional.dateEasy = Date.now();
      }
      if (
        (word.optional?.rightGuessesInRow &&
          word.optional?.rightGuessesInRow > 2 &&
          word.difficulty !== Difficulty.Hard) ||
        word.difficulty === Difficulty.Easy
      ) {
        optionsWord.difficulty = 'easy';
      }
      if (word.optional?.rightGuessesInRow === undefined) {
        optionsWord.optional.rightGuessesInRow = 1;
      }
      if (word.optional?.rightGuessesInRow !== undefined) {
        optionsWord.optional.rightGuessesInRow =
          word.optional.rightGuessesInRow + 1;
      }
      if (word.optional?.dateFirstTime === undefined)
        optionsWord.optional.dateFirstTime = Date.now();
      if (word.optional?.dateFirstTime !== undefined)
        optionsWord.optional.dateFirstTime = word.optional?.dateFirstTime;
    }
    if (!wordGameStats.success) {
      if (word.difficulty === Difficulty.Easy) {
        optionsWord.difficulty = ' ';
        optionsWord.optional.rightGuessesInRow = 0;
        delete optionsWord.optional.dateEasy;
      }
      if (word.optional?.dateFirstTime !== undefined) {
        optionsWord.optional.dateFirstTime = word.optional?.dateFirstTime;
      }
      if (word.optional?.dateFirstTime === undefined) {
        optionsWord.optional.dateFirstTime = Date.now();
      }
    }
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      word.wordId;
    const locationStat =
      QueryParams.register + SLASH + this.userId + QueryParams.statistics;
    this.httpService.putData(locationWord, optionsWord);
  }

  processNotUserWord(wordId: string, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
      difficulty: ' ',
      optional: {
        rightGuessesInRow: wordGameStats.success ? 1 : 0,
        dateFirstTime: Date.now(),
      },
    };
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    this.httpService.postData(locationWord, optionsWord);
  }

  processStatistics() {
    console.log(123);
    this.getUserStatistics();
    console.log('Stats 1:', this.userGamesStats);
    const optionsStat: GameStatistics = {
      learnedWords: 0,
      optional: {
        sprint: {
          today: {
            attempts: 0,
            success: 0,
            rightGuessesInRow: 0,
            date: 0,
          },
          allTime: {
            attempts: 0,
            success: 0,
            rightGuessesInRow: 0,
          },
        },
      },
    };
    const optionsSprintStats = optionsStat.optional.sprint;
    const userSprintStats = this.userGamesStats?.optional.sprint;
    const dayNow = new Date().getDate().toString();
    const monthNow = new Date().getMonth().toString();
    const yearNow = new Date().getFullYear().toString();
    if (userSprintStats) {
      const statsDay = new Date(<number>userSprintStats.today.date)
        .getDate()
        .toString();
      const statsMonth = new Date(<number>userSprintStats.today.date)
        .getMonth()
        .toString();
      const statsYear = new Date(<number>userSprintStats.today.date)
        .getFullYear()
        .toString();
      optionsSprintStats!.allTime.attempts =
        userSprintStats.allTime.attempts + this.gameStats.length;
      optionsSprintStats!.allTime.success =
        userSprintStats.allTime.success +
        this.gameStats.filter((el: ISprintStats) => el.success).length;
      optionsSprintStats!.allTime.rightGuessesInRow =
        userSprintStats.allTime.rightGuessesInRow >= this.longestCombo
          ? userSprintStats.allTime.rightGuessesInRow
          : this.longestCombo;
      console.log('DayNow: ', dayNow, '; StatsDay: ', statsDay);
      if (
        dayNow === statsDay &&
        monthNow === statsMonth &&
        yearNow === statsYear
      ) {
        optionsSprintStats!.today.attempts =
          userSprintStats.today.attempts + this.gameStats.length;
        optionsSprintStats!.today.success =
          userSprintStats.today.success +
          this.gameStats.filter((el: ISprintStats) => el.success).length;
        optionsSprintStats!.today.rightGuessesInRow =
          userSprintStats.today.rightGuessesInRow >= this.longestCombo
            ? userSprintStats.today.rightGuessesInRow
            : this.longestCombo;
        optionsSprintStats!.today.date = userSprintStats.today.date;
      }
      if (
        dayNow !== statsDay ||
        monthNow !== statsMonth ||
        yearNow !== statsYear
      ) {
        optionsSprintStats!.today.attempts = 0;
        optionsSprintStats!.today.success = 0;
        optionsSprintStats!.today.rightGuessesInRow = 0;
        optionsSprintStats!.today.date = new Date().getTime();
      }
    }
    this.putUserStatistics(optionsStat);
    this.getUserWords();
    console.log('Stats 2: ', this.userGamesStats);
    console.log('User words 1: ', this.userWords);
    const userWordIds = this.userWords.map((el: IWord) => el.wordId);
    this.gameStats.forEach((el: ISprintStats) => {
      userWordIds.includes(el.id)
        ? this.processUserWord(
            <IWord>this.userWords.find((word: IWord) => word.wordId === el.id),
            el
          )
        : this.processNotUserWord(el.id, el);
    });
  }
}
