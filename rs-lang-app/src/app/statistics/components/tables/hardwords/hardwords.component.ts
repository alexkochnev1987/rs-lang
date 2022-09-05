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
import { map, tap } from 'rxjs';
import { SetWordDifficultService } from 'src/app/core/services/set-word-difficult.service';

@Component({
  selector: 'app-hardwords',
  templateUrl: './hardwords.component.html',
  styleUrls: ['./hardwords.component.scss'],
})
export class HardWordsComponent implements OnInit {
  hardWords: [aggregatedWords[]] = [[]];
  hardWordsPage = 0;
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
          .filter(word => word.userWord.difficulty === Difficulty.Hard)
          .forEach(word => {
            this.statisticService.splitArrByChunks(
              word,
              this.hardWords,
              STATISTICS_WORDS_LENGTH
            );
          });
      },
    });
    // this.queryService
    //   .getUserWords()
    //   .pipe(
    //     tap(response =>
    //       response
    //         .filter(this.statisticService.filterHardWords)
    //         .forEach(userWord =>
    //           this.queryService.getWordById(userWord.wordId).subscribe({
    //             next: word => {
    //               const obj: UserWordsWithTranscription = {
    //                 userWord: userWord,
    //                 word: word,
    //               };
    //               this.statisticService.splitArrByChunks(
    //                 obj,
    //                 this.hardWords,
    //                 STATISTICS_WORDS_LENGTH
    //               );
    //             },
    //           })
    //         )
    //     )
    //   )
    //   .subscribe();
  }

  nextPage() {
    if (this.hardWordsPage < this.hardWords.length - 1) this.hardWordsPage++;
  }

  prevPage() {
    if (this.hardWordsPage > 0) this.hardWordsPage--;
  }

  changePage(page: number) {
    this.hardWordsPage = page;
  }

  playSound(endpoint: string) {
    const audio = new Audio(url + SLASH + endpoint);
    audio.play();
  }

  threeOrFive(difficulty: string | undefined) {
    if (difficulty === Difficulty.Hard) {
      return 5;
    }
    return 3;
  }

  setWordDifficult(id: string) {
    this.setWord.getWord(id).subscribe({
      next: res => {
        this.setWord.putWord(res, this.setWord.createEasyWord(res)).subscribe();
      },
    });
  }

  setWordEasy(id: string) {
    this.setWordDifficult(id);
    const words = this.hardWords.flat().filter(word => word._id !== id);
    const arr: [aggregatedWords[]] = [[]];
    words.forEach(word =>
      this.statisticService.splitArrByChunks(word, arr, STATISTICS_WORDS_LENGTH)
    );
    this.hardWords = arr;
  }
}
