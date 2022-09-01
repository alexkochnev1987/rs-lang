import { Injectable } from '@angular/core';
import { DayMonthYear } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}
  getDate(): number {
    return new Date().getTime();
  }

  numberToDate(numberDate: number): DayMonthYear {
    const date = new Date(numberDate);
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  }
}
