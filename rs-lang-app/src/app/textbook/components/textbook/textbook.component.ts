import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AppPages,
  GAME_1,
  GAME_2,
  IWordCard,
  PageRoutes,
  PLAY_PREFIX,
  url,
} from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { PagesDataService } from 'src/app/core/services/pages-data.service';
import { TextbookDataService } from 'src/app/core/services/textbook-data.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
  providers: [],
})
export class TextbookComponent implements OnInit, OnDestroy {
  source = url + '/';
  group: number = 0;
  page = 0;
  cards: IWordCard[] = [];
  game1 = PLAY_PREFIX + GAME_1;
  game2 = PLAY_PREFIX + GAME_2;
  link2 = '../../' + PageRoutes.sprint;
  link1 = '../../' + PageRoutes.audioChallenge;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private textbookDataService: TextbookDataService,
    private pagesDataService: PagesDataService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.group = params['id'];
      this.load();
      this.textbookDataService.setCurrentLevel(this.group);
    });
  }

  ngOnInit() {
    this.load();
    this.pagesDataService.setPage(AppPages.TextBook);
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
    this.textbookDataService.setCurrentPageNumber(page - 1);
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
}
