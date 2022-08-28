import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/core/service/query.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private queryService: QueryService) {}

  ngOnInit(): void {}

  getWords() {
    this.queryService.getAggregatedWords().subscribe({
      next: response => console.log(response),
    });
  }
}
