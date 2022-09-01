import { Injectable } from '@angular/core';
import { Difficulty, IWordCard, UserWordsResponse } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor() {}

  filterHardWords(word: UserWordsResponse) {
    return word.difficulty === Difficulty.Hard ? true : false;
  }

  filterEasyWords(word: UserWordsResponse) {
    return word.difficulty === Difficulty.Easy ? true : false;
  }

  splitArrByChunks(word: IWordCard, arrOfArr: any, sizeChunk: number) {
    if (arrOfArr[arrOfArr.length - 1].length === sizeChunk) {
      arrOfArr.push([]);
    }
    arrOfArr[arrOfArr.length - 1].push(word);
  }
}
