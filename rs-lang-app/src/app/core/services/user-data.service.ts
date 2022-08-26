import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private isUser = false;
  private userName = '';
  constructor() {}

  isRegistered() {
    return this.isUser;
  }

  setUserState(state: boolean) {
    this.isUser = state;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }
}
