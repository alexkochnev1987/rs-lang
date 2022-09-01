import { Injectable } from '@angular/core';
import {
  Difficulty,
  IWord,
  IWordCard,
  UserWordsResponse,
} from 'src/app/constants';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private dateService: DateService) {}

  filterHardWords(word: IWord) {
    return word.difficulty === Difficulty.Hard ? true : false;
  }

  filterEasyWords(word: IWord) {
    return word.difficulty === Difficulty.Easy ? true : false;
  }

  splitArrByChunks(word: IWordCard, arrOfArr: any, sizeChunk: number) {
    if (arrOfArr[arrOfArr.length - 1].length === sizeChunk) {
      arrOfArr.push([]);
    }
    arrOfArr[arrOfArr.length - 1].push(word);
  }

  getLearnedTodayWords(words: IWord[]) {
    return words.filter(word => {
      const dateNumber = word.optional?.dateFirstTime;
      if (dateNumber) {
        const date = this.dateService.numberToDate(dateNumber);
        if (
          date.day === new Date().getDate() &&
          date.month === new Date().getMonth() &&
          date.year === new Date().getFullYear()
        ) {
          return true;
        }
      }
      return false;
    });
  }
}
