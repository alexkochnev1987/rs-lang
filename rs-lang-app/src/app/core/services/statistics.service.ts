import { Injectable } from '@angular/core';
import {
  aggregatedWords,
  Difficulty,
  FilterWordsByDate,
  IWord,
  IWordCard,
  UserWordsResponse,
  UserWordsWithTranscription,
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

  filterLearnedWords(words: IWord[]) {
    return words.filter(word =>
      word.difficulty === Difficulty.Learned ? true : false
    );
  }

  omitHardWords(words: IWord[]) {
    return words.filter(word => word.difficulty !== Difficulty.Hard);
  }

  splitArrByChunks(word: aggregatedWords, arrOfArr: [any], sizeChunk: number) {
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

  getDates(words: IWord[]) {
    const mapArray: string[] = [];
    words.forEach(element => {
      if (element.optional?.dateFirstTime) {
        const stringDate = this.dateService.numberToString(
          element.optional.dateFirstTime
        );
        if (!mapArray.includes(stringDate)) mapArray.push(stringDate);
      }
      if (element.optional?.dateEasy) {
        const stringDate = this.dateService.numberToString(
          element.optional.dateEasy
        );
        if (!mapArray.includes(stringDate)) mapArray.push(stringDate);
      }
    });
    return mapArray.sort((a, b) => (a > b ? -1 : 1));
  }

  getWordsByDate(words: IWord[]) {
    const filterWordsByDate: FilterWordsByDate[] = [];
    this.getDates(words).forEach(date => {
      const newWords = words.filter(word => {
        if (word.optional?.dateFirstTime) {
          const stringDate = this.dateService.numberToString(
            word.optional.dateFirstTime
          );
          if (stringDate === date) return true;
        }
        return false;
      });
      const easyWords = words.filter(word => {
        if (word.optional?.dateEasy) {
          const stringDate = this.dateService.numberToString(
            word.optional.dateEasy
          );
          if (stringDate === date) return true;
        }
        return false;
      });
      const obj: FilterWordsByDate = {
        date: date,
        words: newWords,
        easyWords: easyWords,
      };
      filterWordsByDate.push(obj);
    });
    return filterWordsByDate;
  }
}
