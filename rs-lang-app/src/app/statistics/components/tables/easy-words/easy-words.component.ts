import { Component, OnInit } from '@angular/core';
import {
  aggregatedWords,
  Difficulty,
  IWordCard,
  SLASH,
  STATISTICS_WORDS_LENGTH,
  url,
  UserWordsWithTranscription,
} from 'src/app/constants';
import { QueryService } from 'src/app/core/service/query.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { tap } from 'rxjs';
import { SetWordDifficultService } from 'src/app/core/services/set-word-difficult.service';

@Component({
  selector: 'app-easy-words',
  templateUrl: './easy-words.component.html',
  styleUrls: ['../hardwords/hardwords.component.scss'],
})
export class EasyWordsComponent implements OnInit {
  // easyWords: [UserWordsWithTranscription[]] = [[]];
  easyWords: [aggregatedWords[]] = [[]];
  easyWordsPage = 0;
  totalPages = 0;
  constructor(
    private queryService: QueryService,
    private statisticService: StatisticsService,
    private setWord: SetWordDifficultService
  ) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords() {
    this.queryService.getAggregatedWords().subscribe({
      next: res => {
        res[0].paginatedResults
          .filter(word => word.userWord.difficulty !== Difficulty.Hard)
          .forEach(word => {
            this.statisticService.splitArrByChunks(
              word,
              this.easyWords,
              STATISTICS_WORDS_LENGTH
            );
          });
      },
    });
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

  threeOrFive(difficulty: string | undefined) {
    if (difficulty === Difficulty.Hard) {
      return 5;
    }
    return 3;
  }

  setWordHard(id: string) {
    this.setWord.getWord(id).subscribe({
      next: res => {
        this.setWord.putWord(res, this.setWord.createHardWord(res)).subscribe();
      },
    });
  }

  refreshPage(id: string) {
    this.setWordHard(id);
    const words = this.easyWords.flat().filter(word => word._id !== id);
    const arr: [aggregatedWords[]] = [[]];
    words.forEach(word =>
      this.statisticService.splitArrByChunks(word, arr, STATISTICS_WORDS_LENGTH)
    );
    this.easyWords = arr;
  }
}
