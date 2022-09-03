import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../../../core/service/query.service';
import {
  Subscription,
  forkJoin,
  tap,
  filter,
  timer,
  mergeMap,
  Observable,
} from 'rxjs';
import {
  AppPages,
  AUDIO_CHALLENGE_ATTEMPTS,
  BUTTON_CANCEL,
  BUTTON_LEAVE,
  BUTTON_RESTART,
  BUTTON_START,
  Difficulty,
  GameOptions,
  GameSound,
  GameStatistics,
  GAME_1,
  GAME_AUDIO_CHALLENGE_INSTRUCTIONS,
  IAudioChallengeStatistics,
  IGuessButton,
  IWord,
  IWordCard,
  LEVELS_COLORS,
  QueryParams,
  SLASH,
  url,
  UserStatistics,
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
  isDenied = false;
  isShowInstruction = false;
  isSpeakerOn = false;
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
  timeStart = 0;
  timeFinish = 0;
  gameStatistics?: IAudioChallengeStatistics[] = [];
  private subscription: Subscription;
  duration = 0;
  keyboardPress = -1;
  instructions = GAME_AUDIO_CHALLENGE_INSTRUCTIONS;
  rightAnswersCount = 0;
  rightAnswersPercent = 0;
  userStatistics: GameStatistics = {
    learnedWords: 0,
    optional: {},
  };
  todayGameOptions: GameOptions = {
    attempts: 0,
    success: 0,
    rightGuessesInRow: 0,
  };
  allTimeGameOptions: GameOptions = {
    attempts: 0,
    success: 0,
    rightGuessesInRow: 0,
  };
  maxRowInGame = 0;
  playAgain(value: any) {
    if (value) {
      this.restartGame();
    }
  }
  learnedWords = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDataService: PagesDataService,
    private http: HttpClient,
    private httpService: HttpService,
    private userDataService: UserDataService,
    private queryService: QueryService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.currentLevel = params['level'];
      this.currentPage = params['page'];
      if (this.currentLevel > 6) {
        this.currentPage = 0;
      }
    });
  }

  @HostListener('window:keydown', ['$event']) getkey($event: { key: any }) {
    this.keyboardPress = Number($event.key) - 1;
    if (!this.isGameEnded && !this.isDenied) {
      if (this.keyboardPress < 4 && this.keyboardPress > -1)
        this.checkAnswer(this.keyboardPress);
      if ($event.key === 'Enter' || $event.key === ' ') {
        this.sayWord();
        this.isSpeakerOn = true;
      }
    }
  }

  @HostListener('window:keyup', ['$event']) getkeyUp($event: { key: any }) {
    this.keyboardPress = -1;
    this.isSpeakerOn = false;
  }

  ngOnInit(): void {
    this.pageDataService.setPage(AppPages.MiniGames);
    this.isFromTextbook = this.currentPage != -1 && this.currentLevel > -1;
    this.getGuessInRowArray(0);
    if (this.userDataService.isRegistered()) {
      this.userId = this.userDataService.getUser().userId;
      this.getUserWords();
    }
    setInterval(() => (this.isShowInstruction = !this.isShowInstruction), 5000);
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
    this.timeStart = Date.now();
    if (this.currentLevel > 6) {
      this.loadForUser();
    } else {
      this.load();
    }
  }

  load() {
    let page: number | undefined = 0;
    if (this.currentPage == -1) {
      page = undefined;
    } else page = this.currentPage! - 1;
    const wordsResponse = new CreateWordsResponseService(
      this.httpService,
      this.currentLevel,
      page
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
            .filter(
              (el: IWord) => el.difficulty === 'easy' && this.currentPage! > -1
            )
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
    if (!this.isDenied) {
      this.dataLength = this.arrayForGuess.length;
      this.isInProgress = false;
      this.getGuessInRowArray(0);
      this.getWords();
    }
  }

  getWords() {
    this.guessButtons = Array(4).fill({});
    this.rightButtonNumber = Math.round(Math.random() * 3);
    this.guessButtons = this.guessButtons.map((el, index) => {
      const randomIndex = Math.round(Math.random() * (this.dataLength - 1));
      const randomWord = this.arrayForGuess[randomIndex];
      if (index === this.rightButtonNumber) {
        this.rightWord = randomWord;
      }

      return { id: randomWord?.id, word: randomWord?.wordTranslate };
    });
    setTimeout(() => this.checkDuplicates(this.guessButtons));
  }

  checkDuplicates(arr: IGuessButton[]) {
    if (new Set(arr.map(i => i.id)).size < 4) {
      this.getWords();
    }
  }

  loadForUser() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .pipe(
        tap(() => {
          this.loadingProgress++;
          this.progress = this.loadingProgress * 100;
        })
      )
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
          this.userWords = this.userWords.filter(
            (item: IWord) => item.difficulty === Difficulty.Hard
          );
          this.userWords.forEach(item => {
            this.httpService.getData(`/words/${item.wordId}`).subscribe({
              next: (data: any) => {
                this.arrayForGuess.push(data);
                this.begin();
              },
            });
          });
        },
      });
  }

  restartGame() {
    this.isGameStart = false;
    this.isGameEnded = false;
    this.isInProgress = true;
    this.isDenied = false;
    this.loadingProgress = 0;
    this.progress = 0;
    this.attempt = 0;
    this.attemptsInRow = Array(10).fill(-1);
    this.gameStatistics = [];
    this.rightAnswersCount = 0;
    this.arrayForGuess = [];
  }

  sayWord(): void {
    new Audio(this.source + this.rightWord?.audio).play();
  }

  checkAnswer(index: number) {
    this.isDenied = true;
    let answer = -1;
    let soundLink = '';
    if (index === this.rightButtonNumber) {
      answer = 1;
      soundLink = GameSound.success;
      this.maxRowInGame++;
      this.rightAnswersCount++;
    } else {
      answer = 0;
      soundLink = GameSound.failed;
      this.maxRowInGame = 0;
    }
    const success = !!answer;
    this.updateWordStatistics(this.rightWord!, success);
    this.putStatistics(this.rightWord!, success);
    this.attemptsInRow[this.attempt] = answer;
    this.attempt++;
    new Audio(soundLink).play();
    if (this.attempt < AUDIO_CHALLENGE_ATTEMPTS) {
      setTimeout(() => {
        this.isDenied = false;
        this.begin();
      }, 1000);
    } else {
      this.timeFinish = Date.now();
      this.duration = Math.round((this.timeFinish - this.timeStart) / 1000);
      this.rightAnswersPercent = Number(
        ((this.rightAnswersCount / AUDIO_CHALLENGE_ATTEMPTS) * 100).toFixed(1)
      );
      this.updateUserStatistics(this.maxRowInGame, this.rightAnswersCount);
      setTimeout(() => (this.isGameEnded = true), 2000);
    }
  }
  putStatistics(word: IWordCard, success: boolean) {
    this.gameStatistics?.push({ word, success });
  }

  updateWordStatistics(word: IWordCard, success?: boolean) {
    let body = { difficulty: Difficulty.Learned, optional: {} };
    let valueSuccess = 0;
    let wordData: IWord;
    const location =
      url +
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      word.id;
    if (!this.userDataService.isRegistered()) return;
    if (!this.isWordInUserWords(word.id)) {
      this.http.post(location, body).subscribe();
      this.getUserWords();
    }
    let currentDifficulty = Difficulty.Learned;
    let currentRightGuessesInRow = 0;
    let currentAttempts = 0;
    let currentSuccess = 0;
    let currentDateFirstTime = 0;
    let currentDateEasy: any;
    let response: any = timer(1000).pipe(
      mergeMap(() => this.http.get(location))
    );
    response.subscribe({
      next: (data: any) => {
        wordData = data;
        const prevDifficulty = wordData?.difficulty;
        const prevRightGuessInRow = wordData?.optional?.rightGuessesInRow;
        let prevAttempts = wordData?.optional?.attempts;
        let prevSuccess = wordData?.optional?.success;
        const prevDateFirstTime = wordData?.optional?.dateFirstTime;
        success ? (valueSuccess = 1) : (valueSuccess = 0);
        if (prevAttempts === undefined || prevAttempts === null) {
          prevAttempts = 0;
          currentDateFirstTime = Date.now();
        }
        if (prevSuccess === undefined || prevSuccess === null) {
          prevSuccess = 0;
          currentDateFirstTime = Date.now();
        }
        if (prevRightGuessInRow === undefined) {
          currentRightGuessesInRow = valueSuccess;
          currentDateFirstTime = Date.now();
        } else {
          success
            ? (currentRightGuessesInRow = prevRightGuessInRow + 1)
            : (currentRightGuessesInRow = 0);
        }
        this.getGuessInRowArray(currentRightGuessesInRow);
        if (prevDifficulty === Difficulty.Hard)
          currentDifficulty = Difficulty.Hard;
        if (
          currentRightGuessesInRow > 2 &&
          prevDifficulty !== Difficulty.Hard
        ) {
          currentRightGuessesInRow = 0;
          currentDifficulty = Difficulty.Easy;
          currentDateEasy = Date.now();
          this.learnedWords++;
        }
        if (
          currentRightGuessesInRow > 4 &&
          prevDifficulty === Difficulty.Hard
        ) {
          currentRightGuessesInRow = 0;
          currentDifficulty = Difficulty.Easy;
          currentDateEasy = Date.now();
          this.learnedWords++;
        }
        currentAttempts = prevAttempts! + 1;
        currentSuccess = prevSuccess! + valueSuccess;
        if (prevDateFirstTime === 0 || prevDateFirstTime === undefined) {
          currentDateFirstTime = Date.now();
        }
        body = {
          difficulty: currentDifficulty,
          optional: {
            rightGuessesInRow: currentRightGuessesInRow,
            attempts: currentAttempts,
            success: currentSuccess,
            dateFirstTime: currentDateFirstTime,
            dateEasy: currentDateEasy,
          },
        };

        this.http.put(location, body).subscribe(i => console.log(i));
      },
    });
  }

  isWordInUserWords(wordId: string): boolean {
    return !!this.userWords.find(item => item.wordId === wordId);
  }

  getUserWords() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
        },
      });
  }

  updateUserStatistics(
    maxRowLength: number,
    success: number,
    attempts: number = AUDIO_CHALLENGE_ATTEMPTS
  ) {
    if (!this.userDataService.isRegistered()) return;
    let response: any;
    let currentTodayAttempts = 0;
    let currentTodaySuccess = 0;
    let currentTodayRow = 0;
    let currentTodayDate = Date.now();
    let currentAllTimeAttempts = 0;
    let currentAllTimeSuccess = 0;
    let currentAllTimeRow = 0;
    let currentLearnedWords = 0;
    let body: GameStatistics = {
      learnedWords: 0,
      optional: {
        sprint: undefined,
        audioChallenge: undefined,
      },
    };
    response = this.http.put(
      url + QueryParams.register + SLASH + this.userId + QueryParams.statistics,
      {}
    );
    response.subscribe();

    timer(1000)
      .pipe(
        mergeMap(() =>
          this.http.get(
            url +
              QueryParams.register +
              SLASH +
              this.userId +
              QueryParams.statistics
          )
        )
      )
      .subscribe({
        next: (data: any) => {
          this.userStatistics = data;
          console.log(this.userStatistics);
          let prevLearnedWords = this.userStatistics?.learnedWords;
          if (!prevLearnedWords) prevLearnedWords = 0;
          let prevTodayAttempts =
            this.userStatistics?.optional?.audioChallenge?.today?.attempts;
          if (!prevTodayAttempts) prevTodayAttempts = 0;
          let prevTodaySuccess =
            this.userStatistics?.optional?.audioChallenge?.today?.success;
          if (!prevTodaySuccess) prevTodaySuccess = 0;
          let prevTodayRow =
            this.userStatistics?.optional?.audioChallenge?.today
              ?.rightGuessesInRow;
          if (!prevTodayRow) prevTodayRow = 0;
          let prevTodayDate =
            this.userStatistics?.optional?.audioChallenge?.today?.date;
          if (!prevTodayDate) prevTodayDate = Date.now();
          let prevAllTimeAttempts =
            this.userStatistics?.optional?.audioChallenge?.allTime?.attempts;
          if (!prevAllTimeAttempts) prevAllTimeAttempts = 0;
          let prevAllTimeSuccess =
            this.userStatistics?.optional?.audioChallenge?.allTime?.success;
          if (!prevAllTimeSuccess) prevAllTimeSuccess = 0;
          let prevAllTimeRow =
            this.userStatistics?.optional?.audioChallenge?.allTime
              ?.rightGuessesInRow;
          if (!prevAllTimeRow) prevAllTimeRow = 0;

          if (
            new Date(currentTodayDate).getDate() ===
            new Date(prevTodayDate).getDate()
          ) {
            currentTodayAttempts = prevTodayAttempts + attempts;
            currentTodaySuccess = prevTodaySuccess + success;
            if (maxRowLength > prevTodayRow) {
              currentTodayRow = maxRowLength;
            } else {
              currentTodayRow = prevTodayRow;
            }
          } else {
            currentTodayAttempts = attempts;
            currentTodaySuccess = success;
            currentTodayRow = maxRowLength;
          }
          currentAllTimeAttempts = prevAllTimeAttempts + attempts;
          currentAllTimeSuccess = prevAllTimeSuccess + success;
          if (maxRowLength > prevAllTimeRow) {
            currentAllTimeRow = maxRowLength;
          } else {
            currentAllTimeRow = prevAllTimeRow;
          }
          this.todayGameOptions = {
            attempts: currentTodayAttempts,
            success: currentTodaySuccess,
            rightGuessesInRow: currentTodayRow,
            date: currentTodayDate,
          };
          this.allTimeGameOptions = {
            attempts: currentAllTimeAttempts,
            success: currentAllTimeSuccess,
            rightGuessesInRow: currentAllTimeRow,
          };
          currentLearnedWords = prevLearnedWords + this.learnedWords;
          this.learnedWords = 0;
          body = {
            learnedWords: currentLearnedWords,
            optional: {
              audioChallenge: {
                today: this.todayGameOptions,
                allTime: this.allTimeGameOptions,
              },
            },
          };

          response = this.http.put(
            url +
              QueryParams.register +
              SLASH +
              this.userId +
              QueryParams.statistics,
            body
          );

          response.subscribe();
        },
      });
  }
}
