import { Component, OnInit } from '@angular/core';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { QueryService } from 'src/app/core/service/query.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
  }

  getWords() {
    this.queryService.getAggregatedWords().subscribe({
      next: response => console.log(response),
    });
  }
}
