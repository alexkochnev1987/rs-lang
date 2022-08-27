import { Component, Input } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { url } from 'src/app/constants';
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
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  source = url + '/';
  idCard = '';
  isMore = false;

  @Input() card!: WordCard;
  @Input() group: number = 0;
  @Input() userId: string | undefined;

  constructor(
    private userDataService: UserDataService,
    private httpService: HttpService
  ) {}

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
  isDifficultWord(wordId: string): boolean {
    return false;
  }
  isLearnedWord(wordId: string): boolean {
    return true;
  }
  setDifficultWord(wordId: string): void {
    const body = { difficulty: 'hard' };
    const response = this.httpService.postData(
      `/users/${this.userId}/words/${wordId}`,
      {}
    );
    response.subscribe({ next: (data: any) => alert(JSON.stringify(data)) });
  }

  setLearnedWord(wordId: string): void {}

  getLearnProgress(wordId: string): string {
    const attempts: number = 0;
    const maxAttempts: number = 3;
    return `${attempts}/${maxAttempts}`;
  }
  getRateValue(wordId: string): string {
    const rate = 0;
    return `${rate}%`;
  }
}
