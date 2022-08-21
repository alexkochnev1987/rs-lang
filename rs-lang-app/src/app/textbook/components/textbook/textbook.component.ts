import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SOURCE } from 'src/app/config';
import { HttpService } from 'src/app/core/services/http.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

class WordCard {
  constructor(
    public id: string,
    public group: number,
    public page: number,
    public word: string,
    public image: string,
    public audio: string,
    public audioMeaning: string,
    public audioExample: string,
    public textMeaning: string,
    public textExample: string,
    public transcription: string,
    public wordTranslate: string,
    public textMeaningTranslate: string,
    public textExampleTranslate: string
  ) {}
}

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
  providers: [],
})
export class TextbookComponent implements OnInit {
  source = SOURCE;
  group: number = 0;
  page = 0;
  cards: WordCard[] = [];
  idCard = '';
  isMore = false;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private userDataService: UserDataService
  ) {
    this.subscription = this.activatedRoute.params.subscribe(
      params => (this.group = params['id'])
    );
  }
  ngOnInit() {
    this.load();
  }
  playAudio(url: string) {
    const audio = new Audio(SOURCE + url);
    audio.play();
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
      .getData(`words?group=${this.group - 1}&page=${this.page}`)
      .subscribe({ next: (data: any) => (this.cards = data) });
  }
  onMouseOver(id: string) {
    this.isMore = true;
    this.idCard = id;
  }
  onMouseOut() {
    this.isMore = false;
  }
  checkIsMore(id: string) {
    return id === this.idCard && this.isMore;
  }
  isUser() {
    return this.userDataService.isRegistred();
  }
}
