import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private isUser = false;
  constructor() {}

  isRegistered() {
    return this.isUser;
  }

  setUserState(state: boolean) {
    this.isUser = state;
  }
}
