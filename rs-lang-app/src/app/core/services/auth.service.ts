import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LoginResponse,
  LOCAL_KEY,
  QueryParams,
  RegisterResponse,
  url,
  User,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Partial<LoginResponse> = {};
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${url + QueryParams.logIn}`, user)
      .pipe(
        tap(response => {
          this.setUser(response);
          this.setLocalStorage(LOCAL_KEY, this.user);
          this.setUserState(true);
        })
      );
  }
  refreshToken(userId: string) {
    return this.http.get(`${url}/${userId}/tokens`);
  }

  setUserState(state: boolean) {
    this.userDataService.setUserState(state);
  }

  setUser(user: Partial<LoginResponse>) {
    this.user.token = user.token;
    this.user.userId = user.userId;
    this.user.refreshToken = user.refreshToken;
  }

  getUser() {
    return this.user;
  }

  setLocalStorage(key: string, value: any) {
    this.localStorage.setItem(key, value);
  }

  register(user: User): Observable<User> {
    return this.http.post<RegisterResponse>(
      `${url + QueryParams.register}`,
      user
    );
  }

  clearUser() {
    this.user = {};
  }

  logOut() {
    this.clearUser();
    this.setUserState(false);
    this.localStorage.clear();
  }

  getUserName() {
    return this.http.get(`${url}/users/${this.user.userId}`);
  }
}
