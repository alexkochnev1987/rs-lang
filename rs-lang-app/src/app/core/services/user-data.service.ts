import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, QueryParams, SLASH, url } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private isUser = false;
  private userName = '';
  private user: Partial<LoginResponse> = {};
  private http!: HttpClient;
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

  setUser(user: Partial<LoginResponse>) {
    this.user.token = user.token;
    this.user.userId = user.userId;
    this.user.refreshToken = user.refreshToken;
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = {};
    this.userName = '';
  }
}
