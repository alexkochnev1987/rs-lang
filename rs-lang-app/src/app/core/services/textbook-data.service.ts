import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextbookDataService {
  currentLevel: number = 1;
  currentPage: number = 1;
  constructor() {}

  getCurrentPageNumber() {
    alert(this.currentPage)
    return this.currentPage;
  }
  getCurrentLevel() {
    return this.currentLevel;
  }
  setCurrentPageNumber(page: number) {
    this.currentPage = page;

  }
  setCurrentLevel(level: number) {
    this.currentLevel = level;
  }
}
