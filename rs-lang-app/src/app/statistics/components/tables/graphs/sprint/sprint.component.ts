import { Component, OnInit } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import {
  DayMonthYear,
  GameStatistics,
  IWordCard,
  OneGameStatistics,
  STATISTICS_NOT_FOUND,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { DateService } from 'src/app/core/services/date.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['../graphs.component.scss'],
})
export class SprintComponent implements OnInit {
  easyWords: [IWordCard[]] = [[]];
  sprintStatistics: OneGameStatistics | undefined;
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
        this.sprintStatistics = res.optional.sprint;
        const success = this.sprintStatistics?.today?.success;
        const attempts = this.sprintStatistics?.today?.attempts;
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
