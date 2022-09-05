import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Difficulty,
  FROM_HARD_TO_EASY_TIMES,
  FROM_LEARNED_TO_EASY_TIMES,
  GameOptions,
  Games,
  GameStatistics,
  IServiceData,
  ISprintStats,
  IWordsData,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';
import { HttpService } from './http.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProcessStatisticsService {
  userWords: IWordsData[] = [];
  userGamesStats!: GameStatistics;
  serviceData!: IServiceData;
  userId!: string;

  constructor(
    private httpService: HttpService,
    private http: HttpClient,
    private userdataService: UserDataService
  ) {
    this.userId = this.userdataService.getUser().userId!;
    this.getUserWords();
    this.getUserStatistics();
  }

  getUserWords() {
    this.http
      .get(
        url +
          QueryParams.register +
          SLASH +
          this.userId +
          `/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent(
            '{"$nor":[{"userWord":null}]}'
          )}`
      )
      .subscribe({
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

  getUserStatistics() {
    this.http
      .get(
        url +
          QueryParams.register +
          SLASH +
          this.userId +
          QueryParams.statistics
      )
      .subscribe({
        next: (data: any) => {
          this.userGamesStats = data;
        },
      });
  }

  putUserStatistics(options: any) {
    if (options.id !== undefined) delete options.id;
    this.http
      .put<GameStatistics>(
        url +
          QueryParams.register +
          SLASH +
          this.userId +
          QueryParams.statistics,
        options
      )
      .subscribe({
        next: response => {
          this.userGamesStats = response;
        },
      });
  }

  postUserWordData(wordId: string, options: any) {
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    const response = this.http.post(url + locationWord, options);
    response.subscribe();
  }

  putUserWordData(wordId: string, options: IWordsData) {
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    const response = this.http.put(url + locationWord, options);
    response.subscribe();
  }

  processUserWord(word: IWordsData, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
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
    this.putUserWordData(word.wordId!, optionsWord);
  }

  processNotUserWord(wordGameStats: ISprintStats) {
    let body = { difficulty: Difficulty.Learned, optional: {} };
    const location =
      url +
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordGameStats.id;
    console.log('User ID: ', this.userId);
    console.log('Not user word. POST.', wordGameStats.id);
    console.log('Posting data: ', body);
    this.http.post(location, body).subscribe();
  }

  processUserStatistics() {
    this.getUserStatistics();
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
              this.userGamesStats.optional.sprint?.today.attempts !== undefined
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
              this.userGamesStats.optional.sprint?.allTime.success !== undefined
                ? this.userGamesStats.optional.sprint?.allTime.success
                : 0,
            rightGuessesInRow:
              this.userGamesStats.optional.sprint?.allTime.rightGuessesInRow !==
              undefined
                ? this.userGamesStats.optional.sprint?.allTime.rightGuessesInRow
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
              this.userGamesStats.optional.audioChallenge?.allTime.attempts !==
              undefined
                ? this.userGamesStats.optional.audioChallenge?.allTime.attempts
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
    const dataLocation = optionsStats.optional[this.serviceData.game];
    if (dataLocation) {
      dataLocation.allTime.attempts += this.serviceData.gameStats.length;
      dataLocation.allTime.success += this.serviceData.gameStats.filter(
        (el: ISprintStats) => el.success
      ).length;
      dataLocation.allTime.rightGuessesInRow =
        dataLocation.allTime.rightGuessesInRow < this.serviceData.longestCombo
          ? this.serviceData.longestCombo
          : dataLocation.allTime.rightGuessesInRow;
      dataLocation.today.attempts += this.serviceData.gameStats.length;
      dataLocation.today.success += this.serviceData.gameStats.filter(
        (el: ISprintStats) => el.success
      ).length;
      dataLocation.today.rightGuessesInRow =
        dataLocation.today.rightGuessesInRow < this.serviceData.longestCombo
          ? this.serviceData.longestCombo
          : dataLocation.today.rightGuessesInRow;
    }
    this.putUserStatistics(optionsStats);
  }

  processWordsStatistics() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
          const userWordIds = this.userWords.map((el: IWordsData) => el.wordId);
          this.serviceData.gameStats.forEach((el: ISprintStats) => {
            userWordIds.includes(el.id)
              ? this.processUserWord(
                  <IWordsData>(
                    this.userWords.find(
                      (word: IWordsData) => word.wordId === el.id
                    )
                  ),
                  el
                )
              : this.processNotUserWord(el);
          });
        },
      });
  }

  processStatistics() {
    this.processUserStatistics();
    this.processWordsStatistics();
  }
}
