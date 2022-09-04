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
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['../graphs.component.scss'],
})
export class AudioComponent implements OnInit {
  easyWords: [IWordCard[]] = [[]];
  statistics: OneGameStatistics | undefined;
  correctAnswers: string = '';
  today: DayMonthYear;
  wordsLearnedToday = 0;
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
        this.statistics = res.optional.audioChallenge;
        const success = this.statistics?.today?.success;
        const attempts = this.statistics?.today?.attempts;
        if (success && attempts) {
          this.correctAnswers = Math.floor((success / attempts) * 100) + ' %';
        } else {
          this.correctAnswers = STATISTICS_NOT_FOUND;
        }
      },
    });
  }

  getWordsLearnedToday() {
    this.queryService.getUserWords().subscribe({
      next: words => {
        this.wordsLearnedToday =
          this.statisticService.getLearnedTodayWords(words).length;
      },
    });
  }
}
