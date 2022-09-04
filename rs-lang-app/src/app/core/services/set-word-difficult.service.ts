import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Difficulty, IWord, QueryParams, SLASH, url } from 'src/app/constants';
import { HttpService } from './http.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class SetWordDifficultService {
  constructor(
    private httpService: HttpService,
    private userDataService: UserDataService,
    private http: HttpClient
  ) {}
  getWord(id: string) {
    const location =
      url +
      QueryParams.register +
      SLASH +
      this.userDataService.getUser().userId +
      QueryParams.words +
      SLASH +
      id;
    return this.http.get<IWord>(location);
  }

  createBody(word: IWord, difficulty: Difficulty) {
    return { difficulty: difficulty, optional: word.optional };
  }

  createEasyWord(word: IWord) {
    if (word.optional === undefined) {
      const options = {
        attempts: 0,
        success: 0,
        rightGuessesInRow: 3,
        dateFirstTime: Date.now(),
        dateEasy: Date.now(),
      };
      console.log('HELL');
      return { difficulty: Difficulty.Easy, optional: options };
    }
    console.log(word.optional);
    const options = word.optional;
    if (options?.rightGuessesInRow || options?.rightGuessesInRow === 0)
      options.rightGuessesInRow = 3;
    options.dateEasy = Date.now();
    return { difficulty: Difficulty.Easy, optional: options };
  }

  createHardWord(word: IWord) {
    if (word.optional === undefined) {
      const options = {
        attempts: 0,
        success: 0,
        rightGuessesInRow: 0,
        dateFirstTime: Date.now(),
        dateEasy: undefined,
      };
      return { difficulty: Difficulty.Easy, optional: options };
    }
    console.log(word.optional);
    const options = word.optional;
    if (options?.rightGuessesInRow) options.rightGuessesInRow = 0;
    return { difficulty: Difficulty.Hard, optional: options };
  }

  putWord(word: IWord, options: Pick<IWord, 'optional'>) {
    const location =
      url +
      QueryParams.register +
      SLASH +
      this.userDataService.getUser().userId +
      QueryParams.words +
      SLASH +
      word.wordId;
    return this.http.put<IWord>(location, options);
  }
}
