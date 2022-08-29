import { Component, OnInit } from '@angular/core';
import {
  Difficulty,
  IWordCard,
  PageRoutes,
  QueryParams,
  SLASH,
  url,
  UserWords,
  UserWordsResponse,
} from 'src/app/constants';
import { AppPages } from 'src/app/constants';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { QueryService } from 'src/app/core/service/query.service';
import { HttpService } from 'src/app/core/services/http.service';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
  hardWords: IWordCard[] = [];

  constructor(
    private pagesDataService: PagesDataService,
    private queryService: QueryService,
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.pagesDataService.setPage(AppPages.DashBoard);
    this.getWords();
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
    this.queryService
      .getUserWords()
      .pipe(
        tap(response =>
          response
            .filter(word => word.difficulty === Difficulty.Hard)
            .forEach(word =>
              this.authService.getWordById(word.wordId).subscribe({
                next: word => {
                  this.hardWords.push(word);
                },
              })
            )
        )
      )
      .subscribe({
        next: response => {
          console.log(response);
          // response.forEach(console.log);
          console.log(this.hardWords);
          // this.userWords.total = response.length;
          // this.userWords.easyWords = response.filter(
          //   word => word.difficulty === Difficulty.Easy
          // ).length;
          // this.userWords.hardWords = response.filter(
          //   word => word.difficulty === Difficulty.Hard
          // ).length;
        },
      });
  }
  playSound(endpoint: string) {
    const audio = new Audio(url + SLASH + endpoint);
    audio.play();
  }
  setWordStatus(wordId: string, difficultyLevel: Difficulty) {
    const body = { difficulty: Difficulty.Hard };
    const location =
      QueryParams.register +
      SLASH +
      // this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    this.httpService
      .putData(location, body)
      .subscribe({ next: (data: any) => console.log(data) });
  }
}
