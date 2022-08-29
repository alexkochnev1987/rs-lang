import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Difficulty, IWord, QueryParams, SLASH, url } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  source = url + '/';
  idCard = '';
  isMore = false;
  userWord: IWord = { id: '', wordId: '' };
  userWords: IWord[] = [];

  @Input() card!: WordCard;
  @Input() group: number = 0;
  @Input() userId: string | undefined;

  constructor(
    private userDataService: UserDataService,
    private httpService: HttpService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    if (this.userId) this.getUserWords();
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
    return this.userDataService.isRegistered();
  }

  playAudio(urlocation: string) {
    const audio = new Audio(this.source + urlocation);
    audio.play();
  }

  isDifficultWord(wordId: string): any {
    if (!this.isUser()) {
      return false;
    }
    return (
      this.userWords.find(item => item.wordId === wordId)?.difficulty ===
      Difficulty.Hard
    );
  }

  isLearnedWord(wordId: string): boolean {
    if (!this.isUser()) {
      return false;
    }
    return (
      this.userWords.find(item => item.wordId === wordId)?.difficulty ===
      Difficulty.Easy
    );
  }
  isNotMarkedWord(wordId: string) {
    const difficulty = this.userWords.find(
      item => item.wordId === wordId
    )?.difficulty;
    return difficulty !== Difficulty.Hard && difficulty !== Difficulty.Easy;
  }

  setDifficultWord(wordId: string): void {
    this.setStateOfOfWord(Difficulty.Hard, wordId);
    this.getUserWords();
  }

  setEasyWord(wordId: string): void {
    this.setStateOfOfWord(Difficulty.Easy, wordId);
    this.getUserWords();
  }
  isWordInUserWords(wordId: string): boolean {
    this.getUserWords();
    return !!this.userWords.find(item => item.wordId === wordId);
  }

  setStateOfOfWord(state: string, wordId: string) {
    let response: any;
    let put = false;
    const body = { difficulty: state };
    const location =
      QueryParams.register +
      SLASH +
      this.userId +
      QueryParams.words +
      SLASH +
      wordId;
    if (!this.isWordInUserWords(wordId)) {
      put = false;
    } else {
      put = true;
    }
    if (put) {
      response = this.httpService.putData(location, body);
    } else {
      response = this.httpService.postData(location, body);
    }
    response.subscribe({ next: (data: any) => console.log(data) });
  }

  getLearnProgress(wordId: string): string {
    const attempts: number = 0;
    const maxAttempts: number = 3;
    return `${attempts}/${maxAttempts}`;
  }
  getRateValue(wordId: string): string {
    const rate = 0;
    return `${rate}%`;
  }
  getUserWords() {
    this.http
      .get(url + QueryParams.register + SLASH + this.userId + QueryParams.words)
      .subscribe({
        next: (data: any) => {
          this.userWords = data;
        },
      });
  }
}
