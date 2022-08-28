import { Injectable } from '@angular/core';
import { DayMonthYear } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class GetDateService {
  constructor() {}
  getData(): DayMonthYear {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  }
}
