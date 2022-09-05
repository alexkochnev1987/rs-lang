import { Inject, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PAGES_ON_LEVEL } from 'src/app/constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CreateWordsResponseService {
  public responseArray: Observable<object>[] = [];

  constructor(
    private httpService: HttpService,
    @Inject('group') private group: number,
    @Inject('page') private page: number | undefined
  ) {}

  createWordsResponse(): Observable<object>[] {
    if (this.page !== undefined) {
      this.responseArray.push(
        this.httpService.getData(
          `/words?group=${this.group - 1}&page=${this.page}`
        )
      );
    } else {
      for (let i = 0; i < PAGES_ON_LEVEL; i++) {
        this.responseArray.push(
          this.httpService.getData(`/words?group=${this.group - 1}&page=${i}`)
        );
      }
    }
    return this.responseArray;
  }
}
