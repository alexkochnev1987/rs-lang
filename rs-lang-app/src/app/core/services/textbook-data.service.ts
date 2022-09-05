import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextbookDataService {
  currentLevel: number = 1;
  currentPage: number = 1;
  constructor() {}

  getCurrentLevel() {
    return this.currentLevel;
  }

  setCurrentLevel(level: number) {
    this.currentLevel = level;
  }
}
