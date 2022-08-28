import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import {
  AppPages,
  Difficulty,
  GAME_1,
  GAME_2,
  IWord,
  IWordCard,
  LEARNED_PAGE,
  LEVEL_KEY,
  PageRoutes,
  PAGE_KEY,
  PLAY_PREFIX,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';

import { HttpService } from 'src/app/core/services/http.service';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { TextbookDataService } from 'src/app/core/services/textbook-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
  providers: [AuthInterceptor],
})
export class TextbookComponent implements OnInit, OnDestroy {
  source = url + '/';
  group: number = 0;
  page = 0;
  cards: IWordCard[] = [];
  game1 = PLAY_PREFIX + GAME_1;
  game2 = PLAY_PREFIX + GAME_2;
  learnedPage = LEARNED_PAGE;
  link2 = '../../' + PageRoutes.sprint;
  link1 = '../../' + PageRoutes.audioChallenge;
  userId: string | undefined = undefined;
  userWords: IWord[] = [];
  pageWords: IWord[] = [];

  learnedPages: number[] = [];
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private textbookDataService: TextbookDataService,
    private pagesDataService: PagesDataService,
    private userdataService: UserDataService,
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.group = params['id'];
      this.storage.setItem(LEVEL_KEY, this.group);
      this.userId = this.userdataService.getUser().userId;
      if (this.group == 7) {
        this.loadDifficultWords();
      }
      this.load();
      this.textbookDataService.setCurrentLevel(this.group);
    });
  }

  ngOnInit() {
    this.load();
    this.pagesDataService.setPage(AppPages.TextBook);
    this.page = Number(this.storage.getItem(PAGE_KEY)) || 0;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pagination() {
    let n = 0;
    return new Array(30).fill(0).map(i => {
      n += 1;
      return i + n;
    });
  }

  changePage(page: number) {
    this.storage.setItem(PAGE_KEY, page - 1);
    this.page = page - 1;
    this.load();
  }

  load() {
    this.httpService
      .getData(`/words?group=${this.group - 1}&page=${this.page}`)
      .subscribe({ next: (data: any) => (this.cards = data) });
  }
  pageDown() {
    if (this.page > 0) this.changePage(this.page);
  }
  pageUp() {
    if (this.page < 29) this.changePage(this.page + 2);
  }

  loadDifficultWords() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
          this.userWords.forEach(item => {
            this.httpService.getData(`/words/${item.wordId}`).subscribe({
              next: (data: any) => {
                this.cards.push(data);
              },
            });
          });
        },
      });
  }

  getPageWords(page: number) {
    let wordsFromPage: IWordCard[] = [];
    this.httpService
      .getData(`/words?group=${this.group - 1}&page=${page}`)
      .subscribe({
        next: (data: any) => {
          wordsFromPage = data;
          wordsFromPage.forEach(item =>
            this.httpService
              .getData(
                QueryParams.register +
                  SLASH +
                  this.userId +
                  QueryParams.words +
                  SLASH +
                  item.id
              )
              .subscribe({
                next: (data: any) => {
                  this.pageWords.push(data);
                },
              })
          );
        },
      });
  }

  isLearnedPage(page: number) {
    this.getPageWords(page);
    const filteredWordsFromPage = this.pageWords.filter(
      item => item.difficulty === Difficulty.Easy
    );
    return filteredWordsFromPage.length === 20;
  }
}
