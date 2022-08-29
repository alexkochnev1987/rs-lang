import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IWordCard, PAGES_ON_LEVEL } from 'src/app/constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LoadWordsService {
  private loadedWords: IWordCard[] = [];

  constructor(
    private httpService: HttpService,
    @Inject('group') private group: number,
    @Inject('page') private page?: number
  ) {}

  loadWords() {
    if (this.page) {
      this.httpService
        .getData(`/words?group=${this.group - 1}&page=${this.page}`)
        .subscribe({
          next: (data: any) => {
            this.loadedWords.push(data);
          },
        });
    } else {
      for (let i = 0; i < PAGES_ON_LEVEL; i++) {
        this.httpService
          .getData(`/words?group=${this.group - 1}&page=${i}`)
          .subscribe({
            next: (data: any) => {
              this.loadedWords.push(data);
            },
          });
      }
    }
    return this.loadedWords;
  }
}
