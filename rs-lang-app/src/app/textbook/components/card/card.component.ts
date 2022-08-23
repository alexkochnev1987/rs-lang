import { Component, Input } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { url } from 'src/app/constants';

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

  constructor(private userDataService: UserDataService) {}

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
}
