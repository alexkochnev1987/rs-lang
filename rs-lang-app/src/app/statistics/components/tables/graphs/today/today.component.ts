import { Component, OnInit } from '@angular/core';
import {
  DayMonthYear,
  IWordCard,
  OneGameStatistics,
  STATISTICS_NOT_FOUND,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { DateService } from 'src/app/core/services/date.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['../graphs.component.scss'],
})
export class TodayComponent implements OnInit {
  easyWords: [IWordCard[]] = [[]];
  sprintStatistics: OneGameStatistics | undefined;
  correctAnswersPercent: string = '';
  correctAnswers = 0;
  today: DayMonthYear;
  wordsLearnedToday = 0;
  totalWords = 0;
  constructor(
    private queryService: QueryService,
    private dateService: DateService,
    private statisticService: StatisticsService
  ) {
    this.today = this.dateService.numberToDate(new Date().getTime());
  }

  ngOnInit(): void {
    this.getStatistics();
    this.getWordsLearnedToday();
  }

  getStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: res => {
        console.log(res);
        if (res.optional.audioChallenge?.today.attempts) {
          this.totalWords += res.optional.audioChallenge?.today.attempts;
        }
        if (res.optional.sprint?.today.attempts) {
          this.totalWords += res.optional.sprint?.today.attempts;
        }
        if (res.optional.audioChallenge?.today.success) {
          this.correctAnswers += res.optional.audioChallenge?.today.success;
        }
        if (res.optional.sprint?.today.success) {
          this.correctAnswers += res.optional.sprint?.today.success;
        }
        if (this.correctAnswers && this.totalWords) {
          this.correctAnswersPercent =
            Math.floor((this.correctAnswers / this.totalWords) * 100) + ' %';
        } else {
          this.correctAnswersPercent = STATISTICS_NOT_FOUND;
        }
      },
    });
  }

  getWordsLearnedToday() {
    this.queryService.getUserWords().subscribe({
      next: words => {
        this.wordsLearnedToday =
          this.statisticService.getLearnedTodayWords(words).length;
        console.log(words, this.statisticService.getLearnedTodayWords(words));
      },
    });
  }
}
