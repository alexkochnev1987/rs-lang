import { Inject, Injectable } from '@angular/core';
import {
  Difficulty,
  GameStatistics,
  IServiceData,
  ISprintStats,
  IWord,
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
  userWords: IWord[] = [];
  userGamesStats: GameStatistics | undefined;
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

  putUserStatistics(options: GameStatistics) {
    this.queryService.setUserStatistics(options).subscribe({
      next: (data: any) => {
        this.userGamesStats = data;
        console.log('New User Statistics: ', data);
      },
    });
  }

  processUserWord(word: IWord, wordGameStats: ISprintStats) {
    console.log('<<< USER WORD <<< Old data: ', word);
    const optionsWord: IWordsData = {
      difficulty: Difficulty.Learned,
      optional: {
        rightGuessesInRow: 0,
      },
    };
    if (wordGameStats.success) {
      if (
        (word.optional?.rightGuessesInRow === 2 &&
          word.difficulty !== Difficulty.Hard) ||
        (word.optional?.rightGuessesInRow &&
          word.optional?.rightGuessesInRow >= 4 &&
          word.difficulty === Difficulty.Hard) ||
        (word.difficulty === Difficulty.Easy &&
          word.optional?.dateEasy === undefined)
      ) {
        optionsWord.difficulty = Difficulty.Easy;
        optionsWord.optional.dateEasy = Date.now();
        // this.removeWordFromArray(word);
      }
      if (
        (word.optional?.rightGuessesInRow &&
          word.optional?.rightGuessesInRow > 2 &&
          word.difficulty !== Difficulty.Hard) ||
        word.difficulty === Difficulty.Easy
      ) {
        optionsWord.difficulty = Difficulty.Easy;
        // this.removeWordFromArray(word);
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
        optionsWord.difficulty = Difficulty.Learned;
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
    const response = this.httpService.putData(locationWord, optionsWord);
    response.subscribe({
      next: data => console.log('+++ USER WORD +++ New data: ', data),
    });
  }

  processNotUserWord(wordId: string, wordGameStats: ISprintStats) {
    const optionsWord: IWordsData = {
      difficulty: Difficulty.Learned,
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
    const response = this.httpService.postData(locationWord, optionsWord);
    response.subscribe({
      next: data => console.log('>>> NOT USER WORD >>> New data: ', data),
    });
  }

  processStatistics() {
    console.log('Old User Statistics: ', this.userGamesStats);
    this.getUserStatistics();
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
    const optionsSprintStats = optionsStat.optional.sprint;
    const dayNow = new Date().getDate().toString();
    const monthNow = new Date().getMonth().toString();
    const yearNow = new Date().getFullYear().toString();
    if (
      this.userGamesStats?.optional !== undefined &&
      this.userGamesStats?.optional.sprint !== undefined
    ) {
      const userSprintStats = this.userGamesStats?.optional.sprint;
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
        userSprintStats.allTime.attempts + this.serviceData.gameStats.length;
      optionsSprintStats!.allTime.success =
        userSprintStats.allTime.success +
        this.serviceData.gameStats.filter((el: ISprintStats) => el.success)
          .length;
      optionsSprintStats!.allTime.rightGuessesInRow =
        userSprintStats.allTime.rightGuessesInRow >=
        this.serviceData.longestCombo
          ? userSprintStats.allTime.rightGuessesInRow
          : this.serviceData.longestCombo;
      if (
        dayNow === statsDay &&
        monthNow === statsMonth &&
        yearNow === statsYear
      ) {
        optionsSprintStats!.today.attempts =
          userSprintStats.today.attempts + this.serviceData.gameStats.length;
        optionsSprintStats!.today.success =
          userSprintStats.today.success +
          this.serviceData.gameStats.filter((el: ISprintStats) => el.success)
            .length;
        optionsSprintStats!.today.rightGuessesInRow =
          userSprintStats.today.rightGuessesInRow >=
          this.serviceData.longestCombo
            ? userSprintStats.today.rightGuessesInRow
            : this.serviceData.longestCombo;
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
    const userWordIds = this.userWords.map((el: IWord) => el.wordId);
    this.serviceData.gameStats.forEach((el: ISprintStats) => {
      userWordIds.includes(el.id)
        ? this.processUserWord(
            <IWord>this.userWords.find((word: IWord) => word.wordId === el.id),
            el
          )
        : this.processNotUserWord(el.id, el);
    });
  }
}
