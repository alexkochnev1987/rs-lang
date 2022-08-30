import { Component, OnInit } from '@angular/core';
import {
  IWordCard,
  SLASH,
  STATISTICS_WORDS_LENGTH,
  url,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-easy-words',
  templateUrl: './easy-words.component.html',
  styleUrls: ['../hardwords/hardwords.component.scss'],
})
export class EasyWordsComponent implements OnInit {
  easyWords: [IWordCard[]] = [[]];
  easyWordsPage = 0;
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
          response.filter(this.statisticService.filterEasyWords).forEach(word =>
            this.queryService.getWordById(word.wordId).subscribe({
              next: word => {
                this.statisticService.splitArrByChunks(
                  word,
                  this.easyWords,
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
    if (this.easyWordsPage < this.easyWords.length - 1) this.easyWordsPage++;
  }

  prevPage() {
    if (this.easyWordsPage > 0) this.easyWordsPage--;
  }

  playSound(endpoint: string) {
    const audio = new Audio(url + SLASH + endpoint);
    audio.play();
  }
  changePage(page: number) {
    this.easyWordsPage = page;
  }
}
