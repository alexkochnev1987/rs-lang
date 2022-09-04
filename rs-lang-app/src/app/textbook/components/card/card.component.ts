import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import {
  Difficulty,
  IWord,
  IWordsData,
  QueryParams,
  SLASH,
  url,
} from 'src/app/constants';
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
  source = url + SLASH;
  idCard = '';
  isMore = false;
  userWord: IWord = { id: '', wordId: '' };
  userWords: IWord[] = [];
  responseWordData: IWordsData = {
    difficulty: '',
    optional: {
      attempts: undefined,
      success: undefined,
      rightGuessesInRow: 0,
      dateEasy: undefined,
      dateFirstTime: undefined,
    },
  };

  @Input() card!: WordCard;
  @Input() group: number = 0;
  @Input() userId: string | undefined;
  @Input() userWordsNoFilter?: IWord[];

  constructor(
    private userDataService: UserDataService,
    private httpService: HttpService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    if (this.userId) {
      this.getResponse(this.card.id);
      this.getUserWords();
    }
  }
  onMouseOver(id: string) {
    this.isMore = true;
    this.idCard = id;
    this.getResponse(this.card.id);
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
    if (this.userWordsNoFilter) {
      return (
        this.userWordsNoFilter.find(item => item.wordId === wordId)
          ?.difficulty === Difficulty.Hard
      );
    }
  }

  isEasyWord(wordId: string): any {
    if (!this.isUser()) {
      return false;
    }
    if (this.userWordsNoFilter) {
      return (
        this.userWordsNoFilter.find(item => item.wordId === wordId)
          ?.difficulty === Difficulty.Easy
      );
    }
  }

  isNotMarkedWord(wordId: string): any {
    if (this.userWordsNoFilter) {
      const difficulty = this.userWordsNoFilter.find(
        item => item.wordId === wordId
      )?.difficulty;
      return difficulty !== Difficulty.Hard && difficulty !== Difficulty.Easy;
    }
  }

  setDifficultWord(wordId: string): void {
    this.setStateOfOfWord(Difficulty.Hard, wordId);
    this.getUserWords();
  }

  setEasyWord(wordId: string): void {
    this.setStateOfOfWord(Difficulty.Easy, wordId);
    this.getUserWords();
  }
  isWordInUserWords(wordId: string): any {
    if (this.userWordsNoFilter) {
      return !!this.userWordsNoFilter.find(item => item.wordId === wordId);
    }
  }
  setStateOfOfWord(state: string, wordId: string) {
    let response: any;
    let put = false;
    const body = { difficulty: state, optional: { rightGuessesInRow: 0 } };
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
    response.subscribe();
    this.getUserWords();
    this.getResponse(this.card.id);
  }

  getLearnProgress(wordId: string): string {
    let maxAttempts = 3;
    let attempts = this.responseWordData?.optional?.rightGuessesInRow;
    if (!attempts) attempts = 0;
    this.isDifficultWord(wordId) ? (maxAttempts = 5) : (maxAttempts = 3);
    return `${attempts}/${maxAttempts}`;
  }
  getRateValue(wordId: string): string {
    let rate = 0;
    if (
      this.responseWordData?.optional?.attempts &&
      this.responseWordData?.optional?.success
    ) {
      rate = Number(
        (
          (this.responseWordData.optional.success /
            this.responseWordData.optional.attempts) *
          100
        ).toFixed(1)
      );
    }
    return `${rate}%`;
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
  getResponse(wordId: string) {
    if (this.userId && this.isWordInUserWords(wordId)) {
      let response: any;
      const location =
        url +
        QueryParams.register +
        SLASH +
        this.userId +
        QueryParams.words +
        SLASH +
        wordId;
      response = this.http.get(location);
      response.subscribe({
        next: (data: any) => {
          this.responseWordData = data;
        },
      });
    }
  }
}
