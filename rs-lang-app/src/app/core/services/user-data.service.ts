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
 
}
