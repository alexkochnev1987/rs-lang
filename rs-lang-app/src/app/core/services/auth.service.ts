import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, map, catchError, throwError } from 'rxjs';
import {
  LoginResponse,
  LOCAL_KEY,
  QueryParams,
  RegisterResponse,
  url,
  User,
  SLASH,
  LoginUserResponse,
  ShowUserStatus,
} from '../../constants';
import { LocalStorageService } from './localstorage.service';
import { ShowRegistrationService } from './show-registration.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Partial<LoginResponse> = {};
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userDataService: UserDataService,
    private showRegistrationService: ShowRegistrationService
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

  clearUser() {
    this.user = {};
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

  logOut() {
    this.clearUser();
    this.setUserState(false);
    this.localStorage.clear();
  }

  refreshToken() {
    console.log('Start refresh');
    return this.http
      .get(`${url + QueryParams.register + SLASH}${this.user.userId}/tokens`)
      .pipe(
        tap(response => {
          this.setUser(response);
          this.setLocalStorage(LOCAL_KEY, this.user);
          this.setUserState(true);
        })
      );
  }

  getUserName() {
    return this.http.get(
      `${url + QueryParams.register + SLASH}${this.user.userId}`
    );
  }
}
