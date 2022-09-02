import { Component, OnInit } from '@angular/core';
import { DayMonthYear, IWord } from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { DateService } from 'src/app/core/services/date.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-all-time',
  templateUrl: './all-time.component.html',
  styleUrls: ['../graphs.component.scss'],
})
export class AllTimeComponent implements OnInit {
  width = 10;
  width2 = 20;
  wordsLearnedToday = 0;
  totalWords = 0;
  today: DayMonthYear;
  learnedWords = 0;
  easyWords = 0;
  constructor(
    private queryService: QueryService,
    private dateService: DateService,
    private statisticService: StatisticsService
  ) {
    this.today = this.dateService.numberToDate(new Date().getTime());
  }

  ngOnInit(): void {
    this.getWordsLearnedToday();
  }

  getWordsLearnedToday() {
    this.queryService.getUserWords().subscribe({
      next: words => {
        const wordsFirstTime = this.dateFirstTimeArray(words);
        const wordsEasy = this.dateEasyTimeArray(words);
        console.log(wordsFirstTime, wordsEasy);
        this.easyWords = words.filter(
          this.statisticService.filterEasyWords
        ).length;
        this.learnedWords =
          this.statisticService.filterLearnedWords(words).length;
        this.totalWords = words.length;
        this.wordsLearnedToday =
          this.statisticService.getLearnedTodayWords(words).length;
        this.width = (this.easyWords / words.length) * 100;
        this.width2 = (this.totalWords / 3600) * 100;
      },
    });
  }

  dateFirstTimeArray(words: IWord[]) {
    const arrayObjects: [{ [x: string]: IWord }] = [{}];
    return words.reduce((acc, word) => {
      if (word.optional?.dateFirstTime) {
        const objectDate = this.dateService.numberToDate(
          word.optional?.dateFirstTime
        );
        const stringDate = `${objectDate.day}/${objectDate.month}/${objectDate.year}`;
        arrayObjects.push({ [stringDate]: word });
      }
      return acc;
    }, arrayObjects);
  }
  dateEasyTimeArray(words: IWord[]) {
    const arrayObjects: [{ [x: string]: IWord }] = [{}];
    return words.reduce((acc, word) => {
      if (word.optional?.dateEasy) {
        const objectDate = this.dateService.numberToDate(
          word.optional?.dateEasy
        );
        const stringDate = `${objectDate.day}/${objectDate.month}/${objectDate.year}`;
        arrayObjects.push({ [stringDate]: word });
      }
      return acc;
    }, arrayObjects);
  }
}
