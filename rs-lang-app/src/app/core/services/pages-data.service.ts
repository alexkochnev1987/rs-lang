import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagesDataService {
  currentPage: number = -1;

  constructor() {}

  setPage(page: number) {
    this.currentPage = page;
  }

  getPage(): number {
    return this.currentPage;
  }
}
