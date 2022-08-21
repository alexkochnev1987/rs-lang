import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  isUser = false;
  constructor() {}

  isRegistred() {
    return this.isUser;
  }
  userLogIn() {
    this.isUser = true;
  }
  userLogOut() {
    this.isUser = false;
  }
}
