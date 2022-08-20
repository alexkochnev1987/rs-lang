import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

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
  providers: [HttpService],
})
export class TextbookComponent implements OnInit {
  dataUrl = 'https://learnlangapp1.herokuapp.com/';
  group: number | undefined;
  page = 0;
  cards: WordCard[] = [];

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
    this.httpService
      .getData(this.dataUrl + `words?group=${this.group}&page=${this.page}`)
      .subscribe({ next: (data: any) => (this.cards = data) });
  }
}
