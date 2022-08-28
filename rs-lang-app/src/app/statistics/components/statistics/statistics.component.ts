import { Component, OnInit } from '@angular/core';
import { PageRoutes, UserWords } from 'src/app/constants';
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
  link1 = '../' + PageRoutes.audioChallenge;
  wordId = '/5e9f5ee35eb9e72bc21af4db';
  options = { difficulty: 'hard', optional: { option: 'hello' } };

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
  }

  getWords() {
    this.queryService.getUserWords().subscribe({
      next: response => console.log(response),
    });
  }

  postWord() {
    this.queryService.postUserWords(this.wordId, this.options).subscribe({
      next: res => console.log(res),
    });
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
