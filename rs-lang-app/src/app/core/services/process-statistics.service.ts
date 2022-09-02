import { Injectable } from '@angular/core';
import {
  Difficulty,
  FROM_HARD_TO_EASY_TIMES,
  FROM_LEARNED_TO_EASY_TIMES,
  Games,
  GameStatistics,
  GAME_STATS_TEMPLATE,
  IServiceData,
  ISprintStats,
  IWordsData,
  QueryParams,
  SLASH,
} from 'src/app/constants';
import { QueryService } from '../service/query.service';
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
    private queryService: QueryService,
    private httpService: HttpService,
    private userdataService: UserDataService
  ) {
    this.getUserWords();
    this.getUserStatistics();
    this.userId = this.userdataService.getUser().userId!;
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

  putUserStatistics(options: any) {
    if (options.id !== undefined) delete options.id;
    this.queryService.setUserStatistics(options).subscribe({
      next: (data: any) => {
        this.userGamesStats = data;
      },
    });
  }

  postUserWordData(wordId: string, options: IWordsData) {
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    const response = this.httpService.postData(locationWord, options);
    response.subscribe({
      next: data => {},
    });
  }

  putUserWordData(wordId: string, options: IWordsData) {
    const locationWord =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    const response = this.httpService.putData(locationWord, options);
    response.subscribe({
      next: data => {},
    });
  }

  processUserWord(word: IWordsData, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
      difficulty: word.difficulty,
      optional: {
        attempts: word.optional.attempts,
        success: word.optional.success,
        rightGuessesInRow: word.optional.rightGuessesInRow,
      },
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
      if (optionsWord.difficulty === Difficulty.Easy)
        optionsWord.difficulty = Difficulty.Learned;
    }
    if (
      optionsWord.difficulty === Difficulty.Hard &&
      optionsWord.optional.rightGuessesInRow &&
      optionsWord.optional.rightGuessesInRow >= FROM_HARD_TO_EASY_TIMES
    ) {
      optionsWord.difficulty = Difficulty.Easy;
    }
    if (
      optionsWord.difficulty === Difficulty.Learned &&
      optionsWord.optional.rightGuessesInRow &&
      optionsWord.optional.rightGuessesInRow >= FROM_LEARNED_TO_EASY_TIMES
    ) {
      optionsWord.difficulty = Difficulty.Easy;
    }
    this.putUserWordData(word.wordId!, optionsWord);
  }

  processNotUserWord(wordId: string, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
      difficulty: Difficulty.Learned,
      optional: {
        attempts: 1,
        success: wordGameStats.success ? 1 : 0,
        rightGuessesInRow: wordGameStats.success ? 1 : 0,
        dateFirstTime: Date.now(),
      },
    };
    this.postUserWordData(wordId, optionsWord);
  }

  processUserStatistics() {
    this.getUserStatistics();
    const today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).valueOf();
    const optionsStats: GameStatistics = Object.assign(
      GAME_STATS_TEMPLATE,
      this.userGamesStats
    );
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
    const userWordIds = this.userWords.map((el: IWordsData) => el.wordId);
    this.serviceData.gameStats.forEach((el: ISprintStats) => {
      userWordIds.includes(el.id)
        ? this.processUserWord(
            <IWordsData>(
              this.userWords.find((word: IWordsData) => word.wordId === el.id)
            ),
            el
          )
        : this.processNotUserWord(el.id, el);
    });
  }

  processStatistics() {
    this.processUserStatistics();
    this.processWordsStatistics();
  }
}
