import { HttpClient } from '@angular/common/http';
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
  LevelColor,
  LEVELS_COLORS,
  LEVEL_KEY,
  PageRoutes,
  PAGE_KEY,
  PLAY_PREFIX,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';
import { GameLevelTransferService } from 'src/app/core/services/game-level-transfer.service';

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
  source = url + SLASH;
  group: number = 0;
  page = 0;
  levels: LevelColor[] = LEVELS_COLORS;
  cards: IWordCard[] = [];
  game1 = PLAY_PREFIX + GAME_1;
  game2 = PLAY_PREFIX + GAME_2;
  learnedPage = LEARNED_PAGE;
  link2 = '../../' + PageRoutes.sprint;
  link1 = '../../audio-challenge';
  userId: string | undefined = undefined;
  userWords: IWord[] = [];
  userWordsNoFilter: IWord[] = [];
  learnedPages: number[] = [];
  private subscription: Subscription;
  easyCount = 0;
  isLearnedPage = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private textbookDataService: TextbookDataService,
    private pagesDataService: PagesDataService,
    private userDataService: UserDataService,
    private http: HttpClient,
    private storage: LocalStorageService,
    public levelPage: GameLevelTransferService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.group = params['id'];
      this.isLearnedPage = false;
      this.storage.setItem(LEVEL_KEY, this.group);
      this.page = Number(this.storage.getItem(PAGE_KEY)) || 0;
      if (this.userDataService.isRegistered()) {
        this.userId = this.userDataService.getUser().userId;
        this.getUserWords();
      }
      if (this.group == 7) {
        this.cards = [];
        this.loadDifficultWords();
        this.page = 0;
      } else {
        this.load();
      }
      this.getIsLearnedPage();
      this.textbookDataService.setCurrentLevel(this.group);
    });
  }

  ngOnInit() {
    this.load();
    this.getUserWords();
    this.pagesDataService.setPage(AppPages.TextBook);
    this.page = Number(this.storage.getItem(PAGE_KEY)) || 0;
    setInterval(() => this.getIsLearnedPage(), 1000);
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
    this.isLearnedPage = false;
    this.load();
  }

  load() {
    this.httpService
      .getData(`/words?group=${this.group - 1}&page=${this.page}`)
      .subscribe({
        next: (data: any) => {
          this.cards = data;
          this.getIsLearnedPage();
        },
      });
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
          this.userWords = this.userWords.filter(
            (item: IWord) => item.difficulty == Difficulty.Hard
          );
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
  getUserWords() {
    if (this.userId) {
      this.http
        .get(
          url + QueryParams.register + SLASH + this.userId + QueryParams.words
        )
        .subscribe({
          next: (data: any) => {
            this.userWordsNoFilter = data;
          },
        });
    }
  }

  isEasyWord(wordId: string): any {
    if (!this.userId) {
      return false;
    }
    if (this.userWordsNoFilter) {
      return (
        this.userWordsNoFilter.find(item => item.wordId === wordId)
          ?.difficulty === Difficulty.Easy
      );
    }
  }
  getIsLearnedPage() {
    this.getUserWords;
    this.cards.forEach(item => {
      if (this.isEasyWord(item.id)) this.easyCount++;
    });
    if (this.easyCount === 20) {
      this.isLearnedPage = true;
    }
    this.easyCount = 0;
  }

  setLevelPage(arr: number[]) {
    this.levelPage.gamePageLevel = [+arr[0], +arr[1]];
  }
}
