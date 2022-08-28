import { Component, OnInit } from '@angular/core';
import { PageRoutes, UserWords } from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  link2 = '../' + PageRoutes.sprint;
  link1 = '../' + PageRoutes.audioChallenge;
  wordId = '/5e9f5ee35eb9e72bc21af4db';
  options = { difficulty: 'hard', optional: { option: 'hello' } };
  constructor(private queryService: QueryService) {}

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
