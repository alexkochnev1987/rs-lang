import { Component, OnInit } from '@angular/core';
import {
  IWordCard,
  SLASH,
  STATISTICS_WORDS_LENGTH,
  url,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-hardwords',
  templateUrl: './hardwords.component.html',
  styleUrls: ['./hardwords.component.scss'],
})
export class HardWordsComponent implements OnInit {
  hardWords: [IWordCard[]] = [[]];
  hardWordsPage = 0;
  constructor(
    private queryService: QueryService,
    private statisticService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords() {
    this.queryService
      .getUserWords()
      .pipe(
        tap(response =>
          response.filter(this.statisticService.filterHardWords).forEach(word =>
            this.queryService.getWordById(word.wordId).subscribe({
              next: word => {
                this.statisticService.splitArrByChunks(
                  word,
                  this.hardWords,
                  STATISTICS_WORDS_LENGTH
                );
              },
            })
          )
        )
      )
      .subscribe();
  }

  nextPage() {
    if (this.hardWordsPage < this.hardWords.length - 1) this.hardWordsPage++;
  }

  prevPage() {
    if (this.hardWordsPage > 0) this.hardWordsPage--;
  }

  playSound(endpoint: string) {
    const audio = new Audio(url + SLASH + endpoint);
    audio.play();
  }

  changePage(page: number) {
    this.hardWordsPage = page;
  }
}
