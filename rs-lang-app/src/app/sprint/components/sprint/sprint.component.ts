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
    private _location: Location,
    private LevelPage: GameLevelTransferService,
    private processStatisticsService: ProcessStatisticsService
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
      ? console.log('Playing all words on level', this.currentLevel, ': ', data)
      : console.log(
          'Words on level: ',
          this.currentLevel,
          ' and page: ',
          this.currentPage + 1,
          ': ',
          data
        );
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
          // this.processStatistics();
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
    this.wordsArray[this.wordsCounter]
      ? (this.currentAnswer = this.wordsArray[this.wordsCounter])
      : (this.timer = 0);
    if (this.currentAnswer) this.currentWord = this.currentAnswer.word;
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
    if (this.currentAnswer) {
      this.gameStats.push({
        id: this.currentAnswer.id,
        word: this.currentAnswer.word,
        audio: this.currentAnswer.audio,
        transcription: this.currentAnswer.transcription,
        wordTranslate: this.currentAnswer.wordTranslate,
        success: answer === this.isCorrect ? true : false,
      });
    }
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

  getUserStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: (data: any) => {
        this.userGamesStats = data;
      },
    });
  }

  // putUserStatistics(options: GameStatistics) {
  //   this.queryService.setUserStatistics(options).subscribe({
  //     next: (data: any) => {
  //       this.userGamesStats = data;
  //     },
  //   });
  // }

  // processUserWord(word: IWord, wordGameStats: ISprintStats) {
  //   const optionsWord: IWordsData = {
  //     difficulty: Difficulty.Learned,
  //     optional: {
  //       rightGuessesInRow: 0,
  //     },
  //   };
  //   if (wordGameStats.success) {
  //     if (
  //       (word.optional?.rightGuessesInRow === 2 &&
  //         word.difficulty !== Difficulty.Hard) ||
  //       (word.optional?.rightGuessesInRow &&
  //         word.optional?.rightGuessesInRow >= 4 &&
  //         word.difficulty === Difficulty.Hard) ||
  //       (word.difficulty === Difficulty.Easy &&
  //         word.optional?.dateEasy === undefined)
  //     ) {
  //       optionsWord.difficulty = Difficulty.Easy;
  //       optionsWord.optional.dateEasy = Date.now();
  //       this.removeWordFromArray(word);
  //     }
  //     if (
  //       (word.optional?.rightGuessesInRow &&
  //         word.optional?.rightGuessesInRow > 2 &&
  //         word.difficulty !== Difficulty.Hard) ||
  //       word.difficulty === Difficulty.Easy
  //     ) {
  //       optionsWord.difficulty = Difficulty.Easy;
  //       this.removeWordFromArray(word);
  //     }
  //     if (word.optional?.rightGuessesInRow === undefined) {
  //       optionsWord.optional.rightGuessesInRow = 1;
  //     }
  //     if (word.optional?.rightGuessesInRow !== undefined) {
  //       optionsWord.optional.rightGuessesInRow =
  //         word.optional.rightGuessesInRow + 1;
  //     }
  //     if (word.optional?.dateFirstTime === undefined)
  //       optionsWord.optional.dateFirstTime = Date.now();
  //     if (word.optional?.dateFirstTime !== undefined)
  //       optionsWord.optional.dateFirstTime = word.optional?.dateFirstTime;
  //   }
  //   if (!wordGameStats.success) {
  //     if (word.difficulty === Difficulty.Easy) {
  //       optionsWord.difficulty = Difficulty.Learned;
  //       optionsWord.optional.rightGuessesInRow = 0;
  //       delete optionsWord.optional.dateEasy;
  //     }
  //     if (word.optional?.dateFirstTime !== undefined) {
  //       optionsWord.optional.dateFirstTime = word.optional?.dateFirstTime;
  //     }
  //     if (word.optional?.dateFirstTime === undefined) {
  //       optionsWord.optional.dateFirstTime = Date.now();
  //     }
  //   }
  //   const locationWord =
  //     QueryParams.register +
  //     SLASH +
  //     this.userId +
  //     QueryParams.words +
  //     SLASH +
  //     word.wordId;
  //   const response = this.httpService.putData(locationWord, optionsWord);
  //   response.subscribe({
  //     next: data => console.log('•••USER WORD••• New data: ', data),
  //   });
  // }

  // processNotUserWord(wordId: string, wordGameStats: ISprintStats) {
  //   const optionsWord: IWordsData = {
  //     difficulty: Difficulty.Learned,
  //     optional: {
  //       rightGuessesInRow: wordGameStats.success ? 1 : 0,
  //       dateFirstTime: Date.now(),
  //     },
  //   };
  //   const locationWord =
  //     QueryParams.register +
  //     SLASH +
  //     this.userId +
  //     QueryParams.words +
  //     SLASH +
  //     wordId;
  //   const response = this.httpService.postData(locationWord, optionsWord);
  //   response.subscribe({
  //     next: data => console.log('>>>NOT USER WORD<<< New data: ', data),
  //   });
  // }

  // processStatistics() {
  //   this.getUserStatistics();
  //   const optionsStat: GameStatistics = {
  //     learnedWords: 0,
  //     optional: {
  //       sprint: {
  //         today: {
  //           attempts: 0,
  //           success: 0,
  //           rightGuessesInRow: 0,
  //           date: 0,
  //         },
  //         allTime: {
  //           attempts: 0,
  //           success: 0,
  //           rightGuessesInRow: 0,
  //         },
  //       },
  //     },
  //   };
  //   const optionsSprintStats = optionsStat.optional.sprint;
  //   const dayNow = new Date().getDate().toString();
  //   const monthNow = new Date().getMonth().toString();
  //   const yearNow = new Date().getFullYear().toString();
  //   if (
  //     this.userGamesStats?.optional !== undefined &&
  //     this.userGamesStats?.optional.sprint !== undefined
  //   ) {
  //     const userSprintStats = this.userGamesStats?.optional.sprint;
  //     const statsDay = new Date(<number>userSprintStats.today.date)
  //       .getDate()
  //       .toString();
  //     const statsMonth = new Date(<number>userSprintStats.today.date)
  //       .getMonth()
  //       .toString();
  //     const statsYear = new Date(<number>userSprintStats.today.date)
  //       .getFullYear()
  //       .toString();
  //     optionsSprintStats!.allTime.attempts =
  //       userSprintStats.allTime.attempts + this.gameStats.length;
  //     optionsSprintStats!.allTime.success =
  //       userSprintStats.allTime.success +
  //       this.gameStats.filter((el: ISprintStats) => el.success).length;
  //     optionsSprintStats!.allTime.rightGuessesInRow =
  //       userSprintStats.allTime.rightGuessesInRow >= this.longestCombo
  //         ? userSprintStats.allTime.rightGuessesInRow
  //         : this.longestCombo;
  //     if (
  //       dayNow === statsDay &&
  //       monthNow === statsMonth &&
  //       yearNow === statsYear
  //     ) {
  //       optionsSprintStats!.today.attempts =
  //         userSprintStats.today.attempts + this.gameStats.length;
  //       optionsSprintStats!.today.success =
  //         userSprintStats.today.success +
  //         this.gameStats.filter((el: ISprintStats) => el.success).length;
  //       optionsSprintStats!.today.rightGuessesInRow =
  //         userSprintStats.today.rightGuessesInRow >= this.longestCombo
  //           ? userSprintStats.today.rightGuessesInRow
  //           : this.longestCombo;
  //       optionsSprintStats!.today.date = userSprintStats.today.date;
  //     }
  //     if (
  //       dayNow !== statsDay ||
  //       monthNow !== statsMonth ||
  //       yearNow !== statsYear
  //     ) {
  //       optionsSprintStats!.today.attempts = 0;
  //       optionsSprintStats!.today.success = 0;
  //       optionsSprintStats!.today.rightGuessesInRow = 0;
  //       optionsSprintStats!.today.date = new Date().getTime();
  //     }
  //   }
  //   this.putUserStatistics(optionsStat);
  //   this.getUserWords();
  //   const userWordIds = this.userWords.map((el: IWord) => el.wordId);
  //   this.gameStats.forEach((el: ISprintStats) => {
  //     userWordIds.includes(el.id)
  //       ? this.processUserWord(
  //           <IWord>this.userWords.find((word: IWord) => word.wordId === el.id),
  //           el
  //         )
  //       : this.processNotUserWord(el.id, el);
  //   });
  // }

  // removeWordFromArray(word: IWord) {
  //   this.wordsArray = this.wordsArray.filter(
  //     (el: IWordCard) => el.id !== word.wordId
  //   );
  // }
}
