import { Component, OnInit } from '@angular/core';
import {
  Difficulty,
  IWordCard,
  PageRoutes,
  QueryParams,
  SLASH,
} from 'src/app/constants';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { QueryService } from 'src/app/core/service/query.service';
import { HttpService } from 'src/app/core/services/http.service';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../' + PageRoutes.audioChallenge;
  wordId = '/5e9f5ee35eb9e72bc21af4db';
  options = { difficulty: 'hard', optional: { option: 'hello' } };
  userWords = { hardWords: 0, easyWords: 0, total: 0 };

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService,
    private httpService: HttpService,
    private statisticService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
  }

  getAggregatedWords() {
    this.queryService.getAggregatedWords().subscribe({
      next: res => console.log(res),
    });
  }

  getStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: res => console.log(res),
    });
  }

  getSettings() {
    this.queryService.getUserSettings().subscribe({
      next: res => console.log(res),
    });
  }
}
