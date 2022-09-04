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
  Games,
  url,
  QueryParams,
  SLASH,
  GameStatistics,
  IWordsData,
  Difficulty,
  FROM_HARD_TO_EASY_TIMES,
  FROM_LEARNED_TO_EASY_TIMES,
  aggregatedWords,
  GameSound,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { CreateWordsResponseService } from 'src/app/core/services/create-words-response.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { GameLevelComponent } from '../../../shared/components/game-level/game-level.component';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Location } from '@angular/common';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';
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
  wordIds: string[] = [];
  userGamesStats!: GameStatistics;
  soundlink!: GameSound;
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
  wordImage = '';

  constructor(
    private userService: UserDataService = new UserDataService(),
    private pageDataService: PagesDataService,
    private userdataService: UserDataService,
    private httpService: HttpService,
    private _location: Location,
    private LevelPage: GameLevelTransferService,
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

  // @ViewChild('gamePicture')
  // gamePicture: ElementRef | undefined;

  ngOnInit(): void {
    if (this.isAuth) this.getUserStatistics();
    this.pageDataService.setPage(AppPages.MiniGames);
    if (this.LevelPage.gamePageLevel.length) {
      this.currentLevel = this.LevelPage.gamePageLevel[0];
      this.loadWords(this.LevelPage.gamePageLevel[1]);
      this.isLevelSelected = true;
    }
  }

  getWords(filter: 'all' | 'hard') {
    const filterString =
      filter === 'all'
        ? '{"$nor":[{"userWord":null}]}'
        : '{"userWord.difficulty":"hard"}';
    return this.http.get(
      url +
        QueryParams.register +
        SLASH +
        this.userId +
        `/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent(
          filterString
        )}`
    );
  }

  getUserWords() {
    this.getWords('all').subscribe({
      next: (data: any) => {
        if (data[0].paginatedResults.length !== 0) {
          this.getUserStatistics();
        }
        if (data[0].paginatedResults.length === 0) {
          console.log('User had no statistics. Creating user statistics...');
          const optionsStats: GameStatistics = {
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
              audioChallenge: {
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
          this.putUserStatistics(optionsStats);
        }
        this.userWords = data;
      },
    });
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
    if (this.currentLevel === 7) {
      this.getWords('hard').subscribe((data: any) => {
        this.filterWords(data[0].paginatedResults);
      });
    }
    if (this.currentLevel < 7) {
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
  }

  filterWords(data: any) {
    let userEasyWordsIds: string[] = [];
    let readyWordArray: IWordCard[] = [];
    this.currentLevel < 7
      ? data.forEach((wordsPageArray: IWordCard[]) => {
          readyWordArray.push(...wordsPageArray);
        })
      : (readyWordArray = data.map((el: any) => {
          el.id = el._id;
          delete el._id;
          return el;
        }));
    console.log('DATA: ', readyWordArray);
    if (this.isAuth && this.currentPage !== undefined) {
      this.getEasyWords().subscribe({
        next: (data: any) => {
          data[0].paginatedResults.forEach((el: any) =>
            userEasyWordsIds.push(el._id)
          );
          readyWordArray = readyWordArray.filter(
            (el: IWordCard) => !userEasyWordsIds.includes(el.id)
          );
          this.shuffleWords(readyWordArray);
        },
      });
    } else {
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
    this.getUserWords();
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
    this.currentAnswer = this.wordsArray[this.wordsCounter];
    this.wordImage = url + SLASH + this.wordsArray[this.wordsCounter].image;
    // if (this.gamePicture)
    //   this.gamePicture.nativeElement.style = `background-image: url(${this.wordImage})`;
    this.currentWord = this.wordsArray[this.wordsCounter].word;
    console.log(this.wordsArray[this.wordsCounter]);
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
      this.soundlink = GameSound.success;
      this.gameScore += 50 + this.comboBonus;
      this.combo++;
      buttonPressed.setAttribute('disabled', '');
      setTimeout(() => {
        buttonPressed.classList.add('button-dashed-correct');
        buttonPressed.removeAttribute('disabled');
      }, 0);
    } else {
      this.soundlink = GameSound.failed;
      this.combo = 0;
      buttonPressed.setAttribute('disabled', '');
      setTimeout(() => {
        buttonPressed.classList.add('button-dashed-wrong');
        buttonPressed.removeAttribute('disabled');
      }, 0);
    }
    new Audio(this.soundlink).play();
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

  getEasyWords() {
    return this.http.get(
      url +
        QueryParams.register +
        SLASH +
        this.userId +
        `/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent(
          '{"userWord.difficulty":"easy"}'
        )}`
    );
  }

  noWordsToLearn() {
    console.log('ALL WORDS LEARNED');
    this.isAllWordsLearned = true;
  }

  playAudio(urlocation: string) {
    const audio = new Audio(url + SLASH + urlocation);
    audio.play();
  }

  processStatistics() {
    this.processUserStatistics();
    this.processWordsStatistics();
  }

  processUserStatistics() {
    this.getUserStatistics().subscribe((data: GameStatistics) => {
      this.userGamesStats = data;
      const today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).valueOf();
      const optionsStats: GameStatistics = {
        learnedWords:
          this.userGamesStats.learnedWords !== undefined
            ? this.userGamesStats.learnedWords
            : 0,
        optional: {
          sprint: {
            today: {
              attempts:
                this.userGamesStats.optional.sprint?.today.attempts !==
                undefined
                  ? this.userGamesStats.optional.sprint?.today.attempts
                  : 0,
              success:
                this.userGamesStats.optional.sprint?.today.success !== undefined
                  ? this.userGamesStats.optional.sprint?.today.success
                  : 0,
              rightGuessesInRow:
                this.userGamesStats.optional.sprint?.today.rightGuessesInRow !==
                undefined
                  ? this.userGamesStats.optional.sprint?.today.rightGuessesInRow
                  : 0,
              date:
                this.userGamesStats.optional.sprint?.today.date !== undefined
                  ? this.userGamesStats.optional.sprint?.today.date
                  : 0,
            },
            allTime: {
              attempts:
                this.userGamesStats.optional.sprint?.allTime.attempts !==
                undefined
                  ? this.userGamesStats.optional.sprint?.allTime.attempts
                  : 0,
              success:
                this.userGamesStats.optional.sprint?.allTime.success !==
                undefined
                  ? this.userGamesStats.optional.sprint?.allTime.success
                  : 0,
              rightGuessesInRow:
                this.userGamesStats.optional.sprint?.allTime
                  .rightGuessesInRow !== undefined
                  ? this.userGamesStats.optional.sprint?.allTime
                      .rightGuessesInRow
                  : 0,
            },
          },
          audioChallenge: {
            today: {
              attempts:
                this.userGamesStats.optional.audioChallenge?.today.attempts !==
                undefined
                  ? this.userGamesStats.optional.audioChallenge?.today.attempts
                  : 0,
              success:
                this.userGamesStats.optional.audioChallenge?.today.success !==
                undefined
                  ? this.userGamesStats.optional.audioChallenge?.today.success
                  : 0,
              rightGuessesInRow:
                this.userGamesStats.optional.audioChallenge?.today
                  .rightGuessesInRow !== undefined
                  ? this.userGamesStats.optional.audioChallenge?.today
                      .rightGuessesInRow
                  : 0,
              date:
                this.userGamesStats.optional.audioChallenge?.today.date !==
                undefined
                  ? this.userGamesStats.optional.audioChallenge?.today.date
                  : 0,
            },
            allTime: {
              attempts:
                this.userGamesStats.optional.audioChallenge?.allTime
                  .attempts !== undefined
                  ? this.userGamesStats.optional.audioChallenge?.allTime
                      .attempts
                  : 0,
              success:
                this.userGamesStats.optional.audioChallenge?.allTime.success !==
                undefined
                  ? this.userGamesStats.optional.audioChallenge?.allTime.success
                  : 0,
              rightGuessesInRow:
                this.userGamesStats.optional.audioChallenge?.allTime
                  .rightGuessesInRow !== undefined
                  ? this.userGamesStats.optional.audioChallenge?.allTime
                      .rightGuessesInRow
                  : 0,
            },
          },
        },
      };
      (Object.keys(Games) as Array<keyof typeof Games>).map(key => {
        if (optionsStats.optional[Games[key]]!.today.date! < today) {
          optionsStats.optional[Games[key]]!.today.attempts = 0;
          optionsStats.optional[Games[key]]!.today.success = 0;
          optionsStats.optional[Games[key]]!.today.rightGuessesInRow = 0;
          optionsStats.optional[Games[key]]!.today.date = today;
        }
      });
      const dataLocation = optionsStats.optional[Games.Sprint];
      if (dataLocation) {
        dataLocation.allTime.attempts += this.gameStats.length;
        dataLocation.allTime.success += this.gameStats.filter(
          (el: ISprintStats) => el.success
        ).length;
        dataLocation.allTime.rightGuessesInRow =
          dataLocation.allTime.rightGuessesInRow < this.longestCombo
            ? this.longestCombo
            : dataLocation.allTime.rightGuessesInRow;
        dataLocation.today.attempts += this.gameStats.length;
        dataLocation.today.success += this.gameStats.filter(
          (el: ISprintStats) => el.success
        ).length;
        dataLocation.today.rightGuessesInRow =
          dataLocation.today.rightGuessesInRow < this.longestCombo
            ? this.longestCombo
            : dataLocation.today.rightGuessesInRow;
      }
      console.log(optionsStats);
      this.putUserStatistics(optionsStats);
    });
  }

  getUserStatistics() {
    return this.http.get<GameStatistics>(
      url + QueryParams.register + SLASH + this.userId + QueryParams.statistics
    );
  }

  putUserStatistics(options: any) {
    this.http
      .put<GameStatistics>(
        url +
          QueryParams.register +
          SLASH +
          this.userId +
          QueryParams.statistics,
        options
      )
      .subscribe();
  }

  processWordsStatistics() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
          const userWordIds = this.userWords.map((el: IWord) => el.wordId);
          this.gameStats.forEach((el: ISprintStats) => {
            userWordIds.includes(el.id)
              ? this.processUserWord(
                  <IWordsData>(
                    this.userWords.find((word: IWord) => word.wordId === el.id)
                  ),
                  el
                )
              : this.processNotUserWord(el);
          });
        },
      });
  }

  processNotUserWord(wordGameStats: ISprintStats) {
    let body = {
      difficulty: Difficulty.Learned,
      optional: {
        attempts: 1,
        success: wordGameStats.success ? 1 : 0,
        rightGuessesInRow: wordGameStats.success ? 1 : 0,
      },
    };
    const location =
      url +
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordGameStats.id;
    this.http.post(location, body).subscribe();
  }

  processUserWord(word: IWordsData, wordGameStats: ISprintStats) {
    let optionsWord: IWordsData = {
      difficulty: word.difficulty,
      optional: word.optional
        ? {
            attempts: word.optional.attempts ? word.optional.attempts : 0,
            success: word.optional.success ? word.optional.success : 0,
            rightGuessesInRow: word.optional.rightGuessesInRow
              ? word.optional.rightGuessesInRow
              : 0,
          }
        : { attempts: 0, success: 0, rightGuessesInRow: 0 },
    };

    optionsWord.optional.attempts = optionsWord.optional.attempts
      ? optionsWord.optional.attempts + 1
      : 1;
    if (wordGameStats.success) {
      optionsWord.optional.success = optionsWord.optional.success
        ? optionsWord.optional.success + 1
        : 1;
      optionsWord.optional.rightGuessesInRow = optionsWord.optional
        .rightGuessesInRow
        ? optionsWord.optional.rightGuessesInRow + 1
        : 1;
    }
    if (!wordGameStats.success) {
      optionsWord.optional.rightGuessesInRow = 0;
      if (optionsWord.difficulty !== Difficulty.Hard)
        optionsWord.difficulty = Difficulty.Learned;
    }
    if (
      optionsWord.optional.rightGuessesInRow &&
      optionsWord.optional.rightGuessesInRow >= FROM_HARD_TO_EASY_TIMES
    ) {
      optionsWord.difficulty = Difficulty.Easy;
    }
    if (
      optionsWord.difficulty !== Difficulty.Hard &&
      optionsWord.optional.rightGuessesInRow &&
      optionsWord.optional.rightGuessesInRow >= FROM_LEARNED_TO_EASY_TIMES
    ) {
      optionsWord.difficulty = Difficulty.Easy;
    }
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      word.wordId!;
    const response = this.http.put(url + locationWord, optionsWord);
    response.subscribe((data: any) => {
      console.log('DATA: ', data);
    });
  }
}
