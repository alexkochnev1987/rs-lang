import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IWordCard, url } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
  providers: [],
})
export class TextbookComponent implements OnInit {
  source = url + '/';
  group: number = 0;
  page = 0;
  cards: IWordCard[] = [];
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(
      params => (this.group = params['id'])
    );
  }

  ngOnInit() {
    this.load();
  }

  pagination() {
    let n = 0;
    return new Array(30).fill(0).map(i => {
      n += 1;
      return i + n;
    });
  }

  changePage(page: number) {
    this.page = page - 1;
    this.load();
  }

  load() {
    this.httpService
      .getData(`/words?group=${this.group - 1}&page=${this.page}`)
      .subscribe({ next: (data: any) => (this.cards = data) });
  }
}
