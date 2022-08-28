import { Component, OnInit } from '@angular/core';
import { Difficulty, PageRoutes, UserWords } from 'src/app/constants';
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
  userWords = { hardWords: 0, easyWords: 0, total: 0 };

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService
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
  getWords() {
    this.queryService.getUserWords().subscribe({
      next: response => {
        console.log(response);
        this.userWords.total = response.length;
        this.userWords.easyWords = response.filter(
          word => word.difficulty === Difficulty.Easy
        ).length;
        this.userWords.hardWords = response.filter(
          word => word.difficulty === Difficulty.Hard
        ).length;
      },
    });
  }
}
