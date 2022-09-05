import { Component, OnInit } from '@angular/core';
import { PageRoutes, UserStatistics } from 'src/app/constants';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { QueryService } from 'src/app/core/service/query.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../audio-challenge';
  link1Level = -1;
  link1Page = -1;
  statistics: UserStatistics | undefined;

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
    this.getStatistics();
  }

  getStatistics() {
    this.queryService.getUserStatistics().subscribe({
      next: res => {
        console.log(res);
        this.statistics = res;
      },
    });
    this.queryService.getAggregatedWords().subscribe({
      next: res => {
        console.log(res);
      },
    });
  }

  getUserWords() {
    this.queryService.getUserWords().subscribe();
  }
}
